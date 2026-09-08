# Harmonizing Intelligence Lab 工程规则

## Code Canonicality

- 同一页面、组件或交互只保留一个正式实现；禁止 parallel _v1、_v2、_new、_old 和临时副本。
- 页面实现必须落在 src/，正式静态资源必须落在 public/；归档资料只允许从同级 ../labWebSite-archive/ 参考。
- 实现视觉页面前先读取 `docs/labWebsiteV1/spec.md` 的设计来源规则和 Ticket 001 交付清单；本轮以用户提供的 Photoshop 交付包为设计权威，Figma 仅保留来源链和恢复访问后的辅助核对用途。

## Project Identity

本仓库只实现 Harmonizing Intelligence Lab 官网的 Next.js 前端。历史实验和研究资料不属于当前运行时，不得重新复制回 src/。

## Stack & Versions

- Next.js 16 App Router
- React 19
- TypeScript strict mode
- Tailwind CSS v4、PostCSS、shadcn/ui
- Node 版本由 .nvmrc（24）和 package.json（>=24）约束；新环境先 npm ci，031 已验证干净安装。

## Directory Map

| 目录 | 责任 |
| --- | --- |
| src/app/ | 页面、布局和全局样式 |
| src/components/ | 可复用 React 组件 |
| src/hooks/ | 客户端交互 hooks |
| src/lib/ | 无 UI 的工具函数和配置 |
| src/types/ | 共享 TypeScript 类型 |
| public/ | 官网正式静态资源 |
| scripts/ | 仅存放工程自检脚本，不存放运行时代码 |

## Development Workflow

1. 先读现有实现和 Ticket 001 设计交付清单，再写代码；先搜索相似组件，避免重复造轮子。
2. 保持移动端优先、语义化 HTML 和小而清晰的组件边界。
3. 运行时只从 src/ 和 public/ 读取资源；不把归档目录、测试夹具或根目录临时文件接入页面。
4. 依赖或配置文件被用户删除时，先记录阻塞事实，不擅自恢复或替换它们。

## Verification Matrix

| Surface | Command | Pass condition | Notes |
| --- | --- | --- | --- |
| Repository gate | make check | all blocking checks pass | 新环境先执行 npm ci；031 已有通过证据 |
| Naming and scratch paths | make check-guardrails | no forbidden path or suffix is reported | 可独立运行 |
| Guard self-test | make test-guardrails | accept/reject cases behave as specified | 可独立运行 |
| Release gate | make check-release | 工程、自测、健康与完整 E2E 全部退出 0 | 串行；PLAYWRIGHT_ARGS 可指定持久 trace 输出 |

## Source of Truth & Refactor Contract

- 视觉和素材 oracle：Ticket 001 登记的用户 Photoshop 交付包；Figma 节点只作来源链和辅助核对，DOCX 只补设计稿不可读或缺失的编号文案。
- 代码 oracle：当前 src/ 和 public/ 中的正式实现；归档源码不算当前实现。
- 当前没有批准的大规模重构；只做页面交付所需的最小改动。
- 发生视觉变化时，必须说明对应的 Photoshop 画面、图层复合或状态；不能以“看起来差不多”替代验证。
- /healthz 与七画面关键行为已有正式生产运行证据；变更或审查发布状态时读取 docs/design-references/hil-site/release/evidence-index.md。

## Important Development Notes

- 不提前引入后端、数据库、全局状态管理或未被需求使用的依赖。
- 组件使用 PascalCase，hooks 使用 useXxx，工具函数使用 camelCase；禁止 any 绕过类型系统。
- 全局 CSS 只放 reset、字体变量和设计 token；组件样式优先 Tailwind utility 或组件级 CSS。
- 不执行 git commit、git push、远端仓库操作、分支操作或恢复用户删除文件，除非用户明确要求。

## Conventions

- 使用具名导出和单一职责组件，重复逻辑抽到 components/、hooks/ 或 lib/。
- 文案、颜色、间距、字体和交互状态复用 Ticket 001 已确认的设计交付定义。
- 代码注释与仓库现有语言保持一致，注释解释原因，不重复代码本身。

