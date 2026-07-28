import { chromium } from 'playwright';
import { writeFile } from 'fs/promises';

const browser = await chromium.launch();

const pages = [
  { path: '/', name: 'home' },
  { path: '/research', name: 'research' },
  { path: '/news', name: 'news' },
  { path: '/about', name: 'about' },
  { path: '/about/people', name: 'people' },
  { path: '/about/contact', name: 'contact' }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 390, height: 844 }
];

console.log('📸 捕获所有克隆页面截图\n');
console.log('='.repeat(80));

let captured = 0;
let total = pages.length * viewports.length;

for (const vp of viewports) {
  console.log(`\n${vp.name} (${vp.width}×${vp.height})`);
  console.log('-'.repeat(80));

  const page = await browser.newPage();
  await page.setViewportSize({ width: vp.width, height: vp.height });

  for (const pg of pages) {
    try {
      await page.goto(`http://localhost:3000${pg.path}`, {
        waitUntil: 'networkidle',
        timeout: 10000
      });
      await page.waitForTimeout(500); // 等待字体加载

      const filename = `docs/clone-${pg.name}-${vp.name}.png`;
      await page.screenshot({ path: filename, fullPage: true });

      captured++;
      console.log(`  ✓ ${pg.name.padEnd(12)} → ${filename}`);
    } catch (err) {
      console.log(`  ✗ ${pg.name.padEnd(12)} → ${err.message}`);
    }
  }

  await page.close();
}

await browser.close();

console.log('\n' + '='.repeat(80));
console.log(`📊 完成: ${captured}/${total} 张截图已捕获\n`);

if (captured === total) {
  console.log('✅ 所有截图捕获成功！');
  console.log('\n下一步：人工对比验证');
  console.log('  原始截图: docs/research/mitibm.mit.edu/screenshots/original-*.png');
  console.log('  克隆截图: docs/clone-*.png');
} else {
  console.log(`⚠️  ${total - captured} 张截图捕获失败`);
}

// 生成对比清单
const checklist = pages.map(pg => {
  return viewports.map(vp => {
    const orig = `docs/research/mitibm.mit.edu/screenshots/original-${pg.name}-${vp.name}.png`;
    const clone = `docs/clone-${pg.name}-${vp.name}.png`;
    return `- [ ] ${pg.name} (${vp.name}): ${orig} vs ${clone}`;
  }).join('\n');
}).join('\n');

await writeFile('docs/SCREENSHOT_COMPARISON_CHECKLIST.md', `# 截图对比清单

**生成时间:** ${new Date().toISOString()}

## 对比步骤

1. 并排打开每组截图（原始 vs 克隆）
2. 检查以下维度：
   - 布局对齐（元素位置、间距）
   - 颜色精确度（品牌色、背景色、文本色）
   - 字体大小和权重
   - 图片尺寸和裁剪
   - 边框和分隔线
   - Hover 状态（需在浏览器中测试）

## 对比清单

### 桌面视口 (1440×900)
${pages.map(pg => `- [ ] ${pg.path} → docs/clone-${pg.name}-desktop.png`).join('\n')}

### 平板视口 (768×1024)
${pages.map(pg => `- [ ] ${pg.path} → docs/clone-${pg.name}-tablet.png`).join('\n')}

### 移动视口 (390×844)
${pages.map(pg => `- [ ] ${pg.path} → docs/clone-${pg.name}-mobile.png`).join('\n')}

## 已知差异记录

### 首页
- [ ] Hero 图片溢出宽度计算
- [ ] Footer 蓝色渐变规则可见性
- [ ] Section Rail 颜色顺序

### 其他页面
（在对比过程中记录发现的差异）

## 验证结果

**通过率:** ___ / 18 组 (___%)

**需要修复的差异:**
1.
2.
3.

**完成时间:** ___________
`);

console.log('\n✓ 对比清单已生成: docs/SCREENSHOT_COMPARISON_CHECKLIST.md');
