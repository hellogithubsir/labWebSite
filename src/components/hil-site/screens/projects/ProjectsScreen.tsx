"use client";

import { projectsContent } from "@/content/hil-site/projects";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import { ProjectCarousel } from "./ProjectCarousel";
import { ProjectsOverview } from "./ProjectsOverview";
import styles from "./ProjectsScreen.module.css";

export function ProjectsScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = projectsContent[locale];
  return <div className={styles.screen}>
    <ProjectsOverview locale={locale} />
    <section className={styles.project} aria-labelledby="elinus-title" data-od-id="projects-elinus"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>01 / {copy.systems[0][0]}</p><h2 id="elinus-title">{copy.elinusTitle}</h2><p className={styles.lead}>{copy.elinusIntro}</p></ScrollReveal>
      <ProjectCarousel slides={copy.slides} labels={copy.labels} categories={copy.categories} locale={locale} />
    </div></section>
    <section className={`${styles.project} ${styles.pdm}`} aria-labelledby="pdm-title" data-od-id="projects-pdm"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>02 / {copy.systems[1][0]}</p><h2 id="pdm-title">{copy.pdmTitle}</h2><p className={styles.lead}>{copy.pdmIntro}</p></ScrollReveal>
      <ProjectCarousel slides={copy.pdmSlides} labels={copy.pdmLabels} categories={copy.pdmCategories} locale={locale} initialIndex={1} />
    </div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => onNavigate("contact")} /></div>
  </div>;
}
