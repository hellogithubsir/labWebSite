import { chromium } from 'playwright';

const routes = [
  { path: '/', name: 'home' },
  { path: '/research', name: 'research' },
  { path: '/news', name: 'news' },
  { path: '/about', name: 'about' },
  { path: '/about/people', name: 'people' },
  { path: '/about/contact', name: 'contact' }
];

const viewports = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' }
];

const browser = await chromium.launch();
const context = await browser.newContext();

console.log('📸 Capturing original site screenshots for comparison...\n');

for (const route of routes) {
  for (const viewport of viewports) {
    const page = await context.newPage();
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    try {
      await page.goto(`https://mitibm.mit.edu${route.path}`, {
        waitUntil: 'domcontentloaded',
        timeout: 15000
      });

      await page.waitForTimeout(2000);

      const filename = `docs/research/mitibm.mit.edu/screenshots/original-${route.name}-${viewport.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`✓ ${route.name} @ ${viewport.width}px`);

    } catch (err) {
      console.log(`✗ ${route.name} @ ${viewport.width}px - ${err.message}`);
    }

    await page.close();
  }
}

await browser.close();
console.log('\n✅ Original site screenshots captured');
