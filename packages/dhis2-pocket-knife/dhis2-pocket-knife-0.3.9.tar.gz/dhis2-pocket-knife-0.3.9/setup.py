# -*- coding: utf-8 -*-

from setuptools import setup, find_packages

setup(
    name='dhis2-pocket-knife',
    version='0.3.9',
    description='Command-line tools for interacting with DHIS2 API in bulk',
    author='David Huser',
    author_email='dhuser@baosystems.com',
    url='https://github.com/davidhuser/dhis2-pocket-knife',
    keywords='dhis2',
    install_requires=[
        "requests>=2.4.2"
    ],
    scripts=[
        'scripts/dhis2-pk-share-objects',
        'scripts/dhis2-pk-user-orgunits'
    ],
    packages=find_packages()
)
