#!/usr/bin/env python

from distutils.core import setup

tests_require = [
    'pytest'
]

setup(
    name='multicache',
    packages=['multicache'],
    version='0.1.5',
    description='Simple caching mechanisms',
    author='Michal Ovciarik',
    author_email='movciari@gmail.com',
    url='https://github.com/bargulg/multicache',
    download_url='https://github.com/bargulg/multicache/tarball/0.1',
    keywords=['cache', 'caching', 'simple', 'easy', 'multi'],
    classifiers=[],
    extras_require={
        'tests': tests_require
    }
)
