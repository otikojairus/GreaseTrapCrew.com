import type { PageEntry } from "@/lib/greasetrap";

export type SiteImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

export const LOCAL_IMAGES = {
  beforeAfter: {
    src: "/images/grease-trap-before-after.jpg",
    alt: "Before and after comparison of a commercial grease trap cleaning",
    priority: true,
  },
  pumping: {
    src: "/images/grease-trap-pumping.jpg",
    alt: "Technician vacuuming grease and waste from an in-floor commercial grease trap",
    priority: true,
  },
} satisfies Record<string, SiteImage>;

export const HERO_BACKGROUND = {
  src: "/images/hero-background.jpg",
  alt: "Commercial kitchen grease trap service environment",
};

/** Primary hero photo — same on home and all service pages. */
export const DEFAULT_HERO_IMAGE = LOCAL_IMAGES.pumping;

function hashSlug(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

export function getHeroImage(_page: PageEntry): SiteImage {
  return { ...DEFAULT_HERO_IMAGE, priority: true };
}

export function getSecondaryImage(page: PageEntry): SiteImage {
  const options = [LOCAL_IMAGES.beforeAfter, HERO_BACKGROUND, LOCAL_IMAGES.pumping];
  return options[hashSlug(page.slug) % options.length]!;
}
