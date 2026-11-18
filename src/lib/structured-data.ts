import { getSiteUrl, PHONE_NUMBER, SITE_NAME } from "@/lib/greasetrap";

export type FaqItem = {
  question: string;
  answer: string;
};

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: siteUrl,
    telephone: PHONE_NUMBER,
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
  };
}

export function webSiteJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: siteUrl,
  };
}

export function breadcrumbJsonLd(page: any, isHome = false) {
  const siteUrl = getSiteUrl();
  const items = isHome
    ? [{ href: "/", label: "Home" }]
    : page
      ? [{ href: page.slug, label: page.title }]
      : [{ href: "/", label: "Home" }];

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    })),
  };
}

export function serviceJsonLd(page: any) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.primaryKeyword || page.title,
    description:
      "Commercial grease trap and interceptor cleaning, pumping, maintenance, and overflow support for kitchens across Canada.",
    url,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: siteUrl,
      telephone: PHONE_NUMBER,
    },
    areaServed: {
          "@type": "Country",
          name: "Canada",
        },
  };
}

export function localBusinessJsonLd(page: any) {
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}${page.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: SITE_NAME,
    url,
    telephone: PHONE_NUMBER,
    description:
      "Commercial grease trap and interceptor cleaning, pumping, maintenance, and overflow support for kitchens across Canada.",
    areaServed: {
      "@type": "Country",
      name: "Canada",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Canada",
      addressRegion: "CA",
      addressCountry: "CA",
    },
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function homeFaqJsonLd(faqs: FaqItem[]) {
  return faqPageJsonLd(faqs);
}