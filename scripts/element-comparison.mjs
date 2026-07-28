import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

console.log('🔍 Detailed Element-by-Element Comparison\n');
console.log('='.repeat(80));

const origPage = await context.newPage();
const clonePage = await context.newPage();

await Promise.all([
  origPage.goto('https://mitibm.mit.edu/', { waitUntil: 'networkidle', timeout: 15000 }),
  clonePage.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 15000 })
]);

// Compare key elements
const elements = [
  { selector: '.site-header', name: 'Header' },
  { selector: '.hero h1', name: 'Hero headline' },
  { selector: '.hero', name: 'Hero section' },
  { selector: '.card', name: 'Card components', multiple: true },
  { selector: '.quick-links', name: 'Quick links' },
  { selector: '.site-footer', name: 'Footer' }
];

const results = [];

for (const elem of elements) {
  console.log(`\n${elem.name}`);
  console.log('-'.repeat(80));

  try {
    const origExists = await origPage.$(elem.selector);
    const cloneExists = await clonePage.$(elem.selector);

    if (!origExists && !cloneExists) {
      console.log('  ⚪ Both missing');
      results.push({ element: elem.name, status: 'both-missing' });
      continue;
    }

    if (!origExists || !cloneExists) {
      console.log(`  ❌ Only in ${origExists ? 'original' : 'clone'}`);
      results.push({ element: elem.name, status: 'missing', location: origExists ? 'original' : 'clone' });
      continue;
    }

    // Both exist - compare styles
    const origData = await origPage.evaluate((sel, isMultiple) => {
      const els = isMultiple ? document.querySelectorAll(sel) : [document.querySelector(sel)];
      return Array.from(els).map(el => {
        const cs = window.getComputedStyle(el);
        return {
          text: el.textContent.trim().substring(0, 100),
          position: cs.position,
          display: cs.display,
          width: cs.width,
          height: cs.height,
          marginLeft: cs.marginLeft,
          paddingTop: cs.paddingTop,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          borderTop: cs.borderTop,
          borderBottom: cs.borderBottom
        };
      });
    }, elem.selector, elem.multiple);

    const cloneData = await clonePage.evaluate((sel, isMultiple) => {
      const els = isMultiple ? document.querySelectorAll(sel) : [document.querySelector(sel)];
      return Array.from(els).map(el => {
        const cs = window.getComputedStyle(el);
        return {
          text: el.textContent.trim().substring(0, 100),
          position: cs.position,
          display: cs.display,
          width: cs.width,
          height: cs.height,
          marginLeft: cs.marginLeft,
          paddingTop: cs.paddingTop,
          backgroundColor: cs.backgroundColor,
          color: cs.color,
          fontSize: cs.fontSize,
          fontWeight: cs.fontWeight,
          borderTop: cs.borderTop,
          borderBottom: cs.borderBottom
        };
      });
    }, elem.selector, elem.multiple);

    if (elem.multiple) {
      console.log(`  Count: Original ${origData.length}, Clone ${cloneData.length}`);
      if (origData.length !== cloneData.length) {
        console.log(`  ⚠️  Different counts`);
        results.push({ element: elem.name, status: 'count-mismatch', origCount: origData.length, cloneCount: cloneData.length });
      } else {
        console.log(`  ✓ Same count (${origData.length})`);
        results.push({ element: elem.name, status: 'match', count: origData.length });
      }
    } else {
      // Compare first element
      const orig = origData[0];
      const clone = cloneData[0];

      const diffs = [];
      for (const key of Object.keys(orig)) {
        if (key === 'text') continue; // Skip text comparison
        if (orig[key] !== clone[key]) {
          diffs.push({ prop: key, orig: orig[key], clone: clone[key] });
        }
      }

      if (diffs.length === 0) {
        console.log('  ✅ Perfect match');
        results.push({ element: elem.name, status: 'perfect-match' });
      } else {
        console.log(`  ⚠️  ${diffs.length} differences:`);
        diffs.slice(0, 5).forEach(d => {
          console.log(`      ${d.prop}:`);
          console.log(`        Original: ${d.orig}`);
          console.log(`        Clone:    ${d.clone}`);
        });
        results.push({ element: elem.name, status: 'differences', diffCount: diffs.length, diffs: diffs.slice(0, 5) });
      }
    }

  } catch (err) {
    console.log(`  ❌ Error: ${err.message}`);
    results.push({ element: elem.name, status: 'error', error: err.message });
  }
}

await browser.close();

console.log('\n' + '='.repeat(80));
console.log('📊 Summary\n');

const perfect = results.filter(r => r.status === 'perfect-match').length;
const matches = results.filter(r => r.status === 'match').length;
const diffs = results.filter(r => r.status === 'differences').length;
const missing = results.filter(r => r.status === 'missing').length;

console.log(`Perfect matches: ${perfect}`);
console.log(`Count matches: ${matches}`);
console.log(`With differences: ${diffs}`);
console.log(`Missing: ${missing}`);

const total = perfect + matches + diffs + missing;
const score = ((perfect + matches) / total * 100).toFixed(1);

console.log(`\nOverall score: ${score}% (${perfect + matches}/${total} elements matched)`);

if (score >= 90) {
  console.log('✅ Clone is highly accurate!');
} else if (score >= 70) {
  console.log('⚠️  Clone is mostly accurate, minor tweaks needed');
} else {
  console.log('❌ Clone needs significant work');
}
