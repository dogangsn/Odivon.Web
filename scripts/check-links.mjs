// Broken link check for the static export in dist/client.
// Internal links: the target page (Vercel clean URLs) and any #anchor must exist.
// External links: checked over the network unless --offline is passed.
// Usage: npm run build:static && npm run check:links [-- --offline]
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = 'dist/client';
const offline = process.argv.includes('--offline');
if (!existsSync(root)) throw new Error('Run `npm run build:static` first.');

const pages = readdirSync(root).filter(file => file.endsWith('.html') && !/^yandex_/.test(file));
const fileFor = path => {
  const clean = path.replace(/\/$/, '') || '/index';
  const candidates = [`${clean}.html`, `${clean}/index.html`, clean];
  return candidates.map(c => join(root, c)).find(existsSync);
};
const ids = html => new Set([...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]));
const decode = s => s.replace(/&amp;/g, '&');

const problems = [];
const external = new Map();
let checked = 0;

for (const page of pages) {
  const html = readFileSync(join(root, page), 'utf8');
  const pagePath = page === 'index.html' ? '/' : `/${page.replace(/\.html$/, '')}`;
  for (const [, rawHref] of html.matchAll(/<a\b[^>]*\shref="([^"]*)"/g)) {
    const href = decode(rawHref);
    checked++;
    if (!href) { problems.push(`${pagePath}: empty href`); continue; }
    if (/^(mailto|tel):/.test(href)) {
      if (!/^mailto:[^@\s]+@[^@\s]+\.[a-z]{2,}/i.test(href) && href.startsWith('mailto')) problems.push(`${pagePath}: invalid ${href}`);
      continue;
    }
    if (/^https?:\/\//.test(href)) {
      if (!external.has(href)) external.set(href, new Set());
      external.get(href).add(pagePath);
      continue;
    }
    const [path, hash] = href.split('#');
    const target = path ? fileFor(path) : join(root, page);
    if (!target) { problems.push(`${pagePath}: broken internal link ${href}`); continue; }
    if (hash && target.endsWith('.html') && !ids(readFileSync(target, 'utf8')).has(hash)) {
      problems.push(`${pagePath}: missing anchor ${href}`);
    }
  }
}

// Every sitemap URL must exist as an exported page.
const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  if (!fileFor(new URL(loc).pathname)) problems.push(`sitemap.xml: ${loc} has no exported page`);
}

if (!offline) {
  await Promise.all([...external.keys()].map(async url => {
    try {
      const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000) });
      if (res.status >= 400) problems.push(`external ${url} -> HTTP ${res.status} (on ${[...external.get(url)].join(', ')})`);
    } catch (error) {
      problems.push(`external ${url} -> ${error.cause?.code ?? error.name} (on ${[...external.get(url)].join(', ')})`);
    }
  }));
}

console.log(`Checked ${checked} links on ${pages.length} pages, ${external.size} unique external URLs${offline ? ' (not fetched)' : ''}.`);
if (problems.length) {
  console.error(`\n${problems.length} problem(s):\n- ${problems.join('\n- ')}`);
  process.exit(1);
}
console.log('No broken links found.');
