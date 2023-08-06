from setuptools import setup
import io

setup(
    name='bw2temporalis',
    version="0.9.2",
    packages=[
        "bw2temporalis",
        "bw2temporalis.tests",
        "bw2temporalis.examples",
        "bw2temporalis.cofire"
    ],
    author="Chris Mutel",
    author_email="cmutel@gmail.com",
    license=io.open('LICENSE.txt', encoding='utf-8').read(),
    url="https://bitbucket.org/cmutel/brightway2-temporalis",
    install_requires=[
        "arrow",
        "eight",
        "brightway2",
        "bw2analyzer",
        "bw2calc>=0.11",
        "bw2data>=0.12",
        "bw2speedups>=2.0",
        "numexpr",
        "numpy",
        "scipy",
        "stats_arrays",
    ],
    description='Provide a dynamic LCA calculations for the Brightway2 life cycle assessment framework',
    long_description=io.open('README.rst', encoding='utf-8').read(),
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: End Users/Desktop',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: BSD License',
        'Operating System :: MacOS :: MacOS X',
        'Operating System :: Microsoft :: Windows',
        'Operating System :: POSIX',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Topic :: Scientific/Engineering :: Information Analysis',
        'Topic :: Scientific/Engineering :: Mathematics',
        'Topic :: Scientific/Engineering :: Visualization',
    ],
)
