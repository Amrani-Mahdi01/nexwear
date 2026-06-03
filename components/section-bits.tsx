import Link from "next/link";
import { ArrowUpRight } from "./icons";

/** Small editorial label: italic index · rule · uppercase category. */
export function SectionKicker({
  index,
  label,
}: {
  index: string;
  label: string;
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <span className="font-editorial text-lg italic">{index}</span>
      <span className="h-px w-10 bg-ink" />
      <span className="text-[0.7rem] uppercase tracking-[0.28em] text-ash">
        {label}
      </span>
    </div>
  );
}

/** Text link with an underline that wipes out, then back in, plus a darting arrow. */
export function ViewAllLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-0" />
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Link>
  );
}
