## Issue: 003 — Playwright 关键路径基线
Description: 接收现有Playwright基线并记录CI配置与干净本地等价验收
Type: AFK
Milestone: m0-delivery-readiness
Touches: docs/design-references/hil-site/release/browser-baseline-evidence.md
Blocked by: 002
User stories covered: US-006

### What to build

复用已有Playwright配置、依赖、smoke测试和CI任务。在干净依赖环境执行npm ci、项目Chromium安装及npm run test:e2e，核对CI执行相同入口，提交browser-baseline-evidence.md保存具体配置定位、命令、退出码和原始日志路径。不得重复安装第二套工具链或把未运行的远端CI写成通过。

### Acceptance criteria

- [ ] `npm run test:e2e` 自动启动生产应用，确认 `/` 返回成功且首个主标题可见。
- [ ] 失败时保留 trace，成功时命令退出 0，不要求人工先启动服务器。
- [ ] CI 使用项目 Node 版本安装所需 Chromium 并执行同一 E2E 命令。

### Validation
Fulfills: VAL-004, VAL-005
- Verification: npm ci (exit zero)
- Verification: npx playwright install chromium (exit zero)
- Verification: npm run test:e2e (exit zero)
- Command / scenario: 核对CI配置，并在干净安装后的本地环境执行等价冒烟测试；本轮不要求远端CI。
- Evidence expected: Playwright 运行日志和失败时 trace。

### Notes

- 只安装项目级开发依赖，不执行全局安装。
- 浏览器基线只证明测试入口可用；七画面交互由后续票实现。
- 不把远端 CI 尚未运行伪装成本地已通过证据。

