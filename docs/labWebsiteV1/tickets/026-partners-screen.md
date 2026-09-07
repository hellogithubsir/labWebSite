## Issue: 026 — Partners 画面
Description: 交付合作介绍与设计 Logo 墙的双语响应式画面
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/ScreenRenderer.tsx, src/components/hil-site/screens/partners/**, src/content/hil-site/partners.ts, public/images/hil-site/partners/**, e2e/partners.spec.ts, docs/design-references/hil-site/partners/**
Blocked by: 025
User stories covered: US-002, US-004

### What to build

实现 N-01 合作介绍和 N-02 合作伙伴展示。只使用 001 从 Photoshop 交付包确认并落库的 Logo；伙伴名称、顺序、链接和辅助文本按设计交付与对应内容编号处理。

### Acceptance criteria

- [ ] 两种语言下合作介绍和设计交付要求的全部伙伴名称、Logo 与链接顺序一致。
- [ ] Logo 在 390px 与 320px 下清晰重排，不拉伸、不裁掉品牌主体，并具有正确替代文本。

### Validation
Fulfills: VAL-032, VAL-033
- Verification: npm run test:e2e -- --grep "partners screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口检查伙伴顺序、Logo、链接与替代文本。
- Evidence expected: 含桌面与移动 Logo 墙截图的 Playwright trace。

### Notes

- 仅使用 Photoshop 交付包随附且确认可用于官网的媒体；只在 DOCX 或归档中出现的候选 Logo 不进入正式资源。
- 不从第三方网站运行时加载 Logo。
