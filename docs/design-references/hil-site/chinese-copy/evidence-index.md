# 中文文案与姓名修正

> **归档说明（2026-09-17）**：下方"验证入口"引用的 `evidence/070` 目录已在项目收尾清理中删除；mission 文本记录（reports、reviews、progress_log）仍保留。

## 依据及边界

本次中文姓名以用户明确纠正的“王泓清”为准，不是网络考证结论。负责人显示“王泓清博士（Jeff Wang）”，研究人员显示“王泓清（Wang Hongqing）”；保留原有两个区域角色、研究简介及 hongqing.wang812@gmail.com，不重新判定学位。周俊杰中文负责人名使用“周俊杰博士（Chaw Jun Kit）”。首页继续复用团队页三位负责人数据，其他人员姓名未翻译。

中文文案依据用户确认清单及[本次规格](../../../labWebsiteV1-chineseCopy/spec.md)；英文数据和文案保持。原设计冲突以本次用户纠正为准，历史规格及收据不改。图片、Logo、PIC 不在变更范围；不新增路由、接口、依赖，不推送或部署。

## 清单映射

| 区域 | 调整 |
| --- | --- |
| 首页研究分类 | 数字健康 / 边缘智能 / 智能体；标识仍为 health / edge / agent |
| 首页项目及伙伴 | 企业应用价值；基于检索增强生成（RAG）的实时虚拟形象一体化数字礼宾；怡和实验室 |
| 研究方向 | 分节目录、分类及关系标记中文化；三标题去英文前缀；问题与应用场景使用检索增强生成（RAG） |
| 技术优势 | 技能编译、分层人工智能记忆、设备端智能体、企业应用实践 |
| 团队 | 王泓清纠名、中文博士格式、课题负责人和首席技术官去括号缩写、研究方向中文化 |
| 联系合作 | 企业合作基金、检索增强生成（RAG）、一区期刊论文、马来西亚国民大学校历、访问学术主页 |
| 项目及合作伙伴 | 审计现有中文；产品及机构专名保持，无需改写 |

保留专业或专有名称：RAG、LLM、Mamba–Transformer、BERT、TRIZ、Python、API、AIoT、NCD、NAS、SAS、NVIDIA/DLI、SCIE、Scopus、IET Image Processing、UKM/IVI，以及人名、机构/产品/品牌名称、邮件网址、版权机构英文名和 English 入口。分类不再把 HEALTH / EDGE-AI / AGENT 作为中文展示文字。没有对所有拉丁字母执行批量删除。

## 验证入口

实现基线为 b3095dc6c91e7739b649bf4477d605e054ccaab3。证据根目录为：

`/Users/qingsir/Project/labWebSite-chinese-copy/docs/labWebsiteV1-chineseCopy/missions/chinese-copy-20260915/missions/evidence/070`

- `e2e/chinese-copy.spec.ts`：七页中文确认清单的独立字面预期，保留专业名称及 English 入口；文本仅归一大小写以适配原 CSS uppercase，中文及标点不放宽。
- team、team-alignment、research、advantages 既有测试更新中文预期，保留英文预期和交互要求。
- visitor-copy：中文七页 × 1920 / 390 / 320 共 21 张完整图片，逐区触发 ScrollReveal 并等待加载，回顶后截图；同时检查页面宽度溢出。
- 英文对比：从 git show 基线编译导出九组英文内容，与当前导出逐字比较；另以同视口的七页面完整可见正文对比验证共享组件显示。
- 完整 `make check-release`：工程检查、护栏自测、/healthz 及全部浏览器用例，成功 trace 保存于证据根目录。

## 实现验证结果

- Node 24 干净 `npm ci` 退出 0；依赖公告沿用基线，未升级依赖。
- `red-final.log` 与 `red-final/trace.zip` 所在用例目录记录旧生产版本对新中文清单失败，退出 1。初始试跑另保留 red、red-revealed 记录；随后消除了 CSS 大写对人名断言的干扰。
- 首次发布检查发现技术优势标题多一个空格，以及新测试未展开折叠内容便读取正文。修复空格并补齐测试交互，停止该未完成运行（退出 130，`release.log`）；没有作为通过证据。
- 最终 `make check-release PLAYWRIGHT_ARGS="--workers=4 --trace on --output=<证据根目录>/release-final"` 退出 0，138 / 138 测试通过。原始日志 `release-final.log`，完整 trace 与截图在 `release-final/`。
- `screenshots.json` 列出 21 张中文完整截图、原始尺寸及逐图查看结论；桌面与两种移动宽度均无横向溢出或异常裁切，长姓名与标题自然换行。
- `English-before.json` / `English-after.json` 与 `English-comparison.log`：七个英文页面正文逐字相同。`data-English-before.json` / `data-English-after.json` 与 `data-final.log`：九组英文内容导出完全相同。
- `Chinese-after.json` 包含七页中文正文（技术优势全部展开），`Chinese-Latin-audit.log` 记录保留的专业及专有名称。`known-run-exits.json` 汇总退出码；复现采集及导出脚本以 `.cjs.txt` 留存。

## 审查与最终结论

本文件记录实现及自验证；070 审查、071 独立断言与最终全规格结论以本次 [mission 收据和审查记录](../../../labWebsiteV1-chineseCopy/missions/chinese-copy-20260915/missions/)为准，不将实现测试等同于独立审查。
