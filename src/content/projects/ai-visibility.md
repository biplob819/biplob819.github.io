---
title: AI Visibility Report
tagline: Which websites Claude and GPT cite when they answer UK health questions with web search, how fresh those pages are, and what a freshness signal would be worth.
kind: case-study
status: building
role: Product and build
year: "2026"
order: 32
tags:
  - AI search
  - citations
  - GEO
links:
  report: https://biplob819.github.io/ai-visibility/
  repo: https://github.com/biplob819/ai-visibility
  prd: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20PRD.md
  techspec: https://github.com/biplob819/ai-visibility/blob/main/AI%20Visibility%20Tech%20Spec.md
proof:
  - label: Data card
    url: https://github.com/biplob819/ai-visibility/blob/main/DATA_CARD.md
story:
  overview: A study of which web pages Claude and GPT cite when answering 100 health and fitness questions, and how out of date those pages are. It shows publishers whether AI answers use their content, and shows AI labs how often answers rest on stale pages. It ships as an open-source tool, citewatch, so anyone can run the study on their own questions.
  pain:
    who: Content leads at UK health publishers, and data partnerships leads at AI labs.
    problem: Search traffic is falling and publishers can't see whether AI answers cite them, or whether those answers rely on outdated pages. AI labs lack reliable freshness and provenance signals for the pages their search tools pull in.
  bet: If you measure which pages AI answers rest on and how stale they are, from both sides, you can size the market for a paid freshness and provenance signal.
source:
  repo: biplob819/ai-visibility
  synced: 2026-11-16
---

## Write-up

Which websites Claude Sonnet 5.5 and GPT-6.1 Sol cite when they answer 100 UK health and fitness questions with web search on, how fresh those pages are, and what a paid freshness and provenance signal would be worth.

It studies sourcing, not medical accuracy, and nothing in it is medical advice. The findings dashboard, from the open-source `citewatch` tool, is [live here](https://biplob819.github.io/ai-visibility/).
