# Harmonizing Intelligence Lab Website V1

## 2026-09-16 首页与子页内容一致性（用户批准）

当前首页精选改为E-Linus与PDM Robot，直接读取项目页正式介绍和截图；技术摘要与伙伴名称读取子页正式数据。Jeff按用户确认改为博士毕业生，博士毕业/在读统计04/06，公开名单毕业7人、在读2人。覆盖旧首页三项精选及旧Jeff在读角色要求，其余原设计保持。详情、排除范围与验收见[一致性规格](../labWebsiteV1-contentConsistency/spec.md)，运行证据见[一致性修正记录](../design-references/hil-site/content-consistency-evidence.md)。

## 2026-09-16 技术优势页改版（用户批准）

本补充替代原技术优势页的三项表格、现场照片带及五项折叠交互；其他画面、导航和语言状态保持当前实现。

- 内容以 V4 中英文参考 HTML 的 A-01 至 A-08 为来源，按原顺序展现八项独立图文区块，每项包含编号、完整名称、价值短句、技术说明和 SVG 示意。主要内容默认全部可见，无折叠、轮播或正文内部滚动。
- 01—03 标记核心技术，04—08 标记前沿技术储备，八项采用相同字号和图文规格；不新增量化成绩、第三方背书或已验证产品声明。
- 最新[效果图](../design-references/hil-site/advantages-design-reference.png)为本页布局参考；保留实际 Logo、竖向导航和语言入口。02/06 深蓝、04/08 浅色，其余白色；桌面左文右图，980px 以下先标题/说明再示意图。
- SVG 几何与 HTML 标签组成示意图，不使用图中的第三方品牌标识；图内标签与可访问说明双语同步。浅色文字用可读的深青，图形保留品牌青色。
- 页脚「查看项目」「联系合作」分别调用现有画面导航，保持语言和单 URL。首页技术摘要、共享页脚和共享照片资源保持。
- 验收以八项默认展示、五种宽度双语、SVG 标签不重叠且可读、文字对比度、减少动画与两个 CTA 为准，替代旧 VAL-031 折叠断言；继续完整 make check-release 和独立只读审查。
- 设计映射与最终证据见[技术优势改版记录](../design-references/hil-site/advantages-refresh-evidence.md)。

## 2026-09-15 项目页扩充（用户批准）

### 2026-09-16 最新批准：统一纵向与写实配图

本条覆盖下文旧的左右布局、AI深色框及tone缓存规则。只改变03，导语、01、02、联系入口保持。

- 四类共用顺序：分类介绍、轻量横向项目选择、居中完整标题与用途、完整配图、前后按钮与页码、数字化行内功能、680px两段正文。白/浅冰蓝交替，取消左右分栏。
- 四类全部采用原生横向scroll-snap，触摸/触控板原生滚动，鼠标达到方向阈值后直接跟手。停靠后同步正文；请求目标与稳态项目分离，连续选择不锁住，resize保持对齐，reduce取消平滑滚动。
- 图片区域预留与素材比例匹配的高度避免懒加载高度0，最大1000×560，方图不超过480；完整等比显示。手机选择条横滚并保持当前项可见。
- 根据原图和项目描述重做18张写实概念配图，保留3张清晰原图。来源与提示词在内部记录，alt保留概念属性；不恢复可见图注或补充内容，不新增成果宣称。
- 新图使用新稳定语义路径，旧18图退出正式资源并保存在证据中，旧tone请求入口不再使用；不生成运行时副本，不改只读参考目录。
- 验证五种宽度双语、21项映射、默认正文、拖动中跟手与最终停靠、连续/反向选择、resize、原精选轮播及完整门禁。见[验证记录](../design-references/hil-site/projects-vertical-evidence.md)。

### 最新批准：提示清理与指定图片调色

- 覆盖下述旧补充信息要求：项目页删除全部中英文补充按钮、正文、展开状态及运行时 supplementary 字段，不将内容搬入核心介绍。完整原资料保留在只读参考 HTML。
- 移除可见的应用场景说明与图片左侧8px渐变；图片替代文本、来源和示意属性保留，不把生成图改称实际交付截图。
- 六张solu_ban横幅的暗色已在源图内，保险图自身偏灰；仅这七张用程序化色阶/通道平衡处理，保持构图与尺寸。其余图片、01、02、核心介绍及导航交互保持。
- 正式磁盘路径保持，七张调色图请求追加固定 `?tone=1`，Next图片配置只额外允许这七张图的该版本查询，解决同路径旧优化缓存。不得扩大至任意查询或其他图片。
- 验证全项目双语无补充内容和可见图注、图片前后对照、实际优化响应色彩、五种宽度和完整门禁。见[验收记录](../design-references/hil-site/projects-brightness-evidence.md)。

