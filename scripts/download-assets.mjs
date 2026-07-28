// Downloads every asset the clone needs into public/.
// node scripts/download-assets.mjs
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = 'https://mitibm.mit.edu';
const THEME = `${BASE}/wp-content/themes/ibm-mit/assets`;

const THEME_SVGS = [
  'MITIBM_Close-X.svg',
  'MITIBM_Close.svg',
  'MITIBM_Logo.svg',
  'MITIBM_Menu-hover.svg',
  'icon--down-arrow-gray.svg',
  'icon--down-arrow.svg',
  'icon--grid-view-toggle.svg',
  'icon--list-view-toggle.svg',
  'icon--search-black.svg',
  'icon--search-pink.svg',
  'mobile-site-logo.svg',
  'site-hamburger.svg',
  'site-logo-close-btn.svg',
];

const FAVICONS = [
  'favicon/favicon-16x16.png',
  'favicon/favicon-32x32.png',
  'favicon/apple-touch-icon-57x57.png',
  'favicon/apple-touch-icon-72x72.png',
  'favicon/apple-touch-icon-114x114.png',
  'favicon/apple-touch-icon-120x120.png',
  'favicon/apple-touch-icon-144x144.png',
  'favicon/apple-touch-icon-152x152.png',
  'favicon/mstile-144x144.png',
];

const UPLOADS = [
  // hero
  '2020/03/MIT-IBM_About-hero.png',
  '2020/03/MIT-IBM_About-hero-mobile-1244x1330.png',
  // spotlight cards
  '2026/04/MIT-Dome-768x575.png',
  '2026/06/MIT-ChartNet-01-press_0-768x512.jpg',
  '2026/06/Co-Battleship3-768x512.png',
  '2026/06/mitibm-lab-768x429.png',
  '2026/04/Building-the-future-of-computing-together-768x429.png',
  '2026/04/MIT_Power-Estimation-01_0-512.jpg',
  '2026/04/MIT_Power-Estimation-01_0-768x512.jpg',
  // logos
  '2026/04/scc-logo.png',
];

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

async function download(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': UA, Referer: BASE } });
    if (!res.ok) return { url, dest, ok: false, status: res.status };
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length < 100) return { url, dest, ok: false, status: 'too small' };
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.writeFile(dest, buf);
    return { url, dest, ok: true, bytes: buf.length };
  } catch (e) {
    return { url, dest, ok: false, status: e.message };
  }
}

async function batch(jobs, size = 4) {
  const out = [];
  for (let i = 0; i < jobs.length; i += size) {
    out.push(...(await Promise.all(jobs.slice(i, i + size).map((j) => download(j.url, j.dest)))));
  }
  return out;
}

const jobs = [
  ...THEME_SVGS.map((f) => ({ url: `${THEME}/images/${f}`, dest: `public/images/theme/${f}` })),
  ...FAVICONS.map((f) => ({ url: `${THEME}/${f}`, dest: `public/seo/${path.basename(f)}` })),
  ...UPLOADS.map((f) => ({ url: `${BASE}/wp-content/uploads/${f}`, dest: `public/images/${path.basename(f)}` })),
];

const results = await batch(jobs);
const ok = results.filter((r) => r.ok);
const bad = results.filter((r) => !r.ok);

console.log(`Downloaded ${ok.length}/${results.length}`);
ok.forEach((r) => console.log(`  ok   ${(r.bytes / 1024).toFixed(0).padStart(6)} KB  ${r.dest}`));
if (bad.length) {
  console.log('\nFAILED:');
  bad.forEach((r) => console.log(`  FAIL ${r.status}  ${r.url}`));
}
