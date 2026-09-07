"use client";

import Image from "next/image";
import { useState } from "react";
import { teamContent, type MemberFilter } from "@/content/hil-site/team";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./TeamScreen.module.css";

const filters: MemberFilter[] = ["all", "graduate", "candidate"];

export function TeamScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  const copy = teamContent[locale], shared = sharedContent[locale];
  const [filter, setFilter] = useState<MemberFilter>("all");
  const members = copy.members.filter(member => filter === "all" || member.type === filter);

  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="team-hero"><div className={styles.container}>
      <Image className={styles.logo} src="/images/hil-site/shared/logo.png" alt={shared.logoAlt} width={1486} height={642} priority />
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>{shared.labels.team}</p><h1>{shared.titles.team}</h1></div><p className={styles.lead}>{copy.intro}</p></div>
    </div></header>
    <section className={styles.introduction} aria-labelledby="team-introduction-title" data-od-id="team-introduction"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.introLabel}</p><h2 id="team-introduction-title">{copy.introTitle}</h2><p className={styles.statement}>{copy.statement}</p>
    </ScrollReveal></div></section>
    <section className={styles.leadership} aria-labelledby="team-leadership-title" data-od-id="team-leadership"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>{copy.leadershipLabel}</p><h2 id="team-leadership-title">{copy.leadershipTitle}</h2></ScrollReveal>
      <ScrollReveal><article className={styles.leader} aria-labelledby="team-pi-name" data-od-id="team-pi">
        <div><p className={styles.eyebrow} id="team-pi-name">{copy.piName}</p><h3>{copy.piRole.map(role => <span key={role}>{role}</span>)}</h3><p className={styles.affiliation}>{copy.affiliation}</p><p className={styles.interests}>{copy.interests}</p><p className={styles.biography}>{copy.bio}</p>
          <dl className={styles.meta}><div><dt>{copy.areasLabel}</dt><dd>{copy.areas}</dd></div><div><dt>{copy.outputsLabel}</dt><dd>{copy.outputs}</dd></div></dl>
        </div><div className={styles.portrait}><Image src="/images/hil-site/team/principal-investigator.png" alt={copy.piAlt} width={427} height={590} sizes="(max-width: 980px) 90vw, 440px" /></div>
      </article></ScrollReveal>
      <ScrollReveal><div className={styles.profiles}>{copy.profiles.map((profile, index) => <article key={index} data-od-id={`team-leader-${index + 2}`}><h3>{profile.name}</h3><strong>{profile.role}</strong>{profile.interests && <p className={styles.profileInterests}>{profile.interests}</p>}<p>{profile.bio}</p></article>)}</div></ScrollReveal>
    </div></section>
    <section className={styles.composition} aria-labelledby="team-composition-title" data-od-id="team-composition"><div className={styles.container}><ScrollReveal>
      <p className={styles.eyebrow}>{copy.compositionLabel}</p><h2 id="team-composition-title">{copy.compositionTitle}</h2><dl className={styles.metrics}>{copy.metrics.map(metric => <div key={metric.label}><dd>{metric.count}</dd><dt>{metric.label}</dt><dd>{metric.note}</dd></div>)}</dl>
    </ScrollReveal></div></section>
    <section className={styles.directory} aria-labelledby="team-members-title" data-od-id="team-members"><div className={styles.container}>
      <ScrollReveal><p className={styles.eyebrow}>{copy.membersLabel}</p><h2 id="team-members-title">{copy.membersTitle}</h2><p className={styles.lead}>{copy.membersIntro}</p>
        <div className={styles.filters} role="group" aria-label={copy.filterLabel}>{filters.map((value, index) => <button type="button" key={value} aria-pressed={filter === value} onClick={() => setFilter(value)} data-od-id={`team-filter-${value}`}>{copy.filters[index]}</button>)}</div>
      </ScrollReveal>
      <div className={styles.members} key={filter}>{members.map(member => <article className={styles.member} key={member.id} data-od-id={`team-${member.id.toLowerCase()}`} data-member-type={member.type}>
        <span>{member.id}</span><h3>{member.name}</h3><dl><div><dt>{copy.statusLabel}</dt><dd>{member.status}</dd></div><div><dt>{copy.bioLabel}</dt><dd>{member.bio}</dd></div></dl>
      </article>)}</div>
    </div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => onNavigate("contact")} /></div>
  </div>;
}
