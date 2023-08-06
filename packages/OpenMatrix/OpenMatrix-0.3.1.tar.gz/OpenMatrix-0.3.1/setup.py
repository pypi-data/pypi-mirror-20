from setuptools import setup, find_packages

setup(
    name='OpenMatrix',
    keywords='openmatrix omx',
    version='0.3.1',
    author='Billy Charlton',
    author_email='billy@okbecause.com',
    packages=find_packages(),
    url='https://sites.google.com/site/openmodeldata',
    license='Apache',
    description='OMX, the open matrix data format',
    long_description=open('README.txt').read(),
    install_requires=[
        "tables >= 3.1.0",
        "numpy >= 1.5.0",
    ],
    classifiers=[
        'License :: OSI Approved :: Apache Software License'
    ]
)
