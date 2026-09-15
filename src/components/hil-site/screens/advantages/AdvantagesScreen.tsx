"use client";

import Image from "next/image";
import { useState } from "react";
import { advantagesContent } from "@/content/hil-site/advantages";
import { homeContent } from "@/content/hil-site/home";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./AdvantagesScreen.module.css";

function FrontierItem({ index, title, body }: { index: number; title: string; body: string }) {
  const [expanded, setExpanded] = useState(false);
  const id = `advantage-panel-${index}`;
  return <article className={styles.frontierItem} data-od-id={`advantage-a0${index}`}>
    <h3><button id={`advantage-toggle-${index}`} type="button" aria-expanded={expanded} aria-controls={id} onClick={() => setExpanded(!expanded)}>
      <strong>{title}</strong><b aria-hidden="true">+</b>
    </button></h3>
    <div id={id} role="region" aria-labelledby={`advantage-toggle-${index}`} aria-hidden={!expanded} inert={!expanded} className={styles.panel} data-expanded={expanded}>
      <div><p>{body}</p></div>
    </div>
  </article>;
}

export function AdvantagesScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = advantagesContent[locale], shared = sharedContent[locale];
  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="advantages-hero"><div className={styles.container}>
      <Image className={styles.logo} src="/images/hil-site/shared/logo.png" alt={shared.logoAlt} width={1486} height={642} priority />
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>{shared.labels.advantages}</p><h1>{shared.titles.advantages}</h1></div><p className={styles.lead}>{copy.intro}</p></div>
    </div></header>
    <section className={styles.core} aria-labelledby="advantages-core-title" data-od-id="advantages-core"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.core[0]}</p><h2 id="advantages-core-title">{copy.core[1]}</h2><p className={styles.lead}>{copy.core[2]}</p>
      <div className={styles.rows}>{copy.methods.map((method, index) => <article className={styles.row} key={method} data-od-id={`advantage-a0${index + 1}`}>
        <span className={styles.number}>0{index + 1}</span><h3>{homeContent[locale].capabilities[index][0]}</h3>
        <div className={styles.cell}><span>{copy.method}</span><p>{method}</p></div>
        <div className={styles.cell}><span>{copy.advantage}</span><strong>{copy.values[index]}</strong></div>
      </article>)}</div>
    </ScrollReveal></div></section>
    <section className={styles.evidence} aria-labelledby="advantages-evidence-title" data-od-id="advantages-evidence"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.evidence[0]}</p><h2 id="advantages-evidence-title">{copy.evidence[1]}</h2>
      <div className={styles.photos}>{copy.photos.map(([caption, body, alt], index) => <figure key={caption}>
        <Image src={`/images/hil-site/shared/lab-${["vision", "hardware", "prototype"][index]}.png`} alt={alt} width={[467, 478, 472][index]} height={305} sizes="(max-width: 980px) 90vw, 25vw" />
        <figcaption><strong>{caption}</strong><p>{body}</p></figcaption>
      </figure>)}</div>
    </ScrollReveal></div></section>
    <section className={styles.frontier} aria-labelledby="advantages-frontier-title" data-od-id="advantages-frontier"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.frontier[0]}</p><h2 id="advantages-frontier-title">{copy.frontier[1]}</h2>
      <div className={styles.frontierGrid}>{copy.capabilities.map(([title, body], index) => <FrontierItem key={index} index={index + 4} title={title} body={body} />)}</div>
    </ScrollReveal></div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => onNavigate("contact")} /></div>
  </div>;
}
