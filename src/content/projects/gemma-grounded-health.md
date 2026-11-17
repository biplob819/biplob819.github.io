---
title: Gemma Grounded Health
tagline: A small open Gemma model fine-tuned to answer health questions only from a given abstract and cite its sentences. Research only, not medical advice.
kind: case-study
status: building
role: Product and build
year: "2026"
order: 36
tags:
  - fine-tuning
  - open models
  - grounding
links:
  repo: https://github.com/biplob819/gemma-grounded-health
  prd: https://github.com/biplob819/gemma-grounded-health/blob/main/Gemma%20Grounded%20Health%20PRD.md
  techspec: https://github.com/biplob819/gemma-grounded-health/blob/main/Gemma%20Grounded%20Health%20Tech%20Spec.md
stack:
  - Gemma
  - Kaggle GPU
  - Hugging Face
  - EvalKit
proof:
  - label: Data card
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/DATA_CARD.md
source:
  repo: biplob819/gemma-grounded-health
  synced: 2026-11-16
---

## Overview

This project is building a fine-tuned small open Gemma model (Gemma 4 E2B) that answers health research questions **only from a given abstract** and cites the sentences it used. The training recipe and a Kaggle pilot come at build node T2.1, the full training run at T2.2. The plan: score it with [EvalKit](https://github.com/biplob819/evalkit) against its own base model, Claude Haiku 5.5 and GPT-6 Luna (build node E3.2), and release it on Hugging Face with the training recipe, a GGUF for laptops and a demo (nodes R4.2 and R4.3).

The project is built node by node with the same harness as EvalKit: a dependency-gated build graph (`docs/graph/`), a capability catalog with proof cells, converge gates (`scripts/node_converge.py`) and a skeptical verifier. See Tech Spec §13.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
