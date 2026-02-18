import ashanteImg from "@/assets/ashante_portrait.jpg";
import heroImg from "@/assets/hero_villa.jpg";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";

const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "50+", label: "Properties Sold" },
  { value: "$25M+", label: "Total Value" },
  { value: "2", label: "Islands Served" },
];

const specialties = [
  "Luxury Villas",
  "Container Homes",
  "Prefab Homes",
  "Investment Properties",
  "Citizenship by Investment",
  "Property Management",
];

export default function About() {
  return (
    <div className="bg-off-white dark:bg-background">
      {/* Banner */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end pb-20">
        <img
          src={heroImg}
          alt="Ashante Lindsay"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/30 to-transparent" />
        <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <div className="flex items-center gap-4 mb-4">
            <span className="gold-line w-10" />
            <span className="small-caps text-xs text-gold tracking-widest font-sans">A. Lindsay Luxe Estates</span>
          </div>
          <h1 className="font-serif text-4xl md:text-7xl text-off-white font-medium leading-none">About Ashante</h1>
        </div>
      </div>

      {/* Story */}
      <section className="py-24 bg-off-white dark:bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            {/* Image */}
            <div className="relative md:sticky md:top-28">
              <div className="relative z-10">
                <img src={ashanteImg} alt="Ashante Lindsay" className="w-full object-cover aspect-[4/5]" loading="lazy" decoding="async" />
              </div>
              <div className="absolute top-6 left-6 w-full aspect-[4/5] border border-gold z-0" />
            </div>

            {/* Text */}
            <div>
              <SectionLabel text="Her Story" />
              <h2 className="font-serif text-4xl text-ocean-deep dark:text-foreground mb-6">Rooted in the Caribbean</h2>
              <div className="space-y-4 font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                <p>
                  Ashante Lindsay was born and raised on the emerald shores of Antigua & Barbuda — an upbringing that instilled in her a profound love for the Caribbean's unique way of life, its landscapes, and its communities. Real estate was never just a career for Ashante. It was a calling.
                </p>
                <p>
                  With over a decade of dedicated experience in the local market, Ashante has become one of Antigua's most trusted names in luxury property. Her portfolio spans oceanfront villas in English Harbour, innovative container homes across the island, and precision-built prefab residences that redefine affordable luxury.
                </p>
                <p>
                  Her expertise extends beyond traditional transactions. Ashante is a recognised specialist in Antigua's Citizenship by Investment programme, having guided numerous international families through the process of securing Caribbean citizenship through strategic real estate acquisitions.
                </p>
                <p>
                  At the heart of everything Ashante does is a deeply personal commitment to her clients. She believes that finding your place in the Caribbean should feel effortless, inspiring, and unforgettable — and she works tirelessly to make that vision a reality for every person she serves.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="bg-ocean-deep py-16 border-y border-gold/20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="reveal">
                <p className="font-serif text-5xl text-gold font-light mb-2">{s.value}</p>
                <p className="small-caps text-xs text-off-white/60 tracking-widest font-sans">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Specialties */}
      <section className="py-20 bg-sand-light dark:bg-sand-light">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <SectionLabel text="Areas of Expertise" />
          <h2 className="font-serif text-3xl text-ocean-deep dark:text-foreground mb-10">Specialties</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {specialties.map((s) => (
              <span key={s} className="border border-sand dark:border-gold/30 bg-off-white dark:bg-card text-teal dark:text-foreground/80 small-caps text-xs font-sans tracking-wider px-5 py-2.5">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Mission quote */}
      <section className="py-24 bg-off-white dark:bg-background">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <div className="gold-line w-16 mx-auto mb-10" />
          <blockquote className="font-serif italic text-2xl md:text-3xl text-ocean-deep dark:text-foreground leading-relaxed mb-6">
            "I believe that finding your place in the Caribbean should feel effortless and inspiring — a journey as beautiful as the destination itself."
          </blockquote>
          <p className="small-caps text-xs text-gold tracking-widest font-sans">— Ashante Lindsay</p>
          <div className="gold-line w-16 mx-auto mt-10" />
        </div>
      </section>

      {/* CTA */}
      <div className="bg-ocean-deep py-16">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-serif italic text-off-white text-xl md:text-2xl">
            Ready to work with Ashante?
          </p>
          <a
            href="/contact"
            className="cta-shimmer flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 flex items-center gap-2 group"
          >
            Get In Touch <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
