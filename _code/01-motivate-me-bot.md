---
title: "MotivateMeBot"
collection: code
excerpt: 'Python-based Twitter bot that makes motivational pictures by combining pictures with tweets.'
permalink: /code/motivate-me-bot
---

Link: [github.com/bbrzycki/motivate-me-bot](https://github.com/bbrzycki/motivate-me-bot)

![tweet screenshot](/images/2019-09-27.jpg)

This was a fun project that I worked on from 2018 to 2020, to make a Twitter bot that grabbed images and other tweets and mashed them up in a (hopefully!) aesthetic way. It ended up being hit or miss, but there were some gems in there. The bot was hosted on Heroku and produced a new tweet image every day, and that continued until they sunset their free hosting service sometime in 2022. 

## The process

First, the bot selected images from Unsplash's excellent collection of high quality, royalty-free photos, via their API service. Likewise, it used the Twitter API to find tweets and post new remixed images.

To select an image, the bot first analyzed a couple positions for the quote (top and middle of the image) to determine whether the pixels at either position had a good distribution of relative luminance. The bot might've had to try multiple images before it selected one that passes\d the thresholds pre-defined in the script.

Then, the bot selected quotes from Twitter using a few language filters and did a bit of processing to format the text more appropriately for the image (e.g. removing hashtags, adding relevant punctuation, etc.). With a finalized quote, an appropriate text color was selected and the quote was arranged to maximize contrast with the background photo. In addition, the background image was blurred slightly (in a gradient, so that the boundary of the blurring region was hard to distinguish) to further enhance legibility.

After all of this processing, the bot pushed the remix to Twitter with image and quote credits -- hopefully having successfully generated an inspiring picture!

As you can see, there were quite a few steps here! Some of the image processing steps actually took a decent amount of time to look good, but in my opinion, the final result made it all worth it. That being said, the quote font was chosen on purpose to be silly -- that should probably be changed if I decide to go back and resurrect this bot in the future!

## NLP experiments

A lot of the selection logic used in the bot was basically hard-coded; I decided what images and quotes would work and how the quotes should be formatted or edited to look good on the image. However, since it was scraping Twitter (doing a customized search for certain keywords as a function of the day of the week), a *lot* of different results and strange formatting would regularly come up. 

So in 2020, I thought it might be neat to try using natural language processing (NLP) to set up a better quote filter. I took an implementation of [BERT](https://github.com/google-research/bert/tree/eedf5716ce1268e56f0a50264a88cafad334ac61) and figured I could try fine-tuning the pre-trained classifier to directly classify quotes as being good or bad candidates for MotivateMeBot. I created a dataset of thousands of scraped Twitter quotes and labeled them all manually, and used this new labeled dataset of quotes to fine-tune the BERT model. The results were surprisingly good! However, as this was back in 2020 when I was an early PhD student, I didn't want to continuously pay for online hosting for a deep ML model that, ultimately, was only producing silly motivational images for Twitter. So unfortunately, I never fully deployed the BERT filtering into production.