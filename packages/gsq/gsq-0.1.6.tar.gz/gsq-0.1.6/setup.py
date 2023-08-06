#!/usr/bin/env python

from __future__ import print_function

from setuptools import setup

try:
    from pypandoc import convert
    read_md = lambda f: convert(f, 'rst')
except ImportError:
    print('pandoc is not installed.')
    read_md = lambda f: open(f, 'r').read()

setup(name='gsq',
      version='0.1.6',
      description='G Square Conditional Independence Test',
      long_description=read_md('README.md'),
      author='Keiichi SHIMA',
      author_email='keiichi@iijlab.net',
      url='https://github.com/keiichishima/gsq/',
      packages=['gsq'],
      install_requires=['scipy>=0.18.1','numpy>=1.12.0'],
      classifiers=[
          'Development Status :: 4 - Beta',
          'Environment :: Console',
          'Intended Audience :: Information Technology',
          'Intended Audience :: Science/Research',
          'License :: OSI Approved :: GNU General Public License v2 or later (GPLv2+)',
          'Programming Language :: Python :: 2.7',
          'Topic :: Scientific/Engineering :: Information Analysis',
          'Topic :: Software Development :: Libraries :: Python Modules'],
      license='GNU General Public License v2 or later (GPLv2+)',
     )
