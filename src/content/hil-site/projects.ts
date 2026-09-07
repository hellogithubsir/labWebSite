import type { Localized } from "./types";

export interface ProjectSlide { category: string; title: string; body: string; file: string; width: number; height: number; alt: string; proofs: string[]; }
export interface CarouselLabels { previous: string; next: string; drag: string; source: string; }
interface ProjectsContent { lead: string; selected: string; overview: string; intro: string; systems: string[][]; elinusTitle: string; elinusIntro: string; categories: string[]; slides: ProjectSlide[]; labels: CarouselLabels; pdmTitle: string; pdmIntro: string; pdmCategories: string[]; pdmSlides: ProjectSlide[]; pdmLabels: CarouselLabels; footerTitle: string; footerBody: string; }
// P-01 至 P-04：最终 PNG 与交付 HTML；中文逐项对齐设计独有文案。
export const projectsContent = {
  "en": {
    "lead": "Two independent systems show how HI Lab turns sensing, prediction and explainability into operational intelligence for senior care and industrial maintenance.",
    "selected": "Selected projects",
    "overview": "Two systems, two routes to deployment",
    "intro": "Each case is organized as a guided horizontal story: one large interface capture, one concise explanation and four evidence-led categories.",
    "systems": [["Care Intelligence", "From ambient sensing to trusted care alerts."], ["Industrial AI", "From asset telemetry to maintenance action."]],
    "elinusTitle": "E-Linus Smart Elderly Care",
    "elinusIntro": "AI-powered early risk screening and care decision support for senior care facilities.",
    "categories": ["Overview", "Sensing & profile", "Alerts & explainability", "Validation"],
    "slides": [
      {
        "category": "System overview",
        "title": "A care team sees risk before it becomes a crisis.",
        "body": "The overview brings resident status, facility activity and alert triage into one calm operating view.",
        "file": "elinus-overview.png",
        "alt": "E-Linus system overview interface showing resident and facility status",
        "proofs": ["128 residents monitored in real time", "Facility map and seven-day alert trend", "Direct path from alert to explanation"],
        "width": 1200,
        "height": 760
      },
      {
        "category": "Sensing and profile",
        "title": "Daily routines become a personal baseline.",
        "body": "Behavior patterns are organized around each resident so later deviations can be evaluated in context.",
        "file": "elinus-profile.png",
        "alt": "E-Linus resident profile with routine and behavior visualization",
        "proofs": ["Resident-centered profile", "24-hour activity model", "Weekly behavior heatmap"],
        "width": 1200,
        "height": 760
      },
      {
        "category": "Alerts and explainability",
        "title": "Every alert shows the reasons behind the risk.",
        "body": "Personal baselines, confidence and contributing behaviors help care teams review the alert before acting.",
        "file": "elinus-alerts.png",
        "alt": "E-Linus anomaly alert with risk factors and suggested action",
        "proofs": ["Risk score and confidence", "Personal baseline comparison", "Suggested follow-up action"],
        "width": 1200,
        "height": 760
      },
      {
        "category": "Validation",
        "title": "Model performance stays connected to care value.",
        "body": "Evaluation metrics and cross-dataset results make technical progress visible to clinical and operational teams.",
        "file": "elinus-validation.png",
        "alt": "E-Linus validation screen with model comparison and project value",
        "proofs": ["Model comparison", "Cross-dataset evidence", "Deployment value review"],
        "width": 1200,
        "height": 760
      }
    ],
    "labels": {"previous": "Previous E-Linus screen", "next": "Next E-Linus screen", "drag": "E-Linus project screenshots. Drag or use arrow keys.", "source": "Source / supplied preview.html / English interface"},
    "pdmTitle": "PDM Robot Asset RUL Monitor",
    "pdmIntro": "A predictive maintenance workflow that turns live asset telemetry into remaining-life estimates, critical alerts and maintenance guidance.",
    "pdmCategories": ["Fleet overview", "Degradation tracking", "Critical alert", "Maintenance decision"],
    "pdmSlides": [
      {
        "category": "Fleet overview",
        "title": "A maintenance team sees the whole asset fleet.",
        "body": "Health summaries, virtual assets and live readings bring multiple monitoring tasks into one operating surface.",
        "alt": "PDM Robot fleet overview interface",
        "proofs": ["Virtual asset status", "Live component health", "Assistant stays in context"],
        "file": "frame-02.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "Degradation tracking",
        "title": "Remaining useful life becomes visible as it changes.",
        "body": "The interface combines component health, virtual assets, telemetry and an assistant so maintenance teams can follow deterioration without switching tools.",
        "alt": "PDM Robot remaining useful life tracking interface",
        "proofs": ["55-second operational demonstration", "Live RUL trend and critical component health", "Assistant guidance remains beside the evidence"],
        "file": "frame-05.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "Critical alert",
        "title": "The system moves from warning to evidence.",
        "body": "A focused alert state connects threshold breaches with the sensor history and component that produced them.",
        "alt": "PDM Robot critical maintenance alert interface",
        "proofs": ["Threshold explanation", "Sensor evidence", "Asset-specific warning"],
        "file": "frame-08.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "Maintenance decision",
        "title": "Guidance stays beside the operational context.",
        "body": "The assistant turns model output into a reviewable maintenance action while preserving the supporting evidence.",
        "alt": "PDM Robot maintenance guidance and work order interface",
        "proofs": ["Reviewable recommendation", "Work order pathway", "Evidence remains available"],
        "file": "frame-10.png",
        "width": 900,
        "height": 600
      }
    ],
    "pdmLabels": {"previous": "Previous PDM Robot screen", "next": "Next PDM Robot screen", "drag": "PDM Robot project screenshots. Drag or use arrow keys.", "source": "Source / PdmRobot_full_demo_v2.mp4 / frame extracted at 20 seconds"},
    "footerTitle": "Projects that make intelligence operational.",
    "footerBody": "Two independent systems, presented through clear interface evidence and deployment-centered narratives."
  },
  "zh-CN": {
    "lead": "两个独立系统展示怡和实验室如何将感知、预测与可解释性转化为服务养老照护和工业维护的运营智能。",
    "selected": "精选项目",
    "overview": "两个系统，两条部署路径",
    "intro": "每个案例以引导式横向故事呈现：一张大型界面截图、一段简明说明，以及四类以证据为基础的信息。",
    "systems": [["照护智能", "从环境感知到可信的照护告警。"], ["工业人工智能", "从资产遥测到维护行动。"]],
    "elinusTitle": "E-Linus 智慧养老照护",
    "elinusIntro": "面向养老照护机构，提供人工智能驱动的早期风险筛查与照护决策支持。",
    "categories": ["概览", "感知与画像", "告警与可解释性", "验证"],
    "slides": [
      {
        "category": "系统概览",
        "title": "护理团队在风险演变为危机前洞察异常。",
        "body": "总览将住户状态、设施活动和告警分诊整合到一个清晰的操作视图中。",
        "alt": "E-Linus 系统总览界面，显示住户与设施状态",
        "proofs": ["实时监测 128 位住户", "设施地图与七日告警趋势", "从告警直接追溯解释"],
        "file": "elinus-overview.png",
        "width": 1200,
        "height": 760
      },
      {
        "category": "感知与画像",
        "title": "将日常作息转化为个人基线。",
        "body": "围绕每位住户整理行为模式，为后续偏差评估提供个人情境。",
        "alt": "E-Linus 住户画像界面，显示作息与行为可视化",
        "proofs": ["以住户为中心的画像", "24 小时活动模型", "每周行为热力图"],
        "file": "elinus-profile.png",
        "width": 1200,
        "height": 760
      },
      {
        "category": "告警与可解释性",
        "title": "每条告警都说明风险背后的原因。",
        "body": "个人基线、置信度和相关行为帮助护理团队在采取行动前审查告警。",
        "alt": "E-Linus 异常告警界面，显示风险因素与建议行动",
        "proofs": ["风险评分与置信度", "个人基线对比", "建议后续行动"],
        "file": "elinus-alerts.png",
        "width": 1200,
        "height": 760
      },
      {
        "category": "验证",
        "title": "让模型表现与护理价值保持关联。",
        "body": "评估指标与跨数据集结果，让临床和运营团队看见技术进展。",
        "alt": "E-Linus 验证界面，显示模型对比与项目价值",
        "proofs": ["模型对比", "跨数据集证据", "部署价值审查"],
        "file": "elinus-validation.png",
        "width": 1200,
        "height": 760
      }
    ],
    "labels": {"previous": "上一张 E-Linus 界面", "next": "下一张 E-Linus 界面", "drag": "E-Linus 项目截图，可拖动或使用左右方向键。", "source": "来源 / 随附 preview.html / 英文界面"},
    "pdmTitle": "PDM Robot 资产剩余寿命监测",
    "pdmIntro": "预测性维护工作流程，将实时资产遥测转化为剩余寿命估计、关键告警和维护指导。",
    "pdmCategories": ["资产群概览", "退化追踪", "关键告警", "维护决策"],
    "pdmSlides": [
      {
        "category": "资产群概览",
        "title": "维护团队掌握整个资产群的状态。",
        "body": "健康摘要、虚拟资产和实时读数，将多项监测任务整合到同一操作界面。",
        "alt": "PDM Robot 资产群概览界面",
        "proofs": ["虚拟资产状态", "实时部件健康", "助手保持情境关联"],
        "file": "frame-02.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "退化追踪",
        "title": "让剩余使用寿命的变化清晰可见。",
        "body": "界面结合部件健康、虚拟资产、遥测和助手，让维护团队无需切换工具即可追踪退化过程。",
        "alt": "PDM Robot 剩余使用寿命追踪界面",
        "proofs": ["55 秒操作演示", "实时剩余寿命趋势与关键部件健康", "助手指导与证据并列呈现"],
        "file": "frame-05.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "关键告警",
        "title": "系统从预警进一步追溯证据。",
        "body": "聚焦告警的状态将阈值超限与产生告警的传感器历史和部件关联起来。",
        "alt": "PDM Robot 关键维护告警界面",
        "proofs": ["阈值解释", "传感器证据", "特定资产预警"],
        "file": "frame-08.png",
        "width": 900,
        "height": 600
      },
      {
        "category": "维护决策",
        "title": "让指导与运营情境保持关联。",
        "body": "助手将模型输出转化为可审查的维护行动，同时保留支持证据。",
        "alt": "PDM Robot 维护指导与工单界面",
        "proofs": ["可审查的建议", "工单处理路径", "证据持续可用"],
        "file": "frame-10.png",
        "width": 900,
        "height": 600
      }
    ],
    "pdmLabels": {"previous": "上一张 PDM Robot 界面", "next": "下一张 PDM Robot 界面", "drag": "PDM Robot 项目截图，可拖动或使用左右方向键。", "source": "来源 / PdmRobot_full_demo_v2.mp4 / 第 20 秒提取画面"},
    "footerTitle": "让智能投入实际运营的项目。",
    "footerBody": "两个独立系统，以清晰的界面证据和面向部署的叙述呈现。"
  }
} satisfies Localized<ProjectsContent>;
