import type { Locale } from "./types";

export type MemberFilter = "all" | "graduate" | "candidate";
interface TeamMember { id: string; name: string; status: string; bio: string; type: Exclude<MemberFilter, "all"> }
interface TeamCopy { members: TeamMember[]; metrics: { label: string; count: string; note: string }[]; intro: string; introLabel: string; introTitle: string; statement: string; leadershipLabel: string; leadershipTitle: string; piName: string; piRole: string[]; affiliation: string; interests: string; bio: string; areasLabel: string; areas: string; outputsLabel: string; outputs: string; piAlt: string; profiles: { name: string; role: string; interests: string; bio: string }[]; compositionLabel: string; compositionTitle: string; membersLabel: string; membersTitle: string; membersIntro: string; filterLabel: string; filters: string[]; statusLabel: string; bioLabel: string; footerTitle: string; footerBody: string }

// T-01–T-04：英文依最终 PNG 与随附 HTML，中文按同编号已交付文案适配。
export const teamContent = {
  "en": {
    "members": [
      {
        "id": "T-04-01",
        "name": "Zhao Yanfeng",
        "status": "PhD Graduate / Core Member",
        "bio": "Safe-enhanced fully closed-loop artificial pancreas control based on Deep Reinforcement Learning.",
        "type": "graduate"
      },
      {
        "id": "T-04-02",
        "name": "Cheng Xiang",
        "status": "PhD Graduate / Core Member",
        "bio": "Adaptive dual distillation for efficient remaining useful life and predictive maintenance.",
        "type": "graduate"
      },
      {
        "id": "T-04-03",
        "name": "Liu Jianbang",
        "status": "PhD Graduate / Core Member",
        "bio": "Multimodal conversational emotion reasoning and immersive technology behavioral analysis.",
        "type": "graduate"
      },
      {
        "id": "T-04-04",
        "name": "Wang Hongqing",
        "status": "PhD Candidate",
        "bio": "Hybrid-YOLO architectures for complex traffic detection and medical image segmentation.",
        "type": "candidate"
      },
      {
        "id": "T-04-05",
        "name": "Muhammad Aiman Md Zuki",
        "status": "PhD Candidate",
        "bio": "Multimodal sentiment and emotion analysis for personalized, persuasive health coaching.",
        "type": "candidate"
      },
      {
        "id": "T-04-06",
        "name": "Leong Pooi Yan",
        "status": "PhD Candidate",
        "bio": "AI synergy in future pandemic prediction and automated crisis management tools.",
        "type": "candidate"
      },
      {
        "id": "T-04-07",
        "name": "Zheng Kun",
        "status": "MSc Graduate",
        "bio": "Generalized Gaussian distribution improvements and underwater sonar small-target detection.",
        "type": "graduate"
      },
      {
        "id": "T-04-08",
        "name": "Ooi Tze Yaang",
        "status": "MSc Graduate",
        "bio": "Dynamic sequence augmentation for the early prediction of non-communicable diseases.",
        "type": "graduate"
      },
      {
        "id": "T-04-09",
        "name": "Teo Shi Han",
        "status": "MSc Graduate",
        "bio": "Edge AI applications for real-time fresh produce identification in retail weighing systems.",
        "type": "graduate"
      }
    ],
    "metrics": [
      {
        "label": "PhD graduates",
        "count": "03",
        "note": "2 completed as Main Supervisor"
      },
      {
        "label": "PhD candidates",
        "count": "07",
        "note": "Deep Learning & Multimodal Analysis"
      },
      {
        "label": "MSc graduates",
        "count": "03",
        "note": "3 completed as Main Supervisor"
      },
      {
        "label": "MSc candidates",
        "count": "02",
        "note": "Applied Algorithms"
      }
    ],
    "intro": "The HI Lab brings together specialists in Computer Vision, Applied Machine Learning and AI System Design across Digital Health, On-device Intelligence and LLM Orchestration.",
    "introLabel": "Research team & academic network",
    "introTitle": "People across theory, systems and practice",
    "statement": "The group combines doctoral and master-level training with principal investigator oversight, applied research leadership and deployment-oriented project work across three connected research directions.",
    "leadershipLabel": "Leadership profiles",
    "leadershipTitle": "Research direction with deployment accountability",
    "piName": "Dr. Chaw Jun Kit",
    "piRole": [
      "Principal Investigator",
      "Senior Lecturer & Research Fellow"
    ],
    "affiliation": "Institute of Visual Informatics / Universiti Kebangsaan Malaysia",
    "interests": "Machine Learning / Intelligent Data Analytics / Edge AI / Computer Vision",
    "bio": "Dr. Chaw is a SAS-certified Predictive Modeler and NVIDIA DLI certified Computer Vision expert. His work connects academic research with manufacturing optimization, digital health and industrial deployment.",
    "areasLabel": "Research areas",
    "areas": "R-02 HEALTH / R-03 EDGE-AI / R-04 AGENT",
    "outputsLabel": "Outputs",
    "outputs": "P-03 Digital Concierge / P-05 Smart Grocer / 50+ SCIE and Scopus papers",
    "piAlt": "Portrait of Dr. Chaw Jun Kit, Principal Investigator",
    "profiles": [
      {
        "name": "Dr. Jeff Wang",
        "role": "Chief Technology Officer",
        "interests": "",
        "bio": "Affiliation, research interests, outputs and profile links have not yet been provided in the content package."
      },
      {
        "name": "Wendy Leong Pooi Yan",
        "role": "CEO of Mobiva / PhD Candidate",
        "interests": "AI in Crisis Management / Pandemic Prediction / Enterprise Mobility / Cloud-based Decision Support",
        "bio": "Bridges commercial technology leadership with research on pandemic prediction and real-time disaster response."
      }
    ],
    "compositionLabel": "Team composition",
    "compositionTitle": "Research training across doctoral and master levels",
    "membersLabel": "Members",
    "membersTitle": "Nine researchers, three fields each",
    "membersIntro": "Names, current status and one-sentence biographies follow the fixed T-04 order.",
    "filterLabel": "Filter team members",
    "filters": [
      "All members",
      "Graduates",
      "Candidates"
    ],
    "statusLabel": "Status",
    "bioLabel": "One-sentence bio",
    "footerTitle": "A team spanning research and real-world practice.",
    "footerBody": "Researchers connect machine learning, vision, devices and domain knowledge through rigorous training and applied collaboration."
  },
  "zh-CN": {
    "members": [
      {
        "id": "T-04-01",
        "name": "Zhao Yanfeng",
        "status": "博士毕业生 / 核心成员",
        "bio": "专注于基于深度强化学习的安全增强型全闭环人工胰腺控制器。",
        "type": "graduate"
      },
      {
        "id": "T-04-02",
        "name": "Cheng Xiang",
        "status": "博士毕业生 / 核心成员",
        "bio": "专注用于高效剩余使用寿命预测与预测性维护的自适应双蒸馏框架。",
        "type": "graduate"
      },
      {
        "id": "T-04-03",
        "name": "Liu Jianbang",
        "status": "博士毕业生 / 核心成员",
        "bio": "研究多模态对话情绪推理与沉浸式技术行为分析。",
        "type": "graduate"
      },
      {
        "id": "T-04-04",
        "name": "Wang Hongqing",
        "status": "博士研究生",
        "bio": "Hybrid-YOLO 架构开发者，专注复杂交通检测与医学影像分割。",
        "type": "candidate"
      },
      {
        "id": "T-04-05",
        "name": "Muhammad Aiman Md Zuki",
        "status": "博士研究生",
        "bio": "研究面向个性化、说服式健康指导的多模态情感与情绪分析框架。",
        "type": "candidate"
      },
      {
        "id": "T-04-06",
        "name": "Leong Pooi Yan",
        "status": "博士研究生",
        "bio": "探索人工智能在未来疫情预测与自动化危机管理工具中的协同作用。",
        "type": "candidate"
      },
      {
        "id": "T-04-07",
        "name": "Zheng Kun",
        "status": "硕士毕业生",
        "bio": "广义高斯分布改进与水下声呐小目标检测的主要研究人员。",
        "type": "graduate"
      },
      {
        "id": "T-04-08",
        "name": "Ooi Tze Yaang",
        "status": "硕士毕业生",
        "bio": "开发具有序列结构的动态数据增强方法，用于非传染性疾病早期预测。",
        "type": "graduate"
      },
      {
        "id": "T-04-09",
        "name": "Teo Shi Han",
        "status": "硕士毕业生",
        "bio": "开发用于零售称重系统实时生鲜识别的边缘人工智能应用。",
        "type": "graduate"
      }
    ],
    "metrics": [
      {
        "label": "博士毕业生",
        "count": "03",
        "note": "作为主要导师已培养 2 名毕业生"
      },
      {
        "label": "博士研究生",
        "count": "07",
        "note": "研究重点：深度学习与多模态分析"
      },
      {
        "label": "硕士毕业生",
        "count": "03",
        "note": "作为主要导师已培养 3 名毕业生"
      },
      {
        "label": "硕士研究生",
        "count": "02",
        "note": "研究重点：应用算法"
      }
    ],
    "intro": "怡和实验室汇聚计算机视觉、应用机器学习与人工智能系统设计领域的优秀人才。团队成员重点深耕数字健康、端侧智能和大语言模型编排。",
    "introLabel": "研究团队与学术网络",
    "introTitle": "连接理论、系统与实践的团队",
    "statement": "团队结合博士与硕士层次的科研训练、课题负责人指导、应用研究领导力和面向部署的项目实践，贯通三大相互关联的研究方向。",
    "leadershipLabel": "团队负责人",
    "leadershipTitle": "以研究方向引领真实部署",
    "piName": "周俊杰 Dr. Chaw Jun Kit",
    "piRole": [
      "课题负责人（PI）",
      "高级讲师兼研究员"
    ],
    "affiliation": "马来西亚国民大学（UKM）视觉信息学研究所（IVI）",
    "interests": "机器学习 / 智能数据分析 / 边缘人工智能 / 计算机视觉",
    "bio": "周俊杰博士是 SAS 认证预测建模师和 NVIDIA 深度学习学院（DLI）认证计算机视觉专家。他的工作连接学术界与产业界，专注于制造优化、数字健康解决方案与产业部署。",
    "areasLabel": "研究方向",
    "areas": "R-02 HEALTH / R-03 EDGE-AI / R-04 AGENT",
    "outputsLabel": "代表成果",
    "outputs": "P-03 数字礼宾 / P-05 智慧零售生鲜识别 / SCIE 及 Scopus 论文 50 余篇",
    "piAlt": "课题负责人周俊杰博士的肖像",
    "profiles": [
      {
        "name": "王鸿清 Dr. Jeff Wang",
        "role": "首席技术官（CTO）",
        "interests": "",
        "bio": "内容资料尚未提供单位、研究兴趣、成果与个人主页链接。"
      },
      {
        "name": "Wendy Leong Pooi Yan",
        "role": "Mobiva 首席执行官 / 博士研究生",
        "interests": "危机管理人工智能 / 疫情预测 / 企业移动化 / 云端决策支持",
        "bio": "将商业技术领导力与疫情预测、实时灾害响应领域的人工智能研究连接起来。"
      }
    ],
    "compositionLabel": "团队构成",
    "compositionTitle": "覆盖博士与硕士层次的科研训练",
    "membersLabel": "核心成员",
    "membersTitle": "九位研究人员，三项信息",
    "membersIntro": "姓名、当前身份和一句话简介按 T-04 固定顺序呈现。",
    "filterLabel": "筛选团队成员",
    "filters": [
      "全部成员",
      "毕业生",
      "在读研究生"
    ],
    "statusLabel": "身份",
    "bioLabel": "一句话简介",
    "footerTitle": "连接科研与真实实践的团队。",
    "footerBody": "研究人员通过严谨训练与应用合作，将机器学习、视觉、设备和领域知识紧密结合。"
  }
} satisfies Record<Locale, TeamCopy>;
