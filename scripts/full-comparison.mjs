import { chromium } from 'playwright';

const viewports = [
  { width: 1440, height: 900, name: 'desktop' },
  { width: 768, height: 1024, name: 'tablet' },
  { width: 390, height: 844, name: 'mobile' }
];

const browser = await chromium.launch();

console.log('📸 Capturing clone screenshots at all viewports...\n');

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 15000 });

  await page.screenshot({
    path: `docs/clone-home-${vp.name}.png`,
    fullPage: true
  });

  console.log(`✓ Clone @ ${vp.width}px → docs/clone-home-${vp.name}.png`);

  await page.close();
}

await browser.close();

console.log('\n✅ All clone screenshots captured');
console.log('\n📊 Comparison files:');
console.log('  Original: docs/research/mitibm.mit.edu/screenshots/original-home-*.png');
console.log('  Clone:    docs/clone-home-*.png');
