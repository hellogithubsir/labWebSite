import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });

console.log('🔍 Rendered Content Analysis\n');

const analysis = await page.evaluate(() => {
  const body = document.body;
  const all = document.querySelectorAll('*');

  // Get all unique class names
  const classes = new Set();
  all.forEach(el => {
    if (el.className && typeof el.className === 'string') {
      el.className.split(/\s+/).forEach(c => c && classes.add(c));
    }
  });

  return {
    title: document.title,
    bodyHTML: body.innerHTML.substring(0, 2000),
    classCount: classes.size,
    topClasses: Array.from(classes).slice(0, 30).sort(),
    hasHeader: !!document.querySelector('header'),
    hasNav: !!document.querySelector('nav'),
    hasMain: !!document.querySelector('main'),
    hasFooter: !!document.querySelector('footer'),
    hasSiteHeader: !!document.querySelector('.site-header'),
    hasHero: !!document.querySelector('.hero'),
    hasCards: document.querySelectorAll('.card').length,
    allSections: Array.from(document.querySelectorAll('section')).map(s => s.className)
  };
});

console.log('Title:', analysis.title);
console.log('Has header tag:', analysis.hasHeader);
console.log('Has .site-header:', analysis.hasSiteHeader);
console.log('Has .hero:', analysis.hasHero);
console.log('Card count:', analysis.hasCards);
console.log('\nSections found:', analysis.allSections.length);
analysis.allSections.forEach((cls, i) => console.log(`  ${i+1}. ${cls || '(no class)'}`));

console.log('\nTop 30 classes:', analysis.topClasses.join(', '));

console.log('\n📸 Taking screenshot...');
await page.screenshot({ path: 'docs/clone-homepage-1440.png', fullPage: true });

await browser.close();
console.log('✅ Screenshot saved to docs/clone-homepage-1440.png');
