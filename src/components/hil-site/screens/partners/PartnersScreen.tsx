import Image from "next/image";
import { partners, partnersContent } from "@/content/hil-site/partners";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./PartnersScreen.module.css";

export function PartnersScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = partnersContent[locale], shared = sharedContent[locale];
  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="partners-hero"><div className={styles.container}>
      <Image className={styles.logo} src="/images/hil-site/shared/logo.png" alt={shared.logoAlt} width={1486} height={642} priority />
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>{shared.labels.partners}</p><h1>{shared.titles.partners}</h1></div><p className={styles.lead}>{copy.intro}</p></div>
    </div></header>
    <section className={styles.introduction} aria-labelledby="partners-introduction-title" data-od-id="partners-introduction"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.introductionLabel}</p><h2 id="partners-introduction-title">{copy.introductionTitle}</h2><p className={styles.statement}>{copy.introduction}</p>
    </ScrollReveal></div></section>
    <section className={styles.directory} aria-labelledby="partners-directory-title" data-od-id="partners-directory"><div className={styles.container}><ScrollReveal>
      <h2 id="partners-directory-title">{copy.directoryTitle}</h2>
      <div className={styles.wall}>{partners.map(partner => <article className={styles.card} key={partner.id} data-od-id={`partner-${partner.id}`}>
        <div className={styles.marks}>{partner.logos.map(logo => <div key={logo.src} className={logo.dark ? styles.darkMark : styles.mark}>
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} unoptimized className={styles.partnerLogo} />
        </div>)}</div><h3>{partner.name[locale]}</h3>
      </article>)}</div>
    </ScrollReveal></div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => onNavigate("contact")} /></div>
  </div>;
}
