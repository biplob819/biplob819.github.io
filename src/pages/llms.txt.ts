import type { APIRoute } from 'astro';
import { site, atWork, sport, education, now } from '../site.config';
import { projects, STATUS_LABEL } from '../lib/projects';

// A plain-text version of the site for AI agents and recruiters' tools (llmstxt.org).
export const GET: APIRoute = async () => {
  const all = await projects();
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.roles.join(', ')}. ${site.proof.join(' ')}`,
    '',
    `- LinkedIn: ${site.links.linkedin}`,
    `- GitHub: ${site.links.github}`,
    `- CV (PDF): ${site.links.cv}`,
    '',
    '## Projects',
    ...all.map((p) => {
      const d = p.data;
      const result = d.headline ? ` Result: ${d.headline.value} ${d.headline.label}.` : ` Status: ${STATUS_LABEL[d.status]}.`;
      return `- [${d.title}](${site.url}/projects/${p.id}/): ${d.tagline}${result}`;
    }),
    '',
    `## At work: ${atWork.title}, ${atWork.company} (${atWork.period})`,
    ...atWork.items.map((i) => `- ${i.name}: ${i.text} ${i.metric} ${i.metricLabel}.`),
    ...atWork.experience.flatMap((e) => e.roles.map((r) => `- ${r.title}, ${e.company} (${r.period})`)),
    '',
    '## Education',
    ...education.map((e) => `- ${e.name}, ${e.place} (${e.period})`),
    '',
    `## Sport: ${sport.headline}`,
    ...sport.facts.map((f) => `- ${f}`),
    '',
    '## Now',
    ...now.map((n) => `- ${n}`),
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
