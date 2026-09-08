# Ticket 040 — 对齐参考站点分区切换动效

实现当前 `/` 单 URL React 页面中的参考站点分区切换时序。目标 rail 点击后立即成为 current 并 flex 扩张约 300ms，普通 rail 固定约 72px；内容进入 transition-out，约 500ms 后以 300ms opacity 过渡离场，primary leave 总窗口约 700ms。footer/body 离场状态以现有 React 状态等价表达。过渡期间锁定导航输入，仅保留一个可访问画面，焦点和 Locale 不丢失；URL、路由模型不变。`prefers-reduced-motion: reduce` 时跳过等待即时提交。不得复制 Barba 或归档 HTML。

验收断言：VAL-040。
