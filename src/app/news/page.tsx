import Image from "next/image";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageSubnav } from "@/components/page-subnav";

const NEWS_NAV = [
  { label: "News", href: "/news" },
  {
    label: "Newsletters & Annual Reports",
    href: "https://mitibm.mit.edu/news/newsletters/",
    external: true,
  },
];

const NEWS_ITEMS = [
  {
    title: "A better way to turn 2D designs into 3D models for rapid prototyping",
    date: "07/16/2026",
    source: "MIT News",
    image: { src: "/images/MIT-ChartNet-01-press_0-768x512.jpg", width: 365, height: 243 },
  },
  {
    title: "IBM's AI model chief on the tools changing how research gets done",
    date: "07/16/2026",
    source: "IBM",
    image: { src: "/images/MIT-ChartNet-01-press_0-768x512.jpg", width: 365, height: 243 },
  },
  {
    title: "MIT researchers teach AI models to interpret charts",
    date: "06/03/2026",
    source: "MIT News",
    image: { src: "/images/MIT-ChartNet-01-press_0-768x512.jpg", width: 365, height: 243 },
  },
  {
    title: "Teaching AI agents to ask better questions by playing \"Battleship\"",
    date: "06/03/2026",
    source: "MIT News",
    image: { src: "/images/Co-Battleship3-768x512.png", width: 365, height: 243 },
  },
  {
    title: "IBM charts a new research path with MIT",
    date: "05/11/2026",
    source: "IBM Research",
    image: { src: "/images/mitibm-lab-768x429.png", width: 365, height: 203 },
  },
  {
    title: "MIT School of Engineering faculty receive awards in winter 2026",
    date: "05/07/2026",
    source: "MIT News",
    image: { src: "/images/MIT-Dome-768x575.png", width: 365, height: 273 },
  },
  {
    title: "The MIT-IBM Computing Research Lab launches to shape the future of AI and quantum computing",
    date: "04/29/2026",
    source: "MIT Schwarzman College of Computing and IBM",
    image: { src: "/images/MIT-Dome-768x575.png", width: 365, height: 273 },
  },
  {
    title: "Building the future of computing, together",
    date: "04/29/2026",
    source: "IBM Research",
    image: { src: "/images/Building-the-future-of-computing-together-768x429.png", width: 365, height: 203 },
  },
  {
    title: "IBM is making small open models look safe for real enterprise work",
    date: "04/29/2026",
    source: "Startup Fortune",
    image: { src: "/images/Building-the-future-of-computing-together-768x429.png", width: 365, height: 203 },
  },
  {
    title: "A faster way to estimate AI power consumption",
    date: "04/27/2026",
    source: "MIT News",
    image: { src: "/images/MIT_Power-Estimation-01_0-768x512.jpg", width: 365, height: 243 },
  },
  {
    title: "How an extra training step can unlock AI's reasoning power",
    date: "04/15/2026",
    source: "IBM Research",
    image: { src: "/images/MIT_Power-Estimation-01_0-768x512.jpg", width: 365, height: 243 },
  },
  {
    title: "A better method for identifying overconfident large language models",
    date: "03/19/2026",
    source: "MIT News",
    image: { src: "/images/MIT_Power-Estimation-01_0-768x512.jpg", width: 365, height: 243 },
  },
];

export default function NewsPage() {
  return (
    <PageShell variant="basic">
      <PageSubnav items={NEWS_NAV} current="News" />
      <section className="page-section--basic-content basic-content">
        <div className="content-container">
          <div className="padded-content">
            <h1 className="basic-page-title type-l">
              News
            </h1>
            <p className="type-b news-intro">
              Browse the latest news from inside the Lab.
            </p>

            <div className="grid grid-cols-1 gap-x-8 gap-y-12 min-[1056px]:grid-cols-3">
              {NEWS_ITEMS.map((item, i) => (
                <article key={i} className="card">
                  <div className="card-image">
                    <Image
                      src={item.image.src}
                      alt=""
                      width={item.image.width}
                      height={item.image.height}
                    />
                  </div>
                  <div className="card-text">
                    <h3 className="card-title type-m">{item.title}</h3>
                    <p className="card-source type-s">
                      {item.date} - {item.source}
                    </p>
                  </div>
                  <Link href="/news" className="screen-link" aria-label={item.title}>
                    <span className="sr-only">{item.title}</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
