---
title: "blossom"
collection: code
excerpt: '`blossom` is a simple evolution simulation code.'
permalink: /code/blossom
---
<!-- venue: "Harvard University, Spring 2018" -->

`blossom` is a simple evolution software package that I began in Spring 2018. I got the idea while listening to a talk about genetics and mutations. At the time, I was working with astrophysics fluid dynamics simulations, so what if I wrote a minimalistic simulation suite in which organisms could mutate?

I began reducing the idea to its absolute simplest -- an organism could be represented by a list such as `[dna, position, age] = ["0100", [4, 2], 3]`, and "mutations" could occur simply by random changing elements in the `dna`. Organisms would then only be able to reproduce with one another if their dna sequences are similar enough (a very crude approximation of nature).

At the moment, the project consists of two Python packages: `blossom` and `flowerpot`. `blossom` is the evolution package, and `flowerpot` is a visualization and analysis package that interfaces directly with the simulation outputs from `blossom`. These are both in active development and far from complete!

The project is located at [github.com/blossom-evolution](https://github.com/blossom-evolution).
