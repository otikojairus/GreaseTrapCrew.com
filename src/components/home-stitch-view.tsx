import Image from "next/image";
import Link from "next/link";
import type { FaqItem } from "@/lib/page-content";
import { LOCAL_IMAGES } from "@/lib/images";
import {
  StitchCityGrid,
  StitchEmergencyBand,
  StitchFaqSection,
  StitchHero,
  StitchPhoneCta,
  StitchSectionHeading,
  StitchShell,
  StitchTicker,
  SECTION_ICON,
} from "@/components/stitch-ui";
import type { ContentSection } from "@/lib/page-content";

type LinkItem = { href: string; label: string };
type TrustPoint = { title: string; description: string; icon: ContentSection["icon"] };
type Stat = { value: string; label: string };
type Testimonial = { quote: string; name: string; role: string };

const serviceMeta = [
  { tag: "Scheduled service", icon: "plumbing", blurb: "Routine trap cleaning and pump-outs on intervals that match your kitchen volume." },
  { tag: "Pumping", icon: "water_drop", blurb: "Full vacuum extraction for interceptors of every size, with records for your files." },
  { tag: "Maintenance", icon: "construction", blurb: "Inspections, repairs, and catch-up visits before health reviews." },
  { tag: "Emergency", icon: "e911_emergency", blurb: "Overflow, backup, and shutdown response when the line cannot wait.", error: true },
];

export function HomeStitchView({
  h1,
  intro,
  pillarLinks,
  cityLinks,
  faqs,
  trustPoints,
  stats,
  testimonials,
}: {
  h1: string;
  intro: string;
  pillarLinks: LinkItem[];
  cityLinks: LinkItem[];
  faqs: FaqItem[];
  trustPoints: TrustPoint[];
  stats: Stat[];
  testimonials: Testimonial[];
}) {
  const services = pillarLinks.slice(0, 4);

  return (
    <StitchShell>
      <StitchTicker stats={stats} />

      <StitchHero
        eyebrow="Canada commercial kitchens"
        title={h1}
        intro={intro}
        image={LOCAL_IMAGES.pumping}
        chips={trustPoints.slice(0, 3).map((p) => p.title)}
        secondaryHref="#services"
        secondaryLabel="Browse services"
      />

      <section className="w-full bg-surface-container-low py-space-lg" aria-label="Kitchen types we serve">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="flex flex-col md:flex-row items-center justify-between gap-space-md">
            <span className="font-label-code text-label-code uppercase text-on-surface-variant tracking-wider shrink-0">
              Trusted by operators across Canada:
            </span>
            <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-8 gap-y-4 text-on-surface-variant font-headline-sm font-semibold opacity-70">
              {["Restaurants", "Hotels", "Commissaries", "Food halls", "Catering"].map((name) => (
                <span key={name} className="hover:text-primary transition-colors">
                  {name.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full stitch-section-mesh py-space-xl" id="services">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <StitchSectionHeading
            eyebrow="What we do"
            title="Grease trap service built for real kitchen operations"
            description="Cleaning, pumping, installation, repair, maintenance, and emergency overflow support — one crew, coast-to-coast."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {services.map((link, index) => {
              const meta = serviceMeta[index] ?? serviceMeta[0]!;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="stitch-card-lift p-space-lg rounded-xl bg-surface-container-lowest/95 shadow-sm flex flex-col justify-between hover:shadow-lg border border-outline-variant/10 backdrop-blur-sm"
                >
                  <div className="flex flex-col gap-space-sm">
                    <div
                      className={`w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center ${meta.error ? "text-error" : "text-primary"}`}
                    >
                      <span className="material-symbols-outlined text-[28px]">{meta.icon}</span>
                    </div>
                    <span
                      className={`font-label-code text-label-code uppercase font-bold ${meta.error ? "text-error" : "text-secondary"}`}
                    >
                      {meta.tag}
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary">{link.label}</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{meta.blurb}</p>
                  </div>
                  <span className="pt-space-md inline-flex items-center gap-1 font-label-md text-secondary font-semibold">
                    Learn more
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="w-full bg-surface py-space-lg">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
            {trustPoints.map((point) => (
              <div key={point.title} className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-1">
                <div className="flex items-center gap-1 text-secondary font-label-code text-label-code uppercase">
                  <span className="material-symbols-outlined text-[16px]">{SECTION_ICON[point.icon]}</span>
                  {point.title}
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{point.description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <StitchCityGrid links={cityLinks} />

      <section className="w-full bg-surface-container-low py-space-xl">
        <div className="max-w-7xl mx-auto px-margin-mobile lg:px-margin">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-stretch">
            <div className="lg:col-span-7 p-space-lg lg:p-space-xl rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/10">
              <StitchSectionHeading
                eyebrow="See the difference"
                title="A cleaner trap means a calmer kitchen"
                description="Grease buildup slows drains and brings inspectors back sooner than you planned. We pump, clean, and leave notes you can keep on file."
              />
              <div className="relative w-full rounded-xl overflow-hidden aspect-video mt-space-md">
                <Image
                  src={LOCAL_IMAGES.beforeAfter.src}
                  alt={LOCAL_IMAGES.beforeAfter.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-space-md">
              {testimonials.slice(0, 2).map((item) => (
                <article
                  key={item.name}
                  className="p-space-lg rounded-xl bg-surface-container-lowest shadow-sm flex flex-col gap-space-sm border border-outline-variant/10"
                >
                  <div className="flex items-center gap-1 text-tertiary-fixed-dim">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface italic">&ldquo;{item.quote}&rdquo;</p>
                  <div>
                    <span className="font-label-lg font-semibold text-on-surface block">{item.name}</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">{item.role}</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StitchEmergencyBand />
      <StitchFaqSection faqs={faqs} />
      <StitchPhoneCta />
    </StitchShell>
  );
}
