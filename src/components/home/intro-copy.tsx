import Link from "next/link";
import { INTRO_CTA, INTRO_LEAD } from "@/lib/site-data";

/** Large lead paragraph with an inline magenta link + an arrow CTA. */
export function IntroCopy() {
  return (
    <section className="page-section--basic-content basic-content">
      <div className="content-container">
        <div className="padded-content">
          <p className="type-l" style={{ maxWidth: "1000px" }}>
            {INTRO_LEAD.before}
            <Link
              href={INTRO_LEAD.link.href}
              style={{ color: INTRO_LEAD.link.color }}
              className="hover:underline"
            >
              {INTRO_LEAD.link.label}
            </Link>
            {INTRO_LEAD.after}
          </p>
          <p style={{ marginTop: "24px" }}>
            <Link
              href={INTRO_CTA.href}
              className="type-m hover:underline"
              style={{ color: INTRO_CTA.color }}
            >
              ↳ {INTRO_CTA.label}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
