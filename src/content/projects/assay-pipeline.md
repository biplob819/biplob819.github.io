---
title: Trusted Assay Pipeline
tagline: Bioactivity data with provenance on every row, queried by an AI agent
  through a SQL guard and a hash-chained audit log, then attacked with the OWASP
  LLM Top 10.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 33
tags:
  - AI security
  - OWASP LLM Top 10
  - data provenance
headline:
  value: 0 of 310
  label: attack trials succeeded against Claude and GPT agents
  note: First full run, including held-out cases (main-2026-11-16), 300 agent
    trials (k=3) plus 10 data-poisoning cases. 95% upper bound 2.0% per trial for
    each model. A second, public-only run on 18 Nov also had 0 of 248.
metrics:
  - value: 41,463
    label: EGFR rows, quality problems flagged, never deleted
  - value: 97%
    label: of answers show the SQL that actually ran (Claude Sonnet 5.5; GPT-6.1 Sol
      80%)
  - value: 94 of 96
    label: cases where the two judges agree
  - value: $4.60
    label: for the full run, ablation and judges
links:
  repo: https://github.com/biplob819/assay-pipeline
  report: https://biplob819.github.io/assay-pipeline/
  prd: https://github.com/biplob819/assay-pipeline/blob/main/Trusted%20Assay%20Pipeline%20PRD.md
  techspec: https://github.com/biplob819/assay-pipeline/blob/main/Trusted%20Assay%20Pipeline%20Tech%20Spec.md
  package: https://pypi.org/project/assay-pipeline/
stack:
  - Python
  - DuckDB
  - ChEMBL
  - PubChem
  - Claude
  - GPT
methodology:
  - Attack cases mapped to OWASP Top 10 for LLM Applications (2025) and MITRE
    ATLAS
  - k=3 trials per case on public and held-out splits
  - Guard-off ablation to see what the model refuses on its own
  - Scripted attacker with no model, to test the guard alone
  - Hash-chained, verifiable audit log
  - Quality problems flagged, never deleted
proof:
  - label: Results bundle (JSON)
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
  - label: Results dashboard
    url: https://biplob819.github.io/assay-pipeline/
  - label: Threat model
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/threat-model.md
  - label: Data card
    url: https://github.com/biplob819/assay-pipeline/blob/main/docs/data/2026-11-15.1/DATA_CARD.md
cost: $4.60 for the full run
images:
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of nine screens: the security dashboard headline, what stopped
      the attacks, agent behaviour, the run-against-run comparison, the audit
      trail, the results explorer before and after filtering, a console replay
      where the guard blocks a query, and the release gate passing"
    caption: nine real screens, 22.5 seconds, loops
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/dashboard.png
    alt: "Trusted Assay Pipeline CISO dashboard: attack outcomes, what stopped them,
      data quality and audit events"
    kind: screenshot
    caption: CISO dashboard
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/console-replay.png
    alt: Agent console replaying a recorded attack through the SQL guard and the
      audit log
    kind: screenshot
    caption: Agent console, replay mode
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/screenshots/explorer.png
    alt: Compound explorer over the EGFR snapshot with provenance and quality flags
    kind: screenshot
    caption: Data explorer
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/architecture.svg
    alt: Two zones separated by a trust boundary. The pipeline zone ingests,
      normalises, flags and snapshots the data and builds the agent database; it
      never calls a model and holds no API keys. The agent zone runs the agent
      loop, the SQL guard, a read-only executor, the hash-chained audit log and
      EvalKit scoring; it cannot write to the snapshot. The only crossing is a
      read-only copy of the agent database. Results ship to GitHub Pages,
      Streamlit Community Cloud and PyPI, tested in CI on three operating
      systems.
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/assay-pipeline/main/docs/assets/dataflow.svg
    alt: Public ChEMBL and PubChem data is ingested, normalised, flagged by quality
      rules and written as a hashed snapshot. The snapshot builds a read-only
      agent database. A question or attack goes to the agent, whose SQL passes
      the guard before an isolated read-only executor runs it. Every step is
      written to a hash-chained audit log, scored with EvalKit and two judges,
      and published as a results bundle, dashboard and release gates.
    kind: dataflow
