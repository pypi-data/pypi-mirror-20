#!/usr/bin/env python3
#coding=UTF-8
from setuptools import setup

def readme():
    with open('README.md') as f:
        return f.read()

major_version = 1
minor_version = 0
build_version = 1

version = '{0}.{1}.{2}'.format(major_version, minor_version, build_version)

setup(name='searchcolor',
      version=version,
      description='Image color extraction from web image search',
      long_description=readme(),
      classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 3',
        'Intended Audience :: Other Audience',
        'Topic :: Artistic Software',
        'Topic :: Multimedia :: Graphics',
      ],
      keywords='image average color search google',
      url='',
      author='Rhys Hansen',
      author_email='rhyshonline@gmail.com',
      license='MIT',
      packages=['searchcolor'],
      install_requires=[
          'imagecolor>=1.0.0',
          'google-api-python-client',
          'requests',
      ],
      include_package_data=True,
      zip_safe=False)
