import { NextResponse } from "next/server";
import { SITE_NAME } from "@/lib/greasetrap";
import {
  buildIntakeMeta,
  forwardServiceRequest,
  newIncidentId,
  type ServiceRequestPayload,
} from "@/lib/intake";
import { websiteIntakeEnabled } from "@/lib/website-intake-config";

const ISSUE_TYPES = new Set([
  "overflow_emergency",
  "scheduled_cleaning",
  "pumping",
  "maintenance",
  "installation_repair",
  "other",
]);

const URGENCY = new Set(["now", "today", "this_week", "flexible"]);
const CONTACT = new Set(["call", "text", "email"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const contactName = String(body.contactName ?? "").trim();
  const contactPhone = String(body.contactPhone ?? "").trim();
  const location = String(body.location ?? "").trim();
  const issueType = String(body.issueType ?? "other").trim();
  const urgency = String(body.urgency ?? "flexible").trim();
  const preferredContact = String(body.preferredContact ?? "call").trim() as ServiceRequestPayload["preferredContact"];

  if (!contactName || contactName.length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }
  if (!contactPhone || contactPhone.replace(/\D/g, "").length < 10) {
    return NextResponse.json({ error: "A valid phone number is required" }, { status: 400 });
  }
  if (!location || location.length < 2) {
    return NextResponse.json({ error: "City or address is required" }, { status: 400 });
  }
  if (!ISSUE_TYPES.has(issueType)) {
    return NextResponse.json({ error: "Invalid issue type" }, { status: 400 });
  }
  if (!URGENCY.has(urgency)) {
    return NextResponse.json({ error: "Invalid urgency" }, { status: 400 });
  }
  if (!CONTACT.has(preferredContact)) {
    return NextResponse.json({ error: "Invalid contact preference" }, { status: 400 });
  }

  const incidentId =
    typeof body.incidentId === "string" && body.incidentId.trim().length >= 8
      ? body.incidentId.trim()
      : newIncidentId();

  const pageSlug = String(body.pageSlug ?? "/").trim() || "/";
  const pageUrl = String(body.pageUrl ?? "").trim();
  const { siteUrl, siteHost } = buildIntakeMeta();
  const resolvedPageUrl = pageUrl || `${siteUrl}${pageSlug === "/" ? "" : pageSlug}`;

  const payload: ServiceRequestPayload = {
    schemaVersion: "greasetrap-intake-1",
    source: SITE_NAME,
    siteHost,
    pageUrl: resolvedPageUrl,
    pageSlug,
    pageType: body.pageType ? String(body.pageType) : undefined,
    primaryKeyword: body.primaryKeyword ? String(body.primaryKeyword) : undefined,
    incidentId,
    contactName,
    contactPhone,
    contactEmail: body.contactEmail ? String(body.contactEmail).trim() : undefined,
    preferredContact,
    location,
    issueType,
    urgency,
    notes: body.notes ? String(body.notes).trim().slice(0, 2000) : undefined,
    businessName: body.businessName ? String(body.businessName).trim().slice(0, 200) : undefined,
    submittedAt: new Date().toISOString(),
  };

  if (!websiteIntakeEnabled()) {
    return NextResponse.json(
      { error: "Callback requests are temporarily unavailable. Please call instead." },
      { status: 503 },
    );
  }

  try {
    const result = await forwardServiceRequest(payload);
    const followUp =
      preferredContact === "call"
        ? "We'll call you back shortly. You can still use the number above if it's urgent."
        : "Our team will follow up using your preferred contact method.";

    return NextResponse.json({
      ok: true,
      accepted: true,
      reference: result.reference,
      requestId: result.requestId,
      incidentId,
      dealId: result.dealId,
      forwarded: result.forwarded,
      message: `Request received. Reference ${result.reference}. ${followUp}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Intake delivery failed";
    console.error("[intake] forward failed", message);
    const status = message.includes("not configured") ? 503 : 502;
    return NextResponse.json({ error: "Unable to submit right now. Please call instead." }, { status });
  }
}

export async function GET() {
  return NextResponse.json({ enabled: websiteIntakeEnabled() });
}