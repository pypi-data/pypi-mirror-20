-------------
This repo is used to demonstrate the python packaging and distribution by using setuptools

python 2 is focused

-------------

Key points:

1. By using the setuptools/setup, python packaging could be performed by editing the 
simple setup.py file. 

To be install the python package, just run:

pip install .    #### to use pip3 in python3 env

or 

pip install -e .

2. Setuptools has easy way to distribute the package via PyPI

python setup.py register       ## used to register on PyPi and upload
python setup.py sdist upload   ## package name should be unique in PyPi

3. Others

MANIFEST.in 
    will include all the files needed (except the source code)
install_requires = [] 
    will specify the dependent packages
entry_points={} 
    will be used for command line script
    the function hooked here will be copied to the system path for calling
scripts=[]
    will be used for command line scirpt as above
    for example, export the bin/joke-scripts to system path for calling
include_package_data=True 
    will enable the copy of other non-sourcecode file during installation
