import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const seo = spawnSync(process.execPath, [fileURLToPath(new URL('./generate-seo-files.mjs', import.meta.url))], { stdio: 'inherit' });
if (seo.status !== 0) process.exit(seo.status ?? 1);

const cli = fileURLToPath(new URL('../node_modules/vinext/dist/cli.js', import.meta.url));
const result = spawnSync(process.execPath, [cli, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, ODIVON_BUILD_TARGET: 'static' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
const required = ['index.html', 'urunler.html', 'gizlilik-politikasi.html', 'kullanim-sartlari.html', '404.html', 'robots.txt', 'sitemap.xml', 'llms.txt'];
for (const page of required.map(file => `dist/client/${file}`)) {
  if (!existsSync(page)) throw new Error(`Missing exported file: ${page}`);
}
console.log('Static deployment ready: dist/client');

