import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, DollarSign, Clock, Truck, Package, Ruler, Weight, Box } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import SectionLabel from "@/components/SectionLabel";
import { useCurrency } from "@/contexts/CurrencyContext";

const containers = [
  {
    id: "20ft",
    label: "20ft Shipping Container",
    sub: "Standard or High-Cube (9'6\")",
    priceXCD: 16500,
    blurb:
      "The workhorse footprint. Ideal for storage, site offices, compact retail, and small conversions where a tight footprint matters.",
    image: "storage-unit/hero",
  },
  {
    id: "40ft",
    label: "40ft Shipping Container",
    sub: "Standard or High-Cube (9'6\")",
    priceXCD: 19500,
    blurb:
      "The most versatile size on the island. Used for everything from warehousing and workshops to full home and hospitality conversions.",
    image: "estate-home/hero",
  },
];

const fortySpecs = [
  { icon: Weight, label: "Max gross", value: "30,480 kg" },
  { icon: Box, label: "Tare weight", value: "2,185 kg" },
  { icon: Ruler, label: "Internal volume", value: "~33.2 m³ / 1,173 ft³" },
  { icon: Shield, label: "Condition", value: "Cargo-worthy, wind & watertight" },
];

const useCases = [
  {
    key: "storage",
    label: "Storage & Warehousing",
    pitch: "Secure, weather-tight, lockable — on-site or long-term.",
    image: "storage-unit/hero",
  },
  {
    key: "business",
    label: "Business & Commercial",
    pitch: "Cafés, retail, offices, pop-ups — your brand, on land you control.",
    image: "bar-lounge/hero",
  },
  {
    key: "home",
    label: "Home Conversion",
    pitch: "Studios, family homes, guest cottages — converted to your spec.",
    image: "estate-home/hero",
  },
  {
    key: "hospitality",
    label: "Hospitality & Tourism",
    pitch: "Beach bars, guest cabins, glamping, cabanas — built for the climate.",
    image: "beach-bar/hero",
  },
  {
    key: "projects",
    label: "Projects & Site Use",
    pitch: "Workshops, site offices, equipment housing, temporary builds.",
    image: "studio-home/hero",
  },
];

const terms = [
  "Prices shown are starting prices — final cost varies by condition, market, and availability.",
  "Delivery is not included; we arrange transport and crane separately based on your site.",
  "50% deposit secures your unit; balance due before clearance and release.",
  "Every container is inspected before release — cargo-worthy, wind & watertight.",
];

const valueProps = [
  { icon: DollarSign, title: "Cost-Efficient Shell", desc: "Steel construction at a fraction of traditional build cost" },
  { icon: Shield, title: "Hurricane-Rated Steel", desc: "Corten steel shells engineered to withstand Caribbean storms" },
  { icon: Clock, title: "Fast Turnaround", desc: "Available units released in days, not months, once cleared" },
];

