---
title: Gemma Grounded Health
tagline: A small open Gemma model fine-tuned to answer health questions only
  from a given abstract and cite its sentences. Research only, not medical
  advice.
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
images:
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of ten screens: the overview of base against fine-tuned
      results, the data flow and architecture diagrams, the command-line tool
      and its checks, the hand-audit page, results for four models with
      intervals per judge, what failed and why, the laptop speed benchmark, and
      the parity and contamination checks"
    caption: ten screens from committed results (v1), 25 seconds, loops
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/architecture.svg
    alt: "Gemma Grounded Health: architecture"
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/dataflow.svg
    alt: "Gemma Grounded Health: data flow"
    kind: dataflow
headline:
  value: 50.1% → 72.8%
  label: label accuracy of a fine-tuned Gemma 4 E2B on 1,000 expert-labelled
    PubMedQA questions, against its base model
  note: "But \"correct and fully grounded\" fell from 41.8% to 38.8% (Claude Opus
    5.5 judge; not separated): the fine-tune learned to cite the study's aim
    instead of its results. Cause traced to the training data; v2 is being built
    on dev data only. Run r-f0f3b432a413. Research only, not medical advice."
metrics:
  - value: 52% vs 86%
    label: "of claims supported by the cited sentences: fine-tuned vs base (Opus
      judge)"
  - value: 3.3 GB
    label: model file at 4-bit; runs offline on a laptop
  - value: "4"
    label: "models on the same 1,000 questions: Gemma base and fine-tuned, Claude
      Haiku 5.5, GPT-6 Luna"
  - value: $53.68
    label: for the main run (4,000 answers, dual judging), against a $63.65 estimate
proof:
  - label: Data card
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/DATA_CARD.md
  - label: Main run summary (JSON)
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main/summary.json
  - label: Full case study with the failure analysis
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
  - label: Spend ledger
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/measurements/spend-ledger.jsonl
datasets:
  - name: PubMedQA
    url: https://pubmedqa.github.io/
    note: Biomedical questions with expert-labelled answers from PubMed abstracts
story:
  overview: A small open model, Gemma 4 E2B, fine-tuned in a day on free hardware
    to answer health questions only from the abstract in front of it, citing
    each sentence it used. It is measured with EvalKit against frontier small
    models, and timed running offline on a laptop.
  pain:
    who: Developers building on-device health features.
    problem: They need a model that answers only from the source in front of it and
      shows where each claim came from. Small open models tend to answer from
      memory and cite loosely, and there are few public recipes that measure
      this honestly.
  bet: A small open model, tuned in a day on free hardware, can give grounded
    answers close to frontier small models while running on a laptop.
  evals:
    - name: Label accuracy
      data: 1,000 expert-labelled PubMedQA questions
      method: Yes / no / maybe against the expert label; paired bootstrap
      result: Fine-tuned 0.728, base 0.501 (separated, +22.7 points); Haiku 0.685,
        Luna 0.579
      status: final
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main/summary.json
    - name: Correct and fully grounded
      data: Same 1,000 questions, four models
      method: Right label and every claim supported by the cited sentences; two judges
        from different families; Holm correction
      result: "Opus judge: Luna 0.431, base 0.418, fine-tuned 0.388, Haiku 0.345. The
        fine-tune did not beat its base (tie)"
      status: fail
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main/summary.json
    - name: Claims supported
      data: Every claim in every answer
      method: Judged only against the sentences the answer cites
      result: "Fine-tuned 0.519 vs base 0.863 (Opus judge): 45% of the fine-tune's
        claims unsupported"
      status: final
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main/summary.json
    - name: Laptop file vs full precision
      data: Dev labels
      method: Agreement of the 4-bit file with the full-precision model; bar 0.95
      result: "0.956"
      status: pass
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/measurements/parity_report.json
    - name: v2 with a dev grounding bar
      data: Same 1,000 questions, separately pre-registered
      method: Citations chosen from result sentences only; bars fixed on dev before
        measuring
      result: "Pending: v2 is being built"
      status: pending
  learnings:
    - lesson: '"Valid citation" was not "supporting citation": every automatic dev
        check passed because it only asked whether the cited sentence existed.'
      now: Check that each cited sentence supports the claim, and turn what a
        hand-read sample shows into a measured dev bar.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
    - lesson: Training citations were picked by word overlap, which rewards the
        sentence that asks the question over the one that answers it; 43% of
        training answers cited an aim-like sentence.
      now: Training answers never cite aim or method sentences; citations must come
        from result sentences an entailment check confirms.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
    - lesson: The 50-example data audit checked citation sets; the model learned
        citations one sentence at a time.
      now: "Audit the unit the model will copy: each cited sentence has to earn its
        place."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
source:
  repo: biplob819/gemma-grounded-health
  synced: 2026-11-16
---

## Write-up

Gemma Grounded Health is a small open model (Gemma 4 E2B, 3.3 GB at 4-bit) fine-tuned to answer a research question only from the numbered sentences of a given abstract, with a yes / no / maybe label, a short answer and the sentences it relied on. It runs offline on a laptop. Research only, not medical advice.

The first fine-tune raised label accuracy on all 1,000 expert-labelled PubMedQA questions from 0.501 to 0.728, but it did not beat its own base model on the metric that matters, "correct and fully grounded" (0.388 against 0.418, Claude Opus 5.5 judging), because its citations often pointed at the study's aim instead of its results. The project measured that failure, traced it to the training data, and is building a v2 chosen on dev data only. Results for v2 are pending; v1's stay published.

## My role

I set the goals, wrote the PRD and made every product call recorded as an owner decision: evaluate on all 1,000 questions, pre-approve the spend, build the v2 fix after v1 failed, extend EvalKit with a per-sentence citation check, and hand-audit the training data. Claude Code built the pipeline under a build harness (dependency-gated build steps, 13 automated gates, an independent reviewer for each step), ran the Kaggle training and the EvalKit runs, and wrote the code, tests and records; I reviewed results and approved each paid run.

## Key decisions

- **Train and test on the benchmark's own prompt and format (D-2, D-6).** Training prompts are rendered by EvalKit's own PubMedQA template, and every model, local or frontier, answers under the same JSON schema, so the benchmark measures grounding rather than format. Answers are scored on "correct and fully grounded" with two judges from different model families. *Trade-off:* a strict metric that made v1 look worse than label accuracy alone would have ($53.68 for the full v1 run, mostly judging).
- **Pre-register the comparisons and live with them (§7.4).** The three comparisons were hashed and committed 31 seconds before the main run started; when v1 lost on the headline, the result stood. *Trade-off:* no freedom to pick a flattering metric afterwards.
- **Fix it on dev data, label it honestly (OWNER D-43).** v2 is selected with a dev-set grounding check, never the test questions, and is labelled as built after v1's test results were seen. *Trade-off:* a second Kaggle training run and more paid judging, instead of shipping v1 with a caveat.

The step-by-step failure analysis, the metrics table, the v2 plan and how to reproduce it are in the [full case study](https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md).
