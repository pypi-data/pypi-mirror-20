#!/usr/bin/env python
"""Setuptools script.
"""
import os
import codecs
from setuptools import setup, find_packages

PACKAGENAME = 'sqre-dochub-proto'
DESCRIPTION = 'DocHubProto class for creating www.lsst.io index'
AUTHOR = 'Adam Thornton'
AUTHOR_EMAIL = 'athornton@lsst.org'
URL = 'https://github.com/sqre-lsst/dochub-prototype'
VERSION = '0.0.1'
LICENSE = 'MIT'


def local_read(filename):
    """Convenience function for includes"""
    full_filename = os.path.join(
        os.path.abspath(os.path.dirname(__file__)),
        filename)
    return codecs.open(full_filename, 'r', 'utf-8').read()


LONG_DESC = local_read('README.md')

setup(
    name=PACKAGENAME,
    version=VERSION,
    description=DESCRIPTION,
    long_description=LONG_DESC,
    url=URL,
    author=AUTHOR,
    author_email=AUTHOR_EMAIL,
    license=LICENSE,
    classifiers=[
        'Development Status :: 4 - Beta',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.5',
        'License :: OSI Approved :: MIT License',
    ],
    keywords='lsst',
    packages=find_packages(exclude=['docs', 'tests*']),
    include_package_data=True,
    install_requires=[
        'requests>=2.13.0,<3.0.0',
        'pyyaml>=3.12,<4.0.0',
        'Jinja2>=2.9,<3.0.0',
        'sqre-apikit>=0.1.1,<1.0.0'
    ],
    tests_require=['pytest', 'pytest-flake8', 'pytest-cov']
)
