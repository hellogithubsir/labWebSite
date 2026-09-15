import Image from "next/image";
import { projectDirectory } from "@/content/hil-site/project-directory";
import { projectsContent } from "@/content/hil-site/projects";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import { ScrollReveal } from "../../ScrollReveal";
import styles from "./ProjectsScreen.module.css";

export function ProjectsOverview({ locale }: { locale: Locale }) {
  const copy = projectsContent[locale];
  const shared = sharedContent[locale];
  return <>
    <header className={styles.hero} data-od-id="projects-hero"><div className={styles.container}>
      <Image className={styles.logo} src="/images/hil-site/shared/logo.png" alt={shared.logoAlt} width={1486} height={642} priority />
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>{shared.labels.projects}</p><h1>{shared.titles.projects}</h1></div><p>{copy.lead}</p></div>
    </div></header>
    <section className={styles.overview} data-od-id="projects-overview" aria-labelledby="capabilities-title"><ScrollReveal className={styles.container}>
      <p className={styles.eyebrow}>01 / {copy.overview}</p><h2 id="capabilities-title">{copy.overview}</h2>
      <div className={styles.systems}>{projectDirectory[locale].map((category, i) => <article key={category.id} data-od-id={`capability-${category.id}`}><strong>0{i + 1}</strong><h3>{category.title}</h3><p>{category.description}</p><button type="button" onClick={() => {
        const heading = document.getElementById(`catalog-${category.id}-title`);
        heading?.focus({ preventScroll: true });
        heading?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
      }}>{locale === "zh-CN" ? "查看相关项目" : "View related projects"}<span aria-hidden="true"> ↗</span></button></article>)}</div>
    </ScrollReveal></section>
  </>;
}
