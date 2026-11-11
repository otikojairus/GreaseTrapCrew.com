import type { Metadata } from "next";
import { HomeStitchView } from "@/components/home-stitch-view";
import { JsonLd } from "@/components/json-ld";
import { getAllPillarLinks, getUniqueCityCoverageLinks } from "@/lib/links";
import { buildHeroStats, SITE_NAME } from "@/lib/greasetrap";
import { buildHomeFaqs, buildHomeIntro, buildTrustPoints } from "@/lib/page-content";
import { buildHomeMetaDescription, buildHomeMetaTitle, buildHomeH1 } from "@/lib/seo";
import { breadcrumbJsonLd, homeFaqJsonLd } from "@/lib/structured-data";

export function generateMetadata(): Metadata {
  const title = buildHomeMetaTitle();
  const description = buildHomeMetaDescription();

  return {
    title,
    description,
    alternates: { canonical: "/" },
    openGraph: {
      title,
      description,
      url: "/",
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

const testimonials = [
  {
    quote:
      "Our traps were overdue and the dining room smelled off. They pumped, cleaned, and left records we could show the inspector the same week.",
    name: "Marco Deluca",
    role: "Operations, Quick-Service Chain",
  },
  {
    quote:
      "Coordinated all six locations on one schedule. Clear pricing, after-hours access, and no surprises on the invoice.",
    name: "Priya Nair",
    role: "Facilities Manager",
  },
  {
    quote:
      "One coordinator for our portfolio — scheduling and pump notes are consistent across every store.",
    name: "Emily Stones",
    role: "Regional Restaurant Group",
  },
];

export default function HomePage() {
  const pillarLinks = getAllPillarLinks();
  const cityLinks = getUniqueCityCoverageLinks(23);
  const faqs = buildHomeFaqs();
  const trustPoints = buildTrustPoints();
  const stats = buildHeroStats();

  const homeSchema: Record<string, unknown>[] = [breadcrumbJsonLd(null, true)];
  const faqSchema = homeFaqJsonLd(faqs);
  if (faqSchema) homeSchema.push(faqSchema);

  return (
  <>
      <JsonLd data={homeSchema} />
      <HomeStitchView
          h1={buildHomeH1()}
          intro={buildHomeIntro()}
          pillarLinks={pillarLinks}
          cityLinks={cityLinks}
          faqs={faqs}
          trustPoints={trustPoints}
          stats={stats}
          testimonials={testimonials}
        />
    </>
  );
}