### 后续批准：03 图文阅读优化

本补充更新下述旧的四字段详情交互，仅作用于 03；页面导语、01、02 和联系入口保持。

- 21 项双语项目改用短名称、用途、两段核心介绍、2—3 个重点短语；核心信息默认直接可见，原始 S/T/A/R 保留在参考 HTML，不再作为运行时字段渲染。
- AI 在桌面以深蓝图文融合展示，1440px 起右侧选择器，981—1439px 选择器在上方，980px 以下改为文字后图片。边缘智能/数字产品为左文右图，桌面控件紧跟文字，手机控件放到图片后。数字化升级为左功能清单、右界面与介绍，手机按标题、功能、图片、正文排列。
- 未核验指标、资助、论文、验证限制按需进入补充信息；保留原限定，不显示来源链接和旧四字段表格。切换项目收起补充，切换语言保留状态，离页重新进入恢复默认。
- 全部现有图片保持，不生成新图；普通正文16—18px、行高约1.6，深色正文对比度至少4.5:1，无正文内部滚动或裁字。
- 验收增加1440px双语截图、默认正文可见、重点短语、图文坐标关系及补充信息条件渲染；继续完整工程门禁和独立只读审查。见[阅读优化证据](../design-references/hil-site/projects-reading-evidence.md)。

### 原项目页扩充记录

本补充覆盖下文旧版仅展示两个系统的项目页范围；其他画面及当前导航动效保持原状。项目页布局以本轮用户确认的效果图和修订计划为准，视觉 token 继续沿用官网，Photoshop 仍为未变更区域的视觉依据。

- 顺序：导语、01 四类能力、02 E-Linus/PDM Robot 精选项目、03 项目与产业应用案例、联系合作。
- 四类目录按 V4 中英文 HTML 原顺序包含 9/4/5/3 共 21 项；AI 采用名称列表联动，边缘智能与定制数字产品采用图文轮播，数字化升级采用宽幅图与名称切换。
- 能力卡定位并聚焦对应分类标题，不写 URL；各类默认首项、手动切换、独立状态。切换项目收起详情；切换语言保留状态；离页重新进入恢复默认。原精选项目轮播及默认索引保留。
- 新目录详情公开情境、任务、行动、结果；未核验百分比仅在结果内出现并保留限定，不展示资料来源名称、链接、编号和路径。来源记录保留在内部素材文档。
- 用户授权按需从 `docs/reference/company-website-main_1` 复用图片；缺图使用当前内置图像工具生成独立场景示意，明确标示，不作为实际截图或成果证据。参考目录只读，运行时资源按需放入 public。
- 验收：21 项双语与图片对应、四分类键盘与详情状态、轮播拖动及边界、语言保持、定位与联系导航、1920/1024/390/320px 响应式、原精选轮播回归、完整 make check-release。
- 当前工作区已有文件删除保持原状；不恢复 DOCX，不推送或部署。素材映射见 [项目目录素材说明](../design-references/hil-site/project-directory-assets.md)。

状态：Ready

本规格定义 Harmonizing Intelligence Lab 官网 V1 的产品目标、可观察行为、实现边界、验收契约和任务顺序。交付结果是在同一个 `/` URL 下运行的七画面中英双语官网，而不是七个独立路由。

## PRD

### Problem Statement

当前应用只有一个可构建的占位入口，尚未把正式设计、七画面导航、双语内容和整页切换交付为可访问网页。Photoshop 设计稿不能直接充当最终页面；参考 DOCX 又包含补充中英文内容，因此需要明确两者的优先关系并把内容重建为语义 HTML。

### Goals

- G-001：交付 Home、Research Directions、Projects、Technology Advantages、Partners、Team、Contact 七个完整画面状态。
- G-002：在不改变 `/` URL 的前提下完成画面导航、CTA 跳转和整页过渡。
- G-003：为七个画面提供内容对齐的英文和中文状态。
- G-004：桌面端对照 Photoshop 全尺寸 PNG，移动端在缺少专用画面时按既有设计规则可靠重排。
- G-005：建立可执行的健康检查、浏览器关键路径和视觉证据。

