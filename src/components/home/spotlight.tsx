import Image from "next/image";
import Link from "next/link";
import { SPOTLIGHT } from "@/lib/site-data";
import type { SpotlightCard } from "@/types/content";

/** "Spotlight" section — a 3-column grid of content-listing cards. */
export function Spotlight() {
  return (
    <section className="page-section--content-blocks">
      <div className="content-container">
        <div className="padded-content">
          <p
            className="type-label-alt"
            style={{ borderTop: "1px solid #dcdcdc", paddingTop: "24px" }}
          >
            Spotlight
          </p>
          <div className="grid grid-cols-1 gap-x-8 min-[1056px]:grid-cols-3">
            {SPOTLIGHT.map((card) => (
              <Card key={card.title} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ card }: { card: SpotlightCard }) {
  return (
    <article className="card">
      <div className="card-image">
        <Image
          src={card.image.src}
          alt={card.image.alt}
          width={card.image.width}
          height={card.image.height}
        />
      </div>
      <div className="card-text">
        <p className="card-type type-b">{card.category}</p>
        <h3 className="card-title type-m">{card.title}</h3>
        <p className="card-source type-s">
          {card.date} - {card.source}
        </p>
      </div>
      <Link href={card.href} className="screen-link" aria-label={card.title}>
        <span className="sr-only">{card.title}</span>
      </Link>
    </article>
  );
}
