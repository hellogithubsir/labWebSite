# 03 项目案例阅读优化验证

2026-09-15：按用户批准的图文阅读优化计划完成。本轮只调整 03 的组件、样式和本地双语数据；最终 `make check-release` 退出 0，152 项 E2E 全部通过。

## 阅读方式

- 21 项均直接显示完整标题、用途和两段核心介绍，用两个重点短语帮助扫读。选择器采用简短名称，正文保留完整名称。
- AI 在 981px 起使用深蓝融合区域，1440px 起选择器位于右侧；更窄时选择器在上方，手机改为先文后图。
- 边缘智能和数字产品采用顶部对齐的左文右图，桌面控件位于正文后约20px，手机移至图片后。原定制产品图片最大479px。
- 数字化升级采用功能清单、完整系统画面和短文，手机依次显示标题、功能、图片、正文。
- 移除四字段详情；量化结果、资助、论文与验证限制进入补充信息，保留原限定。数据接口允许缺省补充内容；目前21项原文均有符合条件的信息，所以均提供补充入口，但理解项目无需展开。
- 原始全文仍在只读参考HTML；本轮未生成、替换或新增图片。

## 边界保持

已直接比较本轮开始时的文件内容：ProjectsOverview、ProjectsScreen、ProjectCarousel、ProjectsScreen.module.css及projects.ts均未变化。类别description保持原值，01继续消费同一分类说明；全站导航、精选轮播、联系入口与所有媒体保持上一轮实现。

比较结果：[scope-validation.log](/Users/qingsir/Project/labWebSite-evidence/projects-reading/scope-validation.log)。现有删除状态保留，没有推送或发布。

## 验证证据

环境：macOS arm64、Node 26.0.0、Next.js 16.2.1、Playwright 1.63.0 Chromium，复用现有依赖安装。证据目录独立于 `.next`，后续构建不会清理。

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 核心介绍默认可见的生产边界RED | 旧页面可达，因缺少默认用途与正文而失败 | [red.log](/Users/qingsir/Project/labWebSite-evidence/projects-reading/red.log)，同级red/含trace |
| 两个项目测试文件聚焦运行 | 23项通过，五种宽度双语、21项遍历与精选轮播回归通过 | [focused.log](/Users/qingsir/Project/labWebSite-evidence/projects-reading/focused.log) |
| 最终完整门禁 | 命名护栏、ESLint、类型检查、生产构建、护栏自测、健康响应及152项E2E全部通过，退出0 | [accepted.log](/Users/qingsir/Project/labWebSite-evidence/projects-reading/accepted.log)，同级accepted/含成功trace |

最终命令：

```sh
make check-release PLAYWRIGHT_ARGS="--workers=4 --trace=on --output=/Users/qingsir/Project/labWebSite-evidence/projects-reading/accepted"
```

新增与更新断言覆盖：无需展开的用途和两段正文、2—3个高亮片段、正文无未核验百分比、旧四字段移除、短名称与稳定编号映射、补充展开及重置、语言保持、21项图片加载、键盘/鼠标/触摸、图文相对坐标、控件与正文间距、深色正文至少4.5:1对比度、手机阅读顺序和无横向溢出。旧测试的四字段契约按用户新需求替换；原精选轮播与全站回归断言保留。

## 独立审查与视觉复核

独立只读agent逐项审查双语文案与参考内容、状态逻辑和布局，查看AI桌面/中等宽度及数字化升级手机截图，未发现实质新增承诺、内容失真、裁切或溢出。未独立执行构建，执行证据由主任务生产测试提供。

主任务查看三种布局截图后修正了图文轮播的网格行高分配：原图跨行导致控件远离正文，改为首行随文案、次行吸收余量；新增间距断言并在最终完整门禁中通过。最终产品截图已复核。

## 最终截图

| 宽度 | 中文 | 英文 |
| --- | --- | --- |
| 1920px | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-zh-1920.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-en-1920.png) |
| 1440px | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-zh-1440.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-en-1440.png) |
| 1024px | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-zh-1024.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-en-1024.png) |
| 390px | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-zh-390.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-en-390.png) |
| 320px | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-zh-320.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-reading/projects-en-320.png) |

分类近景：[AI](/Users/qingsir/Project/labWebSite-evidence/projects-reading/ai-zh-1920.png)、[边缘智能](/Users/qingsir/Project/labWebSite-evidence/projects-reading/edge-zh-1920.png)、[数字产品](/Users/qingsir/Project/labWebSite-evidence/projects-reading/products-zh-1920.png)、[数字化升级](/Users/qingsir/Project/labWebSite-evidence/projects-reading/digital-zh-1920.png)。元素截图可能包含捕获时的固定导航叠层，整体布局以整页截图和实际浏览器为准。

本轮证据验证网页阅读呈现与交互，不独立核实科研或商业结果，也不替代生产部署验收。后续修改相关内容、样式或交互后，应重跑受影响验证。
