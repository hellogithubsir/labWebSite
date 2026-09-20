# Ticket 003：浏览器基线与 CI 本地等价验收

> **归档说明（2026-09-17）**：下方"原始证据"一节引用的 `evidence/003/` 目录已在项目收尾清理中删除；文件清单保留为历史记录，实体文件不可再访问。

验证日期：2026-09-07。基线提交：`7bced7397425d34fe3102bc190111395ca37008d`。
本票接收已有 Playwright/CI 实现，只增加证据文档；未改动应用、测试、依赖或配置。

## 配置与验收范围

- `.nvmrc:1` 指定 Node 24；`package.json` 要求 Node >=24，`test:e2e` 为 `playwright test`。
- `playwright.config.ts:12` 自动执行生产 build/start，访问 `127.0.0.1:3000`；`reuseExistingServer: false`，未人工启动服务器。
- `e2e/smoke.spec.ts:3` 验证 GET / 响应成功，并要求唯一指定英文 h1 可见。
- `playwright.config.ts:7` 将产物放入 `.next/playwright-results`，第 10 行使用 `retain-on-failure`。
- `.github/workflows/ci.yml` 的 `critical_ui` 使用 `actions/setup-node` 读取 `.nvmrc`，依次运行 `npm ci`、`npx playwright install --with-deps chromium`、`make check-ui`；`Makefile:19` 将最后一步直接映射到 `npm run test:e2e`。
- 本地为 macOS、Node 24.20.0（通过 npm exec 临时运行器使用，无全局安装）。worktree 初始无 node_modules，随后干净安装。Chromium 安装采用 macOS 对应命令；Linux CI 的 `--with-deps` 系统依赖安装未在 macOS 执行。
- 本轮只证明 VAL-004 浏览器入口、VAL-005 CI 配置及干净本地等价命令；未运行远端 CI，也不证明未来七画面完成。

## 执行结果

| 步骤 | 命令 | 退出码与观察 |
| --- | --- | --- |
| 干净本地链 | `npm exec --yes --package=node@24 -- sh -c 'node --version && npm ci && npx playwright install chromium && npm run test:e2e'` | 0；Node 24.20.0；安装 627 包；2 passed，0 skipped |
| 失败 trace 验证 | 临时将 smoke 预期 h1 改为不存在的 `Ticket 003 deliberate missing heading`，运行 `npm exec --yes --package=node@24 -- npm run test:e2e -- --grep "root page responds"` | 1；1 failed，失败为目标 heading 不存在；生成 trace.zip |
| 恢复后复验 | 按原始字节恢复 smoke，运行 `npm exec --yes --package=node@24 -- npm run test:e2e` | 0；2 passed，0 skipped；Git 无测试文件差异 |

失败变异仅用于证明原有断言及 trace 机制可失败，不降低正式验收标准。trace 在后续运行覆盖 .next 之前已复制到持久证据目录。依赖安装输出的 18 项公告为已知基线，本票没有升级依赖。

## 原始证据

证据根目录：
`/Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/003/`

该目录属于本次 mission 的持久本地运行记录，不随 Git 分发：

- `clean-local.log`：干净依赖安装、Chromium 安装及首轮 2 passed 的完整输出。
- `mutation-red.log`、`mutation-result.json`：缺失标题导致退出 1，并实际产生 1 个 trace。
- `mutation-failure-trace.zip`：保留的失败浏览器 trace。
- `restored-green.log`：恢复正式断言后的完整 2 passed 输出。
- `configuration-snapshot.txt`：本次核对的 Node、npm、Makefile、Playwright、smoke 和 CI 配置快照。
- `run-results.json`：执行命令、退出码及环境摘要。

可使用项目 Playwright 的 `show-trace` 打开持久目录中的 trace。后续产品票变更页面标题时应维护正式 smoke；本证据只描述上述基线。
