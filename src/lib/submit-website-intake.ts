import {
  getWebsiteIntakeMiddlewareUrl,
  getWebsiteIntakeSecret,
  websiteIntakeEnabled,
} from "@/lib/website-intake-config";

export type WebsiteIntakeForwardResult =
  | {
      ok: true;
      accepted: true;
      requestId: string;
      reference: string;
      dealId?: string;
    }
  | { ok: false; status: number; error: string };

export async function forwardWebsiteIntake(params: {
  body: Record<string, unknown>;
  formKind: string;
  requestId?: string;
  pageUrl?: string;
}): Promise<WebsiteIntakeForwardResult> {
  if (!websiteIntakeEnabled()) {
    return { ok: false, status: 503, error: "Website intake is not configured" };
  }

  const requestId =
    String(params.requestId ?? params.body.requestId ?? "").trim() ||
    (typeof crypto.randomUUID === "function" ? crypto.randomUUID() : `req-${Date.now()}`);

  const middlewareUrl = getWebsiteIntakeMiddlewareUrl();
  const secret = getWebsiteIntakeSecret();

  const payload = {
    ...params.body,
    requestId,
    formKind: params.formKind,
    pageUrl: params.pageUrl ?? params.body.pageUrl ?? "",
  };

  const response = await fetch(`${middlewareUrl}/webhooks/inbound/website/form`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-website-intake-secret": secret,
      "Idempotency-Key": requestId,
    },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(20000),
  });

  const data = (await response.json().catch(() => ({}))) as {
    accepted?: boolean;
    requestId?: string;
    reference?: string;
    dealId?: string;
    error?: string;
  };

  if (!response.ok || data.accepted !== true || !data.reference) {
    return {
      ok: false,
      status: response.status || 502,
      error: data.error || "Middleware did not confirm intake",
    };
  }

  return {
    ok: true,
    accepted: true,
    requestId: String(data.requestId ?? requestId),
    reference: String(data.reference),
    dealId: data.dealId ? String(data.dealId) : undefined,
  };
}