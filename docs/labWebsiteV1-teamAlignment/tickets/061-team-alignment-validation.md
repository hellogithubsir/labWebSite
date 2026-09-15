## Issue: 061 — 人物信息统一独立验证
Description: 独立证明双语人物卡片首页一致性响应式与交付边界
Type: VALIDATION
Milestone: team-alignment
Touches: None
Blocked by: 060
### What to build
只读核对spec全部要求与产品，不修改产品测试规格Git。独立浏览器实际核验en及zh-CN九研究卡无标签具体身份简介与筛选保留、Jeff字段邮箱准确、首页三人按序跨页一致。核验12截图及完整门禁原始日志，结合代码确认共享数据而不是两份副本。查看来源依据与本轮用户确认关系、文档和受保护范围。证据存runtime或外部，不放PIC或.next；发现问题交实现worker，不自行修改。
### Acceptance criteria
- [ ] 五断言各独立verdict有存在的证据文件与明确观察，缺失不能pass。
- [ ] 测试验收预期来自spec，不从产品数组复制预期掩盖错误。
- [ ] 完整门禁与12图可定位，不将窄测试冒充全行为证明。
### Validation
Proves: VAL-201, VAL-202, VAL-203, VAL-204, VAL-205
- Command / scenario: 独立双语浏览器验证与源码来源记录证据审计。
- Evidence expected: validation-protocol逐断言报告及原始输出截图。
### Notes
reportOnly，不创建工作分支，不commit。报告由主任务记录到assertion ledger。
