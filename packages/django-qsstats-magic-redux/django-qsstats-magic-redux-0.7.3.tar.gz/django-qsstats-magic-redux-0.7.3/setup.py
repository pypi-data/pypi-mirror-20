#!/usr/bin/env python
from distutils.core import setup

for cmd in ('egg_info', 'develop'):
    import sys
    if cmd in sys.argv:
        from setuptools import setup

setup(
    name='django-qsstats-magic-redux',
    version='0.7.3',
    description='A django microframework that eases the generation of aggregate data for querysets.',
    long_description = open('README.rst').read(),
    author='Matt Croydon, Mikhail Korobov',
    author_email='mcroydon@gmail.com, kmike84@gmail.com',
    url='https://bitbucket.org/chriskief/django-qsstats-magic-redux',
    packages=['qsstats'],
    requires=['dateutil(>=1.4.1, < 2.0)'],
    classifiers=[
        'Development Status :: 4 - Beta',
        'Environment :: Web Environment',
        'Framework :: Django',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.5',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ],
)
