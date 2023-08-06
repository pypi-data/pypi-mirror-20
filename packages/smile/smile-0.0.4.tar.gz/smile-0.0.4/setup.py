"""Setup file for SMILE-python package."""

import os
from setuptools import setup

CURRENT_DIR = os.path.dirname(__file__)
__version__ = "0.0.4"

setup(
    name="smile",
    version=__version__,
    description="SMILE is a gflags-like but more powerful command line argument parser.",
    install_requires=[],
    author="Zheng Xu",
    author_email="zheng.xu@mavs.uta.edu",
    zip_safe=False,
    packages=["smile"],
    url="https://github.com/uta-smile/smile-python/"
)
