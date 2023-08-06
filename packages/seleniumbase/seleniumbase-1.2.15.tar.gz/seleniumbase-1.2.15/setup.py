"""
The setup package to install SeleniumBase dependencies and plugins
"""

from setuptools import setup, find_packages  # noqa

setup(
    name='seleniumbase',
    version='1.2.15',
    url='http://seleniumbase.com',
    author='Michael Mintz',
    author_email='@mintzworld',
    maintainer='Michael Mintz',
    description='Reliable Browser Automation - http://seleniumbase.com',
    license='The MIT License',
    install_requires=[
        'pip>=8.1.2',
        'setuptools>=28.2.0',
        'selenium==2.53.6',
        'nose>=1.3.7',
        'pytest>=3.0.2',
        'six>=1.10.0',
        'flake8==3.0.4',
        'requests==2.11.1',
        'urllib3==1.17',
        'BeautifulSoup==3.2.1',
        'unittest2==1.1.0',
        'chardet==2.3.0',
        'simplejson==3.8.2',
        'boto==2.42.0',
        'ipdb==0.9.4',
        'pyvirtualdisplay==0.2',
        ],
    packages=['seleniumbase',
              'seleniumbase.core',
              'seleniumbase.plugins',
              'seleniumbase.fixtures',
              'seleniumbase.masterqa',
              'seleniumbase.common',
              'seleniumbase.config'],
    entry_points={
        'nose.plugins': [
            'base_plugin = seleniumbase.plugins.base_plugin:Base',
            'selenium = seleniumbase.plugins.selenium_plugin:SeleniumBrowser',
            'page_source = seleniumbase.plugins.page_source:PageSource',
            'screen_shots = seleniumbase.plugins.screen_shots:ScreenShots',
            'test_info = seleniumbase.plugins.basic_test_info:BasicTestInfo',
            ('db_reporting = '
             'seleniumbase.plugins.db_reporting_plugin:DBReporting'),
            's3_logging = seleniumbase.plugins.s3_logging_plugin:S3Logging',
            ('hipchat_reporting = seleniumbase.plugins'
             '.hipchat_reporting_plugin:HipchatReporting'),
            ]
        }
    )