### Non-goals

- 不创建七个独立页面路由，不使用 query 或 hash 保存当前画面。
- 不引入后端、数据库、CMS、账号体系、提交表单或全局状态管理。
- 不引入 Framer Motion 等额外动画库。
- 不从 `../labWebSite-archive/` 或 DOCX 直接建立运行时依赖。
- 不实现设计交付包未定义且参考文档未要求的新页面、新品牌方向或额外业务功能。
- 不在 V1 中增加语言偏好持久化、浏览器语言自动检测或多语言 SEO 路由。

### Users / Actors

- 产业合作方：了解研究能力、技术优势、合作项目和联系渠道。
- 学术合作方：了解研究方向、团队和联合研究机会。
- 研究生申请者：了解团队、研究主题、申请要求和联系方式。
- 普通访问者：以英文或中文浏览实验室整体信息。
- 项目维护者：通过健康端点、工程检查和浏览器回归确认交付状态。

### User Stories

- US-001：作为访问者，我希望从 Home 快速理解实验室定位、研究方向、项目和团队，以便判断是否继续浏览。
- US-002：作为产业或学术合作方，我希望查看研究、技术和项目详情，以便判断合作匹配度。
- US-003：作为申请者，我希望查看团队与联系说明，以便准备有效的申请信息。
- US-004：作为中文访问者，我希望在所有画面之间保持中文状态，以便连续阅读完整内容。
- US-005：作为键盘或减少动画用户，我希望无需精确指针操作和强制动画也能完成全部导航。
- US-006：作为维护者，我希望用稳定命令验证运行状态、关键交互和视觉证据，以便可靠发布。

### Functional Requirements

- FR-001：`/` 初次加载显示英文 Home，并展示七个稳定顺序的导航项。
- FR-002：七个画面使用 `home`、`research`、`projects`、`advantages`、`partners`、`team`、`contact` 作为稳定标识。
- FR-003：导航、页面内 CTA 和项目合作入口在同一个 URL 内切换目标画面。
- FR-004：任意时刻只允许一个画面作为当前内容暴露给辅助技术；过渡层不得产生重复可聚焦内容。
- FR-005：导航支持点击、左右方向键、Home、End、焦点移动和当前项语义。
- FR-006：语言控制在 `en` 与 `zh-CN` 间切换当前画面的全部可见文案，并在后续画面切换中保持选择。
- FR-007：刷新页面恢复英文 Home；语言和画面状态不写入 URL 或持久化存储。
- FR-008：视觉、布局、交互状态、可见文案和媒体以 Ticket 001 登记的 Photoshop 交付包为准；设计稿文字不可读或缺失时，按内容编号使用参考 DOCX。
- FR-009：英文内容使用 English Language-aligned 文档，中文内容使用中文版语言统一文档；同一内容编号在两种语言下表达同一信息。
- FR-010：Photoshop 交付包随附并确认可用于官网的图片和 Logo 视为 V1 可用素材，进入本地正式静态资源后再由运行时使用。
- FR-011：整页切换采用 250ms ease-out 淡入淡出，无方向滑动。
- FR-012：过渡期间忽略新的导航请求；完成后只保留目标画面。
- FR-013：`prefers-reduced-motion: reduce` 下不播放整页动效、平滑滚动和 reveal 位移，并在 100ms 内显示目标画面。
- FR-014：桌面1920px状态对照每个Photoshop画面的最终画布尺寸；缺少移动稿时以 390px 视口完成重排，并保证 320px 无横向溢出。
- FR-015：`GET /healthz` 返回 HTTP 200 和 JSON `{"status":"ok"}`，不依赖外部服务。

### Acceptance Criteria

- AC-001：七个导航项均可从 `/` 到达对应画面，地址栏路径、查询和片段保持不变。
- AC-002：英文与中文均覆盖七个画面的标题、正文、导航、CTA、图片替代文本和交互标签，不出现跨语言兜底文案。
- AC-003：Home 和 Projects 的页面内 CTA 到达指定画面，当前导航项及可见内容同步更新。
- AC-004：方向键、Home 和 End 的焦点与当前画面一致；鼠标与键盘产生相同结果。
- AC-005：正常动效、重复点击和减少动画三种状态均只提交一个最终画面。
- AC-006：七画面在两种语言、桌面和移动状态下各有一组可追溯截图，共 28 组。
- AC-007：390px 和 320px 下没有页面级横向滚动、内容遮挡或不可达操作。
- AC-008：`make check`、护栏自测、健康检查和 Playwright 关键路径均以退出码 0 完成。

