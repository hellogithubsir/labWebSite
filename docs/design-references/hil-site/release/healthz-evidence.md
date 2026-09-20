# Ticket 002 — 健康端点回归证据

> **归档说明（2026-09-17）**：下方引用的 `evidence/002/` 目录已在项目收尾清理中删除；文件清单保留为历史记录，实体文件不可再访问。

2026-09-07 在 `loop/labwebsitev1-ps-20260907/002` 验证；基线为 `7146dbe81c086beab72015ffec1a406abd36ecaa`，Node v26.0.0。

## 正式回归

`npm ci` 退出 0。执行 `npm run test:e2e -- --grep "health response"`，由现有 Playwright 配置先构建再启动生产服务器：1 passed，0 skipped，退出 0。

`e2e/healthz.spec.ts` 通过公共 HTTP 接口检查 200、JSON Content-Type 及精确 JSON 对象 `{ "status": "ok" }`（额外字段也不通过）。端点继续复用原 `src/app/healthz/route.ts`；该函数无参数、无导入，只返回固定 JSON，不读取设计文件、数据库、外部网络或用户输入。

## 反例与恢复

已有端点行为正确，因此采用临时变异证明断言有效。每次仅改变一项响应，再执行相同测试命令：

| 临时变异 | 观察 | 退出码 |
| --- | --- | --- |
| HTTP 503 | 状态码断言报告 expected 200 / received 503 | 1 |
| Content-Type text/plain | 媒体类型断言失败 | 1 |
| status 为 broken | 精确 JSON 断言失败 | 1 |
| 恢复原始端点 | 1 passed | 0 |

变异均未提交；结束时端点与基线无差异。未修改 rehabilitation 状态。

## 实际 curl

生产构建后启动 `npm run start -- --hostname 127.0.0.1 --port 3000`，执行 `curl --fail --silent --show-error --dump-header <证据目录>/curl-headers.txt --output <证据目录>/curl-body.json --write-out "%{http_code}\\n" http://127.0.0.1:3000/healthz`：退出 0、HTTP 200、`content-type: application/json`、原始正文 `{"status":"ok"}`。验证结束已停止本票启动的服务器。

原始证据保存在主仓库忽略的 mission 目录，不依赖本票 worktree，worktree 清理后仍可定位：

`/Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/002/`

- `green.log`、`red-status.log`、`red-content-type.log`、`red-body.log`：完整测试输出。
- `exit-codes.json`：四轮真实退出码。
- `curl-result.json`、`curl-headers.txt`、`curl-body.json`：实际命令、退出码、响应头和正文。
- `production-server.log`：curl 对应生产服务器日志。

`npm ci` 同时报告当前锁定依赖存在 18 项安全公告（3 low、4 moderate、11 high）；本票未升级依赖，不将依赖审计计为通过。
