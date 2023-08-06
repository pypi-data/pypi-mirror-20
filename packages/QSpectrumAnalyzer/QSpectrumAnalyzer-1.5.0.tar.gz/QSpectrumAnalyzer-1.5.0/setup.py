#!/usr/bin/env python

from setuptools import setup
from qspectrumanalyzer.version import __version__

setup(
    name="QSpectrumAnalyzer",
    version=__version__,
    description="Spectrum analyzer for multiple SDR platforms (PyQtGraph based GUI for soapy_power, rx_power, rtl_power, hackrf_sweep and other backends)",
    long_description=open('README.rst').read(),
    author="Michal Krenek (Mikos)",
    author_email="m.krenek@gmail.com",
    url="https://github.com/xmikos/qspectrumanalyzer",
    license="GNU GPLv3",
    packages=["qspectrumanalyzer", "qspectrumanalyzer.backends"],
    package_data={
        "qspectrumanalyzer": [
            "*.ui",
            "languages/*.qm",
            "languages/*.ts"
        ]
    },
    data_files=[
        ("share/applications", ["qspectrumanalyzer.desktop"]),
        ("share/pixmaps", ["qspectrumanalyzer.png"])
    ],
    entry_points={
        "gui_scripts": [
            "qspectrumanalyzer=qspectrumanalyzer.__main__:main"
        ],
    },
    install_requires=[
        "soapy_power",
        "pyqtgraph"
    ],
    classifiers=[
        "Development Status :: 4 - Beta",
        "Environment :: MacOS X",
        "Environment :: Win32 (MS Windows)",
        "Environment :: X11 Applications :: Qt",
        "Intended Audience :: End Users/Desktop",
        "Intended Audience :: Science/Research",
        "Intended Audience :: Telecommunications Industry",
        "License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)",
        "Natural Language :: English",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3",
        "Topic :: Communications :: Ham Radio",
        "Topic :: Scientific/Engineering :: Visualization"
    ]
)
