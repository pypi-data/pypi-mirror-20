from setuptools import setup


version = "0.12.1"
readme = open("README.rst").read()
url = "https://github.com/JIC-CSB/dtool"

setup(name="dtool",
      packages=["dtool"],
      version=version,
      description="Tools for managing scientific data",
      include_package_data=True,
      long_description=readme,
      author='Tjelvar Olsson',
      author_email='tjelvar.olsson@jic.ac.uk',
      url=url,
      download_url="{}/tarball/{}".format(url, version),
      install_requires=[
        "click",
        "jinja2",
        "pyyaml",
        "python-magic",
      ],
      entry_points={
          'console_scripts': ['dtool=dtool.cli:cli']
      },
      license="MIT")
