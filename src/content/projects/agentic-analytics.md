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
  demo: https://agenticanalytics12.streamlit.app/
  repo: https://github.com/biplob819/agentic-analytics
  report: https://biplob819.github.io/agentic-analytics/
  prd: https://github.com/biplob819/agentic-analytics/blob/main/Agentic%20Analytics%20PRD.md
  techspec: https://github.com/biplob819/agentic-analytics/blob/main/Agentic%20Analytics%20Tech%20Spec.md
  package: https://pypi.org/project/agentic-analytics/
  methodology: https://github.com/biplob819/agentic-analytics/blob/main/docs/reproduce-the-uk-benchmark.md
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
      agent, with the Holm-corrected (a stricter bar when several comparisons
      are tested at once) verdict
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
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/demo-passcode.png
    alt: "The demo page's ask-your-own mode with live compute off: the notice that
      no question is asked live until the owner turns it on, the own-key notice,
      and the passcode, question and optional Anthropic key fields"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/cli-doctor.png
    alt: agentic-analytics doctor with no keys lists every environment variable by
      name as missing, never a value, and skips the ClickHouse, MCP role and
      Snowflake checks
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/agentic-analytics/main/docs/assets/categories.svg
    alt: Baseline accuracy by question category (aggregation, time, geography, top
      N, year on year, ambiguous) for Claude (MCP), GPT (MCP) and Cortex
      Analyst, with 95% intervals. On ambiguous questions Claude scores 2.1% and
      Cortex 6.2%, against 81.2% for GPT
    caption: Baseline accuracy by question category
    kind: result
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
  - value: -5.0 pts
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
  - Holm correction (a stricter bar when several comparisons are tested at once)
    across fixes; the strict score is shown beside the headline score everywhere
