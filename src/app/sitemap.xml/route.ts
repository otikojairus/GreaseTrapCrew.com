import { getPages, getSiteUrl } from "@/lib/greasetrap";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const siteUrl = getSiteUrl();
  const lastmod = new Date().toISOString();
  const pages = getPages();

  const urls = [
    `<url><loc>${escapeXml(siteUrl)}/</loc><lastmod>${lastmod}</lastmod><changefreq>weekly</changefreq><priority>1.0</priority></url>`,
    ...pages.map((page) => {
      const loc = `${siteUrl}${page.slug === "/" ? "" : page.slug}`;
      const priority = page.pageType === "Service Pillar" || page.pageType === "Emergency Landing" ? "0.9" : "0.7";
      return `<url><loc>${escapeXml(loc)}</loc><lastmod>${lastmod}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
    }),
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`,
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    },
  );
}