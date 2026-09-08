# labWebsiteV1 Transition Follow-up

## Goal

将现有七画面官网的切换动效对齐 mitibm.mit.edu 真实分区切换时序，保留当前 React 单 URL、双语、键盘、移动菜单与 reduced-motion 模型。只维护 src/ 中的正式实现，不复制 Barba、归档 HTML、路由框架或新增图片资产。

## 设计来源与生效边界

- 静态布局、正文和素材仍以旧规格 Ticket 001 登记的用户 Photoshop 交付包为权威；Figma 仅保留来源链及辅助核对用途。本续票仅以参考站现场切换状态作为动效 oracle，不改变七画面设计。
- 素材只读绝对路径：`/Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery`。不得修改或复制整包；本票不需要新增素材。
- 动效观察来源：2026-09-08 使用 CUA-CDP 在 https://mitibm.mit.edu/ 对 News → Research 点击过程进行 requestAnimationFrame 采样。原始现场记录保存在 [reference-observation.json](reference-observation.json)，是040/041的动效来源 oracle。观察值 t 的原点是采样起点，不能当作严格点击时刻；约 t=22ms 进入 body in-transition / content transition-out；t=523ms 旧内容 opacity 仍为 1，t=540ms 为 .985，t=706ms 为 .1265；t=740ms 切换 body 且新内容 opacity 为 0。轨道此时才开始运动，t=807ms 目标宽度约 420px，t=1007ms 约 1688px，t=1208ms 稳态约 1700.75px；新内容 t=1208ms 仍为 0，t=1407ms 为 .8544，t=1556ms 为 1。以上是采样观察值，不是逐毫秒精确承诺。
- 原站 computed transition：轨道 `flex .3s cubic-bezier(.4,.14,.3,1)`，内容 `opacity .3s .5s`。此前草稿“轨道立即先动”和普通轨道 72px 的说法被本规格纠正。
- 新 validation-contract.json 仅作用于本 follow-up；不得修改 `docs/labWebsiteV1/**` 中已冻结的 spec、contract、features、tickets 或历史证据。旧 250ms 实现说明及 030 的旧 500ms/门禁记录属于历史快照；更新 README、ADR 和设计 manifest 的当前行为说明并链接新证据，不重写旧历史产物。此前通过证据不能充当本轮动效通过证据。

## 目标行为

### 正常动画时间轴

以下 t 从接受一个不同目标画面的请求开始计时。允许浏览器帧调度产生合理误差，验证应同时检查阶段顺序、computed 样式与多帧数值，不能只用一次定时截图证明整个时间轴。

| 阶段 | 时间 | 行为 |
| --- | --- | --- |
| 锁定与页脚离场 | 0ms | 锁定首个目标；旧内容继续可见但 inert 且 aria-hidden，暂不让不可交互内容进入可访问树；页脚约 300ms 向下移动 100vh。轨道和 active 目标此时不提前切换。 |
| 旧内容淡出 | 500–800ms | 旧内容 opacity 在 500ms 延迟后以 300ms 过渡淡出；700ms 提交目标会截断最后约 100ms，符合现场仍有旧内容残余透明度时换页的行为。 |
| 提交与轨道重排 | 700ms | 提交锁定目标、重置滚动，目标成为 active；桌面轨道开始约 300ms flex 重排，使用 cubic-bezier(.4,.14,.3,1)。700ms 是离场提交点，不是整个切换完成点。 |
| 新内容等待 | 700–1200ms | 新内容保持 opacity 0 且不可交互、对辅助技术隐藏；从提交点起延迟 500ms。 |
| 新内容淡入 | 1200–1500ms | 新内容 opacity 用 300ms 从 0 过渡到 1；页脚按目标页的正常状态恢复，避免上一画面页脚覆盖新内容。 |
| 完成 | 1500ms | 清锁，恢复目标画面可访问性和交互，并按请求来源恢复焦点（详见下述规则）。 |

### 几何与交互约束

