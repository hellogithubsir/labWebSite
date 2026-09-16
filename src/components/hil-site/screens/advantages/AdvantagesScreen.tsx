"use client";

import Image from "next/image";
import { advantagesContent } from "@/content/hil-site/advantages";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { AdvantageDiagram } from "./AdvantageDiagram";
import styles from "./AdvantagesScreen.module.css";

export function AdvantagesScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = advantagesContent[locale], shared = sharedContent[locale];
  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="advantages-hero">
      <div className={styles.container}>
        <Image className={styles.logo} src="/images/hil-site/shared/logo-compact.png" alt={shared.logoAlt} width={540} height={233} priority />
        <div className={styles.heroGrid}>
          <div>
            <h1 className={styles.eyebrow}>{shared.titles.advantages}</h1>
            <p className={styles.headline}>{copy.headline[0]}<span>{copy.headline[1]}</span></p>
            <p className={styles.intro}>{copy.intro}</p>
          </div>
          <AdvantageDiagram kind="hero" labels={copy.heroLabels} description={copy.heroDescription} />
        </div>
      </div>
    </header>
    {(["core", "frontier"] as const).map((group) => <section key={group} aria-labelledby={`advantages-${group}-title`} data-od-id={`advantages-${group}`}>
      <div className={`${styles.groupHeading} ${group === "frontier" ? styles.pale : ""}`}>
        <div className={styles.container}>
          <h2 id={`advantages-${group}-title`}>{group === "core" ? copy.coreLabel : copy.frontierLabel}</h2>
          {group === "frontier" && <p>{copy.frontierNote}</p>}
        </div>
      </div>
      {copy.items.slice(group === "core" ? 0 : 3, group === "core" ? 3 : 8).map((item) => <article key={item.id}
        className={`${styles.item} ${["a02", "a06"].includes(item.id) ? styles.dark : ["a04", "a08"].includes(item.id) ? styles.pale : ""}`}
        aria-labelledby={`advantage-title-${item.id}`} data-od-id={`advantage-${item.id}`}>
        <div className={styles.container}><ScrollReveal className={styles.itemGrid}>
          <div className={styles.copy}>
            <span className={styles.number} aria-hidden="true">{item.id.slice(1)}</span>
            <div>
              <h3 id={`advantage-title-${item.id}`}>{item.title}</h3>
              <p className={styles.value} data-advantage-value>{item.value}</p>
              <p className={styles.description} data-advantage-description>{item.description}</p>
            </div>
          </div>
          <AdvantageDiagram kind={item.diagram} labels={item.labels} description={item.diagramDescription} />
        </ScrollReveal></div>
      </article>)}
    </section>)}
    <footer className={`${styles.footer} ${styles.dark}`} data-od-id="site-footer">
      <div className={styles.container}>
        <div className={styles.footerGrid}><div><h2>{copy.footerTitle}</h2><p>{copy.footerBody}</p></div>
          <div className={styles.actions}>
            <button type="button" onClick={() => onNavigate("projects")}>{copy.projects}<span aria-hidden="true">↗</span></button>
            <button type="button" onClick={() => onNavigate("contact")}>{copy.contact}<span aria-hidden="true">↗</span></button>
          </div>
        </div>
        <div className={styles.meta}><span>© 2026 Harmonizing Intelligence Lab</span><a href="mailto:chawjk@ukm.edu.my">chawjk@ukm.edu.my</a></div>
      </div>
    </footer>
  </div>;
}
