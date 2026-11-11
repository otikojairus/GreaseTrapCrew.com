import { getSiteUrl, PHONE_NUMBER } from "@/lib/greasetrap";

export type FaqItem = {
  question: string;
  answer: string;
};

export function organizationJsonLd() {
  const siteUrl = getSiteUrl();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrapGuard Commercial",
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
    name: "TrapGuard Commercial",
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
    name: "Grease Trap Cleaning Service",
    description: "Certified commercial grease trap pumping, high-pressure hydro-jetting, and automated electronic manifest filing.",
    url,
    provider: {
      "@type": "Organization",
      name: "TrapGuard Commercial",
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
    name: "TrapGuard Commercial",
    url,
    telephone: PHONE_NUMBER,
    description: "Certified commercial grease trap pumping, high-pressure hydro-jetting, and automated electronic manifest filing.",
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