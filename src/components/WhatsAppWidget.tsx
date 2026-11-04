import { useEffect, useRef, useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

// Controls the button must never sit on top of.
const BLOCKING = "input, textarea, select, button, [contenteditable]";

export default function WhatsAppWidget() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const [blocking, setBlocking] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    let idle: number | undefined;
    let frame = 0;

    // Does any control sit under the button's corner? Checked by comparing
    // boxes rather than by what the browser paints, so overlays can't fool it.
    const checkUnderneath = () => {
      const el = ref.current;
      if (!el || !window.matchMedia("(max-width: 767px)").matches) {
        setBlocking(false);
        return;
      }
      const r = el.getBoundingClientRect();
      const pad = 4;
      const left = r.left - pad;
      const top = r.top - pad;
      const right = r.right + pad;
      const bottom = r.bottom + pad;

      let hit = false;
      for (const node of Array.from(document.querySelectorAll<HTMLElement>(BLOCKING))) {
        if (el.contains(node)) continue;
        const b = node.getBoundingClientRect();
        if (b.width < 2 || b.height < 2) continue;
        if (b.left < right && b.right > left && b.top < bottom && b.bottom > top) {
          hit = true;
          break;
        }
      }
      setBlocking(hit);
    };

    const onScroll = () => {
      setScrolling(true);
      window.clearTimeout(idle);
      idle = window.setTimeout(() => {
        setScrolling(false);
        checkUnderneath();
      }, 320);
      if (!frame) {
        frame = window.requestAnimationFrame(() => {
          frame = 0;
          checkUnderneath();
        });
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("focusin", checkUnderneath);
    window.addEventListener("resize", checkUnderneath);
    checkUnderneath();

    return () => {
      window.clearTimeout(idle);
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("focusin", checkUnderneath);
      window.removeEventListener("resize", checkUnderneath);
    };
  }, []);

  // Desktop keeps the full-size button. On a phone it shrinks, tucks into the
  // corner, fades back while the page is moving, and hides over form controls.
  const mobileState = blocking
    ? "opacity-0 scale-90 pointer-events-none"
    : scrolling
      ? "opacity-25 scale-90 -translate-x-3"
      : "opacity-100";

  return (
    <a
      ref={ref}
      href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Ashante%2C%20I%27m%20interested%20in%20a%20property.`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Ashante on WhatsApp"
      aria-hidden={isMobile && blocking ? "true" : undefined}
      className={`fixed z-[9999] group left-3 bottom-[calc(12px_+_env(safe-area-inset-bottom))] md:left-auto md:right-6 md:bottom-6 transition-all duration-300 ease-out motion-reduce:transition-none ${
        isMobile ? mobileState : "opacity-100"
      }`}
    >
      {/* Pulse ring */}
      <span
        className="wa-pulse-ring absolute inset-0 rounded-full"
        style={{ backgroundColor: "hsla(var(--gold) / 0.35)" }}
      />
      {/* Button */}
      <span
        className="relative flex items-center justify-center rounded-full shadow-lg transition-transform duration-300 group-hover:scale-110 h-10 w-10 md:h-14 md:w-14"
        style={{ backgroundColor: "hsl(var(--gold))" }}
      >
        <svg
          viewBox="0 0 32 32"
          className="h-5 w-5 md:h-7 md:w-7"
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.004 2.667C8.637 2.667 2.667 8.637 2.667 16c0 2.352.637 4.627 1.846 6.627L2.667 29.333l6.87-1.8A13.293 13.293 0 0016.004 29.333c7.363 0 13.329-5.97 13.329-13.333S23.367 2.667 16.004 2.667zm0 24c-1.99 0-3.941-.533-5.647-1.539l-.403-.24-4.078 1.069 1.09-3.978-.263-.41A10.613 10.613 0 015.333 16c0-5.88 4.787-10.667 10.671-10.667S26.667 10.12 26.667 16 21.884 26.667 16.004 26.667zm5.84-7.973c-.32-.16-1.893-.934-2.186-1.04-.293-.107-.507-.16-.72.16-.213.32-.827 1.04-.987 1.24-.187.213-.347.24-.667.08-.32-.16-1.347-.497-2.563-1.587-.947-.84-1.587-1.893-1.773-2.213-.187-.32-.02-.493.14-.653.147-.14.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.733-.987-2.373-.267-.627-.533-.533-.72-.547-.187-.013-.4-.013-.613-.013-.213 0-.56.08-.853.4-.293.32-1.12 1.093-1.12 2.667 0 1.573 1.147 3.093 1.307 3.307.16.213 2.253 3.44 5.46 4.827.763.333 1.36.533 1.827.68.763.24 1.467.213 2.013.133.613-.093 1.893-.773 2.16-1.52.267-.747.267-1.387.187-1.52-.08-.133-.293-.213-.613-.373z" />
        </svg>
      </span>

      {/* Tooltip — desktop only */}
      <span
        className="hidden md:block absolute right-[68px] top-1/2 -translate-y-1/2 bg-ocean-deep text-off-white text-xs font-sans whitespace-nowrap px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg"
        style={{ borderRadius: "6px" }}
      >
        Chat with Ashante directly
      </span>
    </a>
  );
}
