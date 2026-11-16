---
title: Respectful Offers
tagline: "A subscription offer policy with a Thompson sampling bandit and two respect rules: a declined offer stays declined, and at-risk members see content before commerce."
kind: case-study
status: building
role: Product and build
year: "2026"
order: 35
tags:
  - classical ML
  - retention
  - experimentation
links:
  repo: https://github.com/biplob819/respectful-offers
stack:
  - Python
  - contextual bandits
  - KKBox churn data
source:
  repo: biplob819/respectful-offers
  synced: 2026-11-16
---

## Overview

A subscription offer policy that predicts churn risk, chooses offers with a Thompson sampling bandit, and obeys two respect rules: a declined offer stays declined, and at-risk members see content before commerce. It is evaluated offline against a holdout, on real KKBox member behaviour with **simulated** offer responses.

Licence: MIT. KKBox data is not included and is never committed; see the data card once node N1.2 lands.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
