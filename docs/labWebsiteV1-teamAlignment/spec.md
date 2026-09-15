# 首页与团队页人物信息统一

## Goal
中英文同步删除研究人员卡片的身份标签、补齐 Jeff Wang 负责人信息、将首页团队摘要统一为 Chaw、Jeff、Wendy 三人，保留其他正式行为。

## Requirements
1. 只删除“认识我们的研究人员 / Meet our researchers”区域九张卡片的“身份 / Status”标签。具体学位、成员身份、简介和九人名单保持；筛选仍正常。删除仅支持这些标签的字段和空容器，身份用正常正文，不遗留无标题描述列表。不要删除团队指标等其他区域的 dt。
2. Jeff Wang 负责人卡片按 Wendy 层次显示姓名、CTO 职位、研究方向、简短介绍、可点击邮箱。用户批准计划确认 Jeff Wang 与 Wang Hongqing 为同一人，沿用已核实 Wang Hongqing 的研究资料；方向为计算机视觉、轻量化目标检测，简介为面向复杂交通场景的轻量化视觉模型研究。英文同义。邮件文本 hongqing.wang812@gmail.com，链接 mailto:hongqing.wang812@gmail.com。不虚构荣誉履历，不重新判定学位，其他区域博士研究生角色保留。
3. 首页摘要仅三人依序 Dr. Chaw Jun Kit、Dr. Jeff Wang、Wendy Leong Pooi Yan；名称、职位复用团队 PI 与 profiles 正式数据，依locale对应团队页，无重复维护的名单内容。移除首页原有 Zhao Yanfeng、Cheng Xiang、Liu Jianbang 条目，团队页仍保留。首页现有中文姓名前缀与团队对应语言一致。
4. 负责人资料增加可选邮箱，有值才渲染。沿用现有视觉布局；不新增路由、API、依赖、头像，不改导航动效、其他页行为，无第二套实现或全局状态系统。
5. 在 docs/design-references/hil-site/team-alignment/ 记录用户确认的身份关联与邮箱、简介依据、实现事实和证据位置。README说明本次存在的行为，引用动态审查/验证记录，不预先宣称尚未发生的通过，不固定未来步骤为“待完成”导致文档收尾循环。
6. 两页 × 两语言 × 1920、390、320px 共12组完整截图，确认无异常空白、截断、溢出；证据不放PIC或.next。执行针对性red/green，完整make check-release成功，日志退出码trace可定位。
7. 独立worker实现，061只读独立证明全合同，主任务创建原labWebSite工作区侧边栏可见审查任务，审查不修改代码测试规格Git；有问题修复worker回原实现分支，复用审查任务复审。全规格终审与所有断言证明齐备后完成。

## Environment and boundaries
集成基线 main dcc78c8；原工作区 /Users/qingsir/Project/labWebSite 有用户删除文件、PIC/PIC.zip及未跟踪资料，禁止恢复、暂存、覆盖或提交。干净外部集成树 /Users/qingsir/Project/labWebSite-team-alignment；本轮仅本地分支、worktree、commit、审查后ff合并，不push、不部署。既有mission保留历史与收据，不改其状态。PS原包 /Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery 只读。

## Validation Plan
- VAL-201: 九研究人员标签清理, Behavior: 中英九卡不显示身份Status标签具体身份简介名单筛选保持且语义正确不误删其他dt, Surface: ui, Evidence: 双语卡片断言筛选结果与截图。
- VAL-202: Jeff负责人完整资料, Behavior: 中英Jeff负责人有CTO研究方向事实简介和准确邮件链接其他人员信息保持且来源确认可追踪, Surface: ui, Evidence: 双语负责人断言与来源记录。
- VAL-203: 首页团队统一, Behavior: 中英首页恰好ChawJeffWendy三人按序且名字职位与团队共享数据一致三位被移除摘要人员仍在团队名单, Surface: business-flow, Evidence: 精确名单顺序与跨页双语断言及数据差异。
- VAL-204: 响应式与回归, Behavior: 两页双语三宽度12组截图无截断溢出针对性redgreen和完整发布检查退出零导航筛选等既有行为保持, Surface: business-flow, Evidence: 12图与原始日志退出码trace。
- VAL-205: 交付边界与记录, Behavior: 无新增接口依赖头像或重复实现README与来源记录准确用户文件PIC原素材未改不push部署, Surface: data, Evidence: Git差异与记录范围检查。

## Mission Handoff
- Suggested milestones: team-alignment
- Granularity: 060实现与证据，061报告型独立验证，串行。
- Additional implementation notes: 先搜索src/content/hil-site/team.ts与home内容、HomeOverviewSections、TeamScreen；home.spec.ts旧4人断言改精确三人及跨页一致，team.spec.ts旧研究卡dd定位更新。测试不能只读取实现导出作为预期。临时浏览器脚本在外部证据目录或runtime以.txt保存，避免ESLint扫描；正式证据持久存放。propose必须validators与review-gate，可记录skip-assertions原因由061独立覆盖五断言，保留scrutiny；gate-command为make check，060verification完整make check-release。
