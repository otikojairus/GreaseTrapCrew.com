import type { PageEntry } from "@/lib/greasetrap";

/** Pages that advertise active overflow, backup, or urgent kitchen shutdown (P01 urgent intent). */
export function isEmergencyPage(page: PageEntry): boolean {
  if (page.pageType === "Emergency Landing") return true;
  const slug = page.slug.toLowerCase();
  return (
    slug.includes("emergency") ||
    slug.includes("overflow") ||
    slug.includes("24-hour") ||
    slug.includes("backup")
  );
}

export type ServiceIssueType =
  | "overflow_emergency"
  | "scheduled_cleaning"
  | "pumping"
  | "maintenance"
  | "installation_repair"
  | "other";

export function defaultIssueTypeForPage(page: PageEntry): ServiceIssueType {
  if (isEmergencyPage(page)) return "overflow_emergency";
  const slug = page.slug.toLowerCase();
  if (slug.includes("pump") || slug.includes("empty") || slug.includes("hauling")) return "pumping";
  if (slug.includes("mainten") || slug.includes("inspect")) return "maintenance";
  if (slug.includes("install") || slug.includes("repair") || slug.includes("replace")) {
    return "installation_repair";
  }
  return "scheduled_cleaning";
}

export function defaultUrgencyForPage(page: PageEntry): "now" | "today" | "this_week" | "flexible" {
  return isEmergencyPage(page) ? "now" : "this_week";
}