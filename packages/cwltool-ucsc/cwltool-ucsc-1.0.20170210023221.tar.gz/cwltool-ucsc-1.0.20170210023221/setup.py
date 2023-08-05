#!/usr/bin/env python
import ez_setup

ez_setup.use_setuptools()
import os

import setuptools.command.egg_info as egg_info_cmd
from setuptools import setup

SETUP_DIR = os.path.dirname(__file__)
README = os.path.join(SETUP_DIR, 'README.rst')

try:
    import gittaggers

    tagger = gittaggers.EggInfoFromGit
except ImportError:
    tagger = egg_info_cmd.egg_info

setup(name='cwltool-ucsc',
      version='1.0',
      description='Common workflow language reference implementation patched for UCSC Genomics Institute',
      long_description=open(README).read(),
      author='Common workflow language working group',
      author_email='common-workflow-language@googlegroups.com',
      url="https://github.com/tboser/cwltool",
      download_url="https://github.com/tboser/cwltool",
      license='Apache 2.0',
      packages=["cwltool"],
      package_data={'cwltool': ['schemas/draft-2/*.yml',
                                'schemas/draft-3/*.yml',
                                'schemas/draft-3/*.md',
                                'schemas/draft-3/salad/schema_salad/metaschema/*.yml',
                                'schemas/draft-3/salad/schema_salad/metaschema/*.md',
                                'schemas/v1.0/*.yml',
                                'schemas/v1.0/*.md',
                                'schemas/v1.0/salad/schema_salad/metaschema/*.yml',
                                'schemas/v1.0/salad/schema_salad/metaschema/*.md',
                                'schemas/v1.1.0-dev1/*.yml',
                                'schemas/v1.1.0-dev1/*.md',
                                'schemas/v1.1.0-dev1/salad/schema_salad/metaschema/*.yml',
                                'schemas/v1.1.0-dev1/salad/schema_salad/metaschema/*.md',
                                'cwlNodeEngine.js']},
      install_requires=[
          'setuptools',
          'requests >= 1.0',
          'ruamel.yaml >= 0.12.4',
          'rdflib >= 4.2.0, < 4.3.0',
          'shellescape >= 3.4.1, < 3.5',
          'schema-salad >= 2.2.20170208112505, < 3',
          'typing >= 3.5.2, < 3.6'
      ],
      test_suite='tests',
      tests_require=[],
      entry_points={
          'console_scripts': ["cwltool=cwltool.main:main"]
      },
      zip_safe=True,
      cmdclass={'egg_info': tagger},
      )
