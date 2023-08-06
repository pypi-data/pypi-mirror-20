# coding=utf-8

from setuptools import setup
from setuptools.command.test import test


class TestHook(test):
    def run_tests(self):
        import nose
        nose.main(argv=['nosetests', 'tests/', '-v', '--logging-clear-handlers'])


setup(
    name='lxml-asserts',
    version='0.1.2',
    description='Handy functions for testing lxml etree objects for equality and compatibility',
    url='https://github.com/SuminAndrew/lxml-asserts',
    author='Andrew Sumin',
    author_email='sumin.andrew@gmail.com',
    classifiers=[
        'License :: OSI Approved :: Apache Software License',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: CPython',
        'Topic :: Software Development :: Testing',
    ],
    license="http://www.apache.org/licenses/LICENSE-2.0",
    cmdclass={
        'test': TestHook
    },
    packages=[
        'lxml_asserts'
    ],
    install_requires=[
        'lxml',
    ],
    test_suite='tests',
    tests_require=[
        'nose',
        'pycodestyle == 2.3.1'
    ],
    zip_safe=False
)
