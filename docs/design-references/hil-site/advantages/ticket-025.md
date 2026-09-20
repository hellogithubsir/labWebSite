# Ticket 025 — Technology Advantages

> **归档说明（2026-09-17）**：下方"证据目录"引用的 `evidence/025/` 已在项目收尾清理中删除；描述保留为历史记录。

设计权威：Photoshop 交付包 `02_Reference_PNG_sRGB/04-TECHNOLOGY-ADVANTAGES-V1-FINAL-sRGB.png`（1920 × 3466）。`05_Source_HTML/website-code-seven-pages/04-technology` 仅作交互语义参考；中文按 `bilingual-source.json` 的 A-01–A-08 编号压缩为同等设计摘要。

- 页首保留 Technology Advantages／技术优势，八项简介明确区分核心技术与前沿储备。
- A-01–A-03 按最终图呈现编号、名称、方法、优势四列；标题直接复用 Home 唯一文案。A-01 的工业与医学数据、SAS 认证及 B2B 实践，A-03 的嵌入式芯片及 AIoT 边界采用最终图，未扩大为额外认证或指标。
- Field Evidence 复用 assets.json 中 shared 的 lab-vision、lab-hardware、lab-prototype，桌面按最终图横向裁切；移动端改为 4:3 单列。照片、标签、补充说明均按最终图语义对应。
- A-04 占整行，展开时标题左列、正文右列；A-05–A-08 为两列。按已批准 04 交互覆盖静态图：五项默认全部折叠、各自独立，原生 button 支持点击／Enter／Space，aria-controls 关联 region，aria-expanded 与 aria-hidden/inert 同步。
- 展开采用 300ms grid 行高过渡，减少动画时 transition:none；移动版单列增长，不隐藏或截断文案。复用 ScrollReveal、SiteFooter 与全局 tokens。

证据目录：`docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/025/`。

- `red/`：占位画面没有八项标题，首个浏览器测试退出 1。
- `browser/`：首轮六组通过；检查截图后调整 A-04 桌面正文列，以及截图回顶部以稳定 fixed 导航位置。
- `final/`：Node 24.20.0；六组 en/zh-CN × 1920/390/320 默认全页图、两张桌面 A-04 展开图和 trace。已目视核对桌面构图、英文移动换行、中文窄屏与折叠排列。实际默认状态比静态图隐藏 A-05–A-08 正文，属于批准交互差异。

验证：Advantages 六组与既有 navigation、locale、page transition 及 Home locale CTA 共 19 条通过；lint 与 typecheck 退出 0。测试同时检查全部媒体加载、内容顺序、可访问 region 的显示/隐藏、五项独立展开、键盘焦点、300ms/reduce、320/390 无横向溢出与 URL 不变。

附加授权范围：根目录 `ops.yaml` 仅汇总既有确定的 Node、验证、证据、截图和素材复用事实，不新增运行时或流程状态。
