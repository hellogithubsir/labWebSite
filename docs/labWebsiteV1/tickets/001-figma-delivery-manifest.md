## Issue: 001 — Figma 七画面交付清单
Description: 建立七个画面、交互状态、正式素材和双语内容编号的唯一可追溯清单
Type: AFK
Milestone: m0-delivery-readiness
Touches: docs/research/hil-site-figma-manifest.md, docs/design-references/hil-site/**
Blocked by: None
User stories covered: US-001, US-002, US-003

### What to build

读取 Figma 文件中的七个正式画面及其组件状态，记录稳定画面名称、节点 ID、导航顺序、原始桌面尺寸、移动节点或推导规则、原型连接、动效参数和截图。把每个可见区块与 English/Chinese DOCX 的 H/R/P/A/N/T/C 编号关联，并只登记 Figma 实际使用的图片、Logo、SVG 和字体。

### Acceptance criteria

- [ ] Home、Research Directions、Projects、Technology Advantages、Partners、Team、Contact 各有唯一正式节点和截图。
- [ ] 每个画面都记录桌面尺寸、移动状态、导航目标、CTA、可操作组件及动效状态；缺失值使用本规格的已确认默认值。
- [ ] 每个可见内容区和正式媒体都能追溯到 Figma 节点及适用内容编号，不把整页 PNG 当运行时页面。

### Validation
Fulfills: VAL-001, VAL-002
- Verification: make check-guardrails (exit zero)
- Command / scenario: 逐个打开七个节点，将清单中的节点 ID、截图、画面名称、内容编号和交互状态与 Figma 对照。
- Evidence expected: Figma 交付清单和逐节点截图。

### Notes

- Figma 来源：https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=0-1&p=f
- 当前 Figma View 席位调用额度已耗尽；额度恢复前本票保持阻塞，但不阻塞 002 和 003。
- Figma 中出现的媒体按用户决定视为 V1 可用；未出现在 Figma 的归档媒体不登记为正式资源。
- 若 Figma 实际不是七画面单 URL 模型，停止后续页面票并请求用户确认，不自行改写架构。
