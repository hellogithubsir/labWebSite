## Issue: 054 — 内容更新独立验证
Description: 独立证明文案清理资料真实性响应式布局与发布门禁
Type: VALIDATION
Milestone: content-refresh
Touches: None
Blocked by: 053
### What to build
只读验证spec全部要求，不修改产品、测试、规格或Git。逐人逐机构核对官方来源与文案，七画面双语检查可见编号与制作说明、桌面1920移动390和320布局，检查完整发布日志。执行必要浏览器检查，所有证据按绝对路径存mission证据目录，不放PIC或.next。发现问题交实现worker修复后重新验证。
### Acceptance criteria
- [ ] 所有五断言各有独立verdict与存在的证据文件。
- [ ] 未确认资料按spec正确保留才允许通过；无依据补身份或Logo不通过。
- [ ] 完整门禁日志退出码和截图可定位；缺失如实未证明。
### Validation
Proves: VAL-101, VAL-102, VAL-103, VAL-104, VAL-105
- Command / scenario: 只读资料取证对照与双语响应式浏览器验证，确认产品交互与工程证据。
- Evidence expected: validation-protocol格式逐断言报告、截图和核对记录。
### Notes
reportOnly验证票，不创建分支或提交；写报告仅在mission runtime证据目录。
