from setuptools import setup, find_packages
from os import path

here = path.abspath(path.dirname(__file__))

with open('README.md') as f:
    long_description = f.read()

setup(
    name='owo',

    version='2.2.0',

    description='Python API wrapper for api.awau.moe',
    long_description=long_description,

    url='https://github.com/whats-this/owo.py',

    author='martmists',
    author_email='martmists@gmail.com',

    license='MIT',

    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'Topic :: Communications :: File Sharing',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3.5',
    ],
    install_requires=[
		"requests"
	],
    packages=find_packages(),

    entry_points = {
        'console_scripts': ['owo=owo.cli:main', 'owo-bg=owo.bg:main', 
                            'owo-fix=owo.fix_termux:main'],
    },
    keywords='api wrapper owo',
)