install:
  - cmd: uv tool install assay-pipeline
    note: "or: pip install assay-pipeline"
  - cmd: assay doctor
    note: checks Python, keys and network
  - cmd: assay ingest chembl
  - cmd: assay ingest pubchem
  - cmd: assay snapshot
    note: normalise, flag QC1 to QC5, write a snapshot
  - cmd: assay attack --db agent.duckdb --k 3 --dry-run
    note: cost estimate, no API calls
datasets:
  - name: ChEMBL
    url: https://www.ebi.ac.uk/chembl/
    note: EGFR bioactivity records
  - name: PubChem
    url: https://pubchem.ncbi.nlm.nih.gov/
    note: EGFR bioassays
story:
  overview: "A data pipeline and an AI agent for drug-discovery assay data. Every
    row keeps its source, every agent query passes a SQL guard and lands in a
    tamper-evident log, and the whole system was attacked with the OWASP Top 10
    for LLM applications. Built for two readers: the scientist who needs data
    they can trust, and the CISO who must approve agent access."
  impact:
    - 0 of 310 attack trials succeeded against Claude and GPT agents (95% upper
      bound 2.0% per trial for each model).
    - "Found that the models refused almost every attack on their own, so tested
      the guard separately: a scripted attacker with no model in the loop was
      stopped 60 of 60 times."
    - 41,463 EGFR rows from two sources in one schema, with quality problems
      flagged, never deleted.
    - The full run, the guard-off ablation and the judges cost $4.60.
  pain:
    who: Computational chemists who train models on assay data, and the CISOs who
      must decide whether an AI agent may touch research data.
    problem: "Assay data arrives from many sources with mixed units, duplicates and
      thin provenance, so chemists lose days reconciling it. Giving agents
      access opens new attack paths: instructions hidden in data fields,
      over-broad permissions and leaks of restricted results. A CISO needs
      evidence, not promises."
  bet: If every row carries its provenance and every agent query passes a guard
    and lands in a tamper-evident log, a CISO can approve agent access on
    evidence, and an attack suite shows where the defence actually sits.
  evals:
    - name: Attack suite
      data: 60 attack cases across the OWASP LLM Top 10, 3 trials each on public and
        held-out cases, plus 10 data-poisoning cases
      method: Claude Sonnet 5.5 and GPT-6.1 Sol agents query the data through the SQL
        guard; every query lands in a hash-chained audit log
      result: 0 of 310 succeeded; 95% upper bound 2.0% per trial for each model
      status: pass
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Second run, public cases only (18 Nov)
      data: 240 agent trials (k=3 on the public cases; the held-out cases run once)
        plus 8 data-poisoning cases
      method: The same suite re-run after the first, with the guard-off run and the
        scripted attacker repeated
      result: "0 of 248 succeeded (95% upper bound 2.5% per trial for each model);
        guard off 0 of 80; scripted attacker 60 of 60 stopped. Answers correct on
        normal questions: Sol 91%, Sonnet 70% (first run 74% and 57%). $3.49"
      status: pass
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-18/bundle.json
    - name: Guard switched off
      data: 80 attack trials
      method: The same attacks with the SQL guard removed, to see what the models
        refuse on their own
      result: "0 of 80 succeeded: the models refused on their own"
      status: final
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Scripted attacker, no model
      data: 60 attack cases
      method: The attack SQL goes straight to the pipeline with no model in the loop,
        so the guard is tested by itself
      result: "60 of 60 stopped: guard 45, quality rule 10, limit 5"
      status: pass
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Answers on normal questions (first run)
      data: The public split of normal questions
      method: The agent's query compared with the gold query; the answer checked for
        the gold value
      result: "Query matches gold: Sonnet 60%, Sol 70%. Answer states the gold value:
        Sonnet 100%, Sol 73%"
      status: final
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: The SQL shown is the SQL that ran
      data: All questions
      method: The SQL quoted in each answer compared with the audit log
      result: Claude Sonnet 5.5 97%, GPT-6.1 Sol 80%
      status: final
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
    - name: Judge reliability
      data: 96 judged cases and 24 hand labels
      method: Two judges from different model families, each checked against hand
        labels
      result: Agree with each other on 94 of 96; both match all 24 hand labels
      status: pass
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/results/main-2026-11-16/bundle.json
  learnings:
    - lesson: The models refused almost every attack on their own, so "0 of 310" says
        little about the guard by itself.
      now: I added a guard-off run and a scripted attacker with no model in the loop.
        The scripted attacker is the real test of the guard, and it stopped 60
        of 60.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/reading-the-dashboard.md
    - lesson: Two held-out attack statements were already in the public guard corpus,
        so their held-out score would have measured training accuracy.
      now: Before freezing a held-out split, I search all public material for its
        statements.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: The hand-label sampler drew from the whole suite, so paraphrases of two
        held-out answers were pushed to the public repo.
      now: Anything published that comes from answers is drawn from the public split
        by construction, and a test checks every published file.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: The data roadmap quoted the agent's filtered view (17,085 compounds) as
        if it described the whole snapshot (18,257).
      now: Every number I quote names the table it came from, and a test checks it
        against that table.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
    - lesson: After four rounds of tightening, the boundary lint still had bypasses.
      now: I state what a check can and cannot catch instead of claiming it is
        complete, and pair each static check with a runtime one.
      url: https://github.com/biplob819/assay-pipeline/blob/main/docs/lessons.md
