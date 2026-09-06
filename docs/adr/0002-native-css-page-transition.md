---
status: accepted
---

# 使用 React 状态与原生 CSS 实现页面切换动效

目标交互是同一 URL 下的整页翻页式切换，当前没有多种动画系统或复杂时间轴需求，因此采用 React 状态编排当前/下一个画面，再由独立的 CSS transition/animation 模块控制视觉过渡，不引入 Framer Motion 等动画依赖。这样动画曲线、层叠关系和 Figma 对照都集中在一个 seam 内，依赖更少，后续替换动效也不需要改七个画面。

## Consequences

- 切换器只维护 `currentScreen`、`nextScreen`、方向和过渡锁定状态。
- 动画完成由 `animationend`/`transitionend` 提交下一个画面，而不是用散落的定时器猜测结束时间。
- `prefers-reduced-motion` 下跳过整页动画并直接提交状态。
- 如果 Figma 后续要求真正的 3D 翻页时间轴，再单独替换 transition 模块，不扩散到页面内容组件。
