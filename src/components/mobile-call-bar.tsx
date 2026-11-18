import { PHONE_LINK } from "@/lib/greasetrap";

export function MobileCallBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-[150] border-t border-outline-variant/25 bg-surface-container-lowest/95 backdrop-blur-md shadow-[0_-6px_24px_rgba(0,0,0,0.1)] pb-[env(safe-area-inset-bottom,0px)]">
      <div className="px-margin-mobile py-space-sm flex gap-space-sm">
        <a
          href={PHONE_LINK}
          className="flex flex-1 items-center justify-center gap-space-xs rounded-lg bg-secondary px-space-md py-3.5 text-white font-label-lg font-semibold shadow-sm active:opacity-95"
        >
          <span className="material-symbols-outlined text-[22px]">call</span>
          <span>Call</span>
        </a>
        <a
          href="#contact"
          className="flex flex-1 items-center justify-center gap-space-xs rounded-lg border border-outline-variant/40 bg-surface px-space-md py-3.5 font-label-lg font-semibold text-primary active:opacity-95"
        >
          <span className="material-symbols-outlined text-[22px]">mail</span>
          <span>Callback</span>
        </a>
      </div>
    </div>
  );
}
