# 访客内容更新证据索引

2026-09-15。本轮依据[用户批准的内容清理规格](../../../labWebsiteV1-contentRefresh/spec.md)，覆盖旧设计稿冲突的内部编号展示要求；不改变七画面路由及交互。053 本地回归完成后的记录与最终独立验收分开记载，053 审查和 054 核验尚待完成。

## 已交付内容与来源

- 050：七画面双语清除内部编号、素材文件名、视频时间与制作说明；保留技术名称、数量及导航页码。内部定位标识仍供实现使用，不输出给访客。
- 051：九项伙伴顺序不变、十个本地官方 Logo、联合卡分列两机构品牌、桌面三列和移动单列。[逐品牌依据](partners-sources.md)说明 JPEG 原图及集团品牌对应，避免伪造透明底或联合品牌。
- 052：九位成员一句双语研究简介。[逐人依据](team-sources.md)记录 UKM / IVI 机构、合作者及研究主题的同名确认；研究简介无未确认项。现有学位分类保留，不能把论文发表时机构当作当前学籍证明。
- 原名录合作关系与现有成员身份来自用户资料，本轮网上来源只确认品牌身份及研究内容。未确认 Logo：无；未确认研究简介：无。非 PI 照片、中文/移动 PSD 仍非本轮交付。

## 本地验证与定位

持久证据根目录：[053 evidence](../../../labWebsiteV1-contentRefresh/missions/content-refresh-20260915/missions/evidence/053/)。目录受 mission 忽略规则保护，不提交大量图片或 trace；不使用会被构建清理的 `.next` 作为交付存储。

- `npm-ci.log`、`npm-ci.exit`：Node 24 干净安装及真实退出码；19 项依赖公告（3 low、5 moderate、10 high、1 critical），未升级依赖或执行 audit fix。
- `final-release.log`、`final-release.exit`：退出0、131/131通过；`make check-release` 串行工程检查、护栏自测、完整 Playwright；`final-playwright/` 保存成功 trace 与截图。
- `health.headers`、`health.json`、`health.exit`：生产服务器独立 curl；已确认 HTTP 200 与精确 `{"status":"ok"}`。
- `visitor-copy.spec.ts`：七画面 × 两语言 × 1920/390/320，共42组可见文案、语言、图像加载和水平溢出检查；各用例目录含全页 PNG 和 trace，`screenshots.json` 记录42张原图尺寸与路径，`inspection/` 为人工查看长图的分栏辅助图，`visual-check.json` 记录42组实际查看结果，均未见溢出、占位、半片或过渡残影。正常导航后等待过渡 idle 与移动菜单隐藏，再逐段显示 ScrollReveal，仅滚动可访问图像，保留项目轮播活动片完整对齐；回顶后等待品牌图解码与两帧绘制，避免移动截图偶发空白。
- 既有完整 E2E 覆盖导航与键盘焦点、语言保持、700/1500ms 动效、输入锁、减少动画、双轮播、团队筛选、独立折叠与联系操作；partners 与 team 测试覆盖具体品牌和人物文案。

## 审查与边界

050 的 F001/F002、051 的 F003 已修复并经原审查任务复审关闭；052 独立审查无发现。053 审查及 054 最终核验尚未完成，因此本文件不声明全部审查关闭。

本票仅修改现有 E2E、README 与本索引；无产品代码、路由、接口或依赖变更，无第二份页面实现。本轮未覆盖原工作区 PIC/PIC.zip、未修改 Photoshop 交付包、未恢复用户删除的旧计划或 DOCX；不 push、不部署、不声称远端 GitHub Actions、gitleaks 或 CodeQL 通过。
