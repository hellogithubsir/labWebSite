"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { screenSequence } from "@/lib/hil-site/screen-sequence";
import type { ScreenId } from "@/types/hil-site";
import { ScreenNavigation } from "./ScreenNavigation";
import { ScreenRenderer } from "./ScreenRenderer";
import { sharedContent } from "@/content/hil-site/shared";
import type { Locale } from "@/content/hil-site/types";
import { LocaleControl } from "./LocaleControl";
import styles from "./ScreenNavigation.module.css";

export function HilSiteShell() {
  const [locale, setLocale] = useState<Locale>("en");
  const content = sharedContent[locale];
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const [screen, setScreen] = useState<ScreenId>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const index = screenSequence.indexOf(screen);
  function navigate(next: ScreenId) {
    if (next === screen) return;
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  const screenProps = { screen, labels: content.labels, titles: content.titles, logoAlt: content.logoAlt, locale, onNavigate: navigate };
  return (
    <div className={styles.shell} style={{ "--screen-index": index } as CSSProperties}>
      <button className={styles.skip} onClick={() => document.getElementById("site-content")?.focus()}>{content.skip}</button>
      <ScreenNavigation screen={screen} onNavigate={navigate} labels={content.labels}
        menuOpen={menuOpen} onMenuOpenChange={setMenuOpen}
        navigationLabel={content.navigation} menuLabel={content.menu} closeMenuLabel={content.closeMenu} brandLabel={content.brand}
        languageControl={<LocaleControl locale={locale} onLocaleChange={setLocale} />} />
      <div className={styles.frame} inert={menuOpen}>
        <ScreenRenderer {...screenProps} />
      </div>
    </div>
  );
}
