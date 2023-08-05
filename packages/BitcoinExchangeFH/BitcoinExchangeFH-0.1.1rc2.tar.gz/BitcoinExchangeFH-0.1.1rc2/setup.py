from distutils.core import setup

setup(
    name='BitcoinExchangeFH',
    version='0.1.1rc2',
    author='Gavin Chan',
    author_email='gavincyi@gmail.com',
    packages=['befh'],
    url='http://pypi.python.org/pypi/BitcoinExchangeFH/',
    license='LICENSE.txt',
    description='Cryptocurrency exchange market data feed handler.',
    entry_points={
            'console_scripts': ['befh=befh.befh:main']
        },
    install_requires=[
            'pymysql',
            'websocket',
            'websocket-client',
            'socketIO_client==0.5.6',
            'numpy',
            'qpython',
            'pyzmq'
        ]
    )