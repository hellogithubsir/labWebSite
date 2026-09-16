import Image from "next/image";
import { homeContent } from "@/content/hil-site/home";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import styles from "./HomeScreen.module.css";

export function HomeHero({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const content = homeContent[locale];
  const shared = sharedContent[locale];
  return <>
    <header className={styles.hero} data-od-id="home-hero">
      <div className={styles.heroCopy}>
        <Image src="/images/hil-site/shared/logo-compact.png" alt={shared.logoAlt} width={540} height={233} className={styles.logo} priority />
        <ScrollReveal>
          <p className={styles.eyebrow}>{shared.logoAlt}</p>
          <h1 className={styles.title}>{locale === "en" ? shared.titles.home.split(/ (?=and Machine|at the Edge)/).map((line, index) => <span className={styles.titleLine} key={line}>{index > 0 ? " " : ""}{line}</span>) : shared.titles.home}</h1>
          <p className={styles.body}>{content.body}</p>
          <div className={styles.actions}>
            <button className={styles.button} onClick={() => onNavigate("research")} data-od-id="home-explore">{shared.exploreResearch}</button>
            <button className={`${styles.button} ${styles.secondary}`} onClick={() => onNavigate("contact")} data-od-id="home-collaborate">{shared.collaborate}</button>
          </div>
        </ScrollReveal>
      </div>
      <Image src="/images/hil-site/home/hero-art.png" alt="" aria-hidden="true" width={1270} height={760} className={styles.art} priority />
    </header>
    <div className={styles.principles} data-od-id="home-principles">
      {content.principles.map(([title, text], index) => <div className={styles.principle} key={index}>
        <span aria-hidden="true" className={styles.number}>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div>
      </div>)}
    </div>
  </>;
}
