import type { ScreenId } from "@/types/hil-site";

export type Locale = "en" | "zh-CN";
export type Localized<T> = Record<Locale, T>;

export interface SharedContent {
  labels: Record<ScreenId, string>;
  titles: Record<ScreenId, string>;
  skip: string;
  navigation: string;
  menu: string;
  closeMenu: string;
  brand: string;
  logoAlt: string;
  exploreResearch: string;
  collaborate: string;
}
