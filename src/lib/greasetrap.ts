import sectionsData from "@/data/greasetrap-sections.json";
import pagesData from "@/data/greasetrap-pages.json";

export type PageEntry = (typeof pagesData)[number];
export type SectionEntry = (typeof sectionsData)[number];

export const SITE_NAME = "Grease Trap Crew";
export const SITE_DESCRIPTION =
  "Commercial grease trap and interceptor cleaning, pumping, maintenance, and emergency service for restaurants and kitchens across Canada.";
export const PHONE_NUMBER = "1-888-473-2737";
export const PHONE_LINK = `tel:${PHONE_NUMBER.replace(/[^0-9+]/g, "")}`;
export const DEFAULT_SITE_URL = "https://greasetrapcrew.com";

export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") || DEFAULT_SITE_URL;
}

export function getPages() {
  return [...pagesData] as PageEntry[];
}

export function getSections() {
  return [...sectionsData] as SectionEntry[];
}

export function getPageByPath(pathname: string) {
  const normalized = normalizePath(pathname);
  return getPages().find((page) => page.slug === normalized) ?? null;
}

export function normalizePath(pathname: string) {
  const trimmed = pathname.trim();
  if (!trimmed || trimmed === "/") {
    return "/";
  }

  const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  return withLeadingSlash.replace(/\/+$/, "");
}

export function pathToSlugParts(pathname: string) {
  return normalizePath(pathname)
    .replace(/^\//, "")
    .split("/")
    .filter(Boolean);
}

function titleCase(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getServiceFamily(page: PageEntry) {
  const slug = page.slug;
  if (slug.includes("emergency") || slug.includes("overflow") || slug.includes("24-hour")) {
    return "Emergency & Overflow";
  }
  if (slug.includes("pump") || slug.includes("empty") || slug.includes("waste") || slug.includes("hauling")) {
    return "Pumping & Waste Removal";
  }
  if (slug.includes("install") || slug.includes("replace")) {
    return "Installation & Replacement";
  }
  if (slug.includes("repair") || slug.includes("inspect")) {
    return "Repair & Inspection";
  }
  if (slug.includes("mainten")) {
    return "Maintenance";
  }
  if (slug.includes("clean") || slug.includes("service") || slug.includes("commercial") || slug.includes("restaurant")) {
    return "Cleaning & Commercial Service";
  }
  return titleCase(slug.replace(/^\//, "").split("/")[0] || "Grease trap services");
}

export function getSectionSummary(section: SectionEntry) {
  const first = section.pages[0];
  const last = section.pages[section.pages.length - 1];
  return {
    title: section.heading,
    count: section.pages.length,
    lead: first?.title ?? section.heading,
    slugSpan: `${first?.slug ?? "/"} to ${last?.slug ?? "/"}`,
  };
}

function countCityMarkets() {
  const areas = new Set(
    getPages()
      .filter((page) => page.pageType === "City Service Page")
      .map((page) => page.targetArea.replace(/,.*$/, "").trim()),
  );
  return areas.size;
}

export function buildHeroStats() {
  const cityMarkets = countCityMarkets();

  return [
    { value: `${cityMarkets}+`, label: "Cities across Canada" },
    { value: "Licensed", label: "Pump & waste crews" },
    { value: "Same-week", label: "Scheduled cleaning" },
    { value: "Priority", label: "Overflow response" },
  ];
}

export function getFeaturedPages() {
  return getPages().filter((page) => page.pageType === "Service Pillar" || page.pageType === "Emergency Landing").slice(0, 12);
}

export function getRelatedPages(page: PageEntry, limit = 4) {
  const family = getServiceFamily(page);
  return getPages()
    .filter((item) => item.slug !== page.slug && getServiceFamily(item) === family)
    .slice(0, limit);
}

export function getPageBreadcrumb(page: PageEntry) {
  const section = getSections().find((item) => item.pages.some((child) => child.slug === page.slug));
  return [section?.heading ?? SITE_NAME, page.title];
}
