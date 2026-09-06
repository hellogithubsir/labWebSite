## Issue: 003 — Playwright 关键路径基线
Description: 建立生产构建上的 `/` 浏览器验收入口并接入现有工程门禁
Type: AFK
Milestone: m0-delivery-readiness
Touches: package.json, package-lock.json, playwright.config.ts, e2e/smoke.spec.ts, .github/workflows/ci.yml, Makefile, README.md, constraints.yaml
Blocked by: None
User stories covered: US-006

### What to build

增加项目本地 Playwright 开发依赖、生产服务器配置和首个 `/` 冒烟流程。提供稳定的 `npm run test:e2e` 与 `make check-ui` 入口，并让 CI 在具备浏览器运行条件的独立任务中执行关键路径。

### Acceptance criteria

- [ ] `npm run test:e2e` 自动启动生产应用，确认 `/` 返回成功且首个主标题可见。
- [ ] 失败时保留 trace，成功时命令退出 0，不要求人工先启动服务器。
- [ ] CI 使用项目 Node 版本安装所需 Chromium 并执行同一 E2E 命令。

### Validation
Fulfills: VAL-004, VAL-005
- Verification: npm run test:e2e (exit zero)
- Command / scenario: 在干净安装后的本地环境和 CI 运行相同冒烟测试。
- Evidence expected: Playwright 运行日志和失败时 trace。

### Notes

- 只安装项目级开发依赖，不执行全局安装。
- 浏览器基线只证明测试入口可用；七画面交互由后续票实现。
- 不把远端 CI 尚未运行伪装成本地已通过证据。

