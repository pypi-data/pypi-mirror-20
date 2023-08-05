
# Always prefer setuptools over distutils
from setuptools import setup
# To use a consistent encoding
from codecs import open
from os import path

here = path.abspath(path.dirname(__file__))

# Get the long description from the README file
with open(path.join(here, 'README.md'), encoding='utf-8') as f:
    long_description = f.read()

# bring in __version__ and __name from version.py for install.
with open(path.join(here, 'version.py')) as h:
    exec(h.read())

setup(

    # __name is defined in version.py
    name=__name,

    # Versions should comply with PEP440.  For a discussion on single-sourcing
    # the version across setup.py and the project code, see
    # https://packaging.python.org/en/latest/single_source_version.html

    # __version__ is defined in version.py
    version=__version__,

    description='Module for executing change detection and sending results',
    long_description=long_description,

    maintainer='caustin-usgs',
    maintainer_email='clay.austin.ctr@usgs.gov',

    # The project's main homepage.
    url='https://github.com/usgs-eros/lcmap-change-worker',

    # Author details
    author='',
    author_email='',

    # Choose your license
    license='Public Domain',

    # See https://pypi.python.org/pypi?%3Aaction=list_classifiers
    classifiers=[
        # How mature is this project? Common values are
        #   3 - Alpha
        #   4 - Beta
        #   5 - Production/Stable
        'Development Status :: 3 - Alpha',

        # Indicate who your project is intended for
        'Intended Audience :: Developers',
        # Pick your license as you wish (should match "license" above)
        'License :: Public Domain',

        # Specify the Python versions you support here. In particular, ensure
        # that you indicate whether you support Python 2, Python 3 or both.
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5'
    ],

    # What does your project relate to?
    keywords='python change detection rabbitmq cassandra',

    # You can just specify the packages manually here if your project is
    # simple. Or you can use find_packages().
    # packages=find_packages(exclude=['contrib', 'docs', 'tests']),
    packages=['cw'],

    # Alternatively, if you want to distribute just a my_module.py, uncomment
    # this:
    #   py_modules=["my_module"],

    # List run-time dependencies here.  These will be installed by pip when
    # your project is installed. For an analysis of "install_requires" vs pip's
    # requirements files see:
    # https://packaging.python.org/en/latest/requirements.html
    install_requires=['pika>=0.10.0',
                      'requests>=2.12.4',
                      'lcmap-pyccd==1.0.3b1',
                      'xarray==0.9.1',
                      'pandas==0.19.2',
                      'numpy==1.12.0',

    ],

    # List additional groups of dependencies here (e.g. development
    # dependencies). You can install these using the following syntax,
    # for example:
    # $ pip install -e .[test]
    extras_require={
        'test': ['aniso8601>=1.1.0',
                 'flake8>=3.0.4',
                 'coverage>=4.2',
                 'pytest>=3.0.2',
                 'pytest-profiling>=1.1.1',
                 'gprof2dot>=2015.12.1',
                 'pytest-watch>=4.1.0'],
        'dev': ['jupyter',],
    },

    setup_requires=['pytest-runner', 'pip'],
    tests_require=[],

    # If there are data files included in your packages that need to be
    # installed, specify them here.  If using Python 2.6 or less, then these
    # have to be included in MANIFEST.in as well.
    # package_data={
    #    'sample': ['package_data.dat'],
    # },

    # Although 'package_data' is the preferred approach, in some case you may
    # need to place data files outside of your packages. See:
    # http://docs.python.org/3.4/distutils/setupscript.html#installing-additional-files # noqa
    # In this case, 'data_file' will be installed into '<sys.prefix>/my_data'
    # data_files=[('my_data', ['data/data_file'])],

    # To provide executable scripts, use entry points in preference to the
    # "scripts" keyword. Entry points provide cross-platform support and allow
    # pip to create the appropriate form of executable for the target platform.
    # entry_points={'console_scripts': ['pyccd-detect=ccd.cli:detect', ], },
    entry_points = {'console_scripts': ['lcw-listen=cw.__listener__:main',
                                        'lcw-test-send=cw.__sender__:main']}
    ##entry_points='''
    ##    [core_package.cli_plugins]
    ##    sample=ccd.cli:sample
    ##    another_subcommand=ccd.cli:another_subcommand
    ##''',
)
