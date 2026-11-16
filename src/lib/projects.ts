import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

export const KIND_LABEL: Record<Project['data']['kind'], string> = {
  product: 'Platform',
  'open-source': 'Open source',
  'case-study': 'AI build',
  prototype: 'Prototype',
};

export const STATUS_LABEL: Record<Project['data']['status'], string> = {
  live: 'Live',
  launching: 'Launching soon',
  shipped: 'Results published',
  building: 'Being built in public',
  design: 'In design',
};

export async function projects(kind?: Project['data']['kind']) {
  const all = await getCollection('projects');
  return all
    .filter((p) => !kind || p.data.kind === kind)
    .sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export const KIND_PLURAL: Record<Project['data']['kind'], string> = {
  product: 'Platforms',
  'open-source': 'Open source',
  'case-study': 'AI builds',
  prototype: 'Prototypes',
};
