import { useState } from "react";
import heroImg from "@/assets/hero_villa.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import properties from "@/data/properties";

type FilterType = "all" | "luxury" | "container" | "prefab";

const filters: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "Luxury", value: "luxury" },
  { label: "Container", value: "container" },
  { label: "Prefab", value: "prefab" },
];

export default function Properties() {
  const [active, setActive] = useState<FilterType>("all");

  const filtered = active === "all" ? properties : properties.filter((p) => p.type === active);

  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Properties"
        subtitle="Browse Our Full Portfolio"
      />

      <main id="main-content">
        <section aria-label="All property listings" className="py-20 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-10">
              <SectionLabel text="Full Portfolio" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                Explore our complete collection of luxury villas, container homes, and prefab residences across Antigua & Barbuda.
              </p>
            </div>

            {/* Filter chips */}
            <div className="flex flex-wrap gap-2 mb-12">
              {filters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setActive(f.value)}
                  className={`font-sans text-sm font-medium tracking-wider px-5 py-2.5 transition-all duration-300 border ${
                    active === f.value
                      ? "bg-gold text-ocean-deep border-gold"
                      : "bg-transparent text-ocean-mid dark:text-foreground/60 border-sand dark:border-gold/20 hover:border-gold/50"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <PropertyCard
                  key={p.id}
                  id={p.id}
                  image={p.images[0]}
                  location={p.location}
                  name={p.name}
                  priceUSD={p.priceUSD}
                  beds={p.beds}
                  baths={p.baths}
                  sqft={p.sqft}
                  href={`/properties/${p.id}`}
                  badge={p.badge}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center font-sans text-muted-foreground py-20">
                No properties found in this category.
              </p>
            )}
          </div>
        </section>

        {/* CTA strip */}
        <div className="bg-ocean-deep py-16 border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">
              Looking for something specific? Let Ashante find it for you.
            </p>
            <a
              href="/contact"
              className="cta-shimmer flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 flex items-center gap-2 group"
            >
              Enquire <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
