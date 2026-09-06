## Issue: 022 — Research Directions 画面
Description: 交付三大研究支柱、协同关系和项目映射的双语响应式画面
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/research/**, src/content/hil-site/research.ts, public/images/hil-site/research/**, e2e/research.spec.ts, docs/design-references/hil-site/research/**
Blocked by: 010, 011
User stories covered: US-002, US-004, US-005

### What to build

实现 Research Directions 的研究概览、HEALTH、EDGE-AI、AGENT、三者协同关系以及场景与项目映射。关系图优先使用 Figma 交付；Figma 未提供图形时，以内容文档描述构建可访问的信息结构，不生成新的视觉主题。

### Acceptance criteria

- [ ] 两种语言下完整显示 R-01 至 R-06，并保持三个研究支柱的边界、联系和项目映射。
- [ ] 390px 与 320px 下关系信息和映射内容按逻辑顺序重排，无截断或横向溢出。
- [ ] Figma 指定的展开、链接或关系图状态可由键盘和指针访问，且不会切换到错误画面。

### Validation
Fulfills: VAL-021, VAL-022, VAL-023
- Verification: npm run test:e2e -- --grep "research screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口浏览完整研究页并操作 Figma 指定状态。
- Evidence expected: 含全页截图与交互记录的 Playwright trace。

### Notes

- 不把项目完整描述复制到研究映射中，只显示 Figma 和 R-06 要求的映射信息。
- 关系图必须有等价文字信息，不能成为理解研究关系的唯一方式。

