import { AdvantagesScreen } from "./screens/advantages/AdvantagesScreen";
import { ProjectsScreen } from "./screens/projects/ProjectsScreen";
import { ResearchScreen } from "./screens/research/ResearchScreen";
import Image from "next/image";
import { HomeScreen } from "./screens/home/HomeScreen";
import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";

interface ScreenRendererProps {
  screen: ScreenId;
  locale: Locale;
  onNavigate: (screen: ScreenId) => void;
  labels: Record<ScreenId, string>;
  titles: Record<ScreenId, string>;
  logoAlt: string;
}

export function ScreenRenderer({ screen, labels, titles, logoAlt, locale, onNavigate }: ScreenRendererProps) {
  if (screen === "home") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><HomeScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "research") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><ResearchScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "projects") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><ProjectsScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "advantages") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><AdvantagesScreen locale={locale} onNavigate={onNavigate} /></main>;
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
