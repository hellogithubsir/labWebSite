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
    capabilityLede: "Fixed references A-01 to A-03; names and core advantages are shown here.",
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
    capabilityLede: "对应 A-01 至 A-03，展示技术名称与核心优势。",
    capabilities: [
      ["预测分析与知识蒸馏", "即使在噪声较多或资源受限的工业环境中，也能保持极高的预测准确率。"],
      ["大语言模型与多模态情绪编排", "赋予人工智能系统深层的情境感知和同理心。"],
      ["面向硬件优化的边缘视觉检测", "在完全不依赖云端的情况下实现毫秒级实时视觉感知。"],
    ],
    types: ["人工智能", "数据", "边缘"],
  },
} satisfies Record<Locale, {
  body: string; principles: string[][]; researchTitle: string[]; researchLede: string;
  directions: string[][]; capabilityTitle: string[]; capabilityLede: string; capabilities: string[][]; types: string[];
}>;
