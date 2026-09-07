import Image from "next/image";
import { homeOverviewContent } from "@/content/hil-site/home";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./HomeScreen.module.css";

const photos = [["vision", 467, 305], ["hardware", 478, 305], ["prototype", 472, 305], ["environment", 1457, 278]] as const;

export function HomeOverviewSections({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const c = homeOverviewContent[locale];
  return <>
    <section className={styles.projectsSection} aria-labelledby="home-projects-title" data-od-id="home-projects">
      <div className={styles.container}>
        <ScrollReveal><h2 id="home-projects-title" className={styles.projectsTitle}><button className={styles.headingLink} onClick={() => onNavigate("projects")}>{c.projectsTitle}</button></h2><p className={styles.overviewLede}>{c.projectsLede}</p></ScrollReveal>
        <div className={styles.projectGrid}>
          <ScrollReveal className={styles.projectFeature}><article>
            <p className={styles.featuredLabel}>{c.featured}</p>
            <div className={styles.featureCopy}><h3>{c.projects[0][0]}</h3><p>{c.projects[0][1]}</p></div>
            <Image className={styles.projectArt} src="/images/hil-site/home/selected-project-art.png" width={504} height={550} alt={c.projectAlt} />
          </article></ScrollReveal>
          <div className={styles.projectStack}>{c.projects.slice(1).map(([title, body]) => <ScrollReveal key={title}><article><h3>{title}</h3><p>{body}</p></article></ScrollReveal>)}</div>
        </div>
      </div>
    </section>
    <div className={styles.partnersLab}>
      <section className={styles.container} aria-labelledby="home-partners-title" data-od-id="home-partners">
        <ScrollReveal><h2 id="home-partners-title" className={styles.sectionTitle}><button className={styles.headingLink} onClick={() => onNavigate("partners")}>{c.partnersTitle}</button></h2><p className={styles.overviewLede}>{c.partnersLede}</p></ScrollReveal>
        <ScrollReveal><ul className={styles.partnerNames}>{c.partners.map(name => <li key={name}>{name}</li>)}</ul></ScrollReveal>
      </section>
      <section className={styles.container} aria-labelledby="home-lab-title" data-od-id="home-lab">
        <ScrollReveal><h2 id="home-lab-title" className={styles.labTitle}>{c.labTitle}</h2><p className={styles.labLede}>{c.labLede}</p></ScrollReveal>
        <div className={styles.labGrid}>{photos.map(([name, width, height], index) => <ScrollReveal className={index === 3 ? styles.labPanorama : ""} key={name}><figure className={styles.labPhoto}>
          <Image src={`/images/hil-site/shared/lab-${name}.png`} alt={c.photos[index][2]} width={width} height={height} />
          <figcaption><strong>{c.photos[index][0]}</strong><p>{c.photos[index][1]}</p></figcaption>
        </figure></ScrollReveal>)}</div>
      </section>
    </div>
    <section className={styles.teamSection} aria-labelledby="home-team-title" data-od-id="home-team">
      <div className={`${styles.container} ${styles.teamGrid}`}>
        <ScrollReveal><h2 id="home-team-title" className={styles.teamTitle}><button className={styles.headingLink} onClick={() => onNavigate("team")}>{c.teamTitle}</button></h2><p className={styles.overviewLede}>{c.teamLede}</p></ScrollReveal>
        <ul className={styles.members}>{c.members.map(([name, role]) => <li key={name}><ScrollReveal><strong>{name}</strong><span>{role}</span></ScrollReveal></li>)}</ul>
      </div>
    </section>
    <div data-od-id="home-footer"><SiteFooter title={c.footerTitle} body={c.footerBody} onContact={() => onNavigate("contact")} /></div>
  </>;
}
