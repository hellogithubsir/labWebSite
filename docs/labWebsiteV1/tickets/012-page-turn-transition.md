## Issue: 012 — 原生整页切换动效
Description: 为单 URL 画面切换增加250ms淡入淡出、可锁定且尊重减少动画的原生过渡
Type: AFK
Milestone: m1-shell-interaction
Touches: src/components/hil-site/PageTurnTransition.tsx, src/components/hil-site/HilSiteShell.tsx, src/components/hil-site/PageTurnTransition.module.css, e2e/transition.spec.ts
Blocked by: 011
User stories covered: US-005

### What to build

实现当前画面与目标画面的整页过渡，前后导航均采用250ms ease-out淡入淡出，无方向滑动。过渡中锁定新请求，完成事件提交目标；时长以交付250ms为准。减少动画用户应直接获得目标内容，不播放整页位移。

### Acceptance criteria

- [ ] 前进和后退均使用250ms淡入淡出且无方向滑动，动画结束后 DOM 中只保留目标画面。
- [ ] 动画期间连续触发多个导航请求仍只提交第一次目标，不出现多层可聚焦内容。
- [ ] reduce 模式下不播放整页位移动画，并在 100ms 内完成可见状态切换。

### Validation
Fulfills: VAL-012, VAL-013, VAL-014
- Verification: npm run test:e2e -- --grep "page transition" (exit zero)
- Command / scenario: 正向、反向、快速连点和 reduced-motion 四种情况下切换画面。
- Evidence expected: Playwright trace 或视频。

### Notes

- 通过动画完成事件提交状态，不使用散落定时器猜测结束时间。
- 点击当前画面不启动动效。
- 不引入第三方动画依赖。
