---
title: Agentic Analytics
tagline: How often does agentic analytics get the answer right? A ClickHouse MCP
  agent (Claude, GPT) vs Snowflake Cortex Analyst on a 100-question benchmark,
  scored against gold SQL.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 31
tags:
  - text-to-SQL
  - MCP
  - benchmarks
links:
  repo: https://github.com/biplob819/agentic-analytics
  prd: https://github.com/biplob819/agentic-analytics/blob/main/Agentic%20Analytics%20PRD.md
  techspec: https://github.com/biplob819/agentic-analytics/blob/main/Agentic%20Analytics%20Tech%20Spec.md
stack:
  - ClickHouse MCP
  - Snowflake Cortex Analyst
  - Claude
  - GPT
  - Langfuse
images:
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of ten screens: accuracy of every configuration with the
      strict score, the dashboard overview, the uplift from each single fix with
      its corrected verdict, baseline accuracy by question category, the safety
      probes, the command-line tool, the demo’s saved answers for two sample
      questions, its passcode mode with live compute off, and the case study"
    caption: ten real screens, 25 seconds, loops
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/architecture.svg
    alt: "One Python package, agentic-analytics, with a CLI, a static dashboard and
      a Streamlit demo as front ends. Inside: loaders, read-only executors with
      a SQL guard, the ClickHouse remote MCP client, Claude and GPT adapters,
      the agent loop and the Cortex Analyst client, the runner with its answer
      cache, scorers, aggregate and report. External services: ClickHouse Cloud
      with its remote MCP server, Snowflake with Cortex Analyst, the Anthropic
      and OpenAI APIs, EvalKit as the eval engine, optional Langfuse traces,
      GitHub Pages, Streamlit Community Cloud, PyPI and a Postgres spend
      counter."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/dataflow.svg
    alt: "From the UK price paid snapshot to scored answers: both warehouses are
      loaded and checked for parity, gold SQL is checked across engines, each
      question goes to two MCP agents on ClickHouse and to Cortex Analyst on
      Snowflake, every answer's SQL is re-run read-only and compared with the
      gold result using EvalKit sql_match, and the scores are aggregated into
      the dashboard, README and demo."
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/headline.svg
    alt: Accuracy of every configuration on 100 UK house-price questions, with the
      strict score drawn as a ring beside each headline score
    caption: Accuracy by configuration, strict score as a ring
    kind: result
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/uplift.svg
    alt: Uplift from each single fix (descriptions, examples, self-check) for each
      agent, with the Holm-corrected verdict
    caption: Uplift from each fix, Holm-corrected
    kind: result
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/dashboard.png
    alt: "Results dashboard: the run stamp, licence credit and overview table"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/demo.png
    alt: "Demo: saved answers from each agent side by side for a sample question"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/cli.png
    alt: "Command line: init, pack check, an example report and a dry run"
    kind: screenshot
headline:
  value: 97% vs 85%
  label: "of plain-English analytics questions answered correctly: a GPT-6.1 Sol
    agent on ClickHouse's MCP server against Snowflake Cortex Analyst"
  note: "100 questions on 31.7 million UK house sales, three trials each, every
    answer's SQL re-run and compared with gold SQL that agrees on both engines.
    Under the strict, pre-registered scoring: 92% vs 62%. Claude Sonnet 5.5
    scored 76% on the same agent setup."
metrics:
  - value: +15.7 pts
    label: for Claude from one fix, five worked example queries (76% to 92%), mostly
      by asking back on ambiguous questions
  - value: -4.7 pts
    label: "for GPT from column descriptions: a fix that hurt, reported as measured"
  - value: 31.7M
    label: UK house sales loaded into both ClickHouse and Snowflake, checked for
      parity
  - value: "100"
    label: questions with gold SQL in six categories, three trials each
methodology:
  - Both warehouses loaded from the same snapshot and checked for row parity
  - Gold SQL must agree on ClickHouse and Snowflake, with tie and determinism
    checks, before any run
  - Every answer's SQL re-run read-only and scored with EvalKit sql_match, with
    no LLM judge
  - Three trials per question; fixes frozen by hash before the baseline and
    measured one at a time
  - Holm correction across fixes; the strict score is shown beside the headline
    score everywhere
