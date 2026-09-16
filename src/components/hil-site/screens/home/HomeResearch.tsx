import Image from "next/image";
import { advantagesContent } from "@/content/hil-site/advantages";
import { homeContent } from "@/content/hil-site/home";
import type { Locale } from "@/content/hil-site/types";
import { ScrollReveal } from "../../ScrollReveal";
import styles from "./HomeScreen.module.css";

const pillars = { en: ["HEALTH", "EDGE-AI", "AGENT"], "zh-CN": ["数字健康", "边缘智能", "智能体"] };
const capabilityIds = ["a01", "a02", "a03"] as const;
const marks = ["health", "edge", "agent"];

export function HomeResearch({ locale }: { locale: Locale }) {
  const content = homeContent[locale];
  const capabilities = capabilityIds.map(id => advantagesContent[locale].items.find(item => item.id === id)!);
  return <>
    <section className={`${styles.section} ${styles.research}`} aria-labelledby="home-research-title" data-od-id="home-research">
      <div className={styles.container}>
        <ScrollReveal><h2 id="home-research-title" className={styles.sectionTitle}>{content.researchTitle.map((line) => <span key={line}>{line}</span>)}</h2>
          <p className={styles.lede}>{content.researchLede}</p></ScrollReveal>
        <div className={styles.band}>{content.directions.map(([title, text], index) => <ScrollReveal key={marks[index]} className={styles.direction}>
          <article data-od-id={`home-direction-${marks[index]}`}>
            <p className={styles.code}>0{index + 1} / {pillars[locale][index]}</p>
            <Image src={`/images/hil-site/home/${marks[index]}-mark.png`} alt="" aria-hidden="true" width={116} height={120} className={styles.mark} />
            <h3>{title}</h3><p className={styles.description}>{text}</p>
          </article>
        </ScrollReveal>)}</div>
      </div>
    </section>
    <section className={styles.section} aria-labelledby="home-capabilities-title" data-od-id="home-capabilities">
      <div className={styles.container}>
        <ScrollReveal><h2 id="home-capabilities-title" className={styles.sectionTitle}>{content.capabilityTitle.map((line) => <span key={line}>{line}</span>)}</h2>
          </ScrollReveal>
        <div className={styles.capabilities}>{capabilities.map(({ id, title, description }, index) => <ScrollReveal key={id}>
          <article className={styles.capability} data-od-id={`home-capability-${index + 1}`}><span className={styles.type}>{content.types[index]}</span><h3>{title}</h3><p>{description}</p></article>
        </ScrollReveal>)}</div>
      </div>
    </section>
  </>;
}
