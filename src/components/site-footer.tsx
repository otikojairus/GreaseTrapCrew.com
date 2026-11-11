import Link from "next/link";
import { getAllPillarLinks } from "@/lib/links";
import { PHONE_LINK, PHONE_NUMBER, SITE_DESCRIPTION, SITE_NAME } from "@/lib/greasetrap";

const companyLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#coverage", label: "Cities" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter() {
  const pillarLinks = getAllPillarLinks();
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-primary-container text-on-surface-variant pt-space-xl pb-space-lg">
      <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter pb-space-xl">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <div className="h-8 w-8 rounded-lg bg-secondary flex items-center justify-center text-on-secondary">
                <span className="material-symbols-outlined text-[20px]">plumbing</span>
              </div>
              <span className="font-headline-sm text-headline-sm text-surface-lowest">{SITE_NAME}</span>
            </div>
            <p className="font-body-md text-body-md text-on-primary-container max-w-sm">{SITE_DESCRIPTION}</p>
            <div className="flex flex-col gap-space-xs pt-space-sm">
              <a
                href={PHONE_LINK}
                className="flex items-center gap-space-xs text-surface-lowest font-label-md text-label-md hover:opacity-90"
              >
                <span className="material-symbols-outlined text-secondary-fixed text-[18px]">call</span>
                <span>
                  {PHONE_NUMBER} (24/7)
                </span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm text-surface-lowest">Quick links</span>
            <nav className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              {companyLinks.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-surface-lowest transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <span className="font-headline-sm text-headline-sm text-surface-lowest">Top services</span>
            <nav className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-primary-container">
              {pillarLinks.slice(0, 6).map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-surface-lowest transition-colors">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-primary-container font-body-sm text-body-sm border-t border-on-primary-container/20">
          <span className="font-label-code text-label-code text-surface-lowest uppercase">
            © {year} {SITE_NAME}. All rights reserved.
          </span>
          <span>Nationwide commercial kitchen grease trap service</span>
        </div>
      </div>
    </footer>
  );
}