### Edge Cases / Failure Handling

- 点击当前画面不启动过渡，也不重置滚动或焦点状态。
- 过渡进行时只接受当前已提交的目标，额外输入不会排队形成连续动画。
- 中文长度增加时允许换行和纵向增长，不允许截断正文、缩小到不可读或隐藏信息。
- Photoshop 交付包未提供移动稿时只推导布局，不推导新内容或新交互。
- Photoshop 设计稿与 DOCX 的可见文案冲突时采用设计稿；设计稿不可读或缺失的正文按内容编号采用对应语言 DOCX。
- 未收到 Photoshop 原始交付包或无法取得正式素材时，相关页面 Ticket 保持阻塞，不使用猜测素材或归档运行时路径替代。
- 缺失图片替代文本时根据同编号内容描述媒体目的；装饰性媒体使用空替代文本。

### Constraints

- Next.js 16 App Router、React 19、TypeScript strict、Tailwind CSS v4 和现有 UI 基础设施。
- 单一正式实现；禁止 `_v1`、`_new`、`_old` 等平行副本。
- 运行时代码和数据只来自正式源码与静态资源边界。
- 移动端优先、语义 HTML、具名导出；禁止使用 `any` 绕过类型系统。
- 单个实现 Ticket 应保持在一个新上下文可完成，并尊重 400 行 PR 差异门禁。

### Out of Scope

- 内容管理、项目搜索服务、联系表单发送、用户身份和服务端个性化。
- 独立页面 URL、浏览器历史同步、深链接或语言路由。
- 未在设计交付包中出现的媒体、动画、交互和页面。
- 生产部署、分析埋点和第三方营销集成。

## Execution Spec

### Goal

把七个设计画面实现为一个可构建、可访问、双语、响应式且可验证的官网单页体验，并以浏览器行为和截图证明交付。

### Scope

#### In scope

- Photoshop 设计交付清单、正式媒体落库和内容编号映射。
- 七画面单 URL 壳层、导航、语言状态和整页过渡。
- 七个画面的语义内容与设计交付包中实际使用的局部交互。
- 健康端点、Playwright 关键路径、视觉截图和工程就绪状态。

#### Out of scope

- PRD 非目标与 Out of Scope 中列出的全部能力。
- 参考 DOCX 中没有映射到七个设计画面的候选内容。
- 对设计交付包之外的品牌或内容进行再设计。

### Relevant Context

- 当前 `/` 是最小占位入口，没有历史页面包袱。
- 当前设计与素材权威：已收到的 `Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery`；`02_Reference_PNG_sRGB` 是桌面最终视觉，`04_Documentation` 是状态说明，`05_Source_HTML` 仅供语义文案和交互参考。
- Figma 来源链：https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=0-1&p=f
- 2026-09-06 已实际验证 Node 26.0.0、依赖树、`make check` 和护栏自测可运行。
- HOME 已知 Figma 来源节点为 `MASTER / HOME / Exact 1:1 Approved PNG`，节点 ID `63:2`；仅作来源链和恢复访问后的辅助核对。
- 两份参考 DOCX 结构一致，各包含 109 个 H/R/P/A/N/T/C 内容编号。
- 当前 Figma View 席位的 MCP 调用额度已耗尽，但恢复访问不是 Ticket 001 的唯一开工条件。

### Terms / Assumptions

- `ScreenId` 固定为 `home | research | projects | advantages | partners | team | contact`。
- `Locale` 固定为 `en | zh-CN`。
- 默认状态为 `home + en`；刷新恢复默认状态，画面切换不改变 Locale。
- 七画面的稳定顺序与导航显示顺序一致。
- 只有 Photoshop 交付包随附且确认可用于官网的媒体自动进入 V1 候选；仅在 DOCX 或归档中出现的媒体不自动进入页面。
- 页面可见文案以 Photoshop 设计稿为准；不可读或缺失时按编号使用对应语言 DOCX，中文不是英文运行时机器翻译。
- 没有 prefactor Ticket：当前代码是最小壳层，新增正式边界比重构占位代码更直接。

### Affected Surfaces

