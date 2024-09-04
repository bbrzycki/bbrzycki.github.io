---
title: "Setigen"
collection: code
excerpt: 'Python package for producing simulated time-frequency data from radio telescopes.'
permalink: /code/setigen
---

Link: [github.com/bbrzycki/setigen](https://github.com/bbrzycki/setigen)

<p align="center">
  <img src="/images/flashy_synthetic.png" width="500">
</p>

For my research with Breakthrough Listen (BL) over the summer of 2018, I wrote a Python package called [setigen](https://github.com/bbrzycki/setigen) for generating and injecting artificial narrow-band signals into time-frequency data. It has since expanded into a tool used across the SETI research community by both senior researchers and undergraduate interns! I also wrote an associated [paper](https://iopscience.iop.org/article/10.3847/1538-3881/ac5e3d) describing the mathematical details behind both spectrogram and voltage data formats used in single dish SETI, which has already been cited 7 times as of mid-2024.

## Narrowband signal generation heuristics

The main functionality is synthetic signal generation. The package was designed specifically for narrow-band signal generation, but one of the key design goals was flexibility. Ultimately, injecting an artificial signal is as simple as summing it with baseline data (or noise). To fully describe an artificial signal, we need the following:

* Start and stop times (in most cases, this would be the beginning and end of the observation, assuming the signal is "on" continuously)
* Frequency center of signal as a function of time sample
* Intensity modulation of signal as a function of time sample
* Frequency structure within each time sample
* Overall intensity modulation as a function of frequency (bandpass shape)

`setigen` provides sample functions and profiles (shapes) for each of these parameters. These all contribute to the final structure of the signal. The signal generation itself relies on Python function callbacks for flexibility. Each of the listed parameters is controlled by a function over either time or frequency, which means the user may easily write and use custom functions and profiles. The goal is to empower the user to generate artificial signals that are as simple or complex as one would like.

## Data formats

In addition to synthetic signal generation, `setigen` includes utilities for working with real data itself. Specifically, the data we work with from the Green Bank Telescope (GBT) come as arrays of intensities as a function of frequency and time. These are converted into filterbank format (`.fil`), as described in [this document](http://sigproc.sourceforge.net/sigproc.pdf). Converting raw data into `.fil` format helps save a lot of valuable storage space and provides a convenient way to store header information with the data itself. That being said, sometimes we also work directly with the raw data, the complex voltages that we get out of the telescope FPGA frontend. 

`setigen` includes utilities for working with filterbank files. These include splitting up filterbank files and saving them into smaller files using Python, creating an array of timestamps for the data, and formatting the data as a simple `numpy` array. These are particularly relevant for creating synthetic data arrays that mirror the shape and resolution of actual observations. We can also truncate frames by frequency and de-drift spectrograms by shifting spectra accordingly.

Once synthetic signals are generated according to the shape of real observational data, `setigen` offers methods to inject chi-squared noise and normalize data for analysis. Ideally, the inherent noise in a radio telescope observation is chi-squared, so we can create tons of synthetic data by simply overlaying a synthetic signal over a bed of noise. Normalization is important for things like machine learning, since it's preferable to images be about the same *value* (mean of 0, variance of 1) to better compare them on morphology alone. That being said, if you're normalizing a signal that's constant in time to a mean of 0, the signal will simply disappear into the background noise -- so `setigen`'s normalization method has a few more tunable parameters to help prevent totally losing signal information after normalization.

## Check out more!

There is a *lot* more functionality that you can read about in the documentation on [readthedocs](https://setigen.readthedocs.io/). I made a special effort to keep the documentation up to date and to have good coverage across the entire library, especially since I wanted this to be a robust tool that anyone could pick up and use for their science. This includes maintaining a test suite, which has been important since `setigen` has undergone some massive updates and refactoring rounds over the years.

----

The source code for `setigen` is here: [github.com/bbrzycki/setigen](https://github.com/bbrzycki/setigen).
