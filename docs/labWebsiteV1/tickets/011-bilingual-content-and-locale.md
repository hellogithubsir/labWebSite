## Issue: 011 — 中英双语内容与语言切换
Description: 将两份参考 DOCX 转换为本地双语内容契约并提供全站 Locale 控制
Type: AFK
Milestone: m1-shell-interaction
Touches: src/components/hil-site/LocaleControl.tsx, src/components/hil-site/HilSiteShell.tsx, src/content/hil-site/types.ts, src/content/hil-site/shared.ts, src/app/layout.tsx, e2e/locale.spec.ts
Blocked by: 001, 010
User stories covered: US-004, US-005

### What to build

建立 `en | zh-CN` 双语契约和语言控制。两种语言均以 Photoshop 设计稿可见文案优先；设计稿不可读或缺失时，英文按编号使用 English Language-aligned DOCX，中文按同编号使用中文版 DOCX。语言切换更新可见内容和页面语言语义，在七画面切换中保持，但不写入 URL 或持久化存储。

### Acceptance criteria

- [ ] 语言控制可由指针和键盘操作，切换后导航、画面标题、共享 CTA 和辅助文本使用同一 Locale。
- [ ] Locale 在画面切换期间保持，刷新后恢复英文 Home。
- [ ] 已实现内容不存在混合语言兜底、运行时 DOCX 读取或机器翻译调用。

### Validation
Fulfills: VAL-009, VAL-010, VAL-011
- Verification: npm run test:e2e -- --grep "locale" (exit zero)
- Command / scenario: 在 Home 切换中文，依次访问七个画面，再刷新并确认恢复英文 Home。
- Evidence expected: Playwright trace 和双语状态截图。

### Notes

- 只读内容来源：`docs/reference/实验室官网内容填写包 v4（English·Language-aligned）.docx` 与 `docs/reference/实验室官网内容填写包 v4（中文版·语言统一版）.docx`。
- 本票建立共享契约与壳层文案；各画面正文由对应页面票写入独立内容模块。
- 中文长文本必须允许换行，不以截断或缩小到不可读解决版式问题。
- HTML 文档语言应跟随当前 Locale。
