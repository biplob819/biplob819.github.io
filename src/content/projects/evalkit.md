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
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/architecture.svg
    alt: "EvalKit's layers: entry points (CLI, Python API, GitHub Action, demo), the evaluation pipeline, the typed DAG runtime with a content-addressed store and budget, model and system adapters, the public scorer library, outputs, the build harness, and the seven downstream projects that build on EvalKit and are checked by a weekly canary."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/evalkit/main/docs/assets/dataflow.svg
    alt: "How one evalkit run turns a task and a config into a scored, reproducible result: load and sample, generate, validate, extract claims, judge with two model families, score, aggregate with confidence intervals, and write the summary, records and report. Every step is cached in a content-addressed store."
    kind: dataflow
methodology:
  - Answers must cite sentences from the source abstract
  - Two judges from different model families, checked against hand labels
  - Bootstrap 95% confidence intervals and paired permutation tests
  - Holm correction across model comparisons
  - Self-preference measured, not assumed away
  - Cost per correct answer from real token counts
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
timeline:
  - when: 14 Nov 2026
    title: Build harness and first pipeline
    status: built
    url: https://github.com/biplob819/evalkit/blob/main/changelog.md
    items:
      - A dependency-gated build graph of 26 nodes and a catalog of 144 capabilities, each needing named tests as proof
      - 12 gates per node, each with a self-test that must fail on planted bad input
      - Generate, validate, extract claims, dual judging, scoring, and an agent track with a simulated user
  - when: 15 Nov 2026
    title: v0.1.0 on PyPI
    status: released
    url: https://pypi.org/project/evalkit-harness/0.1.0/
    items:
      - Published by GitHub trusted publishing, with install smoke tests on Linux, macOS and Windows
      - PubMedQA benchmark plus SciFact as a second built-in task, CSV datasets, a CI action example and a public-API contract test
  - when: 16 Nov 2026
    title: "v0.2.0: evaluate your own system, not just a model"
    status: released
    url: https://pypi.org/project/evalkit-harness/0.2.0/
    items:
      - "Systems under test: plug in an app (retrieval, prompts, tools) and score it like a model"
      - Task-declared scorers and per-slice results with 95% intervals
      - Driven by the first downstream project, the AI Teaching Assistant
  - when: 17 Nov 2026
    title: One eval loop for every project (Wave 5)
    status: built
    url: https://github.com/biplob819/evalkit/blob/main/docs/decisions.md
    items:
      - "A downstream registry and weekly canary: 7 projects pinned, 1,303 of their tests passing against current EvalKit"
      - Release gates on any metric with fail and warn severity and exact one-sided bounds, asked for by Assay Pipeline
      - Calibration sheets for any criterion, and a standard efficiency block (tokens, cache hits, cost per correct answer, latency)
  - when: Next
    title: v0.3.0 and v0.4.0
    status: planned
    url: https://github.com/biplob819/evalkit/blob/main/docs/graph/graph.md
    items:
      - "v0.3.0: a public API for internals two or more projects use, gates, and run-versus-run comparison"
      - "v0.4.0: a monitoring and improvement ledger (from Field PM Pack), a paraphrase contamination probe (from Gemma Grounded Health), a calibration integrity sheet (from the AI Teaching Assistant) and an agent security kit (from Assay Pipeline)"
install:
  - cmd: pip install 'evalkit-harness[anthropic,openai]'
  - cmd: evalkit init
    note: scaffold a project and a three-case sample task
  - cmd: evalkit run evalkit.yaml --task tasks/my_task.yaml --n 3 --dry-run
    note: cost estimate, no API calls
  - cmd: evalkit run evalkit.yaml --task tasks/my_task.yaml --n 3
    note: needs keys in .env
datasets:
  - name: PubMedQA
    url: https://pubmedqa.github.io/
    note: Biomedical questions with expert-labelled answers from PubMed abstracts
  - name: SciFact
    url: https://github.com/allenai/scifact
    note: Scientific claim verification, the second built-in task
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
  bet: If a team can evaluate its own task on four models with one command, with a grounded headline metric, confidence intervals and judges checked against hand labels, it will choose models on evidence instead of leaderboards.
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
    - metric: Build harness, 14 to 17 Nov
      before: 26 nodes
      after: 42 nodes
      change: Capabilities grew from 144 to 209 (184 green, each with named tests as proof), and 40 lessons were each turned into a rule a gate or test now enforces.
      url: https://github.com/biplob819/evalkit/blob/main/docs/lessons.md
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

