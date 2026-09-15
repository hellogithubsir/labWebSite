"use client";

import Image from "next/image";
import { useId, useRef, useState } from "react";
import type { CarouselLabels, ProjectSlide } from "@/content/hil-site/projects";
import type { Locale } from "@/content/hil-site/types";
import styles from "./ProjectsScreen.module.css";

export function ProjectCarousel({ slides, labels, categories, locale, initialIndex = 0 }: { slides: ProjectSlide[]; labels: CarouselLabels; categories: string[]; locale: Locale; initialIndex?: number }) {
  const [index, setIndex] = useState(initialIndex);
  const start = useRef<{ x: number; y: number } | null>(null);
  const id = useId();
  function move(delta: number) { setIndex(current => Math.max(0, Math.min(slides.length - 1, current + delta))); }
  return <div data-od-id={`project-carousel-${id}`}>
    <ol className={styles.categories}>{categories.map((category, i) => <li key={category} aria-current={i === index ? "step" : undefined}><span>0{i + 1}</span>{category}</li>)}</ol>
    <div className={styles.viewport} tabIndex={0} role="group" aria-label={labels.drag} data-od-id={`project-drag-${id}`}
      onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }}
      onPointerDown={event => { if (!event.isPrimary || event.button !== 0) return; start.current = { x: event.clientX, y: event.clientY }; event.currentTarget.setPointerCapture(event.pointerId); }}
      onPointerUp={event => { const origin = start.current; start.current = null; if (origin && Math.abs(event.clientX - origin.x) >= 35 && Math.abs(event.clientX - origin.x) > Math.abs(event.clientY - origin.y)) move(event.clientX < origin.x ? 1 : -1); }}
      onPointerCancel={() => { start.current = null; }}>
      <div className={styles.track} style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((slide, i) => <article className={styles.slide} key={slide.file} aria-hidden={i !== index} inert={i !== index}>
          <div className={styles.caption}><strong>{slide.category}</strong><h3>{slide.title}</h3><p>{slide.body}</p></div>
          <ul className={styles.proofs}>{slide.proofs.map(proof => <li key={proof}>{proof}</li>)}</ul>
          <Image src={`/images/hil-site/projects/${slide.file}`} alt={slide.alt} width={slide.width} height={slide.height} sizes="(max-width: 980px) 100vw, 80vw" draggable={false} />
        </article>)}
      </div>
    </div>
    <div className={styles.controls}><button onClick={() => move(-1)} disabled={index === 0} aria-label={labels.previous}>‹</button><button onClick={() => move(1)} disabled={index === slides.length - 1} aria-label={labels.next}>›</button><span role="status" aria-label={locale === "en" ? "Current screen" : "当前界面"} className={styles.status}>{index + 1} / {slides.length}</span></div>
  </div>;
}
