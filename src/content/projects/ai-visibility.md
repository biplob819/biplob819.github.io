---
title: AI Visibility Report
tagline: Which websites Claude and GPT cite when they answer UK health questions
  with web search, how fresh those pages are, and what a freshness signal would
  be worth.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 32
tags:
  - AI search
  - citations
  - GEO
stack:
  - Python
  - Claude and GPT web search APIs
  - DuckDB
  - httpx
  - EvalKit
links:
  prdOnePage: https://github.com/biplob819/ai-visibility/blob/main/docs/prd-one-page.md
  howBuilt: https://github.com/biplob819/ai-visibility/blob/main/docs/how-i-built-it.md
  report: https://biplob819.github.io/ai-visibility/
  repo: https://github.com/biplob819/ai-visibility
  prd: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20PRD.md
  techspec: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20Tech%20Spec.md
  demo: https://citewatch.streamlit.app
  package: https://pypi.org/project/citewatch/
images:
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of nine screens: the dashboard's findings, who gets cited
      (nhs.uk 83% vs 10%), stale answers, whether the two models cite the same
      sources, how far to trust the numbers, the command-line tool, the demo's
      domain lookup and what could help, and the opening of the post"
    caption: nine real screens, 22.5 seconds, loops
    kind: walkthrough
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/headline.svg
    alt: "Dot-and-interval chart: answers citing nhs.uk, GPT-6.1 Sol 83% (83/100) vs
      Claude Sonnet 5.5 10% (10/100) in run 1 and 84% vs 13% in run 2;
      time-sensitive answers with no dated source under a year old, both runs,
      GPT 43% (49/114) vs Claude 12% (14/114); 95% intervals"
    kind: result
    caption: The headline numbers with their 95% intervals
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/architecture.svg
    alt: The citewatch Python package and CLI talks to the Anthropic and OpenAI APIs
      and fetches cited web pages politely. It keeps run data as JSONL in the
      repository, a temporary page cache outside it, and uses EvalKit for
      support judging. Its outputs are a static dashboard on GitHub Pages,
      domain cards for a Streamlit demo behind passkeys, and a PyPI package, all
      gated by GitHub Actions CI.
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/dataflow.svg
    alt: "Row 1 collects citations: 100 frozen questions are asked of two models
      with web search, answers are stored verbatim and citations extracted. Row
      2 fetches each cited page politely, resolves its date, and computes
      metrics into summary.json, which feeds the dashboard, domain cards and
      post. Two checked samples (support and dates) feed error rates into the
      metrics."
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/dashboard.png
    alt: "citewatch findings dashboard: who gets cited, stale answers and how far to
      trust each number"
    kind: screenshot
    caption: Findings dashboard
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/post.png
    alt: The write-up post on what AI search cites for UK health questions
    kind: screenshot
    caption: The post
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/demo.png
    alt: "The demo looking up nhs.uk: how often the two models cited it in the
      study, how fresh its cited pages were, who was cited instead and what
      could help"
    kind: screenshot
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/signal-spec.png
    alt: One-page spec for a paid freshness and provenance signal
    kind: screenshot
    caption: Signal spec
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/cli.png
    alt: "The citewatch CLI: report, init, doctor and a dry run, with no keys and no
      spend"
    kind: screenshot
    caption: The citewatch CLI
headline:
  value: 43% vs 12%
  label: "of time-sensitive health answers with no source updated in the past
    year: GPT-6.1 Sol against Claude Sonnet 5.5"
  note: "Both runs pooled: 49/114 (95% CI 31% to 55%) vs 14/114 (5.8% to 20%). 100
    pre-registered UK health and fitness questions, each asked twice with web
    search on, from London. Directional for this setup; it measures sourcing,
    not medical accuracy."
metrics:
  - value: 83% vs 10%
    label: "of answers citing nhs.uk: GPT-6.1 Sol vs Claude Sonnet 5.5 (run 1,
      separated after Holm correction, a stricter bar when several comparisons are tested at once)"
  - value: 10%
    label: overlap between the two models' cited sources per question (Jaccard, 95%
      CI 7.4% to 13%)
  - value: 78% vs 24%
    label: "of citation weight held by each model's own top 10 publishers: GPT vs
      Claude"
  - value: $15.03
    label: for 400 answers across two runs, 0 errors
methodology:
  - 100 questions across five intents, frozen and pre-registered before any run
  - Two full runs per model with web search on, to measure run-to-run stability
  - Every cited page fetched once, politely, respecting robots.txt; each date
    recorded with its source
  - Every percentage reported with its count and a 95% interval; Holm correction
    across comparisons
  - Support checked by two AI judges and by hand; date parsing checked on
    held-out pages (agent-checked, owner-approved)