- Code：单页壳层、状态序列、导航、语言控制、过渡、七个画面和共享视觉组件。
- Data / schema：按画面和 Locale 组织的本地只读内容；无数据库和远程数据源。
- API / CLI / UI：`/`、`GET /healthz`、`make check`、Playwright E2E 命令。
- Tests：健康响应、首屏、导航、语言、CTA、动效、减少动画、响应式和视觉截图。
- Docs / ops：设计交付清单、截图证据索引、README 和 rehabilitation 状态。

### Technical Direction

- 入口只组合一个官网壳层；壳层负责当前画面、目标画面、Locale 和过渡锁。
- 画面顺序保持为无 UI 依赖的稳定契约；渲染层维护唯一的 `ScreenId` 到画面映射。
- 七个画面分别拥有局部内容与布局；只有两个以上真实消费者或明确设计系统职责才提升为共享组件。
- 双语内容按相同业务编号组织，页面只消费当前 Locale 的已解析内容，不读取 DOCX。
- 媒体由 Ticket 001 从 Photoshop 随附素材中确认并落到本地正式资源；整页 PNG 只作视觉 oracle，不作为最终页面背景。
- 过渡使用 React 状态和原生 CSS；完成事件提交目标状态，不使用散落定时器推测动画结束。
- Playwright 使用生产构建和自动 Web Server 运行关键路径；视觉测试同时产出截图和 trace。

## Validation Plan

