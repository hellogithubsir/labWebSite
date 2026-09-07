import { TeamScreen } from "./screens/team/TeamScreen";
import { PartnersScreen } from "./screens/partners/PartnersScreen";
import { AdvantagesScreen } from "./screens/advantages/AdvantagesScreen";
import { ProjectsScreen } from "./screens/projects/ProjectsScreen";
import { ResearchScreen } from "./screens/research/ResearchScreen";
import { ContactScreen } from "./screens/contact/ContactScreen";
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

export function ScreenRenderer({ screen, locale, onNavigate }: ScreenRendererProps) {
  if (screen === "home") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><HomeScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "research") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><ResearchScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "projects") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><ProjectsScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "advantages") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><AdvantagesScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "partners") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><PartnersScreen locale={locale} onNavigate={onNavigate} /></main>;
  if (screen === "team") return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><TeamScreen locale={locale} onNavigate={onNavigate} /></main>;
  return <main id="site-content" tabIndex={-1} data-screen={screen} data-od-id="current-screen"><ContactScreen locale={locale} /></main>;
}
