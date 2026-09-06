## Issue: 030 — 七画面双语交互验收
Description: 独立执行完整七画面流程并报告同 URL、Locale 边界和减少动画结果
Type: VALIDATION
Milestone: m4-release-proof
Touches: docs/design-references/hil-site/release/**
Blocked by: 012, 021, 022, 024, 025, 026, 027, 028
User stories covered: US-001, US-002, US-003, US-004, US-005

### What to build

这不是实现票。使用已有 Playwright 流程独立走完七画面导航、双语切换、页面内 CTA、键盘操作和减少动画状态。逐条记录 verdict 与证据；发现失败只报告，不在本票修复产品或测试主体。

### Acceptance criteria

- [ ] 从 Home 使用导航和页面内入口访问全部七个画面，当前态、焦点和 URL 始终一致。
- [ ] 切换中文后走完七画面仍保持中文，刷新后恢复英文 Home。
- [ ] reduced-motion 下走完整个序列不播放整页位移，且每次只显示一个最终画面。

### Validation
Proves: VAL-007, VAL-010, VAL-014
- Verification: npm run test:e2e (exit zero)
- Command / scenario: 分别在正常动效与 reduced-motion 环境执行英文、中文七画面全流程。
- Evidence expected: 每条断言的 verdict 和 Playwright trace。

### Notes

- 验证者不得修改产品实现、E2E 断言或 Figma 参考以制造通过。
- 失败项形成新的修复 Ticket，修复完成后重新执行本票。
- 本票不替代各页面 Ticket 已要求的 28 组视觉截图。

