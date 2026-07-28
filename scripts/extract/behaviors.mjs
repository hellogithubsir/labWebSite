// Interaction sweep: scroll / click / hover / responsive behavior discovery.
import fs from 'node:fs/promises';
import { withPage, primeLazyContent, VIEWPORTS } from './browser.mjs';

const url = process.argv[2] || 'https://mitibm.mit.edu/';
const outFile = process.argv[3] || 'docs/research/mitibm.mit.edu/behaviors.json';

const WATCH = [
  'header.site-header',
  '.site-header--toggle',
  '.site-header--nav',
  '.scrolling-wrap',
  '.scrolling-wrap--inner',
  '.hero',
  '.site-header--rail, .rail, .vertical-nav',
];

const snapProps = [
  'position','top','left','right','bottom','width','height','maxWidth','transform','opacity',
  'backgroundColor','boxShadow','borderRadius','zIndex','visibility','display','pointerEvents',
  'transition','overflow','padding','color','mixBlendMode',
];

const result = await withPage(
  async (page) => {
    await primeLazyContent(page);

    const snapshot = (label) =>
      page.evaluate(
        ({ WATCH, snapProps, label }) => {
          const out = { label, scrollY: window.scrollY, els: {} };
          WATCH.forEach((sel) => {
            const el = document.querySelector(sel);
            if (!el) return;
            const cs = getComputedStyle(el);
            const r = el.getBoundingClientRect();
            const o = { rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }, classes: el.className?.toString() };
            snapProps.forEach((p) => (o[p] = cs[p]));
            out.els[sel] = o;
          });
          out.bodyClasses = document.body.className;
          out.htmlClasses = document.documentElement.className;
          return out;
        },
        { WATCH, snapProps, label }
      );

    const scrollTo = async (y) => {
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(900);
    };

    // --- scroll states ---
    const scrollStates = [];
    for (const y of [0, 100, 300, 800, 1600, 2600, 3600]) {
      await scrollTo(y);
      scrollStates.push(await snapshot(`scroll-${y}`));
    }
    await scrollTo(0);

    // --- CSS transitions declared anywhere ---
    const transitions = await page.evaluate(() => {
      const seen = {};
      document.querySelectorAll('body *').forEach((el) => {
        const cs = getComputedStyle(el);
        if (cs.transition && cs.transition !== 'all 0s ease 0s' && !cs.transition.startsWith('all 0s')) {
          const key = el.tagName.toLowerCase() + '.' + (el.className?.toString().split(' ').slice(0, 3).join('.') || '');
          if (!seen[key]) seen[key] = cs.transition;
        }
        if (cs.animationName && cs.animationName !== 'none') {
          seen[key + ' @anim'] = `${cs.animationName} ${cs.animationDuration} ${cs.animationTimingFunction}`;
        }
      });
      return seen;
    });

    // --- menu toggle behavior ---
    let menuToggle = null;
    const toggle = await page.$('.site-header--toggle, [class*="toggle"]');
    if (toggle) {
      const before = await snapshot('menu-closed');
      await toggle.click().catch(() => {});
      await page.waitForTimeout(1200);
      const after = await snapshot('menu-open');
      const openScreenshot = 'docs/design-references/mitibm.mit.edu/home-desktop-menu-open.png';
      await page.screenshot({ path: openScreenshot });
      const openDom = await page.evaluate(() => {
        const h = document.querySelector('header');
        return h ? h.outerHTML.slice(0, 20000) : null;
      });
      menuToggle = { before, after, openScreenshot, openDomLen: openDom?.length };
      await fs.writeFile('docs/research/mitibm.mit.edu/header-menu-open.html', openDom || '');
      await toggle.click().catch(() => {});
      await page.waitForTimeout(800);
    }

    // --- hover states on cards / links ---
    const hoverTargets = await page.evaluate(() =>
      [...document.querySelectorAll('a')]
        .filter((a) => a.getBoundingClientRect().height > 20)
        .slice(0, 40)
        .map((a, i) => ({ i, text: a.textContent?.trim().slice(0, 40), classes: a.className?.toString().slice(0, 80), href: a.href }))
    );

    const hovers = [];
    for (const t of hoverTargets.slice(0, 14)) {
      const data = await page.evaluate(async (idx) => {
        const a = [...document.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().height > 20)[idx];
        if (!a) return null;
        const props = ['color','backgroundColor','textDecorationLine','opacity','transform','boxShadow','borderColor','filter'];
        const read = (el) => { const cs = getComputedStyle(el); const o = {}; props.forEach((p) => (o[p] = cs[p])); return o; };
        const inner = a.querySelector('img, h2, h3, .card, div');
        const before = { self: read(a), inner: inner ? read(inner) : null };
        return { before, classes: a.className?.toString().slice(0, 80), text: a.textContent?.trim().slice(0, 40) };
      }, t.i);
      if (!data) continue;
      const handle = (await page.$$('a'))[0];
      // hover via mouse over bounding box
      const box = await page.evaluate((idx) => {
        const a = [...document.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().height > 20)[idx];
        const r = a.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2, inView: r.top > 0 && r.bottom < window.innerHeight };
      }, t.i);
      if (!box.inView) {
        await page.evaluate((idx) => {
          const a = [...document.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().height > 20)[idx];
          a.scrollIntoView({ block: 'center' });
        }, t.i);
        await page.waitForTimeout(500);
      }
      const box2 = await page.evaluate((idx) => {
        const a = [...document.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().height > 20)[idx];
        const r = a.getBoundingClientRect();
        return { x: r.x + r.width / 2, y: r.y + r.height / 2 };
      }, t.i);
      await page.mouse.move(box2.x, box2.y);
      await page.waitForTimeout(600);
      const after = await page.evaluate((idx) => {
        const a = [...document.querySelectorAll('a')].filter((x) => x.getBoundingClientRect().height > 20)[idx];
        const props = ['color','backgroundColor','textDecorationLine','opacity','transform','boxShadow','borderColor','filter'];
        const read = (el) => { const cs = getComputedStyle(el); const o = {}; props.forEach((p) => (o[p] = cs[p])); return o; };
        const inner = a.querySelector('img, h2, h3, .card, div');
        return { self: read(a), inner: inner ? read(inner) : null };
      }, t.i);
      const diff = {};
      for (const k of Object.keys(data.before.self)) if (data.before.self[k] !== after.self[k]) diff['self.' + k] = [data.before.self[k], after.self[k]];
      if (data.before.inner && after.inner) for (const k of Object.keys(data.before.inner)) if (data.before.inner[k] !== after.inner[k]) diff['inner.' + k] = [data.before.inner[k], after.inner[k]];
      if (Object.keys(diff).length) hovers.push({ text: data.text, classes: data.classes, diff });
      await page.mouse.move(5, 5);
      await page.waitForTimeout(200);
    }

    return { scrollStates, transitions, menuToggle, hovers, hoverTargets };
  },
  { url, viewport: VIEWPORTS.desktop }
);

await fs.writeFile(outFile, JSON.stringify(result, null, 2));
console.log('Wrote', outFile);
console.log('hover diffs:', result.hovers.length, '| transitions:', Object.keys(result.transitions).length);
