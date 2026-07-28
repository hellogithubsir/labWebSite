// Deep DOM + computed-style dump for a page.
// node scripts/extract/dom.mjs <url> <outfile> [selector] [maxDepth]
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent } from './browser.mjs';

const url = process.argv[2];
const outFile = process.argv[3];
const selector = process.argv[4] || 'body';
const maxDepth = Number(process.argv[5] || 7);

const result = await withPage(
  async (page) => {
    await primeLazyContent(page);
    return page.evaluate(
      ({ selector, maxDepth }) => {
        const PROPS = [
          'fontSize','fontWeight','fontFamily','lineHeight','letterSpacing','color',
          'textTransform','textDecorationLine','backgroundColor','backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat',
          'padding','paddingTop','paddingRight','paddingBottom','paddingLeft',
          'margin','marginTop','marginRight','marginBottom','marginLeft',
          'width','height','maxWidth','minWidth','maxHeight','minHeight',
          'display','flexDirection','flexWrap','justifyContent','alignItems','gap','rowGap','columnGap','flex',
          'gridTemplateColumns','gridTemplateRows','gridColumn','gridRow',
          'borderRadius','borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth','borderColor','borderStyle',
          'boxShadow','overflow','overflowX','overflowY',
          'position','top','right','bottom','left','zIndex',
          'opacity','transform','transition','cursor','aspectRatio',
          'objectFit','objectPosition','mixBlendMode','filter','backdropFilter',
          'whiteSpace','textAlign','listStyleType','verticalAlign',
        ];
        const DEFAULTS = new Set(['none','normal','auto','0px','rgba(0, 0, 0, 0)','static','visible','0s','1','baseline','start','nowrap','row','ltr','','repeat','0% 0%','disc']);

        function styles(el) {
          const cs = getComputedStyle(el);
          const out = {};
          for (const p of PROPS) {
            const v = cs[p];
            if (v && !DEFAULTS.has(v)) out[p] = v;
          }
          return out;
        }

        function directText(el) {
          return [...el.childNodes]
            .filter((n) => n.nodeType === 3)
            .map((n) => n.textContent.replace(/\s+/g, ' ').trim())
            .filter(Boolean)
            .join(' ') || null;
        }

        function walk(el, depth) {
          const tag = el.tagName.toLowerCase();
          if (['script','style','noscript'].includes(tag)) return null;
          const rect = el.getBoundingClientRect();
          const node = {
            tag,
            id: el.id || undefined,
            classes: el.className?.toString().trim() || undefined,
            text: directText(el) || undefined,
            box: { w: Math.round(rect.width), h: Math.round(rect.height), top: Math.round(rect.top + window.scrollY) },
            styles: styles(el),
          };
          if (tag === 'img') node.img = { src: el.currentSrc || el.src, srcset: el.srcset || undefined, alt: el.alt, nw: el.naturalWidth, nh: el.naturalHeight, loading: el.loading };
          if (tag === 'a') node.href = el.href;
          if (tag === 'svg') { node.svg = el.outerHTML.slice(0, 4000); return node; }
          if (tag === 'video') node.video = { src: el.currentSrc || el.src, poster: el.poster, autoplay: el.autoplay, loop: el.loop, muted: el.muted };
          if (tag === 'input') node.input = { type: el.type, placeholder: el.placeholder, name: el.name };
          if (depth < maxDepth && el.children.length) {
            node.children = [...el.children].map((c) => walk(c, depth + 1)).filter(Boolean);
          } else if (el.children.length) {
            node.truncatedChildren = el.children.length;
          }
          return node;
        }

        const roots = [...document.querySelectorAll(selector)];
        return roots.map((r) => walk(r, 0));
      },
      { selector, maxDepth }
    );
  },
  { url }
);

await fs.mkdir(path.dirname(outFile), { recursive: true });
await fs.writeFile(outFile, JSON.stringify(result, null, 2));
console.log('Wrote', outFile, `(${(JSON.stringify(result).length / 1024).toFixed(0)} KB)`);
