"""
Obtain video details for YouTube channels.
"""
from setuptools import find_packages, setup

dependencies = ['requests>=2.13.0', 'click>=6.6']

setup(
    name='ytdata',
    version='0.1.0',
    url='https://github.com/danlou/ytdata',
    license='MIT',
    author='Daniel Loureiro',
    author_email='daniel.b.loureiro@gmail.com',
    description='Obtain video details for YouTube channels.',
    long_description=__doc__,
    packages=find_packages(exclude=['tests']),
    include_package_data=True,
    zip_safe=False,
    platforms='any',
    install_requires=dependencies,
    entry_points={
        'console_scripts': [
            'ytdata = ytdata.cli:main',
        ],
    },
    classifiers=[
        # As from http://pypi.python.org/pypi?%3Aaction=list_classifiers
        # 'Development Status :: 1 - Planning',
        # 'Development Status :: 2 - Pre-Alpha',
        # 'Development Status :: 3 - Alpha',
        'Development Status :: 4 - Beta',
        # 'Development Status :: 5 - Production/Stable',
        # 'Development Status :: 6 - Mature',
        # 'Development Status :: 7 - Inactive',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        # 'Operating System :: POSIX',
        'Operating System :: MacOS',
        'Operating System :: Unix',
        # 'Operating System :: Microsoft :: Windows',
        'Programming Language :: Python',
        # 'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 3',
        'Topic :: Software Development :: Libraries :: Python Modules',
    ]
)
