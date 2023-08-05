.. vim: set fileencoding=utf-8 :
.. Tiago de Freitas Pereira <tiago.pereira@idiap.ch>
.. Thu 02 Feb 2016 14:03:40 CET

============
Installation
============

Our input for the competition uses the signal-processing and machine learning toolbox called `Bob <https://www.idiap.ch/software/bob/>`_.
Follow bellow the instructions to, first, install Bob and then install our competition software.

1 - Installing bob
##################

Bob is a signal-processing and machine learning toolbox originally developed by the Biometrics Group at Idiap, in Switzerland.

We offer pre-compiled binary installations of Bob (v2) using conda for Linux and MacOSX. 
The sequence of commands below will get you started and will install all required dependencies.

.. code-block:: shell

  # for linux
  wget https://repo.continuum.io/miniconda/Miniconda3-latest-Linux-x86_64.sh -O ~/miniconda.sh

  # for mac
  wget https://repo.continuum.io/miniconda/Miniconda3-latest-MacOSX-x86_64.sh -O ~/miniconda.sh

  bash ~/miniconda.sh
  # Make sure you follow instructions and modify your
  # $PATH variable according to the installation instructions.
  mv ~/.condarc ~/.condarc.bak
  # remove any conda configuration that might interfere.
  # We don't use conda-forge for distributing bob anymore and bob packages 
  # are not compatible with conda-forge packages. So don't mix them!
  conda update -n root conda

  # Adding some the defaults and the bob.conda channels
  conda config --set show_channel_urls True
  conda config --add channels defaults
  conda config --add channels https://www.idiap.ch/software/bob/conda
  
  # Creating the conda env
  conda create -n bob_env_py27 python=2.7 gcc=4
  source activate bob_env_py27

  #Install depedendencies
  conda install scikit-image
  conda install -c bob bob.extension bob.blitz bob.core bob.io.base bob.sp bob.ap bob.math bob.measure bob.db.base bob.io.audio bob.io.image bob.io.video bob.io.matlab bob.ip.base bob.ip.color bob.ip.draw bob.ip.gabor bob.learn.activation bob.learn.libsvm bob.learn.linear bob.learn.boosting bob.learn.em bob.ip.facedetect bob.ip.flandmark

  # A small test to see if things are working
  python -c 'import bob.io.base'


2 - Competition software installation
#####################################

Once Bob is installed, you can install our competition input either via `pip` or via `zc.buildout`.

The installation via `zc.buildout` is easier to debug and since this submission is intermediate, we will describe only the installation via this `zc.buildout`.
Follow bellow the steps to install it.

.. code-block:: shell

  # Be sure that you have the conda-env that you created in the last step activated 
  source activate bob_env_py27

  # Cloning the repo
  git clone https://gitlab.idiap.ch/bob/bob.bio.pericrosseye_competition/
  cd bob.bio.pericrosseye_competition
  
  # Checking out the last tag
  git checkout -b v1.0.0b0 tags/v1.0.0b0
  
  # Installation
  python bootstrap-buildout.py
  ./bin/buildout
  
  # Most important step. THE UNIT TESTS
  ./bin/nosetests -sv bob.bio.pericrosseye_competition



===================
Competition scripts
===================

This section describes how to run the competition scripts.
Implementation and fine tunning details are described `here <tunning.html#background>`_.

We provide two periocular recognition systems.
The fist one is based on Intersession Variability Modelling [FRE16]_ and the second one is based on Geodesic Flow Kernel on Gabor Graphs.


Intersession Variability Modelling
##################################

The script ``perienroll_idiap.py``, enrolls a client given an image using this system.
Follow bellow the help message of the script.

.. code-block:: shell

  ./bin/perienroll_idiap.py --help

  Enroll a client using Intersession Variability Modelling

  Usage:
    perienroll_idiap.py <image_file> <template_file> <output_file> [-v]
    perienroll_idiap.py -h | --help
  Options:
    -h --help           Show this screen.
    -v                  Verbosity level


.. warning::
  The `<template_file>` argument must have the extension `.hdf5` (example: template_client_001.hdf5).
  


The scoring script is carryed out using the script ``perimatch_idiap.py``.

.. code-block:: shell

  ./bin/perimatch_idiap.py --help
  Do the matching using Intersession Variability Modelling
  Usage:
    perimatch_idiap.py <image_file> <template_file> <output_file> [-v]
    perimatch_idiap.py -h | --help
  Options:
    -h --help           Show this screen.
    -v                  Verbosity level


.. warning::
  The `<template_file>` argument must have the extension `.hdf5` (example: template_client_001.hdf5).


Geodesic Flow Kernel on Gabor Graphs
####################################

The script ``perienroll_idiap_gfk.py``, enrolls a client given an image using this system.
Follow bellow the help message of the script.

.. code-block:: shell

  ./bin/perienroll_idiap_gfk.py

  Enroll a client using the Gabor Graph with Geodesic Flow Kernel

  Usage:
    perienroll_idiap_gfk.py <image_file> <template_file> <output_file> [-v]
    perienroll_idiap_gfk.py -h | --help
  Options:
    -h --help           Show this screen.
    -v                  Verbosity level

.. warning::
  The `<template_file>` argument must have the extension `.hdf5` (example: template_client_001.hdf5).


The scoring script is carryed out using the script ``perimatch_idiap_gfk.py``.

.. code-block:: shell

  ./bin/perimatch_idiap_gfk.py --help

  Do the matching using the Gabor Graph with Geodesic Flow Kernel

  Usage:
    perimatch_idiap_gfk.py <image_file> <template_file> <output_file> [-v]
    perimatch_idiap_gfk.py -h | --help
  Options:
    -h --help           Show this screen.
    -v                  Verbosity level

.. warning::
  The `<template_file>` argument must have the extension `.hdf5` (example: template_client_001.hdf5).


