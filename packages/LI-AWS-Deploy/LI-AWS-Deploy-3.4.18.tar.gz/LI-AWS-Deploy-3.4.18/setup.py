from setuptools import setup, find_packages
from codecs import open
from os import path
from tools import __version__

def get_version_from_file():
    # get version number from __init__ file
    # before module is installed

    fname = 'tools/__init__.py'
    with open(fname) as f:
        fcontent = f.readlines()
    version_line = [l for l in fcontent if 'VERSION' in l][0]
    return version_line.split('=')[1].strip().strip("'").strip('"')

def get_cmd_from_file():
    # get version number from __init__ file
    # before module is installed

    fname = 'tools/settings.py'
    with open(fname) as f:
        fcontent = f.readlines()
    version_line = [l for l in fcontent if 'TERMINAL_CMD' in l][0]
    return version_line.split('=')[1].strip().strip("'").strip('"')

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, 'README.rst'), encoding='utf-8') as f:
    long_description = f.read()

install_requires = [
    'coverage',
    'datadog',
    'decorator',
    'docopt',
    'gitdb',
    'GitPython',
    'nose',
    'PyGithub',
    'slackweb',
    'awscli',
    'awsebcli',
    'requests<=2.9.1',
    'ipdb',
    'Unidecode'
]


setup(
    name='LI-AWS-Deploy',
    version=__version__,
    description='Dev tools for Loja Integrada Web Applications',
    long_description=long_description,
    author='Chris Maillefaud',
    # Choose your license
    classifiers=[
        'Development Status :: 4 - Beta',
        'Intended Audience :: Developers',
        'Topic :: Software Development :: Build Tools',
        'Programming Language :: Python :: 3.5'
    ],
    keywords='aws deploy',
    packages=find_packages(exclude=['contrib', 'docs', 'tests']),
    install_requires=install_requires,
    entry_points={
        'console_scripts': [
            '{}=tools.run:start'.format(
                get_cmd_from_file()
            ),
        ],
    },
)
