---
title: Respectful Offers
tagline: "A subscription offer policy with a Thompson sampling bandit and two respect rules: a declined offer stays declined, and at-risk members see content before commerce."
kind: case-study
status: shipped
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
images:
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/demo.png
    alt: Respectful Offers policy simulator demo
    kind: screenshot
    caption: Policy simulator demo
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/report.png
    alt: Respectful Offers results report
    kind: screenshot
    caption: Results report
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/architecture.svg
    alt: "Architecture: interfaces (CLI, report, demo, EvalKit gates) on the respectful_offers library (features, churn, simulator, policies with the respect filter, auditor, off-policy estimators, evaluation, report) over a cached stage runner, built and released by a gated harness and CI"
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/dataflow.svg
    alt: "Data flow: raw KKBox files to features, a calibrated churn model, a cohort split, a respect filter in front of every policy, simulated rollouts, an independent audit and off-policy checks, aggregated into the report, PR/FAQ, demo and EvalKit release gates. Every outcome is simulated"
    kind: dataflow
headline:
  value: 97 NTD
  label: of discount per extra member kept by the respectful bandit, against 211 NTD for the rule-following baseline and 289 NTD for the status quo
  note: 200,000 real KKBox members; offer responses are simulated by a pre-registered simulator (central variant shown). The pre-registered claim holds in all three simulator variants after a Holm correction. Run real-v2.
metrics:
  - value: 200,000
    label: real KKBox members evaluated, offer responses simulated
  - value: "+5.57"
    label: more members kept per 1,000 NTD of discount than the baseline (central; +1.74 conservative, +9.36 optimistic)
  - value: "0.84"
    label: churn model AUC on real March labels
  - value: 7.8 vs 10.8
    label: "extra members kept per 1,000 by the bandit vs the baseline: fewer in absolute terms, at far lower cost"
methodology:
  - Calibrated gradient-boosted churn model, trained on February members and tested on March
  - Respect filter before every policy; an independent auditor recomputes every rule from the decision log
  - Thompson sampling bandit against no offer, the status quo, a rule-following baseline and a segment oracle, under one budget
  - Pre-registered simulator with three variants that bracket the assumptions
  - Common random numbers, paired block-bootstrap intervals and a Holm correction
  - Off-policy estimates (IPS, SNIPS, doubly robust) checked against the simulator's exact answer
proof:
  - label: Data card
    url: https://github.com/biplob819/respectful-offers/blob/main/DATA_CARD.md
  - label: PR/FAQ (PDF)
    url: https://biplob819.github.io/respectful-offers/prfaq.pdf
  - label: Case study (five sections)
    url: https://biplob819.github.io/respectful-offers/case-study.html
  - label: Results summary (JSON)
    url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/summary.json
  - label: Pre-registration
    url: https://github.com/biplob819/respectful-offers/blob/main/docs/prereg.md
  - label: "Decision review: real decisions read end to end"
    url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/decision-review.md
  - label: Release gates
    url: https://github.com/biplob819/respectful-offers/blob/main/configs/gates.yaml
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
  impact:
    - On 200,000 real KKBox members (offer responses simulated), the respectful bandit spent 97 NTD of discount per extra member kept, against 211 NTD for the rule-following baseline and 289 NTD for the status quo.
    - The pre-registered claim held in all three simulator variants with zero respect-rule violations, and both are enforced as release gates in CI.
    - Published on PyPI with a live policy simulator, a PR/FAQ and a five-section case study.
  pain:
    who: Subscription growth PMs who own retention offers and their discount budget, and the members at risk of leaving.
    problem: Subscription services send discounts to everyone who looks likely to leave. That trains members to wait for a deal, costs margin, and annoys loyal members with repeated offers.
  bet: A policy that knows when to make no offer at all keeps more members for less discount spend, and the proof is a 10% no-offer holdout, not a short-term click rate.
  evals:
    - name: Pre-registered claim
      data: 200,000 real members, three simulator variants
      method: More members kept per 1,000 NTD of discount than the rule-following baseline; paired bootstrap, Holm correction
      result: "Holds in all three variants: +5.57 central, +1.74 conservative, +9.36 optimistic"
      status: pass
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/summary.json
    - name: Respect rules
      data: Every rollout of every respectful policy
      method: An independent auditor recounts rule R1 (declined stays declined) and R2 (content before commerce) from the decision log
      result: "Clean: zero violations is a release gate"
      status: pass
      url: https://github.com/biplob819/respectful-offers/blob/main/configs/gates.yaml
    - name: Churn model
      data: Real KKBox labels, March 2017 cohort
      method: Trained on February members, tested on March; age and gender audited, never used
      result: AUC 0.84
      status: final
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/churn/model_card.json
    - name: Cost per extra member kept
      data: Central simulator variant
      method: Discount spent divided by extra members kept against the no-offer holdout
      result: Bandit 97 NTD, baseline 211 NTD, status quo 289 NTD
      status: final
      url: https://biplob819.github.io/respectful-offers/
  monitoring:
    - metric: Respect violations
      kind: guardrail
      target: "0"
      how: CI release gate on every change (configs/gates.yaml), recomputed by the independent auditor
    - metric: Pre-registered claim in every variant
      kind: north-star
      how: CI release gate; the change fails if the claim stops holding in any simulator variant
    - metric: Age-band disparity, churn-model quality, off-policy coverage
      kind: quality
      how: Warning gates in CI, in EvalKit's metrics-1 format
  learnings:
    - lesson: Every unit test passed while a real headline was wrong, in EvalKit before this project.
      now: Before trusting the headline, real decisions were read end to end and each failure reason confirmed; the review is published.
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/decision-review.md
    - lesson: In absolute terms the bandit keeps fewer extra members than the baseline (7.8 vs 10.8 per 1,000); it wins on cost by leaning on free content nudges and a cheaper plan.
      now: Report both the efficiency claim and the absolute numbers, so a growth PM can choose the trade-off knowingly.
      url: https://github.com/biplob819/respectful-offers#readme
source:
  repo: biplob819/respectful-offers
  synced: 2026-11-16
---

## Write-up

A subscription offer policy that predicts churn risk, chooses offers with a Thompson sampling bandit, and obeys two respect rules: a declined offer stays declined, and at-risk members see content before commerce. It is evaluated offline against a holdout, on real KKBox member behaviour with **simulated** offer responses.

Licence: MIT. KKBox data is not included in the repo; the data card explains how to download it.
