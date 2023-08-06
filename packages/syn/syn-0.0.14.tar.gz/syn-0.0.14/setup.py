import re
from setuptools import setup, find_packages

def read(fpath):
    with open(fpath, 'r') as f:
        return f.read()

def requirements(fpath):
    return list(filter(bool, read(fpath).split('\n')))

def metadata(fpath, meta):
    txt = read(fpath)
    m = re.search("(?m)^{}:\s+['\"]?(.+?)['\"]?$".format(meta), txt)
    if m:
        return m.groups()[0]
    raise RuntimeError('Cannot find value for {}'.format(meta))

def version(fpath):
    return metadata(fpath, 'version')

setup(
    name = 'syn',
    version = version('syn/metadata.yml'),
    author = 'Matt Bodenhamer',
    author_email = 'mbodenhamer@mbodenhamer.com',
    description = 'Python metaprogramming, typing, and compilation facilities',
    long_description = read('README.rst'),
    url = 'https://github.com/mbodenhamer/syn',
    packages = find_packages(),
    include_package_data = True,
    install_requires = requirements('requirements.in'),
    namespace_packages = ['syn'],
    license = 'MIT',
    keywords = ['syn', 'metaprogramming', 'typing'],
    classifiers = [
        'Development Status :: 2 - Pre-Alpha',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
        'Programming Language :: Python',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Topic :: Software Development',
        'Topic :: Software Development :: Libraries',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ]
)
