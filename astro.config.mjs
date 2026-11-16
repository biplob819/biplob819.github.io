// @ts-check
import { defineConfig } from 'astro/config';

// User site (biplob819.github.io) serves from the domain root, so no `base`.
// If you add a custom domain, put it in public/CNAME and change `site`.
export default defineConfig({
  site: 'https://biplob819.github.io',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
