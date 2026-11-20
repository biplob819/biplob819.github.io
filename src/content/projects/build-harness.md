---
title: Build Harness
tagline: Gates, roles and memory for building real products with Claude Code. Guides steer the agent before it acts; gates and a skeptical verifier check it after.
kind: open-source
status: shipped
role: Creator
year: "2026"
featured: true
order: 10
tags: [harness engineering, Claude Code, agents, quality gates]
headline:
  value: 13,040
  label: commits across the 10 repos it built, Kova and Insightsflow included
  note: Counted on each repo's main branch on 20 Nov 2026 (Kova 5,769; Insightsflow 6,300, built with a teammate, so those are the team's; the eight AI builds 971).
metrics:
  - value: "1,755"
    label: capability rows tracked, 748 green with proofs
  - value: "1,751"
    label: decisions recorded
  - value: "286"
    label: lessons, each with a control
  - value: "33"
    label: pre-push gates on Kova
license: Apache-2.0
images:
  - src: https://raw.githubusercontent.com/biplob819/build-harness/main/docs/assets/walkthrough.gif
    alt: "Walkthrough of nine terminal screens from a demo project: setup, a node refused until its dependency is green, a node starting, a converge that fails because a proof cites a skipped test, the same converge passing after the fix, the next node allowed, the gates' self-test, and the evidence table"
    caption: nine real terminal screens from a demo project, loops
    kind: walkthrough
links:
  repo: https://github.com/biplob819/build-harness
stack: [Claude Code plugin, hooks, subagents, skills, Python 3.11+, git hooks]
methodology:
  - Guides and sensors, computational and inferential (Böckeler, harness engineering)
  - Dependency-gated build graph; a node starts only when its dependencies are green
  - Every gate ships with a self-test that proves it can fail
  - Adversarial verifier refutes by default, from a fresh start
  - Mistakes become lessons; lessons that can be checked become gates
proof:
  - { label: "Repository and README", url: "https://github.com/biplob819/build-harness" }
  - { label: "Release 0.1.0", url: "https://github.com/biplob819/build-harness/releases/tag/v0.1.0" }
  - { label: "Field evidence script", url: "https://github.com/biplob819/build-harness/blob/main/scripts/evidence.py" }
  - { label: "CI: tests on Python 3.11 to 3.13", url: "https://github.com/biplob819/build-harness/actions" }
---

## The problem

Coding agents repeat mistakes. A rule written in a prompt is forgotten twenty turns later, a "done" claim isn't the same as working software, and a solo builder can't review every diff by hand. [Harness engineering](https://martinfowler.com/articles/harness-engineering.html) is the discipline of building the environment around the agent so that each failure becomes a permanent control.

## What it is

The harness behind Kova's 5,769 commits, Insightsflow, and every AI build on this site, extracted into a reusable kit:

- **Guides (before the agent acts).** A constitution file, a short list of standing principles re-injected on every turn by a hook, and spec-driven skills: specify, plan, tasks, implement, analyze, converge.
- **Computational sensors (after).** Lint, type-check and unit tests on every commit and push, plus a manifest of pre-push gates, each written after a real escape.
- **Inferential sensors.** A QA agent that audits the live app with design and QA lenses, and an adversarial verifier that tries to refute every finding before it is accepted.
- **Memory.** A numbered decision log and a lessons file, so a settled question is never re-asked.
- **Roles.** A builder, a QA lead and an engineering manager who decides escalations, so the human owner is asked only about scope and irreversible calls.

## How it ships

A Claude Code plugin: three agents (builder, verifier, engineering manager), six skills, and hooks that re-inject the standing principles every turn and block `--no-verify`, force-pushes and any push that fails a gate. An `init` step writes the per-repo pieces (constitution, gates, decision log, build graph) into any project. No product code from Kova or Insightsflow is in it: the release was rebuilt in a fresh repository and secret-scanned before it went public, under Apache-2.0.

## Install

```text
/plugin marketplace add biplob819/build-harness
/plugin install build-harness@build-harness
/build-harness:init
```

Or without the plugin: clone the repo and run `python3 scripts/init.py /path/to/repo`.
