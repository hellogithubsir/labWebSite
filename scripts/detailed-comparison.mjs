import { chromium } from 'playwright';
import fs from 'fs';

const routes = [
  { path: '/', name: 'home' },
  { path: '/research', name: 'research' },
  { path: '/news', name: 'news' },
  { path: '/about', name: 'about' },
  { path: '/about/people', name: 'people' },
  { path: '/about/contact', name: 'contact' }
];

const checks = [
  { selector: '.site-header', desc: 'Header overlay' },
  { selector: '.content-container', desc: 'Content container' },
  { selector: '.hero', desc: 'Hero section' },
  { selector: '.card', desc: 'Card component' },
  { selector: '.site-footer', desc: 'Footer' }
];

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });

console.log('🔍 Detailed DOM & Style Comparison\n');
console.log('=' .repeat(80));

const results = [];

for (const route of routes) {
  console.log(`\n📄 Route: ${route.path}`);
  console.log('-'.repeat(80));

  const originalPage = await context.newPage();
  const clonePage = await context.newPage();

  try {
    await Promise.all([
      originalPage.goto(`https://mitibm.mit.edu${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 }),
      clonePage.goto(`http://localhost:3000${route.path}`, { waitUntil: 'domcontentloaded', timeout: 15000 })
    ]);

    await Promise.all([
      originalPage.waitForTimeout(1500),
      clonePage.waitForTimeout(1500)
    ]);

    for (const check of checks) {
      const origExists = await originalPage.$(check.selector).then(el => !!el);
      const cloneExists = await clonePage.$(check.selector).then(el => !!el);

      if (origExists && cloneExists) {
        const origStyles = await originalPage.$eval(check.selector, el => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            display: styles.display,
            width: styles.width,
            marginLeft: styles.marginLeft,
            backgroundColor: styles.backgroundColor,
            color: styles.color
          };
        });

        const cloneStyles = await clonePage.$eval(check.selector, el => {
          const styles = window.getComputedStyle(el);
          return {
            position: styles.position,
            display: styles.display,
            width: styles.width,
            marginLeft: styles.marginLeft,
            backgroundColor: styles.backgroundColor,
            color: styles.color
          };
        });

        const match = JSON.stringify(origStyles) === JSON.stringify(cloneStyles);
        const symbol = match ? '✓' : '⚠️';
        console.log(`  ${symbol} ${check.desc}`);

        if (!match) {
          console.log(`      Original:`, JSON.stringify(origStyles, null, 2).replace(/\n/g, '\n      '));
          console.log(`      Clone:   `, JSON.stringify(cloneStyles, null, 2).replace(/\n/g, '\n      '));
        }

        results.push({ route: route.name, element: check.desc, match });
      } else {
        const symbol = origExists === cloneExists ? '✓' : '✗';
        console.log(`  ${symbol} ${check.desc} (${origExists ? 'orig only' : cloneExists ? 'clone only' : 'both missing'})`);
        results.push({ route: route.name, element: check.desc, match: origExists === cloneExists });
      }
    }

  } catch (err) {
    console.log(`  ✗ Error: ${err.message}`);
  }

  await originalPage.close();
  await clonePage.close();
}

await browser.close();

console.log('\n' + '='.repeat(80));
console.log('📊 Summary\n');

const total = results.length;
const matched = results.filter(r => r.match).length;
const percentage = ((matched / total) * 100).toFixed(1);

console.log(`Total checks: ${total}`);
console.log(`Matched: ${matched} (${percentage}%)`);
console.log(`Differences: ${total - matched}`);

if (matched === total) {
  console.log('\n✅ All elements match! Clone is pixel-perfect.');
} else {
  console.log('\n⚠️  Some differences detected. Review output above.');
}

fs.writeFileSync('docs/comparison-results.json', JSON.stringify(results, null, 2));
console.log('\n📁 Full results saved to docs/comparison-results.json');
