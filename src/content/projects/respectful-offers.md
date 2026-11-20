---
title: Respectful Offers
tagline: "A subscription offer policy with a Thompson sampling bandit and two
  respect rules: a declined offer stays declined, and at-risk members see
  content before commerce."
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
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of nine screens: the report's headline, every policy, members
      kept against discount spent, the respect audit, off-policy estimates
      against the exact oracle, the release gates in the command line, the local
      policy simulator with its frontier chart and live respect audit, and the
      case study. All outcomes are simulated"
    caption: nine real screens, 22.5 seconds, loops; outcomes simulated
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/demo.png
    alt: Respectful Offers policy simulator demo
    kind: screenshot
    caption: Policy simulator demo
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/report.png
    alt: Respectful Offers results report
    kind: screenshot
    caption: Results report
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/audit.png
    alt: "The report's respect audit: violations of rules R1, R2, R3, R7 and R8 for
      every policy and variant; the status quo breaks R1 and R2 thousands of
      times, every respectful policy shows zero, and the holdout check is
      consistent"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/frontier.png
    alt: "The report's frontier chart for the central variant: members retained per
      1,000 against discount spend per member for the status quo, the
      rule-following baseline and the bandit, with 95% intervals; the bandit
      sits highest at low spend"
    caption: Simulated outcomes, central variant
    kind: result
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/architecture.svg
    alt: "Architecture: interfaces (CLI, report, demo, EvalKit gates) on the
      respectful_offers library (features, churn, simulator, policies with the
      respect filter, auditor, off-policy estimators, evaluation, report) over a
      cached stage runner, built and released by a gated harness and CI"
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/dataflow.svg
    alt: "Data flow: raw KKBox files to features, a calibrated churn model, a cohort
      split, a respect filter in front of every policy, simulated rollouts, an
      independent audit and off-policy checks, aggregated into the report,
      PR/FAQ, demo and EvalKit release gates. Every outcome is simulated"
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/respectful-offers/main/docs/img/headline.svg
    alt: Chart of discount spent per extra member kept, in NTD with 95% intervals,
      for the bandit, the rule-following baseline and the status quo under the
      conservative, central and optimistic simulator variants. Lower is better;
      the bandit spends the least in every variant. Offer responses are
      simulated on real KKBox members
    caption: Discount per extra member kept, by simulator variant (simulated)
    kind: result
headline:
  value: 97 NTD
  label: (New Taiwan dollars) of discount per extra member kept by the respectful
    bandit, against 211 NTD for the rule-following baseline and 289 NTD for the
    status quo
  note: 200,000 real KKBox (a Taiwanese music-streaming service) members; offer
    responses are simulated by a pre-registered simulator (central variant
    shown). The pre-registered claim holds in all three simulator variants after
    a Holm correction (a stricter bar when several comparisons are tested at
    once).
metrics:
  - value: 200,000
    label: real KKBox members evaluated, offer responses simulated
  - value: "+5.57"
    label: more members kept per 1,000 NTD of discount than the baseline (central;
      +1.74 conservative, +9.36 optimistic)
  - value: "0.84"
    label: churn model AUC on real March labels
  - value: 7.8 vs 10.8
    label: "extra members kept per 1,000 by the bandit vs the baseline: fewer in
      absolute terms, at far lower cost"
