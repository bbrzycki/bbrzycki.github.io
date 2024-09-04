---
title: "Narrow-band Signal Localization for SETI on Noisy Synthetic Spectrogram Data"
collection: publications
category: manuscripts
permalink: /publication/2020-09-21-narrowband-localization
excerpt: 
date: 2020-09-21
venue: 'Publications of the Astronomical Society of the Pacific'
paperurl: 'https://iopscience.iop.org/article/10.1088/1538-3873/abaaf7/meta'
citation: 'Brzycki, B. et al. (2020). &quot;Narrow-band Signal Localization for SETI on Noisy Synthetic Spectrogram Data.&quot; <i>PASP</i>, 132, 114501.'
---

For this paper, I used convolutional neural networks to localize narrowband radio signals within time-frequency spectrograms.

**Abstract:** As it stands today, the search for extraterrestrial intelligence is highly dependent on our ability to detect interesting candidate signals, or technosignatures, in radio telescope observations and distinguish these from human radio frequency interference (RFI). Current signal search pipelines look for signals in spectrograms of intensity as a function of time and frequency (which can be thought of as images), but tend to do poorly in identifying multiple signals in a single data frame. This is especially apparent when there are dim signals in the same frame as bright, high signal-to-noise ratio (S/N) signals. In this work, we approach this problem using convolutional neural networks (CNN) as a computationally efficient method for localizing signals in synthetic observations resembling data collected by Breakthrough Listen using the Green Bank Telescope. We generate two synthetic data sets, the first with exactly one signal at various S/N levels and the second with exactly two signals, one of which represents RFI. We find that a residual CNN with strided convolutions and using multiple image normalizations as input outperforms a more basic CNN with max pooling trained on inputs with only one normalization. Training each model on a smaller subset of the training data at higher S/N levels results in a significant increase in model performance, reducing root mean square errors by at least a factor of 3 at an S/N of 25 dB. Although each model produces outliers with significant error, these results demonstrate that using CNNs to analyze signal location is promising, especially in image frames that are crowded with multiple signals.