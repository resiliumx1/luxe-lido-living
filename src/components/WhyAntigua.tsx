import { Sun, Shield, Plane, Award } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  {
    icon: Sun,
    title: "365 Days of Sunshine",
    desc: "Antigua's famous 365 beaches await",
  },
  {
    icon: Shield,
    title: "Zero Capital Gains Tax",
    desc: "One of the Caribbean's most investor-friendly jurisdictions",
  },
  {
    icon: Plane,
    title: "Direct International Flights",
    desc: "Connected to London, New York, Toronto & Miami",
  },
  {
    icon: Award,
    title: "Citizenship by Investment",
    desc: "Qualify for Antiguan citizenship through property purchase",
  },
];

const lifestyleImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
];

export default function WhyAntigua() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-sand-light dark:bg-secondary" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <h2 className="font-serif text-ocean-deep dark:text-foreground mb-4" style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>
            A Life Unlike Any Other
          </h2>
          <p className="font-sans text-muted-foreground max-w-[640px] mx-auto" style={{ fontSize: "17px" }}>
            Discover why discerning buyers from around the world choose Antigua as their permanent home.
          </p>
        </div>

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((s, i) => (
            <div
              key={s.title}
              className={`reveal reveal-delay-${i + 1} text-center p-6`}
            >
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center bg-gold/10 dark:bg-gold/20" style={{ borderRadius: "12px" }}>
                <s.icon size={28} className="text-gold" />
              </div>
              <h3 className="font-serif text-ocean-deep dark:text-foreground text-xl mb-2">{s.title}</h3>
              <p className="font-sans text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Lifestyle image strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal reveal-delay-2">
          {lifestyleImages.map((src, i) => (
            <div key={i} className="overflow-hidden group" style={{ borderRadius: "12px" }}>
              <img
                src={src}
                alt={`Antigua lifestyle ${i + 1}`}
                className="w-full h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
