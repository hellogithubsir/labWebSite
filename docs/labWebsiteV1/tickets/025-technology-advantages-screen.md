## Issue: 025 — Technology Advantages 画面
Description: 交付八项技术优势及设计交互状态的双语响应式画面
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/ScreenRenderer.tsx, src/components/hil-site/screens/advantages/**, src/content/hil-site/advantages.ts, public/images/hil-site/advantages/**, e2e/advantages.spec.ts, docs/design-references/hil-site/advantages/**
Blocked by: 024
User stories covered: US-002, US-004, US-005

### What to build

实现 A-01 至 A-08 八项技术优势，保持首页重点能力与完整优势页之间的内容关系。只实现设计交付实际使用的 Accordion、卡片或其他状态，不把组件样例页中的全部变体强行带入产品页。

### Acceptance criteria

- [ ] 两种语言下八项优势按设计交付顺序完整显示，标题、价值说明和证据边界与内容文档一致。
- [ ] 设计交付指定状态可由键盘和指针操作，并在 390px 与 320px 下保持可读、可聚焦和无横向溢出。

### Validation
Fulfills: VAL-030, VAL-031
- Verification: npm run test:e2e -- --grep "advantages screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口浏览全部优势并操作每种正式状态。
- Evidence expected: 含全页和交互状态截图的 Playwright trace。

### Notes

- 组件库中的 Hover/Open 示例只有在 001 证明页面使用时才进入运行时。
- 不新增超出 A-01 至 A-08 的未来能力占位。

- A-04至A-08采用独立Accordion，默认全部折叠（04_Documentation优先于HTML的A-04初始展开），点击/Enter/Space切换，aria-expanded与可见详情一致；300ms展开，reduce立即显示。折叠内容不可聚焦；通过对应正式测试验证所有条目。
