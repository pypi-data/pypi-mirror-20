from distutils.core import setup

setup(
    name='Kadot',
    version='0.1.3',
    packages=['kadot'],
    url='https://github.com/the-new-sky/Kadot',
    long_description= open('README', 'r').read(),
    download_url='https://github.com/the-new-sky/Kadot/archive/0.1.2.tar.gz',
    install_requires=['numpy', 'scipy', 'sklearn'],
    license='MIT',
    author='the_new_sky',
    author_email='lorisazerty gmail.com',
    description='Kadot, the clean natural language processing toolkit.',
    keywords=['named entity recognition', 'natural language processing',
              'text classification', 'text generation', 'tokenizer', 'word embeddings'],
    classifiers=['Development Status :: 3 - Alpha', 'Intended Audience :: Developers',
                 'License :: OSI Approved :: MIT License', 'Programming Language :: Python :: 3.5',
                 'Programming Language :: Python :: 3.6', 'Topic :: Scientific/Engineering :: Artificial Intelligence',
                 'Topic :: Text Processing :: General']
)
