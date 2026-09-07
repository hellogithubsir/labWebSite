# React 仿写过渡摘录

> [!WARNING]
> 以下代码来自归档仿写，展示的是状态组织方式，不是当前项目的正式组件，也不是原站逐像素复刻。当前项目的路由、分区名称和 DOM 必须依据 Figma 重新设计，禁止直接复制后投入运行时。

来源：

- `../labWebSite-archive/mitibm-clone/src/components/section-navigation-transition.tsx`
- `../labWebSite-archive/mitibm-clone/src/components/site-header.tsx`
- `../labWebSite-archive/mitibm-clone/src/app/layout.tsx`

## 状态与导航策略

仿写使用 `pendingNavigation` 同时驱动“即将激活的 rail”和延迟路由跳转。路径已经完全相同时不做任何操作；当前路径与目标路径属于同一分区时直接跳转，不等待 rail 换位；系统要求 reduced-motion 时也直接跳转。

```tsx
type PrimarySection = "Research" | "News" | "Inside the lab";

type PendingSectionNavigation = {
  href: string;
  section: PrimarySection;
};

const SECTION_TRANSITION_MS = 300;

function sectionForPathname(pathname: string): PrimarySection | null {
  if (pathname === "/research" || pathname.startsWith("/research/")) {
    return "Research";
  }

  if (pathname === "/news" || pathname.startsWith("/news/")) {
    return "News";
  }

  if (pathname === "/about" || pathname.startsWith("/about/")) {
    return "Inside the lab";
  }

  return null;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

provider 内部的核心导航片段如下。`pendingNavigation` 在 `router.push` 之前写入，因此 rail 可以先动；这里省略了归档源码中用于异常恢复的长定时器，因为它不是理解主流程所必需的接口。

```tsx
const [pendingNavigation, setPendingNavigation] =
  useState<PendingSectionNavigation | null>(null);
const navigationTimerRef = useRef<number | null>(null);

const startSectionNavigation = useCallback(
  (href: string, section: PrimarySection) => {
    if (pathname === href) {
      return;
    }

    if (navigationTimerRef.current !== null) {
      window.clearTimeout(navigationTimerRef.current);
    }

    if (prefersReducedMotion() || sectionForPathname(pathname) === section) {
      setPendingNavigation(null);
      router.push(href);
      return;
    }

    setPendingNavigation({ href, section });
    navigationTimerRef.current = window.setTimeout(() => {
      navigationTimerRef.current = null;
      router.push(href);
    }, SECTION_TRANSITION_MS);
  },
  [pathname, router],
);
```

鼠标处理只拦截未被消费的主按钮普通点击。Meta、Control、Shift 或 Alt 修饰点击交给浏览器处理，从而保留新标签页、下载或其他平台惯例。键盘处理只接管无修饰键的 `Enter`。

```tsx
const navigateSection = useCallback(
  (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
    section: PrimarySection,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    startSectionNavigation(href, section);
  },
  [startSectionNavigation],
);

const navigateSectionByKeyboard = useCallback(
  (
    event: KeyboardEvent<HTMLAnchorElement>,
    href: string,
    section: PrimarySection,
  ) => {
    if (
      event.defaultPrevented ||
      event.key !== "Enter" ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    startSectionNavigation(href, section);
  },
  [startSectionNavigation],
);
```

pending 的分区优先于当前 URL 对应的分区，负责让目标 rail 立即扩张。路由到达目标 `pathname` 后，`isSectionRouteTransition` 变为 `true`，内容容器获得入场 class，并在 `300ms` 后清除 pending。

```tsx
const isSectionRouteTransition = pendingNavigation?.href === pathname;

useEffect(() => {
  if (!isSectionRouteTransition) {
    return;
  }

  const entryTimer = window.setTimeout(() => {
    setPendingNavigation(null);
  }, SECTION_TRANSITION_MS);

  return () => window.clearTimeout(entryTimer);
}, [isSectionRouteTransition]);

const value = useMemo(
  () => ({
    activeSection: pendingNavigation?.section ?? sectionForPathname(pathname),
    isSectionRouteTransition,
    navigateSection,
    navigateSectionByKeyboard,
  }),
  [
    isSectionRouteTransition,
    navigateSection,
    navigateSectionByKeyboard,
    pathname,
    pendingNavigation,
  ],
);
```

## Rail 与内容接线

`site-header.tsx` 用 `activeSection` 生成 current 状态，同时保留真实链接的 `href` 与 `aria-current`：

```tsx
const {
  activeSection,
  navigateSection,
  navigateSectionByKeyboard,
} = useSectionNavigationTransition();

const isCurrent = sectionName === activeSection;

<Link
  href={sectionHref}
  aria-current={isCurrent ? "page" : undefined}
  onClick={(event) => navigateSection(event, sectionHref, sectionName)}
  onKeyDown={(event) =>
    navigateSectionByKeyboard(event, sectionHref, sectionName)
  }
>
  <span className="rail-text">{sectionName}</span>
</Link>;
```

内容容器根据 pending 与新 pathname 的匹配结果附加入场 class。这个入场包含仿写新增的 `translateY(12px)`；它不是原站行为。

```tsx
function SectionRouteContent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isSectionRouteTransition } = useSectionNavigationTransition();

  return (
    <div
      id="content"
      key={pathname}
      className={`page-section--main section-route-content${
        isSectionRouteTransition ? " section-route-content--enter" : ""
      }`}
    >
      {children}
    </div>
  );
}
```

## Provider 使用

归档仿写在根布局内挂载 provider，使固定导航和每个路由的内容容器共享同一个 pending 状态。正式实现若采用此结构，provider 也必须位于 rail 与路由内容的共同祖先，而不是每个页面各建一份状态。

```tsx
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SectionNavigationTransitionProvider>
          {children}
        </SectionNavigationTransitionProvider>
      </body>
    </html>
  );
}
```

归档组件还在卸载时清理导航定时器，并用恢复定时器避免 pending 长期残留。是否保留这部分应由当前项目的真实路由失败模式决定，不应脱离需求整套照搬。
