import ashanteImg from "@/assets/ashante_portrait.jpg";
import heroImg from "@/assets/hero_villa.jpg";
import SectionLabel from "@/components/SectionLabel";


const stats = [
  { value: "50+", label: "Homes Placed" },
  { value: "15+", label: "Years on Island" },
  { value: "$80M+", label: "In Transactions" },
  { value: "94%", label: "Client Retention" },
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
          alt="Luxury waterfront property at sunset, Antigua & Barbuda"
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
          <h1 className="text-display text-off-white font-medium leading-none">About Ashante</h1>
        </div>
      </div>

      <main id="main-content">
        {/* Story */}
        <section aria-label="Ashante Lindsay biography" className="py-24 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              {/* Image */}
              <div className="relative md:sticky md:top-28">
                <div className="relative z-10">
                  <img src={ashanteImg} alt="Ashante Lindsay, Luxury Property Specialist, Antigua" className="w-full object-cover aspect-[4/5]" loading="lazy" decoding="async" />
                </div>
                <div className="absolute top-6 left-6 w-full aspect-[4/5] border border-gold z-0" />
              </div>

              {/* Text */}
              <div>
                <SectionLabel text="Her Story" />
                <h2 className="text-h2 text-ocean-deep dark:text-foreground mb-6">Rooted in the Caribbean</h2>
                <div className="space-y-4 font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                  <p>Ashante was licensed in Antigua at twenty-four. Fifteen years and fifty-plus closings later, she's one of the few brokers on the island who can walk a buyer through both a seven-figure English Harbour villa and the full Citizenship by Investment application without handing off to a lawyer.</p>
                  <p>Her portfolio is deliberately small: six to eight active listings at any given time, each personally inspected, photographed, and represented. She turns down more instructions than she accepts — a habit that has made her the quiet first call for returning Antiguans and for international buyers introduced through London, New York, and Toronto networks.</p>
                  <p>The container and prefab divisions came later, born from watching too many young Antiguans locked out of the traditional housing market. Today she represents both sides of the island's real estate economy: the hillside villa and the factory-built starter home, held to the same standards of service.</p>
                  <p>Her clients stay in touch long after closing. Most eventually send a second buyer. That's the work.</p>
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
                <div key={s.label}>
                  <p className="text-stat-number mb-2">{s.value}</p>
                  <p className="text-stat-label text-off-white/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Specialties */}
        <section aria-label="Areas of expertise" className="py-20 bg-sand-light dark:bg-sand-light">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 text-center">
            <SectionLabel text="Areas of Expertise" />
            <h2 className="text-h2 text-ocean-deep dark:text-foreground mb-10">Specialties</h2>
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
        <section aria-label="Mission statement" className="py-24 bg-off-white dark:bg-background">
          <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
            <div className="gold-line w-16 mx-auto mb-10" />
            <blockquote className="font-serif italic text-2xl md:text-3xl text-ocean-deep dark:text-foreground leading-relaxed mb-6">
              "Most of my clients aren't buying a house. They're buying a life they've been quietly planning for ten years. My job is to make the last mile easy."
            </blockquote>
            <p className="small-caps text-xs text-gold tracking-widest font-sans">— Ashante Lindsay</p>
            <div className="gold-line w-16 mx-auto mt-10" />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-ocean-deep py-16">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">Ready to start looking?</p>
            <a
              href="/contact"
              className="cta-shimmer flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 flex items-center gap-2 group"
            >
              Get in touch <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
