// Multi-viewport screenshots: full page + per-section.
// node scripts/extract/screenshot.mjs <url> <outdir> <slug>
import fs from 'node:fs/promises';
import path from 'node:path';
import { withPage, primeLazyContent, VIEWPORTS } from './browser.mjs';

const url = process.argv[2];
const outDir = process.argv[3];
const slug = process.argv[4] || 'home';

await fs.mkdir(outDir, { recursive: true });

for (const [name, viewport] of Object.entries(VIEWPORTS)) {
  await withPage(
    async (page) => {
      await primeLazyContent(page);
      // Dismiss cookie/consent banners that overlay the page.
      await page.evaluate(() => {
        document
          .querySelectorAll('#truste-consent-track, .truste_box_overlay, #consent_blackbar, .trustarc-banner')
          .forEach((el) => el.remove());
      });
      await page.waitForTimeout(500);
      const full = path.join(outDir, `${slug}-${name}-full.png`);
      await page.screenshot({ path: full, fullPage: true });
      const above = path.join(outDir, `${slug}-${name}-viewport.png`);
      await page.screenshot({ path: above });
      console.log('  ', name, viewport.width, '->', full);
    },
    { url, viewport }
  );
}
