# 03 纵向展示与写实配图验收

2026-09-16：本地实现完成，最终 `make check-release` 退出0，161项Playwright测试全部通过。未推送、未发布。

## 交付

- 四类21项统一纵向顺序：分类说明、轻量项目选择、居中标题用途、图片、前后按钮页码、数字化功能词、680px两段正文。白色与浅冰蓝交替，取消左右分栏和AI深色框。
- 四类使用原生横向滚动停靠，鼠标达到方向阈值后直接跟手，触摸与触控板使用浏览器原生行为。停靠同步文字，连续/反向选择不中断输入，尺寸变化保持项目对齐，减少动画下立即定位。
- 重做18张写实概念配图，保留3张清晰原图；使用新的稳定语义路径。原18张已保存在外部证据后退出public，旧tone请求不再使用，Next图片配置恢复默认。
- 42条双语核心记录除image字段外与本轮基线完全一致；01、02及精选轮播代码保持。未恢复补充信息、图片图注或压暗覆盖层。

素材决策、原图参考、完整提示词、尺寸与新文件对应见[写实配图记录](projects-photo-assets.md)。新图为生成的摄影质感概念图，不表示真实客户现场或部署证据。

## 验证过程与修复

| 检查 | 结果 | 证据 |
| --- | --- | --- |
| 纵向阅读顺序RED | 旧页面能访问，图片仍与文字并排，按预期失败 | [red.log](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/red.log) |
| 第一轮交互 | 16项通过、1项跟手拖动失败，保留失败trace | [interaction.log](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/interaction.log) |
| 新图与修复后聚焦测试 | 26项全部通过 | [focused.log](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/focused.log) |
| 文案与范围对比 | 42条核心记录、3张保留图、外层项目页与精选轮播不变 | [content-validation.log](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/content-validation.log) |
| 完整门禁 | 护栏、ESLint、TypeScript、生产构建、护栏自测、健康响应及161项E2E全部通过，退出0 | [accepted.log](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/accepted.log) |

跟手失败根因是首次懒加载时画廊高度为0，按下坐标落在画廊之外。按素材比例预留画廊高度后消除跳变，鼠标和触摸回归通过；没有放松跟手断言或改变失败测试坐标。测试拖动以超过半幅后的原生停靠为准，替换了旧35px阈值切换契约。

测试覆盖五种宽度双语、21项对应、默认两段正文、纵向几何顺序、控件与功能位置、图片完整加载、无图注/补充信息、四类拖动中scrollLeft随手移动、停靠与页码同步、连续选择和反向输入、尺寸变化与手机选中名称可见、语言保持及离页重置，并保留原精选轮播和全站回归。

```sh
make check-release PLAYWRIGHT_ARGS="--workers=4 --trace=on --output=/Users/qingsir/Project/labWebSite-evidence/projects-vertical/accepted"
```

环境：macOS arm64、Node26.0.0、Next16.2.1、Playwright1.63.0 Chromium，沿用现有依赖。截图与成功trace在.next外保留；本轮没有重做Node24干净安装或生产部署验收。

## 独立审查

独立只读agent审查索引/目标状态、滚动停靠、观察器清理、双语及范围，查看18张联系表，并放大能耗、养老、销售图片，未发现明显人物/设备错误或新增成果承诺。随后查看1920px中文AI及390px中文数字化升级的最终新图页面截图，确认新素材与纵向布局同时生效，无明显错配、拉伸或溢出。主任务另查看三个首批样张、养老/数字礼宾/无人机原尺寸图及实际页面截图。

审查未独立运行浏览器测试；执行结果来自上述生产模式本地门禁。生成图中的简洁界面用于概念表达，正式功能含义由网页正文提供。

## 最终截图与素材对照

| 宽度 | 中文 | 英文 |
| --- | --- | --- |
| 1920 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-zh-1920.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-en-1920.png) |
| 1440 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-zh-1440.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-en-1440.png) |
| 1024 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-zh-1024.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-en-1024.png) |
| 390 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-zh-390.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-en-390.png) |
| 320 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-zh-320.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/projects-en-320.png) |

[AI分类近景](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/ai-zh-1920.png) · [边缘智能近景](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/edge-zh-1920.png) · [数字产品近景](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/products-zh-1920.png) · [数字化近景](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/digital-zh-1920.png)

[三类样图前后对照（左旧右新）](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/pilot-before-after.png) · [18张新配图概览](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/new-images.png)

后续相关实现、素材或契约变更后，应重跑受影响验证。原始参考资料保持只读，已有删除状态保留。
