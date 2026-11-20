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
  value: 91 of 91
  label: dashboard capabilities at parity with the reference BI tool, each driven by an automated test against it
  note: From the repo's own parity check, run on 20 Nov 2026 (it was 66 of 66 in August, before more capabilities were added). Green means a test drove the capability and passed, not that no findings are open.
metrics:
  - value: "6,300"
    label: commits by the team since July 2026
  - value: 94.0%
    label: KPI and number cards complete against the reference (79 of 84), 27 Oct 2026
  - value: 18 of 22
    label: AI build steps green, including chat and our own MCP server
  - value: 6 of 597
    label: catalogued source connectors proven live end to end so far
links:
  site: https://insightsflow.live/
  demo: https://insights-flow-prototype.vercel.app/
cover: /images/insightsflow.jpg
stack: [ClickHouse, open-source connector engine, open-source BI engine (headless), NestJS, Next.js, PostgreSQL]
images:
  - src: /diagrams/insightsflow-architecture.svg
    alt: "Insightsflow architecture: source apps sync through a connector engine into a ClickHouse database per tenant; the web app, embedded SDK and AI chat reach data only through a query gateway that applies tenant and role before an unmodified BI engine runs."
    caption: embedded SDK and tokens are designed, not built yet
    kind: architecture
  - src: /diagrams/insightsflow-dataflow.svg
    alt: "One embedded request: the customer's backend gets a signed short-lived token for a user and role; the embed sends it with each query; the API, gateway and tenant database each enforce isolation; filtered rows return and the chart renders."
    caption: one embedded request, with the four places isolation is enforced
    kind: dataflow
timeline:
  - when: Next
    title: Distribution and business modules
    status: planned
    items:
      - Bring-your-own AI and a tenant-branded MCP server, then the embedding SDK
      - Reports, billing and usage metering, and the tenant admin console
  - when: Sep to Oct 2026
    title: AI layer and full dashboard parity
    status: built
    items:
      - AI scope set on 25 Sep; the first chat answer ran end to end on 30 Sep
      - Embedded chat and our own MCP server built in October; 18 of 22 AI build steps green
      - Dashboards reached 91 of 91 at parity and KPI cards 94.0% (79 of 84) by 27 Oct
  - when: Jul to Aug 2026
    title: Foundation, connectors and dashboards
    status: built
    items:
      - First commit on 19 Jul; tenancy, sign-in with single sign-on, data layer, query gateway and audit done
      - Live queries on customers' own warehouses designed, then withdrawn on 11 Aug
      - Dashboards at 66 of 66 parity on 21 Aug
story:
  overview: A multi-tenant analytics layer a SaaS company embeds in its own product, so its customers get self-serve dashboards and AI answers, white-labelled. One database per tenant, an unmodified open-source BI engine behind our own gateway, and AI that only sees what each user may see.
  pain:
    who: Product and engineering leads at SaaS companies that need customer-facing reporting
    problem: Building analytics in-house takes a team months and keeps costing after launch; general BI tools look foreign inside the product, start warehouse-first with a small set of connectors, and are priced per user or per customer logo.
  bet: Connectors are the wedge (no warehouse needed first), and AI is the second differentiator, if the answers are scoped to each user's permitted data, show how they were calculated, and can be resold under the customer's brand.
  priorities:
    - item: Foundation first, with tenant isolation in the gateway and the database
      call: built
      why: Every query passes a gateway that applies tenant and role, then hits that tenant's own database.
    - item: Query builder and dashboards at parity with the reference tool
      call: built
      why: Buyers switching tools expect every dashboard capability they already use.
    - item: AI chat through our own MCP server
      call: built
      why: The AI calls permission-scoped tools, so it can only see what the user may see.
    - item: Live queries on customers' own warehouses
      call: cut
      why: One ClickHouse source keeps isolation, performance and cost predictable.
    - item: Using the BI engine's own AI connector as the execution path
      call: cut
      why: Our own MCP server keeps permissions and metering in one place.
    - item: Reverse-ETL and a mobile app
      call: cut
      why: Out of scope for the first product, written down as non-goals.
    - item: Bring-your-own AI and a tenant-branded MCP server
      call: later
      why: Being built next, to be sold as a paid add-on on any plan.
    - item: The embedding SDK, reports, billing and the admin console
      call: later
      why: The SDK is designed and its token rules are written; the rest follows it.
  improvements:
    - metric: Public dashboard page code, gzipped
      before: 619,770 bytes
      after: 337,103 bytes
      change: 45.6% smaller, so embedded dashboards load faster for end users.
    - metric: Roles list at 647 roles, typical (median) load
      before: 417.7 ms
      after: 9.96 ms
      change: Fixed a slow admin screen for large tenants.
    - metric: Viewer main-thread blocking, median
      before: 273.5 ms
      after: 187 ms
      change: Less blocking work while a dashboard renders.
    - metric: Collections listing
      before: 107 database queries
      after: "12"
      change: Removed repeated per-item queries.
    - metric: Publishing a public snapshot, typical (median)
      before: 2.88 s
      after: 1.18 s
      change: Faster, but still over the 400 ms budget, so it stays open.
  learnings:
    - lesson: Two tests counted as done had never actually run; running them found 4 product defects.
      now: A capability is green only when its test has run against the reference and passed, and a pre-push check enforces it.
    - lesson: The open-source BI engine has no multi-tenant isolation in its free edition.
      now: Tenant, row and column isolation is our job, in the data layer and auth, not the engine's.
    - lesson: The connector engine's headline count is padded with community connectors that carry no support promise.
      now: We market honestly, and any paid reliability promise covers only the vetted, certified subset.
    - lesson: A limit that is fetched reads like a limit that is enforced. Two query limits were computed on every query, but only one reached the engine.
      now: Check who reads a value, not just who produces it; a value nobody reads is decoration.
  monitoring:
    - metric: First embedded chart, for 3 in 4 loads
      kind: guardrail
      target: Under 2.5 s
      how: Performance budget measured on every release
    - metric: API response time, for 19 in 20 requests
      kind: guardrail
      target: Under 400 ms
      how: Performance budget measured on every release
    - metric: Analytics database query time, for 19 in 20 queries
      kind: guardrail
      target: Under 3 s
      how: Performance budget measured on every release
    - metric: New users completing the core path without help
      kind: north-star
      target: At least 90%
      how: Product requirement; measured once the first users are onboarded
  next:
    - Bring-your-own AI and the tenant-branded MCP server
    - The embedding SDK with signed, short-lived per-user tokens
    - Reports, billing and usage metering, and the tenant admin console
    - Signing the first design partners (recruiting now)
