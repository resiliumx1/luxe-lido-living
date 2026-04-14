import heroImg from "@/assets/hero_villa.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import { Zap, DollarSign, Shield, Sliders } from "lucide-react";
import { getPropertiesByType } from "@/data/properties";

const prefabs = getPropertiesByType("prefab");

const benefits = [
  { Icon: Zap, label: "Fast Construction", desc: "Precision factory-built panels assemble in weeks, not months." },
  { Icon: DollarSign, label: "Cost Efficient", desc: "Controlled manufacturing costs keep your budget on track." },
  { Icon: Shield, label: "Weather Resistant", desc: "Engineered for Caribbean climate, hurricanes, and humidity." },
  { Icon: Sliders, label: "Fully Customizable", desc: "Choose your layout, finishes, and configuration freely." },
];

export default function PrefabHomes() {
  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Prefab Homes"
        subtitle="Precision-built. Rapidly delivered. Caribbean-ready."
      />

      <main id="main-content">
        <section aria-label="Prefab home listings" className="py-20 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-16">
              <SectionLabel text="Prefabricated Homes" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                Our prefabricated homes are precision-engineered in controlled factory environments before being shipped and assembled on your chosen site in Antigua &amp; Barbuda. Built for the Caribbean climate, they combine speed, affordability, and stunning design.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
              {prefabs.map((p) => (
                <PropertyCard
                  key={p.id}
                  id={p.id}
                  image={p.images[0]}
                  location={p.location}
                  name={p.name}
                  price={p.price}
                  beds={p.beds}
                  baths={p.baths}
                  sqft={p.sqft}
                  href={`/properties/${p.id}`}
                  badge={p.badge}
                />
              ))}
            </div>

            {/* Key Benefits */}
            <SectionLabel text="Why Prefab" />
            <h2 className="font-serif text-4xl text-ocean-deep dark:text-foreground mb-12">Key Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map(({ Icon, label, desc }) => (
                <div key={label} className="border-t border-gold pt-6">
                  <Icon size={20} className="text-gold mb-4" />
                  <h3 className="font-serif text-lg text-ocean-deep dark:text-foreground mb-2">{label}</h3>
                  <p className="font-sans text-sm text-ocean-mid/70 dark:text-foreground/50 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-ocean-deep py-16 border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">
              Interested in a Prefab Home? Let's talk.
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
