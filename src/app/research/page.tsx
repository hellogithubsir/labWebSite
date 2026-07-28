import Image from "next/image";
import { PageShell } from "@/components/page-shell";
import { PageSubnav } from "@/components/page-subnav";

const RESEARCH_NAV = [
  { label: "Research", href: "/research" },
  {
    label: "Call for Proposals",
    href: "https://mitibm.mit.edu/research/call-for-proposals/",
    external: true,
  },
  {
    label: "Search",
    href: "https://mitibm.mit.edu/research/search/",
    external: true,
  },
];

export default function ResearchPage() {
  return (
    <PageShell variant="basic">
      <PageSubnav items={RESEARCH_NAV} current="Research" />
      <section className="page-section--basic-content basic-content">
        <div className="content-container">
          <div className="padded-content">
            <div className="research-hero">
              <h1 className="research-title type-xxl">
                Fundamental Computing Science for an Evolving World
              </h1>
              <Image
                src="/images/06_graph-deep-learning-3.svg"
                alt=""
                width={267}
                height={150}
                className="research-hero-art"
              />
            </div>

            <div className="research-copy type-b">
              <p style={{ marginBottom: "24px" }}>
                As our body of knowledge expands, so do our lines of inquiry. The MIT-IBM
                Computing Research Lab designs computing systems and tools to meet this need,
                and through our MIT and IBM collaboration, create the conditions to rethink
                the mathematical and computational foundations of science and engineering.
              </p>

              <p style={{ marginBottom: "24px" }}>
                By coupling academic rigor with industrial scale, the lab aims to define the
                computational foundations that will power the next generation of AI,
                algorithms, and quantum computing. The lab is designed to accelerate progress
                toward powerful new computational approaches that take advantage of rapid
                advances in AI and quantum-centric supercomputing, including those that
                combine maturing quantum hardware with classical systems and AI methods.
              </p>

              <p style={{ marginBottom: "24px" }}>
                To do this, the lab advances core capabilities in AI and classical
                algorithms, with an emphasis on integrating AI seamlessly into computational
                systems. This includes research into efficient, modular, language model
                architectures and new programming approaches that enable their deployment at
                scale. The lab also develops specialized retrieval-augmented and agentic
                systems tailored to enterprise environments and integration into complex
                workflows. Across this work, the lab is equally focused on strengthening
                governance, transparency, and open ecosystems to ensure that AI systems are
                robust and trustworthy.
              </p>

              <p>
                In parallel, the lab explores computational frontiers through quantum
                computing and its convergence with AI. Lab researchers are developing novel
                quantum algorithms and investigating the mathematical and algorithmic
                foundations of machine learning, optimization, Hamiltonian simulations, and
                partial differential equations to address challenging mathematical problems,
                including those arising in complex, dynamic systems with applications across
                the physical and life sciences and global industries. The lab also
                investigates the co-design of AI and quantum architectures, and creates
                advanced protocols for fault-tolerant quantum computing. Together, this work
                establishes the underpinning for scalable, high-performance computing systems
                that extend beyond the limits of current approaches.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
