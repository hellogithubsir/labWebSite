# 技术优势页改版（2026-09-16）

## 交付行为与设计依据

技术优势页采用八项默认展开的双语图文布局，替代三项表格、现场照片带和五项折叠。01—03 为核心技术，04—08 为前沿技术储备；所有区块使用相同标题、价值说明、正文与示意图规格。保留实际 Logo、导航、语言状态和首页技术摘要。

- 用户确认的[整页效果图](advantages-design-reference.png)仅用于布局参考，不作为运行时背景。现有官网品牌 token 与字体保持；不使用生成图中的第三方标识、改写导航或生成文字错误。
- 内容来源：[中文版 V4](../../reference/实验室官网线框预览V4（中文版·语言统一版）.html)、[英文版 V4](../../reference/实验室官网线框预览V4（English·Language-aligned）.html)。中文术语延续现有语言规范；说明按方法与价值提炼，不增加量化业绩或认证声明。
- 双语记录以稳定 A-01—A-08 编号组织，正文不显示内部编号或来源路径。SVG 负责几何，HTML 标签负责可读排版与语言切换；图的可访问名称同时包含用途描述和标签。
- 桌面左文右图；980px 以下先正文后图形。窄图容器的线性流程纵向重排，设备图仍保持中心智能体与本地记忆的关联。
- 02/06 使用深蓝背景，04/08 浅色，其余白色。文字与图形分开使用青色：浅背景标签 #007f77，图形 #009d92；深色标签 #64dbd1。
- 页脚两个按钮使用现有导航回调，分别打开项目与联系画面，保持语言及 URL。

## 八项内容与图形映射

| 编号 | 名称 | 图形与标签关系 |
| --- | --- | --- |
| A-01 | 预测分析与知识蒸馏 | 密集模型网络 → 知识迁移 → 轻量网络 |
| A-02 | 大语言模型与多模态情绪编排 | 领域知识、多模态信息 → 情境理解 → 交互 |
| A-03 | 面向硬件优化的边缘视觉检测 | 视觉模型 → 压缩部署 → 端侧设备 |
| A-04 | 跨模型技能编译与运行治理 | 技能定义 → 三个通用运行环境；反馈返回治理过程 |
| A-05 | 用户可控的分层人工智能记忆 | 会话记忆、长期记忆、主动建议；查阅、修改、删除 |
| A-06 | 效用—多样性训练数据选择 | 多样候选样本 → 筛选 → 较少重复的训练样本 |
| A-07 | 设备端智能体与硬件协同 | 传感器 → 中心智能体 → 执行器；中心连接本地记忆 |
| A-08 | 可验证反馈驱动的持续学习 | 学习 → 验证 → 反馈 → 更新；版本记录置于循环中心 |

首页图的三个平面分别表示预测、理解和感知，不表示串行阶段。样本图中的形状数量只服务示意，不是实际训练集规模或效果指标。图形均为源码实现，无新增图片下载、依赖或第三方服务。

## 验证方法

本轮采用 VDD Construction / Light：获批新行为是验收依据，旧折叠行为是待修正的反例。旧版可打开且 A-04 正文隐藏的[浏览器记录](../../../output/advantages-refresh/baseline.log)证明反例发生于真实页面，而非工具链失败。

- 内容：八项完整顺序、正文默认可见、图形与可访问说明、核心/前沿分组。
- 视觉：1920/1440/1024/390/320px 双语整页及每项截图；文字图形坐标、标签边界与重叠、至少14px图内字号、实际正文与标签4.5:1对比度、页面无横向溢出。实现标签实际至少15px。
- 交互：当前页面语言切换、正常与减少动画、两个CTA的键盘激活、目标画面/语言/URL。
- 最近回归：七画面中文文案；完整门禁继续验证全站导航、其他画面、健康与生产构建。
- 独立审查：[审查记录](../../../output/advantages-refresh/review.json)。初审指出浅背景图内文字对比度不足；修复后最低4.586:1，复查无未解决发现。

## 运行结果

首轮专项检查：13 passed，退出0；[日志](../../../output/advantages-refresh/focused.log)。媒体检查专项回归 12 passed，退出0；[日志](../../../output/advantages-refresh/media-regression.log)。最终在 Node 24.20.0 下执行 `make check-release`：工程门禁、护栏自测、健康检查及 **159 项 Playwright 全部通过，0 failed、0 skipped，退出0**；[完整日志](../../../output/advantages-refresh/accepted.log)、[命令与退出码](../../../output/advantages-refresh/commands.json)。最终使用4个浏览器worker；构建与门禁阶段保持串行。

保留修复过程：首轮完整门禁为调整媒体检查而主动中断，未用作通过证据；第二轮为153 passed / 6 failed（[日志](../../../output/advantages-refresh/release-final.log)），原因是 `main img` 将隐藏轮播项纳入滚动检查。最终使用可访问图片角色与实际 `<img>` 标签的交集定位，保留原轮播过滤行为，并避开对 SVG 容器调用图片加载 API。

## 边界

本地验证不代表公开发布；未执行推送或部署。保留工作区原有修改及删除。参考图是AI生成的设计稿，技术示意图不是性能证明；未增添未经验证的产品、品牌合作或量化指标。

## 最终截图与 trace

以下为最终通过运行产生的真实浏览器截图；每个目录另有 item-1 至 item-8 的区块截图和 trace.zip。

| 宽度 | 中文 | 英文 |
| --- | --- | --- |
| 1920px | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1920-10816-le-illustrated-capabilities/advantages-zh-CN-1920.png) | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1920-351a0-le-illustrated-capabilities/advantages-en-1920.png) |
| 1440px | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1440-302bf-le-illustrated-capabilities/advantages-zh-CN-1440.png) | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1440-144e1-le-illustrated-capabilities/advantages-en-1440.png) |
| 1024px | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1024-32c4b-le-illustrated-capabilities/advantages-zh-CN-1024.png) | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-1024-b7cbc-le-illustrated-capabilities/advantages-en-1024.png) |
| 390px | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-390--cb04b-le-illustrated-capabilities/advantages-zh-CN-390.png) | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-390--a0df5-le-illustrated-capabilities/advantages-en-390.png) |
| 320px | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-320--cdf4e-le-illustrated-capabilities/advantages-zh-CN-320.png) | [整页](../../../output/advantages-refresh/accepted/advantages-advantages-320--c7776-le-illustrated-capabilities/advantages-en-320.png) |
