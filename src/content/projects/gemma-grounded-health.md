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
    instead of its results. Cause traced to the training data; v2 is trained and
    checked on dev data only; its test run is next. Run r-f0f3b432a413. Research
    only, not medical advice."
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
      data: 200 dev questions (the 1,000 test questions are next)
      method: Citations chosen from result sentences only; bars fixed on dev before
        measuring; GPT-6.1 Sol judging
      result: "Dev check, not the test set: citation precision 0.768 (v1 0.404),
        aim-citation rate 0.067 (v1 0.590). Two dev bars narrowly missed:
        headline 0.350 vs v1 0.355 (Opus: 0.440–0.445 vs 0.465) and label
        accuracy 0.795 vs a 0.80 bar. Test results pending."
      status: provisional
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/README.md
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
  improvements:
    - metric: Label accuracy, 1,000 expert-labelled questions
      before: "0.501"
      after: "0.728"
      change: Fine-tuning v1 on free Kaggle hardware. Grounding got worse at the same
        time (claims supported 0.863 to 0.519), which is why v2 exists.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
    - metric: 4-bit laptop file agreeing with full precision, 16 test prompts
      before: 8 of 16
      after: 15 of 16
      change: Served with the reasoning budget set to 0, which closes the 'thinking'
        channel the fine-tuned model had started opening under the JSON format.
        Not a quantisation problem.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
  monitoring:
    - metric: Correct and fully grounded (Opus judge)
      kind: north-star
      target: Above the base model, separated, pre-registered
      current: "0.388 for v1 (base 0.418): a tie, base ahead"
      how: EvalKit main run on 1,000 PubMedQA questions, two judges, Holm-corrected
        comparison
    - metric: Claims supported by the cited sentences (Opus judge)
      kind: quality
      target: A v2 bar set on dev data before v2 is measured
      current: 0.519 for v1 (base 0.863)
      how: Every claim judged only against the sentences the answer cites
    - metric: Label accuracy
      kind: quality
      target: Reported with intervals
      current: 0.728 for v1 (base 0.501), separated
      how: Yes / no / maybe against the expert label, paired bootstrap
    - metric: Valid JSON answers on dev
      kind: guardrail
      target: At least 0.98 to select a checkpoint
      current: "1.000"
      how: Checked on dev prompts before a checkpoint is chosen
    - metric: Laptop file agreement with full precision (dev labels)
      kind: guardrail
      target: At least 0.95
      current: "0.956"
      how: The 4-bit file against the full-precision model on 500 dev prompts
    - metric: Memorisation check (paraphrase probe)
      kind: guardrail
      current: "No contamination signal: fine-tuned 0.79 on original wording, 0.84
        paraphrased"
      how: Accuracy on 100 questions in original against reworded form, paired
        bootstrap
    - metric: Spend per main run
      kind: cost
      target: Hard cap $70, estimate first
      current: $53.68 (estimate $63.65)
      how: Every API dollar goes into a spend ledger and every Kaggle GPU hour into a
        GPU ledger
  next:
    - Rebuild the training answers so they never cite an aim, objective or
      method sentence, and re-check them sentence by sentence
    - Retrain once on Kaggle, choosing the checkpoint on dev data with a new
      grounding bar
    - "A second pre-registered run on the same 1,000 questions: v2 against the
      base, v1, Claude Haiku 5.5 and GPT-6 Luna"
    - Judge calibration and a behaviour table per model before results are final
    - Release the model and its 4-bit laptop file on Hugging Face with a model
      card
    - A side-by-side demo, behind a passcode
    - A tagged open-source v1.0.0 release with reproduce-from-scratch docs
source:
  repo: biplob819/gemma-grounded-health
  synced: 2026-11-16
methodology:
  - Every model, local or frontier, gets the same EvalKit PubMedQA prompt and
    the same JSON answer format
  - Each claim is judged only against the sentences the answer cites, by two
    judges from different model families (Claude Opus 5.5 and GPT-6.1 Sol)
  - Bootstrap 95% intervals, paired bootstrap between models, and a Holm
    correction; a gap counts only when its corrected interval excludes zero
  - The comparisons were hashed and committed before the main run, and the
    result stood when the fine-tune lost
  - Training data checked for leakage against the 1,000 test questions and split
    by PubMed ID; the checkpoint is chosen on dev data only
  - The 4-bit laptop file is checked against the full-precision model on 500 dev
    prompts
  - A paraphrase probe on 100 questions checks whether the model memorised the
    benchmark
  - 20 answers are read by hand at each stage
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
