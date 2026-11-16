# CLAUDE.md: portfolio site

Static Astro site for Biplob Chakraborty (PM, co-founder, builder, India modern pentathlete). Deploys to GitHub Pages from `main`.

Rules:
1. Every number on the site must trace to a source: the CV Google Doc, a project repo's published results, or Kova's repo. Never invent or round up a metric. Provisional results say so.
2. Project pages come from `portfolio add` (bin/portfolio.mjs). Keep `FIELDS` in the CLI and the schema in `src/content.config.ts` in step.
3. Products he built carry the BUILT tag, the same convention as the [BUILT] chip on his CV.
4. Kova (kova-hrtech) is private: describe it, never link or copy its code.
5. No phone number or private email on the site.
6. Run `npm run check` before pushing.