export default function Hub() {
  const { formatPriceFromXCD } = useCurrency();

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[560px] overflow-hidden">
        <ResponsiveImage
          basePath="hub/hero"
          size="hero"
          alt="Shipping containers ready for delivery in the Caribbean"
          className="absolute inset-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/85 via-ocean-deep/45 to-ocean-deep/20" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel text="Container Solutions" />
            <h1 className="font-serif text-display text-off-white mt-4 max-w-3xl">
              Order a Shipping Container
            </h1>
            <p className="font-serif italic text-gold text-h4 mt-3">
              20ft &amp; 40ft units · delivered across the Caribbean
            </p>
            <p className="font-sans text-off-white/70 text-body mt-6 max-w-2xl mx-auto">
              Cargo-worthy steel containers — for storage, business, conversion, or your next project.
              Inspected, wind &amp; watertight, available in standard and high-cube.
            </p>
            <a
              href="/order-container"
              className="inline-flex items-center gap-2 mt-10 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
            >
              Order a Container <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Order — two real products */}
      <section id="order" className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="Available Units" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-3">Two Sizes. One Standard.</h2>
          <p className="font-sans text-muted-foreground text-body max-w-2xl mb-12">
            Both sizes are available as standard or high-cube (9'6"). Starting prices in Eastern Caribbean
            Dollars — switch currency in the header to view in USD or CAD.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {containers.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-card border border-border overflow-hidden flex flex-col"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ResponsiveImage
                    basePath={c.image}
                    size="card"
                    alt={c.label}
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <p className="text-eyebrow text-primary mb-2">{c.sub}</p>
                  <h3 className="font-serif text-h3 text-foreground mb-3">{c.label}</h3>
                  <p className="font-sans text-muted-foreground text-sm mb-6 leading-relaxed">{c.blurb}</p>
                  <div className="mt-auto pt-6 border-t border-border flex items-end justify-between gap-4">
                    <div>
                      <p className="font-sans text-xs text-muted-foreground">Starting from</p>
                      <p className="font-serif text-h3 text-foreground">{formatPriceFromXCD(c.priceXCD)}</p>
                    </div>
                    <a
                      href="/order-container"
                      className="inline-flex items-center gap-1 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-xs px-5 py-3 transition-all duration-300 uppercase"
                    >
                      Order <ArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* 40ft spec strip */}
          <div className="mt-12 bg-secondary border border-border p-8">
            <p className="text-eyebrow text-primary mb-3">40ft / 22G1 Specifications</p>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {fortySpecs.map((s) => (
                <div key={s.label} className="flex items-start gap-3">
                  <s.icon size={18} className="text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-sans text-sm text-foreground font-medium">{s.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Terms — near the order CTA */}
      <section id="order-cta" className="bg-ocean-deep py-20 px-6">
        <div className="max-w-[1080px] mx-auto">
          <SectionLabel text="How It Works" light />
          <h2 className="font-serif text-h2 text-off-white mt-4 mb-10">Clear Terms, No Surprises</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
            {terms.map((t, i) => (
              <li key={i} className="flex items-start gap-3 font-sans text-sm text-off-white/75 leading-relaxed">
                <span className="text-gold font-serif text-lg leading-none mt-0.5">◆</span>
                {t}
              </li>
            ))}
          </ul>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/order-container"
              className="inline-flex items-center gap-2 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
            >
              Order a Container <ArrowRight size={16} />
            </Link>
            <p className="font-sans text-off-white/50 text-xs">
              Or message Ashante directly on WhatsApp to check current availability.
            </p>
          </div>
        </div>
      </section>

      {/* Use-case inspiration */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="What You Can Do With It" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-3">Inspiration, Not Templates</h2>
          <p className="font-sans text-muted-foreground text-body max-w-2xl mb-12">
            We sell the container. What you build with it is up to you — these are scenarios our clients have
            already brought to life across Antigua &amp; Barbuda.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <motion.div
                key={u.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group relative aspect-[4/5] overflow-hidden"
              >
                <ResponsiveImage
                  basePath={u.image}
                  size="card"
                  alt={u.label}
                  className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="text-eyebrow text-gold mb-2">Use Case</p>
                  <h3 className="font-serif text-h4 text-off-white mb-1">{u.label}</h3>
                  <p className="font-sans text-off-white/70 text-sm">{u.pitch}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="font-sans italic text-muted-foreground text-sm mt-10 max-w-2xl">
            Conversions, fit-outs, and full builds are handled separately — talk to us about scope and we'll
            point you to the right path.
          </p>
        </div>
      </section>

      {/* Why containers — trimmed to claims that apply to the steel shell itself */}
      <section className="bg-secondary py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="Why Containers" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-12">Built To Last in the Caribbean</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {valueProps.map((vp) => (
              <div key={vp.title} className="flex flex-col items-start">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <vp.icon size={20} className="text-gold" />
                </div>
                <h3 className="font-sans font-semibold text-foreground text-sm tracking-wide mb-2">{vp.title}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ocean-deep py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-h2 text-off-white mb-6">Ready to Order?</h2>
          <p className="font-sans text-off-white/60 text-body mb-10">
            Tell us which size you need, where it's going, and when you need it — we'll confirm current
            availability and pricing within 24 hours.
          </p>
          <Link
            to="/order-container"
            className="inline-flex items-center gap-2 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
          >
            Order a Container <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
