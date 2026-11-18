export type MappedIntakePayload = {
  requestId: string;
  formKind: string;
  source: string;
  pageUrl: string;
  contact?: string;
  name?: string;
  phone?: string;
  email?: string;
  location?: string;
  company?: string;
  workOrder?: string;
  form_title?: string;
  subject?: string;
  message?: string;
  fields?: Array<{ label: string; value: string }>;
  [key: string]: unknown;
};

function readString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function newRequestId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `req-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function mapJsonBodyToIntake(
  body: Record<string, unknown>,
  options?: { pageUrl?: string; formKind?: string },
): MappedIntakePayload {
  const requestId = readString(body.requestId) || newRequestId();
  const formKind = readString(options?.formKind) || readString(body.formKind) || "website-contact";

  let resolvedFormKind = formKind;
  const pageSlug = readString(body.page);
  if (pageSlug && resolvedFormKind === "website-contact") {
    resolvedFormKind = "canada_urban_callback_v1";
  }

  const record: MappedIntakePayload = {
    requestId,
    formKind: resolvedFormKind,
    source: readString(body.source) || "greasetrapcrew.com",
    pageUrl: readString(options?.pageUrl) || readString(body.pageUrl),
    ...body,
  };

  const name = readString(body.name) || readString(body.contact);
  if (name) {
    record.contact = record.contact || name;
    record.name = record.name || name;
  }

  record.phone =
    record.phone || readString(body.phone) || readString(body.phoneNumber) || readString(body.contactPhone);
  record.email = record.email || readString(body.email) || readString(body.contactEmail);
  record.location =
    record.location ||
    readString(body.location) ||
    readString(body.address) ||
    readString(body.serviceAddress);
  record.company =
    record.company || readString(body.company) || readString(body.businessName);

  if (pageSlug) {
    record.campaignPage = pageSlug;
  }

  record.requestId = requestId;
  record.formKind = resolvedFormKind;
  return record;
}