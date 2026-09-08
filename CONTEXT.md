# Engineering Context

## Project Identity

Harmonizing Intelligence Lab 官网是一个以用户 Photoshop 交付包为当前设计权威的 Next.js 前端。七画面双语实现与本地发布门禁已落地；正式证据见 `docs/design-references/hil-site/release/evidence-index.md`。

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

公共状态固定为七个ScreenId和en|zh-CN，默认英文Home，单URL且刷新复位；整页250ms淡入淡出。031 的干净安装、工程/护栏/健康/E2E 与视觉证据齐备后，rehabilitation 已关闭；大规模重构仍不允许。

## Implicit Dependencies

- Node 24 与锁文件是可复现基线；031 已从无 node_modules 的 worktree 完成 npm ci，新环境仍须安装。
- Photoshop交付包已收到；路径与来源优先级见docs/labWebsiteV1/spec.md已批准执行补充。001 已完成逐页清单，正式实现从 src/public 消费内容和媒体。
- Figma MCP 当前受 View 席位调用额度限制；该来源不作为运行时依赖或当前开工门禁。
- CI 需要 GitHub Actions、秘密扫描和 CodeQL 服务；本地不执行远端 CI。

## Outstanding Facts

- 031 提交 `97bab98` 时点快照：031 独立审查和 032 最终核验待完成；当前结论以[031 审查与 032 报告](docs/design-references/hil-site/release/evidence-index.md#当前审查与核验依据)为准。本地工程就绪不等于生产发布已完成。
- 远端 CI、gitleaks、CodeQL 未运行；VAL-005 是配置核对与干净本地等价执行。
- npm ci 报告 18 项依赖公告，未在本票升级；见发布索引安装日志。
- 自动重复代码/未使用导出检查与本地 hook manager 尚未配置，继续使用人工审查和 CI/显式护栏。
- 媒体公开发布权利待确认；中文及移动布局采用已批准推导规则，不虚构缺失原稿或照片。
