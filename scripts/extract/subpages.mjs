// Batch: screenshot + DOM + content for multiple pages.
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent, VIEWPORTS } from './browser.mjs';

const PAGES = [
  { slug: 'research', url: 'https://mitibm.mit.edu/research/' },
  { slug: 'news', url: 'https://mitibm.mit.edu/news/' },
  { slug: 'about', url: 'https://mitibm.mit.edu/about/' },
  { slug: 'people', url: 'https://mitibm.mit.edu/about/people/' },
  { slug: 'contact', url: 'https://mitibm.mit.edu/about/contact/' },
];

const RESEARCH = 'docs/research/mitibm.mit.edu';
const REFS = 'docs/design-references/mitibm.mit.edu';
await fs.mkdir(RESEARCH, { recursive: true });
await fs.mkdir(REFS, { recursive: true });

const only = process.argv[2];
const targets = only ? PAGES.filter((p) => p.slug === only) : PAGES;

for (const { slug, url } of targets) {
  console.log('=== ', slug, url);
  try {
    await withPage(
      async (page) => {
        await primeLazyContent(page);
        await page.evaluate(() => {
          document
            .querySelectorAll('#truste-consent-track, .truste_box_overlay, #consent_blackbar, .trustarc-banner')
            .forEach((el) => el.remove());
        });
        await page.waitForTimeout(400);
        await page.screenshot({ path: path.join(REFS, `${slug}-desktop-full.png`), fullPage: true });
        await page.screenshot({ path: path.join(REFS, `${slug}-desktop-viewport.png`) });

        const dom = await page.evaluate(() => {
          const PROPS = ['fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','backgroundColor','backgroundImage','padding','margin','width','height','maxWidth','display','flexDirection','justifyContent','alignItems','gap','gridTemplateColumns','borderRadius','borderTopWidth','borderBottomWidth','borderColor','boxShadow','position','top','left','zIndex','opacity','transform','transition','objectFit','aspectRatio','textAlign'];
          const DEF = new Set(['none','normal','auto','0px','rgba(0, 0, 0, 0)','static','visible','0s','1','']);
          const st = (el) => { const cs = getComputedStyle(el); const o = {}; PROPS.forEach(p => { const v = cs[p]; if (v && !DEF.has(v)) o[p]=v; }); return o; };
          const dtext = (el) => [...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.replace(/\s+/g,' ').trim()).filter(Boolean).join(' ')||null;
          function walk(el, d) {
            const tag = el.tagName.toLowerCase();
            if (['script','style','noscript'].includes(tag)) return null;
            const r = el.getBoundingClientRect();
            const n = { tag, id: el.id||undefined, classes: el.className?.toString().trim()||undefined, text: dtext(el)||undefined, box:{w:Math.round(r.width),h:Math.round(r.height),top:Math.round(r.top+window.scrollY)}, styles: st(el) };
            if (tag==='img') n.img={src:el.currentSrc||el.src,alt:el.alt,nw:el.naturalWidth,nh:el.naturalHeight};
            if (tag==='a') n.href=el.href;
            if (tag==='input') n.input={type:el.type,placeholder:el.placeholder,name:el.name};
            if (d<7 && el.children.length) n.children=[...el.children].map(c=>walk(c,d+1)).filter(Boolean);
            return n;
          }
          return [...document.querySelectorAll('body > .scrolling-wrap, body > footer')].map(r=>walk(r,0));
        });
        await fs.writeFile(path.join(RESEARCH, `dom-${slug}.json`), JSON.stringify(dom, null, 2));

        const content = await page.evaluate(() => ({
          title: document.title,
          h1: [...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),
          h2: [...document.querySelectorAll('h2')].map(e=>e.textContent.trim()),
          h3: [...document.querySelectorAll('h3')].map(e=>e.textContent.trim()),
          images: [...document.querySelectorAll('img')].map(i=>({src:i.currentSrc||i.src,alt:i.alt,w:i.naturalWidth,h:i.naturalHeight})),
          links: [...document.querySelectorAll('#content a[href]')].map(a=>({text:a.textContent.trim().slice(0,80),href:a.href})),
          bodyText: document.querySelector('#content')?.innerText.slice(0, 12000),
        }));
        await fs.writeFile(path.join(RESEARCH, `content-${slug}.json`), JSON.stringify(content, null, 2));
        console.log('   ok  h1:', content.h1[0]?.slice(0,60), '| imgs:', content.images.length);
      },
      { url, viewport: VIEWPORTS.desktop }
    );

    // mobile screenshot
    await withPage(
      async (page) => {
        await primeLazyContent(page);
        await page.evaluate(() => {
          document.querySelectorAll('#truste-consent-track, .truste_box_overlay, #consent_blackbar').forEach(el=>el.remove());
        });
        await page.screenshot({ path: path.join(REFS, `${slug}-mobile-full.png`), fullPage: true });
      },
      { url, viewport: VIEWPORTS.mobile }
    );
  } catch (e) {
    console.error('   FAILED', slug, e.message);
  }
}
