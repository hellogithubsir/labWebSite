const { chromium } = require('playwright');

const ROUTES = [
  { path: '/', name: 'home' },
  { path: '/research', name: 'research' },
  { path: '/news', name: 'news' },
  { path: '/about', name: 'about' },
  { path: '/about/people', name: 'people' },
  { path: '/about/contact', name: 'contact' },
];

const VIEWPORTS = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const viewport of VIEWPORTS) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    console.log(`\n=== ${viewport.name} (${viewport.width}×${viewport.height}) ===`);

    for (const route of ROUTES) {
      const url = `http://localhost:3000${route.path}`;
      console.log(`  Capturing ${route.name}...`);

      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000); // Let fonts/images settle

      const filename = `docs/design-references/clone-${route.name}-${viewport.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });
      console.log(`    ✓ ${filename}`);
    }
  }

  await browser.close();
  console.log('\n✓ All screenshots captured');
})();
