import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One file per project in src/content/projects/<slug>.md.
// The `portfolio` CLI writes these from each project repo's portfolio.yml, so
// keep this schema and bin/portfolio.mjs (FIELDS) in step.
const url = z.string().url();

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    kind: z.enum(['product', 'open-source', 'case-study', 'prototype']),
    status: z.enum(['live', 'launching', 'shipped', 'building', 'design']),
    role: z.string().optional(),
    year: z.coerce.string(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
    tags: z.array(z.string()).default([]),
    headline: z
      .object({ value: z.string(), label: z.string(), note: z.string().optional() })
      .optional(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    links: z
      .object({
        repo: url.optional(),
        site: url.optional(),
        demo: url.optional(),
        report: url.optional(),
        package: url.optional(),
        video: url.optional(),
        prd: url.optional(),
      })
      .default({}),
    // Product screenshot or hero image: a /images/... path in this site, or a URL.
    cover: z.string().optional(),
    stack: z.array(z.string()).default([]),
    // How the work was done: eval design, statistics, ML method, build process.
    methodology: z.array(z.string()).default([]),
    // Architecture and data-flow diagrams, result charts, screenshots. `src` is a URL
    // (the CLI turns repo-relative paths into raw.githubusercontent.com URLs).
    images: z
      .array(z.object({
        src: z.string(),
        alt: z.string(),
        caption: z.string().optional(),
        kind: z.enum(['architecture', 'dataflow', 'result', 'screenshot']).default('screenshot'),
      }))
      .default([]),
    // Evidence a stranger can open: results files, dashboards, run logs, write-ups.
    proof: z.array(z.object({ label: z.string(), url })).default([]),
    cost: z.string().optional(),
    source: z
      .object({
        repo: z.string().optional(),
        // YAML reads an unquoted 2026-11-16 as a date
        synced: z.union([z.string(), z.date()]).transform((v) => (typeof v === 'string' ? v : v.toISOString().slice(0, 10))).optional(),
      })
      .optional(),
  }),
});

export const collections = { projects };
