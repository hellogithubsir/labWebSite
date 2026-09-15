# Harmonizing Intelligence Lab

**项目状态：初版完成（2026-09-08）。**

本仓库是 Harmonizing Intelligence Lab 官网的 Next.js 16 / React 19 前端。`/` 包含 Home、Research、Projects、Advantages、Partners、Team、Contact 七画面，中英双语；导航保持单 URL，刷新恢复英文 Home。

## 开发与验证

使用 `.nvmrc` 的 Node 24，新 checkout/worktree 先运行 `npm ci`。应用代码在 `src/`，正式资源在 `public/`；同级 `../labWebSite-archive/` 仅供参考，不参与构建或运行时。

- `npm run dev`：本地开发。
- `make check`：命名护栏、ESLint、TypeScript strict、生产构建。
- `make test-guardrails`：护栏接受/拒绝案例自测。
- `make check-ui`：构建并自动启动生产服务器，执行完整 Playwright。
- `make check-release`：串行执行上述工程、自测及浏览器门禁；健康断言包含在 E2E 中。

发布验收保存成功 trace 时，用仓库外持久目录：

```sh
make check-release PLAYWRIGHT_ARGS="--trace on --output=/absolute/persistent/evidence/playwright"
```

Playwright 独占 `127.0.0.1:3000`，`reuseExistingServer=false`；不要与其他构建同时运行。默认 `.next/playwright-results` 会被后续 Next 构建清理，不能作为唯一交付证据。命令日志放在 Playwright output 目录之外。

## V1 交付状态

### 技术优势页改版（2026-09-16）

技术优势页按 V4 内容展示八项默认展开的独立图文区块，01—03 为核心技术、04—08 为前沿储备。配图为可缩放 SVG 与双语文字；手机重排流程，页脚提供项目和联系入口。原表格、照片带与折叠交互由此布局替代，首页摘要及其他画面保持。设计依据与验收见[技术优势改版记录](docs/design-references/hil-site/advantages-refresh-evidence.md)。

### 项目页扩充（2026-09-15）

2026-09-16 最新状态：03 四类项目统一为纵向展示，标题与用途、配图、切换控件、两段正文依次排列；全部四类支持原生停靠画廊、跟手拖动、连续选择及响应式对齐。18张图片更新为写实概念配图，3张清晰原图保留，核心文案和01/02保持。见[配图记录](docs/design-references/hil-site/projects-photo-assets.md)与[最终验证](docs/design-references/hil-site/projects-vertical-evidence.md)。以下为前期迭代记录。

项目页按本轮确认布局组织为四类能力、两个精选系统、21 个项目与产业应用案例及联系入口。03 阅读优化后，AI 使用深蓝图文融合与短名称选择，边缘智能和数字产品使用左文右图，数字化升级使用功能清单与系统界面。用途与两段介绍默认可见，结果与验证限制进入补充信息；语言切换保留选择，离页重新进入恢复默认。

复用 13 张来源图片，补入 8 张标明“应用场景示意”的生成图片。双语文案与媒体来源见[项目目录素材说明](docs/design-references/hil-site/project-directory-assets.md)，验证与截图见[改版证据](docs/design-references/hil-site/projects-refresh-evidence.md)。

后续图文阅读优化的范围与最终验证见[阅读优化证据](docs/design-references/hil-site/projects-reading-evidence.md)；页面导语、01、02、联系入口及全部图片保持上一轮实现。

最新调整：项目页移除全部补充信息与可见图片说明；对六张原本带深蓝压暗的横幅和一张保险图做确定性调色。仅这七张图片使用固定请求版本避开旧优化缓存，其他图片与核心介绍保持。原因、前后对照及验收见[图片与提示清理记录](docs/design-references/hil-site/projects-brightness-evidence.md)。

两份用户指定的 V4 HTML 作为只读来源，其精确路径登记在 `constraints.yaml` 的 `allowed_reference_paths`；命名护栏使用 NUL 分隔读取中文文件名。其他版本文件和运行时目录不在例外内，护栏自测覆盖这两个拒绝场景。原 DOCX 及其他既有删除状态保持不变。

ESLint 仅额外排除只读素材来源项目 `docs/reference/company-website-main_1/**`，避免用当前 Next.js 规则检查其旧 Vue/Bootstrap/jQuery；正式源码、测试与配置继续受检。