- 桌面静态轨道尺寸保留本项目定义：大于 1280px 时普通 44px、active 58px；981–1280px 时普通 38px、active 50px。这里是导航条宽度，不是展开内容面板宽度。不得照抄原站 72px 导致七屏布局变窄。
- 980px 及以下不出现桌面轨道；移动菜单本身的 250ms 动画保留，内容切换仍遵循上述内容时间轴。
- 同屏请求保持现状，不启动时间轴、不重置滚动或焦点。过渡中首个有效目标锁定；后续鼠标、键盘与移动菜单导航请求不得替换目标或排队补跳。
- `/` 单 URL 不变，不增加独立画面路由、hash/history 导航或网络换页；Locale 延续既有状态，目标画面的标题、导航和正文语言正确。
- 稳态只暴露当前画面；整个过渡不得同时暴露两个可访问画面。旧内容从起点隐藏，新内容到完成才恢复，因此过渡中允许零个可访问内容画面。导航自身保留语义与键盘可用性，并按锁状态阻止重复请求。
- 焦点按被接受请求的来源处理：桌面导航（鼠标或键盘）完成后聚焦最终被接受目标 rail；移动菜单导航保留或恢复菜单按钮焦点；正文 CTA 到达新内容后聚焦 `#site-content`（或唯一主标题等价可访问目标）；同屏请求不移动焦点。普通和 reduced-motion 使用相同规则。
- `prefers-reduced-motion: reduce` 跳过全部等待和位移，完整提交、解锁、滚动与焦点处理在 100ms 内完成；不遗留 opacity 0、inert 或 aria-hidden 状态。

## 实施与验证范围

040 修改唯一正式的 PageTurnTransition、ScreenNavigation、HilSiteShell 及现有 `e2e/transition.spec.ts`。不得新增平行的 transition-reference 测试。已有 Locale 与 navigation 套件如因真实 1500ms 时序需合理等待，只能更新等待及单测试超时，不得删除或弱化行为断言。正文、素材、路由及其他组件没有改造需求。

先用现有 transition 套件记录旧实现相对新时序断言的失败，再修复并记录通过；测试和说明应覆盖桌面轨道、移动内容、同屏、重复输入、URL、Locale、单可访问画面及焦点。`docs/design-references/hil-site/transition/` 只保存文本索引和 JSON 摘要；实际 trace、截图、完整命令日志及必要的临时采样脚本放在本次新 mission 被 Git 忽略的 `missions/evidence/` 下，以索引链接持久证据，不在 tracked docs 放大批二进制或可执行临时脚本。trace 输出目录和日志目录分开，避免 Playwright 清理自身日志。

041 是独立只读 VALIDATION：对最终实现运行真实 UI 验证并逐条提交 verdict 与具名证据，不修改被测代码。发现问题交回实现 worker 修复。已归档的 reference-observation.json 由实施或验证阶段引用到本轮 transition 证据，区分现场观察和本地实测；不能把本规格转述当成本地通过数据。

## Validation Plan

- VAL-MOTION-001: 轨道几何与顺序, Behavior: 大于1280px普通44px与active58px且981至1280px为38px与50px；980px以下无桌面轨道；正常切换700ms提交后才启动300ms flex轨道重排并使用指定缓动, Surface: ui, Evidence: 桌面两种宽度与移动视口computed样式和多帧几何采样及Playwright trace
- VAL-MOTION-002: 内容与页脚完整时序, Behavior: 旧内容保持至500ms再用300ms淡出且700ms提交；页脚起点下移100vh约300ms；新内容提交后500ms保持透明再300ms淡入并在1500ms完成解锁, Surface: ui, Evidence: 正常动画多阶段opacity与页脚位移采样和带时间戳的截图及trace
- VAL-MOTION-003: 单URL与交互状态, Behavior: 七画面保持单URL及Locale；首目标锁定且同屏不重置；键盘和移动菜单可用；过渡中至多一个可访问画面；完成后桌面导航聚焦被接受目标rail且移动导航保留或恢复菜单按钮焦点且正文CTA聚焦site-content或等价主标题；同屏不移动焦点；普通与reduce一致, Surface: ui, Evidence: 双语七屏导航与同屏及重复输入和可访问性焦点断言报告及trace
- VAL-MOTION-004: 减少动画即时完成, Behavior: reduce模式100ms内完整提交并恢复交互与焦点且无轨道内容或页脚动画等待和残留隐藏状态, Surface: ui, Evidence: reduce模式计时和computed样式与焦点可访问性断言报告及trace

## Mission Handoff

- Suggested milestones: reference-motion
- Required evidence: 040 的失败到通过记录与完整 release gate 退出码；041 的四条独立 verdict 和真实 UI 证据；最终只读审查与全部规格对照结论
- Human gates: 已授权本地 branch/worktree/commit 与审查后 ff-only 合并；不 push 不发布；不改旧 V1 冻结产物
- Execution: 040 → 041；启用 validators 和 review-gate；max-concurrency=1；review-checklist.json 为 id/text 条目数组；missions/ 为忽略的运行态目录，编译产物只由真实 compiler 生成
