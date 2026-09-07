# MIT‑IBM 分区导航参考包

> [!IMPORTANT]
> **本目录仅供设计与实现参考，禁止任何运行时代码从这里 import。** 原始完整源码仍保留在仓库根目录的同级路径 `../labWebSite-archive/`；正式实现必须依据 Figma 重新适配到 `src/components/hil-site/`。

这里保存的是 MIT‑IBM Research 网站分区导航动效的最小摘录与行为说明，不是可执行组件，也不是当前网站的第二套实现。不要把本目录改造成 `.ts`、`.tsx`、`.js` 或 `.css` 源码目录，也不要从归档复制页面内容、新闻数据、图片或整份打包文件。

## 交互时序

在桌面端从 `Research` 点击 `News`，或从 `News` 点击 `Research` 时，可观察到以下时序：

1. 点击分区 rail 后，目标 rail 立即成为活动分区；固定宽度的 rail 与主内容占位通过 `flex` 重新分配宽度。
2. rail 的伸缩时长约为 `300ms`，缓动为 `cubic-bezier(0.4, 0.14, 0.3, 1)`。
3. 原站的 Barba `primary-transition` 为离场阶段保留约 `700ms`；`.page-section--main` 在 `500ms` 延迟后执行 `300ms` 的透明度变化。
4. 路由 URL 更新和旧内容移除并非同一瞬间完成，因此 URL 更新后旧内容可能短暂可见。这是原站过渡编排的结果，不应误判为新页面已经渲染失败。

`300ms` 和 `700ms` 服务于两层不同动作：前者控制 rail 布局伸缩，后者控制原站主导航触发的页面离场等待。实现时不要把它们合并成一个无差别的全局延迟。

## 原站与 React 仿写的差异

| 维度 | 原站 | 归档中的 React 仿写 |
| --- | --- | --- |
| 路由机制 | Barba 拦截链接并替换页面容器 | Next.js App Router 的 `router.push` |
| rail 动效 | `flex 0.3s`，当前菜单项扩张 | pending 状态先切换当前 rail，`300ms` 后导航 |
| 内容离场 | 添加 `transition-out`，primary leave 等待约 `700ms` | 没有照搬原站的 `700ms` 离场编排 |
| 内容入场 | 摘录中没有纵向位移入场 | 新内容 `opacity` 加 `translateY(12px)`，时长 `300ms` |
| reduced-motion | 原站摘录未提供对应规则 | 仿写额外补充：跳过导航等待并关闭入场动画 |
| 同分区导航 | 由原站菜单和 Barba 规则决定 | 同分区直接 `router.push`，不触发 rail 换位等待 |

因此，React 仿写可以借鉴状态组织和输入处理，但不能当作原站动效的逐像素复刻。尤其是 `translateY(12px)` 与 reduced-motion 都是仿写补充，不是原站行为证据。

## 文档索引与来源

- [original-transition.md](./original-transition.md)：原站 Barba primary leave、清理动作和内容透明度规则。
- [react-transition.md](./react-transition.md)：React 状态、鼠标和键盘导航、pending 状态、provider 与内容容器用法。
- [rail-motion.md](./rail-motion.md)：原站与 React 仿写的 rail、current、divider、内容动画和 reduced-motion CSS 对照。

原始来源映射：

| 内容 | 归档来源 |
| --- | --- |
| Barba 路由过渡 | `../labWebSite-archive/mitibm-clone/research/mitibm.mit.edu/theme/index.js` |
| 原站 rail 与内容透明度 | `../labWebSite-archive/mitibm-clone/research/mitibm.mit.edu/theme/style.pretty.css` |
| React 状态与导航 | `../labWebSite-archive/mitibm-clone/src/components/section-navigation-transition.tsx` |
| React rail 结构 | `../labWebSite-archive/mitibm-clone/src/components/site-header.tsx` |
| React provider 挂载 | `../labWebSite-archive/mitibm-clone/src/app/layout.tsx` |
| React rail 与内容动画 | `../labWebSite-archive/mitibm-clone/src/app/globals.css` |

表中的路径以当前仓库根目录为参照；完整归档不属于当前运行时。

## 正式实现约束

- 先核对 Figma 的节点、桌面/移动状态、文案与交互，再选择性移植行为。
- 正式组件只落在 `src/components/hil-site/`，并复用当前项目已有类型、路由和设计 token。
- 不得从 `docs/` 或 `../labWebSite-archive/` 进行运行时 import，也不得在构建配置中把它们加入源码扫描或资源路径。
- 本参考包不定义当前项目的正式 API、路由结构或视觉验收标准；Figma 和当前 `src/`、`public/` 仍是唯一正式来源。
