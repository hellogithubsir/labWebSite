import type { Locale } from "./types";

// 机构名称沿用交付名录；官方品牌来源见 content-refresh/partners-sources.md。
export const partnersContent = {
  en: {
    intro: "The HI Lab maintains close, active collaborations with global tech leaders and top-tier academic institutions to drive the R&D and deployment of Edge Computing and Medical AI.",
    introductionLabel: "Collaboration",
    introductionTitle: "Partners connected by applied research",
    introduction: "Industry partners contribute deployment constraints and field data. Academic partners contribute shared methods, evaluation and publication pathways. The lab connects both through Edge Computing and Medical AI.",

    directoryTitle: "Our Partners",
    footerTitle: "Better intelligence is built together.",
    footerBody: "For industry, academic and cross-disciplinary collaboration in Edge AI, Medical AI and autonomous systems.",
  },
  "zh-CN": {
    intro: "怡合智能与全球科技领军企业和一流学术机构保持紧密、活跃的合作，共同推动边缘计算与医学人工智能的研发和部署。",
    introductionLabel: "合作概览",
    introductionTitle: "以应用研究连接合作伙伴",
    introduction: "产业伙伴提供部署约束与现场数据。学术伙伴提供共享方法、评估与发表渠道。实验室通过边缘计算与医学人工智能连接双方。",

    directoryTitle: "合作伙伴",
    footerTitle: "更好的智能，源于共同构建。",
    footerBody: "欢迎围绕边缘人工智能、医学人工智能与自主系统开展产业、学术和跨学科合作。",
  },
} satisfies Record<Locale, { intro: string; introductionLabel: string; introductionTitle: string; introduction: string; directoryTitle: string; footerTitle: string; footerBody: string }>;

export const partners = [
  { id: "advantech", name: { en: "Advantech", "zh-CN": "Advantech（研华科技）" }, logos: [
    { src: "/images/hil-site/partners/advantech.svg", alt: "Advantech", width: 220, height: 52, dark: false },
  ] },
  { id: "hilti", name: { en: "HILTI Asia IT Services", "zh-CN": "HILTI 亚洲 IT 服务" }, logos: [
    { src: "/images/hil-site/partners/hilti.svg", alt: "HILTI", width: 180, height: 52, dark: false },
  ] },
  { id: "tokio-dynafront", name: { en: "Tokio Marine & Dynafront", "zh-CN": "Tokio Marine & Dynafront" }, logos: [
    { src: "/images/hil-site/partners/tokio-marine.png", alt: "Tokio Marine Group", width: 160, height: 90, dark: false },
    { src: "/images/hil-site/partners/dynafront.jpg", alt: "Dynafront", width: 190, height: 47, dark: false },
  ] },
  { id: "xmum", name: { en: "Xiamen University Malaysia", "zh-CN": "厦门大学马来西亚分校" }, logos: [
    { src: "/images/hil-site/partners/xmum.png", alt: "Xiamen University Malaysia", width: 230, height: 48, dark: true },
  ] },
  { id: "leeds-beckett", name: { en: "Leeds Beckett University", "zh-CN": "利兹贝克特大学" }, logos: [
    { src: "/images/hil-site/partners/leeds-beckett.svg", alt: "Leeds Beckett University", width: 210, height: 85, dark: false },
  ] },
  { id: "three-opp", name: { en: "Three-Opp (M) Sdn. Bhd.", "zh-CN": "Three-Opp (M) Sdn. Bhd." }, logos: [
    { src: "/images/hil-site/partners/three-opp.jpg", alt: "Three-Opp", width: 170, height: 79, dark: false },
  ] },
  { id: "uniten", name: { en: "Universiti Tenaga Nasional (UNITEN)", "zh-CN": "马来西亚国能大学（UNITEN）" }, logos: [
    { src: "/images/hil-site/partners/uniten.png", alt: "UNITEN", width: 170, height: 120, dark: false },
  ] },
  { id: "asia-roofing", name: { en: "Asia Roofing Industry", "zh-CN": "Asia Roofing Industry（亚洲屋面工业）" }, logos: [
    { src: "/images/hil-site/partners/ajiya.png", alt: "AJIYA", width: 220, height: 65, dark: false },
  ] },
  { id: "mobiva", name: { en: "Mobiva", "zh-CN": "Mobiva" }, logos: [
    { src: "/images/hil-site/partners/mobiva.png", alt: "Mobiva", width: 132, height: 35, dark: false },
  ] },
];
