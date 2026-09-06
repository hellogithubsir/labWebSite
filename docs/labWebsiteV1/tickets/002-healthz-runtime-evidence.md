## Issue: 002 — `/healthz` 与运行时健康证据
Description: 提供不依赖外部服务的官网健康响应并清除对应 readiness gap
Type: AFK
Milestone: m0-delivery-readiness
Touches: src/app/healthz/route.ts, README.md, constraints.yaml
Blocked by: None
User stories covered: US-006

### What to build

增加只读健康端点，使维护者能够通过 HTTP 判断 Next.js 应用是否可响应。同步工程说明中 `/healthz` 的真实状态，但不提前关闭其他 rehabilitation gap。

### Acceptance criteria

- [ ] `GET /healthz` 返回 HTTP 200、JSON Content-Type 和精确响应 `{"status":"ok"}`。
- [ ] 健康响应不读取 Figma、DOCX、数据库、外部网络或用户输入。
- [ ] README 与约束只移除已被实际证据解决的健康端点缺口。

### Validation
Fulfills: VAL-003
- Verification: npm run build (exit zero)
- Command / scenario: 启动生产构建后执行 `curl --fail --silent http://127.0.0.1:3000/healthz`。
- Evidence expected: HTTP 状态、响应头和 JSON stdout。

### Notes

- 使用 Next.js 16 App Router 的 Route Handler，不增加 API 框架。
- 本票不修改 `/` 页面或 rehabilitation 总状态。

