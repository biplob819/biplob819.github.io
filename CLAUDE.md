# CLAUDE.md: portfolio site

Static Astro site for Biplob Chakraborty (Lead PM, builder, India modern pentathlete; building Kova and Insightsflow end to end, never "co-founder" of them). Deploys to GitHub Pages from `main`.

Rules:
1. Every number on the site must trace to a source: the CV Google Doc, a project repo's published results, or Kova's repo. Never invent or round up a metric. Provisional results say so.
2. Project pages come from `portfolio add` (bin/portfolio.mjs). Keep `FIELDS` in the CLI and the schema in `src/content.config.ts` in step.
3. Things he built himself are called "Self-built", the same word as the chip on his CV.
4. Kova (kova-hrtech) is private: describe it, never link or copy its code.
5. No phone number on the site. The only email is the feedback address in `site.feedback`, joined in the browser so it isn't in the HTML.
6. Run `npm run check` before pushing.
7. Every project page tells one story, in order: pain (with evidence) → the bet and priorities (built / cut / later) → how it works (architecture, data flow) → results and proof → evals → how it improved (measured before → after) → metrics and monitoring → what I learned → what's next → feedback. Evals, improvements and learnings matter most: fill them from each repo's results, changelog and docs/lessons.md. These live in the `story` field and `links` (prd, architecture, dataflow, methodology, demo, repo). `portfolio story` lists what each page is missing. Never fill a story part with anything he hasn't written or a repo doesn't show.
