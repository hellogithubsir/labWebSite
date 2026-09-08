# Harmonizing Intelligence Lab

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

031 在 Node 24 干净安装后完成本地发布门禁，rehabilitation 已关闭；大规模重构仍未授权。健康端点 `GET /healthz` 返回 HTTP 200 和精确 JSON `{"status":"ok"}`。完整命令、退出码、trace、七画面双语桌面/移动截图及 Photoshop 对照见[发布证据索引](docs/design-references/hil-site/release/evidence-index.md)。

已实现七画面导航、语言保持、250ms 淡入淡出与输入锁、reduce 状态、双轮播、独立折叠、成员筛选和联系操作。正式视觉以 [Ticket 001 清单](docs/research/hil-site-design-manifest.md)和 Photoshop 为准；Figma 保留来源链，DOCX 仅补缺失编号内容。[规格](docs/labWebsiteV1/spec.md)记录授权、交互及串行票据。

030 与完整规格审查发现的 F1/F2 已修复并复验；031 独立审查和 032 最终核验仍待完成，不宣称整个任务已结束。不 push、不部署。

## 保留的限制

- CI 安装依赖和 Chromium、运行工程及 E2E 的配置已经核对，本次是干净本地等价执行；远端 GitHub Actions、gitleaks、CodeQL 未运行，不声明其成功。
- `npm ci` 报告 18 项依赖公告（3 low、4 moderate、11 high），完整安装日志保留；未运行 audit fix 或升级依赖。
- 未配置自动重复代码/未使用导出检测和本地 hook manager；保留人工审查及 CI/显式护栏命令。
- 媒体仅获本地 V1 使用授权，公开发布权利仍待确认；未交付中文/移动 PSD、独立伙伴 Logo 或非 PI 成员照片，按清单的内容与重排规则实现。

## 工程参考

- [AGENTS.md](AGENTS.md)、[CONTEXT.md](CONTEXT.md)、[constraints.yaml](constraints.yaml)：边界、状态和工程约束。
- [单 URL 决策](docs/adr/0001-single-url-screen-sequence.md)、[原生过渡决策](docs/adr/0002-native-css-page-transition.md)。
- [MIT–IBM 历史参考](docs/reference/mitibm-section-navigation/README.md)：仅保留研究来源，正式动效以 V1 交付和批准规格为准。
