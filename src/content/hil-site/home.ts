import type { Locale } from "./types";

// H-01–H-03：英文依据 FINAL PNG；中文按同编号 DOCX 和设计补充对齐。
export const homeContent = {
  en: {
    body: "We are dedicated to transforming complex data into actionable intelligence through the fusion of Computer Vision, Multi-Agent Systems, and hardware-efficient Edge AI. Our goal is to address real-world challenges, providing highly adaptable AI solutions for digital health, industrial automation, and smart public services.",
    principles: [["Reliable", "Interpretable results and accountable processes."], ["Collaborative", "Research, engineering and industry in one loop."], ["Deployable", "Designed for long-term operation in real settings."]],
    researchTitle: ["Understand complexity.", "Build reliable judgement."],
    researchLede: "Operating at the intersection of Medical AI, On-Device Vision and Autonomous Orchestration, delivering high-impact solutions for healthcare, smart cities and industry.",
    directions: [
      ["Digital Health &\nMedical Image Analytics", "Advanced AI and predictive analytics for diagnostic imaging and personalized health interventions."],
      ["Edge Intelligence &\nOn-Device Vision", "High-performance computer vision and machine learning for resource-constrained industrial and IoT devices."],
      ["Multi-Agent Systems &\nNLP", "LLM-driven autonomous orchestration and multi-modal human-AI interaction for real-world workflows."],
    ],
    capabilityTitle: ["From models to the field,", "capability stays in motion."],

    capabilities: [
      ["Predictive Analytics & Knowledge Distillation", "Maintains exceptionally high predictive accuracy even in noisy or resource-constrained industrial environments."],
      ["LLM & Multi-modal Emotional Orchestration", "Empowers AI systems with profound context-awareness and empathy."],
      ["Hardware-Optimized Edge Vision Detection", "Achieves millisecond-level real-time visual perception without cloud reliance."],
    ],
    types: ["AI", "DATA", "EDGE"],
  },
  "zh-CN": {
    body: "我们致力于融合计算机视觉、多智能体系统和面向硬件高效部署的边缘人工智能，将复杂数据转化为可付诸行动的智能。我们的目标是应对现实世界挑战，为数字健康、工业自动化和智慧公共服务提供高度灵活的人工智能解决方案。",
    principles: [["可靠", "可解释的结果与可追溯的过程。"], ["协作", "连接研究、工程与产业的协作闭环。"], ["可部署", "面向真实环境中的长期运行。"]],
    researchTitle: ["理解复杂问题。", "构建可靠判断。"],
    researchLede: "聚焦医学人工智能、端侧视觉与自主编排的交叉领域，为医疗健康、智慧城市和工业领域提供高影响力解决方案。",
    directions: [
      ["数字健康与\n医学影像分析", "面向诊断影像和个性化健康干预的先进人工智能与预测分析。"],
      ["边缘智能与\n端侧视觉", "在资源受限的工业与物联网设备上部署高性能计算机视觉和机器学习模型。"],
      ["多智能体系统与\n自然语言处理", "由大语言模型驱动的自主系统编排与多模态人机交互，服务真实工作流程。"],
    ],
    capabilityTitle: ["从模型到现场，", "让能力持续落地。"],

    capabilities: [
      ["预测分析与知识蒸馏", "即使在噪声较多或资源受限的工业环境中，也能保持极高的预测准确率。"],
      ["大语言模型与多模态情绪编排", "赋予人工智能系统深层的情境感知和同理心。"],
      ["面向硬件优化的边缘视觉检测", "在完全不依赖云端的情况下实现毫秒级实时视觉感知。"],
    ],
    types: ["人工智能", "数据", "边缘"],
  },
} satisfies Record<Locale, {
  body: string; principles: string[][]; researchTitle: string[]; researchLede: string;
  directions: string[][]; capabilityTitle: string[]; capabilities: string[][]; types: string[];
}>;

