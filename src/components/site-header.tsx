"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import Link from "next/link";
import {
  AFFILIATIONS,
  EMAIL_HREF,
  FOOTER_ADDRESS,
  HOME_HREF,
  HOME_WORDMARK,
  SEARCH_HREF,
  SECTIONS,
  SECTION_HREFS,
} from "@/lib/site-data";
import { SearchIcon } from "@/components/icons";
import {
  useSectionNavigationTransition,
} from "@/components/section-navigation-transition";
import type { PrimarySection } from "@/components/section-navigation-transition";
import type { NavLink } from "@/types/content";

const SECTION_CLASS: Record<string, string> = {
  Research: "section-research",
  News: "section-news",
  "Inside the lab": "section-about",
};

// Divider colors for the resting right rail (spacer + 3 sections).
const RAIL_DIVIDERS = ["#a31f34", "#b12870", "#be2fa8", "#be2fa8"];

/**
 * The fixed full-viewport header overlay. At rest it paints the logo, the
 * left wordmark rail, the right section rail, and the search/email marks —
 * all over transparent, so page content shows through. Clicking the logo
 * opens the white mega-menu (mirrors `body.site-header--open`).
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false);

  // The source theme exposes this class on <body>; its menu owns scrolling.
  useEffect(() => {
    document.body.classList.toggle("site-header--open", open);
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.classList.remove("site-header--open");
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      {/* Logo / close toggle */}
      <button
        type="button"
        className="site-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? "Close" : "Menu"}</span>
        <span aria-hidden className="desktop-toggle-art" />
        <span aria-hidden className="mobile-toggle-art" />
      </button>

      <Link
        href={HOME_HREF}
        className="mobile-site-logo"
        aria-label="MIT-IBM Computing Research Lab home"
        onClick={() => setOpen(false)}
      />

      {open ? (
        <>
          <MegaMenu onNavigate={() => setOpen(false)} />
          <MobileMenu onNavigate={() => setOpen(false)} />
        </>
      ) : (
        <RestingRails />
      )}

      {/* Supplemental nav — search + email */}
      <a
        href={SEARCH_HREF}
        className="search-link"
        aria-label="Search"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SearchIcon />
      </a>
      <Link href={EMAIL_HREF} className="email-link" aria-label="Contact the lab">
        <svg
          width="16"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
        >
          <rect x="0.5" y="0.5" width="19" height="15" stroke="currentColor" />
          <path d="M1 1L10 8.5L19 1" stroke="currentColor" />
        </svg>
      </Link>
    </header>
  );
}

function RestingRails() {
  const {
    activeSection,
    navigateSection,
    navigateSectionByKeyboard,
  } = useSectionNavigationTransition();

  return (
    <>
      {/* Left wordmark */}
      <Link href={HOME_HREF} className="rail-word type-s">
        {HOME_WORDMARK}
      </Link>

      {/* Right section rail */}
      <nav
        className={`section-rail${activeSection ? " has-active" : ""}`}
        aria-label="Sections"
      >
        <span
          className="rail-item rail-spacer"
          aria-hidden
          style={{ ["--_d" as string]: RAIL_DIVIDERS[0] }}
        >
          <span
            className="rail-divider"
            style={{ background: RAIL_DIVIDERS[0] }}
          />
        </span>
        {SECTIONS.map((section, i) => {
          const sectionName = section.heading as PrimarySection;
          const isCurrent = sectionName === activeSection;

          return (
            <span
              key={section.heading}
              className={`rail-item ${SECTION_CLASS[section.heading]}${
                isCurrent ? " is-current" : ""
              }`}
            >
              <Link
                href={SECTION_HREFS[section.heading]}
                aria-current={isCurrent ? "page" : undefined}
                onClick={(event) =>
                  navigateSection(
                    event,
                    SECTION_HREFS[section.heading],
                    sectionName,
                  )
                }
                onKeyDown={(event) =>
                  navigateSectionByKeyboard(
                    event,
                    SECTION_HREFS[section.heading],
                    sectionName,
                  )
                }
              >
                <span className="rail-text type-b">{section.heading}</span>
              </Link>
              <span
                className="rail-divider"
                style={{ background: RAIL_DIVIDERS[i + 1] }}
              />
            </span>
          );
        })}
      </nav>
    </>
  );
}

function MegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="mega">
      <span className="mega-close type-b">Close</span>
      <Link
        href={HOME_HREF}
        className="mega-home type-b"
        onClick={onNavigate}
      >
        Home
      </Link>
      <div className="mega-cols">
        {SECTIONS.map((section) => (
          <div
            key={section.heading}
            className="mega-col"
            style={{ ["--rule-color" as string]: section.ruleColor }}
          >
            <span className="mega-heading type-b">{section.heading}</span>
            <ul className="mega-links type-m">
              {section.links.map((link) => (
                <li key={link.label}>
                  <MenuLink link={link} onNavigate={onNavigate} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: () => void }) {
  return (
    <nav className="mobile-nav" aria-label="Mobile menu">
      <Link href={HOME_HREF} className="mobile-home-link type-b" onClick={onNavigate}>
        {HOME_WORDMARK}
      </Link>

      <div className="mobile-nav-grid">
        <div className="mobile-nav-content">
          <ul className="mobile-menu-list type-b">
            {SECTIONS.map((section) => {
              const links =
                section.heading === "News"
                  ? section.links.filter((link) => link.label === "News")
                  : section.links;

              return (
                <li key={section.heading} className="mobile-menu-section">
                  <Link href={SECTION_HREFS[section.heading]} onClick={onNavigate}>
                    {section.heading}
                  </Link>
                  <ul className="mobile-menu-links">
                    {links.map((link) => (
                      <li key={link.label}>
                        <MenuLink link={link} onNavigate={onNavigate} />
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>

          <div className="mobile-additional-links type-b">
            <div className="mobile-additional-section">
              {AFFILIATIONS[0]?.links.map((link) => (
                <MenuLink key={link.label} link={link} onNavigate={onNavigate} />
              ))}
            </div>
            <div className="mobile-additional-section mobile-additional-social">
              {AFFILIATIONS[1]?.links.map((link) => (
                <MenuLink key={link.label} link={link} onNavigate={onNavigate} />
              ))}
            </div>
            <div className="mobile-additional-section">
              <MenuLink link={FOOTER_ADDRESS} onNavigate={onNavigate} />
            </div>
          </div>

          <div className="mobile-menu-lines" aria-hidden>
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MenuLink({
  link,
  onNavigate,
  children,
}: {
  link: NavLink;
  onNavigate: () => void;
  children?: ReactNode;
}) {
  const content = children ?? link.label;

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onNavigate}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={link.href} onClick={onNavigate}>
      {content}
    </Link>
  );
}
