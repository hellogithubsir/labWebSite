# Ticket 024 — Projects 完整目录

设计权威为原 Photoshop 交付包 `02_Reference_PNG_sRGB/03-PROJECTS-V1-FINAL-sRGB.png`，状态来自 04_Documentation 与 Ticket 001 manifest，非默认帧语义来自 `05_Source_HTML/website-code-seven-pages/03-projects/index.html`。

- P-02：沿用 023 的 E-Linus 四帧；P-03：复用同一 ProjectCarousel 呈现 PDM Robot 的 frame-02、05、08、10，默认第二帧。四帧沿用 assets.json 已登记的 900×600 正式媒体，保持完整比例。
- P-03 默认帧的正文与三项 proof 采用最终 PNG（比 HTML 更完整）；其他帧采用交付 HTML。中文逐项对齐，截图内原始英文产品 UI 保留为证据媒体。
- P-04：复用 SiteFooter；标题按钮保持 Locale 并切换 Contact，URL 仍为 `/`；邮箱继续使用 mailto。
- 新区块沿用页面排版，仅追加 PDM 的绿色 accent 与 paper 背景。没有新增目录抽象或素材副本。

证据位于 mission `missions/evidence/024/`：`red/` 记录首次目录测试因缺少 PDM region 而失败；`browser/` 有六张 en/zh-CN × 1920/390/320 整页图与九条测试 trace。整页图均为 E-Linus 第1帧、PDM 第2帧，完成 reveal、等待轨道抵达终点并移开焦点后截图。已逐张目视核对：正文自然换行、操作可达、原比例图片完整、页面无横向溢出。

验证：`npm run test:e2e -- --grep "project catalog|project carousel" --trace on --output <evidence/024/browser>` 退出 0，9/9；`npm run lint` 与 `npm run typecheck` 退出 0。覆盖两个实例独立状态、caption/proof/进度、按钮、左右键、鼠标、真实 touch、边界、减少动画，以及六种布局下 Contact 语言与 URL 保持。
