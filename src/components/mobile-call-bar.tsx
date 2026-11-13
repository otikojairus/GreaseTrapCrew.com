import { PHONE_LINK, PHONE_NUMBER } from "@/lib/greasetrap";

export function MobileCallBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-[150] border-t border-outline-variant/25 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="px-margin-mobile py-space-sm">
          <a
            href={PHONE_LINK}
            className="flex w-full items-center justify-center gap-space-xs rounded-lg bg-secondary px-space-lg py-3.5 text-white font-label-lg font-semibold shadow-sm active:opacity-95"
          >
            <span className="material-symbols-outlined text-[22px]">call</span>
            <span>Call {PHONE_NUMBER}</span>
          </a>
      </div>
    </div>
  );
}
