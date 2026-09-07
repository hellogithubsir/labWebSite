## Issue: 030 — V1 综合只读验收
Description: 独立核验设计交付、运行时、七画面双语视觉与交互证据并逐条报告 VAL-001 至 VAL-038
Type: VALIDATION
Milestone: m4-release-proof
Touches: None
Blocked by: 001, 002, 003, 012, 021, 022, 024, 025, 026, 027, 028
User stories covered: US-001, US-002, US-003, US-004, US-005

### What to build

这不是实现票。独立核验 Ticket 001 设计交付与素材索引、健康端点、CI 关键路径证据，以及已有 Playwright 流程产生的七画面双语、桌面/移动、页面内 CTA、键盘操作、过渡和减少动画证据。对 VAL-001 至 VAL-038 逐条记录 verdict 与可定位证据；发现失败只报告，不修改产品、测试、设计参考或状态文件。

### Acceptance criteria

- [ ] VAL-001 至 VAL-005 的设计清单、素材、健康响应、浏览器基线和成功 CI 日志均有独立可定位证据。
- [ ] VAL-006 至 VAL-014 的单 URL 导航、键盘、双语、过渡锁和 reduced-motion 行为均由现有 Playwright 证据支撑。
- [ ] VAL-015 至 VAL-038 的七画面、两种语言、桌面与 390px 证据共 28 组，320px 溢出与各正式交互状态也有可定位结果。

### Validation
Proves: VAL-001, VAL-002, VAL-003, VAL-004, VAL-005, VAL-006, VAL-007, VAL-008, VAL-009, VAL-010, VAL-011, VAL-012, VAL-013, VAL-014, VAL-015, VAL-016, VAL-017, VAL-018, VAL-019, VAL-020, VAL-021, VAL-022, VAL-023, VAL-024, VAL-025, VAL-026, VAL-027, VAL-028, VAL-029, VAL-030, VAL-031, VAL-032, VAL-033, VAL-034, VAL-035, VAL-036, VAL-037, VAL-038
- Verification: npm run test:e2e (exit zero)
- Command / scenario: 读取既有交付与命令证据，并分别在正常动效与 reduced-motion 环境执行英文、中文七画面全流程；本票不重新生成或改写上游证据。
- Evidence expected: VAL-001 至 VAL-038 每条断言的 verdict、来源路径和必要的 Playwright trace 或截图。

### Notes

- 验证者不得修改产品实现、E2E 断言、设计参考或状态文件以制造通过。
- 失败项形成新的修复 Ticket，修复完成后重新执行本票。
- 本票只核验上游 28 组视觉截图，不替代或重新生成它们。
