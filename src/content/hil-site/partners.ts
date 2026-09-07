import type { Locale } from "./types";

// N-01/N-02：PNG 英文正文与同编号中文内容；未交付机构图片，以正式名称呈现字标。
export const partnersContent = {
  en: {
    intro: "The HI Lab maintains close, active collaborations with global tech leaders and top-tier academic institutions to drive the R&D and deployment of Edge Computing and Medical AI.",
    introductionLabel: "Shared introduction",
    introductionTitle: "Partners connected by applied research",
    introduction: "Industry partners contribute deployment constraints and field data. Academic partners contribute shared methods, evaluation and publication pathways. The lab connects both through Edge Computing and Medical AI.",
    directoryLabel: "Partner logo wall",
    directoryTitle: "Organizations in the supplied partner directory",
    names: ["Advantech", "HILTI Asia IT Services", "Tokio Marine & Dynafront", "Xiamen University Malaysia", "Leeds Beckett University", "Three-Opp (M) Sdn. Bhd.", "Universiti Tenaga Nasional (UNITEN)", "Asia Roofing Industry", "Mobiva"],
    footerTitle: "Better intelligence is built together.",
    footerBody: "For industry, academic and cross-disciplinary collaboration in Edge AI, Medical AI and autonomous systems.",
  },
  "zh-CN": {
    intro: "怡和实验室与全球科技领军企业和一流学术机构保持紧密、活跃的合作，共同推动边缘计算与医学人工智能的研发和部署。",
    introductionLabel: "合作概览",
    introductionTitle: "以应用研究连接合作伙伴",
    introduction: "产业伙伴提供部署约束与现场数据。学术伙伴提供共享方法、评估与发表渠道。实验室通过边缘计算与医学人工智能连接双方。",
    directoryLabel: "合作伙伴标识墙",
    directoryTitle: "合作伙伴名录中的机构",
    names: ["Advantech（研华科技）", "HILTI 亚洲 IT 服务", "Tokio Marine & Dynafront", "厦门大学马来西亚分校", "利兹贝克特大学", "Three-Opp (M) Sdn. Bhd.", "马来西亚国能大学（UNITEN）", "Asia Roofing Industry（亚洲屋面工业）", "Mobiva"],
    footerTitle: "更好的智能，源于共同构建。",
    footerBody: "欢迎围绕边缘人工智能、医学人工智能与自主系统开展产业、学术和跨学科合作。",
  },
} satisfies Record<Locale, { intro: string; introductionLabel: string; introductionTitle: string; introduction: string; directoryLabel: string; directoryTitle: string; names: string[]; footerTitle: string; footerBody: string }>;
