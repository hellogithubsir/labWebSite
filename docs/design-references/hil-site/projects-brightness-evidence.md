# 项目页提示清理与图片调色验收

2026-09-16：本地完成，最终 `make check-release` 退出0，153项Playwright测试通过。未推送、未发布。

## 修改与原因

- 删除双语补充按钮、展开正文、状态及运行时supplementary字段，不将内容移入核心正文。删除可见图片说明及AI图片左边缘8px覆盖渐变，保留替代文本与内部示意属性。
- 6张solu_ban的深蓝压暗已合并进原文件，@2x也带相同处理；保险图自身偏灰。其他图片不是统一蒙版问题。
- 从原始@2x文件处理6横幅，从原始JPEG处理保险图。固定RGB偏置、增益、gamma与柔和高光压缩改善可见度，未生成式重画、裁切、锐化或重建文字。
- 7张正式WebP文件路径与尺寸保持，其余14张目录图片和8张精选截图不变。核心数据逐项比较，唯一移除的字段为supplementary；外层项目页与能力入口代码保持。

## 调色参数与限制

横幅RGB偏置 `[6,18,49]`，增益 `[2.652,2.55,2.448]`，gamma指数0.97，暗部保留 `[5,8,15]`，高光从220起柔和压缩；保险图围绕128中点应用增益 `[1.045,1.025,1.005]` 并增加2。统一编码WebP quality88。

[详细参数说明](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/color-adjustment.md) · [参数JSON](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/parameters.json) · [可复现脚本](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/adjust-colors.cjs)

[前后对照](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/before-after.png)：每行左旧右新，依次为办公、健身、绘画、门禁、游戏、销售、保险。主任务与独立只读审查均检查了对照，主体可见度改善，未见明显主要高光过曝、内容重画或错配。此处理不能恢复原文件未保存的信息，仍保留原有深色背景与分辨率限制。

## 图片缓存修复

实际检查发现旧优化请求仍为HIT，办公图响应的像素距离旧图约0.37、调色后约40，确认同路径缓存继续返回暗图。因此仅7张调色图片请求追加 `?tone=1`，磁盘路径不变。

Next默认本地优化规则不允许查询参数，故保留原无查询规则，额外仅允许指定目录的solu_ban1—6与what_right2使用精确 `?tone=1`；其他请求不扩大。实际7张响应均更接近调色后文件，非目标what_right1带同参数仍返回400。后续再次调色这些文件时需要更新该固定请求版本。

[服务响应验证](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/served-image-validation.log) · [验证脚本](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/check-served-images.cjs)

## 验证记录

环境：macOS arm64、Node26.0.0、Next16.2.1、Playwright1.63.0 Chromium，沿用现有依赖安装。

| 验证 | 结果 | 证据 |
| --- | --- | --- |
| 删除提示的公共边界RED | 旧页面面板存在时，补充按钮仍在，预期失败 | [red-qualified.log](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/red-qualified.log) |
| 项目目录聚焦测试 | 15项通过，双语21项遍历与五种宽度通过 | [focused.log](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/focused.log) |
| 核心内容及非目标图片保持 | 除supplementary外的42条双语数据完全一致，非目标媒体字节及外层代码一致 | [content-validation.log](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/content-validation.log) |
| 优化图片实际响应 | 7张新图通过，非目标参数请求保持拒绝 | [served-image-validation.log](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/served-image-validation.log) |
| 最终完整门禁 | 工程检查、护栏自测、健康响应及153项E2E通过，退出0 | [verified.log](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/verified.log) |

首次删除测试未等待过渡结束，可能把空DOM判为通过；已修正为先等待项目面板可见，再运行并取得真实RED。缓存检查发现旧图后中断旧候选的完整运行，修复后重新执行完整门禁；旧日志保留，不算最终通过证据。

```sh
make check-release PLAYWRIGHT_ARGS="--workers=4 --trace=on --output=/Users/qingsir/Project/labWebSite-evidence/projects-brightness/verified"
```

独立只读审查复核了提示移除、调色脚本与对照、缓存配置范围，未发现实际问题；未独立执行构建，执行结果来自上述本地门禁。当前证据针对网页呈现和交互，不验证项目商业或科研成果。

## 最终截图

| 宽度 | 中文 | 英文 |
| --- | --- | --- |
| 1920 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-zh-1920.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-en-1920.png) |
| 1440 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-zh-1440.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-en-1440.png) |
| 1024 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-zh-1024.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-en-1024.png) |
| 390 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-zh-390.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-en-390.png) |
| 320 | [中文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-zh-320.png) | [英文](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/projects-en-320.png) |

同目录verified/保存成功trace与分类截图，位于.next外，可跨构建保留。后续修改代码、素材或验证规则会使相应通过证据失效，需要重跑受影响验证。
