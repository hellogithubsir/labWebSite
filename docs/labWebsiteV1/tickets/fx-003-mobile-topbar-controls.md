## Issue: fx-003 — 移动顶栏语言和菜单控件独立可达

Description: 修复移动顶栏语言控件与展开菜单按钮重叠，保证双语开关状态下独立可达
Type: AFK
Milestone: m4-release-proof
Touches: src/components/hil-site/ScreenNavigation.tsx, src/components/hil-site/ScreenNavigation.module.css, e2e/navigation.spec.ts
Blocked by: fx-002
User stories covered: US-001, US-004, US-005

### Cause

完整规格审查任务 `01a07ec1-adc3-7031-80d3-053275bfd715` 确认独立问题 F-2：390px 截图 `evidence/030/reduced-motion-r1/known-menu-gap.png` 中，语言按钮“中文”与“Close menu”重叠。语言控件在 `ScreenNavigation.tsx` 被独立定位为 `fixed right-20 z-[102]`，菜单顶栏为 `z-index: 101`；展开后菜单文案变长，两者没有共享布局空间，造成文字及点击区域相互覆盖。

该截图证据路径相对于本轮 mission，保留其原位置，不复制或改写审查证据。来源是 full-spec Review，CLI cause 为 `kind: review`、`itemId: F-2`、`feature: 010`；不是 010 原合并审查的新轮次。缺陷违反 AC-007 和 Ticket 001 移动端两控件可达要求，与 F-1 的四键关闭缺陷独立。

### What to build

将唯一语言控件与移动菜单按钮放入明确的共享 flex/grid 布局，让文本和点击范围自然获得空间。保留 1920px 桌面语言控件定位和焦点顺序，保留移动菜单原有关闭及焦点归还规则。只调整导航组件、其 CSS module 和导航测试；`LocaleControl` 自身没有固定定位，`HilSiteShell` 仅传入现有控件，不需要扩张修改范围。

### Acceptance criteria

- [ ] 390px、320px，英文与中文，菜单打开与关闭的全部组合中，语言和菜单两按钮的可见文字与点击边界均不重叠，且完整位于视口内。
- [ ] 两按钮分别可由真实指针点击和键盘操作到达、激活，语言切换和菜单开关结果正确；焦点顺序清晰，菜单关闭后焦点归还和隐藏菜单不可聚焦规则不退化。
- [ ] 每个状态始终只有一个正式语言控件；不得复制按钮、隐藏或截断文案、缩小到不可读或用叠加 z-index 掩盖布局问题。
- [ ] 1920px 桌面语言控件定位及导航焦点、键盘顺序无回归；保留 fx-002 四键关闭、两种语言、URL 稳定及 reduced-motion 导航回归。
- [ ] 先补充能复现重叠或点击被遮挡的失败测试，再最小修复；边界断言和独立点击、键盘操作共同证明控件可达，不只依赖截图观感。

### Validation

Fulfills: None（修复已批准移动端布局与可达性，不新增或重分配断言）
Proves: None（实现票不承担独立验证者角色）

- Verification: make check (exit zero)
- Verification: npm run test:e2e -- e2e/navigation.spec.ts (exit zero)
- Command / scenario: 在两种移动宽度、两种语言和两种菜单状态测量两个控件边界并分别用指针和键盘操作；1920px 验证桌面定位和焦点行为，运行现有导航回归。
- Evidence expected: 修复前失败与修复后通过日志、退出码，以及对应移动状态截图或 trace；视觉状态以 Ticket 001 已登记的 Photoshop 移动推导与菜单开关状态为依据。由独立可见审查任务核验，worker 不自审、不改写既有验证记录。
