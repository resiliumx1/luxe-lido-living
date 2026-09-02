import ashanteImg from "@/assets/ashante_portrait.jpg";
import heroImg from "@/assets/hero_villa.jpg";
import SectionLabel from "@/components/SectionLabel";


const stats = [
  { value: "50+", label: "Clients Helped" },
  { value: "15+", label: "Years on Island" },
  { value: "$80M+", label: "In Transactions" },
  { value: "94%", label: "Client Retention" },
];

const specialties = [
  "Traditional Construction",
  "Container Builds",
  "Insulated Panel Builds",
  "Renovations & Trades",
  "Property Sales & Land",
  "Relocation Services",
];

export default function About() {
  return (
    <div className="bg-off-white dark:bg-background">
      {/* Banner */}
      <div className="relative h-[50vh] min-h-[380px] flex items-end pb-20">
        <img
          src={heroImg}
          alt="Waterfront home at sunset in Antigua & Barbuda"
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
                  <img src={ashanteImg} alt="Ashante Lindsay, construction and property advisor in Antigua" className="w-full object-cover aspect-[4/5]" loading="lazy" decoding="async" />
                </div>
                <div className="absolute top-6 left-6 w-full aspect-[4/5] border border-gold z-0" />
              </div>

              {/* Text */}
              <div>
                <SectionLabel text="Her Story" />
                <h2 className="text-h2 text-ocean-deep dark:text-foreground mb-6">Rooted in the Caribbean</h2>
                <div className="space-y-4 font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                  <p>Ashante was licensed in Antigua at twenty-four and has spent more than fifteen years helping people make practical decisions about homes, land and property across the island.</p>
                  <p>Today, her work is centred on residential construction. She coordinates conventional block and concrete builds, container conversions, insulated panel homes and renovation projects, drawing on vetted tradesmen and manufacturing partners.</p>
                  <p>Some clients want Ashante to manage the entire project. Others already have a plan and need dependable trades, materials or local guidance. She supports both, whether the client is an Antiguan homeowner repainting or extending a house, a first-time builder buying a plot, or an overseas buyer planning a move.</p>
                  <p>Property sales remain part of the business, with homes and land presented clearly online so buyers can review the details before they call. The aim is straightforward: make it easier to build, improve or buy the right place.</p>
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
              "Whether you are building from the ground up, renovating one room or buying a plot of land, my job is to help you find the right people and keep the work moving."
            </blockquote>
            <p className="small-caps text-xs text-gold tracking-widest font-sans">— Ashante Lindsay</p>
            <div className="gold-line w-16 mx-auto mt-10" />
          </div>
        </section>

        {/* CTA */}
        <div className="bg-ocean-deep py-16">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">Ready to discuss your build, renovation or property plans?</p>
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
