## Issue: 071 — 中文文案独立验证
Description: 只读独立证明姓名中文化英文不变响应式及交付边界
Type: VALIDATION
Milestone: chinese-copy
Touches: None
Blocked by: 070
### What to build
独立读取spec逐项核验五断言。浏览器核验七中文页、双语负责人及研究卡、分类导航和保留项；审计七英文内容与基线对比及完整行为证据。查看21图、redgreen和完整发布门禁，检查文档与Git范围。不修改产品测试规格Git，发现问题报告主任务交实现worker，证据外部或runtime，不能使用产品数组本身充当全部预期。
### Acceptance criteria
- [ ] 五断言分别有真实观察和存在的证据，缺失不pass。
- [ ] 确认清单全覆盖并检查允许保留项及英文内容不变。
- [ ] 审查21截图与完整门禁，不以窄测试证明广泛行为。
### Validation
Proves: VAL-301, VAL-302, VAL-303, VAL-304, VAL-305
- Command / scenario: 独立浏览器文案行为与源码文档证据审计。
- Evidence expected: validation-protocol五断言报告及原始观察输出。
### Notes
reportOnly，不创建工作分支，不commit。主任务记录assertion ledger。
