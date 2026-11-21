---
title: Gemma Grounded Health
tagline: A small open Gemma model fine-tuned to answer health questions only
  from a given abstract and cite its sentences. Research only, not medical
  advice.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 36
tags:
  - fine-tuning
  - open models
  - grounding
links:
  model: https://huggingface.co/biplob123/gemma-4-e2b-grounded-health
  repo: https://github.com/biplob819/gemma-grounded-health
  prd: https://github.com/biplob819/gemma-grounded-health/blob/main/Gemma%20Grounded%20Health%20PRD.md
  techspec: https://github.com/biplob819/gemma-grounded-health/blob/main/Gemma%20Grounded%20Health%20Tech%20Spec.md
  report: https://biplob819.github.io/evalkit/gemma/
  howBuilt: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/writeup/how-i-built-it.md
  prdOnePage: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/writeup/prd-one-page.md
  methodology: https://github.com/biplob819/gemma-grounded-health/blob/main/configs/eval_plan_v2.yaml
stack:
  - Gemma
  - Kaggle GPU
  - Hugging Face
  - EvalKit
images:
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of ten screens: v2's headline numbers against v1 and base,
      the v2 results table with the pre-registered verdicts and the aim-rule
      caveat, the v1 failure diagnosis (citations of the study's aim), the
      Hugging Face model page, the local demo, the data flow diagram, the laptop
      benchmark, the parity and paraphrase checks, the command-line health check
      with the audit score, and the local hand-audit page"
    caption: ten real screens, 25 seconds, loops; nothing live or paid
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/demo.gif
    alt: "Recording of the local demo: sample questions answered by base and
      fine-tuned v2 side by side with cited sentences highlighted, then a live
      answer refused without the passcode"
    caption: The local demo against the benchmarked 4-bit file, recorded on a laptop
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/headline_v2.svg
    alt: "Base, v1 and v2 on 1,000 PubMedQA questions: correct-and-grounded 0.404,
      0.331, 0.329; cited sentences that support a claim 0.747, 0.362, 0.736;
      answers citing an unsupporting aim sentence 0.138, 0.560, 0.084, each with
      a 95% interval"
    caption: v2 fixed the citations, not the headline (GPT-6.1 Sol judge)
    kind: result
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/screenshots/v1_vs_v2_citation.png
    alt: v1 and v2 give the same answer to a hypertension question, but v1 cites
      sentence 2, the study's aim, which the judge marks as not supporting the
      claim, while v2 cites sentence 11, the result, which it marks as
      supporting
    caption: The same answer, cited from the aim (v1) and from the result (v2)
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/screenshots/evalkit_report_main_v2.png
    alt: "EvalKit report for the v2 main run: headline with 95% intervals and a
      per-model table of headline, groundedness, citation precision,
      aim-citation rate and accuracy"
    caption: EvalKit report for the v2 run
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/screenshots/hf_model_page.png
    alt: "The v2 model's page on Hugging Face: Apache-2.0 licence, a research-only
      notice, a summary of the fine-tune and its scores, the base model tree, the
      PubMedQA training dataset and evaluation results linked to EvalKit runs"
    caption: v2 released on Hugging Face (tag v2.0.0), with a 4-bit laptop file for
      Ollama alongside
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/screenshots/demo_answer.png
    alt: "The local demo answering a stroke question from its abstract: base
      Gemma cites sentences 1 and 4, the study's aim and method, while
      fine-tuned v2 cites sentence 5, the result; both run as the 4-bit laptop
      file, with a research-only notice"
    caption: The demo on a laptop, base against v2 on the benchmarked 4-bit file
      (six samples, 12 of 12 labels right; pasted abstracts behind a passcode)
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/screenshots/demo_passcode_gate.png
    alt: The local demo's Your abstract tab refusing a live answer with a wrong
      passcode
    caption: Live answers need a passcode, even with your own API key
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/architecture.svg
    alt: "Gemma Grounded Health: architecture"
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/gemma-grounded-health/main/docs/assets/dataflow.svg
    alt: "Gemma Grounded Health: data flow"
    kind: dataflow
headline:
  value: 0.362 → 0.736
  label: of cited sentences that support a claim, fine-tuned v1 → v2, on 1,000
    expert-labelled PubMedQA questions (GPT-6.1 Sol judge)
  note: "The fix v2 was built for: v1 had learned to cite the study's aim instead
    of its results (answers citing an unsupporting aim sentence 0.560 → 0.084).
    Correct and fully grounded tied (0.331 → 0.329), and the base model stays
    ahead at 0.404. v1 had raised label accuracy from 0.501 to 0.728; v2 scores
    0.678. Released as v1.0.0. Research only, not medical advice."
metrics:
  - value: 0.560 → 0.084
    label: "answers citing an unsupporting aim sentence, v1 → v2: the failure v2
      fixed"
  - value: 3.43 GB
    label: "v2 model file at 4-bit (3,427,874,336 bytes); runs offline on a laptop"
  - value: "4"
    label: "models on the same 1,000 questions: Gemma base and fine-tuned, Claude
      Haiku 5.5, GPT-6 Luna"
  - value: $4.00
    label: for v2's main run, with base and v1 answers from EvalKit's cache ($53.68
      for v1's run of 4,000 answers with two judges)
proof:
  - label: Data card
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/DATA_CARD.md
  - label: Main run summary (JSON)
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main/summary.json
  - label: Full case study with the failure analysis
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md
  - label: Spend ledger
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/measurements/spend-ledger.jsonl
  - label: GitHub release v1.0.0 (notes, artifacts, hashes, known limits)
    url: https://github.com/biplob819/gemma-grounded-health/releases/tag/v1.0.0
  - label: 4-bit laptop file on Hugging Face (GGUF)
    url: https://huggingface.co/biplob123/gemma-4-e2b-grounded-health-GGUF
  - label: v2 main run summary (JSON)
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/results/main_v2/summary.json
  - label: Reproduce from scratch
    url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/reproduce.md
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
        from different families; Holm correction (a stricter bar when several comparisons are tested at once)
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
      result: "v1 0.956 (pass). v2 0.920, below the bar: the loss comes from 4-bit
        quantisation (the 8-bit file scores 0.996); waived by the owner and
        disclosed"
      status: final
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/known-issues.md
    - name: v2 on the 1,000 test questions
      data: 1,000 expert-labelled PubMedQA questions, a plan hashed before the run
      method: GPT-6 Luna extracts claims and GPT-6.1 Sol judges them (one judge, while
        the Anthropic credit is out); paired bootstrap, Holm over six tests
      result: Citations fixed, headline not. Citation precision 0.736 (v1 0.362, base
        0.747) and aim-citation rate 0.084 (v1 0.560, base 0.138); correct and
        fully grounded 0.329 (v1 0.331, a tie; base 0.404, base better). The
        judge is checked against a Claude Opus 5.5 labeller (kappa 0.60 [0.47,
        0.71]); the labels are a model's, by the owner's choice
      status: final
      url: https://github.com/biplob819/gemma-grounded-health#v2-result-the-citations-are-fixed-the-headline-is-not
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
    - lesson: The first Kaggle training pilot's numbers looked right, but its own log
        showed the library had trained on a different copy of the model and
        overridden the requested precision.
      now: Read the remote run's own log before believing its metrics; every run
        records what actually loaded and refuses a mismatch.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/lessons.md
    - lesson: The laptop model file loaded cleanly and matched the prompt format 20 of
        20, yet its answers disagreed with the full model on half the dev
        prompts, because the server's answer-format grammar let it open a
        thinking section that training never had.
      now: Check a served model through the exact request the benchmark sends, and
        narrow down the serving path before touching the weights.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/lessons.md
    - lesson: The reference server reordered the answer format so the label came last;
        every reply ran to the token cap with no label, 44 seconds each.
      now: Watch the first few replies of any new serving path before a paid run, and
        never change a payload that is then used, only a copy.
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/lessons.md
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
    - metric: Citation precision, 1,000 test questions (GPT-6.1 Sol)
      before: "0.362"
      after: "0.736"
      change: v2 retrained on targets whose citations must each support the answer; v1
        against v2 is separated (+0.374).
      url: https://github.com/biplob819/gemma-grounded-health#v2-result-the-citations-are-fixed-the-headline-is-not
    - metric: Answers citing an unsupporting aim sentence
      before: "0.560"
      after: "0.084"
      change: Same retrain; separated (−0.476), and below the base model's 0.138.
      url: https://github.com/biplob819/gemma-grounded-health#v2-result-the-citations-are-fixed-the-headline-is-not
  monitoring:
    - metric: Correct and fully grounded (GPT-6.1 Sol judge)
      kind: north-star
      target: Above the base model, separated, pre-registered
      current: 0.329 for v2 (v1 0.331, base 0.404)
      how: EvalKit main run on 1,000 PubMedQA questions, paired bootstrap with a Holm
        correction (a stricter bar when several comparisons are tested at once)
    - metric: Cited sentences that support a claim (GPT-6.1 Sol judge)
      kind: quality
      target: Reported with intervals
      current: 0.736 for v2 (v1 0.362, base 0.747)
      how: EvalKit citation check; v2 is not claimed to beat base on citations,
        because the judge's aim rule penalises base's aim-restating claims
    - metric: Label accuracy
      kind: quality
      target: Reported with intervals
      current: 0.678 for v2 (v1 0.728, base 0.501)
      how: Yes / no / maybe against the expert label, paired bootstrap
    - metric: Valid JSON answers on dev
      kind: guardrail
      target: At least 0.98 to select a checkpoint
      current: "1.000"
      how: Checked on dev prompts before a checkpoint is chosen
    - metric: Laptop file agreement with full precision (dev labels)
      kind: guardrail
      target: At least 0.95
      current: "0.920 for v2, missed and disclosed (v1 0.956)"
      how: The 4-bit file against the full-precision model on 500 dev prompts
    - metric: Memorisation check (paraphrase probe)
      kind: guardrail
      current: "No contamination signal: v1 0.79 on original wording, 0.84
        paraphrased; v2 0.76 on both (drop 0.00 [−0.03, +0.03])"
      how: Accuracy on 100 questions in original against reworded form, paired
        bootstrap
    - metric: Spend per main run
      kind: cost
      target: Hard cap $70, estimate first
      current: $4.00 for v2, with base and v1 answers from EvalKit's cache ($53.68
        for v1's run, estimate $63.65)
      how: Every API dollar goes into a spend ledger and every Kaggle GPU hour into a
        GPU ledger
  priorities:
    - item: "Retrained v2 so every cited sentence must support the answer"
      call: built
      why: "v1 cited the study's aim instead of its results, so v2 trained on stricter citation targets."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Every model scored with EvalKit on all expert-labelled PubMedQA questions"
      call: built
      why: "Pre-registered plans, paired intervals and Holm correction keep each comparison honest."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/configs/eval_plan_v2.yaml
    - item: "Merged weights and a laptop GGUF published on Hugging Face"
      call: built
      why: "The benchmarked 4-bit file runs offline in Ollama or llama.cpp."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/measurements/release_record_v2.json
    - item: "Passcode-gated local demo comparing base and fine-tuned answers"
      call: built
      why: "Sample answers are open to everyone, while live answers need a passcode even with your own key."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Model card and README numbers generated from one results bundle"
      call: built
      why: "Hand-copied numbers drift, so a test fails when any published number differs."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Reproduce-from-scratch guide where each step is a tested command"
      call: built
      why: "Anyone can rebuild the release from a fresh clone and check each step."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/reproduce.md
    - item: "Preference tuning (DPO) after the fine-tune"
      call: cut
      why: "The citation-target fix addressed the failure preference tuning would have targeted, saving a training run."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Hosted GPU demo on a ZeroGPU Space"
      call: cut
      why: "The free local app serves the exact benchmarked file with no spend."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "The owner hand-labelling the judge calibration claims"
      call: cut
      why: "A model labelled them under a committed prompt, and every report says the labels are a model's."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Claude Opus as a second judge on v2's results"
      call: later
      why: "The v2 benchmark ran on one judge because the Anthropic credit ran out."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "Clarify the aim rule in EvalKit's citation rubric"
      call: later
      why: "The judge marks aim sentences unsupporting even for claims that restate the aim, so an upstream issue records it."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/decisions.md
    - item: "A hosted demo with a global rate limit"
      call: later
      why: "The local demo limits passcode attempts per session, which a public host would need to tighten."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/known-issues.md
    - item: "Re-run the laptop benchmark on a quiet machine"
      call: later
      why: "v2's speed was measured on a busy laptop and its gap to v1 is unexplained."
      url: https://github.com/biplob819/gemma-grounded-health/blob/main/docs/known-issues.md
  next:
    - Claude Opus 5.5 as a second judge on v2, a laptop benchmark re-run on a quiet
      machine, and the public write-up
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
license: Apache-2.0
harness: true
---

## Write-up

Gemma Grounded Health is a small open model (Gemma 4 E2B, 3.43 GB at 4-bit) fine-tuned to answer a research question only from the numbered sentences of a given abstract, with a yes / no / maybe label, a short answer and the sentences it relied on. It runs offline on a laptop. Research only, not medical advice.

The first fine-tune raised label accuracy on all 1,000 expert-labelled PubMedQA questions from 0.501 to 0.728, but it did not beat its own base model on the metric that matters, "correct and fully grounded" (0.388 against 0.418, Claude Opus 5.5 judging), because its citations often pointed at the study's aim instead of its results. The project measured that failure, traced it to the training data, and retrained a v2 chosen on dev data only. On the same 1,000 questions v2 fixed the citations (cited sentences that support a claim, 0.362 to 0.736) but not the headline (0.329, a tie with v1 and below the base model's 0.404), under one judge, GPT-6.1 Sol.


## Key decisions

- **Train and test on the benchmark's own prompt and format.** Training prompts are rendered by EvalKit's own PubMedQA template, and every model, local or frontier, answers under the same JSON schema, so the benchmark measures grounding rather than format. Answers are scored on "correct and fully grounded" with two judges from different model families. *Trade-off:* a strict metric that made v1 look worse than label accuracy alone would have ($53.68 for the full v1 run, mostly judging).
- **Pre-register the comparisons and live with them.** The three comparisons were hashed and committed 31 seconds before the main run started; when v1 lost on the headline, the result stood. *Trade-off:* no freedom to pick a flattering metric afterwards.
- **Fix it on dev data, label it honestly.** v2 is selected with a dev-set grounding check, never the test questions, and is labelled as built after v1's test results were seen. *Trade-off:* a second Kaggle training run and more paid judging, instead of shipping v1 with a caveat.

The step-by-step failure analysis, the metrics table, the v2 plan and how to reproduce it are in the [full case study](https://github.com/biplob819/gemma-grounded-health/blob/main/docs/case-study.md).
