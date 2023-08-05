#!/usr/bin/env python
# -*- coding: utf-8 -*-

from setuptools import setup

with open('README.rst') as readme_file:
    readme = readme_file.read()

with open('HISTORY.rst') as history_file:
    history = history_file.read()

requirements = [
    # TODO: put package requirements here
]

test_requirements = [
    # TODO: put package test requirements here
]

setup(
    name='lambda_utils',
    version='0.1.10',
    description="A collection of AWS Lambda Utils / Decorator for different AWS events e.g. Api Gateway, S3, CloudFormation, CloudWatch ",
    long_description=readme + '\n\n' + history,
    author="Hans Christoph Schabert",
    author_email='christoph@schabert.me',
    url='https://github.com/Christoph-Schabert/lambda_utils',
    packages=[
        'lambda_utils',
    ],
    package_dir={'lambda_utils': 'lambda_utils'},
    include_package_data=True,
    install_requires=requirements,
    license="MIT license",
    zip_safe=False,
    keywords='lambda_utils',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.7',
    ],
    test_suite='tests',
    tests_require=test_requirements
)
