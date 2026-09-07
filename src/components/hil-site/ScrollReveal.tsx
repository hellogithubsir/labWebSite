"use client";

import { useEffect, useRef, type ReactNode } from "react";
import styles from "./ScrollReveal.module.css";

export function ScrollReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        node.dataset.reveal = "visible";
        observer.disconnect();
      }
    }, { threshold: 0.14, rootMargin: "0px 0px -7% 0px" });
    function revealImmediately() {
      if (motion.matches) { node!.dataset.reveal = "visible"; observer.disconnect(); }
    }
    if (!motion.matches) { node.dataset.reveal = "pending"; observer.observe(node); }
    motion.addEventListener("change", revealImmediately);
    return () => { observer.disconnect(); motion.removeEventListener("change", revealImmediately); };
  }, []);
  return <div ref={element} className={`${styles.reveal} ${className}`}>{children}</div>;
}
