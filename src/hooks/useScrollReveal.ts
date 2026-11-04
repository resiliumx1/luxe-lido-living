import { useEffect, useRef } from "react";

export function useScrollReveal(
  options: IntersectionObserverInit = {}
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);
  const { root = null, rootMargin = "0px 0px -24px 0px", threshold = 0.05 } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>(".reveal"));
    if (el.classList.contains("reveal")) targets.unshift(el);
    // A container should not reveal its off-screen descendants all at once.
    const revealTargets = targets.length > 0 ? targets : [el];
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      revealTargets.forEach((target) => target.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
        root,
      }
    );

    revealTargets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [root, rootMargin, threshold]);

  return ref;
}
