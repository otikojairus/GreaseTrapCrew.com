type BrandIconProps = {
  className?: string;
  symbolClassName?: string;
};

/** Matches footer mark: green tile + plumbing symbol */
export function BrandIcon({ className = "h-8 w-8", symbolClassName = "text-[20px]" }: BrandIconProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-lg bg-secondary text-white ${className}`}
      aria-hidden="true"
    >
      <span className={`material-symbols-outlined ${symbolClassName}`}>plumbing</span>
    </div>
  );
}
