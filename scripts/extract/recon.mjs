// Phase 1 reconnaissance: global tokens, assets, topology, nav links.
// node scripts/extract/recon.mjs <url> <outdir>
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent } from './browser.mjs';

const url = process.argv[2] || 'https://mitibm.mit.edu/';
const outDir = process.argv[3] || 'docs/research/mitibm.mit.edu';

await fs.mkdir(outDir, { recursive: true });

const data = await withPage(
  async (page) => {
    await primeLazyContent(page);

    return page.evaluate(() => {
      const cs = (el) => getComputedStyle(el);
      const uniq = (a) => [...new Set(a.filter(Boolean))];

      // ---- fonts ----
      const fontUsage = {};
      document.querySelectorAll('body *').forEach((el) => {
        if (!el.textContent?.trim()) return;
        const s = cs(el);
        const key = `${s.fontFamily}|${s.fontWeight}|${s.fontStyle}`;
        fontUsage[key] = (fontUsage[key] || 0) + 1;
      });

      // ---- colors ----
      const colorUsage = {};
      const bgUsage = {};
      document.querySelectorAll('body *').forEach((el) => {
        const s = cs(el);
        if (el.textContent?.trim()) colorUsage[s.color] = (colorUsage[s.color] || 0) + 1;
        if (s.backgroundColor && s.backgroundColor !== 'rgba(0, 0, 0, 0)')
          bgUsage[s.backgroundColor] = (bgUsage[s.backgroundColor] || 0) + 1;
      });

      // ---- typography scale on headings/body ----
      const typeScale = {};
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'a', 'li', 'button', 'blockquote'].forEach((tag) => {
        const els = [...document.querySelectorAll(tag)].slice(0, 6);
        typeScale[tag] = els.map((el) => {
          const s = cs(el);
          return {
            text: el.textContent?.trim().slice(0, 60),
            classes: el.className?.toString().slice(0, 90),
            fontSize: s.fontSize,
            fontWeight: s.fontWeight,
            fontFamily: s.fontFamily,
            lineHeight: s.lineHeight,
            letterSpacing: s.letterSpacing,
            color: s.color,
            textTransform: s.textTransform,
          };
        });
      });

      // ---- assets ----
      const images = [...document.querySelectorAll('img')].map((img) => ({
        src: img.currentSrc || img.src,
        srcset: img.srcset || null,
        alt: img.alt,
        w: img.naturalWidth,
        h: img.naturalHeight,
        classes: img.className?.toString().slice(0, 80),
        parentClasses: img.parentElement?.className?.toString().slice(0, 80),
        position: cs(img).position,
        zIndex: cs(img).zIndex,
      }));

      const videos = [...document.querySelectorAll('video')].map((v) => ({
        src: v.currentSrc || v.src || v.querySelector('source')?.src,
        poster: v.poster,
        autoplay: v.autoplay,
        loop: v.loop,
        muted: v.muted,
        classes: v.className?.toString().slice(0, 80),
      }));

      const backgroundImages = [...document.querySelectorAll('*')]
        .map((el) => ({ el, bg: cs(el).backgroundImage }))
        .filter(({ bg }) => bg && bg !== 'none')
        .map(({ el, bg }) => ({
          url: bg,
          element: el.tagName.toLowerCase() + '.' + (el.className?.toString().split(' ')[0] || ''),
          size: cs(el).backgroundSize,
          position: cs(el).backgroundPosition,
          repeat: cs(el).backgroundRepeat,
        }));

      const favicons = [...document.querySelectorAll('link[rel*="icon"], link[rel="manifest"], link[rel="apple-touch-icon"]')].map(
        (l) => ({ rel: l.rel, href: l.href, sizes: l.sizes?.toString(), type: l.type })
      );

      const meta = {};
      document.querySelectorAll('meta[name], meta[property]').forEach((m) => {
        const k = m.getAttribute('name') || m.getAttribute('property');
        if (k) meta[k] = m.getAttribute('content');
      });

      const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map((l) => l.href);
      const scripts = [...document.querySelectorAll('script[src]')].map((s) => s.src);

      // ---- nav links (site map) ----
      const navLinks = [...document.querySelectorAll('header a[href], nav a[href]')].map((a) => ({
        text: a.textContent?.trim().slice(0, 60),
        href: a.href,
        classes: a.className?.toString().slice(0, 80),
      }));
      const footerLinks = [...document.querySelectorAll('footer a[href]')].map((a) => ({
        text: a.textContent?.trim().slice(0, 60),
        href: a.href,
      }));
      const allInternal = uniq(
        [...document.querySelectorAll('a[href]')]
          .map((a) => a.href)
          .filter((h) => h.startsWith(location.origin))
          .map((h) => h.split('#')[0].replace(/\/$/, ''))
      );

      // ---- topology: top-level sections ----
      function describe(el) {
        const s = cs(el);
        const r = el.getBoundingClientRect();
        return {
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          classes: el.className?.toString().slice(0, 120),
          top: Math.round(r.top + window.scrollY),
          height: Math.round(r.height),
          width: Math.round(r.width),
          bg: s.backgroundColor,
          bgImage: s.backgroundImage !== 'none' ? s.backgroundImage.slice(0, 200) : null,
          position: s.position,
          zIndex: s.zIndex,
          padding: s.padding,
          display: s.display,
          childCount: el.children.length,
          textPreview: el.textContent?.trim().replace(/\s+/g, ' ').slice(0, 160),
        };
      }

      const body = document.body;
      const topology = [];
      function collectSections(root, depth) {
        [...root.children].forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.height < 40 && !['header', 'nav', 'footer'].includes(el.tagName.toLowerCase())) return;
          const tag = el.tagName.toLowerCase();
          if (['script', 'style', 'noscript', 'svg'].includes(tag)) return;
          topology.push({ depth, ...describe(el) });
          if (depth < 2 && el.children.length && r.height > 200) collectSections(el, depth + 1);
        });
      }
      collectSections(body, 0);

      return {
        url: location.href,
        title: document.title,
        lang: document.documentElement.lang,
        docHeight: document.body.scrollHeight,
        htmlClasses: document.documentElement.className,
        bodyClasses: document.body.className,
        htmlStyles: {
          scrollBehavior: cs(document.documentElement).scrollBehavior,
          scrollSnapType: cs(document.documentElement).scrollSnapType,
          background: cs(document.documentElement).backgroundColor,
          fontFamily: cs(document.documentElement).fontFamily,
        },
        bodyStyles: {
          background: cs(document.body).backgroundColor,
          color: cs(document.body).color,
          fontFamily: cs(document.body).fontFamily,
          fontSize: cs(document.body).fontSize,
          lineHeight: cs(document.body).lineHeight,
          scrollSnapType: cs(document.body).scrollSnapType,
        },
        hasLenis: !!document.querySelector('.lenis, [data-lenis], .locomotive-scroll'),
        globalLibs: {
          jquery: typeof window.jQuery !== 'undefined',
          gsap: typeof window.gsap !== 'undefined',
          swiper: !!document.querySelector('.swiper, .swiper-container'),
          slick: !!document.querySelector('.slick-slider'),
          aos: !!document.querySelector('[data-aos]'),
          wp: !!document.querySelector('link[href*="wp-content"], script[src*="wp-content"]'),
        },
        fontUsage: Object.entries(fontUsage).sort((a, b) => b[1] - a[1]).slice(0, 20),
        colorUsage: Object.entries(colorUsage).sort((a, b) => b[1] - a[1]).slice(0, 25),
        bgUsage: Object.entries(bgUsage).sort((a, b) => b[1] - a[1]).slice(0, 25),
        typeScale,
        images,
        videos,
        backgroundImages,
        favicons,
        meta,
        stylesheets,
        scripts,
        navLinks,
        footerLinks,
        allInternal,
        topology,
        svgCount: document.querySelectorAll('svg').length,
      };
    });
  },
  { url }
);

await fs.writeFile(path.join(outDir, 'recon.json'), JSON.stringify(data, null, 2));
console.log('Wrote', path.join(outDir, 'recon.json'));
console.log('title:', data.title);
console.log('docHeight:', data.docHeight, '| images:', data.images.length, '| videos:', data.videos.length, '| svg:', data.svgCount);
console.log('internal pages:', data.allInternal.length);
