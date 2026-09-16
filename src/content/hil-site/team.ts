import type { Locale } from "./types";

const jeffName = { en: "Dr. Jeff Wang", "zh-CN": "王泓清博士（Jeff Wang）" };

export type MemberFilter = "all" | "graduate" | "candidate";
interface TeamMember { id: string; name: string; status: string; bio: string; type: Exclude<MemberFilter, "all"> }
interface TeamCopy { members: TeamMember[]; metrics: { label: string; count: string; note: string }[]; intro: string; introLabel: string; introTitle: string; statement: string; leadershipLabel: string; leadershipTitle: string; piName: string; piRole: string[]; affiliation: string; interests: string; bio: string; areasLabel: string; areas: string; outputsLabel: string; outputs: string; piAlt: string; profiles: { name: string; role: string; interests: string; bio?: string; email?: string }[]; compositionLabel: string; compositionTitle: string; membersLabel: string; membersTitle: string; membersNote: string; filterLabel: string; filters: string[]; footerTitle: string; footerBody: string }

// T-01–T-04：英文依最终 PNG 与随附 HTML，中文按同编号已交付文案适配。
export const teamContent = {
  "en": {
    "members": [
      {
        "id": "T-04-01",
        "name": "Zhao Yanfeng",
        "status": "PhD Graduate / Core Member",
        "bio": "Develops deep reinforcement learning methods for safer automated insulin delivery.",
        "type": "graduate"
      },
      {
        "id": "T-04-02",
        "name": "Cheng Xiang",
        "status": "PhD Graduate / Core Member",
        "bio": "Researches knowledge distillation to make remaining useful life prediction more efficient.",
        "type": "graduate"
      },
      {
        "id": "T-04-03",
        "name": "Liu Jianbang",
        "status": "PhD Graduate / Core Member",
        "bio": "Studies multimodal emotion analysis for personalized human–computer interaction.",
        "type": "graduate"
      },
      {
        "id": "T-04-04",
        "name": jeffName.en,
        "status": "PhD Graduate",
        "bio": "Academic publishing name: Wang Hongqing. Develops lightweight object detection models for complex traffic scenes.",
        "type": "graduate"
      },
      {
        "id": "T-04-05",
        "name": "Muhammad Aiman Md Zuki",
        "status": "PhD Candidate",
        "bio": "Studies sentiment and emotion analysis for personalized health coaching messages.",
        "type": "candidate"
      },
      {
        "id": "T-04-06",
        "name": "Leong Pooi Yan",
        "status": "PhD Candidate",
        "bio": "Explores artificial intelligence for predicting future pandemics.",
        "type": "candidate"
      },
      {
        "id": "T-04-07",
        "name": "Zheng Kun",
        "status": "MSc Graduate",
        "bio": "Studies entropy-based time series analysis for underwater acoustic target recognition.",
        "type": "graduate"
      },
      {
        "id": "T-04-08",
        "name": "Ooi Tze Yaang",
        "status": "MSc Graduate",
        "bio": "Develops sequence-preserving data augmentation for early prediction of non-communicable diseases.",
        "type": "graduate"
      },
      {
        "id": "T-04-09",
        "name": "Teo Shi Han",
        "status": "MSc Graduate",
        "bio": "Develops edge AI for real-time fresh produce recognition in retail weighing systems.",
        "type": "graduate"
      }
    ],
    "metrics": [
      {
        "label": "PhD graduates",
        "count": "04",
        "note": "2 completed as Main Supervisor"
      },
      {
        "label": "PhD candidates",
        "count": "06",
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
    "areas": "HEALTH / EDGE-AI / AGENT",
    "outputsLabel": "Outputs",
    "outputs": "Digital Concierge / Smart Grocer / 50+ SCIE and Scopus papers",
    "piAlt": "Portrait of Dr. Chaw Jun Kit, Principal Investigator",
    "profiles": [
      {
        "name": jeffName.en,
        "role": "Chief Technology Officer",
        "interests": "Computer Vision / Lightweight Object Detection",
        "bio": "Develops lightweight object detection models for complex traffic scenes.",
        "email": "hongqing.wang812@gmail.com",
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
    "membersTitle": "Meet our researchers",
    "membersNote": "The list below shows selected researchers; its size differs from the team composition totals above.",

    "filterLabel": "Filter team members",
    "filters": [
      "All listed members",
      "Graduates",
      "Candidates"
    ],

    "footerTitle": "A team spanning research and real-world practice.",
    "footerBody": "Researchers connect machine learning, vision, devices and domain knowledge through rigorous training and applied collaboration."
  },
  "zh-CN": {
    "members": [
      {
        "id": "T-04-01",
        "name": "Zhao Yanfeng",
        "status": "博士毕业生 / 核心成员",
        "bio": "研究深度强化学习方法，让自动胰岛素输注控制更安全。",
        "type": "graduate"
      },
      {
        "id": "T-04-02",
        "name": "Cheng Xiang",
        "status": "博士毕业生 / 核心成员",
        "bio": "研究知识蒸馏，提高设备剩余使用寿命预测的效率。",
        "type": "graduate"
      },
      {
        "id": "T-04-03",
        "name": "Liu Jianbang",
        "status": "博士毕业生 / 核心成员",
        "bio": "研究多模态情绪分析，支持个性化人机交互。",
        "type": "graduate"
      },
      {
        "id": "T-04-04",
        "name": jeffName["zh-CN"],
        "status": "博士毕业生",
        "bio": "学术署名：Wang Hongqing。开发适用于复杂交通场景的轻量化目标检测模型。",
        "type": "graduate"
      },
      {
        "id": "T-04-05",
        "name": "Muhammad Aiman Md Zuki",
        "status": "博士研究生",
        "bio": "研究情感与情绪分析，支持个性化健康指导信息。",
        "type": "candidate"
      },
      {
        "id": "T-04-06",
        "name": "Leong Pooi Yan",
        "status": "博士研究生",
        "bio": "探索人工智能在未来疫情预测中的应用。",
        "type": "candidate"
      },
      {
        "id": "T-04-07",
        "name": "Zheng Kun",
        "status": "硕士毕业生",
        "bio": "研究基于熵的时间序列分析，用于水声目标识别。",
        "type": "graduate"
      },
      {
        "id": "T-04-08",
        "name": "Ooi Tze Yaang",
        "status": "硕士毕业生",
        "bio": "开发保留序列结构的数据增强方法，用于非传染性疾病早期预测。",
        "type": "graduate"
      },
      {
        "id": "T-04-09",
        "name": "Teo Shi Han",
        "status": "硕士毕业生",
        "bio": "开发边缘人工智能，实现零售称重系统中的实时生鲜识别。",
        "type": "graduate"
      }
    ],
    "metrics": [
      {
        "label": "博士毕业生",
        "count": "04",
        "note": "作为主要导师已培养 2 名毕业生"
      },
      {
        "label": "博士研究生",
        "count": "06",
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
    "intro": "怡合智能汇聚计算机视觉、应用机器学习与人工智能系统设计领域的优秀人才。团队成员重点深耕数字健康、端侧智能和大语言模型编排。",
    "introLabel": "研究团队与学术网络",
    "introTitle": "连接理论、系统与实践的团队",
    "statement": "团队结合博士与硕士层次的科研训练、课题负责人指导、应用研究领导力和面向部署的项目实践，贯通三大相互关联的研究方向。",
    "leadershipLabel": "团队负责人",
    "leadershipTitle": "以研究方向引领真实部署",
    "piName": "周俊杰博士（Chaw Jun Kit）",
    "piRole": [
      "课题负责人",
      "高级讲师兼研究员"
    ],
    "affiliation": "马来西亚国民大学（UKM）视觉信息学研究所（IVI）",
    "interests": "机器学习 / 智能数据分析 / 边缘人工智能 / 计算机视觉",
    "bio": "周俊杰博士是 SAS 认证预测建模师和 NVIDIA 深度学习学院（DLI）认证计算机视觉专家。他的工作连接学术界与产业界，专注于制造优化、数字健康解决方案与产业部署。",
    "areasLabel": "研究方向",
    "areas": "数字健康 / 边缘智能 / 智能体",
    "outputsLabel": "代表成果",
    "outputs": "数字礼宾 / 智慧零售生鲜识别 / SCIE 及 Scopus 论文 50 余篇",
    "piAlt": "课题负责人周俊杰博士的肖像",
    "profiles": [
      {
        "name": jeffName["zh-CN"],
        "role": "首席技术官",
        "interests": "计算机视觉 / 轻量化目标检测",
        "bio": "开发适用于复杂交通场景的轻量化目标检测模型。",
        "email": "hongqing.wang812@gmail.com",
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
    "membersTitle": "认识我们的研究人员",
    "membersNote": "以下展示部分研究人员，名单数量不等同于上方团队构成统计。",

    "filterLabel": "筛选团队成员",
    "filters": [
      "全部展示成员",
      "毕业生",
      "在读研究生"
    ],

    "footerTitle": "连接科研与真实实践的团队。",
    "footerBody": "研究人员通过严谨训练与应用合作，将机器学习、视觉、设备和领域知识紧密结合。"
  }
} satisfies Record<Locale, TeamCopy>;
