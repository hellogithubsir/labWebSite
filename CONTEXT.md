# Engineering Context

## Project Identity

Harmonizing Intelligence Lab 官网是一个以 Figma 交付物为设计来源的 Next.js 前端。当前仓库处于最小入口阶段，先恢复可验证的工程护栏，再实现正式页面。

## Canonical Sources

- 视觉、文案、响应式状态和交互：用户提供的 Figma 文件及指定节点。
- 当前实现：本仓库的 src/ 和 public/。
- 历史研究资料：同级 ../labWebSite-archive/，只能参考，不是运行时依赖。
- 工程约束：AGENTS.md、constraints.yaml 和本文件。

## Domain Language

| Term | Meaning |
| --- | --- |
| HIL | Harmonizing Intelligence Lab |
| Figma delivery | 设计师交付的页面、组件、节点和状态 |
| Active app | 当前仓库中可构建、可验证的官网代码 |
| Archive | 同级历史实验和研究资料，不进入运行时 |
| Visual parity | 实现与指定 Figma 节点在结构、内容、样式和状态上的一致性 |
| Screen state | 同一个 URL 下由 Figma 交付的一张完整视觉画面；本项目共有 7 个画面状态 |
| Page transition | 从一个画面状态切换到另一个画面状态时发生的整页视觉过渡 |

在本项目中，“子页面”统一称为“画面状态”，避免把同一 URL 下的视觉切换误解成独立路由。

## Bounded Context

本项目只负责官网前端展示和页面交互。后端、数据库、研究资料管理、账号体系和未提出的全局状态不属于当前边界。

## Invariants

- 运行时代码只能从 src/ 和 public/ 读取资源。
- 页面和共享组件必须只有一个正式实现。
- TypeScript 保持 strict，不使用 any 规避问题。
- 页面实现必须保持移动端优先、语义化 HTML，并以 Figma 的状态为准。
- 用户明确删除的工具链文件只有在获得授权并从 Git 基线恢复后才能重新进入工程；恢复后必须重新验证。

## Forbidden Logic

- 不把归档源码复制回 src/。
- 不新增 parallel 页面、副本、临时资源或未使用导出。
- 不把未安装或未验证的工具链伪装成通过。
- 不提前引入后端、数据库、复杂状态管理或生产部署配置。

## State Model

当前没有业务状态模型；已登记的工程状态只有 rehabilitation active。正式页面和交互落地后，再补充可执行的用户任务和状态转换。

## Implicit Dependencies

- Node 和 npm 可执行文件存在；package/config 已从 Git 基线恢复，`node_modules` 当前不存在，`npm ci` 是本地验证前置。
- Figma 链接需要用户具备访问权限；本仓库不把外部 Figma 数据作为运行时依赖。
- CI 需要 GitHub Actions、秘密扫描和 CodeQL 服务；本地不执行远端 CI。

## Open Questions

- 正式页面的具体路由、节点范围和交互状态仍以 Figma 文件逐页确认。
- 依赖安装完成后，`make check`、`/healthz` 和 Playwright 关键路径何时具备可执行证据。
- Playwright 和 /healthz 的实现需等 Next.js 工具链可运行后处理。
