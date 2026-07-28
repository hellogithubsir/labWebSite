import Image from "next/image";
import Link from "next/link";
import { QUICK_LINKS } from "@/lib/site-data";

/** Quick-links strip — bold label + arrow links, bounded by 1px rules. */
export function QuickLinksStrip() {
  return (
    <section className="page-section--quick-links">
      <div className="content-container">
        <div className="padded-content">
          <div className="quick-links">
            <span className="quick-label type-label">{QUICK_LINKS.label}</span>
            <ul>
              {QUICK_LINKS.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="hover:underline">
                    ↳ {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Right-aligned MIT Schwarzman College of Computing lockup. */
export function SchwarzmanLogo() {
  return (
    <section className="page-section--basic-content basic-content">
      <div className="content-container">
        <div className="padded-content" style={{ textAlign: "right" }}>
          <Image
            src="/images/scc-logo.png"
            alt="MIT Schwarzman College of Computing"
            width={300}
            height={45}
            loading="eager"
            style={{ display: "inline-block", height: "auto" }}
          />
        </div>
      </div>
    </section>
  );
}
