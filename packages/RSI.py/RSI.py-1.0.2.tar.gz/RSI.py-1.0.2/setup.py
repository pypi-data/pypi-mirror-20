from setuptools import setup

setup(
    name="RSI.py",
    version="1.0.2",
    description="A library for manipulation of the RSI format used in YASSS13RTWCF.",
    url="https://github.com/NanotrasenInc/RSI.py",
    author="Pieter-Jan Briers",
    author_email="pieterjan.briers@gmail.com",
    license="MIT",
    packages=["rsi"],
    python_requires=">=3.5",
    install_requires=[
        "Pillow"
    ],
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python :: 3.5",
        "Programming Language :: Python :: 3.6",
        "Topic :: Software Development :: Libraries :: Python Modules"
    ]
)
