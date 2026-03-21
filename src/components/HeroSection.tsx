import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import BookingModal from "@/components/BookingModal";

export default function HeroSection() {
  const navigate = useNavigate();
  const { settings } = useSiteSettings();
  const heroImageUrl = settings?.hero_image || "";
  const [imgLoaded, setImgLoaded] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-screen min-h-[100svh] overflow-hidden flex items-center">
        {/* Ken Burns background layer */}
        <div
          className="absolute inset-0 hero-kb-layer"
          style={{
            backgroundImage: heroImageUrl
              ? `url(${heroImageUrl})`
              : "linear-gradient(135deg, hsl(var(--ocean-deep)) 0%, hsl(220 30% 18%) 50%, hsl(var(--ocean-deep)) 100%)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: heroImageUrl ? (imgLoaded ? 1 : 0) : 1,
            transition: "opacity 0.8s ease",
          }}
        />
        {/* Hidden img to detect load */}
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt=""
            className="hidden"
            onLoad={() => setImgLoaded(true)}
          />
        )}

        {/* Overlay 1 — directional gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(115deg, rgba(5,12,28,0.75) 0%, rgba(5,12,28,0.50) 45%, rgba(5,12,28,0.20) 100%)",
          }}
        />

        {/* Overlay 2 — bottom vignette */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "35%",
            background:
              "linear-gradient(to top, rgba(5,12,28,0.85) 0%, rgba(5,12,28,0.40) 60%, transparent 100%)",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full px-5 sm:px-[clamp(24px,8vw,96px)] pt-24 pb-32">
          <div className="max-w-[600px]">
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
              className="font-serif font-normal text-white mb-3 hero-stagger"
              style={{
                fontSize: "clamp(40px, 6vw, 68px)",
                lineHeight: 1.1,
                letterSpacing: "0.01em",
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
              Discover Antigua's most extraordinary properties, where every
              sunrise belongs to you.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-col sm:flex-row gap-3.5 hero-stagger"
              style={{ animationDelay: "1.0s" }}
            >
              <button
                onClick={() => navigate("/luxury-homes")}
                className="hero-cta-primary font-sans text-sm font-semibold tracking-[0.06em] px-7 py-3.5 bg-gold text-primary-foreground border-none cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,169,110,0.4)] inline-flex items-center justify-center gap-2"
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

        {/* Stats bar — hidden on mobile */}
        <div className="hidden sm:flex absolute bottom-0 left-0 right-0 h-[72px] items-center justify-center border-t border-gold/25 backdrop-blur-sm z-10"
          style={{ background: "rgba(5,12,28,0.78)" }}
        >
          {[
            { num: "50+", label: "Properties Sold" },
            { num: "15+", label: "Years Experience" },
            { num: "365", label: "Days of Sunshine" },
            { num: "100%", label: "Client Satisfaction" },
          ].map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 max-w-[180px] flex flex-col items-center justify-center px-4 ${
                i < arr.length - 1 ? "border-r border-gold/15" : ""
              }`}
            >
              <span
                className="font-serif font-normal text-gold leading-none"
                style={{
                  fontSize: "clamp(20px, 2.5vw, 26px)",
                  textShadow: "0 0 20px rgba(240,192,96,0.3)",
                }}
              >
                {stat.num}
              </span>
              <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-white/50 mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
}
