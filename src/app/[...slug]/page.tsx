import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import {
  StitchCityGrid,
  StitchContentCards,
  StitchEmergencyBand,
  StitchFaqSection,
  StitchHero,
  StitchKeywordPills,
  StitchPhoneCta,
  StitchProcessSteps,
  StitchRelatedGroups,
  StitchSectionHeading,
  StitchShell,
  StitchSplitFeature,
  StitchTicker,
} from "@/components/stitch-ui";
import {
  getBreadcrumbItems,
  getPillarCityLinks,
  getPillarPage,
  getRelatedLinkGroups,
  isPillarPage,
} from "@/lib/links";
import {
  PHONE_NUMBER,
  buildHeroStats,
  getPageByPath,
  getPages,
  getServiceFamily,
  normalizePath,
  SITE_NAME,
} from "@/lib/greasetrap";
import { buildBodySections, buildFaqs, buildIntro, getPageH1 } from "@/lib/page-content";
import { LOCAL_IMAGES, getHeroImage, getSecondaryImage } from "@/lib/images";
import { buildMetaDescription, buildMetaTitle } from "@/lib/seo";
import {
  breadcrumbJsonLd,
  faqPageJsonLd,
  localBusinessJsonLd,
  serviceJsonLd,
} from "@/lib/structured-data";
type SlugPageProps = {
  params: Promise<{ slug: string[] }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  return getPages().map((page) => ({
    slug: page.slug.replace(/^\//, "").split("/"),
  }));
}

export async function generateMetadata({ params }: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const path = normalizePath(slug.join("/"));
  const page = getPageByPath(path);

  if (!page) {
    return {};
  }

  const title = buildMetaTitle(page);
  const description = buildMetaDescription(page);

  return {
    title,
    description,
    alternates: { canonical: page.slug },
    openGraph: {
      title,
      description,
      url: page.slug,
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

export default async function GreaseTrapSlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const path = normalizePath(slug.join("/"));
  const page = getPageByPath(path);

  if (!page) {
    notFound();
  }

  const h1 = getPageH1(page);
  const intro = buildIntro(page);
  const sections = buildBodySections(page);
  const faqs = buildFaqs(page);
  const heroImage = getHeroImage(page);
  const secondaryImage = getSecondaryImage(page);
  const breadcrumbs = getBreadcrumbItems(page);
  const pillar = getPillarPage(page);
  const family = getServiceFamily(page);
  const relatedGroups = getRelatedLinkGroups(page);
  const cityLinks = pillar && isPillarPage(pillar) ? getPillarCityLinks(pillar).slice(0, 24) : [];
  const keywords = page.secondaryKeywords?.filter(Boolean).slice(0, 8) ?? [];

  const schemaItems: Record<string, unknown>[] = [];
  const breadcrumb = breadcrumbJsonLd(page);
  const service = serviceJsonLd(page);
  const localBusiness = localBusinessJsonLd(page);
  const faqSchema = faqPageJsonLd(faqs);
  if (breadcrumb) schemaItems.push(breadcrumb);
  if (service) schemaItems.push(service);
  if (localBusiness) schemaItems.push(localBusiness);
  if (faqSchema) schemaItems.push(faqSchema);

  const chips = ["Licensed crews", "Same-week dispatch", "Service records on file"];

  return (
    <>
      <JsonLd data={schemaItems} />
      <StitchShell>
        <StitchTicker stats={buildHeroStats()} />

        <StitchHero
          eyebrow={family}
          title={h1}
          intro={intro}
          image={heroImage}
          breadcrumbs={breadcrumbs}
          chips={chips}
          secondaryHref={pillar && pillar.slug !== page.slug ? pillar.slug : undefined}
          secondaryLabel={pillar && pillar.slug !== page.slug ? "National overview" : undefined}
        />

        <section className="w-full bg-surface-container-low py-space-xl">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <StitchSectionHeading
              eyebrow="On every visit"
              title="A cleaner trap means a calmer kitchen"
              description="Grease buildup slows drains and brings inspectors back sooner than you planned. We pump, clean, and leave notes you can keep on file."
            />
            <div className="relative w-full max-w-4xl mx-auto rounded-xl overflow-hidden aspect-video mb-space-xl">
              <Image
                src={LOCAL_IMAGES.beforeAfter.src}
                alt={LOCAL_IMAGES.beforeAfter.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
            <StitchContentCards sections={sections.slice(0, 3)} />
          </div>
        </section>

        <section className="w-full bg-surface py-space-xl">
          <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
            <StitchSectionHeading
              eyebrow="How it works"
              title="Four steps from call to clean trap"
              align="center"
            />
            <StitchProcessSteps />
          </div>
        </section>

        {sections.length > 3 ? (
          <section className="w-full bg-surface-container-low py-space-xl">
            <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
              <StitchContentCards sections={sections.slice(3)} />
            </div>
          </section>
        ) : null}

        {sections[3] ? (
          <StitchSplitFeature
            eyebrow={sections[3].eyebrow}
            title={sections[3].title}
            body={sections[3].body}
            image={secondaryImage}
          />
        ) : null}

        <StitchKeywordPills keywords={keywords} />
        <StitchCityGrid links={cityLinks} />
        <StitchFaqSection faqs={faqs} />
        <StitchRelatedGroups groups={relatedGroups} />
        <StitchEmergencyBand />
        <StitchPhoneCta
          description={`Tell us your kitchen type and location (${page.targetArea}) — we confirm scope and the next available window. Call ${PHONE_NUMBER}.`}
        />
      </StitchShell>
    </>
  );
}