// H-04–H-07：最终 PNG 文案优先于源 HTML，中文保留编号对应的专名。
export const homeOverviewContent = {
  en: {
    projectsTitle: "Selected projects",
    projectsLede: "Managing over RM 1.2M in research funding, our projects drive tangible B2B and enterprise value across smart manufacturing, digital health, and national civic infrastructure.",
    featured: "FEATURED PROJECT",
    projects: [
      ["Smart Grocer: Edge AI Produce Recognition System", "Eliminated manual entry and drastically improved checkout speeds; key findings published in IET Image Processing."],
      ["Integrated Digital Concierge with Real-Time Avatar Based on AI-RAG", "Successfully funded and actively deployed as a core civic empowerment tool (2026–2027)."],
      ["Technical and Operational Design for National Address Systems (NAS)", "Secured multiple industrial grants (RM 50k+ each), laying the foundation for Malaysia's digital transformation."],
    ],
    projectAlt: "Organic intelligence artwork representing the Smart Grocer project",
    partnersTitle: "Partners",
    partnersLede: "The HI Lab maintains close, active collaborations with global tech leaders and top-tier academic institutions to drive the R&D and deployment of Edge Computing and Medical AI.",
    partners: ["Advantech", "HILTI Asia IT Services", "Tokio Marine & Dynafront", "Xiamen University Malaysia", "Leeds Beckett University", "Three-Opp (M) Sdn. Bhd."],
    labTitle: "Inside the Lab",
    labLede: "Shared spaces connect model review, hardware validation and prototype testing.",
    photos: [
      ["Vision model review", "Researchers compare detection results and identify failure cases.", "Researchers reviewing vision model outputs"],
      ["Edge hardware validation", "Camera, embedded compute and latency are tested together.", "Camera and embedded hardware validation setup"],
      ["Prototype integration", "Sensors and custom devices move from the bench toward deployment.", "Researchers integrating a prototype"],
      ["Shared research environment", "A flexible workspace supports AI, robotics and industry collaboration.", "Shared research laboratory environment"],
    ],
    teamTitle: "A team spanning research and real-world practice.",
    teamLede: "Led by Dr. Chaw Jun Kit, our dynamic team of researchers bridges the gap between complex AI algorithms and commercial adaptability.",
    members: [["Dr. Chaw Jun Kit", "Principal Investigator / Senior Lecturer & Research Fellow"], ["Zhao Yanfeng", "PhD Graduate / Core Member"], ["Cheng Xiang", "PhD Graduate / Core Member"], ["Liu Jianbang", "PhD Graduate / Core Member"]],
    footerTitle: "Together, intelligence grows better.",
    footerBody: "We actively seek enterprise partnerships for Edge AI R&D, cross-disciplinary medical data collaborations, and highly motivated postgraduate (Master/PhD) candidates.",
  },
  "zh-CN": {
    projectsTitle: "精选项目",
    projectsLede: "我们管理超过 120 万令吉的科研经费，通过项目为智慧制造、数字健康和国家民生基础设施创造切实的 B2B 与企业价值。",
    featured: "重点项目",
    projects: [
      ["Smart Grocer：边缘人工智能生鲜识别系统", "消除人工录入，大幅提升结账速度；关键研究成果发表于 IET Image Processing。"],
      ["基于 AI-RAG 的实时虚拟形象一体化数字礼宾", "已成功获得资助，并作为核心民生赋能工具积极部署（2026–2027）。"],
      ["国家地址系统（NAS）的技术与运营设计", "获得多项产业基金（每项超过 5 万令吉），为马来西亚的数字化转型奠定基础。"],
    ],
    projectAlt: "代表 Smart Grocer 项目的有机智能艺术图",
    partnersTitle: "合作伙伴",
    partnersLede: "HI Lab 与全球科技领军企业及一流学术机构保持紧密、活跃的合作，推动边缘计算与医学人工智能的研发和部署。",
    partners: ["研华科技", "HILTI 亚洲 IT 服务", "东京海上与 Dynafront", "厦门大学马来西亚分校", "利兹贝克特大学", "Three-Opp (M) Sdn. Bhd."],
    labTitle: "走进实验室",
    labLede: "共享空间连接模型评审、硬件验证与原型测试。",
    photos: [
      ["视觉模型评审", "研究人员对比检测结果，识别失败案例。", "研究人员评审视觉模型输出"],
      ["边缘硬件验证", "联合测试摄像头、嵌入式计算与延迟。", "摄像头与嵌入式硬件验证装置"],
      ["原型集成", "传感器与定制设备从实验台走向实际部署。", "研究人员集成原型设备"],
      ["共享研究环境", "灵活的工作空间支持人工智能、机器人与产业合作。", "共享的研究实验室环境"],
    ],
    teamTitle: "连接前沿研究与现实实践的团队。",
    teamLede: "在周俊杰博士的带领下，我们充满活力的研究团队连接复杂人工智能算法与商业适应性。",
    members: [["周俊杰 Dr. Chaw Jun Kit", "课题负责人 / 高级讲师兼研究员"], ["Zhao Yanfeng", "博士毕业生 / 核心成员"], ["Cheng Xiang", "博士毕业生 / 核心成员"], ["Liu Jianbang", "博士毕业生 / 核心成员"]],
    footerTitle: "携手同行，让智能更好成长。",
    footerBody: "我们积极寻求边缘人工智能研发领域的企业合作、跨学科医学数据合作，并招募高度自驱的研究生（硕士 / 博士）。",
  },
} satisfies Record<Locale, {
  projectsTitle: string; projectsLede: string; featured: string; projects: string[][]; projectAlt: string;
  partnersTitle: string; partnersLede: string; partners: string[]; labTitle: string; labLede: string; photos: string[][];
  teamTitle: string; teamLede: string; members: string[][]; footerTitle: string; footerBody: string;
}>;
