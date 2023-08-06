from setuptools import setup

setup(name='slicematrixIO',
      version='0.1.1',
      description='SliceMatrix-IO Python API',
      url='http://www.slicematrix.io',
      author='Hekaton LLC',
      author_email='tynan@slicematrix.com',
      license='GPL',
      packages=['slicematrixIO'],
      install_requires=[
          'numpy>=1',
          'pandas',
          'boto3',
          'requests',
      ],
      zip_safe=False)