methodology:
  - Calibrated gradient-boosted churn model, trained on February members and
    tested on March
  - Respect filter before every policy; an independent auditor recomputes every
    rule from the decision log
  - Thompson sampling bandit against no offer, the status quo, a rule-following
    baseline and a segment oracle, under one budget
  - Pre-registered simulator with three variants that bracket the assumptions
  - Common random numbers, paired block-bootstrap intervals and a Holm correction
  - Off-policy estimates (IPS, SNIPS, doubly robust) checked against the
    simulator's exact answer
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
  overview: A retention-offer policy for a subscription service that learns when
    to make no offer at all. A contextual bandit chooses between no offer, a
    content nudge, a discount or a plan change, under two respect rules it can't
    learn its way around, and is judged against a no-offer holdout.
  impact:
    - On 200,000 real KKBox members (offer responses simulated), the respectful
      bandit spent 97 NTD of discount per extra member kept, against 211 NTD for
      the rule-following baseline and 289 NTD for the status quo.
    - The pre-registered claim held in all three simulator variants with zero
      respect-rule violations, and both are enforced as release gates in CI.
    - Published on PyPI with a live policy simulator, a PR/FAQ and a
      five-section case study.
  pain:
    who: Subscription growth PMs who own retention offers and their discount budget,
      and the members at risk of leaving.
    problem: Subscription services send discounts to everyone who looks likely to
      leave. That trains members to wait for a deal, costs margin, and annoys
      loyal members with repeated offers.
  bet: A policy that knows when to make no offer at all keeps more members for
    less discount spend, and the proof is a 10% no-offer holdout, not a
    short-term click rate.
  evals:
    - name: Pre-registered claim
      data: 200,000 real members, three simulator variants
      method: More members kept per 1,000 NTD of discount than the rule-following
        baseline; paired bootstrap, Holm correction
      result: "Holds in all three variants: +5.57 central, +1.74 conservative, +9.36
        optimistic"
      status: pass
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/summary.json
    - name: Respect rules
      data: Every rollout of every respectful policy
      method: An independent auditor recounts rule R1 (declined stays declined) and R2
        (content before commerce) from the decision log
      result: "Clean: zero violations is a release gate"
      status: pass
      url: https://github.com/biplob819/respectful-offers/blob/main/configs/gates.yaml
    - name: Churn model
      data: Real KKBox labels, March 2017 cohort
      method: Trained on February members, tested on March; age and gender audited,
        never used
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
    - metric: Feature drift and churn-model calibration, month on month
      kind: guardrail
      target: every feature PSI below EvalKit's tolerance; Brier and ECE within
        tolerance
      current: "Feb → Mar 2017: no feature drifted (every PSI below 0.01); calibration
        worsened out of time (Brier +0.015, ECE +0.024), so it warns and a
        challenger is the response"
      how: offers monitor drift runs EvalKit 0.4's drift monitor on real KKBox
        features and scores (results/kkbox/monitor)
    - metric: Challenger retrain test
      kind: quality
      target: promote only if the claim improves in every simulator variant
      current: "18 Nov: not promoted; improved in 1 of 3 variants"
      how: offers challenge reruns a retrained model against the published run on the
        same members (results/kkbox/challenge)
    - metric: Respect violations
      kind: guardrail
      target: "0"
      how: CI release gate on every change (configs/gates.yaml), recomputed by the
        independent auditor
    - metric: Pre-registered claim in every variant
      kind: north-star
      how: CI release gate; the change fails if the claim stops holding in any
        simulator variant
    - metric: Age-band disparity, churn-model quality, off-policy coverage
      kind: quality
      how: Warning gates in CI, in EvalKit's metrics-1 format
  learnings:
    - lesson: Every unit test passed while a real headline was wrong, in EvalKit
        before this project.
      now: Before trusting the headline, real decisions were read end to end and each
        failure reason confirmed; the review is published.
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/decision-review.md
    - lesson: In absolute terms the bandit keeps fewer extra members than the baseline
        (7.8 vs 10.8 per 1,000); it wins on cost by leaning on free content
        nudges and a cheaper plan.
      now: Report both the efficiency claim and the absolute numbers, so a growth PM
        can choose the trade-off knowingly.
      url: https://github.com/biplob819/respectful-offers#readme
  improvements:
    - metric: Respect violations, status quo → bandit (central variant, 200,000
        members, outcomes simulated)
      before: 31,490
      after: "0"
      change: The status quo broke two respect rules 6,540 and 24,950 times; the
        bandit broke none. Run real-v2.
      url: https://github.com/biplob819/respectful-offers#what-changed-measured
    - metric: Discount per extra member kept, status quo → bandit (NTD, central
        variant, simulated)
      before: 288.70 (280.38 to 297.57)
      after: 97.03 (91.81 to 102.60)
      change: The bandit leans on free content nudges and a cheaper plan instead of
        discounts. Run real-v2.
      url: https://github.com/biplob819/respectful-offers#what-changed-measured
    - metric: Discount per extra member kept, rule-following baseline → bandit (NTD,
        central variant, simulated)
      before: 211.17 (203.89 to 219.03)
      after: 97.03 (91.81 to 102.60)
      change: +5.57 extra members kept per 1,000 NTD (+5.06 to +6.10, Holm p =
        0.0001). Run real-v2.
      url: https://github.com/biplob819/respectful-offers#what-changed-measured
    - metric: Drift monitor on a feature that is 0 for 96% of members (real data)
      before: "One bin: drift score 0 by construction, a planted shift never alarmed"
      after: "Three bins: March drift score (PSI) 0.0001, and a planted shift alarms
        that feature alone"
      change: A binning fix, found when a planted shift was tested on every feature
        instead of one.
      url: https://github.com/biplob819/respectful-offers#what-changed-measured
  next:
    - A second monitored period, so cost per extra member kept and the age-band
      gap get a baseline and are checked
    - "Recalibrate before the next challenger: March calibration warns (Brier
      +0.015, ECE +0.024)"
    - Decide whether the age-band offer-rate gap (0.36 for the bandit, 0.40 for
      the rule-following baseline, against a 0.10 warning line) becomes a
      constraint
    - A small live pilot with a holdout to replace the simulated offer responses
  priorities:
    - item: A churn-risk model trained on real KKBox subscription behaviour
      call: built
      why: Real member features, scores and churn labels make the risk side of every
        result real, not simulated.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: A bandit that learns which of four offers to make each member
      call: built
      why: It keeps more members per unit of discount than discounting everyone at
        risk.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: Respect rules applied outside the learning and recounted by an independent
        auditor
      call: built
      why: A policy should never be able to learn its way around a member's no.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: Every policy compared on 200,000 real members under three simulator
        assumptions
      call: built
      why: Offer responses are simulated, so three pre-registered variants bracket how
        wrong the assumptions could be.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: An open-source package on PyPI that runs on your own subscription data
      call: built
      why: Others can rerun the method on their own members, not just read about it.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: A passkey-protected live demo of the policy simulator
      call: built
      why: Reviewers can move the budget and see the trade-offs without the page being
        open to everyone.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: Monthly drift checks and challenger tests with a promotion rule stated in
        advance
      call: built
      why: A live policy needs a way to notice it is slipping and to replace it only
        on evidence.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: Sending real offers to members and running the policy in production
      call: cut
      why: The project is offline research on public data, so nothing is sent to
        anyone.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: A content recommender behind the content nudge
      call: cut
      why: The nudge stays a placeholder so the work stays on offers and respect
        rules.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: Off-policy estimates as the headline result
      call: cut
      why: On simulated logs they can only recover the simulator's own settings, so
        they became a check instead.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: A narrated demo video
      call: cut
      why: A silent looping walkthrough GIF replaced the video on every portfolio
        project.
      url: https://github.com/biplob819/respectful-offers/blob/main/docs/decisions.md
    - item: A second monitored period so cost and fairness checks have a baseline
      call: later
      why: Until then those two checks are reported as not checked, never as passed.
      url: https://github.com/biplob819/respectful-offers/blob/main/README.md
    - item: Refit the churn model's calibration before the next challenger
      call: later
      why: March calibration moved beyond tolerance, so a new random seed alone is not
        enough.
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/monitor/drift.json
    - item: Decide whether the age-band offer-rate gap should become a hard rule
      call: later
      why: The gap is above its warning line today and only warns.
      url: https://github.com/biplob819/respectful-offers/blob/main/results/kkbox/gate.json
    - item: A small live pilot with a holdout to replace simulated responses
      call: later
      why: Only real responses can replace the simulator, and the decision logs are
        already in the shape it needs.
      url: https://github.com/biplob819/respectful-offers/blob/main/README.md