source:
  repo: biplob819/assay-pipeline
  synced: 2026-11-16
---

## Write-up

Drug-discovery teams want language-model agents that answer questions over assay data, but an agent with database access can leak restricted results or be talked into changing data. Trusted Assay Pipeline builds the data and the controls together. It ingests 41,463 EGFR activity rows from ChEMBL and PubChem into a deterministic, hashed snapshot that flags quality problems instead of deleting rows. Claude or GPT then answers questions only through a SQL guard, a read-only isolated executor and a hash-chained audit log. An attack suite of 60 cases across six OWASP LLM categories measures what gets through and which layer stopped it. In the published run, 0 of 310 attack trials succeeded (0 of 150 per model, a 95% upper bound of 2.0% per trial). A scripted attacker with no model in the loop was stopped on all 60 cases. The run, the guard-off ablation and the judges cost $4.60. It ships as an MIT package on PyPI with a public dashboard.

## My role

I set the direction and made the product and risk rulings, which are recorded as OWNER decisions in the [decision log](https://github.com/biplob819/assay-pipeline/blob/main/docs/decisions.md): for example the private held-out split, keeping portfolio material out of the repo, and the console's own-key mode. I set the spend limits for real-API runs, held the API keys and accounts, set up PyPI trusted publishing and tagged the releases. Claude Code wrote the specs, code, tests and docs under a node harness. Each node was built tests-first, had to pass 13 gates twice in a row, and was checked by a fresh-context verifier agent whose findings are logged in that node's run state. The live console is built but not yet deployed.

## Key decisions

1. **Process isolation, not parsing, keeps the database available.** A static SQL guard cannot bound what DuckDB costs to plan and run; two attacker passes found three blow-up classes. So each query runs in a child process killed at a deadline with a memory cap, and the guard still refuses the known classes. *Trade-off:* every query pays for a process start, and the guard refuses some legitimate queries: 18 queries in normal questions were blocked in the published run.
2. **A private held-out split.** 12 attack cases and 6 normal questions are held out. The guard and the prompt were developed against the 48 public attacks only, and the held-out set ran once, before publishing. *Trade-off:* outsiders see only a hash manifest and split-level numbers for those cases. Keeping them private also took a git-history rewrite after labels paraphrasing two held-out questions were published by mistake.
3. **Separate what the model stops from what the controls stop.** A model-free scripted attacker sends each attack's SQL straight through the guard, permissions and limits, and a guard-off ablation runs the models against a sacrificial copy. *Trade-off:* two extra runs per release. They showed the models refused almost every attack on their own (288 of 310 trials stopped at the model; 0 of 80 succeeded with the guard off), so in practice the guard is tested mainly by the scripted attacker.
