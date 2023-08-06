"""
Flask-Environment
------------------

Flask-Environment allows configuration of a Flask project with various
serialization formats.
"""

import sys
import os
from setuptools import setup


with open('CHANGELOG.rst') as f:
    changelog = f.read()

setup(
    name='Flask-Environment',
    setup_requires=['setuptools_scm'],
    use_scm_version=True,
    url='https://github.com/nZac/flask-environment',
    license='MIT',
    author='Nick Zaccardi',
    author_email='nicholas.zaccardi@gmail.com',
    description='Configure a Flask application with various file formats.',
    long_description=__doc__ + '\n\n' + changelog,
    packages=['flask_environment'],
    extras_require={
        'toml': ['pytoml==0.1.11'],
        'dev': ['tox', 'pytest', 'pytoml']
    },
    zip_safe=True,
    platforms='any',
    install_requires=[
        'flask>=0.11'
    ],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Topic :: Internet :: WWW/HTTP :: Dynamic Content',
        'Topic :: Software Development :: Libraries :: Python Modules'
    ]
)
