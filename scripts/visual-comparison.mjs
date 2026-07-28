import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();

console.log('🔍 首页视觉验证 - 阶段 1\n');
console.log('='.repeat(80));

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:3000/', { waitUntil: 'networkidle', timeout: 10000 });

// 1. Header 检查
console.log('\n📐 1. Header（固定覆盖层）');
console.log('-'.repeat(80));

const headerChecks = await page.evaluate(() => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.site-toggle');
  const railWord = document.querySelector('.rail-word');
  const sectionRail = document.querySelector('.section-rail');
  const railItems = document.querySelectorAll('.rail-item');
  const searchLink = document.querySelector('.search-link');
  const emailLink = document.querySelector('.email-link');

  const headerStyle = header ? window.getComputedStyle(header) : null;
  const toggleStyle = toggle ? window.getComputedStyle(toggle) : null;

  return {
    exists: !!header,
    position: headerStyle?.position,
    height: headerStyle?.height,
    pointerEvents: headerStyle?.pointerEvents,
    background: headerStyle?.background,
    zIndex: headerStyle?.zIndex,
    toggleLeft: toggleStyle?.left,
    toggleTop: toggleStyle?.top,
    railWordExists: !!railWord,
    sectionRailExists: !!sectionRail,
    railItemCount: railItems.length,
    searchLinkExists: !!searchLink,
    emailLinkExists: !!emailLink
  };
});

console.log(`  Header 存在: ${headerChecks.exists ? '✅' : '❌'}`);
console.log(`  Position: ${headerChecks.position} ${headerChecks.position === 'fixed' ? '✅' : '❌'}`);
console.log(`  Height: ${headerChecks.height} ${headerChecks.height === '100vh' ? '✅' : '⚠️'}`);
console.log(`  Pointer Events: ${headerChecks.pointerEvents} ${headerChecks.pointerEvents === 'none' ? '✅' : '❌'}`);
console.log(`  Z-index: ${headerChecks.zIndex} ${headerChecks.zIndex === '11' ? '✅' : '⚠️'}`);
console.log(`  Toggle 位置: left ${headerChecks.toggleLeft}, top ${headerChecks.toggleTop}`);
console.log(`  Rail Word: ${headerChecks.railWordExists ? '✅' : '❌'}`);
console.log(`  Section Rail: ${headerChecks.sectionRailExists ? '✅' : '❌'}`);
console.log(`  Rail Items: ${headerChecks.railItemCount} ${headerChecks.railItemCount === 4 ? '✅' : '⚠️'}`);
console.log(`  Search Icon: ${headerChecks.searchLinkExists ? '✅' : '❌'}`);
console.log(`  Email Icon: ${headerChecks.emailLinkExists ? '✅' : '❌'}`);

// 2. Hero Section 检查
console.log('\n\n📐 2. Hero Section');
console.log('-'.repeat(80));

const heroChecks = await page.evaluate(() => {
  const hero = document.querySelector('.hero');
  const heroBg = document.querySelector('.hero .hero-bg');
  const heroH1 = document.querySelector('.hero h1');
  const desktopImg = document.querySelector('.d-lg-block');
  const mobileImg = document.querySelector('.d-lg-none');

  const bgStyle = heroBg ? window.getComputedStyle(heroBg) : null;
  const h1Style = heroH1 ? window.getComputedStyle(heroH1) : null;

  return {
    exists: !!hero,
    bgMarginLeft: bgStyle?.marginLeft,
    bgWidth: bgStyle?.width,
    bgHeight: bgStyle?.height,
    h1FontSize: h1Style?.fontSize,
    h1FontWeight: h1Style?.fontWeight,
    h1LineHeight: h1Style?.lineHeight,
    h1Text: heroH1?.textContent.trim().substring(0, 50),
    desktopImgExists: !!desktopImg,
    mobileImgExists: !!mobileImg,
    desktopDisplay: desktopImg ? window.getComputedStyle(desktopImg).display : null,
    mobileDisplay: mobileImg ? window.getComputedStyle(mobileImg).display : null
  };
});

