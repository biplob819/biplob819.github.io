---
title: Kova
tagline: An AI-native HR platform for growing US businesses, from first résumé to last paycheck, with payroll built in.
kind: product
status: launching
role: Building end to end
year: "2026"
featured: true
order: 1
tags: [HR tech, B2B SaaS, payroll, multi-tenant, Claude API]
headline:
  value: 5,769
  label: commits since March 2026, built with my Build Harness
  note: Commits counted on the main branch on 20 Nov 2026. The marketing site and self-serve signup are live; the product is pre-launch while the remaining modules are built. Customer and revenue numbers are added as they become public.
metrics:
  - value: "9"
    label: modules proven green, each with logical, layout, flow, API and security tests
  - value: 209 of 759
    label: catalogued capabilities green so far
  - value: "33"
    label: pre-push gates every change must pass
  - value: 1,474
    label: product and engineering decisions logged
links:
  site: https://kovahr.com/
cover: /images/kova.jpg
stack: [Next.js, PostgreSQL with row-level security, Redis, Claude API, embedded payroll partner API, Inngest, Cloudflare R2]
images:
  - src: /diagrams/kova-architecture.svg
    alt: "Kova architecture: web, mobile and marketing clients call one app layer that checks auth, tenant, role and plan on every request; modules share an approvals engine over PostgreSQL with row-level security; payroll, payments and analytics sit behind provider interfaces."
    kind: architecture
  - src: /diagrams/kova-build-waves.svg
    alt: "Kova build order in seven waves: platform and core spine built; time off, time and attendance, documents and e-signature built; self-service in progress; hiring, payroll, benefits, performance and cross-module work planned; AI platform deliberately last."
    caption: build order in waves; a module starts only when everything it depends on is green
    kind: architecture
timeline:
  - when: Planned
    title: Production launch, then the next waves
    status: planned
    items:
      - Employee self-service (in progress), then hiring and onboarding
      - Payroll, benefits and compensation, then performance and employee experience
      - The AI platform last, once every data shape it reads has settled
  - when: Sep to Nov 2026
    title: Core HR modules proven green
    status: built
    items:
      - Time off (Oct), time and attendance with native mobile clock-in (Oct), documents and e-signature (Nov)
      - Marketing site and self-serve signup live at kovahr.com (Sep)
  - when: Aug to Sep 2026
    title: Rebuilt on a dependency-gated build graph
    status: built
    items:
      - A sweep of the first version against the market leader's flows logged 2,221 findings; the rebuild proves each capability with tests before it counts
      - "Foundations first: approvals engine, employee profile and fields, access levels, settings and reporting, org structure"
  - when: Mar 2026
    title: First version, 243 features by early April
    status: built
    items:
      - 243 features, later judged "unproven, not wrong" and rebuilt on the build graph
story:
  overview: An HR platform for US companies with 10 to 50 employees, run by a founder or a single HR generalist. One place for records, time off, attendance, documents and approvals now, with hiring, payroll and performance next, and AI built in last, on settled data.
  pain:
    who: Founders and lone HR generalists at US companies with 10 to 50 employees
    problem: They run HR on a patchwork of tools and spreadsheets, and the suites that join it all up are priced and built for larger companies.
  bet: A small company will switch to one affordable platform that matches the market leader's flows (so nobody relearns HR) and adds AI inside the work, if every module is proven before it ships.
  priorities:
    - item: Match the market leader's flows and labels as the floor
      call: built
      why: Buyers switching tools shouldn't have to relearn HR; Kova's extras are declared, not drifted into.
    - item: Self-serve signup instead of a sales-led trial
      call: built
      why: A 10-person company should be able to start without talking to anyone.
    - item: A native mobile app, not a web app on phones
      call: built
      why: Clock-in and approvals happen on phones, so the mobile app is a first-class client.
    - item: Multi-tenant isolation in the database itself
      call: built
      why: Row-level security per tenant means an application bug can't read another company's data.
    - item: Kova computing payroll itself
      call: cut
      why: An embedded payroll partner does the tax math behind a provider interface; Kova owns every screen.
    - item: Rebuilding 144 marketplace integrations natively
      call: cut
      why: A marketplace for integrations instead, so the team builds the core HR product.
    - item: The first version's AI layer
      call: cut
      why: It was built on data shapes that kept changing, so it was scrapped and AI moved to the end of the build order.
    - item: The AI platform
      call: later
      why: AI reads every module's data, so it is built last, once those shapes settle.
    - item: Payroll go-live
      call: later
      why: Launch as an HR platform first, with payroll added through the provider interface.
  next:
    - Production launch, then the first paying cohorts
    - Employee self-service, hiring and onboarding
    - Payroll, benefits and compensation through the payroll partner
    - The AI platform, built last on settled data
---

## The problem

Small and mid-size US companies run HR on a patchwork: one tool for hiring, another for leave, spreadsheets for reviews and a separate payroll provider. Each handover between them is manual. The suites that join it all up are priced and built for larger companies, and the AI they advertise is usually a chat window on top rather than help inside the work.

## What I built

Kova is planned as one platform for the whole employee lifecycle. Nine modules are proven green so far: an approvals engine, employee profiles and custom fields, access levels with per-field permissions, settings and HR reporting, org structure, time off, time and attendance with native mobile clock-in, documents with e-signature, and the marketing site. A module counts as green only when it has logical, layout, flow, API and security tests.

The marketing site and self-serve signup are live at [kovahr.com](https://kovahr.com/), with a free tier for up to five employees and a 30-day trial of the Growth plan. The product itself is pre-launch while self-service, hiring, payroll and performance are built.

## How it works

- **Multi-tenant by construction.** Every table carries a tenant id and row-level security, and tenant queries go through a context that switches to a restricted database role, so a bug in application code can't read another company's data.
- **Every write is audited**, because HR and payroll are compliance products first.
- **Payroll is an API behind an interface.** Every screen and data model is Kova's own; the payroll partner is reached only behind a payroll-provider interface, so the provider can change without the product changing.
- **Built in waves on a dependency graph.** A module starts only when everything it depends on is green, because errors compound along the edges. The AI platform comes last because it reads every other module's data.

## Go-to-market

- **Pricing**: Free (up to 5 employees), Core $3, Growth $7 and Pro $9 per employee per month (Pro adds a $10 monthly flat fee), payroll +$4 per employee, 20% off annual plans, and a 30-day Growth trial.
- **Channels built into the product**: a blog, comparison pages, an llms.txt for AI search, a newsletter, demo booking, a partners page and a Zapier integration.
- **First targets**: 10 paying customers and $1,000 MRR by month three, 15% free-to-paid conversion, and time to first value under 15 minutes. These are targets, not results.

## Decisions and trade-offs

- **Match the market leader's structure, then go further.** I used the category leader's information architecture as the floor for layout, flows and labels, because buyers switching tools shouldn't have to relearn HR. Kova's extras are declared explicitly rather than drifting in.
- **Country-agnostic from day one**, even though the first market is the US: no hard-coded currency, date or address shapes. It cost time early and saves a rewrite for every new country.
- **Rebuild what was unproven.** The first version reached 243 features by early April. A sweep against the reference flows logged 2,221 findings, so I rebuilt it on a build graph where nothing counts as done without tests.
- **Gates over reviews.** As a very small team, I couldn't rely on code review alone, so I turned every repeated mistake into an automated check that runs before a push. That system became the [Build Harness](/projects/build-harness/) I now use for every project.
