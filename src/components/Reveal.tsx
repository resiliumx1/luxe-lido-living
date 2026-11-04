import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/**
 * Wraps a block in the site's scroll-reveal transition.
 * delay is a 1–6 stagger step, matching .reveal-delay-* in index.css.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useScrollReveal();
  const stagger = delay > 0 ? ` reveal-delay-${Math.min(delay, 6)}` : "";
  return (
    <div ref={ref} className={`reveal${stagger} ${className}`.trim()}>
      {children}
    </div>
  );
}
