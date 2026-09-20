# Ticket 026 — Partners

> **归档说明（2026-09-17）**：下方"证据目录"引用的 `evidence/026/` 已在项目收尾清理中删除；描述保留为历史记录。

设计权威：Photoshop 交付包 `02_Reference_PNG_sRGB/05-PARTNERS-V1-FINAL-sRGB.png`（1920 × 2531）。N-01 页首与合作介绍、N-02 机构墙、N-03 页尾对应 `pages.json` 的同名分组。`05_Source_HTML/website-code-seven-pages/05-partners` 仅补语义；N-01 导语和 N-02 中英机构名称来自 `bilingual-source.json` 同编号内容。设计中新增小标题、合作介绍与页尾的中文按英文语义本地化。

- 保留 Partners／合作伙伴标题；N-02-01 至 N-02-09 顺序固定，英文和中文均展示九家正式机构名称。
- 交付包没有独立机构 Logo 图像。根据本轮明确裁决，采用设计中的原生文字字标，不伪造图片、外链或额外合作背书；无需给原生文本加图片替代文本。唯一图片复用 `assets.json` 的共享实验室品牌 Logo，alt 按 locale 统一。
- 按同一裁决移除 Logo file/location、TBD、Public use 状态与替换素材的操作说明；保留业务介绍。机构名称不作为无目标链接，也不加入无交互 tabindex。
- 桌面沿用页首浅纸色、介绍分隔线、三列机构墙、按行纸色和按列青／蓝／绿顶边。移除维护信息后保留网格空间；页尾复用 SiteFooter。390/320 改为单列，长机构名自然换行，不裁切、拉伸或隐去内容。
- 本页复用 ScrollReveal；联系标题 CTA 在同一 URL 到 Contact，邮件链接保持 `mailto:chawjk@ukm.edu.my`。

证据目录：`docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/026/`。

- `red/`：首个英文桌面测试退出 1，占位页 `main h3` 为空，证实目录断言有效。
- `green/`：第一轮 5/6 通过；首个桌面场景在 reveal 动画期间测量卡片 y 坐标，改为先等待真实动画结束再测量。
- `verified/`：6/6 通过，已逐一目检 en/zh-CN × 1920/390/320 全页截图：完整文字、桌面三列与移动单列、品牌比例、页尾均正确。
- `final/`：Node 24.20.0 最终 Partners 与既有导航、语言、过渡及 Home 回归，包含六组 Partners 全页图与 trace。

测试覆盖：双语精确机构顺序、导语与合作正文、品牌 alt/成功加载、机构标题无截断、桌面同排与移动换行、页面无横向溢出、邮件链接和联系 CTA、URL 保持不变。工程验证运行 lint、typecheck 与护栏自测；无新增依赖或工程约束变更。