031 在 Node 24 干净安装后完成本地发布门禁，rehabilitation 已关闭；大规模重构仍未授权。健康端点 `GET /healthz` 返回 HTTP 200 和精确 JSON `{"status":"ok"}`。完整命令、退出码、trace、七画面双语桌面/移动截图及 Photoshop 对照见[发布证据索引](docs/design-references/hil-site/release/evidence-index.md)。

已实现七画面导航、语言保持、参考动效（700ms 提交、1500ms 完成）与输入锁、reduce 状态、双轮播、八项技术图文展示、成员筛选和联系操作。正式视觉以 [Ticket 001 清单](docs/research/hil-site-design-manifest.md)和 Photoshop 为准；Figma 保留来源链，DOCX 仅补缺失编号内容。[规格](docs/labWebsiteV1/spec.md)记录授权、交互及串行票据。

030 与完整规格审查发现的 F1/F2 已修复并复验；031 提交 `97bab98` 时点快照：031 独立审查和 032 最终核验待完成；当前结论以[031 审查与 032 报告](docs/design-references/hil-site/release/evidence-index.md#当前审查与核验依据)为准。站点尚未部署。

## 访客内容更新

2026-09-15：七画面双语清除可见内部编号、素材路径和制作说明；九项合作伙伴展示十个官方品牌图像，九位成员使用已核实研究资料的一句双语简介。机构名称、顺序和成员现有学位分类保留；官方品牌和论文资料不独立证明当前合作、就读或任职关系。研究简介与 Logo 无未确认项。

来源及响应式、发布门禁证据见[内容更新证据索引](docs/design-references/hil-site/content-refresh/evidence-index.md)。050–053 已完成独立审查，054 的 VAL-101–VAL-105 五项独立断言及最终产品全规格审查均通过，无未处置发现；文档闭环依据见索引中的审查任务与 mission 记录。未覆盖 PIC，未推送或部署。

## 首页与团队信息统一

首页双语团队摘要统一为 Chaw、Jeff、Wendy 三位负责人，与团队页共享姓名和职位；研究人员卡片保留具体身份及简介，移除字段标签。Jeff 负责人卡片补入研究方向、简介与联系邮箱。用户确认、研究依据及验证审查记录见[人物信息统一索引](docs/design-references/hil-site/team-alignment/evidence-index.md)。

## 中文文案与姓名修正

中文负责人及研究人员姓名按用户纠正统一为王泓清；七页分类、正文和职位标签使用自然中文，保留专业术语与专名。英文版和原图保持，首页仍复用三位负责人信息。逐项依据、英文基线比较及验证审查记录见[中文文案索引](docs/design-references/hil-site/chinese-copy/evidence-index.md)。

## 保留的限制

- CI 安装依赖和 Chromium、运行工程及 E2E 的配置已经核对，本次是干净本地等价执行；远端 GitHub Actions、gitleaks、CodeQL 未运行，不声明其成功。
- `npm ci` 报告 19 项依赖公告（3 low、5 moderate、10 high、1 critical；2026-09-15 干净安装），完整安装日志保留；未运行 audit fix 或升级依赖。
- 未配置自动重复代码/未使用导出检测和本地 hook manager；保留人工审查及 CI/显式护栏命令。
- 媒体仅获本地 V1 使用授权，公开发布权利仍待确认；原交付未含中文/移动 PSD 或非 PI 成员照片；本轮已从官方渠道补入伙伴 Logo，按清单的内容与重排规则实现。

## 工程参考

- [AGENTS.md](AGENTS.md)、[CONTEXT.md](CONTEXT.md)、[constraints.yaml](constraints.yaml)：边界、状态和工程约束。
- [040 动效当前行为与证据](docs/design-references/hil-site/transition/040-reference-motion.md)：轨道在提交后用 300ms flex 重排；旧 250ms 与 030 记录保留为历史快照。
- [单 URL 决策](docs/adr/0001-single-url-screen-sequence.md)、[原生过渡决策](docs/adr/0002-native-css-page-transition.md)。
- [MIT–IBM 历史参考](docs/reference/mitibm-section-navigation/README.md)：仅保留研究来源，正式动效以 V1 交付和批准规格为准。
