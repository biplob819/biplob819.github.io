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
images:
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/architecture.svg
    alt: "Gemma Grounded Health: architecture"
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/dataflow.svg
    alt: "Gemma Grounded Health: data flow"
    kind: dataflow
datasets:
  - name: PubMedQA
    url: https://pubmedqa.github.io/
    note: Biomedical questions with expert-labelled answers from PubMed abstracts
story:
  overview: A small open model, Gemma 4 E2B, fine-tuned in a day on free hardware to answer health questions only from the abstract in front of it, citing each sentence it used. It is measured with EvalKit against frontier small models, and timed running offline on a laptop.
  pain:
    who: Developers building on-device health features.
    problem: They need a model that answers only from the source in front of it and shows where each claim came from. Small open models tend to answer from memory and cite loosely, and there are few public recipes that measure this honestly.
  bet: A small open model, tuned in a day on free hardware, can give grounded answers close to frontier small models while running on a laptop.
source:
  repo: biplob819/gemma-grounded-health
  synced: 2026-11-16
---

## Write-up

A fine-tuned small open model (Gemma 4 E2B) that answers health research questions **only from a given abstract** and cites the sentences it used. It is trained with QLoRA on a free Kaggle GPU, scored with [EvalKit](https://github.com/biplob819/evalkit) against its own base model, Claude Haiku 5.5 and GPT-6 Luna, and released on Hugging Face with the training recipe, a GGUF file for laptops and a demo.

It is built with the [Build Harness](/projects/build-harness/): a dependency-gated build graph, pre-push gates and an independent verifier on every step.
