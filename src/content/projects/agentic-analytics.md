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
datasets:
  - name: HM Land Registry Price Paid Data
    url: https://www.gov.uk/government/statistical-data-sets/price-paid-data-downloads
    note: Every residential property sale in England and Wales
story:
  overview: "A benchmark of how often AI agents answer analytics questions correctly: 100 questions on UK property data, asked through ClickHouse's MCP server and Snowflake Cortex Analyst. It measures accuracy by question type and platform, then tests fixes one at a time to see which actually help."
  pain:
    who: Data team leads deciding whether business users may ask the warehouse questions in plain English, and the analytics engineers who own the semantic layer.
    problem: "Agentic analytics fails quietly: a wrong date filter or join returns a plausible number. Vendor demos show the happy path, so a data lead can't tell how often each kind of question goes wrong, or which fixes help."
  bet: If accuracy is measured by question category on each platform, and each fix is measured on its own, a data lead knows which questions are safe to open up and an engineer knows which fix is worth the effort.
source:
  repo: biplob819/agentic-analytics
  synced: 2026-11-16
---

## Write-up

How often does agentic analytics get the answer right, and which fixes close the gap? **agentic-analytics** is an open-source tool that asks plain-language questions of your data through AI agents and scores every answer against gold SQL, with no LLM judge. It ships with a bundled benchmark on UK house prices: a Claude or GPT agent on ClickHouse's remote MCP server, and Snowflake Cortex Analyst, answer the same questions, and the tool reports accuracy by question type, fix uplift, clarification behaviour and cost, with confidence intervals.
