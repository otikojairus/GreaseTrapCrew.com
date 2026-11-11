import Image from "next/image";
import { LOCAL_IMAGES } from "@/lib/images";

export function BeforeAfterShowcase() {
  return (
    <div className="before-after">
      <div className="before-after-media">
        <Image
          src={LOCAL_IMAGES.beforeAfter.src}
          alt={LOCAL_IMAGES.beforeAfter.alt}
          width={1200}
          height={675}
          className="before-after-image"
          sizes="(max-width: 768px) 100vw, 960px"
        />
      </div>
      <div className="before-after-caption">
        <span className="eyebrow">Real results</span>
        <h3>A cleaner trap means a calmer kitchen</h3>
        <p>
          Grease buildup slows drains and brings inspectors knocking. We pump it out, scrub it down, and show you exactly
          what we removed — so you can get back to service with confidence.
        </p>
        <ul className="proof-list">
          <li>We record how much waste was hauled away</li>
          <li>Notes you can share with your health inspector</li>
          <li>We work around your prep and dinner rush</li>
        </ul>
      </div>
    </div>
  );
}
