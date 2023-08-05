"""Hadroid setup."""

from setuptools import setup, find_packages
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

setup(
    name='hadroid',
    version='0.1.0',
    description='A simple Python chatbot.',
    long_description=long_description,
    url='https://github.com/krzysztof/hadroid',
    author='Krzysztof Nowak',
    author_email='kn@linux.com',
    license='GPLv3',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Build Tools',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
    ],
    keywords='bot gitter chat',
    packages=find_packages(exclude=['docs', 'tests']),
    install_requires=[
        'requests>=2.11.1',
        'docopt>=0.6.2',
        'crontab>=0.21.3',
        'pytz>=2016.10',
    ],
    extras_require={
        'dev': [
            'check-manifest'
        ],
        'test': [
            'pytest>=3.0.3'
        ],
    },
    entry_points={
        'console_scripts': [
            'hadroid = hadroid.botctl:main',
        ],
    }
)
