import type { Locale } from "@/content/hil-site/types";

interface LocaleControlProps {
  locale: Locale;
  onLocaleChange: (locale: Locale) => void;
}

export function LocaleControl({ locale, onLocaleChange }: LocaleControlProps) {
  const target = locale === "en" ? "zh-CN" : "en";
  return (
    <button type="button" lang={target} aria-label={target === "zh-CN" ? "切换为中文" : "Switch to English"}
      data-od-id="locale-toggle" onClick={() => onLocaleChange(target)}
      className="min-h-11 cursor-pointer border-0 bg-transparent px-2 py-2 text-[13px] font-extrabold text-[var(--navy)] transition-colors duration-300 hover:text-[var(--teal)] motion-reduce:transition-none">
      {target === "zh-CN" ? "中文" : "English"}
    </button>
  );
}
