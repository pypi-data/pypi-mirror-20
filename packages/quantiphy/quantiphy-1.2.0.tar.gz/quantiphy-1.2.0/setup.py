try:
    from setuptools import setup
except ImportError:
    from distutils.core import setup

with open('README.rst') as f:
    readme = f.read()

setup(
    name='quantiphy',
    version='1.2.0',
    description='physical quantities (numbers with units)',
    long_description=readme,
    author="Ken Kundert",
    author_email='quantiphy@nurdletech.com',
    url='http://nurdletech.com/linux-utilities/quantiphy',
    download_url='https://github.com/kenkundert/quantiphy/tarball/master',
    license='GPLv3+',
    zip_safe=True,
    py_modules=['quantiphy'],
    install_requires=['six'],
    setup_requires=['pytest-runner>=2.0'],
    tests_require=['pytest'],
    keywords=[
        'quantities', 'physical', 'quantity', 'units', 'SI', 'scale factors',
        'engineering', 'notation',
    ],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'Intended Audience :: Science/Research',
        'License :: OSI Approved :: GNU General Public License v3 or later (GPLv3+)',
        'Natural Language :: English',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Topic :: Utilities',
        'Topic :: Scientific/Engineering',
    ],
)
