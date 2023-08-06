# -*- coding: utf-8 -*-
import io

from setuptools import setup, find_packages
import sys

# install_requires = []
# if (sys.version_info[0], sys.version_info[1]) < (3, 2):
#     install_requires.append('futures>=2.1.3')

setup(
    name='openpyxl-templates',
    version='0.1.1',
    description='A wrapper around openpyxl to simplify reading and writing of tables.',
    # long_description=io.open('README.rst', encoding='utf-8').read() + '\n\n' +
    #     io.open('HISTORY.rst', encoding='utf-8').read(),
    author='Sverker Sjöberg',
    url='https://github.com/SverkerSbrg/openpyxl-templates',
    license='MIT',
    packages=find_packages(exclude=['tests']),
    zip_safe=False,
    install_requires=[
        "openpyxl"
    ],
    include_package_data=True,
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: Implementation :: PyPy',
    ]
)