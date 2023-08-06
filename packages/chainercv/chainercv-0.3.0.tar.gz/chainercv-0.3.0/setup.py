#!/usr/bin/env python

from distutils.core import setup
from setuptools import find_packages

description = """
Collection of Deep Learning Computer Vision Algorithms implemented in Chainer
"""


setup(
    name='chainercv',
    version='0.3.0',
    packages=find_packages(),
    author='Yusuke Niitani',
    author_email='yuyuniitani@gmail.com',
    license='MIT',
    description=description,
    install_requires=open('requirements.txt').readlines(),
)
