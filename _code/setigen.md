---
title: "A Synthetic Signal Generation Package for SETI Research"
collection: code
excerpt: '`setigen` is a Python package for producing simulated time-frequency data from radio telescopes.'
permalink: /code/setigen
---

For my research with Breakthrough Listen (BL) over the summer of 2018, I wrote a Python package called [setigen](/code/setigen) for generating and injecting artificial narrow-band signals into time-frequency data.

The main functionality is synthetic signal generation. The package was designed specifically for narrow-band signal generation, but one of the key design goals was flexibility. Ultimately, injecting an artificial signal is as simple as summing it with baseline data (or noise). To fully describe an artificial signal, we need the following:

* Start and stop times (in most cases, this would be the beginning and end of the observation, assuming the signal is "on" continuously)
* Frequency center of signal as a function of time sample
* Intensity modulation of signal as a function of time sample
* Frequency structure within each time sample
* Overall intensity modulation as a function of frequency (bandpass shape)

`setigen` provides sample functions and profiles (shapes) for each of these parameters. These all contribute to the final structure of the signal. The signal generation itself relies on Python function callbacks for flexibility. Each of the listed parameters is controlled by a function over either time or frequency, which means the user may easily write and use custom functions and profiles. The goal is to empower the user to generate artificial signals that are as simple or complex as one would like.

In addition to synthetic signal generation, `setigen` includes utilities for working with real data itself. Specifically, the data we work with from the Green Bank Telescope (GBT) come as arrays of intensities as a function of frequency and time. These are converted into filterbank format (`.fil`), as described in [this document](http://sigproc.sourceforge.net/sigproc.pdf). Converting raw data into `.fil` format helps save a lot of valuable storage space and provides a convenient way to store header information with the data itself.

The [blimpy](https://github.com/UCBerkeleySETI/blimpy) package developed by BL provides both Python and command-line tools for working with both raw data and filterbank files. As it already provides a convenient way to grab data from `.fil` files, `setigen`'s data reading functions depend on `blimpy`.

Nevertheless, `setigen` includes some further utilities for working with filterbank files that are missing from `blimpy`. These include splitting up filterbank files and saving them into smaller files using Python, creating an array of timestamps for the data, and formatting the data as a simple `numpy` array. These are particularly relevant for creating synthetic data arrays that mirror the shape and resolution of actual observations.

Once synthetic signals are generated according to the shape of real observational data, `setigen` offers methods to inject Gaussian noise and normalize data for analysis. Ideally, the inherent noise in a radio telescope observation is Gaussian, so we can create tons of fake data by simply overlaying a synthetic signal over a bed of Gaussian noise. Normalization is important for things like machine learning, since it's preferable to images be about the same *value* (mean of 0, variance of 1) to better compare them on morphology alone. That being said, if you're normalization a signal that is constant in time to a mean of 0, the signal will simply disappear into the background noise -- so `setigen`'s normalization method has a few more tunable parameters to help prevent totally losing signal information after normalization.

----

The source code for `setigen` is here: [github.com/bbrzycki/setigen](https://github.com/bbrzycki/setigen), and the documentation lives on [readthedocs](https://setigen.readthedocs.io/).
