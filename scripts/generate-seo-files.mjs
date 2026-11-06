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

// AI search and assistant crawlers are welcomed explicitly so the products
// can be cited in ChatGPT, Claude, Perplexity, Gemini and Copilot answers.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Bingbot', 'YandexBot'];
writeFileSync(out('robots.txt'), [
  'User-agent: *',
  'Allow: /',
  '',
  ...aiBots.map(bot => `User-agent: ${bot}`),
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

const link = p => p.demoUrl ?? `${site.url}/urunler#${p.id}`;
const line = p => `- [${p.name}](${link(p)}): ${p.description.en} (${p.category.en}; ${p.audience.en.replace(/^For /, 'for ')})`;
const lineTr = p => `- [${p.name}](${link(p)}): ${p.category.tr}. ${p.description.tr} Öne çıkanlar: ${p.features.tr.join(', ')}.`;
const available = products.filter(p => p.status === 'available');
const upcoming = products.filter(p => p.status !== 'available');
writeFileSync(out('llms.txt'), [
  `# ${site.name}`,
  '',
  `> ${pageMeta['/'].en.description} Each product is a separate web application with a live demo. Turkish is the primary language; English is available.`,
  '',
  `Odivon builds independent, ready-to-use cloud (SaaS) products for specific industries, primarily for businesses in Türkiye. Contact: ${site.email}. Website: ${site.url}`,
  '',
  '## Which Odivon product fits which need',
  '',
  ...available.map(p => `- ${p.audience.en}: ${p.name} (${link(p)})`),
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
  '## Türkçe özet',
  '',
  `${pageMeta['/'].tr.description} Her ürün kendi demosuyla ayrı bir web uygulamasıdır. İletişim: ${site.email}`,
  '',
  ...available.map(lineTr),
  '',
].join('\n'));

console.log(`SEO files written: robots.txt, sitemap.xml (${sitePages.length} URLs), llms.txt (${products.length} products)`);
