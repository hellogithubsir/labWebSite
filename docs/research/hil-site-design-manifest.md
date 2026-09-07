# 七画面设计与素材交付清单

Ticket 001，2026-09-07。七个 FINAL PSD、七个全尺寸 sRGB PNG 齐全；正式媒体共 22 个。此清单用于实现，不是新设计。

## 读取入口

- 原包根目录：`/Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery`。以下来源路径均相对此只读目录，worktree 直接按绝对路径读取。
- [pages.json](../design-references/hil-site/pages.json)：每屏唯一 PSD、PNG、HTML 来源、实际画布及 PSD 组 bbox。bbox 为 `[left,top,right,bottom]`；组名前缀不等于 DOCX 编号。
- [assets.json](../design-references/hil-site/assets.json)：22 个媒体的来源、正式落库路径、尺寸、PSD 组、内容编号及提取坐标。共享 Logo 和照片只存一份。
- [bilingual-source.json](../design-references/hil-site/bilingual-source.json)：两份 DOCX 的原始段落、表格；locale 为 en/zh-CN，section 保留原始编号标题。它是构建期参考，不接入运行时；表格的说明列不是正文。
- 英文原文：`docs/reference/实验室官网内容填写包 v4（English·Language-aligned）.docx`；中文原文：`docs/reference/实验室官网内容填写包 v4（中文版·语言统一版）.docx`。设计文字不可读或缺失才按对应编号补用。
- 最终像素看 `02_Reference_PNG_sRGB/`；状态看 `04_Documentation/INTERACTION_STATES.md`；`05_Source_HTML/website-code-seven-pages/` 仅恢复文案、元素位置和交互。不要照搬独立 HTML 页或其总高度。
- Figma provenance：[原始文件](https://www.figma.com/design/bsJuR04iJitg8NpxQjNw6U/Harmonizing-Intelligence-Lab---Website-UI--6-Pages-?node-id=0-1&p=f)，HOME `63:2`，`MASTER / HOME / Exact 1:1 Approved PNG`；本次不以恢复访问为门禁。

## 唯一画面与操作

名称对应 `01_PSD_PSB/<名称>.psd` 和 `02_Reference_PNG_sRGB/<名称>-sRGB.png`。原始对照图只作视觉 oracle，不复制到 public 或作页面背景。

| 顺序 / ScreenId | 名称 | 画布 | 主要 CTA 和默认状态 |
| --- | --- | --- | --- |
| 01 home | 01-HOME-V1-FINAL | 1920×6668 | Explore Research → research；Collaborate → contact（020 公共 CTA 契约；HTML 原链接为 partners，仅保留来源记录）；页脚邮件 |
| 02 research | 02-RESEARCH-DIRECTIONS-V1-FINAL | 1920×6685 | Explore the Pillars 滚到当前屏支柱区，不写 hash；关系卡和场景映射静态展示 |
| 03 projects | 03-PROJECTS-V1-FINAL | 1920×4716 | E-Linus 和 PDM Robot 两个独立轮播；合作 CTA → contact，保持语言 |
| 04 advantages | 04-TECHNOLOGY-ADVANTAGES-V1-FINAL | 1920×3466 | 三核心优势、现场照片、A-04 至 A-08 独立折叠，默认全关闭 |
| 05 partners | 05-PARTNERS-V1-FINAL | 1920×2531 | 九项文字机构名称墙，不从外网补 Logo |
| 06 team | 06-TEAM-V1-FINAL | 1920×4796 | PI/领导、构成、九成员；默认 all，graduate/candidate 筛选 |
| 07 contact | 07-CONTACT-V1-FINAL | 1920×6076 | 四类对象、三合作方式、申请、联系、沟通、两图和页脚；邮箱 mailto:chawjk@ukm.edu.my |

共同默认 home + en，刷新恢复默认；七屏顺序固定。源 HTML 前六页缺 Contact 导航，按已批准规格补齐七项并改为单 URL。所有标题、正文、导航、CTA、替代文本及控制标签均须双语。点击当前屏不重置滚动或焦点。

## PSD 区块与 DOCX 编号映射

所有可见区块按下表归属；页眉、标题、标签归所属区块。设计独有文案标为设计补充，不伪造 DOCX 编号。组的完整名称和坐标见 pages.json。

| FINAL PSD 组 | DOCX 内容与差异处理 |
| --- | --- |
| H-01 Header/Hero/Value Navigation | H-01；三价值标签为设计补充 |
| H-02 Research Directions | H-02，H-02-01/02/03 → R-02/03/04 |
| H-03 Capability Mapping | H-03-01/02/03 → A-01/02/03；核心优势名称采用 PNG 版本 |
| H-04 Selected Projects | H-04；按标题匹配 Smart Grocer → P-07-08、Digital Concierge → P-07-05、NAS → P-07-06；DOCX H-04 子项顺序不覆盖 PNG |
| H-05 Partners + Inside the Lab | H-05-01 至 06 → N-02-01 至 06；实验室四图和说明为该组设计补充 |
| H-06 Team Summary | H-06-01 → T-02；H-06-02/03/04 → T-04-01/02/03 |
| H-07 Closing Footer | H-07及子项；邮箱按 C-05，版权为设计共享文案 |
| R-01 Header/Hero；R-02 Introduction | 均关联 DOCX R-01；不能把 R-02 PSD 简介误当 HEALTH |
| R-03 HEALTH；R-04 EDGE-AI；R-05 AGENT | 分别对应 DOCX R-02、R-03、R-04；其中旧项目编号仅作研究关联，不新增 Projects 目录 |
| R-06 Relationship；R-07 Scenarios | 分别对应 DOCX R-05、R-06；关系区三照片、标题和说明采用最终 PNG，源 HTML 此区没有照片且文案不同 |
| R-08 Closing Footer | 设计 closing 文案，邮箱 C-05 |
| P-01 Header + Introduction | P-01/P-02 信息角色被设计替换为两系统简介：Care Intelligence 和 Industrial AI；不新增 DOCX 四能力卡 |
| P-02 E-Linus；P-03 PDM Robot | P-07 项目展示的设计替换；八张 slide 文字按 PNG/HTML，不套用旧 P-02/P-03 项目编号，不造 DOCX 子编号 |
| P-04 Closing Footer | P-08 合作引导；合作入口切 contact 为已批准行为，邮件按 C-05 |
| A-01 Header；A-02 Core Advantages | 概览为设计补充；核心技术分别对应 DOCX A-01/02/03，保留设计 Method/Advantage 与最终名称 |
| A-03 Field Evidence；A-04 Frontier Reserve | 前者为 A-01/02/03 的现场证据；后者对应 DOCX A-04 至 A-08 |
| A-05 Closing Footer | 设计 closing 文案和 C-05 邮箱；不是 DOCX A-05 记忆能力 |
| N-01 Introduction；N-02 Directory | N-01；N-02-01 至 N-02-09 原顺序，文字名称卡 |
| N-03 Closing Footer | 设计 closing 文案，邮箱 C-05 |
| T-01 Introduction；T-02 Leadership | T-01；T-02及领导表格。仅 PI 有照片，Jeff Wang 缺资料沿用设计说明，不补造 |
| T-03 Composition；T-04 Directory | T-03；T-04-01 至 T-04-09，保持成员源顺序 |
| T-05 Closing Footer | 设计 closing 文案，邮箱 C-05 |
| C-01 至 C-06 | 对应同编号：概览、四类对象、三类合作、学生申请、联系信息、沟通说明；子编号顺序不变 |
| C-07 Visuals；C-08 Closing Footer | C-06 沟通语境的设计补充；邮箱归 C-05，不创建 DOCX C-07/C-08 |

两份 DOCX 原文已结构化保留，不代表全部候选内容获准展示。设计独有内容按实际信息完成中文对齐，专名、指标、邮箱不推测。运行时中文不采用英文兜底。

## 交互状态

- 整页为 250ms ease-out 淡入淡出，无方向滑动；过渡期间忽略新导航，仅一个画面对辅助技术暴露。reduce 立即显示且不超过 100ms。
- 导航默认纸色、海军蓝字、青绿页码；当前深蓝栏、白字、青绿前导线。Hover 青绿字/浅冰底，当前栏 navy-2，350ms `cubic-bezier(.16,1,.3,1)`。左右键、Home、End 同步焦点与画面。
- 按钮 hover 小幅上移和填色强调，300ms 同曲线；focus-visible 3px cyan、72% opacity、offset 4px；pressed 回原位，120ms ease-out。
- E-Linus 四 slide 顺序：overview → profile → alerts → validation；默认 overview，与 PNG 一致。
- PDM 四 slide 顺序：frame-02（Fleet overview）→ frame-05（Degradation tracking）→ frame-08（Critical alert）→ frame-10（Maintenance decision）；默认第 2 张 frame-05，匹配 PNG 的降解追踪画面。HTML 默认首张不能覆盖 PNG。
- 两轮播独立支持前后按钮、左右键、水平拖动；说明、证据标签和进度同步，首尾边界禁用、不循环。采用交付 300–500ms 范围内的 400ms 平滑移动，reduce 即时。
- Team：all 9 人；graduate 为 T-04-01/02/03/07/08/09；candidate 为 T-04-04/05/06。aria-pressed 同步、180ms ease-out、不重排，reduce 即时。
- Advantages：A-04 至 A-08 独立支持 click/Enter/Space，aria-expanded 与内容同步，300ms 交付曲线，reduce 即时；PNG/HTML 的 A-04 展开不覆盖已批准默认全折叠。
- Research：关系卡静态，不制造图形切换器。Explore the Pillars 用无 URL 变化的滚动操作。
- reveal：14% 交叉阈值、底边 -7%、600ms opacity 与短纵向位移；reduce 立即显示。截图前滚动完成 reveal；源 CSS 的静态捕获强制 visible 不复制到最终行为。
- Contact 确认邮箱 chawjk@ukm.edu.my，地址 Institute of Visual Informatics, UKM, 43600 Bangi, Selangor, Malaysia。Profile 显示 UKMsarjana Academic Profile，目标按两份 DOCX 显式超链接 https://ukmsarjana.ukm.my/main/lihat_profil/SzAyNDQ3OA== 恢复；HTML 只有文本，DOCX 关系文件提供真实目标。无提交表单。

## 390px / 320px 推导规则

未交付移动 PSD 或中文 PNG；桌面按最终 1920px 画布核对，中文允许自然增高。源 HTML 高度与最终 PNG 不同，不能作为最终桌面高度 oracle。

- 使用 Arial 系统字体，不下载字体。核心颜色 navy #082956、navy-2 #0d3669、teal #009d92、cyan #28b4cc、green #48a947、ink #102b50、muted #526b7c、line #dae8e6、ice #f3f9f9、paper #fbfdfd、soft-green #f6fbf7。
- 980px 以下用 64px 顶栏和全屏菜单替代竖轨。默认关闭，250ms 交付曲线；七项导航和语言可达，Escape 关闭并回焦按钮，选择导航后关闭并切屏。
- 390px/320px 左右 20px 内容间距；Hero 文字在图前，卡片、技术条目、照片、成员、伙伴、指标、页脚单列；按钮换行。正文不截断、不为固定高度缩小。
- Research 关系 HEALTH → EDGE-AI → AGENT 纵排，说明紧随图片；场景映射按支柱顺序可读，不依赖横向表格。
- 轮播只内部横向拖动，控制和说明不出视口；截图保留原始比例及 UI 证据，不复制源移动 CSS 强制 4:3 的裁切。
- Contact 对象、合作方式、联系字段单列，邮箱和地址允许换行。两种移动宽度无页面横向滚动、遮挡或不可达操作。

## 验收与素材来源事实

已读取全部 04_Documentation 文本/CSV/JSON、七页 HTML，视觉核对七张预览和关系照片；检查实际 PSD/PNG 尺寸、PNG ICC 和 PSD 组。原包报告的 composite delta=0 属交付方证据，未冒称本票重新合成验证。HOME/Research 恢复 COPY 层隐藏，native PSD 仅为编辑补充。

22 个媒体包含 19 个独立文件和 3 张 Research 关系照片。三照片只存在于 FINAL PNG / PSD 的 R-06 APPROVED PIXELS；native research.psd 此处是旧关系图。已按 assets.json 零基矩形无缩放提取，右下坐标不包含，保留照片原圆角白色背景，无正文或标题。整页图、未用帧及旧 native 图不进入 public。

独立伙伴 Logo 没有交付，名称墙按 PNG 文字实现；除 PI 外没有成员照片，保持文字卡。本轮已授权媒体用于本地 V1；公开发布权利确认待办是来源事实，不增加本地审批门禁，不执行发布。