## Code Review Self-Check

- 是否搜索过相似组件并复用了唯一正式实现？
- 是否引入了未授权的归档依赖、临时文件或第二套页面？
- 是否覆盖了设计交付清单要求的桌面、移动端和交互状态？
- 是否有可执行验证证据；若工具链缺失，是否明确报告阻塞而不是报喜？
- 是否保持了用户已有删除状态，且没有执行未授权的危险操作？

## Architecture Discipline

- 当前边界是单个 Next.js 官网，不把实验资料、研究数据或后端服务混进前端运行时。
- 先用现有路由和组件解决需求；只有真实重复和明确接口才新增抽象。
- 新增共享组件必须有两个以上真实消费者或清晰的设计系统职责，否则保持局部实现。

## Critical Paths

`/`：七画面中英导航与刷新、CTA、键盘/移动菜单、正常/减少动画、双轮播、独立折叠、团队筛选、联系链接；由 e2e/ 的完整 Playwright 套件验证。

## Observability

- 健康检查：/healthz 返回 200 与精确 JSON；031 保存独立响应和 E2E trace。
- 关键 UI 路由：/，七画面双语已实现；031 保存 Node 24 干净安装后的完整本地门禁证据。
- 成功 trace 用 PLAYWRIGHT_ARGS 指向持久目录，日志放在 output 目录外；默认 .next 证据会被后续构建清理。
- 错误必须通过命令退出码和明确日志暴露；不得用静默降级伪造通过。

## Agent Operating Rules

- 所有技术输出使用简体中文；先读后写，基于事实做判断。
- 开始工作先列待办；执行检查前先说明它要检测的具体失败和失败后如何处理。
- 路径使用双引号；文本搜索优先 rg。
- 删除、批量修改、移动文件、安装或升级全局依赖、Git 写操作和生产变更前必须获得明确确认。
- 如果本次改动改变了工程约束或验证方式，更新 README.md 和相关约束文件。

## Runtime Lifecycle

### Rehabilitation gate

031 已在证据齐备后关闭 rehabilitation；完成时间与证据记录在 constraints.yaml。031 提交 `97bab98` 时点快照：031 独立审查和 032 最终核验待完成；判断当前状态时读取[031 审查与 032 报告](docs/design-references/hil-site/release/evidence-index.md#当前审查与核验依据)。若后续 rehabilitation 重新 active：

- 不得开展大范围重构，broad_refactor_allowed 保持 false。
- 必须先完成 npm ci、make check、/healthz 可访问且 / 的 Playwright 关键路径有证据后，才可以把 rehabilitation 标为 inactive，并记录完成时间和证据。

## Enforcement Index

| Rule | Where | Checked by | Level |
| --- | --- | --- | --- |
| 命名和临时路径禁用 | .git-hooks/check-naming.sh, constraints.yaml | make check-guardrails and CI | block |
| 护栏脚本自测 | scripts/test-guardrails.sh | make test-guardrails and CI | block |
| 前端工具链完整性 | Makefile | make check and CI | block |
| PR 差异规模 | .github/workflows/ci.yml, constraints.yaml | CI diff-size job | block |
| 秘密扫描 | .github/workflows/ci.yml | CI secret-scan job | block |
| SAST | .github/workflows/ci.yml | CI sast job | block |
| 阻塞任务汇总 | .github/workflows/ci.yml | CI all-checks-passed job | gate |
| 重复实现审查 | src/ | review-only | review-only |
| 未使用导出审查 | src/ | review-only | review-only |
| 关键路径行为 | e2e/ | make check-ui and CI critical_ui | block |

## 本轮授权与编排

- 按docs/labWebsiteV1/spec.md的已批准执行补充与串行票据实施；主任务编排、worker实现、独立可见任务只读审查。
- 本轮已获本地分支/worktree/commit/审查后ff-only合并授权；不push、不发布。素材包只读，跨worktree按规格绝对路径读取。