- VAL-001: Photoshop 七画面清单完整, Behavior: 每个画面均有稳定名称、源文件或画板、最终画布尺寸、移动稿或推导规则、导航顺序、状态说明和全尺寸 sRGB PNG, Surface: data, Evidence: 设计交付清单与逐画面对照图。
- VAL-002: 设计内容可追溯, Behavior: 每个可见内容区和媒体均映射到 Photoshop 画面或图层状态以及适用的 H/R/P/A/N/T/C 编号，正式素材已按用途落库，Figma 来源信息保留为 provenance, Surface: data, Evidence: 映射表与素材索引。
- VAL-003: 健康响应, Behavior: GET `/healthz` 返回 200 与 `{"status":"ok"}`, Surface: api, Evidence: curl 响应与退出码。
- VAL-004: 浏览器基线可执行, Behavior: E2E 命令启动生产应用并确认 `/` 首屏可见, Surface: ui, Evidence: Playwright 日志与 trace。
- VAL-005: CI 关键路径配置与本地等价执行, Behavior: 核对CI安装项目依赖及Chromium并运行E2E的配置，在干净本地环境执行相同命令成功，不要求远端运行, Surface: cli, Evidence: CI配置与干净本地成功日志。
- VAL-006: 初始官网壳层, Behavior: `/` 显示英文 Home、七项导航和唯一可见画面, Surface: ui, Evidence: Playwright 断言与截图。
- VAL-007: 单 URL 画面切换, Behavior: 选择任一导航项只显示对应画面且 URL 不变, Surface: ui, Evidence: Playwright trace。
- VAL-008: 键盘与移动导航, Behavior: 左右方向键、Home和End同步焦点、当前项和画面；390px与320px菜单按钮切换全部七项导航、Escape关闭且焦点返回按钮、选项激活后关闭并切换画面, Surface: ui, Evidence: Playwright trace。
- VAL-009: 全站语言切换, Behavior: Locale 切换更新当前画面的全部可见文案和文档语言语义, Surface: ui, Evidence: Playwright 断言与截图。
- VAL-010: 语言状态边界, Behavior: Locale 跨画面保持且刷新恢复英文 Home, Surface: business-flow, Evidence: Playwright trace。
- VAL-011: 双语内容完整, Behavior: 七个画面不存在混合语言兜底或缺失内容编号, Surface: ui, Evidence: 双语截图与内容断言。
- VAL-012: 整页淡入淡出, Behavior: 前后切换均为250ms ease-out淡入淡出且无方向滑动, Surface: ui, Evidence: Playwright 视频或 trace。
- VAL-013: 过渡输入锁, Behavior: 过渡中重复输入不会产生第二个目标或多个可见画面, Surface: ui, Evidence: Playwright trace。
- VAL-014: 减少动画, Behavior: reduce 模式不播放整页位移且在 100ms 内显示目标, Surface: ui, Evidence: Playwright trace。
- VAL-015: Home 上半部桌面视觉, Behavior: Hero、研究方向、技术能力和 CTA 在两种语言下匹配交付结构, Surface: ui, Evidence: 桌面截图。
- VAL-016: Home 上半部移动布局, Behavior: 390px 与 320px 下内容有序、可读且无横向溢出, Surface: ui, Evidence: 移动截图。
- VAL-017: Home 主要 CTA, Behavior: Explore Research 和 Collaborate 到达对应画面且 URL 不变, Surface: business-flow, Evidence: Playwright trace。
- VAL-018: Home 下半部桌面视觉, Behavior: 项目、伙伴、实验室、团队和页脚在两种语言下匹配交付结构, Surface: ui, Evidence: 桌面截图。
- VAL-019: Home 下半部移动布局, Behavior: 390px 与 320px 下所有区块和媒体可达且无横向溢出, Surface: ui, Evidence: 移动截图。
- VAL-020: Home 完整内容顺序, Behavior: 全页区块顺序、跨区 CTA 和页脚关系与设计交付一致, Surface: ui, Evidence: 全页截图。
- VAL-021: Research 桌面内容, Behavior: 三大研究支柱、协同关系和项目映射在两种语言下完整显示, Surface: ui, Evidence: 桌面截图。
- VAL-022: Research 移动布局, Behavior: 关系信息和项目映射在 390px 与 320px 下保持可读且无横向溢出, Surface: ui, Evidence: 移动截图。
- VAL-023: Research 交互状态, Behavior: 设计交付指定的关系图或展开状态可由键盘和指针访问, Surface: ui, Evidence: Playwright trace。
- VAL-024: Projects 概览, Behavior: 导语和四类能力在两种语言下完整显示, Surface: ui, Evidence: 桌面截图。
- VAL-025: Projects 轮播, Behavior: E-Linus轮播支持前后按钮、左右键和水平拖动，当前截图说明及进度同步更新且首尾按钮禁用, Surface: ui, Evidence: Playwright trace。
- VAL-026: Projects 轮播移动布局, Behavior: 轮播控制在390px与320px下可操作、触摸拖动可用且无页面级溢出, Surface: ui, Evidence: 移动截图。
- VAL-027: Projects 目录完整, Behavior: 设计交付要求的全部项目在两种语言下可浏览, Surface: ui, Evidence: 全页截图与项目标题断言。
- VAL-028: Projects 详情状态, Behavior: PDM Robot轮播支持按钮、左右键和水平拖动，当前说明、进度和边界禁用状态同步, Surface: ui, Evidence: Playwright trace。
- VAL-029: Projects 合作入口, Behavior: 项目合作 CTA 切换到 Contact 并保持当前 Locale 与 URL, Surface: business-flow, Evidence: Playwright trace。
- VAL-030: Advantages 内容, Behavior: V4 八项技术优势按 A-01 至 A-08 顺序默认完整展示，名称、价值、说明和图内标签双语对齐，核心技术与前沿储备身份明确, Surface: ui, Evidence: 双语桌面与逐项截图。
- VAL-031: Advantages 响应与交互, Behavior: 1920/1440/1024/390/320px 双语八项图文无裁切和横向溢出，图内标签不重叠且文字对比度至少4.5:1，reduce立即展示，两个CTA保持语言并切换对应画面且URL不变, Surface: ui, Evidence: Playwright trace 与全页及区块截图。
- VAL-032: Partners 内容, Behavior: 合作介绍和设计交付 Logo 墙在两种语言下完整显示, Surface: ui, Evidence: 桌面截图。
- VAL-033: Partners 媒体响应, Behavior: Logo 在 390px 与 320px 下清晰重排并具有正确替代文本, Surface: ui, Evidence: 移动截图。
- VAL-034: Team 内容, Behavior: PI、团队构成和核心成员在两种语言下完整显示, Surface: ui, Evidence: 桌面截图。
- VAL-035: Team 筛选与媒体响应, Behavior: all、graduate、candidate筛选的aria-pressed与可见成员同步，保留源顺序，180ms状态变化，390px与320px媒体关联可读且操作可达, Surface: ui, Evidence: 移动截图。
- VAL-036: Contact 内容, Behavior: 合作对象、合作形式、学生申请、联系方式和沟通说明在两种语言下完整显示, Surface: ui, Evidence: 桌面截图。
- VAL-037: Contact 操作, Behavior: 邮件及设计交付指定外链使用正确目标并可由键盘激活, Surface: business-flow, Evidence: Playwright trace。
- VAL-038: Contact 移动布局, Behavior: 390px 与 320px 下联系操作可见、可聚焦且无横向溢出, Surface: ui, Evidence: 移动截图。
- VAL-039: 发布门禁, Behavior: 工程检查、护栏、健康响应和 E2E 全部退出 0, Surface: cli, Evidence: 命令日志。
- VAL-040: 工程状态准确, Behavior: rehabilitation 状态只在所需证据齐备后关闭且文档与约束一致, Surface: data, Evidence: 状态文件与证据索引。

