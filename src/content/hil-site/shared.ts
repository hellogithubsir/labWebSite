import type { Localized, SharedContent } from "./types";

// 设计导航与 H-01 愿景；中文按同编号 DOCX 对齐，控制标签为界面辅助文案。
export const sharedContent = {
  en: {
    labels: { home: "Home", research: "Research Directions", projects: "Projects", advantages: "Technology Advantages", partners: "Partners", team: "Team", contact: "Contact" },
    titles: { home: "Bridging Human Perception and Machine Intelligence at the Edge.", research: "Research Directions", projects: "Projects", advantages: "Technology Advantages", partners: "Partners", team: "Team", contact: "Contact" },
    skip: "Skip to content", navigation: "Primary navigation", menu: "Menu", closeMenu: "Close menu",
    brand: "HI LAB", logoAlt: "Harmonizing Intelligence Lab", exploreResearch: "Explore Research", collaborate: "Collaborate",
  },
  "zh-CN": {
    labels: { home: "首页", research: "研究方向", projects: "项目展示", advantages: "技术优势", partners: "合作伙伴", team: "团队", contact: "联系合作" },
    titles: { home: "在边缘端连接人类感知与机器智能。", research: "研究方向", projects: "项目展示", advantages: "技术优势", partners: "合作伙伴", team: "团队", contact: "联系合作" },
    skip: "跳至正文", navigation: "主导航", menu: "菜单", closeMenu: "关闭菜单",
    brand: "怡和实验室", logoAlt: "怡和实验室", exploreResearch: "探索研究方向", collaborate: "联系合作",
  },
} satisfies Localized<SharedContent>;
