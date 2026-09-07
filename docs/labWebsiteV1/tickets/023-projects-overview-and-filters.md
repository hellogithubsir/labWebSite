## Issue: 023 — Projects 概览与 E-Linus 轮播
Description: 交付项目导语、四类能力说明和可访问轮播的双语响应式体验
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/ScreenRenderer.tsx, src/components/hil-site/screens/projects/ProjectsScreen.tsx, src/components/hil-site/screens/projects/ProjectCarousel.tsx, src/components/hil-site/screens/projects/ProjectsOverview.tsx, src/content/hil-site/projects.ts, public/images/hil-site/projects/**, e2e/projects.spec.ts, docs/design-references/hil-site/projects/**
Blocked by: 022
User stories covered: US-002, US-004, US-005

### What to build

实现 Projects 的项目导语、Key Projects & Tech Transfer 和 AI Solutions、Edge Intelligence、Custom Digital Products、Digital Transformation 四类能力。实现交付E-Linus截图轮播并为024接续PDM Robot保留同一Projects容器；四类能力仅为说明，不做项目筛选。

### Acceptance criteria

- [ ] 两种语言下完整显示 P-01、P-02 的导语、四类能力、适用场景和交付物信息。
- [ ] E-Linus轮播支持前后按钮、ArrowLeft/Right和水平拖动，当前截图、caption、proof labels及进度同步，首尾按钮禁用，时长300–500ms；reduce不平滑滚动。
- [ ] 390px 与 320px 下轮播按钮、键盘与触摸拖动可操作，媒体无页面级溢出，caption保持可读。

### Validation
Fulfills: VAL-024, VAL-025, VAL-026
- Verification: npm run test:e2e -- --grep "project carousel" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口逐张切换E-Linus截图并验证拖动、进度与边界。
- Evidence expected: 含轮播状态截图的 Playwright trace。

### Notes

- 轮播只改变本地当前截图，不写入URL。两个真实轮播共用ProjectCarousel，024复用。
- 本票不填充完整项目详情；024 接续同一 Projects 实现。
