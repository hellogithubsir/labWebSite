## Issue: 002 — `/healthz` 与运行时健康证据
Description: 维护已交付健康端点的正式回归测试与可追溯验收记录
Type: AFK
Milestone: m0-delivery-readiness
Touches: e2e/healthz.spec.ts, docs/design-references/hil-site/release/healthz-evidence.md
Blocked by: None
User stories covered: US-006

### What to build

复用已审查健康端点，新增e2e/healthz.spec.ts验证HTTP状态、JSON Content-Type和精确响应，并提交可维护的验收记录，注明运行命令、退出码和证据位置。不得重复实现端点或通过空提交领取完成。

### Acceptance criteria

- [ ] `GET /healthz` 返回 HTTP 200、JSON Content-Type 和精确响应 `{"status":"ok"}`。
- [ ] 健康响应不读取 Figma、DOCX、数据库、外部网络或用户输入。
- [ ] 正式健康回归测试与验收记录已提交且实际运行成功，rehabilitation总状态保持原样。

### Validation
Fulfills: VAL-003
- Verification: npm run test:e2e -- --grep "health response" (exit zero)
- Command / scenario: 启动生产构建后执行 `curl --fail --silent http://127.0.0.1:3000/healthz`。
- Evidence expected: HTTP 状态、响应头和 JSON stdout。

### Notes

- 使用 Next.js 16 App Router 的 Route Handler，不增加 API 框架。
- 本票不修改 `/` 页面或 rehabilitation 总状态。

