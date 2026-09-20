# Contact 交付与验证

> **归档说明（2026-09-17）**：下方"验证证据"一节引用的 `evidence/028/` 已在项目收尾清理中删除；描述保留为历史记录。

## 设计来源

- 权威画面：`07-CONTACT-V1-FINAL-sRGB.png`，1920 × 6076；读取只读交付包，不将整页图接入运行时。
- C-01：紧凑品牌头部、Contact 标题、合作引言。C-02：四类对象的两列卡片，保留方向编号、前提和业务边界。
- C-03：按最终 PNG 呈现三列开放布局，保留适用场景、双方投入、确认流程和说明。源 HTML 的三张封闭卡片不是最终视觉权威。
- C-04：申请材料、方向、招募状态，邮件主题补自同编号 DOCX。C-05：公开联系人、邮箱、地点及学术主页。C-06：首次沟通材料、响应范围与时间说明。
- C-07：复用 `shared/lab-vision.png` 与 `shared/lab-prototype.png`；C-08：复用唯一 SiteFooter。
- 中文由 `bilingual-source.json` C-01–C-06 对应条目承接；导航和品牌复用 sharedContent。源 HTML 的“follow the English content package”是维护说明，未展示于产品；业务说明完整保留。
- 标题 44px、区块标题 42px、正文 14–24px，依最终 PNG 层级对齐；390px/320px 重排单列，正文 16px、标题 32px，允许中文增长。

## 行为

邮箱保持 `mailto:chawjk@ukm.edu.my`；UKMsarjana 使用 DOCX 显式超链接关系恢复的 `https://ukmsarjana.ukm.my/main/lihat_profil/SzAyNDQ3OA==`，新窗口打开。两个正文联系操作都有 44px 最小高度及 3px 可见焦点。页脚标题直接聚焦并居中滚动到本页公开邮箱，保持当前语言和 `/` 地址。

## 验证证据

持久证据根目录：`docs/labWebsiteV1/missions/labwebsitev1-ps-20260907/missions/evidence/028/`。

- 红测：`contact screen 1920 English` 在正式 Contact 实现前因合作对象计数 0 ≠ 4 失败，退出 1；trace 位于 `/tmp/hil-contact-red/`。
- 首轮 Contact、navigation、locale 选择共 21 项；20 项通过，桌面中文截图准备停在 reveal 排除区导致 1 项失败。已改为居中滚动；未降低可见性断言。
- 最终 Contact 六项在 `final/` 记录中英 1920px、390px、320px 全页 PNG 与 trace。断言内容、业务边界、媒体加载、无横向溢出、邮件/外链目标、Tab 焦点、Enter 激活、页脚回到邮箱和 URL 不变。
- 邮件激活由测试捕获导航意图并阻止系统邮件客户端；学术主页由浏览器拦截返回空响应并验证新窗口 URL，不发送邮件、不依赖外站内容。
- `npm run lint && npm run typecheck` 退出 0；最终 E2E 自动完成生产构建。未变更工程约束、依赖或验证入口。
- 最终结果：`npm run test:e2e -- --grep "contact screen" --trace on --output="…/evidence/028/final"`，6/6 通过，退出 0。已目视核对六种布局及移动联系信息局部，原图层级、分组、色带、两图和页脚完整。