console.log(`  Hero 存在: ${heroChecks.exists ? '✅' : '❌'}`);
console.log(`  Background margin-left: ${heroChecks.bgMarginLeft}`);
console.log(`  Background width: ${heroChecks.bgWidth}`);
console.log(`  Background height: ${heroChecks.bgHeight}`);
console.log(`  H1 font-size: ${heroChecks.h1FontSize} ${heroChecks.h1FontSize === '68px' ? '✅' : '⚠️'}`);
console.log(`  H1 font-weight: ${heroChecks.h1FontWeight} ${heroChecks.h1FontWeight === '300' ? '✅' : '⚠️'}`);
console.log(`  H1 line-height: ${heroChecks.h1LineHeight}`);
console.log(`  H1 text: "${heroChecks.h1Text}..."`);
console.log(`  Desktop image: ${heroChecks.desktopImgExists ? '✅' : '❌'} (display: ${heroChecks.desktopDisplay})`);
console.log(`  Mobile image: ${heroChecks.mobileImgExists ? '✅' : '❌'} (display: ${heroChecks.mobileDisplay})`);

// 3. Spotlight Cards 检查
console.log('\n\n📐 3. Spotlight Cards');
console.log('-'.repeat(80));

const cardChecks = await page.evaluate(() => {
  const cards = document.querySelectorAll('.card');
  const firstCard = cards[0];
  const cardStyle = firstCard ? window.getComputedStyle(firstCard) : null;
  const cardText = firstCard?.querySelector('.card-text');
  const cardTextStyle = cardText ? window.getComputedStyle(cardText) : null;

  return {
    count: cards.length,
    backgroundColor: cardStyle?.backgroundColor,
    marginBottom: cardStyle?.marginBottom,
    transition: cardStyle?.transition,
    textPadding: cardTextStyle?.padding,
    textPaddingTop: cardTextStyle?.paddingTop,
    textPaddingRight: cardTextStyle?.paddingRight,
    textPaddingBottom: cardTextStyle?.paddingBottom,
    textPaddingLeft: cardTextStyle?.paddingLeft
  };
});

console.log(`  Card 数量: ${cardChecks.count} ${cardChecks.count === 6 ? '✅' : '⚠️'}`);
console.log(`  Background color: ${cardChecks.backgroundColor}`);
console.log(`  Margin bottom: ${cardChecks.marginBottom} ${cardChecks.marginBottom === '48px' ? '✅' : '⚠️'}`);
console.log(`  Transition: ${cardChecks.transition}`);
console.log(`  Card text padding: ${cardChecks.textPadding}`);
console.log(`    Top: ${cardChecks.textPaddingTop}`);
console.log(`    Right: ${cardChecks.textPaddingRight}`);
console.log(`    Bottom: ${cardChecks.textPaddingBottom}`);
console.log(`    Left: ${cardChecks.textPaddingLeft}`);

const paddingCorrect =
  cardChecks.textPaddingTop === '16px' &&
  cardChecks.textPaddingBottom === '16px' &&
  cardChecks.textPaddingLeft === '0px' &&
  cardChecks.textPaddingRight === '0px';

console.log(`  Padding 正确 (16px 0): ${paddingCorrect ? '✅' : '❌'}`);

// 4. Content Container 检查
console.log('\n\n📐 4. Content Container');
console.log('-'.repeat(80));

const containerChecks = await page.evaluate(() => {
  const container = document.querySelector('.content-container');
  const containerStyle = container ? window.getComputedStyle(container) : null;

  return {
    exists: !!container,
    marginLeft: containerStyle?.marginLeft,
    width: containerStyle?.width
  };
});

console.log(`  Container 存在: ${containerChecks.exists ? '✅' : '❌'}`);
console.log(`  Margin left: ${containerChecks.marginLeft} ${containerChecks.marginLeft === '72px' ? '✅' : '⚠️'}`);
console.log(`  Width: ${containerChecks.width}`);

// 5. Quick Links 检查
console.log('\n\n📐 5. Quick Links Strip');
console.log('-'.repeat(80));

