## Issue: 041 — 独立验证参考切换动效与交互回归
Description: 对040最终实现独立只读验证四条动效断言并提交逐条verdict和真实UI证据
Type: VALIDATION
Milestone: reference-motion
Touches: None
Blocked by: 040

### What to build

不构建产品、不修改被测实现。读取 spec.md、040最终差异及证据，对照原站现场观察和本项目适配要求。验证轨道从700ms才动、内容与页脚完整1500ms时序、轨道几何与移动断点、单URL和Locale、同屏/输入锁、至多一个可访问画面、完成标题焦点和reduce100ms内结束。

独立运行实际测试，审阅完整make check-release的新证据；按协议在任务运行态保存逐条验证报告及证据。不得将旧030/031或旧250ms通过记录视为本轮通过。缺失证据记blocked，真实失败记fail，交还实现worker修复；validator不自行修被测代码。

### Acceptance criteria

- [ ] 每条指定断言有独立 verdict 及存在的具名证据文件，记录命令与退出码。
- [ ] 正常与reduce、桌面两组宽度与移动视口均有真实UI观察，时间轴覆盖离场/提交/等待/淡入/解锁。
- [ ] 全规格对照与单URL、双语七屏、焦点及输入行为检查完成，不遗漏700ms不是终点这一约束。
- [ ] 报告通过 validation-check --require-proven；存在失败或阻塞不得报完成，不修改产品代码或旧冻结产物。

### Validation
Proves: VAL-MOTION-001, VAL-MOTION-002, VAL-MOTION-003, VAL-MOTION-004
- Verification: npm run test:e2e -- --grep "page transition" (exit zero)
- Command / scenario: 独立执行目标测试和真实UI多帧检查；读取040完整make check-release报告并对四条断言生成验证协议报告。
- Evidence expected: 任务运行态中的逐条验证报告、真实命令日志、截图、时间轴采样与trace，所有引用文件存在且明确对应最终实现提交。
