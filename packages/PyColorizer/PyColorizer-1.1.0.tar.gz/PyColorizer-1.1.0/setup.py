#!/usr/bin/env python

from setuptools import setup

setup(
    name='PyColorizer',
    version='1.1.0',
    description='Add color in your python shell scripts.',
    author='Pierre Rambaud (GoT)',
    author_email='pierre.rambaud86@gmail.com',
    url='https://github.com/PierreRambaud/pycolorizer',
    license='LGPLv3',
    py_modules=['pycolorizer'],
    install_requires=[],
    tests_require=[
        'nose',
        'flake8'
    ],
)