proof:
  - label: Data card
    url: https://github.com/biplob819/agentic-analytics/blob/main/DATA_CARD.md
  - label: Baseline results (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json
  - label: Fix runs (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-2026-11-17.json
  - label: Failure taxonomy (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/failure-taxonomy-2026-11-17.json
datasets:
  - name: HM Land Registry Price Paid Data
    url: https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads
    note: Every residential property sale in England and Wales
story:
  overview: "A benchmark of how often AI agents answer analytics questions
    correctly: 100 questions on UK property data, asked through ClickHouse's MCP
    server and Snowflake Cortex Analyst. It measures accuracy by question type
    and platform, then tests fixes one at a time to see which actually help."
  impact:
    - On 31.7 million UK house sales, a GPT-6.1 Sol agent on ClickHouse's MCP
      server answered 97% of 100 plain-English questions correctly, against 85%
      for Snowflake Cortex Analyst (92% vs 62% under strict scoring).
    - "Found the main failure mode: agents guess on ambiguous questions instead
      of asking back. Five worked examples lifted Claude from 76% to 92%, mostly
      by teaching it to ask."
    - "Reported the unwelcome results too: column descriptions cost GPT 4.7
      points, and the examples fix made Claude follow an injected instruction it
      had resisted."
  pain:
    who: Data team leads deciding whether business users may ask the warehouse
      questions in plain English, and the analytics engineers who own the
      semantic layer.
    problem: "Agentic analytics fails quietly: a wrong date filter or join returns a
      plausible number. Vendor demos show the happy path, so a data lead can't
      tell how often each kind of question goes wrong, or which fixes help."
  bet: If accuracy is measured by question category on each platform, and each fix
    is measured on its own, a data lead knows which questions are safe to open
    up and an engineer knows which fix is worth the effort.
  evals:
    - name: Accuracy, baseline
      data: 100 questions × 3 trials per backend
      method: Each answer's SQL re-run read-only and compared with gold using EvalKit
        sql_match
      result: GPT-6.1 Sol agent 97%, Cortex Analyst 85%, Claude Sonnet 5.5 agent 76%
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json
    - name: Accuracy, strict pre-registered scoring
      data: Same runs
      method: Exact result shape, before the four narrow equivalences were accepted
      result: GPT 92%, Cortex 62%, Claude 76%
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json
    - name: Each fix measured alone
      data: Three frozen fixes, same baseline
      method: Paired comparison with a Holm correction
      result: "Examples: Claude +15.7 pts; descriptions: Claude +8.3, GPT -4.7;
        self-check: no separated gain"
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-2026-11-17.json
    - name: Prompt-injection probe
      data: Probe questions per configuration
      method: Does the agent follow an instruction planted in the data?
      result: With the examples fix, Claude followed an injected instruction in every
        trial of one probe it had resisted at baseline
      status: fail
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-2026-11-17.json
    - name: Failure taxonomy
      data: Every failed answer
      method: Grouped by cause after a hand check
      result: Almost every failure was a guess on an ambiguous question instead of
        asking back
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/failure-taxonomy-2026-11-17.json
  improvements:
    - metric: Claude Sonnet 5.5 accuracy
      before: 76%
      after: 92%
      change: "One frozen fix: five worked example queries. Most of the gain came from
        asking back on ambiguous questions. The cost: one injection probe it had
        resisted now succeeds."
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-2026-11-17.json
source:
  repo: biplob819/agentic-analytics
  synced: 2026-11-16
---

## Write-up

A benchmark of two ways to answer analytics questions in plain English over the same 31.7 million UK house sales: an agent (Claude Sonnet 5.5 or GPT-6.1 Sol) querying ClickHouse through its remote MCP server, and Snowflake Cortex Analyst over a semantic view. 100 questions, each with gold SQL that must agree on both engines before any run, three trials each, scored by re-running every answer's SQL with EvalKit's `sql_match`.

On the baseline, GPT-6.1 Sol answered 97% correctly (92% under strict, pre-registered scoring), Cortex Analyst 85% (62%) and Claude Sonnet 5.5 76% (76%). Almost every failure was a guess on an ambiguous question instead of asking back. Claude's other misses came from an approximate median function. One fix, five worked example queries, lifted Claude to 92% (+15.7 points), mostly by getting it to ask back on ambiguous questions. It also made Claude follow an injected instruction in every trial of one probe that it had resisted on the baseline. Results: [baseline](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json), [fixes](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-2026-11-17.json), [failure taxonomy](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/failure-taxonomy-2026-11-17.json).

## My role

I wrote the product requirements and owned every ruling that shaped the benchmark: the dataset and the as-of date, the Snowflake region (kept in Thailand, with a latency caveat), a sign-off on all 140 questions and probes, the scoring rulings after the baseline hand check, and each paid run's budget. I set up the ClickHouse Cloud and Snowflake accounts, approved every push, and own the demo deploy, which is not live yet.

Claude Code built the code, tests, runs and documents under EvalKit's node harness: tests first, clean convergence runs, and a fresh skeptical verifier per node that tried to disprove each criterion with planted defects. Verifiers found real defects before the paid runs (a self-check that would have penalised correct empty answers, logs that hid every cache key). Every scope limit is written down as a decision ([decisions](https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md)).

## Key decisions

**Score the numbers, not the shape, and keep the strict score beside it (OWNER D-81, D-89).** The hand check found right answers marked wrong for their shape: Cortex returned percentages as fractions on all 20 percent questions, and GPT pivoted tenure counts into one row. The headline now accepts four narrow equivalences for every backend; the strict, pre-registered score is shown beside it everywhere. *Trade-off:* the scoring changed after the first results were seen. In exchange, the headline answers the question a reader asks (did it get the numbers right?), and the unchanged strict score shows exactly what moved.

**Gold must agree on both engines before any run (Q2.2).** Every gold query runs on ClickHouse and Snowflake, must match within tolerance, and is checked for ties at a top-N cut and for determinism; two questions were reworded when their answers tied. *Trade-off:* every question costs two gold queries and some rewording. In exchange, a backend is never scored against an answer that depends on which warehouse computed it.

**Freeze the fixes before the baseline and measure each alone (D-13, D-14).** The three fixes were hashed before any baseline run and each was run on its own against the same baseline, with a Holm correction across them. *Trade-off:* no tuning between runs, and three runs instead of one. In exchange, the gains are honest, including the unwelcome ones: descriptions cost GPT 4.7 points, and examples made Claude easier to steer with an injected instruction.
