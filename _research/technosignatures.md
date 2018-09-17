---
title: "Machine Learning Searches for ISM-Scintillated Technosignatures"
collection: research
excerpt: 'Using convolutional neural networks to search for and classify narrow-band signals in data from the Green Bank Telescope.'
permalink: /research/technosignatures
---

I am currently working with Dr. Andrew Siemion and [Breakthrough Listen](https://seti.berkeley.edu/listen/) to search for ISM-scintillated narrow band signals in radio time-frequency data with convolutional neural networks.

Now, that's quite a bit of jargon. The grander goal of Breakthrough Listen is to detect technosignatures (evidence of intelligent life elsewhere in the universe). As such, my project is motivated by trying to detect a specific kind of signal that may be considered a technosignature.

Searches for ET are done primarily via radio observations. Breakthrough Listen, based at Berkeley, uses the [Green Bank Telescope](https://greenbankobservatory.org/telescopes/gbt/) (GBT; the largest fully-steerable radio telescope on the planet) to ultimately record about 500 GB of data per hour. For a more in depth description of Breakthrough Listen and how we look for ET, check out [this guide](https://github.com/UCBerkeleySETI/breakthrough/tree/master/GBT).

The data we get from the GBT comes as arrays of detected intensity as a function of time and frequency. It turns out that we can essentially visualize this as a spectrogram or 'waterfall plot.' We typically put frequency on the $x$-axis and time on the $y$-axis and represent intensity as a color according to a colorbar.

This means that we can save chunks of data as independent images, where different colors correspond to higher or lower intensities, and use image classification techniques a la machine learning!

The most common model used for image classification is the [convolutional neural network](https://en.wikipedia.org/wiki/Convolutional_neural_network) (CNN). CNNs are especially effective at detecting objects based on morphology. So, if we can train a CNN on enough known or labeled data containing a signal of interest with certain features, it should be able to pick out such features in real observations and end up finding those signals.

So what kind of signals should we look for? This is already an open question, but one idea is to observe the center of our galaxy and see if we can find evidence of narrow-band signals scintillating from the interstellar medium (ISM). The ISM is comprised of gas and dust which can end up varying the intensity of light according to a characteristic timescale, so if we can detect this variation in signals that are too narrow in frequency to occur naturally (the same way FM or AM signals are confined to a tight range of radio frequencies), they could very well be the first detected technosignatures!

Problem is, if we had any good examples of these signals, we all would've heard about it. Since we don't, our best option is to simulate them. Over the summer (2018), I wrote a Python package called [setigen](/code/setigen) to facilitate the generation of synthetic narrow-band signals.

Using `setigen`, I can produce thousands upon thousands of image frames with a host of unique signal classes and use these as training data for CNNs. My current work is three-fold: to generate signals that resemble those found in observations (i.e. human-made radio interference, or RFI), to generate signals that exhibit ISM-scintillation (exactly how this looks is still uncertain), and to develop a CNN that accurately classifies signals. And though it might be ambitious, I hope to further be able to identify the locations and shapes of each signal within observation data, surpassing image classification and becoming object detection.

----

I began this research during the summer of 2018 as part of the Berkeley SETI internship and presented my progress in August at the Astronomy Poster Summer Intern Symposium (APSIS) at Berkeley. You can download my poster [here](/files/poster.pdf)!
