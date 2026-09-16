# 首页与子页一致性修正记录

## 内容来源与变更范围

依据用户于2026-09-16批准的[一致性规格](../../labWebsiteV1-contentConsistency/spec.md)，首页精选由原三项改为E-Linus/PDM Robot两项并读取项目页正式简介和截图；技术摘要按a01— a03读取技术优势内容；六家伙伴按ID读取正式名称。首页不再重复维护三组信息。

首页双卡布局是本轮批准对原HOME下半部设计的替换：桌面等宽，980px以下单列，图片保留原比例。其余首页模块保持现有品牌与布局；科研经费导语保留。NAS英文只更正标题与替代文本的Operational，项目正文、研究方向与研究项目映射保持。

用户确认Jeff已经获得博士学位，且从原7位博士在读中转入毕业：统计04/06/03/02；九人展示名单中毕业7人、在读2人。姓名和职位跨首页/团队一致，成员简介保留学术署名Wang Hongqing。主要导师2人说明保持。本轮覆盖旧的在读身份约定，不改写历史资料。

明确排除：不将首页基金/论文/部署信息回填子页，不为研究页补两个精选系统映射。

## 验证依据

- 修改前真实浏览器记录：[首页三卡反例](../../../output/content-alignment/home-baseline.log)，确认旧首页无法满足获批两卡要求。
- 新增跨页浏览器测试直接读取首页和对应子页的已渲染文字、图源及替代文本进行比较，不把同一数据函数作为两边期望值。
- 1920/1440/390/320px中英文：首页与团队整页截图；卡片坐标、自然图像比例、图片加载、语言与URL、7/2筛选和旧断言移除。
- 最近回归：团队角色与负责人、七画面中文文案；完整门禁覆盖其余页面和导航。
- 独立只读审查由 /root/content_alignment_review 完成，结果无发现；审查不替代真实浏览器验证。

## 执行结果

专项22项通过，退出0：[日志](../../../output/content-alignment/focused.log)。局部TypeScript和ESLint通过。**完整 `make check-release` 在 Node 24.20.0 下退出0：169 passed、0 failed、0 skipped。** 工程检查、护栏自测、健康及全站浏览器回归均通过；[完整日志](../../../output/content-alignment/release.log)、[命令与退出码](../../../output/content-alignment/commands.json)、[独立审查](../../../output/content-alignment/review.json)。

## 最终浏览器截图

每个测试目录保留成功 trace.zip；截图来自最终完整门禁运行。

| 宽度 | 语言 | 首页 | 团队 |
| --- | --- | --- | --- |
| 1920px | zh | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1920-zh/home-zh-1920.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1920-zh/team-zh-1920.png) |
| 1920px | en | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1920-en/home-en-1920.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1920-en/team-en-1920.png) |
| 1440px | zh | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1440-zh/home-zh-1440.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1440-zh/team-zh-1440.png) |
| 1440px | en | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1440-en/home-en-1440.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-1440-en/team-en-1440.png) |
| 390px | zh | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-390-zh/home-zh-390.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-390-zh/team-zh-390.png) |
| 390px | en | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-390-en/home-en-390.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-390-en/team-en-390.png) |
| 320px | zh | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-320-zh/home-zh-320.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-320-zh/team-zh-320.png) |
| 320px | en | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-320-en/home-en-320.png) | [截图](../../../output/content-alignment/release/content-consistency-cross-page-consistency-320-en/team-en-320.png) |

## 范围与限制

本次仅做本地实现与验证，未执行Git提交、分支、推送或部署。学位与人数依据用户本轮明确确认，不代表新增外部学历核验。已有未跟踪资料保持原样。
