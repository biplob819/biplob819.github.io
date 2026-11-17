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
source:
  repo: biplob819/agentic-analytics
  synced: 2026-11-16
---

## Overview

How often does agentic analytics get the answer right, and which fixes close the gap? **agentic-analytics** is an open-source tool that asks plain-language questions of your data through AI agents and scores every answer against gold SQL, with no LLM judge. It ships with a bundled benchmark on UK house prices: a Claude or GPT agent on ClickHouse's remote MCP server, and Snowflake Cortex Analyst, answer the same questions, and the tool reports accuracy by question type, fix uplift, clarification behaviour and cost, with confidence intervals.

Full results dashboard: [biplob819.github.io/agentic-analytics](https://biplob819.github.io/agentic-analytics/) (live after the first published run).

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
