#!/usr/bin/env python
# flake8: noqa

from setuptools import setup, find_packages
setup(
    name = "a10-neutronclient",
    version = "0.2.0",
    packages = find_packages(),

    author = "A10 Networks",
    author_email = "dougw@a10networks.com",
    description = "A10 Networks Neutron Client Extensions",
    license = "Apache",
    keywords = "a10 adc slb load balancer openstack neutron lbaas cli",
    url = "https://github.com/a10networks/a10-neutronclient",

    long_description = 'A10 neutron client extensions',

    classifiers = [
        'License :: OSI Approved :: Apache Software License',
        'Operating System :: POSIX',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Topic :: Internet',
    ],
    entry_points = {
        'neutronclient.extension': [
            'a10_scaling_group=a10_neutronclient.a10_scaling_group',
            'a10_device_instance=a10_neutronclient.a10_device_instance',
            'a10_certificate=a10_neutronclient.a10_certificate'
        ],
    },
    include_package_data=True,

    install_requires = ['python-neutronclient>=2.3.2', 'a10-openstack-lib>=0.2.0']
)
