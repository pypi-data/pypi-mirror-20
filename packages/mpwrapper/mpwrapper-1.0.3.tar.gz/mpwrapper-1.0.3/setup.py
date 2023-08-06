from setuptools import setup

setup(
    name='mpwrapper',
    packages=['mpwrapper'],
    version='1.0.3',
    description='A simple wrapper written to make the use of Python multiprocessing easy to use',
    author='Shaun Lodder',
    author_email='shaun.lodder@gmail.com',
    url='https://github.com/lodder/python_mpwrapper',
    keywords=['multiprocessing'],
    classifiers=[],
    install_requires=[
        'setuptools',
        'numpy'
    ],
    extras_require={
        'develop': ['nose']
    }
)
