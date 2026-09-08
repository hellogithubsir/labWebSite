## Issue: fx-004 — 明确收口状态快照与当前核验依据

Description: 将五处收口待办明确为 031 提交时点快照，并以审查及 032 报告表达当前状态
Type: AFK
Milestone: m4-release-proof
Touches: README.md, CONTEXT.md, AGENTS.md, constraints.yaml, docs/design-references/hil-site/release/evidence-index.md
Blocked by: 031

### Cause

完整规格审查任务 `01a07ec1-adc3-7031-80d3-053275bfd715` 的 F-3 确认：031 提交 `97bab98` 时，README 第 29 行、CONTEXT 第 61 行、AGENTS 第 107 行、`constraints.yaml` 的 `remaining_limits` 及发布证据索引第 80 行所写“031 独立审查和 032 最终核验仍待完成”是当时的真实状态；031 审查完成、032 核验报告落盘后，这些没有时点限定的文字会过时。

CLI cause 为 `kind: review`、`itemId: F-3`、`feature: 031`。本票只修正状态文档的时点表达，不新增断言、不修改原票、契约或运行状态。

### Implementation prerequisite

主编排应在 032 的正式报告实际落盘且可读取后派发实施，不提前根据“即将完成”宣称通过。依赖只声明 031；032 作为报告读取前置条件由主编排控制，不用失败的 report-only 任务依赖阻断如实记录失败结果。

031 持久审查记录为 `/Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/reviews/031-r1.json`。032 当前状态依据为 `/Users/qingsir/Project/labWebSite/docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/reports/032.json`；当前首轮失败记录应如实保留，后续独立复证可更新正式报告。worker 必须实际读取记录并验证引用存在；记录缺失时报告阻塞，不编造路径或结果。

### What to build

统一五处描述，明确“031/032 待完成”属于 031 提交时点快照；用可定位的 031 审查记录及 032 报告表明当前状态。选择不会因本修正完成而立即过时的时点和证据表述，不再新增“本修正待审”之类循环待办。

### Acceptance criteria

- [ ] 五处明确同一 031 提交时点快照，并以实际存在的审查和核验记录说明当前结果；报告通过、失败或阻塞均如实表达，不提前 claim 032 pass。
- [ ] 引用可定位且实际存在，可经发布证据索引集中引用；主编排提供的 031 持久审查路径和正式 032 报告是当前状态依据。
- [ ] 保留 rehabilitation 关闭时间、产品基线、原门禁结果与真实限制，包括未授权大规模重构、未 push/部署、依赖公告及素材公开发布权利等既有事实。
- [ ] 仅调整声明的五个文档文件，不修改产品代码、mission runtime、现有证据、关闭事实或任务调度状态。
- [ ] 不新写“本修正待审”的临时待办，不将本地工程就绪表述为已经生产发布。

### Validation

Fulfills: None（修正既有收口状态说明，不新增或重分配契约断言）
Proves: None（本票不代替独立核验）

- Verification: git diff --check (exit zero)
- Command / scenario: 只读对照五处文档的快照时点、031 审查与 032 报告结果；检查引用存在，并审阅差异确认关闭时间、产品基线、真实限制和 runtime 未改变。
- Evidence expected: 五处一致性及实际引用存在的检查记录，`git diff --check` 退出码和纯文档 diff；独立可见审查任务核验。纯文档时点修正不需要重新执行完整构建。
