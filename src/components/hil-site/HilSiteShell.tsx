"use client";

import { useState, type CSSProperties } from "react";
import { screenSequence } from "@/lib/hil-site/screen-sequence";
import type { ScreenId } from "@/types/hil-site";
import { ScreenNavigation } from "./ScreenNavigation";
import { ScreenRenderer } from "./ScreenRenderer";
import styles from "./ScreenNavigation.module.css";

const labels: Record<ScreenId, string> = {
  home: "Home", research: "Research Directions", projects: "Projects",
  advantages: "Technology Advantages", partners: "Partners", team: "Team", contact: "Contact",
};
const titles: Record<ScreenId, string> = {
  ...labels,
  home: "Bridging human perception and machine intelligence at the edge.",
};

export function HilSiteShell() {
  const [screen, setScreen] = useState<ScreenId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const index = screenSequence.indexOf(screen);
  function navigate(next: ScreenId) {
    if (next === screen) return;
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  return (
    <div className={styles.shell} style={{ "--screen-index": index } as CSSProperties}>
      <button className={styles.skip} onClick={() => document.getElementById("site-content")?.focus()}>Skip to content</button>
      <ScreenNavigation screen={screen} onNavigate={navigate} labels={labels}
        menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}
        navigationLabel="Primary navigation" menuLabel="Menu" closeMenuLabel="Close menu" brandLabel="HI LAB" />
      <div className={styles.frame} inert={menuOpen}>
        <ScreenRenderer screen={screen} labels={labels} titles={titles} logoAlt="Harmonizing Intelligence Lab" />
      </div>
    </div>
  );
}
