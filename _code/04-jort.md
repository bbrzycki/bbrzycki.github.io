---
title: "Jort"
collection: code
excerpt: 'Utility for tracking, profiling, and notifying progress for both Python scripts and command line executables.'
permalink: /code/jort
---

Link: [github.com/bbrzycki/jort](https://github.com/bbrzycki/jort)

Jort is a Python-based utility that I wrote to help profile long, complex scripts for my astrophysics research. While there exist profiling tools in Python, I felt that they were too granular for my desired use cases. Specifically, I wanted to log the length of macro processes, like the amount of time it took to fully search a given observation for narrowband signals and how long it took to extract summary statistics from each individual signal. 

So I wrote `jort` to interface both with Python scripts *as* Python code and as a command-line tool that wraps around other command-line executables. I also added a way to notify you via email or even SMS (through Twilio) when jobs are completed, which has been a life-saver for scripts that run over many hours or even days. While supercomputers and large clusters tend to have their own scheduling infrastructure, smaller scale clusters and research groups (like mine) might not have that kind of infrastructure set up, so I found `jort` very useful for tracking large and complex jobs. 

![jort track](/images/jort_track_help.png)