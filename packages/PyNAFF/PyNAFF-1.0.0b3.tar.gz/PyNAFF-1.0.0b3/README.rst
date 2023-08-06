====
PyNAFF
====
A Python Module for Numerical Analysis of Fundamental Frequencies
--------

Authors:
--------
- Nikos Karastathis (nkarast .at. cern .dot. ch)
- Panagiotis Zisopoulos (pzisopou .at. cern .dot. ch)

This Python module implements the `Numerical Analysis of Fundamental Frequencies<http://www.sciencedirect.com/science/article/pii/001910359090084M>`_. The method was proposed by J. Laskar and has been proven to be most efficient in finding the fundamental frequencies of quasi-periodic signals.

The PyNAFF algorithm needs as input a text file with the tabulated data or simply an `NumPy array<http://www.numpy.org>`_. It returns the fundamental frequencies and the corresponding amplitudes.

-- nkarast
