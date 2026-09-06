## Issue: 024 — Projects 项目目录与合作入口
Description: 完成项目目录、Figma 详情状态和到 Contact 的双语合作流程
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/projects/ProjectsScreen.tsx, src/components/hil-site/screens/projects/ProjectCatalog.tsx, src/components/hil-site/screens/projects/ProjectCard.tsx, src/content/hil-site/projects.ts, public/images/hil-site/projects/**, e2e/projects.spec.ts, docs/design-references/hil-site/projects/**
Blocked by: 023
User stories covered: US-002, US-004, US-005

### What to build

在 023 的唯一 Projects 画面中加入 Figma 要求的全部项目卡片和详情状态，内容使用 P-03、P-05、P-06、P-07、P-08 对应条目。仅导入 Figma 实际展示的项目媒体；合作 CTA 切换到 Contact。

### Acceptance criteria

- [ ] 两种语言下可浏览 Figma 要求的全部项目，标题、类别、摘要、详情和媒体与内容编号一致。
- [ ] 卡片、Accordion 或其他 Figma 指定详情状态可由键盘和指针操作，且任意时刻只暴露正确详情。
- [ ] 合作 CTA 切换到 Contact，保持当前 Locale，URL 仍为 `/`。

### Validation
Fulfills: VAL-027, VAL-028, VAL-029
- Verification: npm run test:e2e -- --grep "project catalog" (exit zero)
- Command / scenario: 在两种语言下逐类浏览项目、操作详情并从 Projects 进入 Contact。
- Evidence expected: 含项目目录截图与交互记录的 Playwright trace。

### Notes

- 不展示仅存在于 DOCX、但 001 未映射到 Figma 的候选项目。
- 不修改 023 的筛选契约，不创建第二套项目数据。
- 项目指标和归属措辞保持参考文档中的限定语，不擅自强化未经验证的陈述。

