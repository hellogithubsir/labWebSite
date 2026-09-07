## Issue: 031 — 工程门禁与 rehabilitation 收口
Description: 在全部 V1 证据通过后统一运行发布门禁并同步真实工程状态
Type: AFK
Milestone: m4-release-proof
Touches: Makefile, README.md, CONTEXT.md, constraints.yaml, AGENTS.md, docs/design-references/hil-site/release/evidence-index.md
Blocked by: 002, 003, 030
User stories covered: US-006

### What to build

把工程、健康和 UI 验证统一纳入正式发布门禁，汇总设计交付映射、28 组视觉截图、Playwright trace 和命令日志。只有在干净安装及所有门禁实际通过后，才将 rehabilitation 标为 inactive，并同步 README、上下文和约束中的状态。

### Acceptance criteria

- [ ] 干净安装后，命名护栏、护栏自测、Lint、TypeScript、生产构建、`/healthz` 和 Playwright 全部退出 0。
- [ ] 证据索引覆盖七画面、两种语言、桌面/移动状态及对应 Photoshop 画面，并保留适用的 Figma provenance。
- [ ] rehabilitation 仅在上述证据齐备时关闭，README、CONTEXT、AGENTS 和约束不再保留已解决缺口，也不删除尚未解决事实。

### Validation
Fulfills: VAL-039, VAL-040
- Verification: make check (exit zero)
- Command / scenario: 从干净依赖安装执行完整 repository gate，并抽查证据索引中的节点、截图和 trace 均可定位。
- Evidence expected: 完整命令日志和发布证据索引。

### Notes

- 若任一门禁失败，保持 rehabilitation active，报告具体失败并回到对应修复票。
- 不执行 git commit、push、分支或远端发布。
- 状态文件只能记录已运行的证据，不使用“预计通过”措辞。
