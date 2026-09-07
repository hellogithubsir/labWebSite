## Issue: 028 — Contact 画面
Description: 交付合作类型、申请说明、联系方式和沟通规范的双语响应式画面
Type: AFK
Milestone: m3-content-screens
Touches: src/components/hil-site/screens/contact/**, src/content/hil-site/contact.ts, e2e/contact.spec.ts, docs/design-references/hil-site/contact/**
Blocked by: 010, 011
User stories covered: US-002, US-003, US-004, US-005

### What to build

实现 C-01 至 C-06，包括合作对象、合作形式、学生申请、联系信息和沟通说明。提供设计交付指定的邮件与外部链接动作；V1 不增加提交表单或后端发送能力。

### Acceptance criteria

- [ ] 两种语言下 C-01 至 C-06 的可见内容完整，合作与申请要求不互相混淆。
- [ ] 邮件和设计交付指定外链使用正确目标，可由键盘激活，并提供清晰可见的焦点状态。
- [ ] 390px 与 320px 下联系操作可见、可聚焦、可点击，无横向溢出或内容遮挡。

### Validation
Fulfills: VAL-036, VAL-037, VAL-038
- Verification: npm run test:e2e -- --grep "contact screen" (exit zero)
- Command / scenario: 在两种语言和桌面/移动视口检查全部内容并激活邮件与外部链接。
- Evidence expected: 含联系状态截图与链接记录的 Playwright trace。

### Notes

- 不收集或发送用户数据，不新增隐私、验证码或表单状态。
- 外部链接只使用设计交付或参考文档明确提供的目标，不猜测社交账号。
