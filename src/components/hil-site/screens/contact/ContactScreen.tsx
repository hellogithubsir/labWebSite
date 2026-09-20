"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { contactContent, contactEmail, contactProfileUrl } from "@/content/hil-site/contact";
import { projectDirectory } from "@/content/hil-site/project-directory";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import { ScrollReveal } from "../../ScrollReveal";
import { SiteFooter } from "../../SiteFooter";
import styles from "./ContactScreen.module.css";
export function ContactScreen({ locale }: { locale: Locale }) {

  const copy = contactContent[locale], shared = sharedContent[locale];
  const email = useRef<HTMLAnchorElement>(null);
  const details = useRef<HTMLElement>(null);
  const copyTimer = useRef<number | undefined>(undefined);
  const [copied, setCopied] = useState(false);
  useEffect(() => () => window.clearTimeout(copyTimer.current), []);
  const heading = (index: number) => <><p className={styles.eyebrow}>{copy.labels[index]}</p><h2 id={`contact-title-${index}`}>{copy.titles[index]}</h2></>;
  const copyEmail = async () => {
    let ok = true;
    try {
      await navigator.clipboard.writeText(contactEmail);
    } catch {
      const area = document.createElement("textarea");
      area.value = contactEmail;
      area.readOnly = true;
      area.style.position = "fixed";
      area.style.opacity = "0";
      document.body.appendChild(area);
      area.select();
      try {
        ok = document.execCommand("copy");
      } catch {
        ok = false;
      } finally {
        area.remove();
      }
    }
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(copyTimer.current);
    copyTimer.current = window.setTimeout(() => setCopied(false), 2000);
  };
  const scrollToDetails = () => {
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth";
    details.current?.focus({ preventScroll: true });
    details.current?.scrollIntoView({ block: "start", behavior });
  };
  return <div className={styles.screen}>
    <header className={styles.hero} data-od-id="contact-hero"><div className={styles.container}>
      <div className={styles.heroGrid}><div><p className={styles.eyebrow}>{shared.labels.contact}</p><h1>{shared.titles.contact}</h1></div><p className={styles.lead}>{copy.intro}</p></div>
    </div></header>
    <section className={styles.introduction} aria-labelledby="contact-title-0" data-od-id="contact-introduction"><div className={styles.container}><ScrollReveal>{heading(0)}<p className={styles.statement}>{copy.statement}</p></ScrollReveal></div></section>
    <section className={styles.quick} aria-labelledby="contact-quick-title" data-od-id="contact-quick"><div className={styles.container}>
      <ScrollReveal><h2 id="contact-quick-title">{copy.quick.title}</h2><p className={styles.quickNote}>{copy.quick.note}</p><h3 className={styles.quickSub}>{copy.quick.capabilitiesTitle}</h3></ScrollReveal>
      <div className={styles.quickGrid}>{projectDirectory[locale].map((category, index) => <ScrollReveal key={category.id}><article><b>0{index + 1}</b><h4>{category.title}</h4><p>{category.description}</p></article></ScrollReveal>)}</div>
      <ScrollReveal><div className={styles.quickPanel}><div><p className={styles.quickEmailLabel}>{copy.quick.emailLabel}</p><p className={styles.quickEmail}>{contactEmail}</p></div><button type="button" className={styles.copyButton} onClick={copyEmail} data-od-id="contact-copy-email">{copied ? copy.quick.copied : copy.quick.copy}</button><p className={styles.srOnly} role="status">{copied ? copy.quick.copied : ""}</p></div></ScrollReveal>
      <ScrollReveal><button type="button" className={styles.quickLink} onClick={scrollToDetails} data-od-id="contact-quick-details">{copy.quick.details}<span aria-hidden="true"> ↓</span></button></ScrollReveal>
    </div></section>
    <section className={styles.targets} aria-labelledby="contact-title-1" data-od-id="contact-targets"><div className={styles.container}>
      <ScrollReveal>{heading(1)}</ScrollReveal><div className={styles.targetGrid}>{copy.targets.map((target) => <ScrollReveal key={target.title}><article><h3>{target.title}</h3><dl>{target.fields.map(field => <div key={field.label}><dt>{field.label}</dt><dd>{field.body}</dd></div>)}</dl><p className={styles.note}>{target.note}</p></article></ScrollReveal>)}</div>
    </div></section>
    <section className={styles.formats} aria-labelledby="contact-title-2" data-od-id="contact-formats"><div className={styles.container}>
      <ScrollReveal>{heading(2)}<p className={styles.lead}>{copy.formatsIntro}</p></ScrollReveal><div className={styles.formatGrid}>{copy.formats.map((format, index) => <ScrollReveal key={format.title}><article><div className={styles.formatTitle}><b>0{index + 1}</b><h3>{format.title}</h3></div><dl>{format.fields.map(field => <div key={field.label}><dt>{field.label}</dt><dd>{field.body}</dd></div>)}</dl><p className={styles.note}>{format.note}</p></article></ScrollReveal>)}</div>
    </div></section>
    <section className={styles.applications} aria-labelledby="contact-title-3" data-od-id="contact-applications"><div className={styles.container}><ScrollReveal>{heading(3)}</ScrollReveal><ScrollReveal><dl className={styles.applicationGrid}>{copy.applications.map(field => <div key={field.label}><dt>{field.label}</dt><dd>{field.body}</dd></div>)}</dl></ScrollReveal></div></section>
    <section ref={details} tabIndex={-1} className={styles.details} aria-labelledby="contact-title-4" data-od-id="contact-details"><div className={styles.container}><ScrollReveal>{heading(4)}</ScrollReveal><ScrollReveal><dl className={styles.detailGrid}>{copy.details.map((field, index) => <div key={field.label}><dt>{field.label}</dt><dd>{index === 1 ? <a ref={email} href={`mailto:${contactEmail}`} data-od-id="contact-email">{field.body}</a> : index === 3 ? <a href={contactProfileUrl} target="_blank" rel="noopener noreferrer" data-od-id="contact-profile">{field.body}</a> : field.body}</dd></div>)}</dl></ScrollReveal></div></section>
    <section className={styles.preparation} aria-labelledby="contact-title-5" data-od-id="contact-preparation"><div className={styles.container}><ScrollReveal>{heading(5)}</ScrollReveal><div className={styles.preparationGrid}>{copy.preparation.map(field => <ScrollReveal key={field.label}><article><h3>{field.label}</h3><p>{field.body}</p></article></ScrollReveal>)}</div></div></section>
    <section className={styles.visuals} aria-labelledby="contact-title-6" data-od-id="contact-visuals"><div className={styles.container}><ScrollReveal>{heading(6)}</ScrollReveal><ScrollReveal><div className={styles.visualGrid}>{["lab-vision", "lab-prototype"].map((asset, index) => <figure key={asset}><Image src={`/images/hil-site/shared/${asset}.png`} alt={copy.captions[index]} width={index === 0 ? 467 : 472} height={305} sizes="(max-width: 980px) 90vw, 720px" /><figcaption>{copy.captions[index]}</figcaption></figure>)}</div></ScrollReveal></div></section>
    <div className={styles.footer}><SiteFooter title={copy.footerTitle} body={copy.footerBody} onContact={() => { email.current?.focus({ preventScroll: true }); email.current?.scrollIntoView({ block: "center", behavior: "instant" }); }} /></div>
  </div>;
}
