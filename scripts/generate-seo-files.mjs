// Writes public/robots.txt, public/sitemap.xml and public/llms.txt from the
// site settings and product catalogue, so they never drift from the code.
// Node 22 strips TypeScript types, so the .ts sources import directly.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { site, sitePages } from '../lib/site.ts';
import { products } from '../lib/products.ts';
import { pageMeta } from '../lib/page-meta.ts';

const out = name => fileURLToPath(new URL(`../public/${name}`, import.meta.url));
const today = new Date().toISOString().slice(0, 10);
const abs = path => `${site.url}${path === '/' ? '/' : path}`;

writeFileSync(out('robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  `Sitemap: ${site.url}/sitemap.xml`,
  '',
].join('\n'));

const urls = sitePages.map(page => [
  '  <url>',
  `    <loc>${abs(page.path)}</loc>`,
  `    <lastmod>${today}</lastmod>`,
  `    <changefreq>${page.changefreq}</changefreq>`,
  `    <priority>${page.priority.toFixed(1)}</priority>`,
  '  </url>',
].join('\n'));
writeFileSync(out('sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`);

const line = p => `- [${p.name}](${p.demoUrl ?? `${site.url}/urunler#${p.id}`}): ${p.description.en} (${p.category.en})`;
const available = products.filter(p => p.status === 'available');
const upcoming = products.filter(p => p.status !== 'available');
writeFileSync(out('llms.txt'), [
  `# ${site.name}`,
  '',
  `> ${pageMeta['/'].en.description} Turkish is the primary site language; English is available.`,
  '',
  `Odivon is a family of independent software products for specific industries. Each product runs as its own web application. Contact: ${site.email}`,
  '',
  '## Pages',
  '',
  ...sitePages.map(page => `- [${pageMeta[page.path].en.title}](${abs(page.path)}): ${pageMeta[page.path].en.description}`),
  '',
  '## Available products',
  '',
  ...available.map(line),
  '',
  '## In development',
  '',
  ...upcoming.map(line),
  '',
].join('\n'));

console.log(`SEO files written: robots.txt, sitemap.xml (${sitePages.length} URLs), llms.txt (${products.length} products)`);
