"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";
import { projectDirectory, type DirectoryCategory } from "@/content/hil-site/project-directory";
import type { Locale } from "@/content/hil-site/types";
import styles from "./ProjectDirectory.module.css";

function HighlightedText({ text, phrases }: { text: string; phrases: string[] }) {
  const parts: ReactNode[] = [];
  let cursor = 0;
  while (cursor < text.length) {
    const matches = phrases.filter(Boolean).map(phrase => ({ phrase, position: text.indexOf(phrase, cursor) })).filter(match => match.position >= 0).sort((a, b) => a.position - b.position || b.phrase.length - a.phrase.length);
    const match = matches[0];
    if (!match) { parts.push(text.slice(cursor)); break; }
    if (match.position > cursor) parts.push(text.slice(cursor, match.position));
    parts.push(<strong key={match.position}>{match.phrase}</strong>);
    cursor = match.position + match.phrase.length;
  }
  return <>{parts}</>;
}

function CategoryProjects({ category, locale }: { category: DirectoryCategory; locale: Locale }) {
  const [index, setIndex] = useState(0);
  const [target, setTarget] = useState(0);
  const requested = useRef(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const gallery = useRef<HTMLDivElement>(null);
  const pointer = useRef<{ x: number; y: number; scroll: number; dragging: boolean } | null>(null);
  const count = category.projects.length;
  const chinese = locale === "zh-CN";
  const project = category.projects[index];
  const panelId = `catalog-${category.id}-panel`;
  const tabId = (position: number) => `catalog-${category.id}-tab-${position}`;

  function select(position: number) {
    const next = Math.max(0, Math.min(count - 1, position));
    requested.current = next;
    setTarget(next);
    const element = gallery.current;
    if (!element) return;
    const left = next * element.clientWidth;
    element.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    if (Math.abs(element.scrollLeft - left) < 1) setIndex(next);
  }

  useEffect(() => {
    const element = gallery.current;
    if (!element) return;
    function settle() {
      if (!element || pointer.current?.dragging || element.clientWidth === 0) return;
      const next = Math.max(0, Math.min(count - 1, Math.round(element.scrollLeft / element.clientWidth)));
      requested.current = next;
      setTarget(next);
      setIndex(next);
    }
    let width = element.clientWidth;
    const observer = new ResizeObserver(() => {
      if (element.clientWidth === width) return;
      width = element.clientWidth;
      element.scrollTo({ left: requested.current * width, behavior: "instant" });
      settle();
    });
    observer.observe(element);
    element.addEventListener("scrollend", settle);
    return () => { observer.disconnect(); element.removeEventListener("scrollend", settle); };
  }, [count]);

  useEffect(() => {
    const selected = tabs.current[index];
    const list = selected?.parentElement;
    if (!selected || !list || list.scrollWidth <= list.clientWidth) return;
    const tabBounds = selected.getBoundingClientRect();
    const listBounds = list.getBoundingClientRect();
    if (tabBounds.left < listBounds.left) list.scrollLeft -= listBounds.left - tabBounds.left;
    else if (tabBounds.right > listBounds.right) list.scrollLeft += tabBounds.right - listBounds.right;
  }, [index, locale]);

  function navigate(event: KeyboardEvent<HTMLElement>, focusTab = false) {
    let next = requested.current;
    if (event.key === "ArrowRight") next = Math.min(next + 1, count - 1);
    else if (event.key === "ArrowLeft") next = Math.max(next - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    select(next);
    if (focusTab) tabs.current[next]?.focus({ preventScroll: true });
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    const origin = pointer.current;
    pointer.current = null;
    if (!origin?.dragging) return;
    const element = event.currentTarget;
    element.style.scrollSnapType = "";
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    select(Math.round(element.scrollLeft / element.clientWidth));
  }

  return <section className={styles.category} data-od-id={`catalog-${category.id}`} aria-labelledby={`catalog-${category.id}-title`}><div className={styles.container}>
    <header className={styles.heading}><h3 id={`catalog-${category.id}-title`} tabIndex={-1}>{category.title}</h3><span>{count} {chinese ? "个项目" : "projects"}</span><p>{category.description}</p></header>
    <div className={styles.tabs} role="tablist" aria-label={category.title} aria-orientation="horizontal">
      {category.projects.map((item, position) => <button key={item.id} data-project-option={item.id} id={tabId(position)} ref={node => { tabs.current[position] = node; }} role="tab" type="button" aria-selected={position === index} aria-controls={panelId} tabIndex={position === index ? 0 : -1} onClick={() => select(position)} onKeyDown={event => navigate(event, true)}>{item.shortTitle}</button>)}
    </div>
    <div className={styles.panel} id={panelId} role="tabpanel" aria-labelledby={tabId(index)} tabIndex={0} data-project-id={project.id}>
      <div className={styles.copy} data-project-copy><h4>{project.title}</h4><p className={styles.purpose} data-project-purpose>{project.purpose}</p></div>
      <div ref={gallery} className={styles.gallery} style={{ aspectRatio: Math.min(...category.projects.map(item => item.image.width / item.image.height)) }} data-project-gallery data-project-media role="group" aria-label={chinese ? "项目图片，可左右拖动" : "Project image. Swipe horizontally."} tabIndex={0}
        onKeyDown={event => navigate(event)}
        onPointerDown={event => {
          if (event.pointerType !== "mouse" || !event.isPrimary || event.button !== 0) return;
          pointer.current = { x: event.clientX, y: event.clientY, scroll: event.currentTarget.scrollLeft, dragging: false };
        }}
        onPointerMove={event => {
          const origin = pointer.current;
          if (!origin) return;
          const dx = event.clientX - origin.x;
          const dy = event.clientY - origin.y;
          if (!origin.dragging) {
            if (Math.abs(dy) > 10 && Math.abs(dy) >= Math.abs(dx)) { pointer.current = null; return; }
            if (Math.abs(dx) < 10 || Math.abs(dx) <= Math.abs(dy)) return;
            origin.dragging = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.scrollSnapType = "none";
          }
          event.preventDefault();
          event.currentTarget.scrollLeft = origin.scroll - dx;
        }}
        onPointerLeave={() => { if (!pointer.current?.dragging) pointer.current = null; }}
        onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}>
        {category.projects.map((item, position) => <figure className={styles.slide} key={item.id} aria-hidden={position !== index} inert={position !== index}>
          <Image className={item.image.width / item.image.height < 1.2 ? styles.square : undefined} src={item.image.src} width={item.image.width} height={item.image.height} alt={item.image.alt} sizes="(max-width: 980px) 100vw, 1000px" draggable={false} />
        </figure>)}
      </div>
      <div className={styles.controls} data-project-controls><button type="button" onClick={() => select(requested.current - 1)} disabled={target === 0} aria-label={chinese ? "上一个项目" : "Previous project"}>‹</button><span role="status" aria-label={chinese ? "当前项目" : "Current project"}>{index + 1} / {count}</span><button type="button" onClick={() => select(requested.current + 1)} disabled={target === count - 1} aria-label={chinese ? "下一个项目" : "Next project"}>›</button></div>
      {category.id === "digital" && <ul className={styles.features} data-project-features aria-label={chinese ? "核心功能" : "Key features"}>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
      <div className={styles.narrative} data-project-narrative>{project.paragraphs.map((paragraph, position) => <p key={position}><HighlightedText text={paragraph} phrases={project.highlights} /></p>)}</div>
    </div>
  </div></section>;
}

export function ProjectDirectory({ locale }: { locale: Locale }) {
  return <section className={styles.directory} data-od-id="project-directory" aria-labelledby="project-directory-title">
    <header className={`${styles.intro} ${styles.container}`}><p>03</p><h2 id="project-directory-title">{locale === "zh-CN" ? "项目与产业应用案例" : "Projects & industry applications"}</h2></header>
    {projectDirectory[locale].map(category => <CategoryProjects key={category.id} category={category} locale={locale} />)}
  </section>;
}
