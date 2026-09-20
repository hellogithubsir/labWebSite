# V1 发布证据索引

> **归档说明（2026-09-17）**：本文引用的 `missions/*/evidence/` 二进制证据（截图 PNG、trace.zip、日志）已在项目收尾清理中删除以释放本地空间；下方所有指向 evidence 路径的链接均已失效。文本记录（spec、tickets、reports、reviews、progress_log）仍保留于各 mission 目录，结论性内容以本文及对应报告为准。

## 2026-09-16 首页与团队内容当前依据

首页精选与子页数据统一、Jeff毕业身份和人数调整，以[一致性修正记录](../content-consistency-evidence.md)为当前依据。此前首页三项精选截图及Jeff在读角色断言保留为历史证据，不用于评判本轮已获批行为；研究页与项目成果承接未纳入本轮修改。

## 2026-09-16 技术优势页当前依据

技术优势页已按用户批准的 V4 八项图文方案替代旧表格与折叠布局。[改版记录、设计映射与验证](../advantages-refresh-evidence.md)是当前页面依据；下方 025/030 的技术优势截图与折叠交互仅保留为历史证据，不代表当前状态。其他画面的既有证据保持原用途。

031 的运行时基线：`ffc8cf6e948aa30e65fe1b660d6ac50ad76d077f`。本票只改发布入口与状态文档，不改页面实现。证据存放在主 mission 的持久目录，独立于临时 worktree 和 `.next`。

## 设计与内容来源

- [Ticket 001 完整清单](</Users/qingsir/Project/labWebSite/docs/research/hil-site-design-manifest.md>)：包含 PSD 组到 H/R/P/A/N/T/C 编号的逐区映射、来源冲突和移动推导规则。
- [画面与 PSD 组坐标](</Users/qingsir/Project/labWebSite/docs/design-references/hil-site/pages.json>)；[正式媒体逐项来源](</Users/qingsir/Project/labWebSite/docs/design-references/hil-site/assets.json>)；[双语原文索引](</Users/qingsir/Project/labWebSite/docs/design-references/hil-site/bilingual-source.json>)。
- [实验室官网内容填写包 v4（English·Language-aligned）.docx](</Users/qingsir/Project/labWebSite/docs/reference/实验室官网内容填写包 v4（English·Language-aligned）.docx>)
- [实验室官网内容填写包 v4（中文版·语言统一版）.docx](</Users/qingsir/Project/labWebSite/docs/reference/实验室官网内容填写包 v4（中文版·语言统一版）.docx>)
- [交互状态](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/04_Documentation/INTERACTION_STATES.md>)。中文及移动端无独立 PNG，按同编号内容和已批准布局推导；不宣称存在中文或移动 Photoshop 原稿。
- Figma 仅作 provenance：[原文件](https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=0-1&p=f)；[HOME 63:2 — MASTER / HOME / Exact 1:1 Approved PNG](https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=63-2)。其余画面未登记单独 Figma 节点，不虚构节点映射。

| 画面 | Photoshop 原稿 | 最终 sRGB PNG / 画布 |
| --- | --- | --- |
| home | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/01-HOME-V1-FINAL.psd>) | [1920×6668](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/01-HOME-V1-FINAL-sRGB.png>) |
| research | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/02-RESEARCH-DIRECTIONS-V1-FINAL.psd>) | [1920×6685](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/02-RESEARCH-DIRECTIONS-V1-FINAL-sRGB.png>) |
| projects | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/03-PROJECTS-V1-FINAL.psd>) | [1920×4716](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/03-PROJECTS-V1-FINAL-sRGB.png>) |
| advantages | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/04-TECHNOLOGY-ADVANTAGES-V1-FINAL.psd>) | [1920×3466](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/04-TECHNOLOGY-ADVANTAGES-V1-FINAL-sRGB.png>) |
| partners | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/05-PARTNERS-V1-FINAL.psd>) | [1920×2531](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/05-PARTNERS-V1-FINAL-sRGB.png>) |
| team | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/06-TEAM-V1-FINAL.psd>) | [1920×4796](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/06-TEAM-V1-FINAL-sRGB.png>) |
| contact | [PSD](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/01_PSD_PSB/07-CONTACT-V1-FINAL.psd>) | [1920×6076](</Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery/02_Reference_PNG_sRGB/07-CONTACT-V1-FINAL-sRGB.png>) |

## 七画面双语视觉矩阵

主验收 28 组为 1920px / 390px × en / zh-CN × 七画面；另列 14 组 320px。以下全部引用 [030 最终 28 组索引](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/visual-28-index.json>) 与 [42 组完整索引](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/upstream-visuals.json>)，不使用早期壳层截图。

14 张桌面截图复用的依据是 [修复后桌面坐标验证](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/desktop-coordinates.json>)；28 张移动截图均由 fx002/fx003 修复后重新捕获。截图均完成 reveal、菜单关闭及动画稳定；默认筛选为 all，折叠区默认关闭，轮播采用交付默认帧。

