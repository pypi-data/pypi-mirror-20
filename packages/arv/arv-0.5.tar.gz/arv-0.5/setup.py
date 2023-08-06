from setuptools import setup, Extension
from setuptools.command.build_ext import build_ext
import multiprocessing
import os
import shutil
import unittest

def extra_compile_flags(debug=None, warnings=True, hidden_symbols=True,
        strip=True):
    flags = []

    # TODO: Can we detect compiler through Cython? We default to gcc here,
    # which isn't very polite.
    flags += [
        "--std=c++11",
        "-DBUILDING_DLL",
    ]

    if warnings:
        flags += ["-W", "-Wall"]

    if not debug:
        flags += [
            "-g0", # no symbols
            "-march=native",
            "-mtune=native",
            "-O2",
        ]
        if hidden_symbols:
            flags += ["-fvisibility=hidden",
                      "-include", "cpp/public_py_init_sym.hpp"]

    return flags

def extra_link_flags(debug=False, strip=True):
    flags = []

    if strip:
        flags += ["-Wl,-s"]

    return flags

# From http://stackoverflow.com/a/26698408/21028
class lazy_cythonize(list):
    def __init__(self, callback):
        self._list, self.callback = None, callback
    def c_list(self):
        if self._list is None: self._list = self.callback()
        return self._list
    def __iter__(self):
        for e in self.c_list(): yield e
    def __getitem__(self, ii): return self.c_list()[ii]
    def __len__(self): return len(self.c_list())

def configure_google_hashmap():
    script = os.path.join("3rd-party", "sparsehash", "configure")
    config = os.path.join("cpp", "sparsehash", "internal", "sparseconfig.h")

    if not os.path.isfile(config):
        print("Configuring Google hash map")
        if os.system(script) == 0:
            shutil.copy(os.path.join("src", "config.h"), config)
        else:
            raise RuntimeError("Error configuring Google hash map")

class BuildExt(build_ext):
    def run(self):
        configure_google_hashmap()
        return build_ext.run(self)

def extensions():
    from Cython.Build import cythonize
    import multiprocessing

    exts = [
        Extension("_arv", [
                "cpp/arv.cpp",
                "cpp/file.cpp",
                "cpp/filesize.cpp",
                "cpp/mmap.cpp",
                "cpp/parse.cpp",
                "cython/_arv.pyx",
            ],
            language="c++",
            include_dirs=["cpp"],
            extra_compile_args=extra_compile_flags(os.getenv("ARV_DEBUG", False)),
            extra_link_args=extra_link_flags(os.getenv("ARV_DEBUG", False)),
        ),
    ]
    #configure_google_hashmap()
    return cythonize(exts, nthreads=multiprocessing.cpu_count())

def slurp(filename):
    with open(filename, "rt") as f:
        return f.read()

def get_testsuite():
    loader = unittest.TestLoader()
    suite = loader.discover("tests", pattern="test*.py")
    return suite

setup(
    name="arv",
    packages=["arv"],
    version="0.5",
    description="A fast 23andMe raw genome file parser",
    author="Christian Stigen Larsen",
    author_email="csl@csl.name",
    url="https://github.com/cslarsen/arv",
    license="https://www.gnu.org/licenses/gpl-3.0.html",
    long_description=slurp("README.rst"),
    keywords=[
        "23andMe",
        "bio",
        "biology",
        "biopython",
        "disease",
        "DNA",
        "gene",
        "genome",
        "health",
        "protein",
        "RNA",
        "RSID",
        "SNP",
    ],
    platforms=["unix", "linux", "osx"],
    install_requires=["cython>=0.25"],
    setup_requires=["cython>=0.25"],
    ext_modules=lazy_cythonize(extensions),
    test_suite="setup.get_testsuite",
    cmdclass={'build_ext': BuildExt},
    classifiers=[
        "Development Status :: 3 - Alpha",
        "Natural Language :: English",
        "Operating System :: MacOS :: MacOS X",
        "Operating System :: POSIX",
        "Operating System :: Unix",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2",
        "Programming Language :: Python :: 2.7",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.3",
        "Programming Language :: Python :: 3.4",
    ],
)
