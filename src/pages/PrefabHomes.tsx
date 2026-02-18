import heroImg from "@/assets/hero_villa.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import containerBeachfrontImg from "@/assets/container_beachfront.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { Zap, DollarSign, Shield, Sliders } from "lucide-react";

const prefabs = [
  { image: heroImg, location: "St. John's", name: "Palm Grove Prefab Villa", price: "$420,000", beds: 3, baths: 2, href: "/prefab-homes" },
  { image: villaTerraceImg, location: "Jolly Harbour", name: "Caribbean Sunrise Cottage", price: "$295,000", beds: 2, baths: 2, href: "/prefab-homes" },
  { image: containerBeachfrontImg, location: "English Harbour", name: "Harbour View Prefab", price: "$510,000", beds: 3, baths: 3, href: "/prefab-homes" },
];

const benefits = [
  { Icon: Zap, label: "Fast Construction", desc: "Precision factory-built panels assemble in weeks, not months." },
  { Icon: DollarSign, label: "Cost Efficient", desc: "Controlled manufacturing costs keep your budget on track." },
  { Icon: Shield, label: "Weather Resistant", desc: "Engineered for Caribbean climate, hurricanes, and humidity." },
  { Icon: Sliders, label: "Fully Customizable", desc: "Choose your layout, finishes, and configuration freely." },
];

export default function PrefabHomes() {
  return (
    <div className="bg-off-white">
      <PageBanner
        image={heroImg}
        title="Prefab Homes"
        subtitle="Precision-built. Rapidly delivered. Caribbean-ready."
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <SectionLabel text="Prefabricated Homes" />
            <p className="font-sans text-ocean-mid text-base leading-relaxed">
              Our prefabricated homes are precision-engineered in controlled factory environments before being shipped and assembled on your chosen site in Antigua & Barbuda. Built for the Caribbean climate, they combine speed, affordability, and stunning design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-20">
            {prefabs.map((p, i) => (
              <PropertyCard key={i} {...p} />
            ))}
          </div>

          {/* Key Benefits */}
          <SectionLabel text="Why Prefab" />
          <h2 className="font-serif text-4xl text-ocean-deep mb-12">Key Benefits</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map(({ Icon, label, desc }) => (
              <div key={label} className="border-t border-gold pt-6">
                <Icon size={20} className="text-gold mb-4" />
                <h3 className="font-serif text-lg text-ocean-deep mb-2">{label}</h3>
                <p className="font-sans text-sm text-ocean-mid/70 leading-relaxed">{desc}</p>
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
            className="flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300"
          >
            Enquire
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
