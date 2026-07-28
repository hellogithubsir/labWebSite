// Render a page fully and dump readable structure + screenshots.
// node scripts/extract/describe.mjs <url> <outdir>
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent, VIEWPORTS } from './browser.mjs';

const url = process.argv[2] || 'https://www.starlab.com.my/';
const outDir = process.argv[3] || 'docs/research/starlab';

await fs.mkdir(outDir, { recursive: true });

const data = await withPage(
  async (page) => {
    await primeLazyContent(page);

    await page.screenshot({
      path: path.join(outDir, 'home-desktop-full.png'),
      fullPage: true,
    });
    await page.screenshot({ path: path.join(outDir, 'home-desktop-above-fold.png') });

    return page.evaluate(() => {
      const visible = (el) => {
        const s = getComputedStyle(el);
        if (s.display === 'none' || s.visibility === 'hidden' || +s.opacity === 0) return false;
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0;
      };

      // Ordered text blocks with their tag + position
      const blocks = [];
      const seen = new Set();
      document
        .querySelectorAll('h1,h2,h3,h4,h5,h6,p,li,button,a,span,div[role="button"]')
        .forEach((el) => {
          if (!visible(el)) return;
          const text = el.innerText?.trim();
          if (!text || text.length > 600) return;
          // skip if a parent already captured identical text
          const key = text;
          if (seen.has(key)) return;
          const hasBlockChild = el.querySelector('h1,h2,h3,h4,h5,h6,p,li');
          if (hasBlockChild) return;
          seen.add(key);
          const r = el.getBoundingClientRect();
          const s = getComputedStyle(el);
          blocks.push({
            tag: el.tagName.toLowerCase(),
            text,
            href: el.getAttribute('href') || undefined,
            y: Math.round(r.top + window.scrollY),
            x: Math.round(r.left),
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            fontFamily: s.fontFamily.split(',')[0].replace(/"/g, ''),
            color: s.color,
          });
        });
      blocks.sort((a, b) => a.y - b.y || a.x - b.x);

      const nav = [...document.querySelectorAll('nav a, header a')]
        .filter(visible)
        .map((a) => ({ text: a.innerText.trim(), href: a.href }))
        .filter((a) => a.text);

      const links = [...document.querySelectorAll('a')]
        .filter(visible)
        .map((a) => ({ text: a.innerText.trim().slice(0, 80), href: a.href }));

      const images = [...document.querySelectorAll('img')]
        .filter(visible)
        .map((img) => {
          const r = img.getBoundingClientRect();
          return {
            alt: img.alt,
            src: img.currentSrc || img.src,
            w: Math.round(r.width),
            h: Math.round(r.height),
            y: Math.round(r.top + window.scrollY),
          };
        })
        .sort((a, b) => a.y - b.y);

      const videos = [...document.querySelectorAll('video')].map((v) => ({
        src: v.currentSrc || v.src,
        poster: v.poster,
      }));

      const sections = [...document.querySelectorAll('section, [data-testid], footer')]
        .filter(visible)
        .map((el) => {
          const r = el.getBoundingClientRect();
          return {
            tag: el.tagName.toLowerCase(),
            id: el.id,
            testid: el.getAttribute('data-testid'),
            y: Math.round(r.top + window.scrollY),
            h: Math.round(r.height),
            bg: getComputedStyle(el).backgroundColor,
          };
        })
        .filter((s) => s.h > 60)
        .sort((a, b) => a.y - b.y);

      return {
        url: location.href,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.content,
        pageHeight: document.body.scrollHeight,
        bodyBg: getComputedStyle(document.body).backgroundColor,
        blocks,
        nav,
        links,
        images,
        videos,
        sections,
        rawText: document.body.innerText,
      };
    });
  },
  { url, viewport: VIEWPORTS.desktop }
);

await fs.writeFile(path.join(outDir, 'home.json'), JSON.stringify(data, null, 2));
await fs.writeFile(path.join(outDir, 'home.txt'), data.rawText);

// mobile screenshot
await withPage(
  async (page) => {
    await primeLazyContent(page);
    await page.screenshot({ path: path.join(outDir, 'home-mobile-full.png'), fullPage: true });
  },
  { url, viewport: VIEWPORTS.mobile }
);

console.log('title:', data.title);
console.log('pageHeight:', data.pageHeight);
console.log('blocks:', data.blocks.length, 'images:', data.images.length, 'links:', data.links.length);
console.log('out:', outDir);
