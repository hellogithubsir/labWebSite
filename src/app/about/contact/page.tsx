import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageSubnav } from "@/components/page-subnav";

const ABOUT_NAV = [
  { label: "About", href: "/about" },
  { label: "People", href: "/about/people" },
  { label: "Contact", href: "/about/contact" },
];

export default function ContactPage() {
  return (
    <PageShell variant="basic">
      <PageSubnav items={ABOUT_NAV} current="Contact" />
      <section className="page-section--basic-content basic-content">
        <div className="content-container">
          <div className="padded-content">
            <div className="type-b" style={{ maxWidth: "600px" }}>
              <p style={{ marginBottom: "32px" }}>
                The MIT-IBM Computing Research Lab is located in Kendall Square in Cambridge,
                Massachusetts.
              </p>

              <p style={{ marginBottom: "8px", fontWeight: 600 }}>
                <Link
                  href="https://www.google.com/maps/place/MIT-IBM+Watson+AI+Lab/@42.3622262,-71.0894394,17z/data=!3m1!4b1!4m6!3m5!1s0x89e3712766849e03:0xf2ec6bd3e1926f39!8m2!3d42.3622223!4d-71.0868591!16s%2Fg%2F11swmvb7gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                  style={{ color: "#0062ff" }}
                >
                  314 Main St, Cambridge, MA 02142
                </Link>
              </p>

              <p style={{ marginBottom: "48px" }}>
                For any questions related to the MIT-IBM Computing Research Lab, please
                contact{" "}
                <Link
                  href="mailto:mitibm@mit.edu"
                  className="hover:underline"
                  style={{ color: "#0062ff" }}
                >
                  mitibm@mit.edu
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
