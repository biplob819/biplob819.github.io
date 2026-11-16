---
title: Build Harness
tagline: The Claude Code harness I build everything with, from Kova and Insightsflow to every project here. Guides steer the agent before it acts; gates and a skeptical verifier check it after.
kind: open-source
status: building
role: Creator
year: "2026"
featured: true
order: 10
tags: [harness engineering, Claude Code, agents, quality gates]
metrics:
  - value: "39"
    label: pre-push gates in production use
  - value: "3"
    label: "agent roles: builder, adversarial QA, engineering manager"
  - value: "10"
    label: repos built with it, Kova and Insightsflow included
stack: [Claude Code plugins, hooks, subagents, skills, git hooks]
---

## The problem

Coding agents repeat mistakes. A rule written in a prompt is forgotten twenty turns later, a "done" claim isn't the same as working software, and a solo builder can't review every diff by hand. [Harness engineering](https://martinfowler.com/articles/harness-engineering.html) is the discipline of building the environment around the agent so that each failure becomes a permanent control.

## What it is

The harness behind Kova's 5,600+ commits, Insightsflow, and every AI build on this site, extracted into a reusable kit:

- **Guides (before the agent acts).** A constitution file, a short list of standing principles re-injected on every turn by a hook, and spec-driven skills: specify, plan, tasks, implement, analyze, converge.
- **Computational sensors (after).** Lint, type-check and unit tests on every commit and push, plus a manifest of pre-push gates, each written after a real escape.
- **Inferential sensors.** A QA agent that audits the live app with design and QA lenses, and an adversarial verifier that tries to refute every finding before it is accepted.
- **Memory.** A numbered decision log and a lessons file, so a settled question is never re-asked.
- **Roles.** A builder, a QA lead and an engineering manager who decides escalations, so the human owner is asked only about scope and irreversible calls.

## How it ships

As a Claude Code plugin with an `init` step that writes the per-repo pieces (constitution, gates, decision log, build graph) into any project. No product code from Kova or Insightsflow comes with it; the release is rebuilt in a fresh repository and secret-scanned before it goes public.

## Status

Being extracted now. Every project on this site was built with it: node by node, behind converge gates and a skeptical verifier.
