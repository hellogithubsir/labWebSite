# 官网访客文案与机构人物资料更新

## Goal
七画面中英文删除内部设计编号、素材路径和制作说明，保留真实内容，补充九项合作伙伴官方 Logo 与九位团队成员有依据的一句简介。

## Requirements
1. 首页删除对应 A-01 至 A-03 等说明；研究页删除只有编号的代表项目行，名称混排时保留名称；项目页删除文件名、视频时间、来源路径；技术页清理编号与制作节奏说明但保留核心技术与储备区别。
2. 合作伙伴删除 N 编号与标识墙等制作标签，标题为合作伙伴 / Our Partners。保留现有九卡顺序，Tokio Marine & Dynafront 同卡两 Logo；桌面三列、移动单列，原比例原色、留白居中、名称在下、减小空白。官方 SVG/透明 PNG 本地 public 落库，无热链；无法确认时文字保留并记录，不猜图标。
3. 团队删除 T 编号、一句话简介、固定顺序等标签；九成员优先 UKM/IVI 官方资料、机构论文库、带机构关联论文确认同名身份。已确认写一句双语事实简介，无依据不补职位荣誉；未确认保留原始简介并列清单。负责人研究成果编号同样清理。
4. 联系页清理 R/A/P/T 引用；全站补查同类说明但保留 AI/LLM/API 等术语、导航01–07、有意义数量。内部 key/id/测试定位保留，不作为可见文案。
5. 资料来源、身份依据、Logo来源与未确认项写入 docs/design-references/hil-site/content-refresh/ 的来源与证据文档，不把取证路径给访客看。
6. 只改唯一正式内容及必要组件样式，移除仅为删除文字服务的字段；不变路由、API、依赖和导航动效、轮播、筛选、折叠。保留原PS包只读。用户本轮要求覆盖旧稿冲突展示要求。
7. 使用独立worker实现，独立只读验证及同工作区侧边栏可见审查任务；问题回实现worker修复，原审查任务复审。全部断言有证明且无未处置问题后完成。
8. 运行make check-release；1920/390/320逐画面双语检查与截图证据，不覆盖PIC。README记录事实和未确认项，不声称远端CI通过，不push、不部署。

## Environment and history
原工作区存在用户删除的旧transitionFollowup计划及两份DOCX，另有PIC/PIC.zip/Office锁文件。不得恢复、读取被删除DOCX作为依据、暂存或提交这些用户改动。新mission运行于干净外部integration工作区，原main最终只接收本轮提交的ff；旧mission不改状态或收据。原始PS包位于 /Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery，保持只读。本轮证据保存runtime或正式content-refresh证据目录，不能放.next以免构建清理。

## Validation Plan
- VAL-101: 访客文案清理, Behavior: 七画面en和zh-CN均不显示内部编号文件路径截取时间制作标签且有效内容术语页码保留, Surface: ui, Evidence: 双语可见文本断言与截图。
- VAL-102: 合作伙伴展示, Behavior: 九卡顺序保留且确认官方Logo本地可加载原比例展示联合卡含两机构未确认留文字三列和单列适配, Surface: ui, Evidence: 来源映射与加载检查及响应式截图。
- VAL-103: 团队身份与简介, Behavior: 九成员逐人有确认依据或未确认记录已确认双语一句事实简介未确认保留原文无虚构身份, Surface: data, Evidence: 逐人来源记录与页面内容对照。
- VAL-104: 交互与布局回归, Behavior: 全部正式发布门禁成功七画面双语1920和390及320不溢出导航动效轮播团队筛选技术折叠正常, Surface: business-flow, Evidence: make check-release退出码日志trace及响应式截图。
- VAL-105: 交付边界与文档, Behavior: README和资料证据索引准确无新增接口依赖无第二实现不覆盖PIC不修改原素材包或用户删除不push部署, Surface: data, Evidence: git差异与文件范围检查及文档索引。

## Mission Handoff
- Suggested milestones: content-refresh
- Granularity: 四个串行实现票各保持400行文本diff以内，新增正式二进制素材单独列明；若仍超限通过追加票据分解，不放宽门禁。
- Additional implementation notes: 清理空容器，负责人content package not provided占位移除但不编新资料。更新partners旧img count1断言、team旧dd索引和R-02编号断言。沿用现有视觉做tweak，不扩成全站文案重写。
