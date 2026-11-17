---
title: "Field PM Pack: Fraud Review Agent"
tagline: A fraud-review agent on Amazon Bedrock that triages card alerts, explains each decision against a written policy and sends uncertain cases to a person.
kind: case-study
status: building
role: Product and build
year: "2026"
order: 34
tags:
  - agents
  - human in the loop
  - fintech
links:
  repo: https://github.com/biplob819/fraud-review-bedrock
  prd: https://github.com/biplob819/fraud-review-bedrock/blob/main/PRD.md
  techspec: https://github.com/biplob819/fraud-review-bedrock/blob/main/TECH_SPEC.md
stack:
  - Amazon Bedrock
  - Claude
  - Python
proof:
  - label: Data card
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/DATA_CARD.md
source:
  repo: biplob819/fraud-review-bedrock
  synced: 2026-11-16
---

## Overview

A fraud-review agent on Amazon Bedrock that triages flagged card transactions, explains each decision against a written policy, and sends anything it is unsure about to a person. It has no tool that can block a card or contact a customer. All data is simulated (Sparkov, through Amazon's Fraud Dataset Benchmark).

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
