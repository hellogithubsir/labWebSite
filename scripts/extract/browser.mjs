// Shared Playwright helper for site extraction.
// Usage: import { withPage } from './browser.mjs'
import { chromium } from 'playwright';

export const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 390, height: 844 },
};

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

export async function withPage(fn, { viewport = VIEWPORTS.desktop, url } = {}) {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport,
    userAgent: UA,
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();
  try {
    if (url) {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      // The site keeps analytics sockets open, so networkidle never settles.
      await page.waitForLoadState('load', { timeout: 45000 }).catch(() => {});
      await page.waitForTimeout(2500);
    }
    return await fn(page, { browser, context });
  } finally {
    await browser.close();
  }
}

/** Scroll the full page slowly so lazy content / scroll animations fire. */
export async function primeLazyContent(page) {
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 250));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await page.waitForTimeout(800);
}
