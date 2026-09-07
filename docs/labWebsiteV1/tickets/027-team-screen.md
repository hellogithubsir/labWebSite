## Issue: 027 — Team 画面
Description: 交付 PI、团队构成和核心成员的双语响应式展示
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/team/**, src/content/hil-site/team.ts, public/images/hil-site/team/**, e2e/team.spec.ts, docs/design-references/hil-site/team/**
Blocked by: 010, 011
User stories covered: US-003, US-004

### What to build

实现 T-01 至 T-04 的团队概览、PI 资料、团队构成和设计交付要求的核心成员。成员姓名、角色、简介、照片和外链按设计交付及同编号双语内容呈现。

### Acceptance criteria

- [ ] 两种语言下 PI、团队构成和全部设计交付核心成员信息完整且身份对应正确。
- [ ] 390px 与 320px 下成员照片与文字保持关联、阅读顺序正确，图片具备目的明确的替代文本。

### Validation
Fulfills: VAL-034, VAL-035
- Verification: npm run test:e2e -- --grep "team screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口逐个核对成员姓名、角色、媒体和外链。
- Evidence expected: 含桌面与移动成员状态截图的 Playwright trace。

### Notes

- 只展示 001 确认的正式成员，不把归档中额外人物重新带回当前实现。
- 不把团队卡片扩展为账号、个人后台或动态数据源。
