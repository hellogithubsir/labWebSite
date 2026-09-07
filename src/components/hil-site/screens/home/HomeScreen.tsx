import type { Locale } from "@/content/hil-site/types";
import type { ScreenId } from "@/types/hil-site";
import { HomeHero } from "./HomeHero";
import { HomeResearch } from "./HomeResearch";

export function HomeScreen({ locale, onNavigate }: { locale: Locale; onNavigate: (screen: ScreenId) => void }) {
  return <><HomeHero locale={locale} onNavigate={onNavigate} /><HomeResearch locale={locale} /></>;
}
