## Issue: fx-001 — 修正语言回归的品牌 Logo 定位范围

Description: 修复正式内容增长后语言回归错误地假定页面只有一张图片的门禁失败
Type: AFK
Milestone: m2-home
Touches: e2e/locale.spec.ts
Blocked by: 021

### Cause

m2-home 的 `make check-ui` 失败：Home 下半部完成后页面已有六张图片，`e2e/locale.spec.ts` 仍以整页图片集合断言唯一图片。失败来自测试将所有内容图片当作品牌 Logo 的定位范围，不应删除正式媒体来满足测试。

本票通过 `devflow amend` 追加；保留现有 feature 字段、契约与断言归属。`features.json` 是调度器生成的追加结果，不通过重新 compile 覆盖。

### What to build

只调整语言测试对品牌 Logo 的语义定位。所有七画面、两个 Locale 和 1920/390/320 视口均验证唯一可访问品牌 Logo，并按当前 Locale 检查精确替代文本；其他有意义图片继续存在。

### Acceptance criteria

- [ ] Logo 唯一性与当前语言下的准确替代文本均被验证。
- [ ] 不使用 `first()` 隐藏重复 Logo，不删除替代文本、唯一性、Locale 保持、刷新、URL 或导航断言。
- [ ] 仅修改 `e2e/locale.spec.ts`，不修改产品内容。

### Validation

Fulfills: None（修复既有验收，不新增或重分配契约断言）
- Verification: npm run test:e2e -- --grep "locale" --trace on (exit zero)
- Evidence expected: 原始失败与修复后测试日志、退出码及 trace；由独立审查任务审查，修复 worker 不自审。
