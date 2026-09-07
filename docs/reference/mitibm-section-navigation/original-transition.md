# 原站 Barba 过渡摘录

> [!NOTE]
> 本文是从原站压缩 bundle 和格式化 CSS 中提炼的最小阅读版摘录，仅供理解行为。JavaScript 对打包器局部变量做了语义化命名并移除了无关初始化，不能直接复制到当前 Next.js 工程。

来源：

- `../labWebSite-archive/mitibm-clone/research/mitibm.mit.edu/theme/index.js`
- `../labWebSite-archive/mitibm-clone/research/mitibm.mit.edu/theme/style.pretty.css`

## Before enter

原站在每次进入下一页前滚动到页面顶部，并从 `next.html` 同步菜单和 `<body>` 状态。它先清除当前文档菜单里的 current class，再从下一页 HTML 中取第一个顶层 current 菜单项；该元素的 `id` 会作为当前文档中的 class 选择器，用于标记对应菜单项。最后，当前 `<body>` 继承下一页的 class，并附加 `in-transition`。

```javascript
barba.hooks.beforeEnter(({ next }) => {
  $(window).scrollTop(0);

  if (next.html) {
    $(".menu .current-menu-item").removeClass("current-menu-item");
    $(".menu .current-menu-parent").removeClass("current-menu-parent");

    const nextCurrentMenuItem = $(next.html)
      .find(".menu > .current-menu-item, .menu > .current-menu-parent")
      .first();
    const matchingMenuClass = nextCurrentMenuItem.attr("id");

    $(`.${matchingMenuClass}`).addClass("current-menu-item");
  }

  const bodyClassMatch = /<body.*\sclass=["'](.+?)["'].*>/i.exec(next.html);
  const nextBodyClasses = `${bodyClassMatch[1]} in-transition`;

  document.body.setAttribute("class", nextBodyClasses.replace("nojs", ""));
});
```

上面的参数名、`nextCurrentMenuItem`、`matchingMenuClass`、`bodyClassMatch` 和 `nextBodyClasses` 都是阅读版语义化命名；压缩 bundle 使用单字母局部变量。摘录只重排并命名原有流程，不代表应把这段 HTML 字符串解析方式复制进当前 Next.js 实现。

## Primary transition

原 bundle 仅在触发链接位于 `.section-links` 时选择 `primary-transition`。离场开始后，页面进入 `in-transition` 状态，主内容增加 `transition-out`，Barba 等待约 `700ms` 才结束 leave。

```javascript
barba.init({
  debug: false,
  prevent({ el }) {
    return Boolean(el.classList?.contains("prevent"));
  },
  transitions: [
    {
      name: "primary-transition",
      from: {
        custom({ trigger }) {
          return $(trigger).parents(".section-links").length;
        },
      },
      leave() {
        const done = this.async();

        $("body").addClass("in-transition");
        $(".page-section--main").addClass("transition-out");
        window.setTimeout(done, 700);
      },
      afterEnter() {
        const done = this.async();

        initializePageBehaviors();
        done();
      },
    },
  ],
});
```

上面的 `$`、`barba` 和 `initializePageBehaviors` 是对压缩 bundle 中 `c`、`r.default` 和 `m` 的阅读性命名。原逻辑的页面初始化函数最终还会移除过渡类：

```javascript
function clearPrimaryTransitionState() {
  $(".page-section--main").removeClass("transition-out");
  $("body").removeClass("in-transition");
}
```

`clearPrimaryTransitionState` 是从原初始化函数末尾两条语句抽出的说明性函数名，不代表原 bundle 中存在同名函数。

## 内容透明度

原站主内容默认保持可见。添加 `transition-out` 后，透明度在 `500ms` 延迟后以 `300ms` 时长过渡到 `0`。

```css
.page-section--main {
  opacity: 1;
  transition: opacity 0.3s ease 0.5s;
}

.page-section--main.transition-out {
  opacity: 0;
}
```

`in-transition` 还会把 footer 向下移动一个视口高度，使其在换页期间离开视口；页面初始化清理该 class 后，footer 恢复原有位置。

```css
.in-transition .site-footer {
  transform: translateY(100vh);
}
```

这里的 CSS 总时间窗口可达到约 `800ms`，而 Barba leave 在约 `700ms` 结束，两者存在重叠。实现时应把这视为原站编排事实，不要擅自推导出“必须等透明度完整结束后才能换页”的新规则。

## 阅读结论

- `primary-transition` 的选择条件是 `.section-links`，不是所有站内链接。
- rail 的 `300ms` 伸缩由 CSS 并行执行；`700ms` 是 primary leave 的异步等待。
- 旧内容的隐藏依赖 `.page-section--main.transition-out`；footer 的移出依赖 `body.in-transition`，新页面进入后由页面初始化逻辑清理状态。
- 该摘录没有展示原站的 reduced-motion 支持，也没有展示 `translateY` 入场；这两项来自 React 仿写。
