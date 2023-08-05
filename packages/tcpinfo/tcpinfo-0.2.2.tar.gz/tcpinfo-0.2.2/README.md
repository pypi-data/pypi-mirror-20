TCPinfo is a Python3 extension to collect information about TCP-sockets via the Linux's inet_diag interface
===========================================================================================================
Tested with GNU/Linux Kernel 4.{4-9}

Requires at least Kernel 4.1


Installation of TCPinfo:
--------------------------------------------------------------------------------
* system-wide installation:
    * sudo pip3 install .
* local installation:
    * pip3 install --user .


Compilation requirements:
--------------------------------------------------------------------------------
* Python.h      --> found in package "python3-dev" (Ubuntu) or similiar


Available functions:
--------------------------------------------------------------------------------
* startUp()
* getTcpInfoList()
* getListOfAvailableValues()
* tearDown()
