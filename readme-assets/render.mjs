// Renders every <section id> in banners.html to a PNG (1600 px wide, transparent corners).
// Usage (from a folder that has playwright installed, e.g. ../website):
//   node ../design/readme-assets/render.mjs [id ...]
// Output: readme-assets/out/<id>.png. Copy each into the repo's .github/assets/ (see README.md here).
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(process.cwd(), 'noop.js'));
const { chromium } = require('playwright');

const ids = process.argv.slice(2);
const all = ['hero-org', 'hero-desktop', 'hero-mobile', 'hero-relay', 'steps', 'stats',
  'hero-core', 'hero-proto', 'hero-web', 'hero-design'];
const out = join(here, 'out');
mkdirSync(out, { recursive: true });

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1700, height: 900 }, deviceScaleFactor: 1 });
await p.goto(pathToFileURL(join(here, 'banners.html')).href, { waitUntil: 'networkidle' });
await p.evaluate(() => document.fonts.ready);
for (const id of ids.length ? ids : all) {
  await p.evaluate((id) => document.querySelectorAll('section').forEach((s) => s.classList.toggle('on', s.id === id)), id);
  await p.waitForTimeout(150);
  await p.locator('#' + id).screenshot({ path: join(out, `${id}.png`), omitBackground: true });
  console.log('wrote', id);
}
await b.close();
