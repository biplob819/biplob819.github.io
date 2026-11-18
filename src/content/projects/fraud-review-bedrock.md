---
title: "Field PM Pack: Fraud Review Agent"
tagline: A fraud-review agent on Amazon Bedrock that triages card alerts,
  explains each decision against a written policy and sends uncertain cases to a
  person.
kind: case-study
status: shipped
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
  prdOnePage: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/prd-onepager.md
  report: https://biplob819.github.io/fraud-review-bedrock/
stack:
  - Amazon Bedrock
  - Claude
  - Python
images:
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of nine screens on simulated data: a title card, the
      architecture where the model recommends and a router in code decides, the
      analyst review screen with reasons, clauses and score drivers, the
      hash-chained audit log, and dashboard panels for safety, value,
      explanation checks, faithfulness and the monitoring trend"
    caption: nine real screens, 22.5 seconds, loops; simulated data
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/dataflow.svg
    alt: "Data flow: simulated card transactions are minimised and split, scored by
      a LightGBM baseline, and flagged alerts are triaged by Claude Haiku 5.5
      then Claude Sonnet 5.5; a router checks every clear against the policy in
      code; alerts end auto-cleared, held for priority review or escalated, and
      every step goes to a hash-chained audit log"
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/architecture.svg
    alt: "What was built and ran: a local Python CLI with a LightGBM baseline, a
      router and policy-as-code, a content-addressed cache, a spend cap and
      ledger and a hash-chained audit log, calling the Claude API with Haiku 5.5
      for stage 1 and Sonnet 5.5 for stage 2. Supported but not run: Amazon
      Bedrock through the in-Region Mantle endpoint in us-east-2. Proposed for
      an AWS pilot, all in us-east-2: alerts in S3, EventBridge starting a Step
      Functions workflow of Lambda tasks inside an IAM boundary, DynamoDB for
      decisions and audit events streamed to S3 with Object Lock, an analyst
      queue app, CloudWatch, KMS, and a passkey-protected hosted demo on a
      Lambda function URL with DynamoDB."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/screens/review-case.png
    alt: "Analyst review screen: one held alert with its reasons, policy clauses and
      the fields used (simulated data, replay mode)"
    kind: screenshot
    caption: Analyst review screen, replay mode
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/screens/review-audit.png
    alt: "Audit view: every decision on the alert written to the hash-chained audit
      log (simulated data)"
    kind: screenshot
    caption: Audit trail for one alert
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/screens/dashboard.png
    alt: "Results dashboard: safety, value, explanation checks, monitoring trend and
      run facts, every number labelled simulated"
    kind: screenshot
    caption: Results dashboard (not deployed yet)
headline:
  value: 0 of 55
  label: frauds auto-cleared on a fresh 500-alert evaluation the agent had never
    seen, with every auto-clear correct
  note: Simulated data (Sparkov). Exact 95% upper bound on leakage 5.3%. 8.8% of
    alerts auto-cleared (44 of 44 correct); every fraud reached a person (55 of
    55). The first frozen evaluation leaked 2 of 79 and stays in the record.
metrics:
  - value: 352 min
    label: analyst time saved per 1,000 alerts, estimated at 4 minutes an alert (95%
      interval 256 to 456)
  - value: $6.24
    label: model cost per 1,000 alerts
  - value: 100%
    label: of the sample's frauds reached a person (55 of 55)
  - value: 48%
    label: "of explanation claims supported by the alert data: provisional, one judge"
proof:
  - label: Data card
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/DATA_CARD.md
  - label: Evaluation runs (JSONL)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
  - label: Evaluation summary (JSON)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/summary-eval2.json
  - label: Faithfulness summary (JSON)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/faithfulness-cache-summary.json
  - label: PR/FAQ (working backwards)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/pr-faq.md
  - label: ROI model (spreadsheet with editable inputs)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/roi/README.md
  - label: Discovery summary for a bank sponsor
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/discovery-summary.md
  - label: Reusable patterns for the next engagement
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/patterns.md
datasets:
  - name: Fraud Dataset Benchmark (Amazon Science)
    url: https://github.com/amazon-science/fraud-dataset-benchmark
    note: The benchmark loader used for the data
  - name: Sparkov simulated card transactions
    url: https://www.kaggle.com/datasets/kartik2112/fraud-detection
    note: Simulated, no real customer data