source:
  repo: biplob819/respectful-offers
  synced: 2026-11-16
license: MIT
harness: true
---

## Write-up

Subscription services fight churn with discounts, and the usual rule pays members who would have stayed anyway and asks people again after they said no. I built Respectful Offers, an open-source retention policy with two rules written outside the learning: a declined offer stays declined, and members at risk see content before commerce. A calibrated churn model scores each member, a filter removes every forbidden action, and a Thompson sampling bandit chooses among a content nudge, a cheaper plan and a half-price month within a budget. On 200,000 real KKBox members, with offer responses simulated, it spent 97 NTD of discount per extra member kept, against 211 for a rule-following baseline and 289 for the status quo, which broke the rules 31,490 times. The pre-registered claim held under all three simulator variants. The trade: 27% fewer extra members kept than the baseline, on 33% of its discount.


## Key decisions

1. **Simulate responses on real members, and say so everywhere.** The KKBox data holds no offers, so responses come from a simulator in three pre-registered variants, run on real members with common random numbers; every result carries a Simulated label, and off-policy estimates are checked against the simulator's exact answer (12 of 12 doubly robust intervals covered it). *Trade-off:* the result is conditional on the simulator's assumptions and says nothing about real acceptance; only a live A/B test with the same holdout can.
2. **Rules outside the learning, checked by an independent auditor.** A pure filter sits in front of every respectful policy, and an auditor that never imports it recounts every rule from the decision log. *Trade-off:* the rules can cost members that ignoring them would keep: the rule-following baseline kept fewer extra members than the unconstrained status quo in 2 of 3 simulator variants (central: 10.8 against 11.7 per 1,000).
3. **Pre-register, then gate releases on the claim.** The simulator's values were frozen by sha256 before the real run, and CI gates every change on zero violations and the claim in every variant, in EvalKit's format. *Trade-off:* no tuning after seeing results, and a release can be blocked by a number, in exchange for results a skeptical reader can check.
