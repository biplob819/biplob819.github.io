---
title: Insightsflow
tagline: Embedded analytics for SaaS teams. Connect your data, then ship self-serve dashboards inside your own product.
kind: product
status: launching
role: Building end to end
year: "2026"
featured: true
order: 2
tags: [embedded analytics, BI, B2B SaaS, ClickHouse]
headline:
  value: 66 of 66
  label: dashboard capabilities at parity with the reference BI tool, verified side by side
  note: From the platform's module index, 21 Aug 2026. Foundation modules (tenancy, auth, data layer, query gateway, audit) are converged; connectors and modeling are being built.
metrics:
  - value: "6,300+"
    label: commits by the team since July 2026
  - value: "5 of 5"
    label: foundation modules converged
  - value: SSO
    label: OIDC, SAML and SCIM with role-based access
  - value: 400+
    label: source connectors through Airbyte
links:
  site: https://insightsflow.live/
  demo: https://insights-flow-prototype.vercel.app/
cover: /images/insightsflow.jpg
stack: [Airbyte, ClickHouse, Metabase (headless), NestJS, Next.js, embed SDK]
---

## The problem

Every SaaS product eventually needs customer-facing reporting. Building it in-house takes an engineering team months and keeps costing them after launch; bolting on a general BI tool looks foreign inside the product and is priced for internal analysts, not thousands of end users.

## What I'm building

I lead the product and build it end to end with a small engineering team.

Insightsflow is a multi-tenant analytics layer that SaaS companies embed in their own product. Their customers get self-serve dashboards and reports, white-labelled, with an AI layer to ask questions in plain language. It's live at [insightsflow.live](https://insightsflow.live/) ahead of launch.

## How it works

Source apps flow through Airbyte, which the platform orchestrates, into ClickHouse with one database per tenant. Metabase runs unmodified as a headless query and semantic engine behind our own control plane, web app and embed SDK, so the experience and the AI are ours without forking the engines underneath. Postgres holds the control plane: tenancy, auth, connectors, layouts and billing.

## Where it is

| Milestone | Modules | Status |
| --- | --- | --- |
| M1 Foundation | Tenancy, auth and RBAC (OIDC, SAML, SCIM), data layer, query gateway, audit | Converged |
| M2 Data | Connectors, modeling | Being built |
| M3 Analysis | Query builder (6 of 6), dashboards (66 of 66 at parity) | Built |
| M4 Distribution | Embedding SDK, AI (natural language to query, report generation), reports | Next |
| M5 Business | Billing and usage metering, tenant admin | Planned |

## Decisions and trade-offs

- **Reuse the engines, own the experience.** Metabase and Airbyte stay unmodified and are reached only through their APIs, which keeps licensing clean and upgrades cheap; everything a customer sees is ours.
- **One warehouse, not bring-your-own.** Querying customers' own warehouses live was designed and then withdrawn: a single ClickHouse source keeps tenant isolation, performance and cost predictable.
- **Parity before novelty.** Each dashboard capability was checked side by side against the reference tool before anything new was added.
