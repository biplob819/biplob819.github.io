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
  package: https://pypi.org/project/respectful-offers/
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
install:
  - cmd: pip install respectful-offers
    note: Python 3.11 to 3.13
  - cmd: offers doctor
    note: checks Python, configs and data
  - cmd: offers report --example
    note: a full report from synthetic members, in seconds
  - cmd: offers data download && offers run --all
    note: the published run; needs a Kaggle token
datasets:
  - name: KKBox churn prediction (WSDM Cup)
    url: https://www.kaggle.com/competitions/kkbox-churn-prediction-challenge
    note: Real subscription and listening behaviour
story:
  overview: A retention-offer policy for a subscription service that learns when to make no offer at all. A contextual bandit chooses between no offer, a content nudge, a discount or a plan change, under two respect rules it can't learn its way around, and is judged against a no-offer holdout.
  pain:
    who: Subscription growth PMs who own retention offers and their discount budget, and the members at risk of leaving.
    problem: Subscription services send discounts to everyone who looks likely to leave. That trains members to wait for a deal, costs margin, and annoys loyal members with repeated offers.
  bet: A policy that knows when to make no offer at all keeps more members for less discount spend, and the proof is a 10% no-offer holdout, not a short-term click rate.
source:
  repo: biplob819/respectful-offers
  synced: 2026-11-16
---

## Write-up

A subscription offer policy that predicts churn risk, chooses offers with a Thompson sampling bandit, and obeys two respect rules: a declined offer stays declined, and at-risk members see content before commerce. It is evaluated offline against a holdout, on real KKBox member behaviour with **simulated** offer responses.

Licence: MIT. KKBox data is not included and is never committed; see the data card once node N1.2 lands.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
