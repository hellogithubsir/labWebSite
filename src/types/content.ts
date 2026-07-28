/**
 * Content model for the MIT-IBM Computing Research Lab clone.
 * Shapes mirror the sections documented in
 * docs/research/mitibm.mit.edu/PAGE_TOPOLOGY.md.
 */

/** A colored line in the logo / footer decorative rules. */
export interface BrandLine {
  color: string;
}

/** A single navigation link. */
export interface NavLink {
  label: string;
  href: string;
  /** Optional accent color (mega-menu links render magenta/crimson). */
  color?: string;
  /** Renders the leading "↳" arrow affordance. */
  arrow?: boolean;
  /** Opens in a new tab (external destinations). */
  external?: boolean;
}

/** A column in the mega menu / footer (rotated heading + links). */
export interface NavColumn {
  heading: string;
  /** Color of the 1px vertical rule beside the column heading. */
  ruleColor: string;
  links: NavLink[];
}

/** Hero section: two-tone display headline over pixel-grid art. */
export interface Hero {
  /** Headline runs, each with its own brand color. */
  headline: { text: string; color: string }[];
  /** Sub-line shown on desktop only. */
  intro: string;
  desktopImage: ImageAsset;
  mobileImage: ImageAsset;
}

/** An image asset with intrinsic dimensions for next/image. */
export interface ImageAsset {
  src: string;
  alt: string;
  width: number;
  height: number;
}

/** A Spotlight card (`.block--content-listing`). */
export interface SpotlightCard {
  category: string;
  title: string;
  date: string;
  source: string;
  href: string;
  image: ImageAsset;
}

/** The Quick-links strip. */
export interface QuickLinks {
  label: string;
  links: NavLink[];
}

/** Footer address block. */
export interface Address {
  lines: string[];
  href: string;
}

/** Aggregate footer model. */
export interface FooterContent {
  wordmark: string;
  columns: NavColumn[];
  affiliations: NavLink[];
  address: Address;
  legal: NavLink[];
  lines: BrandLine[];
}
