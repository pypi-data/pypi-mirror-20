from setuptools import setup, find_packages

setup(
    name='Hiku',
    version='0.2.1.post1',
    description='Library to implement Graph APIs',
    author='Vladimir Magamedov',
    author_email='vladimir@magamedov.com',
    url='https://github.com/vmagamedov/hiku',
    packages=find_packages(),
    include_package_data=True,
    license='BSD',
    install_requires=[],
    extras_require={
        'sqlalchemy': ['sqlalchemy'],
        'graphql': ['graphql-core'],
    }
)
