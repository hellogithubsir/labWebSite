import Link from "next/link";
import {
  AFFILIATIONS,
  FOOTER_ADDRESS,
  FOOTER_LEGAL,
  HOME_WORDMARK,
  SECTIONS,
} from "@/lib/site-data";
import type { NavLink } from "@/types/content";

// Blue rule + link color per footer row (theme nth-child colors).
const ROW_RULE = ["#3b5de8", "#4f56de", "#624fd5"];

function FooterLink({ link }: { link: NavLink }) {
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noopener noreferrer">
        {link.label}
      </a>
    );
  }
  return <Link href={link.href}>{link.label}</Link>;
}

/**
 * Black footer panel. Three rows (Research / News / Inside the lab), each a
 * 3-column grid — section heading, section links, affiliations/address —
 * separated by blue rules, closing with legal links and decorative lines.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="grid-container">
        <div className="footer-wordmark type-b">{HOME_WORDMARK}</div>

        {SECTIONS.map((section, i) => {
          const affiliation = AFFILIATIONS[i];
          const isLast = i === SECTIONS.length - 1;
          return (
            <div
              key={section.heading}
              className="footer-row type-b"
              style={{
                ["--row-rule" as string]: ROW_RULE[i],
                ["--row-link" as string]: ROW_RULE[i],
              }}
            >
              {/* Column 1 — section heading (links to the section root) */}
              <div>
                <FooterLink link={{ label: section.heading, href: sectionRoot(section.heading) }} />
              </div>

              {/* Column 2 — section links */}
              <ul className="footer-links">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>

              {/* Column 3 — affiliations, then address on the last row */}
              <div>
                <ul className="footer-links">
                  {affiliation?.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink link={link} />
                    </li>
                  ))}
                </ul>
                {isLast && (
                  <div className="footer-address">
                    <FooterLink link={FOOTER_ADDRESS} />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        <div className="legal-links type-b">
          {FOOTER_LEGAL.map((link) => (
            <FooterLink key={link.label} link={link} />
          ))}
        </div>

        <div className="lines" aria-hidden>
          <span />
        </div>
      </div>
    </footer>
  );
}

function sectionRoot(heading: string): string {
  if (heading === "Research") return "/research";
  if (heading === "News") return "/news";
  return "/about";
}
