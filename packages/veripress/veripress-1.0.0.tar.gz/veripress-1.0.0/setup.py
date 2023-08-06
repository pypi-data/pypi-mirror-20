from setuptools import setup

setup(
    name='veripress',
    version='1.0.0',
    packages=['veripress', 'veripress.api', 'veripress.model', 'veripress.view', 'veripress_cli'],
    url='https://github.com/veripress/veripress',
    license='The MIT License',
    author='Richard Chien',
    author_email='richardchienthebest@gmail.com',
    description='A blog engine for hackers.',
    install_requires=[
        'flask', 'flask-caching', 'pyyaml', 'mistune', 'pygments', 'feedgen'
    ],
    include_package_data=True,
    platforms='any',
    entry_points=dict(
        console_scripts=['veripress=veripress_cli:main']
    )
)
