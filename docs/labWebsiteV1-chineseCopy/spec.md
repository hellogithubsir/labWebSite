# 中文文案与王泓清姓名修正

## Goal
落实用户确认清单：王泓清姓名正确，中文网页除专业术语、人名及专有名称外尽量使用中文。仅文案改动，英文版、图片Logo与既有交互保持。

## Requirements
1. 首页共享团队负责人中文名“王鸿清 Dr. Jeff Wang”改为“王泓清博士（Jeff Wang）”，九研究人员中中文 Wang Hongqing 改为“王泓清（Wang Hongqing）”；中文负责人“周俊杰 Dr. Chaw Jun Kit”改为“周俊杰博士（Chaw Jun Kit）”。不得改英文版本姓名，不翻译其他人员姓名，不重新判定学位、关系或职位。首页保持复用团队三人Chaw、Jeff、Wendy数据，Jeff邮箱仍hongqing.wang812@gmail.com。
2. 首页研究分类、研究页导航和分类、团队负责人研究方向中的中文可见 HEALTH / EDGE-AI / AGENT 分别改数字健康 / 边缘智能 / 智能体。研究三标题去英文前缀，分别为数字健康与医学影像分析、边缘智能与端侧视觉、多智能体系统与自然语言处理。内部稳定标识无需翻译，不能破坏定位、导航或分类。
3. 首页中文 HI Lab 改怡和实验室；B2B 与企业价值改企业应用价值；AI-RAG数字礼宾改基于检索增强生成（RAG）的数字礼宾，研究问题等通过AI-RAG技术改通过检索增强生成（RAG）技术，自然衔接原句。
4. 技术优势中文 Skill 改技能，用户可控的分层 AI 记忆改用户可控的分层人工智能记忆，设备端 Agent 与硬件协同改设备端智能体与硬件协同；B2B应用实践改企业应用实践。联系中文B2B产业基金改企业合作基金，AI-RAG智能体与数字礼宾改检索增强生成（RAG）智能体与数字礼宾，Q1论文改一区期刊论文，UKM校历改马来西亚国民大学校历，访问UKMsarjana主页改访问学术主页；中文课题负责人（PI）、首席技术官（CTO）分别去括号英文。保留原来事实与专业含义，不新增宣传或资格断言。
5. 全七中文画面检查同类非必要英文，优先自然中文。保留人名机构品牌产品名称Wendy Leong Pooi Yan、Mobiva、E-Linus、PDM Robot、Smart Grocer等；保留必要专业术语RAG、LLM、Mamba、Transformer、BERT、TRIZ、Python、API、AIoT、SCIE、Scopus等、邮箱网址期刊名、Logo与系统截图内英文和English语言入口。UKM/IVI机构缩写可作为专名保留；不把保留清单当成清除所有其他字母的正则授权。英文版全部文案不变，必须有基线对比证明，共享标签需按locale分流。
6. 唯一正式内容实现，不新增路由接口依赖或视觉重构。保护原工作区PIC及删除与未跟踪资料，不改原图或Logo、不覆盖PIC、不push不部署。原设计交付只读，本次用户文案纠正覆盖旧设计冲突，不改历史mission或冻结规格。
7. 更新README和docs/design-references/hil-site/chinese-copy/依据及证据索引，姓名依据明确为用户纠正，不伪称网络考证。文档描述当前事实并引用动态验收记录，不提前报通过也不把未来审查固定为待完成。七中文页×1920/390/320共21张完整截图检查布局，英文七页内容及关键行为回归；目标测试旧版red新版本green和完整make check-release日志退出码trace可定位。原始证据放外部或ignored，临时浏览器脚本用.txt防ESLint误扫。
8. 070独立worker实现，071reportOnly独立验证五断言，主任务在原工作区创建侧边栏可见只读审查任务；问题回实现分支修复并复用审查任务复审。最终全规格审查、独立证明及门禁齐备后完成。

## Environment and boundaries
基线main f8ff131168468cb6500b38fc6542af0911cb98cf。集成树/Users/qingsir/Project/labWebSite-chinese-copy，分支codex/chinese-copy-integration。原工作区/Users/qingsir/Project/labWebSite有用户删除和PIC及未跟踪资料，禁止恢复或提交。PS包/Users/qingsir/Project/labWebSite/Harmonizing-Intelligence-Lab-V1-Photoshop-Delivery只读。本地分支worktreecommit审查后ff合并已授权。英文保持指渲染文案及内容数据不变，不能用测试删预期来掩盖回归。

## Validation Plan
- VAL-301: 姓名与负责人一致, Behavior: 中文王泓清博士Jeff及研究卡王泓清WangHongqing正确Chaw中文博士格式首页三人共享数据姓名职位邮箱事实保持, Surface: ui, Evidence: 双语负责人和研究名单浏览器断言及共享源码差异。
- VAL-302: 七页中文自然化, Behavior: 全部确认清单逐项中文化没有遗漏非必要英文保留专名专业术语品牌图片与English入口, Surface: ui, Evidence: 七页中文完整可见文本审计和清单映射截图。
- VAL-303: 英文与交互不变, Behavior: 七英文页面文案相对基线不变语言切换分类锚点轮播筛选折叠导航等关键行为保持, Surface: business-flow, Evidence: 英文基线内容对比和完整E2E回归trace。
- VAL-304: 响应式与验证, Behavior: 七中文页三个宽度21组完整截图无截断溢出目标redgreen和完整makecheckrelease退出零, Surface: business-flow, Evidence: 21截图清单原始日志退出码及trace。
- VAL-305: 交付边界与依据, Behavior: README与用户纠名依据正确无新增接口依赖重复实现无原图片PIC用户文件历史mission变更不push部署, Surface: data, Evidence: Git差异及依据证据记录。

## Mission Handoff
- Suggested milestones: chinese-copy
- Granularity: 070实现及自验证，071独立证明，串行。
- Additional implementation notes: propose开启validators与review-gate、maxConcurrency1，skip-assertions原因记录为071覆盖五断言，保留scrutiny最终gate-command make check。070verification为make check-release。先检查src/content/hil-site和共享分类显示组件，英文数据只读。单票文本diff尽量不超过400行，需要拆票先报主任务，不绕过护栏。
