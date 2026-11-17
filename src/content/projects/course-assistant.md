---
title: AI Teaching Assistant
tagline: A course assistant that answers only from approved session materials, cites every slide and hands everything else to the teaching team.
kind: case-study
status: building
role: Product and build
year: "2026"
order: 37
tags:
  - RAG
  - education
  - guardrails
stack:
  - Python
  - OpenAI Responses API with file search
  - Streamlit
  - EvalKit
links:
  repo: https://github.com/biplob819/course-assistant
  prd: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20PRD.md
  techspec: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20Tech%20Spec.md
images:
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/architecture.svg
    alt: "Four layers: course ingest, the runtime (Streamlit pages, answer pipeline, privacy, escalation, digest, store, LLM client), the evaluation stack built on EvalKit, and the release and CI layer."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/dataflow.svg
    alt: A learner question passes the passcode gate, then route and answer run in parallel; the answer is grounded, integrity-checked and leak-scanned before a status is chosen. Not-covered answers can go to the teaching team's queue. Consenting learners' questions feed a k-anonymous weekly digest.
    kind: dataflow
methodology:
  - A 429-case golden set on a public sample course, written before any prompt tuning
  - Split 50/50 by group; prompts and thresholds tuned on the public half only, the held-out half scored once
  - Groundedness and integrity judged by two models from different vendors
  - Judges calibrated against 100 owner-labelled items per check before the gate can pass
  - A release gate with zero tolerance for integrity, injection, leaks and identity
proof:
  - label: First full run report
    url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
  - label: Golden set rules
    url: https://github.com/biplob819/course-assistant/blob/main/golden/README.md
  - label: Held-out manifest (hashes)
    url: https://github.com/biplob819/course-assistant/blob/main/golden/heldout/MANIFEST.json
story:
  overview: A course assistant for an executive programme that answers only from approved session materials, cites the slide every time, and hands everything else to the teaching team. It gives hints, never answers, on graded work, and is scored on a 280-case golden set before launch. The demo runs on a public sample course, with no learner data.
  pain:
    who: Working professionals on an executive programme who study around their jobs, and the teaching team that supports them.
    problem: Questions come up between live sessions and wait for the forum or the next session, and the teaching team answers the same ones more than once. A general chatbot would reply at once, but from outside the course, sometimes wrongly, and it would write graded work on request.
  bet: An assistant that answers only from approved course material, cites the slide every time, hands everything else to a person, and is measured before launch can save the teaching team repeat work without risking accuracy or academic integrity.
  evals:
    - name: Grounded answer rate
      data: 215 fresh held-out cases, scored once
      method: Each answer sentence must be supported by a cited slide; target 0.90
      result: "0.813 after the quality round (first run 0.693 on the first held-out half): still below target"
      status: fail
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Locator correct
      data: 215 fresh held-out cases
      method: The citation points to the right slide or page; target 0.95
      result: 0.874 (first run 0.800)
      status: fail
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Academic integrity
      data: Held-out graded-work probes
      method: "Zero tolerance: hints only, never a solution"
      result: "Pass: 1.000 after the cached hint was switched off (first run 52 of 56)"
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Identity
      data: 5 held-out identity probes
      method: Zero tolerance
      result: "3 of 5: fails on the fresh held-out set"
      status: fail
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Citation validity, handover, injection, leaks
      data: Fresh held-out set
      method: Citations open the cited slide; out-of-scope goes to the team; zero tolerance on injection and leaks
      result: All pass (1.000)
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Latency and cost
      data: 215 held-out cases
      method: p95 target 11 s
      result: p95 10.0 s; $0.0075 a question
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Judge calibration
      data: 100 owner-labelled items per check
      method: Judges certified against a person before the gate can pass
      result: "Not run yet: owner labels in progress"
      status: pending
  improvements:
    - metric: Grounded answer rate, held-out
      before: "0.693"
      after: "0.813"
      change: Citation mapping, paragraph coverage and v2 answer and support rules, tuned on the public half only, then scored once on a fresh held-out set. On the public half the gain is +0.378 (95% CI +0.257 to +0.514, Holm-separated).
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - metric: Locator correct, held-out
      before: "0.800"
      after: "0.874"
      change: Same quality round; scored once on the fresh held-out set.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - metric: Integrity, held-out
      before: 52 of 56
      after: 100%
      change: All four failures came from one cached hint; the hint cache was switched off until integrity labels clear it.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
source:
  repo: biplob819/course-assistant
  synced: 2026-11-16
---

## Write-up

A course assistant that answers learner questions only from approved session materials, cites the slide or page it used, and hands everything else to the teaching team. It is measured on an [EvalKit](https://github.com/biplob819/evalkit) golden set before anyone relies on it.

This repo will never contain real course material or learner data. The demo runs on a sample course written for it, under CC BY 4.0.
