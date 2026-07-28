// Probe: what renders the pixel-grid hero graphics? canvas / svg / img / css?
import { withPage, primeLazyContent } from './browser.mjs';

const url = process.argv[2] || 'https://mitibm.mit.edu/';

const out = await withPage(
  async (page) => {
    const consoleMsgs = [];
    page.on('console', (m) => consoleMsgs.push(m.type() + ': ' + m.text().slice(0, 200)));
    await primeLazyContent(page);

    return page.evaluate(() => {
      const desc = (el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          classes: el.className?.toString().slice(0, 150),
          w: Math.round(r.width),
          h: Math.round(r.height),
          top: Math.round(r.top + window.scrollY),
          left: Math.round(r.left),
          position: cs.position,
          zIndex: cs.zIndex,
          display: cs.display,
          attrs: [...el.attributes].map((a) => `${a.name}="${a.value.slice(0, 160)}"`),
          parent: el.parentElement ? el.parentElement.tagName.toLowerCase() + '.' + el.parentElement.className?.toString().slice(0, 80) : null,
        };
      };

      return {
        canvases: [...document.querySelectorAll('canvas')].map(desc),
        svgs: [...document.querySelectorAll('svg')].map((s) => ({ ...desc(s), outerHTML: s.outerHTML.slice(0, 600) })),
        objects: [...document.querySelectorAll('object, embed, iframe')].map(desc),
        // any element whose class hints at the graphic
        graphicish: [...document.querySelectorAll('[class*="graphic"],[class*="pixel"],[class*="anim"],[class*="hero"],[class*="shape"],[class*="art"],[class*="visual"],[class*="glyph"]')].map(desc),
        headerHTML: document.querySelector('header')?.outerHTML.slice(0, 12000),
        themeAssets: [...document.querySelectorAll('link[href*="/themes/"], script[src*="/themes/"]')].map((e) => e.href || e.src),
      };
    });
  },
  { url }
);

console.log(JSON.stringify(out, null, 2));
