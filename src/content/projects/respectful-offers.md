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
  prd: https://github.com/biplob819/respectful-offers/blob/main/Respectful%20Offers%20PRD.md
  techspec: https://github.com/biplob819/respectful-offers/blob/main/Respectful%20Offers%20Tech%20Spec.md
  demo: https://respectful-offers.streamlit.app
  report: https://biplob819.github.io/respectful-offers/
stack:
  - Python
  - contextual bandits
  - KKBox churn data
proof:
  - label: Data card
    url: https://github.com/biplob819/respectful-offers/blob/main/DATA_CARD.md
  - label: PR/FAQ (PDF)
    url: https://biplob819.github.io/respectful-offers/prfaq.pdf
images:
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/demo.png
    alt: Respectful Offers policy simulator demo
    kind: screenshot
    caption: Policy simulator demo
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/report.png
    alt: Respectful Offers results report
    kind: screenshot
    caption: Results report
story:
  overview: A retention-offer policy for a subscription service that learns when to make no offer at all. A contextual bandit chooses between no offer, a content nudge, a discount or a plan change, under two respect rules it can't learn its way around, and is judged against a no-offer holdout.
  pain:
    who: Subscription growth PMs who own retention offers and their discount budget, and the members at risk of leaving.
    problem: Subscription services send discounts to everyone who looks likely to leave. That trains members to wait for a deal, costs margin, and annoys loyal members with repeated offers.
  segments:
    - name: Subscription growth PM
      need: Owns retention offers and their discount budget; judged on retained members and margin.
      primary: true
    - name: Member at risk of churning
      need: Would stay for the right content; resents being chased with discounts.
      primary: false
  bet: A policy that knows when to make no offer at all keeps more members for less discount spend, and the proof is a 10% no-offer holdout, not a short-term click rate.
  priorities:
    - item: Retained members per 1,000 at-risk, and discount cost per retained member, against a baseline and a no-offer holdout
      call: built
      why: The growth PM picks the policy that keeps the most members at the lowest margin cost.
    - item: "Two respect rules enforced outside the learning loop: never re-offer what a member declined, and content before a deal"
      call: built
      why: Members are treated as viewers, not targets, and the bandit can't learn its way around the rules.
    - item: Results under three simulator assumptions
      call: built
      why: The conclusion has to survive if members respond differently than assumed.
    - item: Sending real offers, and production serving
      call: cut
      why: An offline evaluation is enough to prove the policy.
    - item: A content recommender
      call: cut
      why: The content nudge is a placeholder action.
    - item: An interactive simulator for budget and risk threshold
      call: later
      why: Lets a PM feel the trade-off, after the core result is proven.
  stories:
    - as: Growth PM
      want: see retained members per 1,000 at-risk under each policy
      why: I pick the policy that keeps the most members
      priority: must
    - as: Growth PM
      want: see discount cost per retained member
      why: I protect margin
      priority: must
    - as: Member
      want: never be offered something I already declined
      why: I am not pestered
      priority: must
    - as: Member at risk
      want: be shown something to watch before being offered a deal
      why: I am treated as a viewer, not a target
      priority: must
    - as: Growth PM
      want: see how results change if offer responses differ from my assumptions
      why: I trust the conclusion
      priority: must
    - as: Growth PM
      want: adjust the discount budget and risk threshold in a demo
      why: I see the trade-off myself
      priority: should
    - as: Growth PM
      want: see confidence intervals on every estimate
      why: I do not over-read noise
      priority: should
source:
  repo: biplob819/respectful-offers
  synced: 2026-11-16
---

## Overview

A subscription offer policy that predicts churn risk, chooses offers with a Thompson sampling bandit, and obeys two respect rules: a declined offer stays declined, and at-risk members see content before commerce. It is evaluated offline against a holdout, on real KKBox member behaviour with **simulated** offer responses.

Licence: MIT. KKBox data is not included and is never committed; see the data card once node N1.2 lands.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
