# 合作伙伴官方品牌来源

> **归档说明（2026-09-17）**：下方引用的 mission `evidence/051` 已在项目收尾清理中删除；描述保留为历史记录。

核对日期：2026-09-15。九项名称及顺序来自原交付名录；以下来源确认品牌身份，不独立证明当前合作关系。十个图像全部保存于 public/images/hil-site/partners/，页面不热链、不展示取证信息。未确认 Logo：无。

## 映射及显示

| 文件 | 对应名录／品牌 | 格式与处理 |
| --- | --- | --- |
| advantech.svg | Advantech | 官方 SVG，仅合并换行 |
| hilti.svg | HILTI Asia IT Services／HILTI | 官方集团 SVG，仅合并换行 |
| tokio-marine.png | Tokio Marine & Dynafront／Tokio Marine Group | 官方 PNG，480×270 |
| dynafront.jpg | 同卡 Dynafront | 官网裁切资源，实际 JPEG，506×124 |
| xmum.png | 厦门大学马来西亚分校 | 官方白色 PNG，1359×281，深色底承托 |
| leeds-beckett.svg | Leeds Beckett University | 官方 SVG，仅合并换行 |
| three-opp.jpg | Three-Opp (M) Sdn. Bhd. | 官方 JPEG，170×79，不伪造透明底 |
| uniten.png | Universiti Tenaga Nasional | 官方 PNG，3508×2480 |
| ajiya.png | Asia Roofing Industry／AJIYA | 官方 PNG，340×100；官网集团页确认 Asia Roofing Industries Sdn Bhd 属 Ajiya Metal Group，以 AJIYA 品牌经营；保留交付卡片名称 |
| mobiva.png | Mobiva | 官方 PNG，132×35，显示不超过原宽 |

保持品牌原色及原比例，不重绘、合成联合品牌或移除图像原始留白。九卡桌面三列、移动单列；联合卡保留两个独立 Logo。页面使用本地未优化原图，避免 SVG 与小标志被不必要地转换。

## 官方页面与原图

Preserve supplied partner names and order. Official brand research does not independently prove current lab partnership.
- Advantech: https://us2.advantech.com/dms/ references CSS https://advcloudfiles.advantech.com/web/css/common.css ; asset https://advcloudfiles.advantech.com/web/css/css-img/advantech-logo.svg
- HILTI Asia IT Services identity https://careers.hilti.group/en-gb/where-we-are/kuala-lumpur-malaysia/ ; group brand asset https://www.hilti.group/etc.clientlibs/hilti/clientlibs/resources/assets/images/logo_2016_sRGB.svg
- Tokio Marine Group media kit https://www.tokiomarinehd.com/en/newsroom/mediakit/ ; asset https://www.tokiomarinehd.com/en/newsroom/mediakit/images/logo-tmgroup-en.png
- Dynafront https://www.dynafront.com/ ; actual cropped official srcset https://static.wixstatic.com/media/5ea4e5_63cdd6dedb90428e9fd43258fba35b16~mv2.jpg/v1/crop/x_0,y_1294,w_3530,h_871/fill/w_506,h_124,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Logo01.jpg ; verify actual format (may AVIF despite JPG suffix). Do not use uncropped blank original. Keep two separate logos within Tokio Marine & Dynafront card.
- XMUM https://www.xmu.edu.my/ ; asset https://www.xmu.edu.my/sites/default/files/Logo-Xmum-White.png ; white mark needs dark panel.
- Leeds Beckett https://www.leedsbeckett.ac.uk/ ; asset https://www.leedsbeckett.ac.uk/-/media/images/global-asset-bank/logos/gaa-lbu-logo-transcript.svg
- Three-Opp https://www.3opp.com.my/corporate-overview.php ; asset https://www.3opp.com.my/imges/logo.jpg (imges correct spelling).
- UNITEN https://www.uniten.edu.my/ ; asset https://www.uniten.edu.my/media/hj4iy4ln/universiti_tenaga_nasional_logo.png ; alternative https://www.uniten.edu.my/media/1q1gk1ip/logo-light-uniten.png
- Asia Roofing Industry https://ajiya.com/company-group/ confirms Asia Roofing Industries Sdn Bhd under Ajiya Metal Group, manufacturing under AJIYA brand; use https://ajiya.com/wp-content/uploads/2021/07/Rectangle-1@2x.png with original card name and document group-brand mapping, not new independent partner. Normal Mozilla/5.0 UA resolves 403.
- Mobiva https://mobiva.net/about-us/ confirms Kuala Lumpur, https://mobiva.net/ ; asset https://mobiva.net/wp-content/uploads/2021/03/mobiva-logo-top.png (113x100); alternative https://mobiva.net/wp-content/uploads/2019/05/mobiva_logo_sticky.png (132x35). Do not upscale excessively.

Download and inspect actual pixels/MIME before importing. Prefer original formats; JPEG official marks may be retained rather than invent transparency. No recoloring/redrawing logos.

## 验证入口
- e2e/partners.spec.ts：两语言 × 1920/390/320；九卡名称顺序、十图品牌顺序与本地加载、联合双图、原比例、三列/单列、无溢出及联系跳转。
- 本轮 mission evidence/051 保存 red.log、final.log、check.log 与六张响应式全页截图及 trace。截图保持正常滚动显示后的稳定状态。
