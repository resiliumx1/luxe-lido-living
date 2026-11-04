import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, HardHat, MapPin, Ruler } from "lucide-react";
import { trailerRealBuilds, containerFinishedUnits } from "@/data/realBuildPhotos";

const trust = [
  { icon: MapPin, label: "Local, on island" },
  { icon: Ruler, label: "Built to order" },
  { icon: HardHat, label: "Vetted trades" },
];

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

        {/* Overlay — stronger for text contrast */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(5,12,28,0.92) 0%, rgba(5,12,28,0.80) 35%, rgba(5,12,28,0.55) 65%, rgba(5,12,28,0.35) 100%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-1/2"
          style={{ background: "linear-gradient(to top, rgba(5,12,28,0.75) 0%, transparent 100%)" }}
        />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-5 hero-stagger" style={{ animationDelay: "0.2s" }}>
              <span className="block w-10 h-px bg-gold" />
              <span className="font-sans text-xs font-bold tracking-[0.22em] uppercase text-gold-soft">
                Built to order · Antigua &amp; Barbuda
              </span>
            </div>

            <h1
              className="text-display title-on-dark font-normal text-white mb-6 hero-stagger"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)", animationDelay: "0.5s", fontSize: "clamp(42px, 5.4vw, 76px)" }}
            >
              Your home, built right.
              <br />
              <span className="italic">Without the runaround.</span>
            </h1>

            <p
              className="font-sans text-white max-w-[540px] mb-9 hero-stagger"
              style={{ fontSize: "clamp(16px, 1.8vw, 19px)", lineHeight: 1.7, animationDelay: "0.8s" }}
            >
              Block, container or insulated panel — one local point of contact who prices it honestly, hires the right trades and keeps your build moving, whether you're on island or overseas.
            </p>

            <div className="flex flex-col sm:flex-row gap-3.5 mb-10 hero-stagger" style={{ animationDelay: "1.0s" }}>
              <button
                onClick={() => navigate("/contact")}
                className="group hero-cta-primary font-sans text-sm font-semibold tracking-[0.06em] px-8 py-4 bg-gold text-primary-foreground border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,169,110,0.4)] inline-flex items-center justify-center gap-2 rounded-md"
              >
                Get a build estimate
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate("/services")}
                className="font-sans text-sm font-semibold tracking-[0.05em] px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/70 cursor-pointer transition-all duration-300 hover:bg-white/20 hover:-translate-y-0.5 inline-flex items-center justify-center rounded-md"
              >
                See what we build
              </button>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-[600px] hero-stagger" style={{ animationDelay: "1.2s" }}>
              {trust.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-white text-sm font-medium">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border border-gold/60 bg-gold/15 shrink-0">
                    <Icon className="w-4 h-4 text-gold-soft" strokeWidth={1.75} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          {/* Real builds collage (desktop) */}
          <div className="hidden lg:block lg:col-span-5 hero-stagger" style={{ animationDelay: "1.1s" }}>
            <div className="relative h-[460px]">
              <figure className="absolute top-0 right-0 w-[78%] aspect-[4/3] overflow-hidden rounded-md border border-gold/40 shadow-2xl">
                <img src={trailerRealBuilds[0].src} alt={trailerRealBuilds[0].alt} className="w-full h-full object-cover" />
              </figure>
              <figure className="absolute bottom-0 left-0 w-[62%] aspect-[4/3] overflow-hidden rounded-md border border-gold/40 shadow-2xl">
                <img src={containerFinishedUnits[1]?.src ?? containerFinishedUnits[0].src} alt={containerFinishedUnits[1]?.alt ?? containerFinishedUnits[0].alt} className="w-full h-full object-cover" />
              </figure>
              <div className="absolute bottom-6 right-2 bg-ocean-deep/90 border border-gold/50 rounded-md px-4 py-3 backdrop-blur-sm">
                <p className="text-eyebrow text-gold-soft">Real work</p>
                <p className="text-white text-sm font-medium">Delivered in Antigua</p>
              </div>
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

    </>
  );
}
