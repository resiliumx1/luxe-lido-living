import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import BookingModal from "@/components/BookingModal";

type HeroMode = "video-desktop" | "video-tablet" | "poster";

function getHeroMode(): HeroMode {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return "poster";

  const conn = (navigator as any).connection;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return "poster";

  const width = window.innerWidth;
  if (width < 768) return "poster";
  if (width < 1024) return "video-tablet";
  return "video-desktop";
}

export default function HeroSection() {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const [bookingOpen, setBookingOpen] = useState(false);
  const [mode, setMode] = useState<HeroMode>(() =>
    typeof window !== "undefined" ? getHeroMode() : "poster"
  );

  useEffect(() => {
    const update = () => setMode(getHeroMode());
    const mqlMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mqlMobile = window.matchMedia("(max-width: 767px)");
    const mqlTablet = window.matchMedia("(max-width: 1023px)");

    mqlMotion.addEventListener("change", update);
    mqlMobile.addEventListener("change", update);
    mqlTablet.addEventListener("change", update);

    return () => {
      mqlMotion.removeEventListener("change", update);
      mqlMobile.removeEventListener("change", update);
      mqlTablet.removeEventListener("change", update);
    };
  }, []);

  return (
    <>
      <section className="relative min-h-screen min-h-[100svh] overflow-hidden flex items-center">
        {/* Background layer */}
        {mode === "poster" ? (
          <img
            src="/hero/hero-poster.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero/hero-loop.webm" type="video/webm" />
            {mode === "video-tablet" ? (
              <source src="/hero/hero-loop-mobile.mp4" type="video/mp4" />
            ) : (
              <source src="/hero/hero-loop.mp4" type="video/mp4" />
            )}
          </video>
        )}

        {/* Overlay — right-biased directional gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(5,12,28,0.85) 0%, rgba(5,12,28,0.70) 25%, rgba(5,12,28,0.40) 55%, rgba(5,12,28,0.15) 85%, rgba(5,12,28,0.10) 100%)",
          }}
        />

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "40%",
            background:
              "linear-gradient(to top, rgba(5,12,28,0.60) 0%, transparent 40%)",
          }}
        />

        {/* Content — left-anchored */}
        <div
          className="relative z-10 w-full pt-24 pb-32"
          style={{ paddingLeft: "clamp(2rem, 6vw, 6rem)", paddingRight: "1.5rem" }}
        >
          <div className="max-w-[560px]">
            {/* Eyebrow */}
            <div
              className="flex items-center gap-3 mb-4 hero-stagger"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="block w-8 h-px bg-gold" />
              <span className="font-sans text-xs font-bold tracking-[0.22em] uppercase text-gold">
                Luxury Real Estate · Antigua &amp; Barbuda
              </span>
            </div>

            {/* Headline */}
            <h1
              className="text-display font-normal text-white mb-3 hero-stagger"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
              animationDelay: "0.5s",
            }}
            >
              Your Caribbean Life
              <br />
              <span className="italic text-gold">Starts Here</span>
            </h1>

            {/* Sub-headline */}
            <p
              className="font-sans text-white/[0.84] max-w-[440px] mb-8 hero-stagger"
              style={{
                fontSize: "clamp(15px, 1.8vw, 18px)",
                lineHeight: 1.75,
                animationDelay: "0.8s",
              }}
            >
              Oceanfront villas, hillside estates, and island investments — held by a licensed Antiguan Real Estate Agent who grew up here.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3.5 hero-stagger"
              style={{ animationDelay: "1.0s" }}
            >
              <button
                onClick={() => navigate("/luxury-homes")}
                className="group hero-cta-primary font-sans text-sm font-semibold tracking-[0.06em] px-7 py-3.5 bg-gold text-primary-foreground border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,169,110,0.4)] inline-flex items-center justify-center gap-2"
                style={{ borderRadius: "6px" }}
              >
                Explore Properties
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </button>
              <button
                onClick={() => setBookingOpen(true)}
                className="font-sans text-sm font-medium tracking-[0.05em] px-7 py-3.5 bg-transparent text-white border border-white/[0.55] cursor-pointer transition-all duration-300 hover:border-white/90 hover:bg-white/[0.08] hover:-translate-y-0.5 inline-flex items-center justify-center"
                style={{ borderRadius: "6px" }}
              >
                Book a Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div
          className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-stagger"
          style={{ animationDelay: "1.4s" }}
        >
          <span className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-gold/70">
            Scroll
          </span>
          <span className="block w-px h-6 bg-gold/50 scroll-line" />
        </div>

      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
