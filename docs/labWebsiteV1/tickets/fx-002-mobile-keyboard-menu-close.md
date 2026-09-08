## Issue: fx-002 — 移动菜单键盘选择后关闭并归还焦点

Description: 修复移动菜单使用方向键、Home 和 End 选择画面后未关闭及焦点未归还的问题
Type: AFK
Milestone: m4-release-proof
Touches: src/components/hil-site/ScreenNavigation.tsx, e2e/navigation.spec.ts
Blocked by: 030
User stories covered: US-001, US-004, US-005

### Cause

完整规格审查任务 `01a07ec1-adc3-7031-80d3-053275bfd715` 的 F-1 发现：原 010 的移动菜单键盘选择关闭要求遗漏。`ScreenNavigation.tsx` 的键盘处理函数 `handleKeys` 对 ArrowLeft、ArrowRight、Home、End 直接调用 `onNavigate`，绕过点击所用的 `activate` / `closeMenu`。在 390px 和 320px 下，目标画面虽改变，菜单仍打开且正文保持 inert，键盘使用者无法像点击用户一样继续阅读正文。

来源是 full-spec Review，而非 010 原合并审查的新轮次。CLI cause 使用 `kind: review`、`itemId: F-1`、`feature: 010`，指明缺陷归属；上述任务 ID 保留完整审查来源，避免混淆不同审查中的 F-1。

本票修复已存在的 FR-005、AC-004、AC-007 和 VAL-008 要求，不新增契约断言、不重新分配其实现或证明归属。通过 `devflow amend` 追加，禁止修改既有票据或手写计划、任务运行状态。

### What to build

复用当前唯一导航实现，让移动菜单的四种键盘选择行为与点击一致：切换目标画面、关闭菜单、焦点回到菜单按钮，并让正文恢复可访问。桌面导航继续将焦点移到目标导航项。修复和回归测试仅限声明的两个文件，不新增导航组件、状态层或样式实现。

### Acceptance criteria

- [ ] 英文和中文分别在 390px、320px 下验证 ArrowLeft、ArrowRight、Home、End；每次从打开的菜单选择后，目标画面与唯一当前项正确，菜单关闭且 `aria-expanded=false`，焦点回到菜单按钮。
- [ ] 关闭后正文不再 inert，只有一个可访问的当前画面；隐藏菜单不保留焦点且不能经 Tab 进入。保留已有点击、Escape 和菜单焦点行为。
- [ ] 桌面四键仍将焦点移到目标导航项，且当前项和画面保持同步。
- [ ] 四键选择在正常动效与 `prefers-reduced-motion: reduce` 下均通过两种语言、390px/320px 的回归；Locale、URL 路径、查询和片段保持不变。不得用删除现有断言或改变既有过渡策略满足测试。
- [ ] 先增加能复现该缺陷的行为测试并保留失败证据，再完成最小修复；现有导航回归继续通过。

### Validation

Fulfills: None（修复原 010 已认领的 VAL-008，不新增断言）
Proves: None（本票负责实现；独立验证者重新确认受影响证据）

- Verification: make check (exit zero)
- Verification: npm run test:e2e -- e2e/navigation.spec.ts (exit zero)
- Command / scenario: 移动菜单分别打开后使用四键选择画面，检查菜单、焦点、正文可访问性、当前项、Locale 和 URL；桌面确认目标导航项聚焦，reduce 模式运行相同交互回归。
- Evidence expected: TDD 修复前失败、修复后通过日志及退出码，必要的 Playwright trace；交由独立可见审查任务审查，修复 worker 不自审、不自行宣布 VAL-008 已证明。
