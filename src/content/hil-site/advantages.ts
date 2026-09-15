import type { Localized } from "./types";

type DiagramKind = "distillation" | "orchestration" | "edge" | "runtime" | "memory" | "selection" | "device" | "learning";

interface Advantage {
  id: `a0${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`;
  diagram: DiagramKind;
  title: string;
  value: string;
  description: string;
  labels: readonly string[];
  diagramDescription: string;
}

interface AdvantagesContent {
  headline: readonly [string, string];
  intro: string;
  heroLabels: readonly string[];
  heroDescription: string;
  coreLabel: string;
  frontierLabel: string;
  frontierNote: string;
  items: readonly Advantage[];
  footerTitle: string;
  footerBody: string;
  projects: string;
  contact: string;
}

// V4 A-01–A-08：方法与价值按同编号提炼；前沿储备不表述为已验证产品。
export const advantagesContent = {
  "zh-CN": {
    headline: ["八项技术优势，", "连接研究与实际应用。"],
    intro: "从稳健预测、端侧感知，到智能体系统与持续学习。",
    heroLabels: ["预测", "理解", "感知"],
    heroDescription: "预测、理解与感知分别展示为三个独立层面，代表技术能力的不同侧面。",
    coreLabel: "核心技术",
    frontierLabel: "前沿技术储备",
    frontierNote: "围绕智能体系统与模型学习，持续探索新的技术路径。",
    items: [
      {
        id: "a01", diagram: "distillation", title: "预测分析与知识蒸馏",
        value: "让复杂模型适应有限数据与算力",
        description: "面向稀缺、不平衡的工业与医学数据，通过自适应双蒸馏与动态数据增强，将复杂模型的推理能力迁移到轻量级模型，兼顾预测表现与实际部署条件。",
        labels: ["复杂模型", "知识迁移", "轻量模型"],
        diagramDescription: "复杂模型通过知识迁移形成轻量模型，示意知识蒸馏过程。",
      },
      {
        id: "a02", diagram: "orchestration", title: "大语言模型与多模态情绪编排",
        value: "理解知识，也理解情境",
        description: "将检索增强生成与本地化领域知识库结合，融合多模态情绪推理和状态转移分析，为数字礼宾、个性化健康指导等场景提供更具情境感知的交互。",
        labels: ["领域知识", "多模态信息", "情境理解", "交互"],
        diagramDescription: "领域知识与多模态信息汇入情境理解，再用于交互与编排。",
      },
      {
        id: "a03", diagram: "edge", title: "面向硬件优化的边缘视觉检测",
        value: "让视觉感知走进现场设备",
        description: "结合轻量化架构、模型压缩与硬件适配，将视觉推理部署到称重秤、无人机和声呐等嵌入式设备，在资源受限的现场环境中平衡感知能力与计算开销。",
        labels: ["视觉模型", "压缩部署", "端侧设备"],
        diagramDescription: "视觉模型经过压缩和部署适配，在端侧设备执行感知。",
      },
      {
        id: "a04", diagram: "runtime", title: "跨模型技能编译与运行治理",
        value: "一次定义，适配不同运行环境",
        description: "将技能视为可编译的自然语言程序，依据模型、框架与宿主环境进行能力适配和依赖绑定，再结合运行反馈、工作流编排与版本回滚，减少重复改写和盲目重试。",
        labels: ["技能定义", "运行环境 A", "运行环境 B", "运行环境 C", "运行反馈"],
        diagramDescription: "同一技能定义适配三个通用运行环境，运行反馈返回技能治理流程。",
      },
      {
        id: "a05", diagram: "memory", title: "用户可控的分层人工智能记忆",
        value: "记忆可追溯，也可管理",
        description: "分离会话工作记忆、结构化长期记忆与主动建议层，结合来源记录、权限控制、到期复核与删除机制，减少重复说明，并让记忆的保存、调用和退出保持可控。",
        labels: ["会话记忆", "长期记忆", "主动建议", "查阅", "修改", "删除"],
        diagramDescription: "会话记忆、长期记忆与主动建议分层管理，并提供查阅、修改和删除能力。",
      },
      {
        id: "a06", diagram: "selection", title: "效用—多样性训练数据选择",
        value: "把训练预算留给更有价值的样本",
        description: "复用训练前向传播的信息，综合评估样本效用与多样性，并结合历史样本识别重复数据，将参数更新优先用于高价值样本，提高固定训练预算内的有效更新密度。",
        labels: ["候选数据", "效用与多样性", "训练样本"],
        diagramDescription: "候选数据经过效用与多样性筛选，保留有价值且较少重复的训练样本。",
      },
      {
        id: "a07", diagram: "device", title: "设备端智能体与硬件协同",
        value: "让智能体连接真实设备",
        description: "在资源受限设备上，以事件驱动的智能体循环连接传感器、本地结构化记忆与执行器，并通过获得授权的服务和硬件接口协作，让低风险事件更靠近现场响应。",
        labels: ["传感器", "智能体循环", "执行器", "本地记忆"],
        diagramDescription: "传感器向智能体循环提供事件，智能体读取本地记忆并驱动执行器。",
      },
      {
        id: "a08", diagram: "learning", title: "可验证反馈驱动的持续学习",
        value: "让每一轮学习可评估、可追溯",
        description: "以可验证奖励锚定学习方向，结合细粒度自蒸馏、近未来策略指导与多专长协同训练，记录验证器、模型版本和分项评测结果，使持续迭代可评估并支持回滚。",
        labels: ["学习", "验证", "反馈", "更新", "版本记录"],
        diagramDescription: "学习、验证、反馈和更新形成持续迭代循环，版本记录支持追溯与回滚。",
      },
    ],
    footerTitle: "把技术能力，带入你的实际问题。",
    footerBody: "从数据条件、设备限制与应用目标出发，讨论合适的技术路径。",
    projects: "查看项目", contact: "联系合作",
  },
  en: {
    headline: ["Eight technology advantages.", "From research to real-world use."],
    intro: "From robust prediction and on-device perception to agent systems and continual learning.",
    heroLabels: ["Prediction", "Understanding", "Perception"],
    heroDescription: "Prediction, understanding and perception are shown as three independent layers representing different aspects of technical capability.",
    coreLabel: "Core technologies",
    frontierLabel: "Frontier research",
    frontierNote: "Exploring new technical paths for agent systems and model learning.",
    items: [
      {
        id: "a01", diagram: "distillation", title: "Predictive Analytics & Knowledge Distillation",
        value: "Complex models. Limited data and compute.",
        description: "For scarce or imbalanced industrial and medical data, adaptive dual distillation and dynamic augmentation transfer complex reasoning into lightweight models, balancing predictive performance with practical deployment constraints.",
        labels: ["Complex model", "Knowledge transfer", "Lightweight model"],
        diagramDescription: "Knowledge transfers from a complex model to a lightweight model, illustrating the distillation process.",
      },
      {
        id: "a02", diagram: "orchestration", title: "LLM & Multimodal Emotional Orchestration",
        value: "Understanding knowledge—and context.",
        description: "Retrieval-augmented generation and local domain knowledge combine with multimodal emotional reasoning and state-transition analysis to support context-aware interactions in digital concierges and personalized health coaching.",
        labels: ["Domain knowledge", "Multimodal input", "Context", "Interaction"],
        diagramDescription: "Domain knowledge and multimodal input contribute to contextual understanding, which supports interaction and orchestration.",
      },
      {
        id: "a03", diagram: "edge", title: "Hardware-Optimized Edge Vision Detection",
        value: "Taking visual perception to field devices.",
        description: "Lightweight architectures, model compression and hardware adaptation bring visual inference to embedded scales, drones and sonar devices, balancing perception capabilities with the compute available in constrained field environments.",
        labels: ["Vision model", "Compression", "Edge devices"],
        diagramDescription: "A vision model is compressed and adapted for deployment to edge devices.",
      },
      {
        id: "a04", diagram: "runtime", title: "Cross-Model Skill Compilation & Runtime Governance",
        value: "One definition. Different runtimes.",
        description: "Treating skills as compilable natural-language programs, capability adaptation and dependency binding account for models, frameworks and host environments. Runtime feedback, workflow orchestration and version rollback help reduce repetitive rewrites and blind retries.",
        labels: ["Skill definition", "Runtime A", "Runtime B", "Runtime C", "Runtime feedback"],
        diagramDescription: "One skill definition is adapted to three generic runtimes, with runtime feedback returning to the governance process.",
      },
      {
        id: "a05", diagram: "memory", title: "User-Controlled Layered AI Memory",
        value: "Memory you can trace and manage.",
        description: "Separating working memory, structured long-term records and proactive suggestions reduces repeated explanations. Source records, permissions, expiry reviews and deletion keep the storage, use and retirement of memories under control.",
        labels: ["Working memory", "Long-term memory", "Suggestions", "Review", "Edit", "Delete"],
        diagramDescription: "Working memory, long-term memory and suggestions are managed as separate layers with review, edit and delete controls.",
      },
      {
        id: "a06", diagram: "selection", title: "Utility–Diversity Training Data Selection",
        value: "Spend the training budget on valuable samples.",
        description: "Reusing information from training forward passes, sample utility and diversity are assessed alongside historical samples to identify duplication. Parameter updates prioritize valuable samples, increasing effective updates within a fixed training budget.",
        labels: ["Candidate data", "Utility & diversity", "Training samples"],
        diagramDescription: "Candidate data passes through utility and diversity selection to retain valuable, less redundant training samples.",
      },
      {
        id: "a07", diagram: "device", title: "On-Device Agents & Hardware Co-Design",
        value: "Connecting agents to physical devices.",
        description: "On constrained devices, an event-driven agent loop connects sensors, local structured memory and actuators. Authorized service and hardware interfaces enable cooperation, bringing responses to low-risk events closer to the field.",
        labels: ["Sensors", "Agent loop", "Actuators", "Local memory"],
        diagramDescription: "Sensors provide events to an agent loop, which accesses local memory and drives actuators.",
      },
      {
        id: "a08", diagram: "learning", title: "Verifiable Feedback-Driven Continual Learning",
        value: "Every learning cycle, evaluated and traceable.",
        description: "Verifiable rewards anchor learning, supported by fine-grained self-distillation, near-future policy guidance and multi-specialty training. Verifier records, model versions and targeted evaluations make iteration assessable and support rollback.",
        labels: ["Learning", "Validation", "Feedback", "Update", "Version records"],
        diagramDescription: "Learning, validation, feedback and updates form an iterative loop, with version records supporting traceability and rollback.",
      },
    ],
    footerTitle: "Bring technical capability to your real-world challenge.",
    footerBody: "Start with your data, device constraints and application goals to explore a suitable technical path.",
    projects: "View projects", contact: "Collaborate",
  },
} satisfies Localized<AdvantagesContent>;
