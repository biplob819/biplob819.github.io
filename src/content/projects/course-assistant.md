---
title: AI Teaching Assistant
tagline: A course assistant that answers only from approved session materials,
  cites every slide and hands everything else to the teaching team.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 37
tags:
  - RAG
  - education
  - guardrails
stack:
  - Python
  - OpenAI Responses API with file search
  - Streamlit
  - EvalKit
links:
  repo: https://github.com/biplob819/course-assistant
  demo: https://course-assistant-demo1.streamlit.app/
  prd: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20PRD.md
  techspec: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20Tech%20Spec.md
  package: https://pypi.org/project/course-assistant/
images:
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of ten screens: the learner page passcode gate, the privacy
      notice and consent, an answer from the course materials with its source
      while a pasted injection is ignored, graded work answered with a hint
      instead of the work, a not-covered question answered with a fixed message,
      an admin question sent to the teaching team, the teaching team’s pause
      switches, the command-line tool, the release gate failing on the held-out
      set, and the architecture"
    caption: ten real screens from recorded answers, 25 seconds, loops
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/screenshots/learner-answer.png
    alt: "Learner page: an answer from the course materials with its source open"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/screenshots/learner-hint.png
    alt: "Learner page: a hint and the sessions to revisit"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/screenshots/team-pause-switches.png
    alt: "Teaching-team page: pause switches per session"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/screenshots/team-digest.png
    alt: "Teaching-team page: the weekly digest"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/architecture.svg
    alt: "Four layers: course ingest, the runtime (Streamlit pages, answer pipeline,
      privacy, escalation, digest, store, LLM client), the evaluation stack
      built on EvalKit, and the release and CI layer."
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/course-assistant/main/docs/assets/dataflow.svg
    alt: A learner question passes the passcode gate, then route and answer run in
      parallel; the answer is grounded, integrity-checked and leak-scanned
      before a status is chosen. Not-covered answers can go to the teaching
      team's queue. Consenting learners' questions feed a k-anonymous weekly
      digest.
    kind: dataflow
methodology:
  - "A 455-case golden set on a public sample course, written before any prompt
    tuning: 240 public cases and 215 held-out"
  - Prompts and thresholds tuned on the public cases only (the original 50/50
    split by group, plus 26 identity cases added for tuning); each held-out set
    is scored once, then retired and replaced by a fresh one
  - Groundedness and integrity judged by two models from different vendors in
    the first full run (Claude Opus 5.5 and GPT Sol). While the Anthropic
    account is unfunded, live runs use one judge, GPT Sol, with GPT Terra
    writing the answers so the judge never grades its own work; that loses the
    cross-vendor check, and EvalKit publishes no headline from a single-judge
    run
  - Judges calibrated before the gate can pass, against a blind model panel (two
    OpenAI labellers that are not judges, GPT Terra and GPT Luna, with GPT Terra
    breaking splits); a person's labels can replace the panel's later
  - A release gate with zero tolerance for integrity, injection, leaks and
    identity
proof:
  - label: Latest held-out report
    url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-heldout4-report.md
  - label: First full run report
    url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
  - label: Golden set rules
    url: https://github.com/biplob819/course-assistant/blob/main/golden/README.md
  - label: Held-out manifest (hashes)
    url: https://github.com/biplob819/course-assistant/blob/main/golden/heldout/MANIFEST.json
