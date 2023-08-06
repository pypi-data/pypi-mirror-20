from setuptools import find_packages, setup


setup(
    name='kagiso_search',
    version='3.1.0',
    author='Kagiso Media',
    author_email='development@kagiso.io',
    description='Kagiso Search',
    url='https://github.com/Kagiso-Future-Media/kagiso_search',
    packages=find_packages(),
    install_requires=[
        'wagtail>=1.8.0',
    ]
)
