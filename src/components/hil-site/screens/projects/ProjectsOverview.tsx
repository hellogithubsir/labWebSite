import Image from "next/image";
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
    <section className={styles.overview} data-od-id="projects-overview"><ScrollReveal className={`${styles.container} ${styles.overviewGrid}`}>
      <div><p className={styles.eyebrow}>{copy.selected}</p><h2>{copy.overview}</h2><p>{copy.intro}</p></div>
      <div className={styles.systems}>{copy.systems.map(([title, body], i) => <article key={title}><strong>0{i + 1}</strong><h3>{title}</h3><p>{body}</p></article>)}</div>
    </ScrollReveal></section>
  </>;
}
