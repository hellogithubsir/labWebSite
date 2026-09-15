# 项目目录内容与素材映射

2026-09-16：后续纵向改版已重新生成18张写实配图并保留3张原图；当前素材以[写实配图记录](projects-photo-assets.md)为准。以下为前期来源及调色历史，已退休文件不再从public提供。

## 最新状态：提示清理与调色

项目页已移除可见图片说明和补充信息，内部来源、原文及图片示意属性仍保留。下面的旧映射记录用于来源追踪。

六张横幅改用对应的只读 @2x 源（办公、健身、绘画、门禁、游戏、AI销售）缩放至原尺寸后进行RGB调色，保险图使用what_right2.jpg轻度去灰。正式文件名与尺寸不变，其余图片不变。固定请求版本仅用于绕过这七张图的旧优化缓存。

参数及复现脚本：[调色说明](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/color-adjustment.md)、[参数JSON](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/parameters.json)、[确定性脚本](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/adjust-colors.cjs)。[前后对照](/Users/qingsir/Project/labWebSite-evidence/projects-brightness/before-after.png)每行左旧右新。

## 内容依据

- 内容依据：`docs/reference/实验室官网线框预览V4（中文版·语言统一版）.html` 与对应 English·Language-aligned HTML 的 P-02、P-07。
- 顺序与编号保持原文：人工智能解决方案 9 项、边缘智能 4 项、定制数字产品 5 项、数字化升级 3 项。
- 阅读优化后，运行时使用短名称、用途、两段核心介绍、重点短语、功能清单及可选补充信息；原始 S/T/A/R 完整文字保存在上述只读参考 HTML。
- 核心介绍直接展示，内容从任务、行动和应用价值提炼；未核验百分比仅留在补充信息，保留统计口径等限定。本轮未新增或更换图片。
- 页面不输出资料来源名称、引用链接、源文件路径或编辑说明。公司／团队展示不构成个人独立成果证明；来源 HTML 中的版权与独立验收状态仍待确认。

## 图片对应

来源根目录：`docs/reference/company-website-main_1/src/images/`。通过 AISolution.vue、CustomizedSoftware.vue、InformatizationUpgrade.vue 的内容块和实际图片引用核对。13 张图片转为 quality 88 WebP，未改变构图、未放大，输出位于 `public/images/hil-site/projects/catalog/`。

| 编号    | 项目                                           | 来源／正式文件                                         | 尺寸        |
| ------- | ---------------------------------------------- | ------------------------------------------------------ | ----------- |
| P-03    | 基于 AI-RAG 的实时数字人一体化数字礼宾系统     | `civic-concierge.webp`（应用场景示意，主任务生成）     | 1536 × 1024 |
| P-06    | 面向预测性维护的能源消耗预测                   | `energy-prediction.webp`（应用场景示意，主任务生成）   | 1536 × 1024 |
| P-07-01 | 基于不平衡序列数据的非传染性疾病早期预测       | `health-prediction.webp`（应用场景示意，主任务生成）   | 1536 × 1024 |
| P-07-02 | 面向老年心理健康监测的面部表情识别             | `elderly-emotion.webp`（应用场景示意，主任务生成）     | 1536 × 1024 |
| P-07-04 | 融合网络爬取与大语言模型的诈骗监测模型         | `fraud-monitoring.webp`（应用场景示意，主任务生成）    | 1536 × 1024 |
| P-07-05 | 钉钉 AI 办公助手                               | `solu_ban1.png` → `solu_ban1.webp`                     | 1246 × 490  |
| P-07-06 | AI 智能健身助手                                | `solu_ban2.png` → `solu_ban2.webp`                     | 1246 × 490  |
| P-07-07 | AI 艺术图像生成平台                            | `solu_ban3.png` → `solu_ban3.webp`                     | 1246 × 490  |
| P-07-10 | TikTok AI 自动化获客与销售系统                 | `solu_ban6.png` → `solu_ban6.webp`                     | 1246 × 490  |
| P-05    | 智慧零售：边缘人工智能生鲜识别系统             | `produce-recognition.webp`（应用场景示意，主任务生成） | 1536 × 1024 |
| P-07-03 | 面向农业 4.0、具备无线充电能力的自主无人机测绘 | `drone-mapping.webp`（应用场景示意，主任务生成）       | 1536 × 1024 |
| P-07-08 | AI 人脸识别门禁系统                            | `solu_ban4.png` → `solu_ban4.webp`                     | 1246 × 490  |
| P-07-09 | GTorque 游戏攻略助手                           | `solu_ban5.png` → `solu_ban5.webp`                     | 1246 × 490  |
| P-07-11 | Merace 元宇宙游戏平台                          | `what_right1.jpg` → `what_right1.webp`                 | 479 × 460   |
| P-07-12 | 保险业务智能服务与在线理赔平台                 | `what_right2.jpg` → `what_right2.webp`                 | 479 × 460   |
| P-07-13 | AI 社交电商 App                                | `what_right3.jpg` → `what_right3.webp`                 | 479 × 460   |
| P-07-14 | O2O 智能匹配与活动交友平台                     | `what_right4.jpg` → `what_right4.webp`                 | 479 × 460   |
| P-07-15 | RiceUp 本地餐饮外卖平台                        | `what_right5.jpg` → `what_right5.webp`                 | 479 × 460   |
| P-04    | 国家地址系统（NAS）的技术与运营设计            | `national-address.webp`（应用场景示意，主任务生成）    | 1536 × 1024 |
| P-07-16 | 美赞臣营销管理系统                             | `inf_banner.jpg` → `inf_banner.webp`                   | 765 × 392   |
| P-07-17 | 定制仓库管理系统（WMS）                        | `inf_right.jpg` → `inf_right.webp`                     | 737 × 363   |

