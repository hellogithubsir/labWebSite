## Issue: 040 — 对齐参考站真实分区切换动效
Description: 在既有七画面单URL模型中实现700ms提交与1500ms完成的参考动效并保留项目轨道几何和交互约束
Type: AFK
Milestone: reference-motion
Touches: src/components/hil-site/PageTurnTransition.tsx, src/components/hil-site/PageTurnTransition.module.css, src/components/hil-site/ScreenNavigation.tsx, src/components/hil-site/ScreenNavigation.module.css, src/components/hil-site/HilSiteShell.tsx, e2e/transition.spec.ts, e2e/locale.spec.ts, e2e/navigation.spec.ts, README.md, docs/adr/0002-native-css-page-transition.md, docs/research/hil-site-design-manifest.md, docs/design-references/hil-site/transition/**
Blocked by: None

### What to build

依照本目录 spec.md 的现场采样和完整时间轴修改现有正式实现：0ms 锁首个目标且旧内容 inert/aria-hidden、页脚300ms下移100vh；500ms旧内容开始300ms淡出；700ms提交目标与滚动重置并开始300ms轨道flex重排；新内容700–1200ms透明、1200–1500ms淡入；1500ms解锁并恢复目标画面可访问性及标题焦点。轨道不能在请求起点先动。

保留普通/active导航条44/58px及981–1280px的38/50px，980px以下无桌面轨道；移动菜单自身250ms不改。reduce完整流程100ms内结束。首目标锁、同屏无动作、单URL、Locale及单可访问画面约束必须保持。

更新唯一 `e2e/transition.spec.ts` 中旧250ms断言，先记录新时序断言在旧实现上的失败，再实施并记录通过。其他两个E2E文件仅在1500ms新时序确实需要时调整等待/单测试超时，不删除或弱化断言。同步README、ADR与manifest当前说明，链接本轮证据并明确旧250ms/030旧500ms证据为历史快照；不得改 `docs/labWebsiteV1/**`。不改正文、不新增资产、Barba或路由。

### Acceptance criteria

- [ ] 四条 VAL-MOTION 断言均有实现和真实测试覆盖，完整1500ms顺序可从多帧采样确认。
- [ ] 轨道宽度与响应式断点保持本项目七屏版式，移动菜单250ms保留。
- [ ] 单URL、Locale、同屏、连续输入、焦点和可访问性在普通及reduce模式正确。
- [ ] 完成针对性E2E与make check-release，保存退出码、独立日志及持久trace；失败如实报告并修复。
- [ ] 当前文档说明已更新并链接新证据，旧冻结产物与素材包保持只读。

### Validation
Fulfills: VAL-MOTION-001, VAL-MOTION-002, VAL-MOTION-003, VAL-MOTION-004
- Verification: npm run test:e2e -- --grep "page transition" (exit zero)
- Command / scenario: 先运行更新后的时序断言确认旧实现失败；实现后通过目标测试并运行 make check-release，覆盖双语七屏、桌面与移动、普通与reduce路径。
- Evidence expected: docs/design-references/hil-site/transition/ 内的新旧行为失败到通过记录、原站采样来源记录、本地时间轴采样、完整门禁退出码与持久trace索引。
