## Issue: 010 — 单 URL 七画面壳层
Description: 交付唯一官网入口、七画面状态序列、共享视觉基础和可访问导航
Type: AFK
Milestone: m1-shell-interaction
Touches: src/app/page.tsx, src/app/layout.tsx, src/app/globals.css, src/components/hil-site/HilSiteShell.tsx, src/components/hil-site/ScreenNavigation.tsx, src/components/hil-site/ScreenRenderer.tsx, src/lib/hil-site/screen-sequence.ts, src/types/hil-site.ts, public/images/hil-site/shared/**, e2e/navigation.spec.ts
Blocked by: 001, 003
User stories covered: US-001, US-005

### What to build

用唯一官网壳层替换占位入口，建立固定 `ScreenId` 顺序、唯一画面映射和七项导航。应用 Figma 已确认的颜色、字体、间距、圆角和共享 Logo；画面内容在本票中只需提供可识别标题，以便完整页面能够独立并行实施。

### Acceptance criteria

- [ ] `/` 初始显示英文 Home、七项导航且只暴露一个当前画面。
- [ ] 点击任一导航项显示唯一对应画面，路径、查询和片段始终保持 `/`。
- [ ] 左右方向键、Home 和 End 同步更新焦点、当前项和可见画面，当前项具有明确语义。

### Validation
Fulfills: VAL-006, VAL-007, VAL-008
- Verification: npm run test:e2e -- --grep "site navigation" (exit zero)
- Command / scenario: 从 Home 使用指针和键盘访问全部七个画面并观察 URL、焦点与当前态。
- Evidence expected: Playwright trace。

### Notes

- `ScreenId` 固定为 `home | research | projects | advantages | partners | team | contact`。
- 不引入七个路由、浏览器历史同步或全局状态库。
- 现有通用 Button 只有在匹配 Figma 且被真实复用时才使用，不围绕它过度设计。