story:
  overview: "A fraud-alert triage agent, packaged the way a team would take it to
    a bank pilot: the agent, proof it doesn't let fraud through, the money it
    saves, and the documents a bank needs to say yes (PR/FAQ, ROI model,
    reference architecture). It clears obvious false alarms, explains every hold
    with policy clauses, and never blocks a card on its own."
  pain:
    who: Fraud operations leads at mid-size banks, their analysts, and the model
      risk reviewers who sign off any automation.
    problem: "Fraud analysts spend most of the day on alerts that turn out to be
      legitimate. Banks want faster triage, but risk teams and regulators won't
      accept a black box: every decision needs a reason and an audit trail."
  bet: If an agent clears only obvious false positives, never auto-clears fraud,
    and shows its reasons, policy clauses and fields for every hold, a bank can
    cut analyst time without losing recall, and its risk team can sign off.
  evals:
    - name: Fraud leakage, first frozen evaluation
      data: 500 alerts, 79 frauds (simulated)
      method: Frauds the agent auto-cleared; the bar is zero
      result: "2 of 79 leaked (both small purchases at 11 p.m.): failed the bar; the
        run stays in the log"
      status: fail
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
    - name: Fraud leakage, fresh sample after the fix
      data: 500 alerts never seen before, 55 frauds (simulated)
      method: Same bar, on a disjoint sample drawn in advance
      result: 0 of 55 leaked; exact 95% upper bound 5.3%
      status: pass
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
    - name: Auto-clear precision
      data: Fresh sample
      method: Share of auto-cleared alerts that were really legitimate
      result: 44 of 44 correct; 8.8% of alerts auto-cleared
      status: pass
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
    - name: End-to-end recall
      data: Fresh sample
      method: Frauds that reached a person
      result: 55 of 55
      status: pass
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
    - name: Explanation checks
      data: 965 explanations, fresh sample
      method: Valid schema, real policy clauses, allowed fields, and every stated
        value true
      result: Schema 964 of 965; clauses and fields 100%; 1,098 of 1,098 stated values
        true; no protected attributes mentioned
      status: pass
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/summary-eval2.json
    - name: Explanation faithfulness
      data: 4,159 claims from 458 explanations
      method: Does each claim in the explanation follow from the alert data? Claude
        Opus 5.5 judge (single judge, partial coverage)
      result: 48% of claims supported; 0 of 342 fully judged explanations fully
        supported. Provisional
      status: provisional
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/faithfulness-cache-summary.json
    - name: Cost and latency
      data: Fresh 500-alert sample
      method: Billed model cost; p95 latency per stage
      result: $6.24 per 1,000 alerts; p95 4.6 s for the Haiku screen, 6.9 s for the
        Sonnet review
      status: final
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/summary-eval2.json
  improvements:
    - metric: Frauds auto-cleared
      before: 2 of 79
      after: 0 of 55
      change: "One policy change chosen on the dev set (never auto-clear at night),
        then proven on a fresh, disjoint 500-alert sample, never on the run that
        exposed the leak. The cost: auto-clear fell from 36.8% to 8.8%.
        Simulated data."
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
  learnings:
    - lesson: The first frozen evaluation let 2 of 79 frauds through after a clean
        development run.
      now: The fix was chosen on the development data and proven on a second sample
        drawn in advance. A frozen evaluation is never re-scored after a change,
        and the failed run stays in the log.
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/lessons.md
    - lesson: A bad cost estimate (not a number, or negative) made the spend check
        always pass, which switched the spend cap off.
      now: Every money value is checked before use, and a bad value is an error, never
        a pass.
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/lessons.md
    - lesson: The check that every metric is labelled as simulated missed phrasings
        like "percent" and "USD", and one label anywhere in a paragraph covered
        every number in it.
      now: The label has to sit on the metric's own line and must not be negated, and
        the check is tested against a table of cases.
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/lessons.md
    - lesson: A chained command marked a step done, committed and pushed even though
        the quality check had just failed.
      now: "Publishing depends on the check's result directly: check, then commit,
        then push, each only if the last succeeded."
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/lessons.md
    - lesson: Three release checks passed while the thing they checked was broken;
        one only searched the workflow file for a command instead of running it.
      now: A release check runs the documented command for real.
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/lessons.md
source:
  repo: biplob819/fraud-review-bedrock
  synced: 2026-11-16
