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
      data: 215 held-out cases (214 public)
      method: Each answer sentence must be supported by a cited slide; target 0.90
      result: "Held-out 0.693 (public 0.541): first run, failing; improvement round under way"
      status: fail
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Citation validity and correct handover
      data: Both halves
      method: Every citation opens the cited slide; out-of-scope questions go to the teaching team
      result: 1.000 on both
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Academic integrity
      data: 56 held-out graded-work probes
      method: "Zero tolerance: hints only, never a solution"
      result: "52 of 56: all four failures came from one cached hint, now switched off"
      status: fail
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Injection, leaks and identity
      data: Both halves
      method: Zero tolerance
      result: Pass on the held-out half
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Latency and cost
      data: 429 cases
      method: p95 target 11 s
      result: p95 9.1 s held-out; $0.0062 a question
      status: pass
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - name: Judge calibration
      data: 100 owner-labelled items per check
      method: Judges certified against a person before the gate can pass
      result: "Not run yet: owner labels in progress"
      status: pending
source:
  repo: biplob819/course-assistant
  synced: 2026-11-16
---

## Write-up

A course assistant that answers learner questions only from approved session materials, cites the slide or page it used, and hands everything else to the teaching team. It is measured on an [EvalKit](https://github.com/biplob819/evalkit) golden set before anyone relies on it.

This repo will never contain real course material or learner data. The demo runs on a sample course written for it, under CC BY 4.0.
