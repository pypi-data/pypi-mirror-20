#!/usr/bin/env python

from distutils.core import setup
from setuptools import find_packages
from distutils.extension import Extension


setup(
    name='corresp',
    version='0.1',
    packages=find_packages(),
    url='http://github.com/yuyu2172/corresp',
    author='Yusuke Niitani',
    author_email='yuyuniitani@gmail.com',
    license='MIT',
    description='Python tools datasets with dense correspondences.',
    #long_description=open('README.md').read(),
    install_requires=open('requirements.txt').readlines(),
)
