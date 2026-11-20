#!/usr/bin/env node
// portfolio: add projects to the site from the command line, in one format.
//
//   portfolio init [repo-dir]            write portfolio.yml + docs/case-study.md into a project repo
//   portfolio add [repo-dir|owner/repo]  import or refresh that project's page on the site
//   portfolio new <slug> [--kind k]      create a page for something with no repo (a company, a prototype)
//   portfolio sync                       refresh every page that came from a repo
//   portfolio list                       show every project and its status
//   portfolio validate                   check every page against the schema
//   portfolio story [slug]               show which parts of each page's story are still missing
//   portfolio cv                         save the CV Google Doc as public/cv.pdf
//   portfolio publish [-m "message"]     validate, build, commit and push the site
//
// Flags: --dry-run (print, write nothing), --slug <s>, --force-body (replace a hand-edited page body).
// The site repo is the folder above this script, or $PORTFOLIO_SITE.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { basename, dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';

const SITE = resolve(process.env.PORTFOLIO_SITE ?? join(dirname(fileURLToPath(import.meta.url)), '..'));
const CONTENT = join(SITE, 'src/content/projects');
const TEMPLATES = join(SITE, 'templates');

const KINDS = ['product', 'open-source', 'case-study', 'prototype'];
const STATUSES = ['live', 'launching', 'shipped', 'building', 'design'];
const LINK_KEYS = ['repo', 'site', 'deck', 'model', 'demo', 'report', 'package', 'video', 'prd', 'prdOnePage', 'techspec', 'howBuilt', 'architecture', 'dataflow', 'methodology'];
const CALLS = ['built', 'cut', 'later'];
const MONITOR_KINDS = ['north-star', 'adoption', 'quality', 'guardrail', 'cost'];
const EVAL_STATUS = ['pass', 'final', 'provisional', 'fail', 'pending'];
// Frontmatter fields copied from a manifest, in this order. Keep in step with src/content.config.ts.
const FIELDS = ['title', 'tagline', 'kind', 'status', 'role', 'year', 'featured', 'order', 'tags', 'headline', 'metrics', 'links', 'cover', 'stack', 'methodology', 'images', 'proof', 'cost', 'timeline', 'demoLabel', 'license', 'harness', 'install', 'datasets', 'story'];
// Page body headings. The pain, priorities, monitoring and next steps live in `story`, so the body is the deep dive.
const SECTIONS = ['What I built', 'Decisions and trade-offs', 'What failed', 'Cost and how to reproduce'];

// ---------- small helpers ----------
const args = process.argv.slice(2);
const cmd = args.shift();
const flag = (name) => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, v && !v.startsWith('--') ? 2 : 1); return v && !v.startsWith('--') ? v : true; };
const DRY = !!flag('--dry-run');
const FORCE_BODY = !!flag('--force-body');
const today = () => new Date().toISOString().slice(0, 10);
const die = (msg) => { console.error(`portfolio: ${msg}`); process.exit(1); };
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const git = (dir, ...a) => { try { return execFileSync('git', ['-C', dir, ...a], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim(); } catch { return ''; } };

function readEntry(file) {
  const text = readFileSync(file, 'utf8');
  const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: text };
  return { data: YAML.parse(m[1]) ?? {}, body: m[2] };
}
function writeEntry(file, data, body) {
  const ordered = {};
  for (const k of [...FIELDS, 'source']) if (data[k] !== undefined && data[k] !== null && !(Array.isArray(data[k]) && !data[k].length)) ordered[k] = data[k];
  const out = `---\n${YAML.stringify(ordered, { lineWidth: 0 }).trimEnd()}\n---\n\n${body.trim()}\n`;
  if (DRY) { console.log(`--- would write ${file} ---\n${out}`); return; }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, out);
}

