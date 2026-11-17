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
story:
  overview: "A fraud-alert triage agent, packaged the way a team would take it to a bank pilot: the agent, proof it doesn't let fraud through, the money it saves, and the documents a bank needs to say yes (PR/FAQ, ROI model, reference architecture). It clears obvious false alarms, explains every hold with policy clauses, and never blocks a card on its own."
  pain:
    who: Fraud operations leads at mid-size banks, their analysts, and the model risk reviewers who sign off any automation.
    problem: "Fraud analysts spend most of the day on alerts that turn out to be legitimate. Banks want faster triage, but risk teams and regulators won't accept a black box: every decision needs a reason and an audit trail."
  segments:
    - name: Fraud operations lead at a mid-size bank
      need: Owns alert backlog, analyst headcount and the risk sign-off.
      primary: true
    - name: Fraud analyst
      need: Works the queue; needs to see why a case was held and decide quickly.
      primary: false
    - name: Model risk reviewer at the bank
      need: Must approve any automated decision and its audit trail.
      primary: false
    - name: Executive sponsor at the bank
      need: Funds a pilot; reads the PR/FAQ, the discovery summary and the business case.
      primary: false
  bet: If an agent clears only obvious false positives, never auto-clears fraud, and shows its reasons, policy clauses and fields for every hold, a bank can cut analyst time without losing recall, and its risk team can sign off.
  priorities:
    - item: Auto-clear for obvious false positives, with its precision reported
      call: built
      why: Analysts spend their time on real risk.
    - item: No fraud auto-cleared in the 500 evaluation alerts, with a 95% upper bound on leakage beside the baseline
      call: built
      why: The fraud lead can only sign off if no more fraud slips through than today.
    - item: Reasons, policy clauses and fields for every hold, a faithfulness check, and one audit entry per alert
      call: built
      why: Model risk reviewers need explanations that match what drove the score.
    - item: An ROI model with inputs a bank can change on a call
      call: built
      why: The business case becomes the bank's, not a vendor's.
    - item: Automatic card blocks
      call: cut
      why: Every hold reaches a person.
    - item: Real bank data, real-time streaming and production deployment
      call: cut
      why: A pilot pack, not a production system.
    - item: Analyst overrides feeding back into the policy
      call: later
      why: Needs real analyst use to be meaningful.
  stories:
    - as: Fraud ops lead
      want: have obvious false positives cleared automatically
      why: analysts spend time on real risk
      priority: must
    - as: Fraud ops lead
      want: be sure no more fraud slips through than today
      why: I can sign off the change
      priority: must
    - as: Analyst
      want: see each held case with its reasons, policy clauses and the fields used
      why: I decide in seconds, not minutes
      priority: must
    - as: Model risk reviewer
      want: see that explanations match what drove the score
      why: the reasons are not invented
      priority: must
    - as: Model risk reviewer
      want: have every decision logged with inputs, model and reasons
      why: I can audit any case later
      priority: must
    - as: Fraud ops lead
      want: change the ROI inputs to my own numbers on a call
      why: the business case is mine, not a vendor's
      priority: must
    - as: Executive sponsor
      want: read a two-page PR/FAQ
      why: I can decide whether to fund a pilot
      priority: must
    - as: Analyst
      want: accept, override or comment on the agent's call
      why: my judgement trains the policy
      priority: should
    - as: Bank engineer
      want: see how this maps onto AWS services
      why: I can plan a pilot
      priority: should
source:
  repo: biplob819/fraud-review-bedrock
  synced: 2026-11-16
---

## Overview

A fraud-review agent on Amazon Bedrock that triages flagged card transactions, explains each decision against a written policy, and sends anything it is unsure about to a person. It has no tool that can block a card or contact a customer. All data is simulated (Sparkov, through Amazon's Fraud Dataset Benchmark).

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
