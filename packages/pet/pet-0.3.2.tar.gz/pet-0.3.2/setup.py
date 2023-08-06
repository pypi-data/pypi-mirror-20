from distutils.core import setup


def readme():
    try:
        import pypandoc
        long_description = pypandoc.convert('README.md', 'rst')
    except(IOError, ImportError):
        long_description = open('README.md').read()

    return long_description


setup(
    name='pet',
    version='0.3.2',
    description='This program or lib can download torrent file through'
    + 'email account and send the torrent file to transmission web controller',
    long_description=readme(),
    download_url='https://github.com/drake-jin/pi-email-transmission/archive/0.3.0.tar.gz',
    url='http://github.com/drake-jin/pi-email-transmission',
    author='drakejin',
    author_email='dydwls121200@gmail.com',
    license='MIT',
    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: MIT License',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.2',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: 3.6',
        'Topic :: Text Processing :: Linguistic',
    ],
    include_package_data=True,
    keywords='torrent transmission rpc email download bittorrent utorrent',
    packages=['pet', 'pet/src', 'pet/src/controller', 'pet/test',
              'pet/utils', 'pet/utils/config'],
    # This is for develop yet, I will change this list
    install_requires=[],
    entry_points={
        'console_scripts': [
            'pet=pet.__main__:main'
        ],
    },
    test_suite='nose.collector',
    tests_require=['nose'],
    zip_safe=False
)


'''
ROOT = os.path.abspath(os.path.dirname(__file__))
VERSION = '0.0.1'

def get_requirements(filename):
    return open(os.path.join(ROOT, filename)).read().splitlines()


setup(
    name='pit',
    version=VERSION,
    packages=find_packages(),
    include_package_data=True,
    install_requires=get_requirements('requirements.txt'),
    # tests_require=get_requirements('test-requirements.txt'),
    description='Python module for Transmission Web Controller and any Email
    account',
    long_description=open(os.path.join(ROOT, 'README.md')).read(),
    author='drakejin',
    author_email='dydwls121200@gmail.com',
    url='https://github.com/drake-jin/pi-imap-transmission',
    download_url='https://github.com/drake-jin/pi-imap-transmission',
    # keywords = ['dictionary', 'translate', 'English', 'Korean',
    # 'Naver'],
    license='MIT',
    platforms="Posix; MacOS X; Windows",
    test_suite='nose.collector',
    entry_points={
        'console_scripts': [
            'pit=src.command'
        ]
    },
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Topic :: Software Development :: Testing',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: PyPy',
    ],
)
'''
