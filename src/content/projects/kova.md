---
title: Kova
tagline: An AI-native HR platform for growing US businesses, from first résumé to last paycheck, with payroll built in.
kind: product
status: live
role: Building end to end
year: "2026"
featured: true
order: 1
tags: [HR tech, B2B SaaS, payroll, multi-tenant, Claude API]
headline:
  value: 5,600+
  label: commits since March 2026, built with my Build Harness
  note: Build figures from the repo on 16 Nov 2026. Customer and revenue numbers are added as they become public.
metrics:
  - value: "10"
    label: HR modules, from hiring to payroll
  - value: "352"
    label: merged pull requests
  - value: "39"
    label: pre-push gates every change must pass
  - value: 1,450+
    label: product and engineering decisions logged
links:
  site: https://kovahr.com/
cover: /images/kova.jpg
stack: [Next.js, PostgreSQL with row-level security, Redis, Claude API, Gusto Embedded, Inngest, Cloudflare R2]
---

## The problem

Small and mid-size US companies run HR on a patchwork: one tool for hiring, another for leave, spreadsheets for reviews and a separate payroll provider. Each handover between them is manual. The suites that join it all up are priced and built for larger companies, and the AI they advertise is usually a chat window on top rather than help inside the work.

## What I built

Kova is one platform for the whole employee lifecycle: core records, AI-assisted hiring, onboarding with e-signature, leave and attendance, performance reviews, OKRs, learning, reports and payroll. AI sits inside each workflow: résumé screening, review summaries, leave anomaly detection, and an HR assistant that answers from the company's own data.

It is live at [kovahr.com](https://kovahr.com/) with a free tier for up to five employees and a 30-day trial of the Growth plan.

## How it works

- **Multi-tenant by construction.** Every table carries a tenant id and row-level security, and tenant queries go through a context that switches to a restricted database role, so a bug in application code can't read another company's data.
- **Every write is audited**, because HR and payroll are compliance products first.
- **Payroll is native, Gusto is an API.** Every screen and data model is Kova's own; Gusto Embedded is reached only behind a payroll-provider interface, so the provider can change without the product changing.
- **The HR assistant uses tools, not context stuffing.** It looks up the records it needs, which keeps answers accurate and permission-aware. Customers can bring their own Anthropic or OpenAI key.
- **AI credits are deducted only after a successful response**, so a failed call never costs the customer.

## Decisions and trade-offs

- **Match the market leader's structure, then go further.** I used BambooHR's information architecture as the floor for layout, flows and labels, because buyers switching tools shouldn't have to relearn HR. Kova's extras are declared explicitly rather than drifting in.
- **Country-agnostic from day one**, even though the first market is the US: no hard-coded currency, date or address shapes. It cost time early and saves a rewrite for every new country.
- **Gates over reviews.** As a very small team, I couldn't rely on code review alone, so I turned every repeated mistake into an automated check that runs before a push. That system became the [Build Harness](/projects/build-harness/) I now use for every project.

## What's next

Customer stories, the first paying cohorts, and the payroll rollout. Numbers will appear here as they become public.
