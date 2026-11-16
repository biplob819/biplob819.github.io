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
source:
  repo: biplob819/evalkit
  synced: 2026-11-16
---

## Overview

Evaluate **your own task** across Claude and OpenAI models: accuracy, groundedness, citation validity, cost and latency side by side, with confidence intervals and two cross-family judges whose error rate is measured against held-out hand labels.

**Try it in the browser:** the [live demo](https://evalkit-demo.streamlit.app/) shows four models answering the same question from a study abstract, with every claim checked against the sentences it cites. Replay mode is free; live mode runs on your own API keys or the owner's passcode.

The full write-up (the user pain, decisions and trade-offs, what failed, and how to reproduce) is in the repo and the results report linked above.
