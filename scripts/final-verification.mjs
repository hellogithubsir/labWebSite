import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';

const browser = await chromium.launch();
const page = await browser.newPage();

console.log('🔍 Clone 首页完整性验证\n');
console.log('='.repeat(80));

await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });

// 1. 结构完整性检查
console.log('\n📐 结构完整性');
console.log('-'.repeat(80));

const structure = await page.evaluate(() => {
  const checks = {
    header: {
      exists: !!document.querySelector('.site-header'),
      logo: !!document.querySelector('.site-toggle'),
      railWord: !!document.querySelector('.rail-word'),
      sectionRail: !!document.querySelector('.section-rail'),
      railItems: document.querySelectorAll('.rail-item').length,
      searchLink: !!document.querySelector('.search-link'),
      emailLink: !!document.querySelector('.email-link')
    },
    hero: {
      exists: !!document.querySelector('.hero'),
      heading: !!document.querySelector('.hero h1'),
      image: !!document.querySelector('.hero img'),
      desktopImage: !!document.querySelector('.d-lg-block'),
      mobileImage: !!document.querySelector('.d-lg-none')
    },
    introCopy: {
      exists: !!document.querySelector('.type-l'),
      hasLink: !!document.querySelector('.type-l a'),
      hasCTA: document.body.textContent.includes('Inside the Lab')
    },
    spotlight: {
      exists: !!document.querySelector('.content-blocks'),
      cardCount: document.querySelectorAll('.card').length,
      allHaveImages: document.querySelectorAll('.card .card-image img').length,
      allHaveTitles: document.querySelectorAll('.card .card-title').length
    },
    quickLinks: {
      exists: !!document.querySelector('.quick-links'),
      hasLabel: !!document.querySelector('.quick-label'),
      linkCount: document.querySelectorAll('.quick-links a').length
    },
    schwarzman: {
      exists: document.body.textContent.includes('Schwarzman College') || !!document.querySelector('img[alt*="Schwarzman"]'),
      hasLogo: !!document.querySelector('img[src*="scc-logo"]')
    },
    footer: {
      exists: !!document.querySelector('.site-footer'),
      rowCount: document.querySelectorAll('.footer-row').length,
      hasWordmark: document.body.textContent.includes('MIT-IBM Watson AI Lab'),
      hasLegal: !!document.querySelector('.legal-links')
    }
  };
  return checks;
});

// 输出检查结果
for (const [section, checks] of Object.entries(structure)) {
  console.log(`\n${section.toUpperCase()}`);
  for (const [key, value] of Object.entries(checks)) {
    const status = value === true || (typeof value === 'number' && value > 0) ? '✅' : '❌';
    console.log(`  ${status} ${key}: ${value}`);
  }
}

// 2. 样式一致性检查
console.log('\n\n🎨 样式一致性（关键元素）');
console.log('-'.repeat(80));

const styles = await page.evaluate(() => {
  const getStyle = (sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const cs = window.getComputedStyle(el);
    return {
      fontSize: cs.fontSize,
      fontWeight: cs.fontWeight,
      color: cs.color,
      backgroundColor: cs.backgroundColor,
      marginLeft: cs.marginLeft,
      width: cs.width
    };
  };

  return {
    heroHeading: getStyle('.hero h1'),
    cardBackground: getStyle('.card'),
    contentContainer: getStyle('.content-container'),
    footerBg: getStyle('.site-footer')
  };
});

for (const [elem, style] of Object.entries(styles)) {
  if (style) {
    console.log(`\n${elem}:`);
    for (const [prop, val] of Object.entries(style)) {
      console.log(`  ${prop}: ${val}`);
    }
  } else {
    console.log(`\n${elem}: ❌ 未找到`);
  }
}

// 3. 内容完整性检查
console.log('\n\n📝 内容完整性');
console.log('-'.repeat(80));

const content = await page.evaluate(() => {
  const text = document.body.textContent;
  return {
    hasHeroText: text.includes('Building the future of computing together'),
    hasIntroText: text.includes('collaborative research'),
    hasSpotlightCards: text.includes('MIT-IBM'),
    hasQuickLinks: text.includes('Quick links'),
    hasFooterAddress: text.includes('314 Main Street'),
    hasNavSections: text.includes('Research') && text.includes('News') && text.includes('Inside the Lab')
  };
});

for (const [key, value] of Object.entries(content)) {
  const status = value ? '✅' : '❌';
  console.log(`  ${status} ${key}`);
}

// 4. 响应式检查
console.log('\n\n📱 响应式检查');
console.log('-'.repeat(80));

const viewports = [
  { name: 'Desktop', width: 1440, height: 900 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Mobile', width: 390, height: 844 }
];

const responsiveChecks = [];

for (const vp of viewports) {
  await page.setViewportSize({ width: vp.width, height: vp.height });
  await page.waitForTimeout(500);

  const check = await page.evaluate(() => {
    const container = document.querySelector('.content-container');
    const cs = container ? window.getComputedStyle(container) : null;
    return {
      containerMarginLeft: cs?.marginLeft || 'N/A',
      containerWidth: cs?.width || 'N/A',
      cardCount: document.querySelectorAll('.card').length
    };
  });

  responsiveChecks.push({ viewport: vp.name, ...check });
  console.log(`\n${vp.name} (${vp.width}×${vp.height})`);
  console.log(`  Container margin-left: ${check.containerMarginLeft}`);
  console.log(`  Container width: ${check.containerWidth}`);
  console.log(`  Visible cards: ${check.cardCount}`);
}

// 5. 生成最终报告
await page.setViewportSize({ width: 1440, height: 900 });

const report = {
  timestamp: new Date().toISOString(),
  structure,
  styles,
  content,
  responsive: responsiveChecks,
  summary: {
    structureScore: Object.values(structure).reduce((sum, section) =>
      sum + Object.values(section).filter(v => v === true || (typeof v === 'number' && v > 0)).length, 0),
    contentScore: Object.values(content).filter(v => v).length,
    totalContentChecks: Object.keys(content).length
  }
};

await writeFile('docs/clone-verification-report.json', JSON.stringify(report, null, 2));

console.log('\n\n' + '='.repeat(80));
console.log('📊 总结\n');

const structureTotal = Object.values(structure).reduce((sum, section) => sum + Object.keys(section).length, 0);
const structurePassed = report.summary.structureScore;
const contentPassed = report.summary.contentScore;
const contentTotal = report.summary.totalContentChecks;

console.log(`结构完整性: ${structurePassed}/${structureTotal} 项通过 (${(structurePassed/structureTotal*100).toFixed(1)}%)`);
console.log(`内容完整性: ${contentPassed}/${contentTotal} 项通过 (${(contentPassed/contentTotal*100).toFixed(1)}%)`);

const overallScore = ((structurePassed + contentPassed) / (structureTotal + contentTotal) * 100).toFixed(1);
console.log(`\n总体完成度: ${overallScore}%`);

if (overallScore >= 95) {
  console.log('\n✅ 首页克隆质量优秀！');
} else if (overallScore >= 85) {
  console.log('\n⚠️  首页基本完成，有少量细节需优化');
} else {
  console.log('\n❌ 首页仍需重大改进');
}

console.log('\n详细报告已保存: docs/clone-verification-report.json');

await browser.close();
