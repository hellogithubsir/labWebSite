## Issue: 032 — 发布状态只读验证
Description: 在收口提交后独立证明发布门禁证据与 rehabilitation 状态完全一致
Type: VALIDATION
Milestone: m4-release-proof
Touches: None
Blocked by: 031
User stories covered: US-006

### What to build

这不是实现票。只读检查 031 生成的发布证据索引、命令日志、README、CONTEXT、AGENTS 和 `constraints.yaml`，确认所有正式门禁确实通过后 rehabilitation 才关闭，且文档没有遗漏仍存在的失败或把未来远端证据写成已通过。逐条报告 VAL-039 与 VAL-040，不修改产品、测试、证据或状态文件。

### Acceptance criteria

- [ ] VAL-039 的命名护栏、护栏自测、Lint、TypeScript、生产构建、`/healthz`、Playwright 和所需 CI 日志均可定位且结果为成功。
- [ ] VAL-040 的 rehabilitation 状态、完成时间、证据索引和 README、CONTEXT、AGENTS、约束描述相互一致。
- [ ] 任一证据缺失或失败时报告未证明并保持状态原样，不通过修改证据或状态制造通过。

### Validation
Proves: VAL-039, VAL-040
- Verification: make check (exit zero)
- Command / scenario: 只读核对 031 后的门禁命令日志、证据索引和工程状态文件，并对两条断言分别给出 verdict。
- Evidence expected: VAL-039、VAL-040 的独立验证报告及每项证据的可定位路径。

### Notes

- 本票为 reportOnly 验证票，不创建分支、提交或产品差异。
- 发现不一致时把结果交回对应实现票修复，再重新执行本票。
