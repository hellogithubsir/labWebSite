import type { Locale } from "./types";

// A-01–A-08：英文采用 FINAL PNG；中文按同编号内容的设计摘要对齐，保留前沿储备边界。
export const advantagesContent = {
  en: {
    intro: "Eight technology advantages connect robust models with deployment constraints. Three are proven core technologies; five remain frontier capabilities.",
    core: ["Core advantages", "Three technologies, one deployment discipline", "Prediction, orchestration and on-device perception form the proven core."],
    method: "Method", advantage: "Advantage",
    methods: [
      "Adaptive dual distillation and dynamic augmentation transfer complex reasoning into lightweight models for scarce or imbalanced industrial and medical data.",
      "RAG and localized knowledge bases combine with fuzzy multimodal transformers for emotional reasoning and state transitions.",
      "Mamba-transformer hybrids and generalized Gaussian algorithms compress vision models for embedded chips in scales, drones and sonar.",
    ],
    values: [
      "Accurate prediction under noisy and resource-constrained conditions, supported by SAS certification and applied B2B work.",
      "Context-aware interaction for civic digital concierges and personalized health coaching.",
      "Millisecond-level perception without cloud reliance, reducing latency and privacy exposure across AIoT hardware.",
    ],
    evidence: ["Field evidence", "Methods are tested where constraints are visible"],
    photos: [
      ["Model review", "Failure cases and segmentation outputs are inspected together.", "Researchers inspecting visual model results"],
      ["Hardware validation", "Latency, sensing and embedded compute are measured as one system.", "Embedded camera hardware validation"],
      ["Prototype integration", "Models move from benchmark results toward device behavior.", "Researchers integrating an edge AI prototype"],
    ],
    frontier: ["Frontier reserve", "Five capabilities kept in view"],
    capabilities: [
      ["Cross-Model Skill Compilation & Runtime Governance", "Compiles skills across models and runtimes with dependency binding, concurrent orchestration, feedback optimization and rollback, making success rates, latency and failures easier to trace."],
      ["User-Controlled Layered AI Memory", "Separates working memory, long-term records and suggestion layers so sources, permissions, expiry and deletion remain controllable."],
      ["Utility-Diversity Training Data Selection", "Selects high-utility, non-redundant samples to increase effective updates within a fixed compute budget."],
      ["On-Device Agents & Hardware Co-Design", "Connects sensors, local memory and actuators through an event-driven agent loop on constrained hardware."],
      ["Verifiable Feedback-Driven Continual Learning", "Uses verifiable rewards, version records and reversible evaluation to make continual learning measurable."],
    ],
    footerTitle: "Capability is useful only when it can be verified.",
    footerBody: "We frame technical advantage through measurable behavior: robustness, latency, traceability and deployment fit.",
  },
  "zh-CN": {
    intro: "八项技术优势将稳健模型与部署约束连接起来。其中三项是经过验证的核心技术，五项为前沿技术储备。",
    core: ["核心优势", "三项技术，一套部署准则", "预测、编排与端侧感知构成核心技术。"],
    method: "方法", advantage: "优势",
    methods: [
      "通过自适应双蒸馏与动态数据增强，将复杂推理迁移到轻量级模型，面向稀缺或不平衡的工业与医学数据。",
      "将检索增强生成（RAG）与本地化知识库结合，并融合模糊多模态 Transformer，实现情绪推理与状态转移。",
      "采用 Mamba–Transformer 混合架构与广义高斯算法，压缩视觉模型，使其在称重秤、无人机和声呐的嵌入式芯片上运行。",
    ],
    values: [
      "在噪声较多和资源受限条件下保持准确预测，并有 SAS 认证与企业应用实践支持。",
      "为民生数字礼宾和个性化健康指导提供情境感知交互。",
      "不依赖云端实现毫秒级感知，降低 AIoT 硬件的延迟与隐私暴露。",
    ],
    evidence: ["现场验证", "在约束清晰可见的现场验证方法"],
    photos: [
      ["模型评审", "联合检查失败案例与分割输出。", "研究人员检查视觉模型结果"],
      ["硬件验证", "将延迟、感知和嵌入式计算作为一个系统进行测量。", "嵌入式摄像头硬件验证"],
      ["原型集成", "模型从基准测试结果走向设备行为。", "研究人员集成边缘人工智能原型"],
    ],
    frontier: ["前沿储备", "持续关注的五项能力"],
    capabilities: [
      ["跨模型技能编译与运行治理", "跨模型与运行环境编译技能，结合依赖绑定、并发编排、反馈优化和回滚，使成功率、延迟与失败原因更容易追踪。"],
      ["用户可控的分层人工智能记忆", "分离工作记忆、长期记录与建议层，使来源、权限、到期与删除保持可控。"],
      ["效用—多样性训练数据选择", "选择高效用且不重复的样本，在固定算力预算内增加有效更新。"],
      ["设备端智能体与硬件协同", "在受限硬件上，通过事件驱动的智能体循环连接传感器、本地记忆与执行器。"],
      ["可验证反馈驱动的持续学习", "通过可验证奖励、版本记录与可逆评估，使持续学习可衡量。"],
    ],
    footerTitle: "能力只有可以验证，才有价值。",
    footerBody: "我们通过可衡量的行为界定技术优势：稳健性、延迟、可追溯性与部署适配。",
  },
} satisfies Record<Locale, {
  intro: string; core: string[]; method: string; advantage: string; methods: string[]; values: string[];
  evidence: string[]; photos: string[][]; frontier: string[]; capabilities: string[][]; footerTitle: string; footerBody: string;
}>;
