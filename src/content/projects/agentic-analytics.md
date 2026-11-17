---
title: Agentic Analytics
tagline: How often does agentic analytics get the answer right? A ClickHouse MCP agent (Claude, GPT) vs Snowflake Cortex Analyst on a 100-question benchmark, scored against gold SQL.
kind: case-study
status: building
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
proof:
  - label: Data card
    url: https://github.com/biplob819/agentic-analytics/blob/main/DATA_CARD.md
story:
  overview: "A benchmark of how often AI agents answer analytics questions correctly: 100 questions on UK property data, asked through ClickHouse's MCP server and Snowflake Cortex Analyst. It measures accuracy by question type and platform, then tests fixes one at a time to see which actually help."
  pain:
    who: Data team leads deciding whether business users may ask the warehouse questions in plain English, and the analytics engineers who own the semantic layer.
    problem: "Agentic analytics fails quietly: a wrong date filter or join returns a plausible number. Vendor demos show the happy path, so a data lead can't tell how often each kind of question goes wrong, or which fixes help."
  segments:
    - name: Data team lead at a mid-size UK company
      need: Business users want to ask the warehouse questions in plain English. Needs to know the error rate before allowing it.
      primary: true
    - name: Analytics engineer
      need: Owns the schema and semantic layer, and wants to know which fixes are worth the effort.
      primary: false
  bet: If accuracy is measured by question category on each platform, and each fix is measured on its own, a data lead knows which questions are safe to open up and an engineer knows which fix is worth the effort.
  priorities:
    - item: A 100-question benchmark with gold SQL, checked to give the same results on ClickHouse and Snowflake before any run
      call: built
      why: The comparison has to be fair.
    - item: Accuracy by category and backend, and each fix's uplift measured alone
      call: built
      why: Lead with what's safe to open up, and invest in the fix that matters.
    - item: Cost per correct answer, and a trace for every failure
      call: built
      why: A rollout needs a budget, and an engineer needs to see which step went wrong.
    - item: A full BI tool, write access and fine-tuning
      call: cut
      why: The question is how often agents get analytics right; the MCP server is read-only by design.
    - item: Snowflake Cortex Agents
      call: later
      why: The named next step once the Cortex Analyst baseline is measured.
  stories:
    - as: Data team lead
      want: see accuracy by question category on each backend
      why: I know which questions are safe to open up
      priority: must
    - as: Analytics engineer
      want: see each fix's effect measured alone
      why: I invest in the fix that matters
      priority: must
    - as: Data team lead
      want: see whether the system asks back when a question is ambiguous
      why: users are not given confident guesses
      priority: must
    - as: Analytics engineer
      want: open the trace of any failed question
      why: I see exactly which step went wrong
      priority: must
    - as: Data team lead
      want: know the cost per correct answer
      why: I can budget a rollout
      priority: must
    - as: Data team lead
      want: see agent answers checked against the same data on both platforms
      why: the comparison is fair
      priority: must
    - as: Analytics engineer
      want: add questions in a file with gold SQL for both engines
      why: the benchmark grows with my use case
      priority: should
source:
  repo: biplob819/agentic-analytics
  synced: 2026-11-16
---

## Overview

How often does agentic analytics get the answer right, and which fixes close the gap? **agentic-analytics** is an open-source tool that asks plain-language questions of your data through AI agents and scores every answer against gold SQL, with no LLM judge. It ships with a bundled benchmark on UK house prices: a Claude or GPT agent on ClickHouse's remote MCP server, and Snowflake Cortex Analyst, answer the same questions, and the tool reports accuracy by question type, fix uplift, clarification behaviour and cost, with confidence intervals.

Full results dashboard: [biplob819.github.io/agentic-analytics](https://biplob819.github.io/agentic-analytics/) (live after the first published run).

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
