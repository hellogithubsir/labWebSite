# Engineering Context

## Project Identity

Harmonizing Intelligence Lab 官网是一个以用户 Photoshop 交付包为当前设计权威的 Next.js 前端。当前仓库处于最小入口阶段，先恢复可验证的工程护栏，再实现正式页面。

## Canonical Sources

- 视觉、素材、响应式状态和交互：Ticket 001 登记的用户 Photoshop 交付包。
- 来源链与辅助核对：现有 Figma URL 和已知节点；DOCX 只补设计稿不可读或缺失的编号文案。
- 当前实现：本仓库的 src/ 和 public/。
- 历史研究资料：同级 ../labWebSite-archive/，只能参考，不是运行时依赖。
- 工程约束：AGENTS.md、constraints.yaml 和本文件。

## Domain Language

| Term | Meaning |
| --- | --- |
| HIL | Harmonizing Intelligence Lab |
| Design delivery | 用户提供的分层 PSD/PSB、全尺寸 sRGB PNG 及随附素材、字体和状态说明 |
| Active app | 当前仓库中可构建、可验证的官网代码 |
| Archive | 同级历史实验和研究资料，不进入运行时 |
| Visual parity | 实现与 Ticket 001 指定设计画面在结构、内容、样式和状态上的一致性 |
| Screen state | 同一个 URL 下由设计交付包定义的一张完整视觉画面；本项目共有 7 个画面状态 |
| Page transition | 从一个画面状态切换到另一个画面状态时发生的整页视觉过渡 |

在本项目中，“子页面”统一称为“画面状态”，避免把同一 URL 下的视觉切换误解成独立路由。

## Bounded Context

本项目只负责官网前端展示和页面交互。后端、数据库、研究资料管理、账号体系和未提出的全局状态不属于当前边界。

## Invariants

- 运行时代码只能从 src/ 和 public/ 读取资源。
- 页面和共享组件必须只有一个正式实现。
- TypeScript 保持 strict，不使用 any 规避问题。
- 页面实现必须保持移动端优先、语义化 HTML，并以 Ticket 001 的设计状态为准。
- 用户明确删除的工具链文件只有在获得授权并从 Git 基线恢复后才能重新进入工程；恢复后必须重新验证。

## Forbidden Logic

- 不把归档源码复制回 src/。
- 不新增 parallel 页面、副本、临时资源或未使用导出。
- 不把未安装或未验证的工具链伪装成通过。
- 不提前引入后端、数据库、复杂状态管理或生产部署配置。

## State Model

公共状态固定为七个ScreenId和en|zh-CN，默认英文Home，单URL且刷新复位；整页250ms淡入淡出。rehabilitation保持active，031在证据齐备后收口。

## Implicit Dependencies

- Node 和 npm 可执行文件存在；package/config 已从 Git 基线恢复，`node_modules` 当前不存在，`npm ci` 是本地验证前置。
- Photoshop交付包已收到；路径与来源优先级见docs/labWebsiteV1/spec.md已批准执行补充。001完成清单后实施视觉页面。
- Figma MCP 当前受 View 席位调用额度限制；该来源不作为运行时依赖或当前开工门禁。
- CI 需要 GitHub Actions、秘密扫描和 CodeQL 服务；本地不执行远端 CI。

## Open Questions

- 正式画面的尺寸、素材和交互状态待 Photoshop 原始交付包逐页确认。
- 依赖安装完成后，`make check`、`/healthz` 和 Playwright 关键路径何时具备可执行证据。
- Playwright与/healthz实现已接收，002/003仅维护正式验收，不重复实现。
