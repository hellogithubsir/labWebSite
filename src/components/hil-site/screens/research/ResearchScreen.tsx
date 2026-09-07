"use client";

import Image from "next/image";
import { useRef } from "react";
import { researchContent } from "@/content/hil-site/research";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./ResearchScreen.module.css";

const media = [{ key: "health", width: 725, height: 870 }, { key: "edge", width: 500, height: 720 }, { key: "agent", width: 790, height: 850 }];
export function ResearchScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = researchContent[locale];
  const shared = sharedContent[locale];
  const pillars = useRef<HTMLDivElement>(null);
  function explore() {
    pillars.current?.focus({ preventScroll: true });
    pillars.current?.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }
  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="research-hero">
      <div className={styles.heroCopy}>
        <Image className={styles.logo} src="/images/hil-site/shared/logo.png" alt={shared.logoAlt} width={1486} height={642} priority />
        <p className={styles.eyebrow}>{shared.labels.research}</p><h1>{shared.titles.research}</h1>
        <p className={styles.lead}>{copy.lead}</p><p className={styles.intro}>{copy.intro}</p>
        <button className={styles.button} onClick={explore} data-od-id="research-explore">{copy.explore}</button>
      </div>
      <Image className={styles.heroArt} src="/images/hil-site/research/hero-research.png" alt="" width={930} height={1045} priority />
    </header>
    <ol className={styles.sections}>{copy.sections.map((section, i) => <li key={section}><span>{String(i + 1).padStart(2, "0")}</span>{section}</li>)}</ol>
    <section className={styles.overview} data-od-id="research-overview"><ScrollReveal className={`${styles.container} ${styles.overviewGrid}`}>
      <div><h2>{copy.overview}</h2><p>{copy.overviewBody}</p></div>
      <dl>{copy.facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
    </ScrollReveal></section>
    <div id="research-pillars" ref={pillars} tabIndex={-1}>
      {copy.pillars.map((pillar, i) => <section className={`${styles.pillar} ${styles[pillar.key]}`} key={pillar.key} data-od-id={`research-${pillar.key}`}>
        <div className={`${styles.container} ${styles.pillarGrid}`}>
          <ScrollReveal><p className={styles.eyebrow}>{pillar.code}</p><h2>{pillar.title}</h2><p className={styles.definition}>{pillar.definition}</p>
            <dl className={styles.fields}>{[pillar.questions, pillar.research, pillar.applications].map((value, index) => <div key={copy.fieldLabels[index]}><dt>{copy.fieldLabels[index]}</dt><dd>{value}</dd></div>)}</dl>
            <p className={styles.projects}>{copy.fieldLabels[3]}: {pillar.projects}</p>
          </ScrollReveal>
          <ScrollReveal className={styles.visual}><Image src={`/images/hil-site/research/${media[i].key}-visual.png`} alt="" width={media[i].width} height={media[i].height} sizes="(max-width: 980px) 100vw, 45vw" />{pillar.key === "edge" && <p className={styles.edgeCaption}>{copy.edgeCaption}</p>}</ScrollReveal>
        </div>
      </section>)}
    </div>
    <section className={styles.relationships} data-od-id="research-relationships"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>{copy.relationLabel}</p><h2>{copy.relationTitle}</h2><p className={styles.sectionIntro}>{copy.relationBody}</p></ScrollReveal>
      <div className={styles.relationGrid}>{copy.relations.map(([title, description], i) => <ScrollReveal key={title}><article className={styles[media[i].key]}>
        <Image src={`/images/hil-site/research/relationship-${media[i].key}.png`} alt={title} width={i === 1 ? 429 : 430} height={255} sizes="(max-width: 980px) 100vw, 30vw" />
        <p className={styles.eyebrow}>{copy.pillars[i].code}</p><h3>{title}</h3><p>{description}</p>
      </article></ScrollReveal>)}</div>
    </div></section>
    <section className={styles.mapping} data-od-id="research-mapping"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>{copy.mappingLabel}</p><h2>{copy.mappingTitle}</h2><p className={styles.sectionIntro}>{copy.mappingIntro}</p></ScrollReveal>
      <dl>{copy.mapping.map((text, i) => <ScrollReveal key={media[i].key}><div className={styles[media[i].key]}><dt>{copy.pillars[i].code}</dt><dd>{text}</dd></div></ScrollReveal>)}</dl>
    </div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => onNavigate("contact")} /></div>
  </div>;
}
