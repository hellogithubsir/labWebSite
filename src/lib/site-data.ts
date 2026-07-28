import type {
  Hero,
  NavColumn,
  NavLink,
  QuickLinks,
  SpotlightCard,
} from "@/types/content";

const SOURCE_ORIGIN = "https://mitibm.mit.edu";

/**
 * Navigation model shared by the header rail, the open mega-menu, and the
 * footer. Colors match the theme: Research=crimson, News=#b12870,
 * Inside the lab=#be2fa8.
 */
export const SECTIONS: NavColumn[] = [
  {
    heading: "Research",
    ruleColor: "#a31f34",
    links: [
      { label: "Featured", href: "/research" },
      {
        label: "Call for Proposals",
        href: `${SOURCE_ORIGIN}/research/call-for-proposals/`,
        external: true,
      },
      {
        label: "Search",
        href: `${SOURCE_ORIGIN}/research/search/`,
        external: true,
      },
    ],
  },
  {
    heading: "News",
    ruleColor: "#b12870",
    links: [
      { label: "News", href: "/news" },
      {
        label: "Newsletters & Annual Reports",
        href: `${SOURCE_ORIGIN}/news/newsletters/`,
        external: true,
      },
    ],
  },
  {
    heading: "Inside the lab",
    ruleColor: "#be2fa8",
    links: [
      { label: "Inside the lab", href: "/about" },
      { label: "People", href: "/about/people" },
      { label: "Contact", href: "/about/contact" },
    ],
  },
];

/** Top-level destination for each section rail label. */
export const SECTION_HREFS: Record<string, string> = {
  Research: "/research",
  News: "/news",
  "Inside the lab": "/about",
};

export const SEARCH_HREF = `${SOURCE_ORIGIN}/?s=`;
export const EMAIL_HREF = "/about/contact";
export const HOME_HREF = "/";
export const HOME_WORDMARK = "MIT-IBM Computing Research Lab";

/** Footer's right-hand affiliations + social. */
export const AFFILIATIONS: NavColumn[] = [
  {
    heading: "Research",
    ruleColor: "#3b5de8",
    links: [
      { label: "MIT", href: "https://www.mit.edu/", external: true },
      {
        label: "IBM Research",
        href: "https://www.research.ibm.com/",
        external: true,
      },
    ],
  },
  {
    heading: "News",
    ruleColor: "#4f56de",
    links: [{ label: "X", href: "https://twitter.com/MITIBMLab", external: true }],
  },
  {
    heading: "Inside the lab",
    ruleColor: "#624fd5",
    links: [],
  },
];

export const FOOTER_ADDRESS: NavLink = {
  label: "314 Main St.\nCambridge, MA\n02141",
  href: "https://www.google.com/maps/place/MIT-IBM+Watson+AI+Lab/@42.3622262,-71.0894394,17z/data=!3m1!4b1!4m6!3m5!1s0x89e3712766849e03:0xf2ec6bd3e1926f39!8m2!3d42.3622223!4d-71.0868591!16s%2Fg%2F11swmvb7gh",
  external: true,
};

export const FOOTER_LEGAL: NavLink[] = [
  { label: "Privacy", href: "https://www.mitibm.mit.edu/privacy", external: true },
  {
    label: "Accessibility",
    href: "https://accessibility.mit.edu/",
    external: true,
  },
];

/* ---- Home page content ---- */

export const HERO: Hero = {
  headline: [
    { text: "Harmonizing Intelligence", color: "#3b5de8" },
    { text: "for Industry, Energy, and Life.", color: "#be2fa8" },
  ],
  intro: "Welcome to the MIT-IBM Computing Research Lab",
  desktopImage: {
    src: "/images/MIT-IBM_About-hero.png",
    alt: "",
    width: 1232,
    height: 768,
  },
  mobileImage: {
    src: "/images/MIT-IBM_About-hero-mobile-1244x1330.png",
    alt: "",
    width: 1244,
    height: 1330,
  },
};

export const INTRO_LEAD: { before: string; link: NavLink; after: string } = {
  before: "We are a research community from MIT and IBM advancing the frontiers of computation. ",
  link: { label: "Our work", href: "/research", color: "#be2fa8" },
  after:
    " spans AI, algorithms, and quantum computing to develop new paradigms and methods that drive scientific discovery and create impact at scale.",
};

export const INTRO_CTA: NavLink = {
  label: "Inside the Lab",
  href: "/about",
  arrow: true,
  color: "#be2fa8",
};

export const SPOTLIGHT: SpotlightCard[] = [
  {
    category: "News",
    title:
      "The MIT-IBM Computing Research Lab launches to shape the future of AI and quantum computing",
    date: "04/29/2026",
    source: "MIT Schwarzman College of Computing and IBM",
    href: "/news",
    image: {
      src: "/images/MIT-Dome-768x575.png",
      alt: "The MIT dome framed by trees",
      width: 768,
      height: 575,
    },
  },
  {
    category: "News",
    title: "MIT researchers teach AI models to interpret charts",
    date: "06/03/2026",
    source: "MIT News",
    href: "/news",
    image: {
      src: "/images/MIT-ChartNet-01-press_0-768x512.jpg",
      alt: "Illustration of charts emerging from a laptop",
      width: 768,
      height: 512,
    },
  },
  {
    category: "News",
    title: 'Teaching AI agents to ask better questions by playing "Battleship"',
    date: "06/03/2026",
    source: "MIT News",
    href: "/news",
    image: {
      src: "/images/Co-Battleship3-768x512.png",
      alt: "Two robots seated at a laptop with speech bubbles",
      width: 768,
      height: 512,
    },
  },
  {
    category: "News",
    title: "IBM charts a new research path with MIT",
    date: "05/11/2026",
    source: "IBM Research",
    href: "/news",
    image: {
      src: "/images/mitibm-lab-768x429.png",
      alt: "Interior of the MIT-IBM lab",
      width: 768,
      height: 429,
    },
  },
  {
    category: "News",
    title: "Building the future of computing, together",
    date: "04/29/2026",
    source: "IBM Research",
    href: "/news",
    image: {
      src: "/images/Building-the-future-of-computing-together-768x429.png",
      alt: "A quantum computing apparatus",
      width: 768,
      height: 429,
    },
  },
  {
    category: "News",
    title: "A faster way to estimate AI power consumption",
    date: "04/27/2026",
    source: "MIT News",
    href: "/news",
    image: {
      src: "/images/MIT_Power-Estimation-01_0-768x512.jpg",
      alt: "A data center corridor lined with server racks",
      width: 768,
      height: 512,
    },
  },
];

export const QUICK_LINKS: QuickLinks = {
  label: "Quick links",
  links: [
    { label: "News", href: "/news", arrow: true },
    { label: "Research", href: "/research", arrow: true },
    { label: "People", href: "/about/people", arrow: true },
  ],
};
