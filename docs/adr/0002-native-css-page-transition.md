---
status: accepted
---

# 使用 React 状态与原生 CSS 实现页面切换动效

当前按 [040 参考动效规格](../labWebsiteV1-transitionFollowup/spec.md)实现同一 URL 下的七屏切换。React 维护当前画面、阶段及首个接受请求；原生 CSS 实现透明度、页脚位移与轨道 flex，不引入路由或动画依赖。静态布局仍以 Photoshop 交付为准。

## Consequences

- 起点锁首目标及其焦点来源，旧内容 inert/aria-hidden，页脚 300ms 下移 100vh；旧内容等待 500ms 后用 300ms 淡出。
- 唯一 700ms 计时器提交目标并重置滚动，截断旧淡出最后约 100ms；不是等旧 animationend 提交。
- 提交后七个 flex 槽位用 300ms cubic-bezier(.4,.14,.3,1) 重排。只有窄条按钮接收指针，内容空隙穿透；边框与语言控件同段协调移动。
- 新内容使用 500ms delay + 300ms fade-in，animationend 在约 1500ms 解锁并恢复可访问性与焦点。离场 animationend 不会完成入场。
- 桌面导航完成后聚焦接受目标 rail；移动导航回菜单按钮；正文 CTA 聚焦 site-content。同屏不启动流程。
- reduce 跳过计时、位移与透明度等待；运行中切为 reduce 也清理计时器并完成。组件卸载清理计时器。
- 大于 1280px 的条带为 44/58px，981–1280px 为 38/50px；980px 以下使用原 250ms 移动菜单。

2026-09-07 的 250ms ease-out 决策及 030 旧记录属于历史快照，当前时序由 040 续票更新。[本轮证据](../design-references/hil-site/transition/040-reference-motion.md)区分参考站采样与本地实测。
