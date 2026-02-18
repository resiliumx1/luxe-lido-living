import { useEffect, useRef } from "react";

export function useScrollReveal(
  options: IntersectionObserverInit = {}
): React.RefObject<HTMLDivElement> {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add visible to all .reveal children + the element itself
            entry.target.querySelectorAll(".reveal").forEach((child) => {
              child.classList.add("visible");
            });
            if (entry.target.classList.contains("reveal")) {
              entry.target.classList.add("visible");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
        ...options,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
