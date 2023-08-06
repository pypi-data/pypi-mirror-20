#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    Setup file for congresso.

    This file was generated with PyScaffold 2.5.7, a tool that easily
    puts up a scaffold for your new Python project. Learn more under:
    http://pyscaffold.readthedocs.org/
"""
"""

from setuptools import setup
from congresso import __version__



def setup_package():
    needs_sphinx = {'build_sphinx', 'upload_docs'}.intersection(sys.argv)
    sphinx = ['sphinx'] if needs_sphinx else []
    setup(
        setup_requires=['six', 'pyscaffold>=2.5a0,<2.6a0'] + sphinx,
        use_pyscaffold=True,
        version=__version__,
        install_requires=['pip', 'requests'],
    )
"""


from distutils.core import setup
import sys


setup(name='congresso',
      version='0.1.0',
      description='Low Level Python Client of Brazilian Camara e Senado Federal API',
      author='jaotta',
      author_email='joao.carabetta@gmail.com',

        )



if __name__ == "__main__":
    setup()
