import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageSubnav } from "@/components/page-subnav";

const ABOUT_NAV = [
  { label: "About", href: "/about" },
  { label: "People", href: "/about/people" },
  { label: "Contact", href: "/about/contact" },
];

export default function AboutPage() {
  return (
    <PageShell variant="basic">
      <PageSubnav items={ABOUT_NAV} current="About" />
      <section className="page-section--basic-content basic-content">
        <div className="content-container">
          <div className="padded-content">
            <h1 className="basic-page-title basic-page-title--blue type-xl">
              Inside<br />the lab
            </h1>

            <h2 className="type-l" style={{ marginBottom: "32px" }}>
              A Premier Academia-Industry Collaboration for Frontier Computing
            </h2>

            <div className="type-b" style={{ maxWidth: "800px", marginBottom: "64px" }}>
              <p style={{ marginBottom: "24px" }}>
                The MIT-IBM Computing Research Lab is a strategic collaboration of researchers
                from MIT and IBM with deep expertise, pursuing joint research in AI,
                algorithms, and quantum computing, as well as the integration of these
                technologies into hybrid computing systems. The lab strives to fundamentally
                reimagine the mathematical and algorithmic foundations that underpin the next
                era of computing and thereby unlock new discoveries across scientific domains.
              </p>

              <p>
                The MIT-IBM Computing Research Lab builds on a distinguished history of
                research excellence and student training, evolving from the MIT-IBM Watson AI
                Lab, which originated in 2017. During this initial collaboration, MIT and IBM
                researchers reached milestones, such as producing over 1,600 peer-reviewed
                articles in top journals and conferences, generating numerous patent
                disclosures and innovations for corporate members, supporting more than 500
                students and postdoctoral scholars, and achieving an h-index of 199 and
                counting.
              </p>
            </div>

            <h2 className="type-l" style={{ marginBottom: "32px" }}>
              Innovation Hub in Kendall Square
            </h2>

            <div style={{ marginBottom: "32px" }}>
              <Image
                src="/images/314-main-2.jpg"
                alt="MIT-IBM Computing Research Lab at 314 Main St in Kendall Square"
                width={1199}
                height={799}
                style={{ width: "100%", height: "auto", maxWidth: "1000px" }}
              />
            </div>

            <div className="type-b" style={{ maxWidth: "800px", marginBottom: "48px" }}>
              <p style={{ marginBottom: "24px" }}>
                We&apos;re located in one of the fastest-growing technology centers in the world:
                Kendall Square in Cambridge, Massachusetts. Across the street from MIT, down
                the road from Harvard, and situated in a dense cluster of the world&apos;s leading
                technology companies, Kendall Square is a vibrant ecosystem for innovators.
              </p>

              <p style={{ fontStyle: "italic", color: "#767676" }}>
                Our offices at 314 Main St. in the Kendall Square technology center of
                Cambridge, Massachusetts
              </p>
            </div>

            <p>
              <Link
                href="/about/people"
                className="type-m hover:underline"
                style={{ color: "#be2fa8" }}
              >
                ↳ People
              </Link>
            </p>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
