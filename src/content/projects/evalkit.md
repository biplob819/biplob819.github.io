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
  prd: https://github.com/biplob819/evalkit/blob/main/EvalKit%20PRD.md
  techspec: https://github.com/biplob819/evalkit/blob/main/EvalKit%20Tech%20Spec.md
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
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/screenshots/demo-replay.png
    alt: "EvalKit demo: four models answer the same question, each claim checked against the sentences it cites"
    kind: screenshot
    caption: The live demo in replay mode
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/screenshots/report-headline.png
    alt: "EvalKit results report: correct and fully grounded rate per model with confidence intervals"
    kind: screenshot
    caption: Results report, headline view
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/screenshots/report-explorer.png
    alt: "EvalKit failure explorer: each claim with both judges' verdicts and the cited sentence"
    kind: screenshot
    caption: Failure explorer
proof:
  - label: Results summary (JSON)
    url: https://github.com/biplob819/evalkit/blob/main/docs/results/summary.json
  - label: Full results report
    url: https://biplob819.github.io/evalkit/
  - label: Live demo
    url: https://evalkit-demo.streamlit.app/
  - label: Package on PyPI
    url: https://pypi.org/project/evalkit-harness/
  - label: Data card
    url: https://github.com/biplob819/evalkit/blob/main/DATA_CARD.md
story:
  overview: An open-source Python tool (pip install evalkit-harness) that tells a team which AI model answers their own task best, how often each answer is backed by its source, and what each correct answer costs. Two judges from different model families check every claim, and every number carries a confidence interval. It is the evaluation engine behind the other seven projects here.
  impact:
    - Published on PyPI as evalkit-harness, with a live demo anyone can try in the browser.
    - "Even the best model was correct and fully grounded only 57.5% of the time on 200 PubMedQA questions (95% CI 50.5% to 64.0%), while the best label accuracy was 77.0%: a right label is not the same as a supported answer."
    - Caught its own wrong first headline (88% of sampled 'unsupported' claims were actually supported), withdrew it, and re-judged the run before publishing.
    - Now the shared evaluation engine for seven downstream projects.
  pain:
    who: AI engineers and product managers choosing a model for a domain task, such as patient-facing health answers.
    problem: They pick a model from public leaderboards that don't match their task, then grade outputs with an LLM judge nobody has checked, often from the same family as the model it grades. So they can't say how often answers are unsupported by the source, whether the grader is biased, or what quality each extra dollar buys.
  segments:
    - name: AI engineer at a health-tech startup
      need: Has to pick a model for patient-facing answers. Comfortable in Python, short on time, distrusts leaderboards, and needs to evaluate their task, not a public one.
      primary: true
    - name: Product manager
      need: Owns the launch decision and needs a quality bar and a cost line, not a notebook.
      primary: false
    - name: Downstream maintainer
      need: Imports EvalKit's scorers into other repos and needs them stable and versioned.
      primary: false
    - name: Eval lead at an AI lab
      need: Owns how agents are evaluated. Trusts a comparison only when scores are stable across trials, separate the models, and come from tasks the agents weren't tuned on.
      primary: false
    - name: Open-source user
      need: Finds EvalKit on GitHub or PyPI, installs it, and runs it on their own laptop with their own API keys and money. Might have only one provider's key, or only a local model. Gives up if the first result takes more than a few minutes, or if a run costs more than expected.
      primary: false
  bet: If a team can evaluate its own task on four models with one command, with a grounded headline metric, confidence intervals and judges checked against hand labels, it will choose models on evidence instead of leaderboards.
  priorities:
    - item: One command runs your own task, defined in YAML, on four models with 95% confidence intervals
      call: built
      why: The core promise. Failed calls count as wrong, never dropped.
    - item: Two judges from different model families, with a calibration panel
      call: built
      why: A judge grading its own family can't be trusted, so the bias is measured, not assumed away.
    - item: "Reproducible results: rescoring saved answers gives the same numbers"
      call: built
      why: Results you can't reproduce can't be shared or trusted.
    - item: A public leaderboard
      call: cut
      why: It would repeat the problem the tool exists to solve.
    - item: Model training and clinical use
      call: cut
      why: EvalKit measures; its outputs are research benchmarks, not medical advice.
    - item: Latency percentiles and dashboard polish
      call: later
      why: First to go if scope shrinks. Judge calibration and confidence intervals are never cut, because without them the headline is unverified.
    - item: A Gemini adapter
      call: later
      why: The adapter interface leaves room; it's a small, separate step.
  stories:
    - as: AI engineer
      want: run a benchmark on four models with one command
      why: I can compare quality and cost on my task
      priority: must
    - as: AI engineer
      want: see each answer's claims marked supported or unsupported beside the source
      why: I can see why a model failed
      priority: must
    - as: Product manager
      want: know how far to trust the judges
      why: I don't ship on a broken metric
      priority: must
    - as: AI engineer
      want: rerun and get the same numbers
      why: I can trust and share results
      priority: must
    - as: Downstream maintainer
      want: import a scorer from another repo
      why: every project reuses one tested implementation
      priority: must
    - as: Product manager
      want: see cost per correct answer and a pass or fail against my bar
      why: I can make a go or no-go call
      priority: must
    - as: Open-source user
      want: know and cap what a run will cost before it starts
      why: I never get a surprise bill
      priority: must
    - as: Demo owner
      want: keep a public link from draining my API budget or collecting personal data
      why: sharing the demo is safe
      priority: should
    - as: AI engineer
      want: add my own task in YAML without writing Python
      why: I can evaluate my use case, not a public benchmark
      priority: should
    - as: Eval lead
      want: score an agent on full multi-step runs, with repeated trials and confidence intervals
      why: I can tell a real gap between agents from noise
      priority: should
    - as: Open-source user
      want: install EvalKit and see a result before spending anything
      why: I can decide whether it's worth setting up
      priority: should
    - as: Open-source user with one provider key
      want: still evaluate my models
      why: I'm not blocked by needing two accounts
      priority: should
    - as: Open-source user
      want: run my own task before I've hand-labelled anything
      why: I get a first read quickly and know how far to trust it
      priority: should
    - as: Open-source user
      want: use EvalKit as a CI quality gate
      why: a model or prompt change that breaks my bar fails the build
      priority: could
    - as: Open-source user
      want: evaluate local models and add my own scorers without forking
      why: EvalKit fits my stack
      priority: could
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
