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
images:
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/dataflow.svg
    alt: "Data flow: simulated card transactions are minimised and split, scored by a LightGBM baseline, and flagged alerts are triaged by Claude Haiku 5.5 then Claude Sonnet 5.5; a router checks every clear against the policy in code; alerts end auto-cleared, held for priority review or escalated, and every step goes to a hash-chained audit log"
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/architecture.svg
    alt: "What was built and ran: a local Python CLI with a LightGBM baseline, a router and policy-as-code, a content-addressed cache, a spend cap and ledger and a hash-chained audit log, calling the Claude API with Haiku 5.5 for stage 1 and Sonnet 5.5 for stage 2. Supported but not run: Amazon Bedrock through the in-Region Mantle endpoint in us-east-2. Proposed for an AWS pilot, all in us-east-2: alerts in S3, EventBridge starting a Step Functions workflow of Lambda tasks inside an IAM boundary, DynamoDB for decisions and audit events streamed to S3 with Object Lock, an analyst queue app, CloudWatch, KMS, and a passkey-protected hosted demo on a Lambda function URL with DynamoDB."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/screens/review-case.png
    alt: "Analyst review screen: one held alert with its reasons, policy clauses and the fields used (simulated data, replay mode)"
    kind: screenshot
    caption: Analyst review screen, replay mode
  - src: https://raw.githubusercontent.com/biplob819/fraud-review-bedrock/main/docs/assets/screens/review-audit.png
    alt: "Audit view: every decision on the alert written to the hash-chained audit log (simulated data)"
    kind: screenshot
    caption: Audit trail for one alert
proof:
  - label: Data card
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/DATA_CARD.md
  - label: Evaluation runs (JSONL)
    url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
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
  evals:
    - name: Fraud leakage, first frozen evaluation
      data: 500 alerts, 79 frauds (simulated)
      method: Frauds the agent auto-cleared; the bar is zero
      result: "2 of 79 leaked (both small purchases at 11 p.m.): failed the bar; the run stays in the log"
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
    - name: Explanation faithfulness
      data: Final evaluation
      method: Do the stated reasons match what drove the decision?
      result: "Not run yet: part of the final evaluation"
      status: pending
  improvements:
    - metric: Frauds auto-cleared
      before: 2 of 79
      after: 0 of 55
      change: "One policy change chosen on the dev set (never auto-clear at night), then proven on a fresh, disjoint 500-alert sample, never on the run that exposed the leak. The cost: auto-clear fell from 36.8% to 8.8%. Simulated data."
      url: https://github.com/biplob819/fraud-review-bedrock/blob/main/docs/measurements/eval-runs.jsonl
source:
  repo: biplob819/fraud-review-bedrock
  synced: 2026-11-16
---

## Write-up

*Status: results pending the final evaluation (explanation judging and the dashboard). Every figure below comes from `docs/measurements/eval-runs.jsonl` and is on simulated data.*

Card-fraud teams drown in alerts, and most of them are legitimate. This project is a two-stage Claude agent that triages flagged transactions. Claude Haiku 5.5 screens each alert, and Claude Sonnet 5.5 reviews whatever Haiku will not clear. A router written in code, not the model, decides whether a clear is allowed, by checking the cited policy clause against the alert. Nothing that looks like fraud is closed without a person: the agent has no tool to block a card or contact anyone, and every step lands in a hash-chained audit log.

The safety bar is zero fraud auto-cleared. The first frozen evaluation failed it, leaking 2 of 79 frauds (simulated data). That run stays in the log. After one policy change, a fresh set of 500 alerts the agent had never seen leaked 0 of 55 frauds; the exact 95% upper bound is 5.3% (simulated data). The cost was automation: 8.8% of alerts were auto-cleared, down from 36.8%, all of them correctly (simulated data).

## My role

I set the goals and the hard rules. Those were zero fraud leakage, a spend cap with my approval for any run over five dollars, and evaluation through my own EvalKit harness. I made the calls at each fork: moving from Amazon Bedrock to the Claude API when the AWS project could not enable Claude, the risk ceiling and night rule after the leaks, and approving the over-budget eval run. Claude Code built the code, tests and measurements, working under a build harness ported from my EvalKit project. That harness uses a graph of nodes with converge gates and fresh-context verifier passes before any node is marked done, and every run is recorded in a public spend ledger.

## Key decisions

**The model recommends; code decides (D-5, D-6).** The policy is written as numbered clauses, each with a machine-checked condition. A "clear" from either model is only a proposal, which the router accepts when a cited clearing clause holds and no never-auto-clear clause does. *Trade-off:* the policy has to be expressible as conditions on a few allow-listed fields, so nuance the model sees but the rules cannot express never clears an alert on its own.

**A failed evaluation stays in the record, and the fix is tested on fresh alerts (D-39, D-40).** When the first frozen eval leaked two frauds, both small purchases at 11 p.m., the fix (never auto-clear at night) was chosen on the dev set. It was then proven on a second, disjoint sample drawn in advance, never on the eval that exposed the problem. *Trade-off:* auto-clear fell from 36.8% to 8.8% (simulated data), and a fresh sample costs another paid run. Without both, the zero-leakage claim would not be honest.

**Claude API instead of Amazon Bedrock for the published runs (D-35).** The AWS project stayed on the free plan with Claude not authorised, which blocked every node that calls a model. The request shape is identical on both providers, so the switch is one config line and Bedrock remains a supported path. *Trade-off:* the published results do not exercise Bedrock, which the architecture diagram marks as "supported, not run".
