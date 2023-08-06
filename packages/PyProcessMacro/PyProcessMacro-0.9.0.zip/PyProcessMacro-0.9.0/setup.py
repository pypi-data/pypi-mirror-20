# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
import pyprocessmacro

setup(

    name='PyProcessMacro',

    version=pyprocessmacro.__version__,

    packages=find_packages(),

    author="Quentin André",

    author_email="quentin.andre@insead.edu",

    description="A Python library for moderation, mediation and conditional process analysis. Based on Andrew F. Hayes Process Macro.",

    long_description=open('README.md').read(),

    install_requires=["numpy", "matplotlib", "pandas", "scipy", "seaborn"],

    include_package_data=False,

    keywords=['mediation-analysis', 'statistics', 'process', 'plotting', 'data-science', 'data-analysis',
              'data-visualization', 'regression-models'],

    url='https://github.com/QuentinAndre/pyprocessmacro/',

    classifiers=[
        "Programming Language :: Python",
        "License :: OSI Approved",
        "Natural Language :: English",
        "Development Status :: 4 - Beta",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3.5"
    ],

    license="MIT"
)
