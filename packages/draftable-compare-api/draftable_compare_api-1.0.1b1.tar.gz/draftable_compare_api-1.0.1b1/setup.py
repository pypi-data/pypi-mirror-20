from setuptools import setup

setup(name='draftable_compare_api',
      version='1.0.1b1',
      description='Draftable Compare API - Python Client Library',
      longdescription=open('README.md').read(),
      keywords='compare documents draftable api pdf word powerpoint',
      url='https://github.com/draftable/compare-api-python-client',
      author='Draftable',
      author_email='hello@draftable.com',
      license='MIT',
      packages=['draftable'],
      install_requires=['requests'])
