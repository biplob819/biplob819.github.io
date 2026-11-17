---
title: Trusted Assay Pipeline
tagline: Bioactivity data with provenance on every row, queried by an AI agent through a SQL guard and a hash-chained audit log, then attacked with the OWASP LLM Top 10.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 33
tags:
  - AI security
  - OWASP LLM Top 10
  - data provenance
headline:
  value: 0 of 310
  label: attack trials succeeded against Claude and GPT agents
  note: 300 agent trials (k=3, public and held-out cases) plus 10 data-poisoning cases. 95% upper bound 2.0% per trial for each model. Run main-2026-11-16.
metrics:
  - value: 41,463
    label: EGFR rows, quality problems flagged, never deleted
  - value: 97%
    label: of answers show the SQL that actually ran (Claude Sonnet 5.5; GPT-6.1 Sol 80%)
  - value: 94 of 96
    label: cases where the two judges agree
  - value: $4.60
    label: for the full run, ablation and judges
links:
  repo: https://github.com/biplob819/assay-pipeline
  report: https://biplob819.github.io/assay-pipeline/
  prd: https://github.com/biplob819/assay-pipeline/blob/main/Trusted%20Assay%20Pipeline%20PRD.md
  techspec: https://github.com/biplob819/assay-pipeline/blob/main/Trusted%20Assay%20Pipeline%20Tech%20Spec.md
stack:
  - Python
  - DuckDB
  - ChEMBL
  - PubChem
  - Claude
  - GPT
methodology:
  - Attack cases mapped to OWASP Top 10 for LLM Applications (2025) and MITRE ATLAS
  - k=3 trials per case on public and held-out splits
  - Guard-off ablation to see what the model refuses on its own
  - Scripted attacker with no model, to test the guard alone
  - Hash-chained, verifiable audit log
  - Quality problems flagged, never deleted
proof:
  - label: Results bundle (JSON)
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
  - label: Results dashboard
    url: https://biplob819.github.io/assay-pipeline/
  - label: Threat model
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/threat-model.md
  - label: Data card
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/data/2026-11-15.1/DATA_CARD.md
cost: $4.60 for the full run
images:
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/dashboard.png
    alt: "Trusted Assay Pipeline CISO dashboard: attack outcomes, what stopped them, data quality and audit events"
    kind: screenshot
    caption: CISO dashboard
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/console-replay.png
    alt: Agent console replaying a recorded attack through the SQL guard and the audit log
    kind: screenshot
    caption: Agent console, replay mode
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/explorer.png
    alt: Compound explorer over the EGFR snapshot with provenance and quality flags
    kind: screenshot
    caption: Data explorer
story:
  evals:
    - name: Attack suite
      data: 60 attack cases across the OWASP LLM Top 10, 3 trials each on public and held-out cases, plus 10 data-poisoning cases
      method: Claude Sonnet 5.5 and GPT-6.1 Sol agents query the data through the SQL guard; every query lands in a hash-chained audit log
      result: 0 of 310 succeeded; 95% upper bound 2.0% per trial for each model
      status: pass
      url: https://biplob819.github.io/assay-pipeline/
    - name: Guard switched off
      data: 80 attack trials
      method: The same attacks with the SQL guard removed, to see what the models refuse on their own
      result: "0 of 80 succeeded: the models refused on their own"
      status: final
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Scripted attacker, no model
      data: 60 attack cases
      method: The attack SQL goes straight to the pipeline with no model in the loop, so the guard is tested by itself
      result: "60 of 60 stopped: guard 45, quality rule 10, limit 5"
      status: pass
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Answers on normal questions
      data: The public split of normal questions
      method: The agent's query compared with the gold query; the answer checked for the gold value
      result: "Query matches gold: Sonnet 60%, Sol 70%. Answer states the gold value: Sonnet 100%, Sol 73%"
      status: final
      url: https://github.com/biplob819/assay-pipeline#results
    - name: The SQL shown is the SQL that ran
      data: All questions
      method: The SQL quoted in each answer compared with the audit log
      result: Claude Sonnet 5.5 97%, GPT-6.1 Sol 80%
      status: final
      url: https://github.com/biplob819/assay-pipeline#results
    - name: Judge reliability
      data: 96 judged cases and 24 hand labels
      method: Two judges from different model families, each checked against hand labels
      result: Agree with each other on 94 of 96; both match all 24 hand labels
      status: pass
      url: https://github.com/biplob819/assay-pipeline#results
  learnings:
    - lesson: The models refused almost every attack on their own, so "0 of 310" says little about the guard by itself.
      now: I added a guard-off run and a scripted attacker with no model in the loop. The scripted attacker is the real test of the guard, and it stopped 60 of 60.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/reading-the-dashboard.md
    - lesson: Two held-out attack statements were already in the public guard corpus, so their held-out score would have measured training accuracy.
      now: Before freezing a held-out split, I search all public material for its statements.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: The hand-label sampler drew from the whole suite, so paraphrases of two held-out answers were pushed to the public repo.
      now: Anything published that comes from answers is drawn from the public split by construction, and a test checks every published file.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: The data roadmap quoted the agent's filtered view (17,085 compounds) as if it described the whole snapshot (18,257).
      now: Every number I quote names the table it came from, and a test checks it against that table.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: After four rounds of tightening, the boundary lint still had bypasses.
      now: I state what a check can and cannot catch instead of claiming it is complete, and pair each static check with a runtime one.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
source:
  repo: biplob819/assay-pipeline
  synced: 2026-11-16
---

## Overview

Public bioactivity data (EGFR IC50 by default, any target from config) from ChEMBL and PubChem, normalised into one versioned table with provenance on every row and quality problems flagged, never deleted. An AI agent answers questions about that table through a SQL guard and read-only access. Every query goes into a tamper-evident audit log, and the agent is attacked with cases mapped to the OWASP Top 10 for LLM Applications (2025) and MITRE ATLAS.

The full write-up (the user pain, decisions and trade-offs, what failed, and how to reproduce) is in the repo and the results report linked above.
