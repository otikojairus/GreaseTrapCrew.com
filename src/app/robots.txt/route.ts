import { getSiteUrl } from "@/lib/greasetrap";

export function GET() {
  const siteUrl = getSiteUrl();
  const content = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${siteUrl}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}