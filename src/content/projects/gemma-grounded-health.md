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
story:
  overview: A small open model, Gemma 4 E2B, fine-tuned in a day on free hardware to answer health questions only from the abstract in front of it, citing each sentence it used. It is measured with EvalKit against frontier small models, and timed running offline on a laptop.
  pain:
    who: Developers building on-device health features.
    problem: They need a model that answers only from the source in front of it and shows where each claim came from. Small open models tend to answer from memory and cite loosely, and there are few public recipes that measure this honestly.
  segments:
    - name: Developer building an on-device health feature
      need: Wants a small open model that stays grounded and runs offline.
      primary: true
    - name: Open-model community member on Hugging Face
      need: Will try the demo, read the model card and maybe reuse the recipe.
      primary: false
  bet: A small open model, tuned in a day on free hardware, can give grounded answers close to frontier small models while running on a laptop.
  priorities:
    - item: A QLoRA fine-tune of Gemma 4 E2B that answers from a given abstract and cites sentence numbers
      call: built
      why: The on-device model has to stay grounded.
    - item: EvalKit comparison against the base model, Claude Haiku 5.5 and GPT-6 Luna on 1,000 expert-labelled questions
      call: built
      why: Shows whether it's good enough, on the same questions.
    - item: Laptop speed and memory, and a recipe that runs on a free Kaggle GPU
      call: built
      why: Developers can plan on-device use and reproduce it.
    - item: Clinical use, and training on frontier-model outputs
      call: cut
      why: Research only, and the recipe stays clean.
    - item: The 26B and 31B models
      call: cut
      why: The story is on-device, so the small sizes matter.
    - item: A phone app through Android's AICore
      call: later
      why: The named next step.
    - item: A small preference-tuning (DPO) step
      call: later
      why: Reported only if done.
  stories:
    - as: Developer
      want: see the fine-tuned model's groundedness and citation validity against base and two frontier small models
      why: I know if it is good enough
      priority: must
    - as: Developer
      want: know its speed and memory on a laptop
      why: I can plan on-device use
      priority: must
    - as: Community member
      want: reproduce the fine-tune on free hardware
      why: I can adapt it
      priority: must
    - as: Community member
      want: read what the model is for and where it fails
      why: I use it responsibly
      priority: must
    - as: Developer
      want: call the model through EvalKit like any other
      why: comparisons stay one command
      priority: must
    - as: Community member
      want: download a quantised file for llama.cpp or Ollama
      why: I can run it offline today
      priority: should
    - as: Developer
      want: see a small preference step's effect
      why: I learn whether it is worth it
      priority: could
source:
  repo: biplob819/gemma-grounded-health
  synced: 2026-11-16
---

## Overview

This project is building a fine-tuned small open Gemma model (Gemma 4 E2B) that answers health research questions **only from a given abstract** and cites the sentences it used. The training recipe and a Kaggle pilot come at build node T2.1, the full training run at T2.2. The plan: score it with [EvalKit](https://github.com/biplob819/evalkit) against its own base model, Claude Haiku 5.5 and GPT-6 Luna (build node E3.2), and release it on Hugging Face with the training recipe, a GGUF for laptops and a demo (nodes R4.2 and R4.3).

The project is built node by node with the same harness as EvalKit: a dependency-gated build graph (`docs/graph/`), a capability catalog with proof cells, converge gates (`scripts/node_converge.py`) and a skeptical verifier. See Tech Spec §13.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
