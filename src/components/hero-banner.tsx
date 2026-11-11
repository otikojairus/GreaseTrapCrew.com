import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteImage } from "@/lib/images";

type HeroBannerProps = {
  children: ReactNode;
  image?: SiteImage;
  backgroundSrc?: string;
  className?: string;
  gridClassName?: string;
};

export function HeroBanner({
  children,
  image,
  backgroundSrc,
  className = "hero",
  gridClassName = "hero-grid",
}: HeroBannerProps) {
  const bg = backgroundSrc ?? image?.src;

  return (
    <section className={`${className} hero-has-bg`.trim()}>
      {bg ? (
        <div className="hero-bg" aria-hidden="true">
          <Image src={bg} alt="" fill priority className="hero-bg-image" sizes="100vw" />
          <div className="hero-bg-scrim" />
        </div>
      ) : null}
      <div className={`container ${gridClassName} hero-grid-on-bg`}>{children}</div>
    </section>
  );
}
