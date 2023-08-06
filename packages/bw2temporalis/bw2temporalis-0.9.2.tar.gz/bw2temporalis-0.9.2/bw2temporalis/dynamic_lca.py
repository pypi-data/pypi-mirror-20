# -*- coding: utf-8 -*-
from __future__ import print_function, unicode_literals
from eight import *

from .temporal_distribution import TemporalDistribution
from .timeline import Timeline
from bw2analyzer import GTManipulator
from bw2calc import GraphTraversal
from bw2data import Database, get_activity, databases
from bw2data.logs import get_logger
from heapq import heappush, heappop
import arrow
import datetime
import numpy as np
import pprint
import warnings


class FakeLog(object):
    """Like a log object, but does nothing"""
    def fake_function(cls, *args, **kwargs):
        return

    def __getattr__(self, attr):
        return self.fake_function


class DynamicLCA(object):
    """Calculate a dynamic LCA, where processes, emissions, and CFs can vary throughout time."""
    def __init__(self, demand, worst_case_method, now=None, max_calc_number=1e4, cutoff=0.001, log=False, gt_kwargs={}):
        self.demand = demand
        self.worst_case_method = worst_case_method
        self.now = now or arrow.now()
        self.max_calc_number = max_calc_number
        self.cutoff_value = cutoff
        self.gt_kwargs = gt_kwargs
        self.log = get_logger("dynamic-lca.log") if log else FakeLog()

    def calculate(self):
        self.timeline = Timeline()
        self.gt = GraphTraversal()
        self.heap = []
        self.calc_number = 0

        if 'max_calc' not in self.gt_kwargs:
            self.gt_kwargs['max_calc'] = self.max_calc_number

        self.gt_results = self.gt.calculate(
            self.demand,
            self.worst_case_method,
            # Do we want the same or different cutoff vales?
            # Current approach is different, 0.005 versus 0.001
            # cutoff=self.cutoff_value,
            **self.gt_kwargs
        )
        self.lca = self.gt_results['lca']
        _, _, self.reverse_bio_dict = self.lca.reverse_dict()

        self.temporal_edges = self.get_temporal_edges()
        self.add_func_unit_to_temporal_edges()
        self.cutoff = abs(self.lca.score) * self.cutoff_value
        self.gt_nodes = GTManipulator.add_metadata(
            self.gt_results['nodes'],
            self.lca
        )
        self.gt_edges = self.translate_edges(self.gt_results['edges'])

        self.log.info("Starting dynamic LCA")
        self.log.info("Demand: %s" % self.demand)
        self.log.info("Worst case method: %s" % str(self.worst_case_method))
        self.log.info("Start datetime: %s" % self.now.isoformat())
        self.log.info("Maximum calculations: %i" % self.max_calc_number)
        self.log.info("Worst case LCA score: %.4g." % self.lca.score)
        self.log.info("Cutoff value (fraction): %.4g." % self.cutoff_value)
        self.log.info("Cutoff score: %.4g." % self.cutoff)
        self.log.debug("NODES: " + pprint.pformat(self.gt_nodes))
        self.log.debug("EDGES: " + pprint.pformat(self.gt_edges))

        # Initialize heap
        heappush(
            self.heap,
            (
                None,
                "Functional unit",
                self.now,
                TemporalDistribution(
                    np.array((0.,)),
                    np.array((self.gt_nodes[-1]['amount'],)).astype(float)
                )
            )
        )

        while self.heap:
            if self.calc_number >= self.max_calc_number:
                warnings.warn("Stopping traversal due to calculation count.")
                break
            self.iterate()

        return self.timeline

    def translate_edges(self, edges):
        for edge in edges:
            edge['from'] = self.gt_nodes[edge['from']].get(
                'key', "Functional unit"
            )
            edge['to'] = self.gt_nodes[edge['to']].get(
                'key', "Functional unit"
            )
        return edges

    def get_temporal_edges(self):
        edges = {}
        all_databases = set.union(*[Database(key[0]).find_graph_dependents() for key in self.demand])
        self.static_databases = {name for name in all_databases if databases[name].get('static')}
        for name in all_databases:
            if name in self.static_databases:
                continue
            for ds in Database(name):
                if ds.get("type", "process") != "process":
                    continue
                for exc in ds.exchanges():
                    # Have to be careful here, because can have
                    # multiple exchanges with same input/output
                    # Sum up multiple edges with same input, if present
                    edges[(exc['input'], ds.key)] = (
                        self.get_temporal_distribution(exc) +
                        edges.get((exc['input'], ds.key), 0))
        return edges

    def get_temporal_distribution(self, exc):
        # Note: Reference product production is removed by earlier GraphTraversal
        sign = 1 if exc.get(u'type') != u'production' else -1
        try:
            array = np.array(exc[u'temporal distribution']).astype(float)
            return TemporalDistribution(array[:, 0], array[:, 1]) * sign
        except KeyError:
            return TemporalDistribution(
                np.array((0.,)),
                np.array((exc[u'amount'],)).astype(float)
            ) * sign

    def add_func_unit_to_temporal_edges(self):
        for key, value in self.demand.items():
            self.temporal_edges[(key, "Functional unit")] = \
                TemporalDistribution(
                    np.array((0.,)),
                    np.array((value,)).astype(float)
            )

    def add_biosphere_flows(self, ds, dt, tech_td):
        if ds == "Functional unit":
            return
        scale_value = self.get_scale_value(ds)

        data = get_activity(ds)
        if not data.get('type', 'process') == "process":
            return

        if data['database'] in self.static_databases:
            # Add cumulated inventory; no need to traverse static database
            self.lca.redo_lci({data: 1})
            inventory_vector = np.array(self.lca.inventory.sum(axis=1)).ravel()
            for index, amount in enumerate(inventory_vector):
                if not amount:
                    continue
                flow = self.reverse_bio_dict[index]
                for tech_year_delta, tech_amount in tech_td:
                    occurs = dt + self.to_timedelta(tech_year_delta)
                    self.timeline.add(occurs, flow, ds,
                                      tech_amount * amount / scale_value)
            return

        for exc in data.exchanges():
            if not exc.get("type") == "biosphere":
                continue
            bio_td = self.get_temporal_distribution(exc)
            for tech_year_delta, tech_amount in tech_td:
                for bio_year_delta, bio_amount in bio_td:
                    occurs = dt + self.to_timedelta(tech_year_delta) + \
                        self.to_timedelta(bio_year_delta)
                    self.timeline.add(occurs, exc['input'], ds,
                                      tech_amount * bio_amount / scale_value)

    def tech_edges_from_node(self, node):
        if node[0] in self.static_databases:
            return []
        return (edge for edge in self.gt_edges if edge['to'] == node)

    def discard_node(self, node, amount):
        self.lca.redo_lcia({node: amount})
        discard = abs(self.lca.score) < self.cutoff
        if discard:
            self.log.info(u"Discarding node: %s of %s (score %.4g)" % (
                          amount, node, self.lca.score)
                          )
        return discard

    def to_timedelta(self, years):
        return datetime.timedelta(hours=int(years * 8765.81))

    def check_absolute_datetime(self, ds, dt):
        if ds == "Functional unit":
            return dt
        ds_data = get_activity(ds)
        absolute = "absolute date" in ds_data
        self.log.info("check_absolute: %s (%s)" % (absolute, ds))
        if "absolute date" in ds_data:
            raise NotImplementedError("Absolute dates not yet supported")
            return arrow.get(ds_data['absolute date'])
        else:
            return dt

    def get_scale_value(self, ds):
        # Each activity must produce its own reference product, but amount
        # can vary, or even be negative.
        # Don't test for zero values, as edges come from GraphTraversal
        # which already does this test.
        # TODO: Do we need to look up the reference product?
        # It is not necessarily the same as the activity,
        # but maybe this breaks many things in the graph traversal
        if ds != "Functional unit":
            return float(self.lca.technosphere_matrix[
                self.lca.product_dict[ds],
                self.lca.activity_dict[ds]
            ])
        else:
            return 1

    def iterate(self):
        # Ignore the calculated impact
        # `ds` is the dataset key
        # `dt` is the datetime; ignored until support for
        # absolute dates is re-added.
        # `td` is a TemporalDistribution instance, which gives
        # how much of the dataset is used over time at
        # this point in the graph traversal
        _, ds, dt, td = heappop(self.heap)  # Don't care about impact

        # Raises an error for absolute dates (for now)
        dt = self.check_absolute_datetime(ds, dt)

        scale_value = self.get_scale_value(ds)

        if self.log:
            self.log.info(".iterate(): %s, %s, %s" % (ds, dt, td))

        self.add_biosphere_flows(ds, dt, td)
        for edge in self.tech_edges_from_node(ds):
            if self.log:
                self.log.info(".iterate:edge: " + pprint.pformat(edge))

            # Temporal distribution for this edge.
            # Total is amount of exchange times amount of input
            te = self.temporal_edges[(edge['from'], edge['to'])]

            new_temporal_distribution = (self.temporal_edges[(edge['from'], edge['to'])]
                                         * td / scale_value)

            if self.discard_node(
                    edge['from'],
                    new_temporal_distribution.total):
                continue

            heappush(self.heap, (
                abs(1 / self.lca.score),
                edge['from'],
                dt,
                new_temporal_distribution
            ))
        self.calc_number += 1