function validate(data, where) {
  const errs = [];
  for (const k of ['title', 'tagline', 'kind', 'status', 'year']) if (data[k] === undefined || data[k] === '') errs.push(`missing ${k}`);
  if (data.kind && !KINDS.includes(data.kind)) errs.push(`kind must be one of ${KINDS.join(', ')}`);
  if (data.status && !STATUSES.includes(data.status)) errs.push(`status must be one of ${STATUSES.join(', ')}`);
  if (data.headline && (!data.headline.value || !data.headline.label)) errs.push('headline needs value and label');
  for (const m of data.metrics ?? []) if (!m.value || !m.label) errs.push('every metric needs value and label');
  for (const [k, v] of Object.entries(data.links ?? {})) {
    if (!LINK_KEYS.includes(k)) errs.push(`unknown link "${k}" (use ${LINK_KEYS.join(', ')})`);
    else if (v && !/^https?:\/\//.test(v)) errs.push(`link ${k} is not a URL: ${v}`);
  }
  for (const im of data.images ?? []) if (!im.src || !im.alt) errs.push('every image needs src and alt text');
  for (const pr of data.proof ?? []) if (!/^https?:\/\//.test(pr.url ?? '')) errs.push(`proof "${pr.label}" needs a URL`);
  const st = data.story ?? {};
  if (st.pain && (!st.pain.who || !st.pain.problem)) errs.push('story.pain needs who and problem');
  for (const e of st.pain?.evidence ?? []) if (!e.text || (e.url && !/^https?:\/\//.test(e.url))) errs.push('every story.pain.evidence item needs text, and url must be a URL');
  for (const m of st.monitoring ?? []) if (!m.metric || !m.how || (m.kind && !MONITOR_KINDS.includes(m.kind))) errs.push(`every story.monitoring item needs metric and how; kind is one of ${MONITOR_KINDS.join(', ')}`);
  for (const e of st.evals ?? []) if (!e.name || !e.data || !e.method || !e.result || (e.status && !EVAL_STATUS.includes(e.status))) errs.push(`every story.evals item needs name, data, method and result; status is one of ${EVAL_STATUS.join(', ')}`);
  for (const i of st.improvements ?? []) if (!i.metric || !i.before || !i.after || !i.change) errs.push('every story.improvements item needs metric, before, after and change');
  for (const l of st.learnings ?? []) if (!l.lesson || !l.now) errs.push('every story.learnings item needs lesson and now');
  for (const p of st.priorities ?? []) if (!p.item || !CALLS.includes(p.call)) errs.push(`every story.priorities item needs item, and call is one of ${CALLS.join(', ')}`);
  for (const ds of data.datasets ?? []) if (!ds.name || !/^https?:\/\//.test(ds.url ?? '')) errs.push('every dataset needs a name and a URL');
  for (const c of data.install ?? []) if (!c.cmd) errs.push('every install step needs cmd');
  if (data.tagline && data.tagline.length > 200) errs.push('tagline is over 200 characters; keep it to one line');
  return errs.map((e) => `${where}: ${e}`);
}

// ---------- reading a project: local folder or owner/repo on GitHub ----------
async function openSource(target) {
  const local = resolve(target ?? '.');
  if (existsSync(local)) {
    const remote = git(local, 'remote', 'get-url', 'origin');
    const nwo = remote.match(/github\.com[/:]([^/]+\/[^/.]+?)(\.git)?$/)?.[1];
    return { kind: 'local', dir: local, nwo, read: (p) => (existsSync(join(local, p)) ? readFileSync(join(local, p), 'utf8') : null) };
  }
  if (/^[\w.-]+\/[\w.-]+$/.test(target)) {
    const cache = {};
    return {
      kind: 'remote', nwo: target,
      read: async (p) => {
        if (p in cache) return cache[p];
        const r = await fetch(`https://raw.githubusercontent.com/${target}/HEAD/${p.split('/').map(encodeURIComponent).join('/')}`);
        return (cache[p] = r.ok ? await r.text() : null);
      },
    };
  }
  die(`no such folder or owner/repo: ${target}`);
}
async function ghMeta(nwo) {
  if (!nwo) return {};
  try {
    const r = await fetch(`https://api.github.com/repos/${nwo}`, { headers: { Accept: 'application/vnd.github+json', ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}) } });
    return r.ok ? await r.json() : {};
  } catch { return {}; }
}

// First real paragraphs of a README: skip badges, HTML, code, comments and generated blocks.
function readmeIntro(md, max = 2) {
  if (!md) return { title: null, paras: [] };
  const title = md.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? null;
  const clean = md
    .replace(/<!--\s*([\w:-]+?):start\s*-->[\s\S]*?<!--\s*\1:end\s*-->/g, '') // generated result blocks
    .replace(/<!--[\s\S]*?-->/g, '').replace(/```[\s\S]*?```/g, '')
    .split(/\n##\s/)[0]; // the intro only: stop at the first section heading
  const paras = clean.split(/\n\s*\n/).map((p) => p.trim()).filter((p) =>
    p && !p.startsWith('#') && !p.startsWith('<') && !p.startsWith('[![') && !p.startsWith('|') && !p.startsWith('- ') && !p.startsWith('>') && !/^\*\*?Status/i.test(p) && p.length > 60);
  return { title, paras: paras.slice(0, max) };
}

async function loadProject(target) {
  const src = await openSource(target);
  const rd = async (p) => await src.read(p);
  const manifestText = (await rd('portfolio.yml')) ?? (await rd('portfolio.yaml'));
  const meta = await ghMeta(src.nwo);
  const readme = readmeIntro(await rd('README.md'));
  let data; let body = null;

  const parsed = manifestText ? (YAML.parse(manifestText) ?? {}) : null;
  // A portfolio.yml with no title is a partial file (e.g. only `priorities:` for the Scope toggle), not a page manifest.
  if (parsed && !parsed.title) throw new Error(`${target}: portfolio.yml has no title, so it is not a full page manifest (it may hold only priorities). Refusing to overwrite the page; import priorities separately.`);
  if (manifestText) {
    const m = parsed;
    data = Object.fromEntries(FIELDS.filter((k) => m[k] !== undefined).map((k) => [k, m[k]]));
    data.slug = m.slug;
    const cs = m.case_study ?? 'docs/case-study.md';
    body = await rd(cs);
  } else {
    // No manifest yet: scaffold an honest "being built" page from the README and GitHub metadata.
    data = {
      title: readme.title ?? meta.name ?? basename(src.dir ?? src.nwo),
      tagline: meta.description ?? readme.paras[0]?.slice(0, 200) ?? '',
      kind: 'case-study',
      status: 'building',
      role: 'Product and build',
      year: String(new Date().getFullYear()),
    };
  }
  data.links = { ...(src.nwo && meta.visibility !== 'private' ? { repo: `https://github.com/${src.nwo}` } : {}), ...(data.links ?? {}) };
  if (!data.links.package && meta.homepage?.includes('pypi.org')) data.links.package = meta.homepage;
  if (!body) {
    body = `## Overview\n\n${readme.paras.join('\n\n') || data.tagline}\n\n` +
      (data.status === 'building' || data.status === 'design'
        ? 'The full case study (the user pain, decisions and trade-offs, results, what failed, cost and how to reproduce) is published here with the evaluation run.\n'
        : '');
  }
  body = absolutize(body, src.nwo);
  if (src.nwo) for (const im of data.images ?? []) if (im.src && !/^https?:/.test(im.src)) im.src = `https://raw.githubusercontent.com/${src.nwo}/HEAD/${im.src.replace(/^\.\//, '')}`;
  const slug = flag('--slug') || data.slug || slugify(src.nwo?.split('/')[1] ?? data.title);
  delete data.slug;
  data.source = { repo: src.nwo ?? src.dir, synced: today() };
  return { slug, data, body, fromManifest: !!manifestText };
}

// Relative links and images in a repo's Markdown point into that repo once on the site.
function absolutize(md, nwo) {
  if (!nwo) return md;
  return md.replace(/(!?)\[([^\]]*)\]\((?!https?:|#|mailto:|\/)([^)\s]+)\)/g, (_, bang, text, path) =>
    `${bang}[${text}](https://${bang ? 'raw.githubusercontent.com' : 'github.com'}/${nwo}/${bang ? 'HEAD' : 'blob/HEAD'}/${path.replace(/^\.\//, '')})`);
}

// ---------- commands ----------
async function add(target) {
  const p = await loadProject(target);
  const file = join(CONTENT, `${p.slug}.md`);
  let body = p.body; let data = p.data;
  const existed = existsSync(file);
  if (existed) {
    const old = readEntry(file);
    // A manifest owns the frontmatter it sets; anything else on the page (order, featured, hand edits) is kept.
    data = p.fromManifest
      ? { ...old.data, ...p.data, links: { ...(old.data.links ?? {}), ...p.data.links } }
      // README scaffold: the page already exists, so only refresh links and the sync stamp.
      : { ...p.data, ...old.data, links: { ...p.data.links, ...(old.data.links ?? {}) }, source: p.data.source };
    if (!p.fromManifest && !FORCE_BODY) body = old.body; // never overwrite a hand-written page with a README scaffold
  }
  const errs = validate(data, `${p.slug}.md`);
  if (errs.length) die(`not written:\n  ${errs.join('\n  ')}`);
  writeEntry(file, data, body);
  console.log(`${existed ? 'updated' : 'added'} ${p.slug} (${data.kind}, ${data.status})${p.fromManifest ? '' : ' from README; run `portfolio init` in the repo for a full case study'}`);
}

function init(dir = '.') {
  dir = resolve(dir);
  if (!existsSync(dir)) die(`no such folder: ${dir}`);
  const target = join(dir, 'portfolio.yml');
  if (existsSync(target)) die(`${target} already exists`);
  const remote = git(dir, 'remote', 'get-url', 'origin');
  const nwo = remote.match(/github\.com[/:]([^/]+\/[^/.]+?)(\.git)?$/)?.[1];
  const readme = readmeIntro(existsSync(join(dir, 'README.md')) ? readFileSync(join(dir, 'README.md'), 'utf8') : '');
  const fill = (t) => t
    .replaceAll('{{slug}}', slugify(nwo?.split('/')[1] ?? basename(dir)))
    .replaceAll('{{title}}', readme.title ?? basename(dir))
    .replaceAll('{{repo}}', nwo ? `https://github.com/${nwo}` : '')
    .replaceAll('{{year}}', String(new Date().getFullYear()));
  const manifest = fill(readFileSync(join(TEMPLATES, 'portfolio.yml'), 'utf8'));
  const csPath = join(dir, 'docs/case-study.md');
  const cs = readFileSync(join(TEMPLATES, 'case-study.md'), 'utf8');
  if (DRY) { console.log(manifest); return; }
  writeFileSync(target, manifest);
  if (!existsSync(csPath)) { mkdirSync(dirname(csPath), { recursive: true }); writeFileSync(csPath, cs); }
  console.log(`wrote ${target} and ${csPath}\nfill them in, then run: portfolio add ${dir}`);
}

function newEntry(slug) {
  if (!slug) die('usage: portfolio new <slug> [--kind product|open-source|case-study|prototype]');
  const kind = flag('--kind') || 'prototype';
  const file = join(CONTENT, `${slugify(slug)}.md`);
  if (existsSync(file)) die(`${file} already exists`);
  writeEntry(file, { title: slug, tagline: 'One line: who it is for and what it does.', kind, status: 'design', year: String(new Date().getFullYear()) },
    SECTIONS.map((s) => `## ${s}\n\n`).join(''));
  console.log(`created ${file}`);
}

function entries() {
  if (!existsSync(CONTENT)) return [];
  return readdirSync(CONTENT).filter((f) => f.endsWith('.md')).map((f) => ({ slug: f.slice(0, -3), file: join(CONTENT, f), ...readEntry(join(CONTENT, f)) }));
}

async function sync() {
  for (const e of entries()) {
    const repo = e.data.source?.repo;
    if (!repo) continue;
    const local = existsSync(repo) ? repo : null;
    const local2 = local ?? (process.env.PORTFOLIO_REPOS ? join(process.env.PORTFOLIO_REPOS, repo.split('/')[1]) : null);
    const target = local2 && existsSync(local2) ? local2 : repo;
    try { args.push('--slug', e.slug); await add(target); } catch (err) { console.error(`${e.slug}: ${err.message}`); }
  }
}

function list() {
  const rows = entries().sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));
  for (const e of rows) {
    const h = e.data.headline ? `${e.data.headline.value} ${e.data.headline.label}` : '';
    console.log(`${e.slug.padEnd(24)} ${String(e.data.kind).padEnd(12)} ${String(e.data.status).padEnd(10)} ${h.slice(0, 70)}`);
  }
}

function validateAll() {
  const errs = entries().flatMap((e) => validate(e.data, `${e.slug}.md`));
  if (errs.length) die(`${errs.length} problem(s):\n  ${errs.join('\n  ')}`);
  console.log(`ok: ${entries().length} projects`);
}

// What a finished project page needs, so a page tells the whole story. Run `portfolio story [slug]`.
const STORY_PARTS = [
  ['Overview (for hiring managers)', (d) => d.story?.overview],
  ['Impact', (d) => d.story?.impact?.length],
  ['User pain', (d) => d.story?.pain],
  ['Pain evidence (quote, ticket, data)', (d) => d.story?.pain?.evidence?.length],
  ['The bet', (d) => d.story?.bet],
  ['PRD link', (d) => d.links?.prd],
  ['Tech spec link', (d) => d.links?.techspec || d.kind === 'product'],
  ['Screenshots', (d) => d.cover || d.images?.some((i) => i.kind === 'screenshot')],
  ['Walkthrough GIF', (d) => d.images?.some((i) => i.kind === 'walkthrough')],
  ['Architecture (doc or diagram)', (d) => d.links?.architecture || d.images?.some((i) => i.kind === 'architecture')],
  ['Data flow (doc or diagram)', (d) => d.links?.dataflow || d.images?.some((i) => i.kind === 'dataflow')],
  ['Demo or live site', (d) => d.links?.demo || d.links?.site || d.links?.video],
  ['Repo (not needed for private platforms)', (d) => d.links?.repo || d.kind === 'product'],
  ['Headline result', (d) => d.headline],
  ['Result screenshots or charts', (d) => d.images?.some((i) => i.kind === 'result')],
  ['Methodology', (d) => d.methodology?.length || d.links?.methodology],
  ['Datasets (real, linked)', (d) => d.datasets?.length || d.kind === 'product'],
  ['Evals (what was tested and the result)', (d) => d.story?.evals?.length],
  ['Improvements (measured before and after)', (d) => d.story?.improvements?.length],
  ['Metrics and monitoring', (d) => d.story?.monitoring?.length],
  ['Learnings', (d) => d.story?.learnings?.length],
  ['Proof a stranger can open', (d) => d.proof?.length],
  ["What's next", (d) => d.story?.next?.length],
];
function story(slug) {
  const rows = entries().filter((e) => !slug || e.slug === slug).sort((a, b) => (a.data.order ?? 100) - (b.data.order ?? 100));
  if (!rows.length) die(slug ? `no project ${slug}` : 'no projects');
  for (const e of rows) {
    const missing = STORY_PARTS.filter(([, ok]) => !ok(e.data)).map(([n]) => n);
    const have = STORY_PARTS.length - missing.length;
    console.log(`${e.slug.padEnd(24)} ${String(have).padStart(2)}/${STORY_PARTS.length}${missing.length ? `  missing: ${missing.join(', ')}` : '  complete'}`);
  }
}

async function cv() {
  const cfg = readFileSync(join(SITE, 'src/site.config.ts'), 'utf8');
  const id = cfg.match(/CV_DOC_ID = '([^']+)'/)?.[1];
  if (!id) die('CV_DOC_ID not found in src/site.config.ts');
  const r = await fetch(`https://docs.google.com/document/d/${id}/export?format=pdf`);
  if (!r.ok || !r.headers.get('content-type')?.includes('pdf')) die(`could not export the CV (HTTP ${r.status}); is the doc shared "anyone with the link"?`);
  const buf = Buffer.from(await r.arrayBuffer());
  if (!DRY) writeFileSync(join(SITE, 'public/cv.pdf'), buf);
  console.log(`saved public/cv.pdf (${Math.round(buf.length / 1024)} KB)`);
}

function publish() {
  const msg = flag('-m') || `content: update projects (${today()})`;
  validateAll();
  execFileSync('npm', ['run', 'build'], { cwd: SITE, stdio: 'inherit' });
  if (DRY) { console.log('dry run: built, not committed'); return; }
  git(SITE, 'add', 'src/content', 'src/site.config.ts', 'public');
  if (!git(SITE, 'status', '--porcelain', '--', 'src/content', 'src/site.config.ts', 'public')) { console.log('nothing to publish'); return; }
  execFileSync('git', ['-C', SITE, 'commit', '-m', msg], { stdio: 'inherit' });
  execFileSync('git', ['-C', SITE, 'push'], { stdio: 'inherit' });
  console.log('pushed; GitHub Actions deploys the site in about a minute');
}

const usage = readFileSync(fileURLToPath(import.meta.url), 'utf8').split("\n").slice(1, 16).map((l) => l.replace(/^\/\/ ?/, '')).join('\n');
switch (cmd) {
  case 'init': init(args[0]); break;
  case 'add': await add(args[0]); break;
  case 'new': newEntry(args[0]); break;
  case 'sync': await sync(); break;
  case 'list': list(); break;
  case 'validate': validateAll(); break;
  case 'story': story(args[0]); break;
  case 'cv': await cv(); break;
  case 'publish': publish(); break;
  default: console.log(usage); if (cmd && cmd !== 'help' && cmd !== '--help') process.exit(1);
}
