# labWebsiteV1 Transition Follow-up

本 follow-up 以 mitibm.mit.edu 分区切换时序为视觉参考，继承现有单 URL React 页面模型。Photoshop 交付仍是视觉权威；原站摘录仅用于动效时序理解，不复制 Barba、归档 HTML 或路由实现。

## 范围
仅覆盖桌面 rail 与主内容切换动效、输入锁、可访问性及 reduced-motion。旧 VAL-012/013/014 历史证据不重写。

## 验收
目标 rail 先成为 current，rail flex 约 300ms 使用 cubic-bezier(.4,.14,.3,1)；普通 rail 约 72px（按当前 token 校准）。主内容 transition-out 延迟约 500ms、opacity 变化约 300ms，primary leave 总窗口约 700ms。footer/body 离场按当前 React 单 URL 模型等价实现。过渡期间仅暴露一个可访问画面、锁定重复输入，保持焦点与 Locale；URL 不变化。reduced-motion 跳过等待并即时显示目标。
