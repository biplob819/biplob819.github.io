---
title: AI Visibility Report
tagline: Which websites Claude and GPT cite when they answer UK health questions with web search, how fresh those pages are, and what a freshness signal would be worth.
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
  report: https://biplob819.github.io/ai-visibility/
  repo: https://github.com/biplob819/ai-visibility
  prd: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20PRD.md
  techspec: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20Tech%20Spec.md
images:
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/architecture.svg
    alt: The citewatch Python package and CLI talks to the Anthropic and OpenAI APIs and fetches cited web pages politely. It keeps run data as JSONL in the repository, a temporary page cache outside it, and uses EvalKit for support judging. Its outputs are a static dashboard on Cloudflare Pages, domain cards for a Streamlit demo behind passkeys, and a PyPI package, all gated by GitHub Actions CI.
    kind: architecture
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/dataflow.svg
    alt: "Row 1 collects citations: 100 frozen questions are asked of two models with web search, answers are stored verbatim and citations extracted. Row 2 fetches each cited page politely, resolves its date, and computes metrics into summary.json, which feeds the dashboard, domain cards and post. Two checked samples (support and dates) feed error rates into the metrics."
    kind: dataflow
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/dashboard.png
    alt: "citewatch findings dashboard: who gets cited, stale answers and how far to trust each number"
    kind: screenshot
    caption: Findings dashboard
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/post.png
    alt: The write-up post on what AI search cites for UK health questions
    kind: screenshot
    caption: The post
  - src: https://raw.githubusercontent.com/biplob819/ai-visibility/main/docs/assets/screenshots/signal-spec.png
    alt: One-page spec for a paid freshness and provenance signal
    kind: screenshot
    caption: Signal spec
headline:
  value: 43% vs 12%
  label: "of time-sensitive health answers with no source updated in the past year: GPT-6.1 Sol against Claude Sonnet 5.5"
  note: "Both runs pooled: 49/114 (95% CI 31% to 55%) vs 14/114 (5.8% to 20%). 100 pre-registered UK health and fitness questions, each asked twice with web search on, from London. Directional for this setup; it measures sourcing, not medical accuracy."
metrics:
  - value: 83% vs 10%
    label: "of answers citing nhs.uk: GPT-6.1 Sol vs Claude Sonnet 5.5 (run 1, separated after Holm correction)"
  - value: 10%
    label: overlap between the two models' cited sources per question (Jaccard, 95% CI 7.4% to 13%)
  - value: 78% vs 24%
    label: "of citation weight held by each model's own top 10 publishers: GPT vs Claude"
  - value: $15.03
    label: for 400 answers across two runs, 0 errors
methodology:
  - 100 questions across five intents, frozen and pre-registered before any run
  - Two full runs per model with web search on, to measure run-to-run stability
  - Every cited page fetched once, politely, respecting robots.txt; each date recorded with its source
  - Every percentage reported with its count and a 95% interval; Holm correction across comparisons
  - Support checked by two AI judges and by hand; date parsing checked against a hand-checked sample
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
  overview: A study of which web pages Claude and GPT cite when answering 100 health and fitness questions, and how out of date those pages are. It shows publishers whether AI answers use their content, and shows AI labs how often answers rest on stale pages. It ships as an open-source tool, citewatch, so anyone can run the study on their own questions.
  pain:
    who: Content leads at UK health publishers, and data partnerships leads at AI labs.
    problem: Search traffic is falling and publishers can't see whether AI answers cite them, or whether those answers rely on outdated pages. AI labs lack reliable freshness and provenance signals for the pages their search tools pull in.
  bet: If you measure which pages AI answers rest on and how stale they are, from both sides, you can size the market for a paid freshness and provenance signal.
  evals:
    - name: Stale answers
      data: 114 time-sensitive answers per model, both runs
      method: Newest dated source older than 365 days
      result: GPT-6.1 Sol 43% (49/114), Claude Sonnet 5.5 12% (14/114)
      status: final
      url: https://biplob819.github.io/ai-visibility/
    - name: Date coverage
      data: 841 cited URLs
      method: URLs with a resolved date or a logged reason; pre-registered target 90%
      result: "89% (745/841): just below target, reported as such"
      status: fail
      url: https://biplob819.github.io/ai-visibility/
    - name: Date check
      data: 27 hand-checked pages
      method: Parser date within 7 days of the checked date
      result: 67% (18/27; 95% CI 48% to 81%)
      status: provisional
      url: https://biplob819.github.io/ai-visibility/
    - name: Does the cited page support the claim?
      data: 24 Claude and 23 to 25 GPT citations
      method: Two AI judges against the owner's hand labels
      result: "Owner: 100% supported for both models; AI judges 43% to 67%, so they under-call support"
      status: final
      url: https://biplob819.github.io/ai-visibility/
  learnings:
    - lesson: The AI judges said only 43% to 67% of cited pages supported the claim; read by hand, all of them did.
      now: "Never publish a judge-only rate: calibrate the judge against hand labels first, and show both numbers."
      url: https://biplob819.github.io/ai-visibility/
    - lesson: Date coverage came in at 89% against a pre-registered 90% target.
      now: Report a missed target as missed, beside the number, instead of moving the target after the run.
      url: https://github.com/biplob819/ai-visibility/blob/main/docs/preregistration.md
source:
  repo: biplob819/ai-visibility
  synced: 2026-11-16
---

## Write-up

Which websites Claude Sonnet 5.5 and GPT-6.1 Sol cite when they answer 100 UK health and fitness questions with web search on, how fresh those pages are, and what a paid freshness and provenance signal would be worth.

It studies sourcing, not medical accuracy, and nothing in it is medical advice. The findings dashboard, from the open-source `citewatch` tool, is [live here](https://biplob819.github.io/ai-visibility/).