proof:
  - label: Data card
    url: https://github.com/biplob819/ai-visibility/blob/main/DATA_CARD.md
  - label: Results summary (JSON)
    url: https://github.com/biplob819/ai-visibility/blob/main/studies/uk-health/results/summary.json
  - label: Pre-registration
    url: https://github.com/biplob819/ai-visibility/blob/main/docs/preregistration.md
  - label: One-page signal spec (PDF)
    url: https://github.com/biplob819/ai-visibility/blob/main/docs/signal-spec.pdf
  - label: "The post: what AI search cites"
    url: https://biplob819.github.io/ai-visibility/post/
  - label: Deviations from the pre-registration
    url: https://github.com/biplob819/ai-visibility/blob/main/docs/deviations.md
story:
  overview: A study of which web pages Claude and GPT cite when answering 100
    health and fitness questions, and how out of date those pages are. It shows
    publishers whether AI answers use their content, and shows AI labs how often
    answers rest on stale pages. It ships as an open-source tool, citewatch, so
    anyone can run the study on their own questions.
  impact:
    - "Showed the two leading AI search models source UK health answers very
      differently: nhs.uk appears in 83% of GPT-6.1 Sol's run-1 answers but 10%
      of Claude Sonnet 5.5's, and their cited sources overlap only 10% per
      question."
    - "43% of GPT's time-sensitive answers had no source updated in the past
      year, against 12% for Claude: the freshness gap the proposed signal
      targets."
    - Turned the finding into a one-page spec for a paid freshness and
      provenance signal, with a live findings dashboard.
  pain:
    who: Content leads at UK health publishers, and data partnerships leads at AI
      labs.
    problem: Search traffic is falling and publishers can't see whether AI answers
      cite them, or whether those answers rely on outdated pages. AI labs lack
      reliable freshness and provenance signals for the pages their search tools
      pull in.
  bet: If you measure which pages AI answers rest on and how stale they are, from
    both sides, you can size the market for a paid freshness and provenance
    signal.
  evals:
    - name: Stale answers
      data: 114 time-sensitive answers per model, both runs
      method: Newest dated source older than 365 days
      result: GPT-6.1 Sol 43% (49/114), Claude Sonnet 5.5 12% (14/114)
      status: final
      url: https://biplob819.github.io/ai-visibility/
    - name: Date coverage
      data: 841 cited URLs
      method: URLs with a resolved date or a logged reason; the PRD's 90% target
      result: "89% (745/841): just below target, reported as such"
      status: fail
      url: https://biplob819.github.io/ai-visibility/
    - name: Date check
      data: 27 held-out pages, agent-checked and owner-approved
      method: Parser date within 7 days of the checked date
      result: 67% (18/27; 95% CI 48% to 81%)
      status: provisional
      url: https://biplob819.github.io/ai-visibility/
    - name: Does the cited page support the claim?
      data: 24 Claude and 23 to 25 GPT citations
      method: Two AI judges against the owner's hand labels
      result: "Owner: 100% supported for both models (labelled one to two seconds
        apart); AI judges 43% to 67%. The true rate is not settled"
      status: provisional
      url: https://biplob819.github.io/ai-visibility/
  learnings:
    - lesson: The AI judges said 43% to 67% of cited pages supported the claim; the
        owner labelled every one supported, one to two seconds apart.
      now: "Never publish a judge-only rate: calibrate judges against human labels,
        show both numbers, and say when they cannot settle the rate."
      url: https://biplob819.github.io/ai-visibility/
    - lesson: Date coverage came in at 89% against the PRD's 90% target.
      now: Report a missed target as missed, beside the number, instead of moving the
        target after the run.
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/deviations.md
    - lesson: "The first real web-search calls broke three assumptions no
        documentation showed: Claude's answers came back with no citations, the
        page-age date was relative (\"198 days ago\"), and OpenAI added a
        tracking tag to every cited link."
      now: Record real responses before building anything that parses them; a $0.25
        probe found all three.
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/lessons.md
    - lesson: The cost model put a full run at $19; a 10-question smoke run, which
        cost $0.79, put it at $7.92 from measured usage, because Claude searched
        once per question, not three times.
      now: "Measure before estimating: the pre-run estimate now reads the smoke run's
        averages, with 25% headroom."
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/lessons.md
    - lesson: Every number in the improvement report and the post was right, yet five
        review passes still found sentences that claimed more than the tool
        observed.
      now: "Review what the text claims separately from the numbers: what was observed
        versus what was inferred."
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/lessons.md
  monitoring:
    - metric: Share of cited pages dated (or with a logged reason)
      kind: quality
      target: 90% or more (PRD)
      current: "89% (745 of 841): below target, reported as such"
      how: Computed into the results summary after each run and shown on the
        dashboard.
    - metric: Failed answers per model (errors and refusals)
      kind: guardrail
      target: Errors below 5% per model
      current: 400 answers, 0 errors
      how: Checked in the audit after each run; refusals are reported but not counted
        as errors.
    - metric: API spend
      kind: cost
      target: $25 cap per paid command
      current: $15.03 for the two study runs, inside the $38 approved
      how: Every paid call is written to a spend ledger as soon as it returns; a dry
        run prints the estimate first and the cap stops the run.
    - metric: Politeness to the sites it reads
      kind: guardrail
      target: No site above one request a second, no page robots.txt disallows
      how: CI replays the full fetch log on every push and fails the build on any
        breach.
    - metric: No page content stored
      kind: guardrail
      how: A storage audit runs in CI on every push and fails the build if any page
        body or markup is committed.
    - metric: Run-to-run stability
      kind: quality
      current: The nhs.uk gap is separated in both runs after a Holm correction
      how: Each publisher's share is compared between runs 1 and 2, reported per
        model.
  improvements:
    - metric: Pre-run cost estimate per study run
      before: $19 (modelled)
      after: $7.92 (from the smoke run's measured usage)
      change: The estimate reads the smoke run's measured averages with 25% headroom;
        the two study runs then cost $7.55 and $7.48
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/improvements.md
    - metric: Support-check citations an AI judge could judge
      before: 25 of 47
      after: 48 of 49, for each judge
      change: Kept page text breaks lines at block elements, so the judges'
        exact-quote check works; 58 pages refetched and every citation judged
        again
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/improvements.md
    - metric: Shortest gap between requests to one site when a run resumes
      before: 0.4 s
      after: 1.025 s or more
      change: The per-host rate limiter is seeded from the fetch log, so a resumed run
        waits for the last run's request
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/improvements.md
  next:
    - "citewatch 0.1.2: support judging as an extra on EvalKit 0.4, once it
      reproduces the study's verdicts"
    - A larger held-out date check (25 fresh pages per date source) before
      changing which date source wins
    - A second study in another country or with more models, to test whether the
      nhs.uk gap is specific to UK health
    - Run the demo's Claude path on a live question (checked only offline so far)
source:
  repo: biplob819/ai-visibility
  synced: 2026-11-19
datasets:
  - name: citewatch UK health study data
    url: https://github.com/biplob819/ai-visibility/tree/main/studies/uk-health/data
    note: The study's own answers, citations and cited-page dates, collected by
      citewatch
install:
  - cmd: pip install citewatch
    note: "The core: report, score, dates, lookup. Python 3.11 or newer"
  - cmd: pip install 'citewatch[anthropic,openai]'
    note: Adds the provider SDKs for paid runs
  - cmd: uvx citewatch report --example
    note: An example report with no keys and no spend, without installing
license: MIT
harness: true
---

## Write-up

AI search answers now send readers to sources, but nobody could say which ones, or whether those pages are current. I built citewatch, an open-source tool that asks AI models questions with web search on, records every citation, visits each cited page politely to date it, and reports who gets cited with counts and 95% intervals. Its first study asked Claude Sonnet 5.5 and GPT-6.1 Sol 100 pre-registered UK health questions, twice. GPT cited nhs.uk in 83% of run-1 answers, Claude in 10%; the two models' sources overlapped by only 10% per question; and 43% of GPT's time-sensitive answers rested on no dated source under a year old, against 12% of Claude's. The study cost $15.03 in API calls. It ships with a dashboard, a write-up, a one-page signal spec for a data product, domain cards that tell each cited publisher what would make its pages readable and current, and a passkey-protected demo.

## My role

Product and engineering, end to end: framed the question and the buyer, wrote the PRD and technical spec, pre-registered the questions and metrics before any answer was seen, built the tool and its statistics, ran the study within an owner-approved budget, and shipped the dashboard, post, signal spec, demo and open-source release. Built with Claude Code under a node-by-node harness in which every capability needed passing tests and an independent, skeptical review before it counted as done.

## Key decisions

1. **Pre-register, then publish every deviation.** Questions, settings, seeds and metric definitions were frozen and hashed before run 1; each later change is listed with its decision and effect. *Trade-off:* slower to start and no tuning after seeing results, in exchange for numbers a skeptical reader can trust.
2. **Measure sourcing, never medical accuracy, and show the checks.** Every share carries its count and interval; a support check (two AI judges plus a human check) and a held-out date check sit beside the headlines, including where they disagree. *Trade-off:* a narrower claim and less dramatic headlines, but none that overreach.
3. **Polite by construction.** citewatch obeys robots.txt at one request per second per host, never stores page bodies, and gives publishers only readability advice (a visible, marked-up date; a readable robots.txt), never tips for gaming AI answers. *Trade-off:* 221 of 841 cited URLs ended up with no usable date, 88 of them because the page could not be read at all; the study reports this rather than working around it.
