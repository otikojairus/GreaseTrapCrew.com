import Image from "next/image";
import type { SiteImage } from "@/lib/images";

type HeroImageProps = {
  image: SiteImage;
  badge?: string;
};

export function HeroImage({ image, badge = "On-site grease trap service" }: HeroImageProps) {
  return (
    <div className="hero-image-frame">
      <div className="hero-image-accent" />
      <div className="hero-image-wrap">
        <Image
          src={image.src}
          alt={image.alt}
          width={900}
          height={700}
          className="hero-image"
          priority={image.priority ?? false}
          sizes="(max-width: 768px) 100vw, 55vw"
        />
        <div className="hero-image-overlay" />
        {badge ? <span className="hero-image-badge">{badge}</span> : null}
      </div>
    </div>
  );
}
