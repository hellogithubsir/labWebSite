## Issue: 024 — Projects 项目目录与合作入口
Description: 完成项目目录、设计交付详情状态和到 Contact 的双语合作流程
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/projects/ProjectsScreen.tsx, src/components/hil-site/screens/projects/ProjectCatalog.tsx, src/components/hil-site/screens/projects/ProjectCard.tsx, src/content/hil-site/projects.ts, public/images/hil-site/projects/**, e2e/projects.spec.ts, docs/design-references/hil-site/projects/**
Blocked by: 023
User stories covered: US-002, US-004, US-005

### What to build

在 023 的唯一 Projects 画面中加入设计交付要求的全部项目卡片和详情状态，只接续交付的PDM Robot轮播及两系统叙述，内容编号由001对照确认；不添加DOCX候选项目。仅使用 Ticket 001 登记的项目媒体；合作 CTA 切换到 Contact。

### Acceptance criteria

- [ ] 两种语言下可浏览设计交付要求的全部项目，标题、类别、摘要、详情和媒体与内容编号一致。
- [ ] PDM Robot复用023轮播，按钮、左右键、水平拖动均同步当前截图、caption、proof labels和进度；首尾禁用，reduce立即切换。
- [ ] 合作 CTA 切换到 Contact，保持当前 Locale，URL 仍为 `/`。

### Validation
Fulfills: VAL-027, VAL-028, VAL-029
- Verification: npm run test:e2e -- --grep "project catalog" (exit zero)
- Command / scenario: 在两种语言下浏览两个系统、操作轮播并从 Projects 进入 Contact。
- Evidence expected: 含项目目录截图与交互记录的 Playwright trace。

### Notes

- 不展示仅存在于 DOCX、但 001 未映射到设计交付的候选项目。
- 复用023的轮播契约，不创建第二套项目数据。
- 项目指标和归属措辞保持参考文档中的限定语，不擅自强化未经验证的陈述。
