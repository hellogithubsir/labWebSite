## Issue: 001 — Photoshop 七画面设计交付清单
Description: 验收七画面 Photoshop 原始交付并建立状态、正式素材和双语内容编号的唯一可追溯清单
Type: AFK
Milestone: m0-delivery-readiness
Touches: docs/research/hil-site-design-manifest.md, docs/design-references/hil-site/**, public/images/hil-site/**
Blocked by: 003
User stories covered: US-001, US-002, US-003

### What to build

验收已收到的七画面分层 PSD/PSB、全尺寸 sRGB PNG 对照图及随附原始图片、插画、Logo、图标、字体和状态说明。记录稳定画面名称、源文件或画板、导航顺序、最终画布尺寸、移动稿或推导规则、CTA、交互变体和动效参数；把每个可见区块映射到 H/R/P/A/N/T/C 编号，并将确认可用于官网的正式媒体按用途落到 `public/images/hil-site/`。现有 Figma URL 和 HOME 节点仅保留为来源链与恢复访问后的辅助核对。

### Acceptance criteria

- [ ] Home、Research Directions、Projects、Technology Advantages、Partners、Team、Contact 各有唯一正式 Photoshop 源画面和全尺寸 sRGB PNG 对照图。
- [ ] 每个画面都记录最终画布尺寸、移动稿或推导规则、导航目标、CTA、可操作组件及动效状态；缺失值使用本规格的已确认默认值；记录1920px画布和390px/320px推导，七项导航、250ms淡入淡出、两个项目轮播、团队筛选、技术折叠及移动菜单。
- [ ] 每个可见内容区和正式媒体都能追溯到 Photoshop 画面、图层复合或状态以及适用内容编号；正式媒体完成本地落库，整页 PNG 只作视觉对照。

### Validation
Fulfills: VAL-001, VAL-002
- Verification: make check-guardrails (exit zero)
- Command / scenario: 逐个打开七个 Photoshop 源画面和 PNG，对照清单中的画面名称、尺寸、内容编号、素材和交互状态，并核对正式媒体落库路径。
- Evidence expected: 设计交付清单、逐画面 PNG、素材索引和 Figma provenance 字段。

### Notes

- 素材从规格末尾绝对路径只读读取，直接核对04_Documentation与05_Source_HTML，不复制整包到worktree。记录全部来源冲突的已批准处理；后续页面worker只读取该清单及对应来源。
- Figma 来源链：https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=0-1&p=f；已知 HOME 节点为 `63:2`。View 席位额度恢复不是本票的唯一开工条件。
- DOCX 只补设计稿不可读或缺失的对应编号文案；仅在 DOCX 或归档中出现的媒体不登记为正式资源。
- 若 Photoshop 实际交付不是七画面单 URL 模型，停止后续页面票并请求用户确认，不自行改写架构。
