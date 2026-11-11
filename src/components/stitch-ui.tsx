import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { FaqItem, ContentSection } from "@/lib/page-content";
import type { InternalLink, RelatedLinkGroup } from "@/lib/links";
import type { SiteImage } from "@/lib/images";
import { PHONE_LINK, PHONE_NUMBER, SITE_NAME } from "@/lib/greasetrap";

export const SECTION_ICON: Record<ContentSection["icon"], string> = {
  shield: "verified",
  clipboard: "assignment",
  clock: "schedule",
  building: "store",
  check: "check_circle",
  phone: "call",
};

export function StitchShell({ children }: { children: ReactNode }) {
  return <div className="flex flex-col w-full bg-surface">{children}</div>;
}

export function StitchTicker({
  stats,
}: {
  stats?: { value: string; label: string }[];
}) {
  return (
    <section className="w-full bg-primary text-on-primary py-2 px-margin-mobile lg:px-margin">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-2 text-label-code font-label-code uppercase tracking-wider">
        <div className="flex items-center gap-space-sm text-secondary-fixed">
          <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
          <span>{SITE_NAME} — Canada commercial kitchens</span>
        </div>
        <div className="flex flex-wrap items-center gap-space-md text-surface-variant">
          {stats?.slice(0, 2).map((s) => (
            <span key={s.label}>
              {s.value} {s.label}
            </span>
          ))}
          {stats?.length ? <span>•</span> : null}
          <a className="text-secondary-fixed font-semibold hover:underline" href={PHONE_LINK}>
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}

export function StitchBreadcrumbs({ items }: { items: InternalLink[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-space-sm">
      <ol className="flex flex-wrap items-center gap-1 font-label-md text-label-md text-on-surface-variant">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.href}-${item.label}`} className="flex items-center gap-1">
              {index > 0 ? <span aria-hidden="true">/</span> : null}
              {isLast ? (
                <span className="text-on-surface" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link href={item.href} className="hover:text-on-surface transition-colors">
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function StitchHero({
  eyebrow,
  title,
  intro,
  image,
  breadcrumbs,
  chips,
  secondaryHref,
  secondaryLabel,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image: SiteImage;
  breadcrumbs?: InternalLink[];
  chips?: string[];
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <section className="relative w-full bg-surface-container-lowest pt-space-xl pb-space-xl lg:pb-20">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            {breadcrumbs ? <StitchBreadcrumbs items={breadcrumbs} /> : null}
            <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded bg-surface-container text-on-surface font-label-code text-label-code tracking-wider uppercase">
              <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              {eyebrow}
            </div>
            <h1 className="font-headline-lg lg:font-display-hero text-headline-lg lg:text-display-hero text-primary tracking-tight leading-[1.08]">
              {title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{intro}</p>
            {chips && chips.length > 0 ? (
              <div className="flex flex-wrap gap-space-xs">
                {chips.map((chip) => (
                  <span
                    key={chip}
                    className="px-space-sm py-1 rounded-lg bg-surface-container-low font-label-md text-label-md text-on-surface"
                  >
                    {chip}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md pt-space-xs">
              <a
                className="inline-flex items-center justify-center gap-space-xs px-space-xl py-3.5 rounded-lg bg-secondary text-white font-label-lg text-label-lg font-semibold hover:bg-on-secondary-container hover:text-white transition-all shadow-sm"
                href={PHONE_LINK}
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                Call {PHONE_NUMBER}
              </a>
              {secondaryHref && secondaryLabel ? (
                <Link
                  href={secondaryHref}
                  className="inline-flex items-center justify-center gap-space-xs px-space-lg py-3.5 rounded-lg bg-surface-container text-on-surface font-label-lg text-label-lg font-semibold hover:bg-surface-container-high transition-colors"
                >
                  {secondaryLabel}
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>
              ) : null}
            </div>
          </div>
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <div className="relative w-full min-h-[280px] rounded-xl overflow-hidden bg-surface-container-high shadow-xl aspect-[4/3] lg:aspect-auto lg:h-[420px]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StitchSectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  const alignClass = align === "center" ? "text-center mx-auto" : "";
  return (
    <div className={`max-w-3xl mb-space-lg ${alignClass}`}>
      <span className="font-label-code text-label-code uppercase tracking-wider text-secondary font-bold">{eyebrow}</span>
      <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1">{title}</h2>
      {description ? <p className="font-body-md text-body-md text-on-surface-variant mt-1">{description}</p> : null}
    </div>
  );
}

export function StitchContentCards({ sections }: { sections: ContentSection[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
      {sections.map((section) => (
        <article
          key={section.id}
          className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm border border-outline-variant/20"
        >
          <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[28px]">{SECTION_ICON[section.icon]}</span>
          </div>
          <span className="font-label-code text-label-code uppercase text-secondary font-bold">{section.eyebrow}</span>
          <h3 className="font-headline-sm text-headline-sm text-primary">{section.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant">{section.body}</p>
        </article>
      ))}
    </div>
  );
}

export function StitchProcessSteps() {
  const steps = [
    { n: "01", title: "Scope & access", body: "Trap size, hood volume, and after-hours entry confirmed before dispatch." },
    { n: "02", title: "Pump & clean", body: "Vacuum, scrape baffles, flush lines, and reset covers without leaving debris." },
    { n: "03", title: "Inspect & advise", body: "Note corrosion, missing gaskets, or overflow risk — with plain-language next steps." },
    { n: "04", title: "Record & follow-up", body: "Same-day service notes; optional recurring schedule so nothing lapses." },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
      {steps.map((step) => (
        <div key={step.n} className="p-space-md rounded-xl bg-surface-container-lowest border border-outline-variant/20">
          <span className="font-label-code text-label-code text-secondary font-bold">{step.n}</span>
          <h3 className="font-headline-sm text-headline-sm text-primary mt-1">{step.title}</h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{step.body}</p>
        </div>
      ))}
    </div>
  );
}

export function StitchCityGrid({ links, id = "coverage" }: { links: InternalLink[]; id?: string }) {
  if (!links.length) return null;
  return (
    <section className="w-full bg-surface py-space-xl" id={id}>
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <StitchSectionHeading
          align="center"
          eyebrow="Local coverage"
          title="Technicians in cities across Canada"
          description="Pick your area for local scheduling, or call for multi-unit support."
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-space-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-space-sm py-space-md rounded-lg bg-surface-container-lowest border border-outline-variant/30 text-center font-label-lg text-label-lg text-on-surface hover:bg-surface-container-high transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StitchFaqSection({ faqs, id = "faq" }: { faqs: FaqItem[]; id?: string }) {
  return (
    <section className="w-full bg-surface-container-lowest py-space-xl" id={id}>
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <StitchSectionHeading eyebrow="FAQ" title="What kitchen operators ask us" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="p-space-md rounded-xl bg-surface-container-low border border-outline-variant/20"
            >
              <summary className="font-label-lg font-semibold text-on-surface cursor-pointer list-none">
                {faq.question}
              </summary>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StitchRelatedGroups({ groups }: { groups: RelatedLinkGroup[] }) {
  if (!groups.length) return null;
  return (
    <section className="w-full bg-surface-container-low py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <StitchSectionHeading
          eyebrow="What's next"
          title="You might also need"
          description="Related services and nearby cities — same crew, same phone number."
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
          {groups.map((group) => (
            <article
              key={group.title}
              className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/20"
            >
              <p className="font-label-code text-label-code uppercase text-secondary tracking-wider">
                {group.kind === "city" ? "Near you" : "More help"}
              </p>
              <h3 className="font-headline-sm text-headline-sm text-primary mt-1">{group.title}</h3>
              {group.description ? (
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">{group.description}</p>
              ) : null}
              <ul className="mt-space-md flex flex-col gap-space-xs">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="inline-flex items-center gap-1 font-label-lg text-label-lg text-secondary hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StitchEmergencyBand() {
  return (
    <section className="w-full bg-error-container text-on-error-container py-space-lg" id="emergency-section">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-md">
            <div className="w-14 h-14 rounded-full bg-error text-on-error flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[32px] animate-pulse">warning</span>
            </div>
            <div className="flex flex-col">
              <h3 className="font-headline-md text-headline-md font-bold text-on-error-container">
                Active overflow or backup?
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Call now if the trap is backing up — we prioritize kitchen shutdowns.
              </p>
            </div>
          </div>
          <a
            className="inline-flex items-center gap-space-xs px-space-xl py-3.5 rounded-lg bg-error text-on-error font-headline-sm font-bold shadow-md hover:opacity-95 transition-opacity"
            href={PHONE_LINK}
          >
            <span className="material-symbols-outlined text-[24px]">call</span>
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}

export function StitchPhoneCta({
  title = "Your next service visit starts with one call",
  description = "Tell us your kitchen type and city — we confirm scope and the next available window.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="w-full bg-surface py-space-xl" id="contact">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="p-space-xl rounded-xl bg-primary-container text-on-primary flex flex-col md:flex-row items-center justify-between gap-space-lg">
          <div className="max-w-xl">
            <span className="font-label-code text-label-code uppercase tracking-wider text-secondary-fixed">Ready to book</span>
            <h2 className="font-headline-lg text-headline-lg text-surface-lowest mt-1">{title}</h2>
            <p className="font-body-md text-body-md text-on-primary-container mt-2">{description}</p>
          </div>
          <a
            href={PHONE_LINK}
            className="inline-flex items-center justify-center gap-2 px-space-xl py-3.5 rounded-lg bg-secondary text-white font-label-lg font-semibold shrink-0 hover:bg-on-secondary-container hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">call</span>
            {PHONE_NUMBER}
          </a>
        </div>
      </div>
    </section>
  );
}

export function StitchKeywordPills({ keywords }: { keywords: string[] }) {
  if (!keywords.length) return null;
  return (
    <section className="w-full bg-surface-container-low py-space-lg">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <StitchSectionHeading eyebrow="Good to know" title="People also ask about" />
        <div className="flex flex-wrap gap-space-sm">
          {keywords.map((kw) => (
            <span
              key={kw}
              className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest border border-outline-variant/30 font-label-md text-label-md text-on-surface-variant"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StitchSplitFeature({
  eyebrow,
  title,
  body,
  image,
}: {
  eyebrow: string;
  title: string;
  body: string;
  image: SiteImage;
}) {
  return (
    <section className="w-full bg-surface py-space-xl">
      <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
          <div className="lg:col-span-5 relative min-h-[280px] rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-high">
            <Image src={image.src} alt={image.alt} fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <div className="lg:col-span-7 flex flex-col gap-space-md">
            <span className="font-label-code text-label-code uppercase tracking-wider text-secondary font-bold">{eyebrow}</span>
            <h2 className="font-headline-lg text-headline-lg text-primary">{title}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{body}</p>
            <a
              href={PHONE_LINK}
              className="inline-flex items-center justify-center gap-2 px-space-lg py-3 rounded-lg bg-secondary text-white font-label-lg font-semibold w-fit hover:text-white"
            >
              Call {PHONE_NUMBER}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