## 视觉检查与使用边界

- 已检查 13 张来源图的缩略联系表：6 张 AI 横幅自带深蓝遮罩，保留原始处理；5 张产品图为 479 × 460，保持完整图片且避免当作可读系统界面放大。
- 原定制软件第 2 项标题为 Graphics diffusion，但正文为保险平台；遵循 V4 HTML 的正文含义命名，图片仍使用原第 2 项的 what_right2。
- 原数字化升级第 2 张为 WMS，不将其归为美赞臣项目。
- O2O 释义差异与 WMS 轮播客户名的编辑提示仅在来源保留，不进入访客文案；统计定义与缺少验证证据的限定仍保留。
- 其余 8 项在正式资源中未发现可证实的同项目图片；分别生成与各项目对应的应用场景示意，并明确 illustrative 标识。它不作为真实系统截图、客户现场或交付证明。

## 生成图片记录

2026-09-15 使用用户接受的内置图像工具；工具未声明可选择型号，因此不标记为 GPT Image 2.5。八张图均为 1536×1024，转为 WebP quality 88，逐张场景检查通过；联系表保存于外部验证目录。以下为完整公共提示词模板，将 [SUBJECT] 替换为各项对应提示。

```text
Create one landscape 3:2 application-scenario illustration for an academic AI laboratory website, ideally 1536x1024. [SUBJECT] Consistent editorial technical illustration style: refined soft 3D objects blended with precise flat line diagrams, very pale ice-blue background, navy outlines, restrained teal and sage accents, ample empty margins, polished and credible. Single coherent scene, no dashboard screenshot, no branding, no performance numbers, no watermarks, no readable text, no title. Must look like a conceptual illustration rather than evidence of real deployed software. Output one image.
```

### civic-concierge

A civic service kiosk with an abstract friendly digital concierge avatar, three connected local knowledge document cards and an unobtrusive civic building silhouette. No logos, no words.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-7b98bd03-c69d-4bd6-a06a-ef015b6b042b.png`。正式文件：`public/images/hil-site/projects/catalog/civic-concierge.webp`。

### energy-prediction

Industrial factory equipment and a power meter linked to a simple energy demand time series, with a subtle future forecast segment. No numbers, no words.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-b935dcfa-5281-4324-8f45-a9b04a65dd5d.png`。正式文件：`public/images/hil-site/projects/catalog/energy-prediction.webp`。

### health-prediction

Medical researcher analyzing longitudinal health records, anonymized abstract patient cards and a calm predictive curve, no clinical diagnosis or numeric claims.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-da931b2c-35ae-4d34-b195-38816a134313.png`。正式文件：`public/images/hil-site/projects/catalog/health-prediction.webp`。

### elderly-emotion

An older adult in a comfortable living room, discreet non-contact camera and abstract facial landmark diagram alongside a caregiver's tablet. Respectful calm tone, no biometric labels or actual patient details.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-d2ba0fc9-cdd6-4fb1-acfc-b60c773c48bb.png`。正式文件：`public/images/hil-site/projects/catalog/elderly-emotion.webp`。

### fraud-monitoring

A cybersecurity research workspace analyzing suspicious message cards and image authenticity with linked text and image analysis nodes, a magnifying lens and shield. No real messages, brands or text.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-e6ae2e4c-11aa-4777-a8cf-17f387e17d96.png`。正式文件：`public/images/hil-site/projects/catalog/fraud-monitoring.webp`。

### produce-recognition

Fresh apples, pears and vegetables on a smart grocery weighing scale, small edge vision camera above, subtle bounding boxes around fruit. No numbers or text.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-d69052fa-f78b-4740-905c-f62adaad4fed.png`。正式文件：`public/images/hil-site/projects/catalog/produce-recognition.webp`。

### drone-mapping

Autonomous agricultural survey drone above patterned plantation rows, small wireless charging landing pad, and translucent stitched aerial map panel. No text.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-250ac30d-1fb1-497b-b37a-2160b9603452.png`。正式文件：`public/images/hil-site/projects/catalog/drone-mapping.webp`。

### national-address

An isometric city neighborhood connected with address location pins, roads and a structured geospatial map panel, illustrating national address infrastructure design. No text.

原始输出：`/Users/qingsir/.codex/generated_images/01a0a4cb-a588-7dd0-af0d-ce1c23c41202/exec-3ed00f49-fdbd-4b03-bb2a-0558ae06f923.png`。正式文件：`public/images/hil-site/projects/catalog/national-address.webp`。
