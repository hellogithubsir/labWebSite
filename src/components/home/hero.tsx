import Image from "next/image";
import { HERO } from "@/lib/site-data";

/**
 * Full-bleed hero. The pixel-grid PNG fills the section (bleeding 32px left
 * and 80px right beyond the content column); the two-tone display headline is
 * overlaid in the left half via an absolutely-positioned grid.
 */
export function Hero() {
  return (
    <section className="hero page-section--hero">
      <div className="content-container">
        {/* Background art (in flow — defines the hero's height) */}
        <div className="hero-bg" aria-hidden>
          <div className="hero-media d-lg-block">
            <Image
              src={HERO.desktopImage.src}
              alt={HERO.desktopImage.alt}
              width={HERO.desktopImage.width}
              height={HERO.desktopImage.height}
              priority
            />
          </div>
          <div className="hero-media d-lg-none">
            <Image
              src={HERO.mobileImage.src}
              alt={HERO.mobileImage.alt}
              width={HERO.mobileImage.width}
              height={HERO.mobileImage.height}
              priority
            />
          </div>
        </div>

        {/* Overlaid headline */}
        <div className="hero-grid">
          <div className="hero-col">
            <h1>
              {HERO.headline.map((run, i) => (
                <span key={i} style={{ color: run.color }}>
                  {run.text}
                  {i < HERO.headline.length - 1 && <br />}
                </span>
              ))}
            </h1>
            <p className="type-m d-lg-block">{HERO.intro}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