| 画面 | 语言 | 桌面 1920 | 移动 390 | 移动 320 |
| --- | --- | --- | --- | --- |
| home | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/021/home-full-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/home-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/home-en-320.png>) |
| home | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/021/home-full-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/home-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/home-zh-CN-320.png>) |
| research | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/022/browser/research-research-screen-1-76116-h-content-and-pillar-action/research-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/research-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/research-en-320.png>) |
| research | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/022/browser/research-research-screen-1-d10dc-e-content-and-pillar-action/research-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/research-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/research-zh-CN-320.png>) |
| projects | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/024/browser/projects-project-catalog-a-f5644-sh-keyboard-drag-and-layout/projects-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/projects-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/projects-en-320.png>) |
| projects | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/024/browser/projects-project-catalog-a-98b2b-se-keyboard-drag-and-layout/projects-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/projects-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/projects-zh-CN-320.png>) |
| advantages | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/025/final/advantages-advantages-scre-38c06--and-independent-disclosure/advantages-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/advantages-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/advantages-en-320.png>) |
| advantages | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/025/final/advantages-advantages-scre-1b030--and-independent-disclosure/advantages-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/advantages-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/advantages-zh-CN-320.png>) |
| partners | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/026/final/partners-partners-screen-1920-English-directory-and-contact/partners-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/partners-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/partners-en-320.png>) |
| partners | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/026/final/partners-partners-screen-1920-Chinese-directory-and-contact/partners-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/partners-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/partners-zh-CN-320.png>) |
| team | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/027/final-team/team-team-screen-1920-English-content-media-filters/team-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/team-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/team-en-320.png>) |
| team | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/027/final-team/team-team-screen-1920-Chinese-content-media-filters/team-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/team-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/team-zh-CN-320.png>) |
| contact | en | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/028/final/contact-contact-screen-1920-English-content-and-actions/contact-en-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/contact-en-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/contact-en-320.png>) |
| contact | zh-CN | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/028/final/contact-contact-screen-1920-Chinese-content-and-actions/contact-zh-CN-1920.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/contact-zh-CN-390.png>) | [截图](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/contact-zh-CN-320.png>) |

## 交互补充证据

- [最终移动观察记录](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/observations.json>)：两语言、390/320、normal/reduce 共 8 组，56 画面状态与 32 次四键导航。[执行结果](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/final-mobile-r2/execution-result.json>)。
- [减少动画完整流程](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/reduced-motion-r1/observations.json>)：双语完整流程，目标显示最大 7.8ms；[执行结果](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/030/reduced-motion-r1/execution-result.json>)。
- 030 的旧视觉观察仅是历史审阅记录；移动布局最终结论以上述 final-mobile-r2 为准。

## 031 干净本地发布门禁

运行 Node 24.20.0 / npm 11.12.1；初始无 node_modules，npm ci 从锁文件安装。以下命令全部退出 0，完整 Playwright 为 84 passed、0 skipped。完成时间 2026-09-08T02:48:08.754302+00:00。

| 步骤 | 命令 / 结果 | 原始证据 |
| --- | --- | --- |
| 干净安装 | npm ci；627 packages，退出 0 | [日志](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/install.log>) |
| 浏览器准备 | npx playwright install chromium，退出 0 | [日志](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/chromium.log>) |
| 串行发布门禁 | make check-release；make check → make test-guardrails → make check-ui；84 passed，退出 0 | [日志](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/release.log>) |
| 独立健康请求 | curl --fail --include /healthz；HTTP 200、精确 JSON，退出 0 | [日志](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/health-response.txt>) |

[命令退出码和时间](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/commands.json>)；[健康断言与退出码](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/health-result.json>)。完整调用：

```sh
npm exec --yes --package=node@24 -- sh -c 'make check-release PLAYWRIGHT_ARGS="--trace on --output=/Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/playwright"'
```

84 个成功 trace 保存在 [Playwright 证据目录](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/playwright>)。可定位示例：

- [healthz-health-response-is-an-exact-successful-JSON-status](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/playwright/healthz-health-response-is-an-exact-successful-JSON-status/trace.zip>)
- [navigation-mobile-topbar-3-bc986--and-independently-operable](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/playwright/navigation-mobile-topbar-3-bc986--and-independently-operable/trace.zip>)
- [projects-project-catalog-a-98b2b-se-keyboard-drag-and-layout](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/031/playwright/projects-project-catalog-a-98b2b-se-keyboard-drag-and-layout/trace.zip>)

[CI 配置](</Users/qingsir/Project/labWebSite/.github/workflows/ci.yml>) 已核对：frontend-quality 安装依赖后 make check，critical_ui 安装依赖/Chromium（Linux 使用 --with-deps）后 make check-ui；本机 macOS 安装 Chromium 并执行相同项目门禁。VAL-005 不要求远端运行；远端 Actions、gitleaks、CodeQL 本轮未运行，不声明通过。

## 状态与尚存限制

rehabilitation 在上述门禁与正式视觉证据齐备后关闭，broad_refactor_allowed 仍为 false。031 提交 `97bab98` 时点快照：031 独立审查和 032 最终核验待完成；当前结论以[031 审查与 032 报告](#当前审查与核验依据)为准。依赖安装报告 18 项公告（3 low、4 moderate、11 high）及 node-domexception 弃用提醒，未执行 audit fix 或升级。自动重复代码/未使用导出检测、本地 hook manager、素材公开发布权利确认仍未完成；本地实现不包含公开发布。

## 当前审查与核验依据

031 独立审查结论见[031-r1.json](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/reviews/031-r1.json>)；032 最终核验的最新结论及逐项结果见[032.json](</Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/reports/032.json>)。读取报告中的实际通过、失败或阻塞结果判断当前状态；上述快照不代表当前待办，也不替代报告结论。
