"use client";

import { useEffect, useRef, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import { screenSequence } from "@/lib/hil-site/screen-sequence";
import type { ScreenId } from "@/types/hil-site";
import styles from "./ScreenNavigation.module.css";

function subscribeViewport(callback: () => void) {
  const media = window.matchMedia("(max-width: 980px)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

interface ScreenNavigationProps {
  screen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  labels: Record<ScreenId, string>;
  menuOpen: boolean;
  onMenuOpenChange: (open: boolean) => void;
  navigationLabel: string;
  menuLabel: string;
  closeMenuLabel: string;
  brandLabel: string;
}

export function ScreenNavigation({ screen, onNavigate, labels, menuOpen, onMenuOpenChange,
  navigationLabel, menuLabel, closeMenuLabel, brandLabel }: ScreenNavigationProps) {
  const mobile = useSyncExternalStore(subscribeViewport, () => window.matchMedia("(max-width: 980px)").matches, () => false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIndex = screenSequence.indexOf(screen);
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const media = window.matchMedia("(min-width: 981px)");
    const closeOnDesktop = () => { if (media.matches) onMenuOpenChange(false); };
    media.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previous;
      media.removeEventListener("change", closeOnDesktop);
    };
  }, [menuOpen, onMenuOpenChange]);

  function closeMenu() {
    onMenuOpenChange(false);
    menuButton.current?.focus();
  }
  function activate(target: ScreenId) {
    onNavigate(target);
    if (menuOpen) closeMenu();
  }
  function handleKeys(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    switch (event.key) {
      case "ArrowRight": next = (index + 1) % screenSequence.length; break;
      case "ArrowLeft": next = (index + screenSequence.length - 1) % screenSequence.length; break;
      case "Home": next = 0; break;
      case "End": next = screenSequence.length - 1; break;
      default: return;
    }
    event.preventDefault();
    onNavigate(screenSequence[next]);
    buttons.current[next]?.focus();
  }
  return (
    <header className={styles.navigation} onKeyDown={(event) => {
      if (menuOpen && event.key === "Escape") { event.preventDefault(); closeMenu(); }
      if (menuOpen && event.key === "Tab") {
        const first = menuButton.current;
        const last = buttons.current[screenSequence.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    }}>
      <div className={styles.mobileBar}>
        <span className={styles.brand}>{brandLabel}</span>
        <button ref={menuButton} type="button" className={styles.menuButton}
          aria-expanded={menuOpen} aria-controls="screen-navigation" data-od-id="menu-toggle"
          onClick={() => onMenuOpenChange(!menuOpen)}>{menuOpen ? closeMenuLabel : menuLabel}</button>
      </div>
      <nav id="screen-navigation" aria-label={navigationLabel} inert={mobile && !menuOpen} aria-hidden={mobile && !menuOpen ? true : undefined}
        className={`${styles.menu} ${menuOpen ? styles.open : ""}`} data-od-id="screen-navigation">
        {screenSequence.map((id, index) => (
          <button type="button" key={id} ref={(node) => { buttons.current[index] = node; }}
            aria-current={screen === id ? "page" : undefined}
            className={`${styles.rail} ${index <= activeIndex ? styles.left : styles.right} ${screen === id ? styles.active : ""}`}
            style={{ "--offset": index <= activeIndex ? index : screenSequence.length - 1 - index } as CSSProperties}
            onClick={() => activate(id)} onKeyDown={(event) => handleKeys(event, index)} data-od-id={`nav-${id}`}>
            <span className={styles.number} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <span className={styles.label}>{labels[id]}</span>
          </button>
        ))}
      </nav>
    </header>
  );
}
