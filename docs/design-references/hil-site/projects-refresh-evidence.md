# 项目标签页改版验证（2026-09-15）

本地实现完成。最终 `make check-release` 退出 0，149 项 Playwright 测试全部通过；没有推送或发布。验证环境为 macOS arm64、Node 26.0.0、npm 11.12.1、Next.js 16.2.1、Playwright 1.63.0（Chromium）。本轮复用现有依赖安装，未重做 Node 24 干净安装验证。

## 交付与依据

- 用户确认的布局：导语 → 四类能力 → 两个精选系统 → 四类项目目录 → 联系合作；官网现有设计 token 和导航保持。
- 目录 21 项，中英各 9/4/5/3；AI 名称列表、边缘/数字产品图文轮播、数字化升级宽幅展示。独立状态、详情、键盘、鼠标与触摸操作可用。
- 13 张来源图按原组件对应关系复用，8 张独立生成的应用场景示意明确标注；低分辨率定制产品图限制在 479px 内显示。
- 来源与完整生成提示见[素材映射](project-directory-assets.md)。中文数字礼宾名称沿用当前官网的“检索增强生成（RAG）”口径；未核验指标仅在展开结果中保留限定。
- 用户原有 DOCX 和 transitionFollowup 等删除状态保持；参考包只读，未改动其他画面实现。

## 执行证据

证据根目录：`/Users/qingsir/Project/labWebSite-evidence/projects-refresh/`。截图与 trace 位于 `.next` 外，不会被下一次构建清理。

| 命令／检查 | 结果 | 证据 |
| --- | --- | --- |
| 新目录首次生产边界测试 | 预期失败：页面可访问，但 catalog-ai 不存在 | [red.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/red.log)，原 trace 位于仓库 output/projects-red |
| 新目录状态与边界测试 | 3 项通过；当时生成图未落库，因此不作为媒体验收 | [interaction.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/interaction.log) |
| 两个项目测试文件的聚焦验收 | 20 项通过，包含 21 项双语遍历与原轮播回归 | [focused.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/focused.log) |
| 命名例外自测 | 原规则拒绝指定 V4 来源；精确例外后正反例均通过 | [guard-red.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/guard-red.log)、[guard-green.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/guard-green.log) |
| ESLint 范围检查 | 素材来源目录被排除，正式组件、测试、配置仍受检 | [lint-boundary.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/lint-boundary.log) |
| 数据与图片尺寸检查 | 42 个双语项目映射、21 个唯一项目及全部实际尺寸通过 | [media-validation.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/media-validation.log) |
| 最终完整门禁 | ESLint、TypeScript、生产构建、护栏自测、健康响应、149 项 E2E 全部通过，退出 0 | [accepted.log](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/accepted.log)，成功 trace 在同级 accepted/ |

最终命令：

```sh
make check-release PLAYWRIGHT_ARGS="--workers=4 --trace=on --output=/Users/qingsir/Project/labWebSite-evidence/projects-refresh/accepted"
```

## 修复与独立审查

- 第一轮完整门禁发现 V4 来源文件触发版本命名规则；仅登记两条完整路径例外，并用 NUL 分隔读取 Git 中文文件名。自测仍拒绝 V5 和 src 下的同名文件。
- 第二轮发现 ESLint 扫描来源项目的旧 Bootstrap/jQuery；仅排除 `docs/reference/company-website-main_1/**`，不改来源代码，不减少正式代码检查。
- 全站中文回归发现参考原文 AI-RAG 与现有中文口径冲突；修正中文名称与替代文本后完整重跑通过。旧失败日志保留于 release.log、release-complete.log、release-final.log。
- 独立只读 agent 审查实现、双语编号顺序、来源图片映射、状态逻辑及测试覆盖，未发现实际问题；补充目视检查生成图和桌面/手机截图，以及精确命名例外，结论相同。
- 主任务对产品原图放大模糊进行了修复，并通过实际浏览器和最终截图复核。审查为本地静态与视觉审查，不代表外部 CI 或生产认证。

## 最终整页截图

| 宽度 | 中文 | 英文 |
| --- | --- | --- |
| 1920px | [桌面](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-zh-1920.png) | [桌面](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-en-1920.png) |
| 1024px | [中等宽度](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-zh-1024.png) | [中等宽度](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-en-1024.png) |
| 390px | [手机](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-zh-390.png) | [手机](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-en-390.png) |
| 320px | [窄屏手机](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-zh-320.png) | [窄屏手机](/Users/qingsir/Project/labWebSite-evidence/projects-refresh/projects-en-320.png) |

各分类截图与正常/减少动画、鼠标/触摸/键盘的 trace 保存在 accepted/。整页截图用于判断整体布局，元素截图可能捕获固定导航叠层，应结合整页与实际视口判断。

## 验证范围

本轮验证覆盖网页呈现与交互，不独立核实项目商业指标、科研成果或实际部署状态。生成图只表达应用场景。后续修改内容映射、组件、素材或交互后，需要重跑相应测试；上述通过结论适用于本轮最终实现。
