import { randomUUID } from "crypto";
import { mapJsonBodyToIntake, type MappedIntakePayload } from "@/lib/form-intake-mapper";
import { forwardWebsiteIntake } from "@/lib/submit-website-intake";
import { getSiteUrl } from "@/lib/greasetrap";

export type ServiceRequestPayload = {
  schemaVersion: "greasetrap-intake-1";
  source: string;
  siteHost: string;
  pageUrl: string;
  pageSlug: string;
  pageType?: string;
  primaryKeyword?: string;
  incidentId: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  preferredContact: "call" | "text" | "email";
  location: string;
  issueType: string;
  urgency: string;
  notes?: string;
  businessName?: string;
  submittedAt: string;
};

const ISSUE_LABELS: Record<string, string> = {
  overflow_emergency: "Overflow / backup (urgent)",
  scheduled_cleaning: "Scheduled cleaning",
  pumping: "Pumping / emptying",
  maintenance: "Maintenance / inspection",
  installation_repair: "Install, repair, or replace",
  other: "Other grease-trap issue",
};

const URGENCY_LABELS: Record<string, string> = {
  now: "Now — kitchen backing up",
  today: "Today",
  this_week: "This week",
  flexible: "Flexible / planning ahead",
};

export function newIncidentId(): string {
  return randomUUID();
}

export function buildIntakeMeta() {
  const siteUrl = getSiteUrl();
  let siteHost = "greasetrapcrew.com";
  try {
    siteHost = new URL(siteUrl).host;
  } catch {
    /* keep default */
  }
  return { siteUrl, siteHost };
}

export function mapServiceRequestToIntakeBody(payload: ServiceRequestPayload): MappedIntakePayload {
  const pageToken = payload.pageSlug.replace(/^\//, "") || "home";
  const issueLabel = ISSUE_LABELS[payload.issueType] ?? payload.issueType;
  const urgencyLabel = URGENCY_LABELS[payload.urgency] ?? payload.urgency;

  const messageLines = [
    `Service: ${issueLabel}`,
    `Urgency: ${urgencyLabel}`,
    `Preferred follow-up: ${payload.preferredContact}`,
  ];
  if (payload.pageType) messageLines.push(`Page type: ${payload.pageType}`);
  if (payload.primaryKeyword) messageLines.push(`Keyword context: ${payload.primaryKeyword}`);
  if (payload.notes) messageLines.push(`Notes: ${payload.notes}`);

  const body: Record<string, unknown> = {
    requestId: payload.incidentId,
    formKind: "website-contact",
    source: payload.siteHost,
    pageUrl: payload.pageUrl,
    page: pageToken,
    name: payload.contactName,
    contact: payload.contactName,
    phone: payload.contactPhone,
    email: payload.contactEmail,
    location: payload.location,
    company: payload.businessName,
    subject: `Grease trap — ${issueLabel}`,
    message: messageLines.join("\n"),
    schema_version: payload.schemaVersion,
    issueType: payload.issueType,
    urgency: payload.urgency,
    preferredContact: payload.preferredContact,
    fields: [
      { label: "Issue type", value: issueLabel },
      { label: "Urgency", value: urgencyLabel },
      { label: "Preferred contact", value: payload.preferredContact },
    ],
  };

  return mapJsonBodyToIntake(body, {
    pageUrl: payload.pageUrl,
    formKind: "website-contact",
  });
}

export async function forwardServiceRequest(payload: ServiceRequestPayload): Promise<{
  ok: boolean;
  reference: string;
  forwarded: boolean;
  requestId: string;
  dealId?: string;
}> {
  const mapped = mapServiceRequestToIntakeBody(payload);
  const formKind = String(mapped.formKind ?? "canada_urban_callback_v1");

  const result = await forwardWebsiteIntake({
    body: mapped,
    formKind,
    requestId: payload.incidentId,
    pageUrl: payload.pageUrl,
  });

  if (!result.ok) {
    throw new Error(result.error);
  }

  return {
    ok: true,
    reference: result.reference,
    forwarded: true,
    requestId: result.requestId,
    dealId: result.dealId,
  };
}