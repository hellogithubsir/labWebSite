## Issue: 023 — Projects 概览与能力筛选
Description: 交付项目导语、四类能力和可访问筛选入口的双语响应式体验
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/projects/ProjectsScreen.tsx, src/components/hil-site/screens/projects/ProjectFilters.tsx, src/components/hil-site/screens/projects/ProjectsOverview.tsx, src/content/hil-site/projects.ts, e2e/projects.spec.ts, docs/design-references/hil-site/projects/**
Blocked by: 010, 011
User stories covered: US-002, US-004, US-005

### What to build

实现 Projects 的项目导语、Key Projects & Tech Transfer 和 AI Solutions、Edge Intelligence、Custom Digital Products、Digital Transformation 四类能力。按 Figma 的 Filter Chip 状态提供项目分类筛选，并为 024 保留唯一项目目录容器。

### Acceptance criteria

- [ ] 两种语言下完整显示 P-01、P-02 的导语、四类能力、适用场景和交付物信息。
- [ ] 选择筛选项后只显示对应项目集合，当前筛选具有选中语义，键盘和指针结果一致。
- [ ] 390px 与 320px 下筛选控件可滚动或换行但不遮挡，焦点和项目内容始终可达。

### Validation
Fulfills: VAL-024, VAL-025, VAL-026
- Verification: npm run test:e2e -- --grep "project filters" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口依次选择所有分类并检查项目集合。
- Evidence expected: 含筛选状态截图的 Playwright trace。

### Notes

- 筛选只改变本地可见集合，不写入 URL，也不引入远程搜索或服务端查询。
- 本票不填充完整项目详情；024 接续同一 Projects 实现。

