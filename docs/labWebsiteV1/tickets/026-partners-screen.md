## Issue: 026 — Partners 画面
Description: 交付合作介绍与 Figma Logo 墙的双语响应式画面
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/partners/**, src/content/hil-site/partners.ts, public/images/hil-site/partners/**, e2e/partners.spec.ts, docs/design-references/hil-site/partners/**
Blocked by: 010, 011
User stories covered: US-002, US-004

### What to build

实现 N-01 合作介绍和 N-02 合作伙伴展示。只使用 001 从 Figma 确认并导出的 Logo；伙伴名称、顺序、链接和辅助文本按 Figma 与对应内容编号处理。

### Acceptance criteria

- [ ] 两种语言下合作介绍和 Figma 要求的全部伙伴名称、Logo 与链接顺序一致。
- [ ] Logo 在 390px 与 320px 下清晰重排，不拉伸、不裁掉品牌主体，并具有正确替代文本。

### Validation
Fulfills: VAL-032, VAL-033
- Verification: npm run test:e2e -- --grep "partners screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口检查伙伴顺序、Logo、链接与替代文本。
- Evidence expected: 含桌面与移动 Logo 墙截图的 Playwright trace。

### Notes

- 用户已决定 Figma 交付媒体可用于 V1；未出现在 Figma 的 DOCX 候选 Logo 不进入正式资源。
- 不从第三方网站运行时加载 Logo。

