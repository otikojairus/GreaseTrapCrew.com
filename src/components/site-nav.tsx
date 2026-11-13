"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { PHONE_LINK, PHONE_NUMBER } from "@/lib/greasetrap";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/#coverage", label: "Cities" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNavDesktop() {
  return (
    <nav className="flex items-center gap-space-md" aria-label="Primary">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="px-space-sm py-space-xs font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high rounded-lg transition-colors"
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function SiteNavMobile() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const mobileMenu =
    open && mounted ? (
      <div id="mobile-nav" className="fixed inset-0 z-[200] xl:hidden" role="dialog" aria-modal="true">
        <div className="absolute inset-0 bg-black/55" onClick={() => setOpen(false)} aria-hidden="true" />
        <div className="absolute top-0 right-0 flex h-full w-[min(100%,20rem)] flex-col gap-space-sm border-l border-outline-variant/40 bg-white p-space-lg shadow-2xl">
          <div className="flex items-center justify-between gap-space-sm pb-space-sm border-b border-outline-variant/30">
            <p className="font-label-code text-label-code uppercase text-secondary tracking-wider">Menu</p>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center rounded-lg bg-surface-container text-on-surface"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-space-sm font-label-lg text-label-lg text-on-surface"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PHONE_LINK}
            className="mt-space-md w-full py-3 rounded-lg bg-secondary text-white font-label-lg text-center font-semibold"
          >
            Call {PHONE_NUMBER}
          </a>
        </div>
      </div>
    ) : null;

  return (
    <>
      <button
        type="button"
        className="xl:hidden w-10 h-10 flex shrink-0 items-center justify-center rounded-lg bg-surface-container"
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="material-symbols-outlined text-on-surface">{open ? "close" : "menu"}</span>
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
      </button>
      {mounted && mobileMenu ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
