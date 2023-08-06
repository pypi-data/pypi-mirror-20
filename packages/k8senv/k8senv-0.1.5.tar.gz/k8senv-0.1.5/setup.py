from setuptools import setup

setup(
    name='k8senv',
    version='0.1.5',
    url='http://github.com/philipn/k8senv',
    license='MIT',
    description='A simple way to manage different Kubernetes contexts',
    long_description=open('README.md').read(),
    author='Philip Neustrom',
    author_email='philipn@gmail.com',
    zip_safe=False,
    scripts=['bin/k8senv'],
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: MIT License',
        'Operating System :: OS Independent',
    ]
)
