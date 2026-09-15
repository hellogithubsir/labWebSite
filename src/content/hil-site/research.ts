import type { Localized } from "./types";

// FINAL PNG 可见英文；中文按 R-01–R-06 DOCX 对齐，未引入表格说明列。
const content = {
  "en": {
    "lead": "From edge perception to domain intelligence and autonomous orchestration.",
    "intro": "HI Lab translates advanced machine learning into enterprise-grade applications across healthcare, smart cities and industry.",
    "explore": "Explore the Pillars",
    "sections": ["Overview", "HEALTH", "EDGE-AI", "AGENT", "Relationships", "Scenarios"],
    "overview": "Research begins with questions and proves itself in the real world.",
    "overviewBody": "The three pillars bridge massive unstructured data in physical environments with real-time autonomous decisions in digital workflows.",
    "facts": [
      [
        "FOCUS",
        "Medical AI, on-device vision and autonomous orchestration"
      ],
      [
        "STRUCTURE",
        "Three connected pillars with shared evaluation methods"
      ],
      [
        "OUTPUT",
        "Models, prototype systems, scenario validation and representative projects"
      ]
    ],
    "fieldLabels": ["KEY QUESTIONS", "MAIN RESEARCH CONTENT", "APPLICATION SCENARIOS"],
    "pillars": [
      {
        "key": "health",
        "code": "HEALTH",
        "title": "HEALTH (Digital Health & Medical Image Analytics)",
        "definition": "Advanced AI and predictive analytics for diagnostic imaging and personalized health interventions.",
        "questions": "1. Early prediction of Non-Communicable Diseases using complex sequence data. 2. High-precision cross-modal medical image segmentation. 3. Closed-loop control based on deep reinforcement learning.",
        "research": "Disease intervention models using reinforcement learning. Dual-Branch CNN architectures for Alzheimer’s diagnosis, multi-modal sentiment and emotion analysis for personalized health coaching.",
        "applications": "Automated medical image segmentation and clinical diagnostics; Ageing-in-Place monitoring; long-term diabetic risk prediction."
      },
      {
        "key": "edge",
        "code": "EDGE-AI",
        "title": "EDGE-AI (Edge Intelligence & On-Device Vision)",
        "definition": "Deploying high-performance computer vision and machine learning models on resource-constrained industrial and IoT devices.",
        "questions": "1. Low-latency visual sensing independent of cloud infrastructure. 2. Real-time object and defect detection. 3. Neural-network compression for embedded hardware.",
        "research": "Lightweight Mamba-transformer hybrid architectures, zero-shot gesture learning for interactive dashboard control.",
        "applications": "Smart retail checkout; Agriculture 4.0 drone mapping; underwater sonar target detection; traffic monitoring."
      },
      {
        "key": "agent",
        "code": "AGENT",
        "title": "AGENT (Multi-Agent Systems & NLP)",
        "definition": "Large Language Model (LLM) driven autonomous system orchestration and multi-modal human-AI interaction.",
        "questions": "1. AI-RAG civic and tourism services. 2. Emotionally intelligent conversational avatars. 3. Foundation-model patent mining and text analysis.",
        "research": "RAG pipelines for public services, emotional state-transition models in human-robot interfaces, TRIZ, BERT and LLM-based sustainable product innovation.",
        "applications": "National digital concierges; multi-modal EdTech and counselling; automated trend prediction for enterprise R&D."
      }
    ],
    "edgeCaption": "Reliable. Real-time. Deployable.",
    "relationLabel": "RESEARCH SYSTEM",
    "relationTitle": "Relationship Among the Three Directions",
    "relationBody": "All three pillars bridge unstructured physical-world data and real-time autonomous decisions in digital workflows.",
    "relations": [
      [
        "Medical AI & image analytics",
        "Researchers review diagnostic segmentation and physiological signals for interpretable health decisions."
      ],
      [
        "On-device perception",
        "Embedded cameras and edge compute are validated for low-latency deployment."
      ],
      [
        "Autonomous orchestration",
        "Researchers coordinate software agents, tools and models across shared workflows."
      ]
    ],
    "mappingLabel": "SCENARIOS & PROJECT MAPPING",
    "mappingTitle": "From research questions to real scenarios",

    "mapping": [
      "Early Prediction of NCDs; Elderly Mental Health Monitoring; Personalized Fitness Guidance.",
      "Smart Grocer Produce Recognition; Agriculture 4.0 Drone Mapping; Facial Recognition Access Control; Game Visual Guide.",
      "AI-RAG Digital Concierge; National Address System; Scam Monitoring; DingTalk Office Assistant; TikTok Lead Generation & Sales."
    ],
    "footerTitle": "Research that continues in the real world.",
    "footerBody": "Research partnerships, enterprise collaboration and postgraduate opportunities."
  },
  "zh-CN": {
    "lead": "从边缘感知到领域智能与自主编排。",
    "intro": "怡和实验室将先进机器学习转化为医疗健康、智慧城市和工业领域的企业级应用。",
    "explore": "探索研究支柱",
    "sections": ["概览", "HEALTH", "EDGE-AI", "AGENT", "协同关系", "应用场景"],
    "overview": "研究始于问题，并在真实世界中得到验证。",
    "overviewBody": "三大研究支柱打通物理环境中的海量非结构化数据与数字工作流中的实时自主决策。",
    "facts": [
      [
        "聚焦",
        "医学人工智能、端侧视觉与自主编排"
      ],
      [
        "结构",
        "采用共享评估方法的三大关联支柱"
      ],
      [
        "成果",
        "模型、原型系统、场景验证与代表项目"
      ]
    ],
    "fieldLabels": ["关注问题", "主要研究内容", "应用场景"],
    "pillars": [
      {
        "key": "health",
        "code": "HEALTH",
        "title": "HEALTH（数字健康与医学影像分析）",
        "definition": "面向诊断影像和个性化健康干预的先进人工智能与预测分析。",
        "questions": "1. 利用复杂序列数据开展非传染性疾病（NCD）早期预测。2. 高精度跨模态医学影像分割。3. 基于深度强化学习的闭环控制系统（如人工胰腺）。",
        "research": "1. 利用强化学习构建疾病干预模型。2. 开发用于阿尔茨海默病诊断的双分支卷积神经网络架构。3. 面向个性化健康指导的多模态情感与情绪分析。",
        "applications": "1. 医学影像自动分割与临床辅助诊断。2. 居家养老场景下的生理与心理健康监测。3. 糖尿病患者的长期动态风险预测。"
      },
      {
        "key": "edge",
        "code": "EDGE-AI",
        "title": "EDGE-AI（边缘智能与端侧视觉）",
        "definition": "在资源受限的工业与物联网设备上部署高性能计算机视觉和机器学习模型。",
        "questions": "1. 不依赖云基础设施的低延迟实时视觉感知。2. 复杂制造与交通环境中的实时目标及缺陷检测。3. 面向嵌入式硬件的神经网络压缩与轻量化。",
        "research": "1. 开发面向真实场景检测的轻量级 Mamba–Transformer 混合架构。2. 研究用于交互式仪表板控制的手势动作零样本学习。",
        "applications": "1. 智慧零售结账系统（如人工智能称重秤）。2. 面向农业 4.0 的自主无人机测绘与图像拼接。3. 水下声呐小目标检测与交通监测。"
      },
      {
        "key": "agent",
        "code": "AGENT",
        "title": "AGENT（多智能体系统与自然语言处理）",
        "definition": "由大语言模型（LLM）驱动的自主系统编排与多模态人机交互。",
        "questions": "1. 通过 AI-RAG 技术实现市政与智慧旅游服务自动化。2. 利用具备情绪智能的对话式数字人增强数字交互。3. 基于基础模型的大规模专利挖掘与文本分析。",
        "research": "1. 研发面向公共服务的检索增强生成（RAG）流程。2. 探索人机界面中的遗传杂交技术与情绪状态转移模型。3. 将 TRIZ 方法论与 BERT、大语言模型结合，推动可持续产品创新。",
        "applications": "1. 国家级数字礼宾与自动化客户服务系统。2. 面向教育科技与心理咨询的沉浸式多模态平台。3. 面向企业研发部门的趋势自动预测与创意生成。"
      }
    ],
    "edgeCaption": "可靠。实时。可部署。",
    "relationLabel": "研究体系",
    "relationTitle": "三大研究方向的协同关系",
    "relationBody": "三大支柱共同打通物理世界的非结构化数据与数字工作流中的实时自主决策。",
    "relations": [
      [
        "医学人工智能与影像分析",
        "研究针对生物医学场景的诊断分割和生理信号解析。"
      ],
      [
        "端侧感知",
        "嵌入式摄像头与边缘计算通过验证，实现低延迟部署。"
      ],
      [
        "自主编排",
        "研究人员在共享工作流中协调软件智能体、工具与模型。"
      ]
    ],
    "mappingLabel": "应用场景与项目对应",
    "mappingTitle": "从研究问题走向真实场景",

    "mapping": [
      "非传染性疾病早期预测；老年心理健康监测；个性化健身指导。",
      "智慧零售生鲜识别；农业 4.0 无人机测绘；人脸识别门禁；游戏视觉攻略。",
      "AI-RAG 数字礼宾；国家地址系统；诈骗监测；钉钉办公助手；TikTok 获客与销售。"
    ],
    "footerTitle": "让研究在真实世界中持续发展。",
    "footerBody": "研究合作、企业协作与研究生机会。"
  }
};

export const researchContent: Localized<(typeof content)["en"]> = content;
