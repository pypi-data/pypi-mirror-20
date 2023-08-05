from distutils.core import setup

setup(
  name = 'http_api_exporter',
  packages = ['http_api_exporter'],
  version = '0.1.1',
  description = 'A simple api exporter for py',
  author = 'Sraw',
  author_email = 'lzyl888@gmail.com',
  url = 'https://github.com/Sraw/http_api_exporter', 
  download_url = 'https://github.com/Sraw/http_api_exporter/tarball/0.1', 
  keywords = ['testing', 'logging', 'example'], # arbitrary keywords
  classifiers = [
      'Programming Language :: Python :: 3'
    ],
  install_requires=[
          'tornado',
      ],
)