### Risks / Open Questions

- Photoshop 交付包已收到且保持只读；Ticket 001 必须完成映射后再实施页面。
- Photoshop 交付包若没有中文画面，中文以同编号内容完成版式适配，但不得改变正式设计的信息层级。
- 参考 DOCX 中项目图片与伙伴 Logo 的许可字段并非全部已确认；仅使用 Photoshop 交付包随附且确认可用于官网的媒体。
- 设计交付包未使用的候选内容、图片和历史素材不进入 V1。

## Mission Handoff

- Suggested milestones: m0-delivery-readiness, m1-shell-interaction, m2-home, m3-content-screens, m4-release-proof
- Milestone intent：m0 完成设计交付清单、健康端点和 E2E 基线；m1 完成单页壳层、双语状态和整页过渡；m2 完成 Home；m3 完成其余六个内容画面；m4 完成跨画面验收和工程就绪收口。
- Required evidence：每个 Ticket 的退出码、Playwright trace、对应截图或数据映射；最终提供 28 组双语桌面/移动截图索引。
- Human gates：Photoshop 原始交付包必须可用；若实际交付画面与当前七画面架构冲突，停止页面实施并由用户确认设计范围。Figma 恢复访问后仅作辅助核对。

### Granularity

Granularity: Right-sized

Reason: 每个实现 Ticket 只承担 1–3 条断言和一个主要验证接缝；Home 与 Projects 因内容长度和 400 行差异门禁各拆为两票，其余画面保持端到端完整。

Adjustments: 不增加 setup-only 或形式化 prefactor Ticket；Playwright 配置与首个浏览器行为合并，设计资源随真实页面进入运行时。

## Readiness

Readiness: Ready

Reason: 产品范围、来源优先级、公共状态、页面顺序、交互、响应式策略、验证接缝、依赖关系和人工门禁均已明确；素材是否到位由 Ticket 001 门禁判断。

Next: 按串行依赖执行 `tickets/`；`001` 未完成前不得实施视觉页面，`030` 通过后执行 `031`，最后由 `032` 独立核验发布状态。

## 已批准的执行补充（2026-09-07）

- 素材只读绝对路径：`/Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery`。worktree直接读取，不复制整包；运行时只消费按需导入public的资源。PSD/PNG不充当整页运行时背景。
- 来源冲突按用户已批准公共行为、最终PNG、04_Documentation、05_Source_HTML依次处理。源HTML的六项导航/独立页面链接必须转为七画面单URL；Contact必须可达。Technology源HTML A-04初始展开与文档默认折叠冲突，采用文档的初始全部折叠，PNG仅作静态版式核对。
- Projects只呈现交付的两个系统E-Linus与PDM Robot及其证据轮播，不增加能力分类筛选或候选项目。长页reveal采用14%交叉阈值、底边-7%、600ms opacity与短位移；reduce立即展示。静态视觉证据须滚动完成reveal后拍摄。
- 字体使用交付Arial系统字体栈，不添加字体下载；权利状态如实记录为待公开发布确认，本次授权本地实现，不进行公开发布。
- 002、003原实现已由bootstrap接收；新票只维护正式验收测试与证据记录，不重做端点或安装第二套工具链。保留真实提交及独立验证，不手填completed或伪造收据。
- 串行顺序：002 → 003 → 001 → 010 → 011 → 012 → 020 → 021 → 022 → 023 → 024 → 025 → 026 → 027 → 028 → 030 → 031 → 032。devflow启用validators、review-gate、max-concurrency=1。
- 每票收据后合并前创建同工作区侧边栏可见的只读审查任务，命名Review <编号> — <标题>，归入“审查与临时专区”；同票修复复用该审查任务。审查者仅返回结构化问题及指导，由编排记录报告，修复worker执行修改。
- 旧bootstrap mission保留原contract、收据和进度，接替记录通过devflow log写入；本目录新编译计划仅用于新session。结束另做完整spec审查，全部断言证明后才关闭rehabilitation。
