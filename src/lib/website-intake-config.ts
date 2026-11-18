export function isWebsiteIntakeConfigured(): boolean {
  const middlewareUrl = String(process.env.BITRIX_MIDDLEWARE_URL ?? "").trim();
  const secret = String(process.env.WEBSITE_INTAKE_SECRET ?? "").trim();
  return Boolean(middlewareUrl && secret);
}

export function websiteIntakeEnabled(): boolean {
  if (String(process.env.WEBSITE_INTAKE_ENABLED ?? "").toLowerCase() === "false") {
    return false;
  }
  return isWebsiteIntakeConfigured();
}

export function getWebsiteIntakeMiddlewareUrl(): string {
  return String(process.env.BITRIX_MIDDLEWARE_URL ?? "").trim().replace(/\/$/, "");
}

export function getWebsiteIntakeSecret(): string {
  return String(process.env.WEBSITE_INTAKE_SECRET ?? "").trim();
}