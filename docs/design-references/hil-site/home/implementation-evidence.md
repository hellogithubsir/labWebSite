# Home 上半部交付证据 — Ticket 020

实现范围为 H-01 至 H-03：一个品牌 Logo、一个语义化 H1、Hero、三价值标签、三研究支柱、三技术能力及两个 CTA。H-04 起由 021 接续。

## 视觉来源

- 最终对照：原包 `02_Reference_PNG_sRGB/01-HOME-V1-FINAL-sRGB.png`，1920px；上半约 2820px。
- Hero：原登记 `03_Assets/01-HOME/hero-art.png` 是局部裁切，缺少最终构图左下长尾。已从 `03_Assets/Native_Source_PSD/home.psd` 的 `02 Hero — editable copy and replaceable visual / 主视觉 融合图片图层` 提取原始透明像素，bbox `[222,88,1492,848]`，1270×760，无文字、无重绘。替换唯一正式 `public/images/hil-site/home/hero-art.png`。叶片、圆弧、左下长尾与最终 PNG 对齐，桌面约 1.26 倍缩放、160px 顶部位置和 Hero 底部裁切；移动端自然比例置于文字后。
- H-02 三纯图标由最终 PNG 原像素提取，矩形 `[326,1586,442,1706]`、`[804,1586,920,1706]`、`[1282,1586,1398,1706]`，各 116×120；不含正文。全局 assets.json 已同步来源。
- 标题、段落和列表均是 React DOM；没有整页图片、iframe 或运行原 HTML。中文以同编号 DOCX 为准，设计独有标题与短文完成中文对齐。Hero H1 沿用 012 已确认的大小写与中文文案。
- 1920px 按最终图核对 Hero 1080px、价值条、三柱横排、技术行。390px/320px 单列，标题和正文自然增高，按钮换行。无移动原图，未声称像素等同。

## 验证结果

- 先红：`npm run test:e2e -- --grep "home upper" --trace on`，退出 1；原占位 Home 不存在 Explore Research 按钮。
- 首轮绿及既有行为回归：`npm run test:e2e -- --grep "home upper|root page|locale|site navigation|page transition" --trace on`，退出 0，20/20。包含单 H1/Logo、七屏导航、语言保留、刷新默认、250ms 转场、重复输入锁和 reduce。
- Hero 素材调整后：`npm run test:e2e -- --grep "home upper" --trace on`，退出 0，7/7。两语言 × 1920/390/320 截图，全部三研究/三技术内容存在、图片加载、无页面横向溢出。截图前逐项等待 ScrollReveal 实际显现。
- `npm run lint`、`npm run typecheck` 退出 0。
- CTA：Explore Research → research，中文联系合作 → contact；实际过渡完成后 URL `/` 不变且 locale 保留。

证据根目录：`docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/020/`（集成仓库，运行时忽略目录）。六组截图位于 `home-home-upper-<locale>-<width>-content-and-responsive-layout/home-<locale>-<width>.png`；每组均带 `trace.zip`。CTA trace 位于 `home-home-upper-primary-CTA-preserves-URL-and-locale/trace.zip`。

本票局部 CSS module 与资产索引修改由编排任务明确扩展 ownership 授权。未修改 README；产品完成状态由最终交付票统一更新。
