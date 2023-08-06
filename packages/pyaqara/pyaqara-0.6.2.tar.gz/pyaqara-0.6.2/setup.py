"""Setup file for aqara package."""
from distutils.core import setup

setup(name='pyaqara',
 version='0.6.2',
 description='Python API for interfacing with the Aqara gateway',
 url='https://github.com/javefang/pyaqara',
 download_url="https://github.com/javefang/pyaqara/tarball/0.6.2",
 author='Xinghong Fang',
 author_email= 'xinghong.fang@gmail.com',
 license='MIT',
 packages=['aqara'],
 keywords = ['aqara', 'home', 'automation', 'sensor'],
 install_requires=[
   'pycrypto'
 ]
)
