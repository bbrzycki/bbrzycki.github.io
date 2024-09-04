---
title: "Deep RL Portfolio Optimization"
collection: code
excerpt: 'Class final project on basic portfolio optimization and trading using Deep Reinforcement Learning.'
permalink: /code/deep-rl-trading
---

Link: [github.com/bbrzycki/deep-rl-trading](https://github.com/bbrzycki/deep-rl-trading)

In Fall 2019, I took CS 285: Deep Reinforcement Learning at UC Berkeley. For the final project, I wanted to extend some of the stuff we did with OpenAI Gym. On the side, I was learning about stocks and finance at the time, so I decided to do a simple portfolio optimization project to see if a RL agent could learn to day-trade. Given the time (and monetary) constraints, I was limited to the most basic OHLC data. So of course, I didn't necessarily expect to get anything interesting out of this, but figured it would at least make for an interesting final project to work on for a couple months.

I made a custom OpenAI Gym using daily OHLC data; essentially, when the agent enters a new round, it starts at a random day with access to prices sampled according to that day's OHLC data and with historical knowledge going back a pre-set number of days. Then, the environment steps forward a certain amount of time and attempts to maximize the reward -- the amount of money. 

I tried out a couple deep neural network designs (fully connected and LSTM) and a couple RL algorithms (DQN and double DQN) on $SPY and $GLD data, in all possible combinations with varying hyperparameters. Basically, nothing beat buy-and-hold (in retrospect, $SPY basically only shot up during the considered data period), but the RL algorithm constantly decided to make trades, and in certain instances actually seemed to beat buy-and-hold early in testing runs. Ultimately, this project was just an excuse to play around with RL algorithms and observe the kinds of decisions agents make when encountering new data. Without significantly higher resolution data, I doubt there are any real insights on the finance end. You can find the final report I wrote within the Github link above!