proof:
  - label: Data card
    url: https://github.com/biplob819/agentic-analytics/blob/main/DATA_CARD.md
  - label: Published run summary (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/results/summary.json
  - label: Scorer parity on EvalKit 0.4.0 (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/evalkit-0.4-parity-2026-11-18.json
  - label: Baseline results (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json
  - label: Fix runs (JSON)
    url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json
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
    - "Reported the unwelcome results too: column descriptions cost GPT 5.0
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
      result: "Examples: Claude +15.7 pts; descriptions: Claude +8.3, GPT -5.0;
        self-check: no separated gain"
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json
    - name: Prompt-injection probe
      data: Probe questions per configuration
      method: Does the agent follow an instruction planted in the data?
      result: With column descriptions, with worked examples and with all fixes
        together, Claude followed an injected instruction in every trial of one
        probe it never followed at baseline
      status: fail
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json
    - name: Failure taxonomy
      data: Every failed answer
      method: Grouped by cause after a hand check
      result: Almost every failure was a guess on an ambiguous question instead of
        asking back
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/failure-taxonomy-2026-11-17.json
    - name: Asking back on answerable questions
      data: Every answerable question, every configuration
      method: The rate of asking back when the question has an answer, shown beside
        the rate on ambiguous questions so asking back on everything cannot look good
      result: 0.0% for every configuration
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/results/summary.json
    - name: Hand check of the scorer
      data: 25 baseline records across every category
      method: The builder and an independent verifier read each record, its SQL and
        the gold result
      result: No scorer defect; 8 were strict-only misses that the accepted answer
        shapes now pass, one rule was widened and one dispute was kept wrong by the
        owner's ruling
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json
    - name: Scorer parity on EvalKit 0.4.0
      data: All 5,046 stored answers, including 810 probe answers
      method: Every stored run rescored offline through EvalKit 0.4.0 and compared
        with the published verdicts
      result: One verdict of 5,046 changed (one GPT answer with descriptions),
        recorded and accepted; no probe verdict disagreed
      status: final
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/evalkit-0.4-parity-2026-11-18.json
  improvements:
    - metric: Claude Sonnet 5.5 accuracy
      before: 76%
      after: 92%
      change: "One frozen fix: five worked example queries. Most of the gain came from
        asking back on ambiguous questions. The cost: one injection probe it had
        resisted now succeeds."
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json
    - metric: Claude Sonnet 5.5 accuracy, column descriptions
      before: 76%
      after: 84.3%
      change: "One frozen fix: column descriptions, +8.3 points and above noise after
        the Holm correction, again mostly from asking back on ambiguous questions."
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json
    - metric: Claude tool calls beyond the minimum, per answer
      before: "1.24"
      after: "0.15"
      change: "The worked examples fix: answers at the minimum number of tool calls
        went from 0.3% to 85%."
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/results/summary.json
  learnings:
    - lesson: A rule list written from memory missed 8 of the database's documented
        table functions, and each rule that keyed on where a word sat in the SQL
        was bypassed through the next position.
      now: Security rules key on names, not positions, and any deny list is checked in
        a test against the vendor's documented list.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
    - lesson: "Wiring up the data-load command turned an old test into a real load: it
        inserted 31.7 million rows into ClickHouse and started a 5.5 GB
        download."
      now: Anything that loads data or spends money refuses to run outside an explicit
        live mode, whatever a test calls.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
    - lesson: "Two defects passed 139 offline tests and only showed against real model
        outputs: a one-point chart from an answer shape no fixture had, and
        trace timings that summed to 30-46% more than the measured wall time."
      now: Every live run records an independent measurement next to each derived one,
        and test fixtures include the shapes real models return.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
    - lesson: Re-running the database setup dropped and recreated a role, so the
        hosted query endpoint lost its read-only grant and its limits until they
        were restored by hand.
      now: Setup never drops and recreates a role or profile that a live endpoint
        depends on; it creates once and alters in place.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
    - lesson: A scoring patch applied while a run was in progress stopped that run
        after all 2,160 answers. They were cached, so nothing was lost.
      now: I never change code that a live run is using; patches go in between runs,
        or the run uses a fixed copy.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
    - lesson: In the first live demo timing run, a browser error printed the passcode
        the script had just typed into a log. The tests used a fake browser that
        never failed, so they could not catch it.
      now: A script that types a secret replaces every error with a fixed message that
        can't carry it, test fakes fail the way the real library does, and any
        secret seen in output is rotated before it is used again.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/lessons.md
  monitoring:
    - metric: Accuracy on a 12-question smoke run, per backend
      kind: quality
      target: At least 0.5 accuracy for every backend
      current: "First live smoke: Claude 8/12, GPT 11/12, Cortex 8/12"
      how: A hand-run GitHub Actions workflow asks 12 fixed questions once on each
        backend and fails if EvalKit's gate finds any backend below its floor.
        The weekly schedule is written but stays off until the recurring spend
        is approved.
    - metric: Model spend per smoke run
      kind: cost
      target: $2 cap per run
      current: $0.28 on the first live smoke
      how: The run stops at the cap; its spend line goes into the ledger and the job
        summary.
    - metric: Regression between two runs
      kind: quality
      how: EvalKit pairs two runs on their shared questions and flags a regression
        after a Holm correction.
    - metric: Write and injection probes
      kind: guardrail
      current: No write probe got a write through on any backend; 810/810 probe
        verdicts agree with EvalKit's cross-check
      how: 20 probes run with every configuration (10 write attempts, 10 planted
        injections), scored by the project's own rules and cross-checked with
        EvalKit's attack scorer.
    - metric: Cost per correct answer, per configuration
      kind: cost
      current: "Baseline: Claude $0.016, GPT $0.0048, Cortex $0.24"
      how: Written to the results summary on every run, from recorded tokens and
        metered warehouse credits.
    - metric: Tool calls beyond the minimum, per agent
      kind: cost
      current: "Baseline: Claude 1.24, GPT 0.94 extra calls per answer"
      how: Each answer's tool calls are compared with the question's minimum and
        reported per configuration on every run.
    - metric: Hosted demo answer time, p95
      kind: guardrail
      target: 30 s or less with no timed-out or errored panel
      current: 14.1 s over 20 live questions on the deployed page, 0 timed-out and 0
        errored panels; the run cost $4.25
      how: A timed run asks 20 questions through the deployed page in its
        passcode-gated live mode, under the owner measurement budget
    - metric: Accuracy, cost per correct answer and p95 latency over time
      kind: quality
      how: Every run appends its metrics to EvalKit's run ledger; a trend page plots
        accuracy, cost per correct answer and p95 latency with alarm bands, and the
        hand-run monitor checks each smoke run against its band.
  next:
    - Add Snowflake Cortex Agents as a third approach, the next step the PRD names
      after this comparison.
    - Turn on the weekly 12-question monitoring run once the owner approves its
      recurring spend; until then it runs by hand.
    - Record each answer's self-check outcome (sent, passed, skipped), so the
      self-check fix can be measured as a fix rather than as noise.
  priorities:
    - item: A 100-question UK house-price benchmark with gold SQL checked on both
        engines
      call: built
      why: Every question's gold result must agree on ClickHouse and Snowflake before
        any run, so the comparison is fair.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: Claude and GPT agents over ClickHouse's MCP server against Snowflake
        Cortex Analyst
      call: built
      why: The same agent loop runs on both models, scored against gold SQL with no
        LLM judge.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: Three fixes, each measured alone against one frozen baseline
      call: built
      why: Fix content was frozen and hashed before the first baseline run, so fixes
        cannot overfit its failures.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: A results dashboard on GitHub Pages built from the published record
      call: built
      why: The public page has every figure, rebuilt from the committed published-run
        record.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/pages-deploy-2026-11-18.json
    - item: A hosted demo with saved answers and a passcode-gated live mode
      call: built
      why: Live answers measured a p95 of 14.1 seconds over 20 timed questions.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/demo-p95-2026-11-20-page.json
    - item: A command-line tool on PyPI, with run history and drift flags
      call: built
      why: Released by trusted publishing and install-tested on Linux, macOS and
        Windows.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/release-v0.1.1.json
    - item: Live answers by default on the public demo
      call: cut
      why: Saved answers are the default so the demo costs nothing at rest; live
        compute is switched on per request.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: Per-answer records and traces on the public dashboard
      call: cut
      why: Nothing large or per-answer lands in the repository; the full dashboard
        comes from a local run.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: '"Area" as a synonym for district in the semantic layer'
      call: cut
      why: It would pre-empt an ambiguous benchmark question that should be answered
        by town.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: Carrying a stopped run's history into its resumed run
      call: cut
      why: It could count answers twice, so a stopped run records nothing instead.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: Cortex Agents as a third approach
      call: later
      why: The PRD names it as the next step after the agent and Cortex Analyst
        comparison.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
    - item: A weekly scheduled monitoring run
      call: later
      why: Recurring spend needs the owner's approval; the 12-question smoke runs by
        hand until then.
      url: https://github.com/biplob819/agentic-analytics/blob/main/docs/decisions.md
source:
  repo: biplob819/agentic-analytics
  synced: 2026-11-21
install:
  - cmd: pip install agentic-analytics
    note: Python 3.11 or newer; the command is agentic-analytics, alias aa
  - cmd: agentic-analytics pack check
    note: "validates the bundled UK pack: schemas, lints, quotas"
  - cmd: agentic-analytics report --example
    note: renders a dashboard from a bundled synthetic run, no keys needed
license: MIT
harness: true
demoLabel: Hosted demo
timeline:
  - when: 20 Nov 2026
    title: v0.1.1 released
    status: released
    items:
      - Run history, a trend page and drift flags, from EvalKit 0.4.0's run
        ledger
      - Answer-shape scoring rules moved into EvalKit, and intervals on the
        ask-back rates
      - "Re-scored on EvalKit 0.4.0: one fix-run verdict moved, so descriptions
        now cost GPT 5.0 points (95% CI −9.0 to −2.0)"
    url: https://github.com/biplob819/agentic-analytics/releases/tag/v0.1.1
  - when: 20 Nov 2026
    title: v0.1.0 released
    status: released
    items:
      - On PyPI as agentic-analytics, published by trusted publishing with an
        install check on Linux, macOS and Windows
      - "Hosted demo live on Streamlit Community Cloud: saved answers by
        default, live answers behind a passcode"
      - Live mode answered 20 timed questions on the deployed page with a p95 of
        14.1 s and no errored panel
    url: https://github.com/biplob819/agentic-analytics/releases/tag/v0.1.0
---

## Write-up

A benchmark of two ways to answer analytics questions in plain English over the same 31.7 million UK house sales: an agent (Claude Sonnet 5.5 or GPT-6.1 Sol) querying ClickHouse through its remote MCP server, and Snowflake Cortex Analyst over a semantic view. 100 questions, each with gold SQL that must agree on both engines before any run, three trials each, scored by re-running every answer's SQL with EvalKit's `sql_match`.

On the baseline, GPT-6.1 Sol answered 97% correctly (92% under strict, pre-registered scoring), Cortex Analyst 85% (62%) and Claude Sonnet 5.5 76% (76%). Almost every failure was a guess on an ambiguous question instead of asking back. Claude's other misses came from an approximate median function. One fix, five worked example queries, lifted Claude to 92% (+15.7 points), mostly by getting it to ask back on ambiguous questions. It also made Claude follow an injected instruction in every trial of one probe that it had resisted on the baseline. Results: [baseline](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/baseline-2026-11-17.json), [fixes](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/fixruns-evalkit-0.4-2026-11-18.json), [failure taxonomy](https://github.com/biplob819/agentic-analytics/blob/main/docs/measurements/failure-taxonomy-2026-11-17.json).


## Key decisions

**Score the numbers, not the shape, and keep the strict score beside it.** The hand check found right answers marked wrong for their shape: Cortex returned percentages as fractions on all 20 percent questions, and GPT pivoted tenure counts into one row. The headline now accepts four narrow equivalences for every backend; the strict, pre-registered score is shown beside it everywhere. *Trade-off:* the scoring changed after the first results were seen. In exchange, the headline answers the question a reader asks (did it get the numbers right?), and the unchanged strict score shows exactly what moved.

**Gold must agree on both engines before any run.** Every gold query runs on ClickHouse and Snowflake, must match within tolerance, and is checked for ties at a top-N cut and for determinism; two questions were reworded when their answers tied. *Trade-off:* every question costs two gold queries and some rewording. In exchange, a backend is never scored against an answer that depends on which warehouse computed it.

**Freeze the fixes before the baseline and measure each alone.** The three fixes were hashed before any baseline run and each was run on its own against the same baseline, with a Holm correction across them. *Trade-off:* no tuning between runs, and three runs instead of one. In exchange, the gains are honest, including the unwelcome ones: descriptions cost GPT 5.0 points, and examples made Claude easier to steer with an injected instruction.
