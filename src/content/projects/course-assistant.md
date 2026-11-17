---
title: AI Teaching Assistant
tagline: A course assistant that answers only from approved session materials, cites every slide and hands everything else to the teaching team.
kind: case-study
status: design
role: Product and build
year: "2026"
order: 37
tags:
  - RAG
  - education
  - guardrails
links:
  repo: https://github.com/biplob819/course-assistant
  prd: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20PRD.md
  techspec: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20Tech%20Spec.md
story:
  overview: A course assistant for an executive programme that answers only from approved session materials, cites the slide every time, and hands everything else to the teaching team. It gives hints, never answers, on graded work, and is scored on a 280-case golden set before launch. The demo runs on a public sample course, with no learner data.
  pain:
    who: Working professionals on an executive programme who study around their jobs, and the teaching team that supports them.
    problem: Questions come up between live sessions and wait for the forum or the next session, and the teaching team answers the same ones more than once. A general chatbot would reply at once, but from outside the course, sometimes wrongly, and it would write graded work on request.
  bet: An assistant that answers only from approved course material, cites the slide every time, hands everything else to a person, and is measured before launch can save the teaching team repeat work without risking accuracy or academic integrity.
source:
  repo: biplob819/course-assistant
  synced: 2026-11-16
---

## Write-up

A course assistant that answers learner questions only from approved session materials, cites the slide or page it used, and hands everything else to the teaching team. It is measured on an [EvalKit](https://github.com/biplob819/evalkit) golden set before anyone relies on it.

This repo will never contain real course material or learner data. The demo runs on a sample course written for it, under CC BY 4.0.
