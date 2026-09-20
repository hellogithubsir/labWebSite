# 040 当前参考动效与证据

> **归档说明（2026-09-17）**：下方引用的 `labWebsiteV1-transitionFollowup` mission 目录及其 evidence 已不存在（更早清理中删除）；描述保留为历史记录。

2026-09-08。当前实现为 700ms 提交、1500ms 完成的七屏单 URL 动效；静态素材与版式仍以 Ticket 001 Photoshop 为准。本记录替代 README、ADR 与 manifest 的当前动效说明，不重写旧 V1、030 或原 250ms 历史快照。

## 来源与实现

[原站现场采样](../../../labWebsiteV1-transitionFollowup/reference-observation.json)是动效 oracle，其时间原点是采样起点而非严格点击时刻。[续票规格](../../../labWebsiteV1-transitionFollowup/spec.md)定义本地计时从接受请求开始。

旧内容保持至 500ms 后淡出，700ms 截断并提交；页脚离场 300ms 下移 100vh。提交后轨道 flex 用 300ms cubic-bezier(.4,.14,.3,1) 重排，新内容等待 500ms、淡入 300ms，再清锁与恢复焦点。桌面窄条 44/58px、38/50px 与 980px 断点保留，移动菜单仍为 250ms。唯一提交计时器卸载时清理，入场 animationend 解锁；reduce 即时完成。

## 本地实测与门禁

证据根目录：[040 持久证据](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/)。原始日志保留实际执行 worktree 路径。

- Node 24.20.0，npm ci 成功。依赖安装报告 18 条审计提示（3 low、4 moderate、11 high）；未执行依赖升级，本票没有改变 lockfile。
- [红测日志](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/logs/red.log)与 red.exit：退出 1；旧实现约 159.4ms 提交，被新 >=680ms 断言拒绝。
- [针对性日志](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/logs/target-expanded.log)与 target-expanded.exit：退出 0，7/7。随后把同一多帧测试扩展到 1440、1100、390px，最终完整门禁含 9 项 transition 测试。
- [完整发布日志](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/logs/release.log)与 release.exit：Node24 wrapper 执行 make check-release，退出 0；lint、typecheck、生产 build、护栏自测及完整 E2E 89/89 通过，无跳过。
- [本地采样摘要](040-timeline-summary.json)：3 视口 × 前进/返回/跨屏共 9 次，提交 703.9–715.8ms，完成 1520.2–1560.6ms，包含浏览器帧调度；旧内容 450ms opacity=1，630ms 处于淡出，1100ms 新内容仍为 0，1350ms 已淡入，1600ms 为 1。完整逐帧 JSON 在各 trace 附件中。
- [发布 trace 目录](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/release-trace/)包含双语七屏、四种导航键、手机菜单、CTA、同屏、连续输入、reduce 100ms、健康端点等真实浏览器证据；没有用旧通过记录代替本轮验证。
- [多帧截图及时间索引](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/frames/index.json)从针对性 trace 提取；已实际查看保持旧内容、透明重排、入场与完成的画面。trace 截图采样非每帧，精确数值以 rAF JSON 为准。静态七屏与双语截图在 release-trace 的 locale/home 测试目录内。
- 新焦点断言的敏感性验证：临时移除焦点恢复，CTA reduce 测试真实失败（退出 1，main 未获焦点）；mutation.log/mutation.exit 记录失败原因，随后恢复同一正式实现，[最终针对性日志](../../../labWebsiteV1-transitionFollowup/missions/reference-motion-20260908/missions/evidence/040/logs/final-target.log)及 final-target.exit 确认 9/9 通过、退出 0。该临时变体未提交。

## 断言对应

| 契约 | 真实覆盖 |
| --- | --- |
| VAL-MOTION-001 | 1920/1281/1280/981 computed 条带宽度与 flex 缓动；1440/1100 多帧中间 x 坐标；980/390/320 无桌面轨道 |
| VAL-MOTION-002 | 三视口多帧旧/新 opacity、页脚矩阵 Y=100vh、提交及完成时刻；trace 截图 |
| VAL-MOTION-003 | 首目标锁、单 main、过渡 inert/aria-hidden、导航/移动/CTA 焦点；既有全套双语七屏 URL、键盘、菜单断言 |
| VAL-MOTION-004 | reduce 100ms 内提交、idle、opacity=1、无 inert/aria-hidden、轨道 transition=0、页脚无 transform、目标焦点 |

041 独立只读验证和最终审查另行记录；这里仅报告 040 实施阶段的真实结果。