story:
  overview: A course assistant for an executive programme that answers only from
    approved session materials, cites the slide every time, and hands everything
    else to the teaching team. It gives hints, never answers, on graded work,
    and is scored on a 455-case golden set before launch. The demo runs on a
    public sample course, with no learner data.
  pain:
    who: Working professionals on an executive programme who study around their
      jobs, and the teaching team that supports them.
    problem: Questions come up between live sessions and wait for the forum or the
      next session, and the teaching team answers the same ones more than once.
      A general chatbot would reply at once, but from outside the course,
      sometimes wrongly, and it would write graded work on request.
  bet: An assistant that answers only from approved course material, cites the
    slide every time, hands everything else to a person, and is measured before
    launch can save the teaching team repeat work without risking accuracy or
    academic integrity.
  evals:
    - name: Grounded answer rate
      data: A fresh held-out set of 215 cases, scored once, one GPT Sol judge
      method: Each answer sentence must be supported by a cited slide; target 0.90
      result: "Fails, below target: 0.880 (66 of 75). Earlier held-out sets scored
        0.893 with the same judge and answer model, and 0.813 and 0.693 with a
        different judge and answer model"
      status: fail
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Locator correct
      data: A fresh held-out set of 215 cases, scored once, one GPT Sol judge
      method: The citation points to the right slide or page; target 0.95
      result: "Pass: 0.964 (earlier held-out sets 0.973 and 0.874, first run 0.800)"
      status: pass
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Academic integrity
      data: Graded-work probes in the fresh held-out set
      method: "Zero tolerance: hints only, never a solution"
      result: "Pass: 56 of 56, each verdict the worst of three judge samples, with the
        cached hint still off (first run 52 of 56)"
      status: pass
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Identity
      data: 5 held-out identity probes
      method: Zero tolerance
      result: "Pass: 5 of 5, each verdict the worst of three judge samples (previous
        held-out set 3 of 5)"
      status: pass
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Citation validity, handover, injection, leaks
      data: Fresh held-out set of 215 cases
      method: Citations open the cited slide; out-of-scope goes to the team; zero
        tolerance on injection and leaks
      result: "All pass: citation validity 1.000, handover 1.000, injection 44 of 44,
        leaks 49 of 49"
      status: pass
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Latency and cost
      data: 215 held-out cases
      method: p95 target 11 s
      result: "Fails by 27 ms: p95 11.03 s, measured once the provider of the checking
        model had recovered from an outage. $0.0061 a question; the run cost
        $3.44"
      status: fail
      url: https://github.com/biplob819/course-assistant#measured-results
    - name: Judge calibration
      data: 336 groundedness claims and 100 integrity conversations labelled blind, a
        sample relabelled blind in fresh requests
      method: Held-out agreement (Cohen's kappa, 95% bootstrap interval) with a model
        panel of GPT Terra and GPT Luna, GPT Terra breaking splits; every gate
        verdict names the labeller. Read with care - the integrity intervals are
        wide because the 50 held-out conversations hold very few violations, and
        the labellers share a vendor with GPT Sol and are now also the answer
        model and claim extractor, so labelling and judging are not independent
      result: "Certified 18 Nov 2026. GPT Sol (current judge): groundedness 0.88
        [0.75, 0.97] on 155 claims, integrity 0.79 [0.00, 1.00] on 50
        conversations. Claude Opus 5.5 (first run): 0.68 [0.51, 0.84] and 0.00
        [0.00, 1.00]"
      status: pass
      url: https://github.com/biplob819/course-assistant#evaluation
  improvements:
    - metric: Grounded answer rate, held-out
      before: "0.693"
      after: "0.813"
      change: Citation mapping, paragraph coverage and v2 answer and support rules,
        tuned on the public half only, then scored once on a fresh held-out set.
        On the public half the gain is +0.378 (95% CI +0.257 to +0.514,
        Holm-separated).
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - metric: Locator correct, held-out
      before: "0.800"
      after: "0.874"
      change: Same quality round; scored once on the fresh held-out set.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
    - metric: Grounded answer rate, held-out (second round)
      before: "0.813"
      after: "0.893"
      change: New answer rules rule out uncited "Yes." openers and "the materials do
        not say" remarks, which had failed the support check; tuned on the
        public half (0.959 there), then scored once on another fresh held-out
        set. The judge and answer model also changed, so the comparison is
        indicative only.
      url: https://github.com/biplob819/course-assistant#measured-results
    - metric: Locator correct, held-out (second round)
      before: "0.874"
      after: "0.973"
      change: "Same round and the same caveat: different judge and answer model
        between the two runs."
      url: https://github.com/biplob819/course-assistant#measured-results
    - metric: Identity, held-out
      before: 3 of 5
      after: 5 of 5
      change: Handovers stopped promising a reply on the teaching team's behalf;
        scored once on a fresh held-out set.
      url: https://github.com/biplob819/course-assistant#measured-results
    - metric: Integrity, held-out
      before: 52 of 56
      after: 100%
      change: All four failures came from one cached hint; the hint cache was switched
        off until integrity labels clear it.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-report.md
  learnings:
    - lesson: A call wrapper counted 3 attempts while the model SDK underneath made 9
        requests with its own retries and a 600 s timeout, and test fakes could
        not show it.
      now: The library's own retries are off, each attempt gets the time left, and
        retry counts are tested against the real client.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/lessons.md
    - lesson: "Record keys built from a timestamp plus a row count were reused once
        old data was purged, and \"365 days\" was a day short across a leap
        year."
      now: Keys come from a counter that only goes up, and legal retention periods use
        calendar arithmetic, rounding towards keeping data the full period.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/lessons.md
    - lesson: A guard that reports where it found a secret can leak the secret.
      now: Findings about private terms never echo the term, and withhold the file
        path when the path itself holds it.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/lessons.md
    - lesson: A text guard hardened pass after pass started flagging ordinary prose.
      now: I write the threat model down before hardening a guard, fix what it covers,
        and record the rest as out of scope.
      url: https://github.com/biplob819/course-assistant/blob/main/docs/lessons.md
    - lesson: CI failed on every push for many steps while every local check passed.
      now: "Local checks are not CI: I read the CI result after every push before
        starting the next step."
      url: https://github.com/biplob819/course-assistant/blob/main/docs/lessons.md
  monitoring:
    - metric: Release gate (zero tolerance on integrity, injection, leaks and identity)
      kind: guardrail
      target: Every gate passes on the held-out set before a change goes live
      current: "Fails on the latest held-out run (one GPT Sol judge): grounding 0.880
        and p95 11.03 s miss their targets; integrity 56/56, injection 44/44,
        leak 49/49 and identity 5/5 pass. Both misses are accepted as known
        limits for the first release, with the targets unchanged"
      how: Runs in CI on every change to the course materials or answer rules, and
        weekly, so a failure with no change on our side shows the model provider
        drifted
    - metric: Grounded answer rate
      kind: quality
      target: At least 0.90, lower bound at least 0.85
      current: 0.880 on the latest held-out run (one GPT Sol judge); 0.973 on the
        public half it was tuned on
      how: Release gate metric, scored once per held-out set
    - metric: Answer time, p95
      kind: guardrail
      target: 11 s or less
      current: 11.03 s on the latest held-out run (one GPT Sol judge)
      how: Release gate metric; the teaching team's Ops view also shows it
    - metric: Runtime support check agreement with the judges
      kind: quality
      target: Kappa 0.6 or above; below 0.6 opens a lesson
      current: kappa 0.66 [-0.01, 1.00] over 148 sentences
      how: Reported on each evaluation run; a CI test fails if it drops by more than
        0.05 against a recorded run
    - metric: Monthly spend
      kind: cost
      target: $150 cap, alarm at $135
      current: Modelled pilot month $26.78 at the current setting (1,000 questions
        plus 6 full runs), within the cap
      how: Every model call goes to a spend ledger checked by the cost guard; an
        evaluation run prints its estimate first and stops at its cost cap
    - metric: Questions, status mix, share sent to the teaching team, spend to date
      kind: adoption
      how: Ops tile on the teaching team's page; traces hold ids, statuses, timings
        and costs, never question text
    - metric: Deletion requests completed
      kind: guardrail
      target: No deletion request open longer than 7 days
      how: The purge job fails if a request stays incomplete for more than 7 days
  next:
    - 'A fix for questions that arrive with injected text: the assistant says
      "not found" to the real course question inside them instead of answering
      it'
    - Two judges from different vendors again, with a fresh calibration, once
      the second vendor's account is funded
    - A command to start a new course and one to check a setup
    - "A pilot with one real cohort: its own course materials, teaching-team
      cases in the golden set, a teaching-team relabel of the calibration
      sample, and single sign-on"
    - "During the pilot: weekly gate runs, the deletion purge job running, an
      incident drill, and a pilot report to the programme owners"
source:
  repo: biplob819/course-assistant
  synced: 2026-11-16
datasets:
  - name: Sample course (three sessions of slides, pre-reads and agendas)
    url: https://github.com/biplob819/course-assistant/tree/main/sample_course
    note: Written for this project, no real programme material; CC BY 4.0
  - name: Golden set, public tuning half (214 cases)
    url: https://github.com/biplob819/course-assistant/blob/main/golden/public/cases.jsonl
    note: The held-out half is private; only its ids and hashes are published. CC BY
      4.0
install:
  - cmd: pip install course-assistant
    note: Python 3.11 or newer; add the openai, ingest, app or eval extras as the
      guides say
  - cmd: git clone https://github.com/biplob819/course-assistant && cd
      course-assistant
    note: Python 3.11 or newer; no API key, no network call after install
  - cmd: uv sync --all-extras
  - cmd: uv run course-assistant eval-replay
    note: replays 40 recorded sample-course questions
  - cmd: make eval-offline
    note: the release gate's offline checks
demoLabel: Passkey-protected demo
license: MIT
harness: true
timeline:
  - when: 20 Nov 2026
    title: v0.1.0 released
    status: released
    items:
      - On PyPI as course-assistant, published by trusted publishing
      - Passkey-protected hosted demo live
      - Ships with grounding 0.880 and p95 11.03 s as documented known limits,
        every safety gate passing
    url: https://github.com/biplob819/course-assistant/releases/tag/v0.1.0
---

## Write-up

A teaching assistant for a course: learners ask questions and get answers that cite the slide or page they come from. It hands personal and admin questions to the teaching team, and gives hints, never solutions, on graded work. The hard part was proving it behaves, not building the chat. Every release goes through a gate built on EvalKit. The gate scores 455 golden cases: 240 public cases for tuning and 215 held-out cases scored once. The first full run used judges from two vendors; live runs now use one. It enforces zero tolerance on integrity, leaks, injection and identity, and checks latency and cost.

The first held-out run failed: grounded 0.693 against a 0.90 target. Three tuning rounds followed, each on the public half alone and each scored once on a fresh held-out set. The latest reached grounding 0.880 (0.973 on the public half it was tuned on) and locator accuracy 0.964, and every zero-tolerance gate passed, identity included. The gate still fails: grounding is below target, and the p95 answer time was 11.027 s against 11 s, measured as one model provider recovered from an outage. Integrity went from 0.929 to 1.000. It costs $0.0061 a question. Live runs now use one judge, so EvalKit publishes no headline from them ([report](https://github.com/biplob819/course-assistant/blob/main/docs/measurements/e2.5-heldout4-report.md)).

## My role

I wrote the product requirements and owned every ruling that shaped the system: multi-turn conversations, a passcode on every page, the monthly spend cap, the order in which held-out data may be used, and the restated latency target. I approved each paid evaluation run, chose a model panel to label the calibration sets, and own the live deploy, a passkey-protected demo.

Claude Code built the code, tests, evaluation runs and documents under EvalKit's node harness. Every node needed tests first, two clean convergence runs and a fresh skeptical verifier that tried to disprove each criterion. Nodes went green only when nothing was left to disprove. The release gate took 10 verifier passes and the weekly digest's privacy check took 15. Every scope limit is written down as a decision ([decisions](https://github.com/biplob819/course-assistant/blob/main/docs/decisions.md)).

## Key decisions

**Score the held-out set once, and only after tuning (D-62, D-67, D-71).** The bar is tuned on the public half, and each held-out set is scored exactly once. When improvements were needed, a fresh held-out set was written instead of re-scoring the old one. *Trade-off:* every improvement round costs a new held-out set and another paid run. In exchange, the published held-out number is one nobody tuned against.

**A passcode on every page, even for visitors who bring their own API key (D-45, D-48).** The demo and staff pages each have a numeric passcode, stored only as a salted hash, rate-limited and revocable. Learner and staff codes can never match. *Trade-off:* friction for casual visitors to the open-source demo. In exchange, nobody can drain the spend cap or reach the staff queue anonymously.

**Keep the stronger answer model and restate the latency target to 11 s (D-61, D-65).** No setting met the original 8 s p95. The faster model answered 30 of 74 course questions where the stronger one answered 51. *Trade-off:* answers take about two seconds longer at p95. In exchange, the answers are more often grounded and less often "not covered".
