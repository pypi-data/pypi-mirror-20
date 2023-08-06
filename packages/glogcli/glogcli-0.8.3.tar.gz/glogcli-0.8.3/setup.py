#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup


with open('README.rst') as readme_file:
    readme = readme_file.read()

with open('HISTORY.rst') as history_file:
    history = history_file.read()

requirements = [
    'Click>=6.0',
    'pip==8.1.2',
    'bumpversion==0.5.3',
    'wheel==0.29.0',
    'watchdog==0.8.3',
    'flake8==2.6.0',
    'coverage==4.1',
    'click>=3.3,<7',
    'keyring==8.7',
    'parsedatetime>=1.4,<3',
    'python-dateutil>=2.4.1,<3',
    'requests>=2.4.3,<3.0',
    'arrow>=0.5.4,<0.8',
    'termcolor==1.1.0',
    'six>=1.9.0',
    'pytest==2.9.2',
]

test_requirements = [
    # TODO: put package test requirements here
]

setup(
    name='glogcli',
    version='0.8.3',
    description="Graylog command line interface.",
    long_description=readme + '\n\n' + history,
    author="Sinval Vieira",
    author_email='sinvalneto01@gmail.com',
    url='https://github.com/globocom/glog-cli',
    download_url = 'https://github.com/globocom/glog-cli/tarball/0.8.3',
    packages=[
        'glogcli',
    ],
    package_dir={'glogcli':
                 'glogcli'},
    entry_points={
        'console_scripts': [
            'glogcli=glogcli.cli:run'
        ]
    },
    include_package_data=True,
    install_requires=requirements,
    license="Apache Software License 2.0",
    zip_safe=False,
    keywords='glogcli',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: Apache Software License',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
    ],
    test_suite='tests',
    tests_require=test_requirements
)
