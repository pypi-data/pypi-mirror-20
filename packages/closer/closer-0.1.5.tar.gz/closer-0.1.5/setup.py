from setuptools import setup, find_packages

README = 'a small script that runs a Popen command and closes all its child subprocesses'

requires = [ 'psutil' ]
tests_require = []

setup(name='closer',
      version='0.1.5',
      description=README,
      long_description=README,
      url='https://github.com/haarcuba/closer',
      classifiers=[
          "Programming Language :: Python",
      ],
      author='Yoav Kleinberger',
      author_email='haarcuba@gmail.com',
      keywords='subprocess',
      packages=find_packages(),
      include_package_data=True,
      zip_safe=False,
      extras_require={
          'testing': tests_require,
      },
      install_requires=requires,
      entry_points="""\
      [console_scripts]
      closer = closer.closer:main
      """,
      )
