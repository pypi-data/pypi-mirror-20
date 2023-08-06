from setuptools import setup, find_packages

setup(
    name='py-build-server',
    version='0.9.1',
    packages=find_packages(),
    license='GPL3',
    author='chestm007',
    url='https://github.com/chestm007/py_build_server',
    author_email='chestm007@hotmail.com',
    description='My build server i run on my home server to check for git repo tags, and push to pypi',
    entry_points="""
        [console_scripts]
        py-build-server=py_build_server.main:main
    """,
    requires=[
        'click',
        'gitpython',
        'pyyaml',
        'requests'
    ]
)
