import { useScrollReveal } from "@/hooks/useScrollReveal";

const neighborhoods = [
  {
    name: "English Harbour",
    desc: "Historic charm meets world-class yachting",
    image: "https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?w=800&q=80",
  },
  {
    name: "Jolly Harbour",
    desc: "Waterfront living with marina lifestyle",
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
  },
  {
    name: "Dickenson Bay",
    desc: "Pristine white sand and vibrant nightlife",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
  },
  {
    name: "Galley Bay",
    desc: "Secluded luxury on the west coast",
    image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80",
  },
  {
    name: "Hodges Bay",
    desc: "Modern resort living and fine dining",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
  },
];

export default function NeighborhoodGuide() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-off-white dark:bg-background" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="text-center mb-16 reveal">
          <h2
            className="font-serif text-ocean-deep dark:text-foreground mb-4"
            style={{ fontSize: "clamp(32px, 5vw, 48px)" }}
          >
            Explore Antigua's Finest Addresses
          </h2>
          <p className="font-sans text-muted-foreground max-w-[560px] mx-auto" style={{ fontSize: "17px" }}>
            Each neighbourhood offers a distinct lifestyle — find yours.
          </p>
        </div>

        {/* Horizontal scroll on mobile, 3-col grid on desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-5 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide">
          {neighborhoods.map((n, i) => (
            <a
              key={n.name}
              href="/luxury-homes"
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group relative flex-shrink-0 w-[280px] md:w-auto overflow-hidden snap-start`}
              style={{ height: "300px", borderRadius: "12px" }}
            >
              <img
                src={n.image}
                alt={n.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-off-white text-xl font-medium mb-1">{n.name}</h3>
                <p className="font-sans text-off-white/80 text-sm mb-3">{n.desc}</p>
                <span className="text-gold font-sans text-xs font-medium tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View Properties →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
