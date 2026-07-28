import type { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionRouteContent } from "@/components/section-navigation-transition";

type Variant = "home" | "basic" | "default";

const VARIANT_CLASS: Record<Variant, string> = {
  home: "page-home home",
  basic: "page-basic",
  default: "",
};

/**
 * Wraps every route in the target's scroll architecture:
 *   .scrolling-wrap > .scrolling-wrap--inner > [fixed header] + #content
 * followed by the footer. The header is a fixed 100vh overlay, so page
 * content flows underneath it inside #content.
 */
export function PageShell({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <div className={`scrolling-wrap ${VARIANT_CLASS[variant]}`}>
      <div className="scrolling-wrap--inner min-h-screen">
        <SiteHeader />
        <SectionRouteContent>{children}</SectionRouteContent>
      </div>
      <SiteFooter />
    </div>
  );
}
