import type { ReactNode } from "react";

/**
 * Seamless marquee. Renders the children twice and translates the track by
 * -50% so the loop is continuous. Pauses on hover (see globals.css).
 */
export function Marquee({
  children,
  duration = 32,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={`group/marquee overflow-hidden ${className ?? ""}`}>
      <div
        className="flex w-max animate-marquee"
        style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
