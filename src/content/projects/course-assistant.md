---
title: AI Teaching Assistant
tagline: A course assistant that answers only from approved session materials, cites every slide and hands everything else to the teaching team.
kind: case-study
status: design
role: Product and build
year: "2026"
order: 37
tags:
  - RAG
  - education
  - guardrails
links:
  repo: https://github.com/biplob819/course-assistant
  prd: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20PRD.md
  techspec: https://github.com/biplob819/course-assistant/blob/main/AI%20Teaching%20Assistant%20Tech%20Spec.md
story:
  overview: A course assistant for an executive programme that answers only from approved session materials, cites the slide every time, and hands everything else to the teaching team. It gives hints, never answers, on graded work, and is scored on a 280-case golden set before launch. The demo runs on a public sample course, with no learner data.
  pain:
    who: Working professionals on an executive programme who study around their jobs, and the teaching team that supports them.
    problem: Questions come up between live sessions and wait for the forum or the next session, and the teaching team answers the same ones more than once. A general chatbot would reply at once, but from outside the course, sometimes wrongly, and it would write graded work on request.
  segments:
    - name: Learner
      need: A working professional on the programme who studies around a job. Wants a quick answer they can check between sessions, and a clear route to a person.
      primary: true
    - name: Teaching team
      need: The instructor and the teaching assistants. Want fewer repeat questions and an early view of what confuses the cohort.
      primary: false
    - name: Programme owners
      need: The programme's faculty lead and the provider's programme team. Need accuracy, academic integrity, privacy and an off switch before they approve anything.
      primary: false
    - name: Evaluator
      need: A university, education team or reviewer deciding whether to trust an assistant like this. Wants to see it work, measured, with student data handled properly.
      primary: false
  bet: An assistant that answers only from approved course material, cites the slide every time, hands everything else to a person, and is measured before launch can save the teaching team repeat work without risking accuracy or academic integrity.
  priorities:
    - item: Answers only from approved materials, citing the slide or page every time
      call: built
      why: Learners can check every answer and move on.
    - item: A plain 'not covered' reply and a handover to the teaching team with a draft and sources
      call: built
      why: Learners aren't misled, and the team replies faster.
    - item: Hints, never answers, on graded work, tested with 30 probes
      call: built
      why: Academic integrity is a hard rule.
    - item: A 280-case EvalKit golden set before launch, after every change and every week
      call: built
      why: Quality is proven before anyone relies on it.
    - item: Grading, answers from the web, voice, and learner analytics beyond anonymous weekly counts
      call: cut
      why: Narrow scope keeps it safe and private.
    - item: A four-week pilot with one cohort
      call: later
      why: Only after the programme owners sign off; until then it runs on a sample course.
  stories:
    - as: Learner
      want: ask about a session and get an answer that cites the slide or page
      why: I can check it and move on
      priority: must
    - as: Learner
      want: be told plainly when the materials do not cover my question
      why: I am not misled
      priority: must
    - as: Learner
      want: get a hint on graded work
      why: I learn without breaking the rules
      priority: must
    - as: Teaching team
      want: see handed-over questions with the assistant's draft and sources
      why: I can reply quickly and accurately
      priority: must
    - as: Programme owner
      want: approve exactly which files the assistant reads
      why: nothing unapproved is used
      priority: must
    - as: Programme owner
      want: see eval results before launch and every week
      why: I can decide to continue or stop
      priority: must
    - as: Learner
      want: know what is stored and delete my history
      why: I stay in control of my data
      priority: must
    - as: Evaluator
      want: try the assistant on a public sample course
      why: I see it work without any learner data
      priority: must
    - as: Learner
      want: limit the search to one session
      why: answers match what I am studying
      priority: should
    - as: Teaching team
      want: see each week's most common confusions by session
      why: I can address them in the next session
      priority: should
source:
  repo: biplob819/course-assistant
  synced: 2026-11-16
---

## Overview

A course assistant that answers learner questions only from approved session materials, cites the slide or page it used, and hands everything else to the teaching team. It is measured on an [EvalKit](https://github.com/biplob819/evalkit) golden set before anyone relies on it.

This repo will never contain real course material or learner data. The demo runs on a sample course written for it, under CC BY 4.0.

The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.