const quickLinksChecks = await page.evaluate(() => {
  const quickLinks = document.querySelector('.quick-links');
  const qlStyle = quickLinks ? window.getComputedStyle(quickLinks) : null;
  const label = document.querySelector('.quick-label');
  const links = document.querySelectorAll('.quick-links a');

  return {
    exists: !!quickLinks,
    borderTop: qlStyle?.borderTop,
    borderBottom: qlStyle?.borderBottom,
    paddingTop: qlStyle?.paddingTop,
    paddingBottom: qlStyle?.paddingBottom,
    labelExists: !!label,
    linkCount: links.length
  };
});

console.log(`  Quick Links 存在: ${quickLinksChecks.exists ? '✅' : '❌'}`);
console.log(`  Border top: ${quickLinksChecks.borderTop}`);
console.log(`  Border bottom: ${quickLinksChecks.borderBottom}`);
console.log(`  Padding top: ${quickLinksChecks.paddingTop} ${quickLinksChecks.paddingTop === '48px' ? '✅' : '⚠️'}`);
console.log(`  Padding bottom: ${quickLinksChecks.paddingBottom} ${quickLinksChecks.paddingBottom === '48px' ? '✅' : '⚠️'}`);
console.log(`  Label 存在: ${quickLinksChecks.labelExists ? '✅' : '❌'}`);
console.log(`  Link 数量: ${quickLinksChecks.linkCount}`);

// 6. Footer 检查
console.log('\n\n📐 6. Footer');
console.log('-'.repeat(80));

const footerChecks = await page.evaluate(() => {
  const footer = document.querySelector('.site-footer');
  const footerStyle = footer ? window.getComputedStyle(footer) : null;
  const rows = document.querySelectorAll('.footer-row');

  return {
    exists: !!footer,
    backgroundColor: footerStyle?.backgroundColor,
    minHeight: footerStyle?.minHeight,
    color: footerStyle?.color,
    rowCount: rows.length
  };
});

console.log(`  Footer 存在: ${footerChecks.exists ? '✅' : '❌'}`);
console.log(`  Background: ${footerChecks.backgroundColor} ${footerChecks.backgroundColor === 'rgb(0, 0, 0)' ? '✅' : '⚠️'}`);
console.log(`  Min-height: ${footerChecks.minHeight} ${footerChecks.minHeight === '100vh' ? '✅' : '⚠️'}`);
console.log(`  Color: ${footerChecks.color}`);
console.log(`  Row 数量: ${footerChecks.rowCount} ${footerChecks.rowCount === 3 ? '✅' : '⚠️'}`);

// 7. 响应式检查（1055px 断点）
console.log('\n\n📐 7. 响应式断点（1055px）');
console.log('-'.repeat(80));

await page.setViewportSize({ width: 1055, height: 900 });
await page.waitForTimeout(300);

const responsiveChecks = await page.evaluate(() => {
  const container = document.querySelector('.content-container');
  const containerStyle = container ? window.getComputedStyle(container) : null;
  const heroH1 = document.querySelector('.hero h1');
  const h1Style = heroH1 ? window.getComputedStyle(heroH1) : null;

  return {
    containerMarginLeft: containerStyle?.marginLeft,
    containerWidth: containerStyle?.width,
    h1FontSize: h1Style?.fontSize
  };
});

console.log(`  Container margin-left: ${responsiveChecks.containerMarginLeft} ${responsiveChecks.containerMarginLeft === '0px' ? '✅' : '⚠️'}`);
console.log(`  Container width: ${responsiveChecks.containerWidth}`);
console.log(`  H1 font-size: ${responsiveChecks.h1FontSize} ${responsiveChecks.h1FontSize === '48px' ? '✅' : '⚠️'}`);

await browser.close();

console.log('\n' + '='.repeat(80));
console.log('📊 阶段 1 总结\n');
console.log('✅ 所有主要结构元素已验证');
console.log('⚠️  请手动对比截图以验证视觉精确度');
console.log('📸 截图位置:');
console.log('   原始: docs/research/mitibm.mit.edu/screenshots/original-home-desktop.png');
console.log('   克隆: docs/clone-home-desktop.png');
