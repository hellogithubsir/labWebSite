import Image from "next/image";
import type { ScreenId } from "@/types/hil-site";

interface ScreenRendererProps {
  screen: ScreenId;
  labels: Record<ScreenId, string>;
  titles: Record<ScreenId, string>;
  logoAlt: string;
}

export function ScreenRenderer({ screen, labels, titles, logoAlt }: ScreenRendererProps) {
  return (
    <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"
      className="min-h-screen px-5 py-16 min-[981px]:px-[4.5vw] min-[981px]:py-24">
      <Image src="/images/hil-site/shared/logo.png" alt={logoAlt} width={1486} height={642}
        className="mb-16 h-auto w-[200px] max-w-full" priority />
      <p className="mb-[18px] text-xs font-extrabold tracking-[.06em] text-[var(--teal)] uppercase">{labels[screen]}</p>
      <h1 className="m-0 max-w-[900px] text-[clamp(2.5rem,5vw,6rem)] leading-[1.02] font-normal tracking-[-.04em] text-[var(--navy)]">{titles[screen]}</h1>
    </main>
  );
}
