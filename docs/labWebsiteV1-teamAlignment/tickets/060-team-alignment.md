## Issue: 060 — 首页与团队人物信息统一
Description: 双语研究人员标签清理、Jeff资料补全、首页三负责人共享数据与回归证据
Type: AFK
Milestone: team-alignment
Touches: src/**, e2e/**, README.md, docs/design-references/hil-site/team-alignment/**
Blocked by: None
### What to build
落实spec全部产品与文档要求，唯一正式实现中复用team PI与profiles给首页三人摘要，Jeff增研究方向一句简介与可选邮箱，九研究卡仅去标签保留身份。先编独立预期的目标测试并在旧产品观察失败，再修改观察通过。更新旧4人和dd断言。完整make check-release、12响应式截图。README写当前行为并链接动态审查记录，来源记录区分用户身份确认与现有研究文献证据；不提前宣称审查通过，不固定待未来步骤状态。只提交本票范围，保护原工作区用户文件；文本diff控制400行以内，若需要拆分报告主任务，不绕过约束。
### Acceptance criteria
- [ ] 五断言所需实现与独立可复核原始证据完整。
- [ ] 两页两语言三宽度12组截图、目标redgreen及完整发布门禁日志退出码trace存在。
- [ ] README资料依据准确，未提交PIC原素材或用户文件，无越界行为。
### Validation
Fulfills: VAL-201, VAL-202, VAL-203, VAL-204, VAL-205
- Verification: make check-release (exit zero)
- Command / scenario: 双语精确三人顺序跨页数据、九研究卡内容筛选、Jeff完整内容与mail链接、响应式截图及完整回归。
- Evidence expected: 原始日志退出码trace、12截图、资料依据与差异。
