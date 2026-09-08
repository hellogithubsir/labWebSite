# Ticket 041 — Transition validation (VALIDATION)

Type: VALIDATION

独立验证 Ticket 040，不修改被测实现。Proves: VAL-040。

## Verification

- `npx playwright test e2e/transition-reference.spec.ts`
- 验证 rail current 先行与约 300ms flex 时序、内容 500ms 延迟/300ms opacity、约 700ms 提交窗口。
- 验证连续输入锁、单一可访问画面、URL/Locale/焦点保持及 reduced-motion 即时完成。

证据：Playwright 报告、截图和 trace。
