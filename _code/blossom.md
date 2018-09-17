---
title: "An Organism Evolution Simulator in Python"
collection: code
excerpt: 'The `blossom` package is an ever expanding evolution simulation code.'
permalink: /code/blossom
---
<!-- venue: "Harvard University, Spring 2018" -->

`blossom` is a simple evolution software package that I began in Spring 2018. I got the idea while listening to a research talk about genetics and mutations at Harvard. At the time, I was working with astrophysics fluid dynamics simulations, so I thought: what if I wrote my own minimalistic simulation suite in which organisms could mutate?

I began reducing the idea to its absolute simplest -- an organism could be represented by a list such as `[dna, position, age] = ["0100", [4, 2], 3]`, and "mutations" could occur simply by random changing elements in the `dna`. Organisms would then only be able to reproduce with one another if their DNA sequences are similar enough (a very crude approximation of nature).

This idea "blossomed" into its current realization as a more detailed and careful treatment of organism evolution. Instead of simple lists, `Organisms` are objects that live in and interact with a `World` object, all of which is contained with a `Universe`. As I thought more and more about the possibilities of the simulation, I made sure to be very careful in establishing the framework behind the simulation package. This basically meant I made design decisions way before I coded anything up, and started with the very basics -- could I successfully instantiate a universe with a population of *stationary* organisms with absolutely no other behaviors and read and write datasets successfully? By thinking through the basics beforehand, extending this to random movement, then to reproduction via replication, then to drinking from water located in the world, etc., was pretty straightforward!

Some of the more interesting and ambitious behaviors I'd love to create include: movement influenced by thirst or hunger, the ability to eat other organisms, and sexual reproduction (as opposed to spontaneous replication). I made sure to allow the inclusion of external Python methods (via callbacks) so that users can write their own behaviors and take further control of each simulation.

At the moment, the project consists of two Python packages: `blossom` and `flowerpot`. `blossom` is the evolution package, and `flowerpot` is a visualization and analysis package that interfaces directly with the simulation outputs from `blossom`. These are both in active development and themselves evolving!

----

The project is located at [github.com/blossom-evolution](https://github.com/blossom-evolution).