## Write-up

Teams pick a model from leaderboards built on someone else's task, then grade it with an LLM judge nobody has checked. I built EvalKit, an open-source Python harness that runs your own cases across Claude and OpenAI models and has judges from two model families check every claim in each answer against the sentences it cites. Its first benchmark put 200 PubMedQA questions to four models. GPT-6.1 Sol was the most grounded: correct and fully grounded on 57.5% of answers by the Claude Opus 5.5 judge and 46.0% by the GPT-6.1 Sol judge (which was rating its own answers), and separated from every other model after a Holm correction under both. Claude Sonnet 5.5 was the most accurate, 77.0% correct labels, yet correct and fully grounded on only 38.5% by the Claude judge. The benchmark cost $23.87, the whole project $31.56 in API calls. The judges are not yet calibrated, so these numbers are provisional. EvalKit is on PyPI (v0.1.0 and v0.2.0), with a public report, a live demo, and seven projects that build on it.

## My role

Product owner and decision-maker. I owned the PRD and technical spec and made the calls recorded as OWNER entries in the decision log: both judges on every claim of the full run (D-4); quality before cost, with a larger budget for stronger judging (D-34); a gap between models counts only if it survives a Holm correction (D-36); withdrawing the first headline and re-judging the benchmark after a 40-claim check showed the judges had been given the extractor's guessed citations, not the sentences each answer actually cited (D-52); a passcode on every live demo request (D-59); and Wave 5, which makes EvalKit the shared eval harness for my other projects (D-61 to D-63). I added the API keys, approved the spend from the $0.24 smoke run (D-30) to the $8.48 re-judge, and entered the passcode for the demo's live deployment check. The calibration hand labels are not done yet; that is the open item.

Claude Code wrote the code, tests and docs under a lean adaptation of the Kova node harness (D-8). The build is a dependency graph of nodes, and a node starts only when everything it depends on is green. For each node Claude wrote failing tests for every acceptance criterion first, then the code, then had to pass 12 gates, among them lint, types, golden, judge and safety tests, a clean-wheel install and a check that changed source came with changed tests. A fresh-context verifier agent, which never sees the builder's reasoning, then tried to disprove each criterion; verifiers found real faults, such as summary rules loose enough to publish a "calibrated" stamp that was not true (D-39). Wave 5 ran as parallel lanes, one builder per node in its own git worktree, with a lead agent merging one lane at a time (D-66).

## Key decisions

1. **Two judges from different families check every claim (OWNER D-4).** Claude Opus 5.5 and GPT-6.1 Sol rule on every claim of the full run, on one claim set from a single fixed extractor (D-3), with model names redacted (D-35). Why: a judge can favour its own family, and that only shows when both judge every answer. Here both rated GPT answers better grounded than Claude answers (Opus 88.8% against 81.4%, Sol 80.9% against 72.0% mean groundedness), so the ranking is not one judge favouring its own. *Trade-off:* every claim is paid for twice, and the report carries two headline numbers that disagree instead of one clean figure.
2. **Report judge agreement only on held-out hand labels (D-5, D-41, D-43).** Hand labels are split into a tuning half and a held-out half; agreement (Cohen's kappa, with an interval that resamples whole answers) comes from the held-out half only, and a run is stamped calibrated only when every judge has been scored that way for the task under the current rubric. Why: a kappa measured on the labels used to tune the rubric is training accuracy, not an error rate. *Trade-off:* the published benchmark stays marked uncalibrated and provisional until the hand labels are done; EvalKit will not call it anything else.
3. **EvalKit grows with the projects built on it, behind a canary (OWNER D-61 to D-63).** Before a release, a canary runs each downstream project's own offline EvalKit tests against the current code; an internal name that two or more projects use joins the public API; and every change made for a project ships with that project's failing case as an EvalKit test. On the first baseline five projects passed all their tests (1,303), gemma-grounded-health showed one known drift that cannot affect it until it upgrades from its v0.1.0 pin, and respectful-offers imports nothing, so has none to run; the canary cost $0. Why: projects were rebuilding the same gates, comparisons and labelling checks, and without a canary a release could break them silently. *Trade-off:* a wider surface to maintain, with the next release (v0.3.0) still unreleased while requests queue; a capability with one user and no likely second stays in its own project (D-63).
