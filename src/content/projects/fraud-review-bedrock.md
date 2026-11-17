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
images:
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/dataflow.svg
    alt: "Data flow: simulated card transactions are minimised and split, scored by a LightGBM baseline, and flagged alerts are triaged by Claude Haiku 5.5 then Claude Sonnet 5.5; a router checks every clear against the policy in code; alerts end auto-cleared, held for priority review or escalated, and every step goes to a hash-chained audit log"
    kind: dataflow
datasets:
  - name: Fraud Dataset Benchmark (Amazon Science)
    url: https://github.com/amazon-science/fraud-dataset-benchmark
    note: The benchmark loader used for the data
  - name: Sparkov simulated card transactions
    url: https://www.kaggle.com/datasets/kartik2112/fraud-detection
    note: Simulated, no real customer data
story:
  overview: "A fraud-alert triage agent, packaged the way a team would take it to a bank pilot: the agent, proof it doesn't let fraud through, the money it saves, and the documents a bank needs to say yes (PR/FAQ, ROI model, reference architecture). It clears obvious false alarms, explains every hold with policy clauses, and never blocks a card on its own."
  pain:
    who: Fraud operations leads at mid-size banks, their analysts, and the model risk reviewers who sign off any automation.
    problem: "Fraud analysts spend most of the day on alerts that turn out to be legitimate. Banks want faster triage, but risk teams and regulators won't accept a black box: every decision needs a reason and an audit trail."
  bet: If an agent clears only obvious false positives, never auto-clears fraud, and shows its reasons, policy clauses and fields for every hold, a bank can cut analyst time without losing recall, and its risk team can sign off.
source:
  repo: biplob819/fraud-review-bedrock
  synced: 2026-11-16
---

## Write-up

A fraud-review agent on Amazon Bedrock that triages flagged card transactions, explains each decision against a written policy, and sends anything it is unsure about to a person. It has no tool that can block a card or contact a customer. All data is simulated (Sparkov, through Amazon's Fraud Dataset Benchmark).

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
