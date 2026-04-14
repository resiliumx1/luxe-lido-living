import { Link } from "react-router-dom";
import { ArrowRight, Shield, Clock, DollarSign } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import SectionLabel from "@/components/SectionLabel";
import GoldCTA from "@/components/container/GoldCTA";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useNavigate } from "react-router-dom";

const verticals = [
  { key: "homes", label: "Homes", pitch: "Private residences from studios to estates", image: "estate-home/hero", href: "/container-solutions/homes" },
  { key: "commercial", label: "Commercial", pitch: "Cafés, retail, restaurants, offices", image: "bar-lounge/hero", href: "/container-solutions/commercial" },
  { key: "hospitality", label: "Hospitality", pitch: "Guest cabins, cabanas, bars, glamping", image: "beach-bar/hero", href: "/container-solutions/hospitality" },
  { key: "utility", label: "Utility", pitch: "Storage, workshops, site offices", image: "storage-unit/hero", href: "/container-solutions/utility" },
];

const stats = [
  { icon: DollarSign, label: "40% Lower Cost", desc: "vs traditional build" },
  { icon: Clock, label: "3-14 Weeks", desc: "build time" },
  { icon: Shield, label: "Hurricane Rated", desc: "Category 4 standard" },
];

export default function ContainerPreview() {
  const sectionRef = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section className="py-28 bg-ocean-deep relative overflow-hidden" ref={sectionRef}>
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[18vw] font-light text-off-white/[0.03] leading-none">AL</span>
      </div>

      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal">
          <SectionLabel text="Container Solutions" light />
          <h2 className="font-serif text-4xl md:text-5xl text-off-white mb-4">
            Modern Modular Architecture
          </h2>
          <p className="font-sans text-off-white/50 text-body max-w-2xl">
            Homes, commercial spaces, hospitality units, utility buildings — all engineered for Caribbean conditions.
          </p>
        </div>

        {/* 4 vertical cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12 reveal reveal-delay-2">
          {verticals.map((v) => (
            <Link
              key={v.key}
              to={v.href}
              className="group relative block aspect-[3/4] overflow-hidden"
            >
              <ResponsiveImage
                basePath={v.image}
                size="card"
                alt={v.label}
                className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-serif text-xl text-off-white mb-1">{v.label}</h3>
                <p className="font-sans text-off-white/50 text-xs mb-3">{v.pitch}</p>
                <span className="inline-flex items-center gap-1 text-gold font-sans text-xs group-hover:gap-2 transition-all">
                  Explore <ArrowRight size={12} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats strip */}
        <div className="flex flex-wrap items-center justify-center gap-10 mb-10 reveal reveal-delay-3">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5">
              <s.icon size={16} className="text-gold/60" />
              <div>
                <span className="font-sans text-sm text-off-white font-medium">{s.label}</span>
                <span className="font-sans text-xs text-off-white/40 ml-1.5">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal reveal-delay-4">
          <GoldCTA variant="solid" onClick={() => navigate("/container-solutions")}>
            Explore the Catalog <ArrowRight size={14} className="inline ml-1" />
          </GoldCTA>
        </div>
      </div>
    </section>
  );
}
