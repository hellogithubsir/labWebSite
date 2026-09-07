# Rail 与内容动效摘录

本文把原站规则和 React 仿写规则分开列出。两者虽然共享 `300ms` rail 伸缩，但内容入场和 reduced-motion 并不相同。

来源：

- 原站：`../labWebSite-archive/mitibm-clone/research/mitibm.mit.edu/theme/style.pretty.css`
- React 仿写：`../labWebSite-archive/mitibm-clone/src/app/globals.css`

## 原站规则

原站的桌面菜单是占满视口的 flex 容器。普通分区保持 `72px` rail；current 分区用 `flex-grow: 1` 占据剩余空间。下面只保留现代 CSS 写法，归档中的 `-webkit-` 兼容声明未重复摘录。

```css
.desktop-nav .menu {
  display: flex;
  height: 100%;
  width: 100%;
}

.desktop-nav .menu li {
  width: 72px;
  flex-basis: 72px;
  flex-grow: 0.001;
  flex-shrink: 1;
  transition: flex 0.3s cubic-bezier(0.4, 0.14, 0.3, 1) 0s;
}

.desktop-nav .menu li.current-menu-parent,
.desktop-nav .menu li.current-menu-item {
  flex-grow: 1;
  pointer-events: none;
}
```

分隔线由每个菜单项的 `::after` 绘制。current 自身的线隐藏，current 后面的 rail 把线从右侧移到左侧，以保持收缩 rail 与主内容之间的边界方向。

```css
.desktop-nav .menu li::after {
  content: "";
  position: absolute;
  top: 16px;
  right: 0;
  width: 1px;
  height: calc(100% - 32px);
  opacity: 1;
  background: #be2fa8;
}

.desktop-nav .menu li.research::after {
  background-color: #b12870;
}

.desktop-nav .menu li.news::after {
  background-color: #be2fa8;
}

.desktop-nav .menu li.current-menu-parent::after,
.desktop-nav .menu li.current-menu-item::after {
  opacity: 0;
}

.desktop-nav .menu li.current-menu-parent ~ li::after,
.desktop-nav .menu li.current-menu-item ~ li::after {
  left: 0;
  right: auto;
}
```

原站的内容只做透明度离场；没有 `translateY(12px)`：

```css
.page-section--main {
  opacity: 1;
  transition: opacity 0.3s ease 0.5s;
}

.page-section--main.transition-out {
  opacity: 0;
}
```

## React 仿写规则

仿写用一个弹性 spacer 表示尚未激活分区时的主内容空间。出现活动分区后，spacer 收缩到 `0`，`.is-current` rail 扩张占据空间。

```css
.section-rail {
  position: absolute;
  inset: 0 0 0 72px;
  display: flex;
  height: 100vh;
}

.rail-item {
  position: relative;
  flex: 0 1 72px;
  width: 72px;
  min-width: 0;
  height: 100%;
  transition: flex 0.3s cubic-bezier(0.4, 0.14, 0.3, 1);
}

.rail-item.rail-spacer {
  flex: 1 1 0;
  pointer-events: none;
}

.section-rail.has-active .rail-spacer {
  flex: 0 1 0;
}

.section-rail .rail-item.is-current {
  flex: 1 1 0;
  pointer-events: none;
}
```

仿写把分隔线改为真实子元素，并在 current 后方切换左右定位。current 文本和 spacer 分隔线同时隐藏。

```css
.rail-item .rail-divider {
  position: absolute;
  top: 16px;
  right: 0;
  width: 1px;
  height: calc(100% - 32px);
  transition: opacity 0.3s ease, left 0.3s ease, right 0.3s ease;
}

.section-rail .rail-item.is-current .rail-text,
.section-rail.has-active .rail-spacer .rail-divider {
  opacity: 0;
}

.section-rail.has-active .rail-item.is-current ~ .rail-item .rail-divider {
  right: auto;
  left: 0;
}
```

仿写为新内容额外增加了透明度与 `12px` 纵向位移入场。该位移不是原站规则：

```css
@keyframes section-route-content-enter {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-route-content--enter {
  animation: section-route-content-enter 0.3s
    cubic-bezier(0.4, 0.14, 0.3, 1) both;
}
```

reduced-motion 也是仿写补充。它把 rail 相关过渡压到近乎即时，并完全关闭内容入场动画；JavaScript 同时会跳过 `300ms` 路由等待。

```css
@media (prefers-reduced-motion: reduce) {
  .rail-item,
  .rail-item .rail-text,
  .rail-item .rail-divider {
    transition-duration: 0.01ms;
  }

  .section-route-content--enter {
    animation: none;
  }
}
```

正式实现要以 Figma 的状态为准：可借鉴 flex 分配和 pending 驱动方式，但不能默认继承仿写的纵向位移、分区颜色、`72px` 宽度或移动端策略。
