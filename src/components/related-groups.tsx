import Link from "next/link";
import type { RelatedLinkGroup } from "@/lib/links";

type RelatedGroupsProps = {
  groups: RelatedLinkGroup[];
};

export function RelatedGroups({ groups }: RelatedGroupsProps) {
  if (groups.length === 0) return null;

  return (
    <div className="related-hub">
      {groups.map((group) => (
        <article key={group.title} className={`related-hub-card related-hub-card--${group.kind}`}>
          <header className="related-hub-header">
            <div className="related-hub-icon" aria-hidden="true">
              {group.kind === "city" ? "↗" : "◎"}
            </div>
            <div>
              <p className="related-hub-kicker">{group.kind === "city" ? "Near you" : "More help"}</p>
              <h3 className="related-hub-title">{group.title}</h3>
              {group.description ? <p className="related-hub-desc">{group.description}</p> : null}
            </div>
          </header>

          <div className="related-hub-track">
            {group.links.map((link, index) => (
              <Link key={link.href} href={link.href} className="related-tile">
                <span className="related-tile-index">{String(index + 1).padStart(2, "0")}</span>
                <span className="related-tile-label">{link.label}</span>
                <span className="related-tile-arrow" aria-hidden="true">
                  →
                </span>
              </Link>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
