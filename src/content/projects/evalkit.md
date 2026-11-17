---
title: EvalKit
tagline: "Evaluate your own task across Claude and OpenAI models: grounded, calibrated, cost-aware, with confidence intervals."
kind: open-source
status: shipped
role: Creator
year: "2026"
featured: true
order: 20
tags:
  - evals
  - LLM-as-judge
  - grounding
  - PyPI
headline:
  value: 57.5%
  label: of answers correct and fully grounded for the best model, on 200 PubMedQA questions
  note: "GPT-6.1 Sol, judged by Claude Opus 5.5 (95% CI 50.5% to 64.0%); separated from every other model after a Holm correction. Provisional: the judge is not yet calibrated for this task. Run r-e8dac378d2d3, 14 Nov 2026."
metrics:
  - value: "4"
    label: models compared, two from each family
  - value: 77.0%
    label: best label accuracy (Claude Sonnet 5.5)
  - value: "2"
    label: judges from different model families check every claim
  - value: $0.02
    label: per 100 answers for Claude Haiku 5.5, vs $0.36 for Sonnet
links:
  repo: https://github.com/biplob819/evalkit
  package: https://pypi.org/project/evalkit-harness/
  report: https://biplob819.github.io/evalkit/
  demo: https://evalkit-demo.streamlit.app/
stack:
  - Python 3.12
  - uv
  - Anthropic and OpenAI SDKs
  - pydantic
  - DuckDB
  - Vega-Lite
  - Streamlit
methodology:
  - Answers must cite sentences from the source abstract
  - Two judges from different model families, checked against hand labels
  - Bootstrap 95% confidence intervals and paired permutation tests
  - Holm correction across model comparisons
  - Self-preference measured, not assumed away
  - Cost per correct answer from real token counts
images:
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/headline.svg
    alt: "EvalKit headline chart: correct and fully grounded rate by model with 95% confidence intervals"
    kind: result
    caption: Correct and fully grounded rate per model, with 95% confidence intervals.
proof:
  - label: Results summary (JSON)
    url: https://github.com/biplob819/evalkit/blob/main/docs/results/summary.json
  - label: Full results report
    url: https://biplob819.github.io/evalkit/
  - label: Live demo
    url: https://evalkit-demo.streamlit.app/
  - label: Package on PyPI
    url: https://pypi.org/project/evalkit-harness/
story:
  evals:
    - name: Grounded answers
      data: 200 PubMedQA questions, 4 models (2 Claude, 2 OpenAI)
      method: Each answer must cite sentences from the abstract; every claim is checked by two judges from different model families; bootstrap 95% CIs and a Holm correction
      result: "Best: 57.5% correct and fully grounded (GPT-6.1 Sol, 95% CI 50.5% to 64.0%), separated from every other model"
      status: provisional
      url: https://biplob819.github.io/evalkit/
    - name: Label accuracy
      data: The same 200 questions and 4 models
      method: The answer's yes, no or maybe label against the PubMedQA gold label
      result: "Best: 77.0% (Claude Sonnet 5.5)"
      status: final
      url: https://github.com/biplob819/evalkit/blob/main/docs/results/summary.json
    - name: Judges catch planted false claims
      data: 10 planted false claims and 5 true controls
      method: Both judges score them blind, without knowing which are planted
      result: 15 of 15 right for each judge (Claude Opus 5.5 and GPT-6.1 Sol)
      status: pass
      url: https://github.com/biplob819/evalkit/blob/main/docs/measurements/planted-2026-11-14.json
    - name: Text-to-SQL agents
      data: 300 agent trials on public and held-out tasks
      method: A fresh read-only DuckDB copy per trial, a simulated user for ambiguous questions, task-level bootstrap and Holm-adjusted comparisons
      result: "Claude Sonnet 5.5 81% vs GPT-6.1 Sol 82% to 83% success on public tasks, 75% each on held-out tasks: no separated gap"
      status: final
      url: https://github.com/biplob819/evalkit/blob/main/changelog.md
    - name: Simulated user keeps the answer secret
      data: 26 live clarifying exchanges
      method: Audited by a stricter leak detector than the guard being tested
      result: 26 of 26 passed
      status: pass
      url: https://github.com/biplob819/evalkit/blob/main/docs/measurements/simuser-2026-11-14.json
    - name: Judge calibration on hand labels
      data: Held-out hand labels
      method: Judge error rate measured against held-out hand labels
      result: Not run yet, so the headline stays provisional
      status: pending
  improvements:
    - metric: Agent cost per trial
      before: $0.040
      after: $0.018
      change: Sent the agent's history as conversation turns so provider caches hit (66% of Sonnet's input cached).
      url: https://github.com/biplob819/evalkit/blob/main/changelog.md
    - metric: Estimated cost of the full agent run
      before: $31.52
      after: $6.16
      change: Estimated from tokens measured in a pilot instead of placeholders. The run then cost $3.81.
      url: https://github.com/biplob819/evalkit/blob/main/changelog.md
  monitoring:
    - metric: Spend per run
      kind: cost
      how: Every API call is written to a public spend ledger; each run prints its estimate before the first call and stops at a hard cap.
    - metric: Demo spend per day
      kind: guardrail
      how: A Postgres daily counter reserves each request's worst-case cost before it runs; live mode sits behind a passcode or the visitor's own keys.
  learnings:
    - lesson: "My first headline said the most accurate model was the least grounded. Every unit test passed, because each step was tested alone: the claim extractor was matching claims to sentences it never saw, and 88% of sampled 'unsupported' claims were in fact supported."
      now: Before publishing any number, I read a sample of real failures end to end. I withdrew that headline and re-judged the whole run.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
    - lesson: On the first agent run, most 'failures' were correct answers with extra helpful columns, and one gold answer used a different month format from the agents' correct one.
      now: After the first real run of any scorer, I group failures by reason and confirm each reason is a real error before reporting a number.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
    - lesson: Resampling at the wrong level made a one-task difference look like a real gap between models, and provider outages were scored as agent outcomes.
      now: I bootstrap at the level the metric is defined, and infrastructure failures are excluded, never scored.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
    - lesson: A spend cap is only as strong as its weakest estimate. Three parts each used a different number, and a characters-divided-by-three token estimate under-priced non-English text 3 to 6 times.
      now: Every hold comes from exact per-call reservations, every call has an output cap, and the chain is tested with long, non-English and cancelled calls.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
    - lesson: A check that has never failed is a check nobody has tested.
      now: Every gate ships a self-test that feeds it bad input and must fail, naming the defect.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
source:
  repo: biplob819/evalkit
  synced: 2026-11-16
---

## Overview

Evaluate **your own task** across Claude and OpenAI models: accuracy, groundedness, citation validity, cost and latency side by side, with confidence intervals and two cross-family judges whose error rate is measured against held-out hand labels.

**Try it in the browser:** the [live demo](https://evalkit-demo.streamlit.app/) shows four models answering the same question from a study abstract, with every claim checked against the sentences it cites. Replay mode is free; live mode runs on your own API keys or the owner's passcode.

The full write-up (the user pain, decisions and trade-offs, what failed, and how to reproduce) is in the repo and the results report linked above.
