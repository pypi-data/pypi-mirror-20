from setuptools import setup
import os

def read(fname):
    return open(os.path.join(os.path.dirname(__file__), fname)).read()
    
setup(
      name = "PACtool",
      version = "1.0.3",
      author = "Akis, Christina, Paschalis",
      author_email = "pnatsidis@hotmail.com",
      description = "This is our little project for GWAS",
      url = "https://github.com/pnatsi/PACtool",
      keywords = "project python linux gwas bioinfo-grad",
      packages = ['pactool'],
      license = 'MIT',
      install_requires = [
          'matplotlib',
          'numpy',
          'scipy',
          'pyliftover',
          'requests',
      ],
      package_data = {'data':['gwas.controls.gen', 'gwas.cases.gen']},
      long_description = read('README.txt')
)
