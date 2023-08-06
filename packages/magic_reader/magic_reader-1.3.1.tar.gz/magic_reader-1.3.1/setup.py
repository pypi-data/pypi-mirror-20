from distutils.core import setup

setup(
    name='magic_reader',
    description="Read requests/files/dbs without importing external libraries with simple exact command.",
    author="Benny Elgazar",
    author_email="Benjaminelgazar@gmail.com",
    url='https://github.com/bennyelg/magic_reader',
    version='1.3.1',
    packages=['magic_reader', 'magic_reader.readers'],
    install_requires=[
        "requests",
        "pyyaml",
        "ujson",
        "unicodecsv",
        "psycopg2",
        "MySQL-python",
        "retrying",
        "fake-useragent",
        "boto3"
    ],
    classifiers=[
          'Intended Audience :: Developers',
          'Intended Audience :: Customer Service',
          'Intended Audience :: System Administrators',
          'Operating System :: Microsoft',
          'Operating System :: MacOS :: MacOS X',
          'Operating System :: Unix',
          'Operating System :: POSIX',
          'Programming Language :: Python',
          'Programming Language :: Python :: 2.7',
          'Topic :: Software Development',
          'Topic :: Software Development :: Libraries',
          'Topic :: Software Development :: Libraries :: Python Modules',
          'Topic :: System :: Software Distribution',
          'Topic :: System :: Systems Administration',
          'Topic :: Utilities'
      ],
    license='MIT',
)
