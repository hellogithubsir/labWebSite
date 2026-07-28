// Targeted deep extraction of one selector, unlimited depth, verbatim text.
// node scripts/extract/section.mjs <url> <selector> <outfile>
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent, VIEWPORTS } from './browser.mjs';

const url = process.argv[2];
const selector = process.argv[3];
const outFile = process.argv[4];
const vpName = process.argv[5] || 'desktop';

const result = await withPage(
  async (page) => {
    await primeLazyContent(page);
    return page.evaluate((selector) => {
      const PROPS = [
        'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color','textTransform','textDecorationLine','textAlign',
        'backgroundColor','backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat','backgroundClip','webkitTextFillColor',
        'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
        'margin','marginTop','marginRight','marginBottom','marginLeft',
        'width','height','maxWidth','minWidth','maxHeight','minHeight','boxSizing',
        'display','flexDirection','flexWrap','justifyContent','alignItems','alignSelf','gap','rowGap','columnGap','flex','flexGrow','flexBasis','order',
        'gridTemplateColumns','gridTemplateRows','gridColumn','gridRow','gridGap',
        'borderRadius','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderTopColor','borderBottomColor','borderLeftColor','borderRightColor','borderStyle',
        'boxShadow','overflow','overflowX','overflowY',
        'position','top','right','bottom','left','zIndex',
        'opacity','transform','transformOrigin','transition','cursor','aspectRatio','writingMode','textOrientation',
        'objectFit','objectPosition','mixBlendMode','filter','backdropFilter','pointerEvents',
        'whiteSpace','listStyleType','verticalAlign','wordBreak','float','clear',
      ];
      const DEF = new Set(['none','normal','auto','0px','rgba(0, 0, 0, 0)','static','visible','0s','1','baseline','start','nowrap','row','','repeat','0% 0%','disc','border-box','content-box','horizontal-tb','mixed','currentcolor','padding-box','50% 50%','0 0','matrix(1, 0, 0, 1, 0, 0)']);

      function st(el) {
        const cs = getComputedStyle(el);
        const o = {};
        PROPS.forEach((p) => { const v = cs[p]; if (v && !DEF.has(v)) o[p] = v; });
        // pseudo elements
        ['::before','::after'].forEach((pe) => {
          const p = getComputedStyle(el, pe);
          if (p.content && p.content !== 'none') {
            const po = {};
            PROPS.forEach((k) => { const v = p[k]; if (v && !DEF.has(v)) po[k] = v; });
            po.content = p.content;
            if (Object.keys(po).length > 1) o[pe] = po;
          }
        });
        return o;
      }
      const dtext = (el) => [...el.childNodes].filter(n=>n.nodeType===3).map(n=>n.textContent.replace(/\s+/g,' ').trim()).filter(Boolean).join(' ')||null;

      function walk(el, d) {
        const tag = el.tagName.toLowerCase();
        if (['script','style','noscript'].includes(tag)) return null;
        const r = el.getBoundingClientRect();
        const n = {
          tag, id: el.id||undefined, classes: el.className?.toString().trim()||undefined,
          text: dtext(el)||undefined,
          fullText: el.children.length === 0 ? el.textContent.replace(/\s+/g,' ').trim() || undefined : undefined,
          html: el.children.length && el.children.length <= 6 && el.innerHTML.length < 900 ? el.innerHTML.replace(/\s+/g,' ').trim() : undefined,
          box: { w: +r.width.toFixed(1), h: +r.height.toFixed(1), top: Math.round(r.top + window.scrollY), left: +r.left.toFixed(1) },
          styles: st(el),
        };
        if (tag==='img') n.img={src:el.currentSrc||el.src,srcset:el.srcset||undefined,sizes:el.sizes||undefined,alt:el.alt,nw:el.naturalWidth,nh:el.naturalHeight,loading:el.loading,dataSrc:el.dataset.src};
        if (tag==='a') { n.href=el.href; n.ariaLabel=el.getAttribute('aria-label')||undefined; }
        if (tag==='svg') { n.svg=el.outerHTML; return n; }
        if (tag==='input') n.input={type:el.type,placeholder:el.placeholder,name:el.name,value:el.value};
        if (tag==='video') n.video={src:el.currentSrc||el.src,poster:el.poster,autoplay:el.autoplay,loop:el.loop,muted:el.muted};
        if (el.children.length) n.children=[...el.children].map(c=>walk(c,d+1)).filter(Boolean);
        return n;
      }
      return [...document.querySelectorAll(selector)].map(el=>walk(el,0));
    }, selector);
  },
  { url, viewport: VIEWPORTS[vpName] }
);

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(result, null, 2));
console.log('Wrote', outFile, `${result.length} root(s)`, `${(JSON.stringify(result).length/1024).toFixed(0)} KB`);
