---
title: Kova
tagline: An HR platform that brings a company's existing payroll into one HR suite, built country-agnostic for six countries.
kind: product
status: launching
role: Building end to end
year: "2026"
featured: true
order: 1
tags: [HR tech, B2B SaaS, payroll, multi-tenant, Claude API]
headline:
  value: "8"
  label: HR modules built and passing their tests, plus the marketing site. Pre-launch.
  note: Signup is live at kovahr.com; the product launches once self-service is done. Each module counts only when it has logical, layout, flow, API and security tests. Built with my Build Harness (5,769 commits since March 2026, counted 20 Nov). Customer and revenue numbers are added as they become public.
metrics:
  - value: "6"
    label: "countries designed for from day one: US, UK, Australia, New Zealand, Canada, India"
  - value: 209 of 759
    label: catalogued capabilities green so far
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
  overview: An HR platform for companies with 50 to 500 employees that already run payroll and want one HR suite around it, starting in the US and built country-agnostic for the UK, Australia, New Zealand, Canada and India. One place for records, time off, attendance, documents and approvals now, with hiring, payroll and performance next, and AI built in last.
  pain:
    who: HR teams at companies with 50 to 500 employees that already run payroll
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
      why: AI reads every module's data, so it is built last, once that data settles.
    - item: Payroll go-live
      call: later
      why: Launch as an HR platform first, with payroll added through the provider interface.
  next:
    - Production launch, then the first paying cohorts
    - Employee self-service, hiring and onboarding
    - Payroll, benefits and compensation through the payroll partner
    - The AI platform, built last on settled data
---


## What I built

Kova is planned as one platform for the whole employee lifecycle. Eight HR modules are built and passing their tests so far, plus the marketing site: an approvals engine, employee profiles and custom fields, access levels with per-field permissions, settings and HR reporting, org structure, time off, time and attendance with native mobile clock-inand documents with e-signature. A module counts as done only when it has logical, layout, flow, API and security tests.

The marketing site and self-serve signup are live at [kovahr.com](https://kovahr.com/), with a free tier for up to five employees and a 30-day trial of the Growth plan. The product itself is pre-launch while self-service, hiring, payroll and performance are built.

## How it works

- **Each company's data is walled off inside the database.** Every row is tagged with its company, and the database itself refuses to return another company's rows, so a bug in application code can't leak data.
- **Every write is audited**, because HR and payroll are compliance products first.
- **Payroll is an API behind an interface.** Every screen and data model is Kova's own; the payroll partner is reached only behind a payroll-provider interface, so the provider can change without the product changing.
- **Built in waves, in dependency order.** A module starts only when everything it depends on is built and tested, because a mistake in a shared part spreads to everything built on top of it. The AI platform comes last because it reads every other module's data.

## Security, access and localization

- **Sign-in built in-house**, so HR data stays in Kova's own database: passwords (hashed with a deliberately slow method at the OWASP minimum), email verification, passkeys (a fingerprint or face instead of a password), 2-step codes from an authenticator app with backup codes, and sign-in with Google.
- **Sessions close themselves**: the screen locks after 10 idle minutes and asks for the password again, you are signed out after 30 idle minutes, every session ends after 30 days, and 5 failed logins lock the account for 30 minutes.
- **Access down to the single field**: 8 access-level types (Owner, Full Admin, Employee, Manager, Custom, Former employee, Payroll, No access), and each employee field can be hidden, read-only, editable, or editable with approval. Admins can preview the product as another user and see a history of access changes, and no one can grant more access than they hold.
- **Each company's data is walled off by the database itself**, on 235 tables. A build check fails any new table that isn't walled off or written down as an exception.
- **Security is tested feature by feature**: 400 security test files, 305 of them against a real database, and every one of the 209 shipped capabilities names its own security test (for example, "company A cannot read company B's assignments").
- **An audit log nobody can edit**: the app can read it but never change or delete it; sign-in secrets are encrypted at rest, and e-signature consent text is versioned.
- **Country-agnostic by design** for six countries (the US, UK, Canada, Australia, New Zealand and India): address formats, date and number styles, currency, time zones and statutory rules come from data, not hard-coded US rules, with data for 16 currencies. The interface is in English today; more languages come later.
- **Planned**: company single sign-on (Google, Microsoft and SAML).

## Go-to-market

- **Pricing**: Free (up to 5 employees), Core $3, Growth $7 and Pro $9 per employee per month (Pro adds a $10 monthly flat fee), payroll +$4 per employee, 20% off annual plans, and a 30-day Growth trial.
- **Channels built into the product**: a blog, comparison pages, a guide file for AI search engines, a newsletter, demo booking, a partners page and a Zapier integration.
- **First targets**: 10 paying customers and $1,000 MRR by month three, 15% free-to-paid conversion, and time to first value under 15 minutes. These are targets, not results.

## Decisions and trade-offs

- **Match the market leader's structure, then go further.** I used the category leader's information architecture as the floor for layout, flows and labels, because buyers switching tools shouldn't have to relearn HR. Kova's extras are declared explicitly rather than drifting in.
- **Country-agnostic from day one**, designed for the US, UK, Australia, New Zealand, Canada and India: no hard-coded currency, date or address formats. It cost time early and saves a rewrite for every new country.
- **Rebuild what was unproven.** The first version reached 243 features by early April. A sweep against the reference flows logged 2,221 findings, so I rebuilt it on a build graph where nothing counts as done without tests.
- **Gates over reviews.** As a very small team, I couldn't rely on code review alone, so I turned every repeated mistake into an automated check that runs before a push. That system became the [Build Harness](/projects/build-harness/) I now use for every project.
