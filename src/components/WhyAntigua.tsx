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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
      </div>
    </section>
  );
}