timeline:
  - when: 18 Nov 2026
    title: v0.1.0 released
    status: released
    items:
      - Wheel and source archive on GitHub; not on PyPI
      - "Final evaluation on simulated data: 0 of 55 frauds auto-cleared on 500
        fresh alerts"
    url: https://github.com/biplob819/fraud-review-bedrock/releases/tag/v0.1.0
---

## Write-up

*Status: final evaluation done. Every figure below comes from `docs/measurements/eval-runs.jsonl` or `docs/measurements/summary-eval2.json` and is on simulated data.*

Card-fraud teams drown in alerts, and most of them are legitimate. This project is a two-stage Claude agent that triages flagged transactions. Claude Haiku 5.5 screens each alert, and Claude Sonnet 5.5 reviews whatever Haiku will not clear. A router written in code, not the model, decides whether a clear is allowed, by checking the cited policy clause against the alert. Nothing that looks like fraud is closed without a person: the agent has no tool to block a card or contact anyone, and every step lands in a hash-chained audit log.

The safety bar is zero fraud auto-cleared. The first frozen evaluation failed it, leaking 2 of 79 frauds (simulated data). That run stays in the log. After one policy change, a fresh set of 500 alerts the agent had never seen leaked 0 of 55 frauds; the exact 95% upper bound is 5.3% (simulated data). The cost was automation: 8.8% of alerts were auto-cleared, down from 36.8%, all of them correctly (simulated data).

## My role

I set the goals and the hard rules. Those were zero fraud leakage, a spend cap with my approval for any run over five dollars, and evaluation through my own EvalKit harness. I made the calls at each fork: moving from Amazon Bedrock to the Claude API when the AWS project could not enable Claude, the risk ceiling and night rule after the leaks, and approving the over-budget eval run. Claude Code built the code, tests and measurements, working under a build harness ported from my EvalKit project. That harness uses a graph of nodes with converge gates and fresh-context verifier passes before any node is marked done, and every run is recorded in a public spend ledger.

## Key decisions

**The model recommends; code decides (D-5, D-6).** The policy is written as numbered clauses, each with a machine-checked condition. A "clear" from either model is only a proposal, which the router accepts when a cited clearing clause holds and no never-auto-clear clause does. *Trade-off:* the policy has to be expressible as conditions on a few allow-listed fields, so nuance the model sees but the rules cannot express never clears an alert on its own.

**A failed evaluation stays in the record, and the fix is tested on fresh alerts (D-39, D-40).** When the first frozen eval leaked two frauds, both small purchases at 11 p.m., the fix (never auto-clear at night) was chosen on the dev set. It was then proven on a second, disjoint sample drawn in advance, never on the eval that exposed the problem. *Trade-off:* auto-clear fell from 36.8% to 8.8% (simulated data), and a fresh sample costs another paid run. Without both, the zero-leakage claim would not be honest.

**Claude API instead of Amazon Bedrock for the published runs (D-35).** The AWS project stayed on the free plan with Claude not authorised, which blocked every node that calls a model. The request shape is identical on both providers, so the switch is one config line and Bedrock remains a supported path. *Trade-off:* the published results do not exercise Bedrock, which the architecture diagram marks as "supported, not run".

## What the checks on the reasons found

The reasons the agent writes were checked in four ways (simulated data). Every reason cites a real policy clause and an allowed field (964 of 964), and the numbers that could be checked were all true (1,098 of 1,098). Most claims could not be checked: 2,815 of 3,913 value claims were unverifiable, and none was contradicted. Driver agreement with the baseline's top features was 46%, and no reason mentioned a protected attribute.

The faithfulness judging is a partial result on simulated data. One judge, Claude Opus 5.5, rated 1,996 of 4,159 claims as supported (48.0%, with 74.9% of claims reached). The second judge never produced a verdict, and the judge was not calibrated against human labels. The evidence sentences also round numbers and carry no policy text, so correct claims read as unsupported. The number is a lower bound on a weak measurement, not a score for the agent (simulated data).

The judging run, on simulated data, cost more than I had approved: about $28.79 against a $15 cap, because a resumed run restarted the cap. The cap is now a total across reruns, and the ledger records the overrun.

## What it costs and what real data would change

The simulated run cost about $6.24 per 1,000 alerts. The ROI model turns the 8.8% auto-clear rate into analyst hours, and at the 5.3% leakage upper bound it shows no payback, because 0 leaks in 55 frauds is too small a sample to rule out a loss that size. Real data would replace every illustrative input, and a much larger labelled sample would be needed before any saving could be quoted.
