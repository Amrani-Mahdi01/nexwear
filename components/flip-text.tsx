/**
 * Vertically flips between a default copy and an italic serif copy when the
 * nearest ancestor with class `group` is hovered. Place inside a `group`.
 */
export function FlipText({ text }: { text: string }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {text}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full font-editorial italic transition-transform duration-[450ms] ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {text}
      </span>
    </span>
  );
}
