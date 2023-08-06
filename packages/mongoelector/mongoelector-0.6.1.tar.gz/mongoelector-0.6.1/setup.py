#!/usr/bin/env python
# -*- coding: utf-8 -*-


try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup


with open('README.rst') as readme_file:
    readme = readme_file.read()

with open('HISTORY.rst') as history_file:
    history = history_file.read()

requirements = [
    'pymongo'
]

test_requirements = [
    'pymongo'
]

setup(
    name='mongoelector',
    version='0.6.1',
    description="Distributed master election and locking in mongodb",
    long_description=readme + '\n\n' + history,
    author="Zeb Palmer",
    author_email='zeb@zebpalmer.com',
    url='https://github.com/zebpalmer/mongoelector',
    packages=[
        'mongoelector',
    ],
    package_dir={'mongoelector':
                 'mongoelector'},
    include_package_data=True,
    install_requires=requirements,
    license="GPLv3",
    zip_safe=False,
    keywords='mongoelector',
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: GNU Lesser General Public License v3 or later (LGPLv3+)',
        'Natural Language :: English',
        "Programming Language :: Python :: 2",
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
    ],
    test_suite='tests',
    tests_require=test_requirements
)
