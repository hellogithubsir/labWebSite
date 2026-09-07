## Issue: 020 — Home 首屏与研究能力区
Description: 交付 Home 的 Hero、研究方向、技术能力和主要 CTA 双语响应式体验
Type: AFK
Milestone: m2-home
Touches: src/components/hil-site/ScreenRenderer.tsx, src/components/hil-site/screens/home/HomeScreen.tsx, src/components/hil-site/screens/home/HomeHero.tsx, src/components/hil-site/screens/home/HomeResearch.tsx, src/content/hil-site/home.ts, public/images/hil-site/home/**, e2e/home.spec.ts, docs/design-references/hil-site/home/**
Blocked by: 012
User stories covered: US-001, US-002, US-004

### What to build

实现 Home 从顶部品牌区域到研究方向和技术能力结束的正式内容。使用真实标题、说明、HEALTH/EDGE-AI/AGENT 卡片、三项技术能力及 Explore Research、Collaborate CTA，并使用 Ticket 001 落库的 Hero 媒体和共享图形。

### Acceptance criteria

- [ ] 英文和中文桌面状态完整呈现 Hero、三个研究方向、三项技术能力及设计交付指定视觉层级。
- [ ] 390px 与 320px 下标题、卡片、媒体和 CTA 按阅读顺序重排，无横向溢出或遮挡。
- [ ] Explore Research 切换到 Research，Collaborate 切换到 Contact，Locale 与 URL 均保持。

### Validation
Fulfills: VAL-015, VAL-016, VAL-017
- Verification: npm run test:e2e -- --grep "home upper" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口查看上半页，并分别触发两个 CTA。
- Evidence expected: 含桌面与移动截图的 Playwright trace。

### Notes

- 已知 Figma HOME 来源节点为 `63:2`；实现以 001 的 Photoshop 画面与素材映射为准。
- Hero 插画必须使用 001 登记的正式媒体或可编辑 SVG，不把整页截图作为背景。
- 本票只建立 Home 上半部；下半部由 021 接续。
