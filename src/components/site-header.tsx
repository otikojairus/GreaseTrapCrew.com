import Image from "next/image";
import Link from "next/link";
import { SiteNav } from "@/components/site-nav";
import { PHONE_LINK, PHONE_NUMBER, SITE_NAME } from "@/lib/greasetrap";

export function SiteHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin flex items-center justify-between gap-gutter">
        <Link href="/" className="flex items-center gap-space-md shrink-0" aria-label={`${SITE_NAME} home`}>
          <Image
            src="/greasetrap-mark.svg"
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight">{SITE_NAME}</span>
            <span className="font-label-code text-label-code uppercase tracking-wider text-secondary">
              Canada commercial kitchens
            </span>
          </div>
        </Link>

        <SiteNav />

        <div className="flex items-center gap-space-md shrink-0">
          <a
            className="hidden sm:flex items-center gap-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-high hover:bg-surface-container-highest transition-colors"
            href={PHONE_LINK}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
            </span>
            <div className="flex flex-col text-left">
              <span className="font-label-code text-label-code text-error uppercase">24/7 dispatch</span>
              <span className="font-label-md text-label-md text-on-surface font-semibold">{PHONE_NUMBER}</span>
            </div>
          </a>
          <a
            className="hidden md:inline-flex px-space-md py-space-sm rounded-lg bg-primary text-white hover:bg-primary-container hover:text-white font-label-lg text-label-lg transition-colors shadow-sm"
            href={PHONE_LINK}
          >
            Call now
          </a>
        </div>
      </div>
    </header>
  );
}
