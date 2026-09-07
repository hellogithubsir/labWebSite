# Home 下半部交付依据（021）

唯一实现为 HomeScreen → HomeOverviewSections，延续 020 的 Hero、价值条、研究方向和技术映射。

## 设计与文案

- 视觉依据：原包 02_Reference_PNG_sRGB/01-HOME-V1-FINAL-sRGB.png 的 H-04 至 H-07。
- H-04：Smart Grocer → DOCX P-05；Digital Concierge → P-03；NAS → P-04。最终稿 Smart Grocer 结果为“消除人工录入、大幅提升结账速度”，不采用源 HTML 的旧文案。
- H-05：六项文字伙伴墙、三张实验照片与一张全景；caption 下的说明来自最终 PNG，补齐中文。
- H-06：PI 和前三位核心成员，姓名保留 DOCX 原有形式，不增加未交付头像。
- H-07：保留最终合作文案及真实 mailto；标题按钮为 Contact 跨屏入口。共享 SiteFooter 承担七画面的统一深蓝 closing 设计职责，仅接收标题、正文及联系回调。
- 项目、伙伴、团队的现有标题为键盘可操作的跨屏入口；hover 使用 teal，焦点遵循现有全局轮廓。不增添设计未提供的卡片按钮。

## 项目插画来源

原生 home.psd 的“重点项目图形”仍为旧构图，最终 PSD 的 H-04 只有合成可见层。使用最终 PNG 的无文字矩形 `[580,3240,1084,3790]`，不缩放提取至 selected-project-art.png（504×550）。裁切保留卡片背景，少量左边缘电路线在矩形边界结束；未重绘、未带入正文。具体来源见 assets.json。020 的 hero-art.png 未修改。

## 响应式与验证入口

- 1920px 保留项目主卡与右列、六伙伴横排、三图加全景、双列团队与页脚。
- 390/320px 顺序单列，20px 页面边距；照片保留原比例，正文不固定高度，成员角色和邮箱可达。
- `npm run test:e2e -- --grep "home full page"`：唯一内容顺序、3/6/4/4 项数量、加载成功、无横向滚动、邮件目标、四个跨屏入口的 Locale/URL 保持，以及双语三视口全页截图。
- 截图先逐项滚动完成 reveal，再回页首等待动画结束。
- 新顺序测试实现前因 home-projects 缺失而失败；导航测试经 Projects→Partners 错误目标突变证实可失败，随后恢复。
- 020 图片回归保持全部 main img 断言：先滚动加载下半部懒加载图，再断言完整尺寸，不以缩小检查范围绕过。
- 运行证据由本轮 mission 的 evidence/021 保存；本文件仅记录设计来源与验证方式，不冒称最终独立审查通过。
