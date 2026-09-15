# 03 纵向展示与写实配图记录

2026-09-16，按用户确认的纵向效果图实施。保持四类21项及中英核心文案，18张图片重新生成，3张清晰原图保留。

## 图片保留与重做

- 8张概念图全部改为摄影质感场景，去掉微缩模型、悬浮图层和统一蓝绿色滤镜。
- 6张旧横幅、保险图、RiceUp图和两张管理系统图在新展示尺寸下细节不足，根据项目说明及原图重做。
- Merace、社交电商、活动交友原图在约480px以内仍清晰，继续使用what_right1/3/4.webp，未因风格统一而重画。
- 首批样张为办公助手、生鲜识别、仓库管理；内部查看通过后制作其余图片。所有生成图为1536×1024，正式编码WebP quality88。
- 使用内置图像工具；生成图是写实概念配图，内部记录和中英文替代文本保留此属性，页面不添加图注，也不把图像描述为真实客户现场或交付截图。

| 项目编号 | 正式图片 | 原图参考 |
| --- | --- | --- |
| P-03 | civic-service-photo.webp | 按项目描述生成新场景 |
| P-06 | energy-monitoring-photo.webp | 按项目描述生成新场景 |
| P-07-01 | clinical-research-photo.webp | 按项目描述生成新场景 |
| P-07-02 | elder-care-photo.webp | 按项目描述生成新场景 |
| P-07-04 | scam-analysis-photo.webp | 按项目描述生成新场景 |
| P-07-05 | office-assistant-photo.webp | solu_ban1.png |
| P-07-06 | fitness-coach-photo.webp | solu_ban2.png |
| P-07-07 | art-creation-photo.webp | solu_ban3.png |
| P-07-10 | sales-workflow-photo.webp | solu_ban6.png |
| P-05 | produce-scale-photo.webp | 按项目描述生成新场景 |
| P-07-03 | agriculture-drone-photo.webp | 按项目描述生成新场景 |
| P-07-08 | access-control-photo.webp | solu_ban4.png |
| P-07-09 | game-guide-photo.webp | solu_ban5.png |
| P-07-12 | insurance-service-photo.webp | what_right2.jpg |
| P-07-15 | food-delivery-photo.webp | what_right5.jpg |
| P-04 | address-mapping-photo.webp | 按项目描述生成新场景 |
| P-07-16 | marketing-dashboard-photo.webp | inf_banner.jpg |
| P-07-17 | warehouse-system-photo.webp | inf_right.jpg |

正式资源位于public/images/hil-site/projects/catalog/。旧18张正式图已保存在外部证据media-before/catalog/后退出public，参考来源目录不修改；当前每项目仅一个正式入口。新语义路径避免旧图缓存，全部旧tone参数入口已退休，Next图片配置恢复默认。

## 图像审查

主任务查看三张样张、全套18张联系表，另放大养老、数字礼宾、无人机等场景；独立只读审查查看全套及能耗、养老、销售原图，未发现明显人物、设备结构错误或新增成果承诺。界面少量文字是概念表达，正式功能说明以网页正文为准。

[18张新图概览](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/new-images.png) · [三张样图前后对照（左旧右新）](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/pilot-before-after.png)

## 完整生成记录

[生成清单](/Users/qingsir/Project/labWebSite-evidence/projects-vertical/generated-manifest.json)包含每张图片的完整prompt、reference、原始输出路径、正式输出路径、尺寸与项目编号。原始PNG保留在工具返回的生成目录。

## 本轮验证

[纵向改版验证记录](projects-vertical-evidence.md)保存最终命令、截图和交互复核。
