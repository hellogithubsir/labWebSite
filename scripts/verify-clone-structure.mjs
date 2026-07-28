import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(1000);

console.log('🔍 Clone Site Structure Analysis\n');

// Check what classes actually exist
const structure = await page.evaluate(() => {
  const result = {
    header: null,
    container: null,
    hero: null,
    cards: null,
    footer: null
  };

  // Find header
  const headerCandidates = ['site-header', 'header', 'nav', '[role="banner"]'];
  for (const sel of headerCandidates) {
    const el = document.querySelector(sel);
    if (el) {
      result.header = {
        selector: sel,
        classes: el.className,
        position: window.getComputedStyle(el).position,
        height: window.getComputedStyle(el).height
      };
      break;
    }
  }

  // Find container
  const containerCandidates = ['content-container', '.container', 'main', '[role="main"]'];
  for (const sel of containerCandidates) {
    const el = document.querySelector(sel);
    if (el) {
      result.container = {
        selector: sel,
        classes: el.className,
        marginLeft: window.getComputedStyle(el).marginLeft,
        width: window.getComputedStyle(el).width
      };
      break;
    }
  }

  // Find hero
  const heroCandidates = ['.hero', '.page-section--hero', '[class*="hero"]'];
  for (const sel of heroCandidates) {
    const el = document.querySelector(sel);
    if (el) {
      result.hero = {
        selector: sel,
        classes: el.className
      };
      break;
    }
  }

  // Find cards
  const cardCandidates = ['.card', '[class*="card"]', 'article'];
  for (const sel of cardCandidates) {
    const els = document.querySelectorAll(sel);
    if (els.length > 0) {
      result.cards = {
        selector: sel,
        count: els.length,
        firstClasses: els[0].className
      };
      break;
    }
  }

  // Find footer
  const footerCandidates = ['site-footer', 'footer', '[role="contentinfo"]'];
  for (const sel of footerCandidates) {
    const el = document.querySelector(sel);
    if (el) {
      result.footer = {
        selector: sel,
        classes: el.className,
        backgroundColor: window.getComputedStyle(el).backgroundColor
      };
      break;
    }
  }

  return result;
});

console.log('Header:', structure.header || '❌ Not found');
console.log('Container:', structure.container || '❌ Not found');
console.log('Hero:', structure.hero || '❌ Not found');
console.log('Cards:', structure.cards || '❌ Not found');
console.log('Footer:', structure.footer || '❌ Not found');

await browser.close();
