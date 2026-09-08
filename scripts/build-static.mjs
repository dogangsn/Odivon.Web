import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cli = fileURLToPath(new URL('../node_modules/vinext/dist/cli.js', import.meta.url));
const result = spawnSync(process.execPath, [cli, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, ODIVON_BUILD_TARGET: 'static' },
});
if (result.error) throw result.error;
if (result.status !== 0) process.exit(result.status ?? 1);
for (const page of ['dist/client/index.html', 'dist/client/urunler.html']) {
  if (!existsSync(page)) throw new Error(`Missing exported page: ${page}`);
}
console.log('Static deployment ready: dist/client');

