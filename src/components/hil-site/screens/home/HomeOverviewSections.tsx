import Image from "next/image";
import { getSelectedProjects } from "@/content/hil-site/projects";
import { partners } from "@/content/hil-site/partners";
import { teamContent } from "@/content/hil-site/team";
import { homeOverviewContent } from "@/content/hil-site/home";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./HomeScreen.module.css";

const partnerIds = ["advantech", "hilti", "tokio-dynafront", "xmum", "leeds-beckett", "three-opp"];
const selectedPartners = partnerIds.map(id => partners.find(partner => partner.id === id)!);

const photos = [["vision", 467, 305], ["hardware", 478, 305], ["prototype", 472, 305], ["environment", 1457, 278]] as const;

export function HomeOverviewSections({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const c = homeOverviewContent[locale], team = teamContent[locale];
  const leaders = [{ name: team.piName, role: team.piRole.join(" / ") }, ...team.profiles];
  return <>
    <section className={styles.projectsSection} aria-labelledby="home-projects-title" data-od-id="home-projects">
      <div className={styles.container}>
        <ScrollReveal><h2 id="home-projects-title" className={styles.projectsTitle}><button className={styles.headingLink} onClick={() => onNavigate("projects")}>{c.projectsTitle}</button></h2><p className={styles.overviewLede}>{c.projectsLede}</p></ScrollReveal>
        <div className={styles.projectGrid}>
          {getSelectedProjects(locale).map(project => <ScrollReveal key={project.id}>
            <article className={styles.projectCard} data-od-id={`home-project-${project.id}`}>
              <h3>{project.title}</h3><p>{project.description}</p>
              <Image className={styles.projectImage} src={`/images/hil-site/projects/${project.image.file}`} width={project.image.width} height={project.image.height} alt={project.image.alt} sizes="(max-width: 980px) 90vw, 45vw" />
            </article>
          </ScrollReveal>)}
        </div>
      </div>
    </section>
    <div className={styles.partnersLab}>
      <section className={styles.container} aria-labelledby="home-partners-title" data-od-id="home-partners">
        <ScrollReveal><h2 id="home-partners-title" className={styles.sectionTitle}><button className={styles.headingLink} onClick={() => onNavigate("partners")}>{c.partnersTitle}</button></h2><p className={styles.overviewLede}>{c.partnersLede}</p></ScrollReveal>
        <ScrollReveal><ul className={styles.partnerNames}>{selectedPartners.map(partner => <li key={partner.id}>{partner.name[locale]}</li>)}</ul></ScrollReveal>
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
        <ul className={styles.members}>{leaders.map(({name, role}) => <li key={name}><ScrollReveal><strong>{name}</strong><span>{role}</span></ScrollReveal></li>)}</ul>
      </div>
    </section>
    <div data-od-id="home-footer"><SiteFooter title={c.footerTitle} body={c.footerBody} onContact={() => onNavigate("contact")} /></div>
  </>;
}
