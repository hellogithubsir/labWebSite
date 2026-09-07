## Issue: 021 — Home 项目至页脚区
Description: 完成 Home 的项目、伙伴、实验室、团队和合作页脚双语响应式内容
Type: AFK
Milestone: m2-home
Touches: src/components/hil-site/screens/home/HomeScreen.tsx, src/components/hil-site/screens/home/HomeOverviewSections.tsx, src/content/hil-site/home.ts, public/images/hil-site/home/**, e2e/home.spec.ts, docs/design-references/hil-site/home/**
Blocked by: 020
User stories covered: US-001, US-002, US-003, US-004

### What to build

接续 Home 上半部，实现 Selected Projects、Partners、Inside the Lab、团队摘要和最终合作页脚。项目、伙伴和成员摘要按 H-04 至 H-07 内容编号与设计交付清单对齐；页面内入口必须切换到对应画面。

### Acceptance criteria

- [ ] 两种语言下完整显示项目、伙伴、实验室照片、团队摘要和合作页脚，内容顺序与设计交付一致。
- [ ] 390px 与 320px 下卡片、照片、伙伴信息、成员行和页脚 CTA 可读可达，无页面级横向滚动。
- [ ] Home 全页只有一套正式区块，所有跨区入口到达 Projects、Partners、Team 或 Contact 的正确画面并保持 Locale。

### Validation
Fulfills: VAL-018, VAL-019, VAL-020
- Verification: npm run test:e2e -- --grep "home full page" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口完成全页滚动并触发各跨区入口。
- Evidence expected: 含四种全页截图的 Playwright trace。

### Notes

- 复用 020 已建立的 Home 入口，不创建第二个 Home 组件。
- 图片裁切、比例和替代文本必须来自 001 的正式媒体清单。
- 若设计交付没有某个 DOCX 摘要区块，不把该候选内容强行加入 Home。
