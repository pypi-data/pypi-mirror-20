import os
from setuptools import setup, find_packages


def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()


setup(
    name='novo-jsobj',
    url='https://github.com/novopl/jsobj',
    version=read('VERSION').strip(),
    author="Mateusz 'novo' Klos",
    author_email='novopl@gmail.com',
    license='MIT',
    description='Utility class around dict for easier use',
    package_dir={'': 'src'},
    packages=find_packages('src'),
    install_requires=[
        l.strip() for l in read('requirements.txt').split() if '==' in l
    ],
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Topic :: Utilities",
        "Intended Audience :: Developers",
        "Programming Language :: Python",
        "License :: OSI Approved :: MIT License",
    ],
)