---


## What I'm building

I lead the product and build it end to end with a teammate.

Insightsflow is a multi-tenant analytics layer that SaaS companies embed in their own product. Their customers get self-serve dashboards and reports, white-labelled, with an AI layer to ask questions in plain language. It's live at [insightsflow.live](https://insightsflow.live/) ahead of launch.

## How it works

Source apps flow through an open-source connector engine, which the platform orchestrates, into ClickHouse with one database per tenant. An open-source BI engine runs unmodified as a headless query and semantic engine behind our own control plane, web app and embed SDK, so the experience and the AI are ours without forking the engines underneath. A Postgres database holds the platform's own records: tenants, users, connectors, layouts and billing.

## Where it is

| Milestone | Modules | Status |
| --- | --- | --- |
| M1 Foundation | Tenancy, sign-in with company single sign-on and user provisioning, data layer, query gateway, audit | Done |
| M2 Data | Connectors (6 of 597 proven live end to end), modeling | Built, connectors being proven |
| M3 Analysis | Query builder (6 of 6), dashboards (91 of 91 at parity) | Built |
| M4 Distribution | AI chat and our own MCP server (18 of 22 AI steps green), embedding SDK, reports | AI built; SDK designed |
| M5 Business | Billing and usage metering, tenant admin | Planned |

## Security, access and localization

- **Company single sign-on and automatic user setup, per workspace**: password sign-in, single sign-on through the company's identity provider (OIDC or SAML), and automatic creation and removal of users from that provider (SCIM). Passwords are hashed with a modern, deliberately slow method, and accounts lock after repeated failures.
- **Roles with a fixed list of permissions**: 37 actions, roles that can inherit from parent roles, and 265 permission checks across 33 API controllers. New roles, users and embeds start with no access, and no one can grant an action they don't hold.
- **Row and column rules applied on the server**: each viewer's row filters and allowed columns are added before the query runs, so a browser can't widen them, and a query the checker can't fully read is refused rather than run.
- **Tenant isolation by construction**: the workspace always comes from the verified login, never from the request; each workspace's analytics data sits in its own schema and author-written SQL runs as that workspace's own database user. A suspended workspace's queries, syncs and public links stop on the next request.
- **Short-lived sign-in tokens**: login tokens live for 120 seconds with key rotation, sessions are checked against the database so revoking one takes effect at once, and the analytics engine is never exposed to the browser.
- **An audit log that can't be edited**: the database rejects any update or delete, retention defaults to 365 days, the retention job records its own deletions, and personal data is masked before it reaches logs.
- **Not built yet**: per-viewer signed embed tokens and the embed SDK, 2-step login, and placement for tenants who want a dedicated database. The product is English-only today.

## Go-to-market

- **Recruiting design partners now**: the current offer is 50% off any plan for 12 months in exchange for a 30-minute call each month.
- **AI as a paid add-on**: a tenant-branded MCP server, so a customer can resell AI answers on its own data under its own brand.
- **Channels**: a blog and a community for early users, ahead of a public launch.

## Decisions and trade-offs

- **Reuse the engines, own the experience.** The open-source engines stay unmodified and are reached only through their APIs, which keeps licensing clean and upgrades cheap; everything a customer sees is ours.
- **One warehouse, not bring-your-own.** Querying customers' own warehouses live was designed and then withdrawn: a single ClickHouse source keeps tenant isolation, performance and cost predictable.
- **Parity before novelty.** Each dashboard capability was checked side by side against the reference tool before anything new was added.
- **Say what is proven.** The catalogue lists 597 connectors, but only 6 have been run end to end, so both numbers are reported.
