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
  segments:
    - name: Content lead at a UK health publisher
      need: Traffic from search is falling and nobody can say whether AI answers cite the site.
      primary: true
    - name: Data partnerships lead at an AI lab
      need: Wants to know which sources answers lean on and how stale they are, before paying for any data.
      primary: false
    - name: Product lead at a web data or infrastructure company
      need: "Wants evidence on both sides of the signals market: what publishers lack and what AI labs would pay for."
      primary: false
  bet: If you measure which pages AI answers rest on and how stale they are, from both sides, you can size the market for a paid freshness and provenance signal.
  priorities:
    - item: Citation share by domain, intent and model
      call: built
      why: A publisher sees where AI answers use its content.
    - item: Freshness lag with the source of every date, and a stale-answer rate
      call: built
      why: Sizes the freshness problem for both buyers.
    - item: Two full runs with variance, and 50 dates checked by hand with an error rate
      call: built
      why: The findings have to hold up.
    - item: Crawling at scale, and advice on gaming AI answers
      call: cut
      why: The study measures; it doesn't help anyone game the answers.
    - item: Judging medical correctness
      call: cut
      why: A different question, needing clinical review.
    - item: Live mode for a reviewer's own question
      call: later
      why: Nice to try, but the study set proves the point.
  stories:
    - as: Content lead
      want: see my domain's share of citations by intent and model
      why: I know where AI answers use my content
      priority: must
    - as: Content lead
      want: see how stale my cited pages are compared with competitors
      why: I know which pages to refresh first
      priority: must
    - as: Partnerships lead
      want: see how often time-sensitive answers rest on pages not updated in 12 months
      why: I can size the freshness problem
      priority: must
    - as: Partnerships lead
      want: see how much the two models agree on sources
      why: I know whether one signal serves both
      priority: must
    - as: Anyone reading
      want: trust the numbers
      why: the findings hold up
      priority: must
    - as: Product lead
      want: read the main finding and the signal idea in two minutes
      why: I can judge whether the signal is worth building
      priority: must
    - as: Content lead
      want: type my domain into a demo and see its visibility
      why: I can try it without reading the post
      priority: should
    - as: Partnerships lead
      want: ask a fresh question and see live citations
      why: I can test beyond the study set
      priority: could
source:
  repo: biplob819/ai-visibility
  synced: 2026-11-16
---

## Overview

Which websites Claude Sonnet 5.5 and GPT-6.1 Sol cite when they answer 100 UK health and fitness questions with web search on, how fresh those pages are, and what a paid freshness and provenance signal would be worth.

This repository is being built node by node; see [`AI Visibility Tech Spec.md`](https://github.com/biplob819/ai-visibility/blob/HEAD/AI%20Visibility%20Tech%20Spec.md) §12 and run `python scripts/status.py` for live build status. It studies sourcing, not medical accuracy, and nothing in it is medical advice.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
