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
cost: $4.60 for the full run
source:
  repo: biplob819/assay-pipeline
  synced: 2026-11-16
---

## Overview

Public bioactivity data (EGFR IC50 by default, any target from config) from ChEMBL and PubChem, normalised into one versioned table with provenance on every row and quality problems flagged, never deleted. An AI agent answers questions about that table through a SQL guard and read-only access. Every query goes into a tamper-evident audit log, and the agent is attacked with cases mapped to the OWASP Top 10 for LLM Applications (2025) and MITRE ATLAS.

The full write-up (the user pain, decisions and trade-offs, what failed, and how to reproduce) is in the repo and the results report linked above.
