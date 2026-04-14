import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, DollarSign, Clock, Move } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { verticalMeta, ContainerVertical } from "@/data/containerProducts";
import Footer from "@/components/Footer";
import SectionLabel from "@/components/SectionLabel";

const verticals: { key: ContainerVertical; pitch: string }[] = [
  { key: "homes", pitch: "Permanent residences from studio to estate" },
  { key: "commercial", pitch: "Cafés, bars, shops, restaurants, and offices" },
  { key: "hospitality", pitch: "Guest cabins, beach bars, and glamping" },
  { key: "utility", pitch: "Storage, workshops, and site infrastructure" },
];

const verticalHeroMap: Record<ContainerVertical, string> = {
  homes: "estate-home/hero",
  commercial: "bar-lounge/hero",
  hospitality: "beach-bar/hero",
  utility: "storage-unit/hero",
};

const processSteps = [
  { label: "Consult", time: "1 week", desc: "Site visit, needs assessment, budget alignment" },
  { label: "Configure", time: "1-2 weeks", desc: "Product selection, add-ons, finishes" },
  { label: "Permit", time: "4-8 weeks", desc: "Engineering drawings, approvals, utility connections" },
  { label: "Build", time: "4-12 weeks", desc: "Factory fabrication with progress updates" },
  { label: "Install", time: "1-2 weeks", desc: "Delivery, crane placement, final connections" },
];

const valueProps = [
  { icon: Shield, title: "Hurricane-Rated to Cat 4", desc: "Engineered Corten steel exceeds Caribbean building codes" },
  { icon: DollarSign, title: "40% Lower Cost", desc: "Versus equivalent traditional construction in Antigua" },
  { icon: Clock, title: "Weeks Not Years", desc: "3-14 week build times from signed contract to move-in" },
  { icon: Move, title: "Relocatable & Scalable", desc: "Move to a new site or add units as you grow" },
];

const vignettes = [
  {
    title: "A boutique resort that scaled in 10 weeks",
    body: "A hilltop property in English Harbour added six Guest Cabins in under ten weeks, increasing room capacity by 40% and revenue by 34% in the first season. Traditional construction quotes ranged from 18-24 months.",
  },
  {
    title: "A beach bar that survived Tammy",
    body: "After Hurricane Tammy damaged three traditional structures on the same stretch of beach, a container Beach Bar required only a pressure wash and new signage to reopen. Insurance claim: $0. Days closed: 2.",
  },
  {
    title: "A family home at half the price",
    body: "A young couple returning to Antigua built a two-bedroom Family Home on family land for $168,000 — less than a comparable concrete block house at $280,000 — and moved in before the rainy season started.",
  },
];

export default function Hub() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
        <ResponsiveImage
          basePath="hub/hero"
          size="hero"
          alt="Modern container architecture in Antigua"
          className="absolute inset-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <SectionLabel>Container Solutions</SectionLabel>
            <h1 className="font-serif text-display text-off-white mt-4 max-w-3xl">
              Modern Modular Architecture
            </h1>
            <p className="font-serif italic text-gold text-h4 mt-3">Built for the Caribbean</p>
            <p className="font-sans text-off-white/70 text-body mt-6 max-w-2xl mx-auto">
              Hurricane-rated Corten steel structures. 40% cost savings versus traditional construction. 
              3-14 week build times. Fully relocatable and infinitely scalable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Verticals Grid */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel>Explore by Category</SectionLabel>
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-12">Four Verticals, Sixteen Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {verticals.map((v, i) => {
              const meta = verticalMeta[v.key];
              return (
                <motion.div
                  key={v.key}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={`/container-solutions/${v.key}`}
                    className="group relative block aspect-[4/3] overflow-hidden"
                  >
                    <ResponsiveImage
                      basePath={verticalHeroMap[v.key]}
                      size="card"
                      alt={meta.label}
                      className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <p className="text-eyebrow text-gold mb-2">{meta.count} Configurations</p>
                      <h3 className="font-serif text-h3 text-off-white">{meta.label}</h3>
                      <p className="font-sans text-off-white/60 text-sm mt-2">{v.pitch}</p>
                      <span className="inline-flex items-center gap-1 text-gold font-sans text-sm mt-4 group-hover:gap-2 transition-all">
                        Explore <ArrowRight size={14} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Modular */}
      <section className="bg-ocean-deep py-24 px-6">
        <div className="max-w-[1280px] mx-auto text-center">
          <SectionLabel>Why Modular</SectionLabel>
          <h2 className="font-serif text-h2 text-off-white mt-4 mb-16">
            The Case for Container Architecture
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {valueProps.map((vp) => (
              <div key={vp.title} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                  <vp.icon size={24} className="text-gold" />
                </div>
                <h3 className="font-sans font-semibold text-off-white text-sm tracking-wide mb-2">{vp.title}</h3>
                <p className="font-sans text-off-white/50 text-sm leading-relaxed">{vp.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel>Our Process</SectionLabel>
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-16">From Conversation to Keys</h2>
          <div className="flex flex-col lg:flex-row items-start gap-4">
            {processSteps.map((step, i) => (
              <div key={step.label} className="flex-1 relative">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground font-sans font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-sans font-semibold text-foreground text-sm">{step.label}</h3>
                </div>
                <p className="font-sans text-muted-foreground text-xs mb-1">{step.time}</p>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <ArrowRight size={16} className="hidden lg:block absolute -right-3 top-2.5 text-gold" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vignettes */}
      <section className="bg-secondary py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel>Real Scenarios</SectionLabel>
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-12">Built for Builders Like You</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {vignettes.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="bg-card border border-border p-8"
              >
                <h3 className="font-serif text-h4 text-foreground mb-4">{v.title}</h3>
                <p className="font-sans text-muted-foreground text-body leading-relaxed">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ocean-deep py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-h2 text-off-white mb-6">Start a Conversation</h2>
          <p className="font-sans text-off-white/60 text-body mb-10">
            Every project begins with a fifteen-minute call. No pressure, no pitch — just an honest conversation 
            about what you're building and whether modular architecture is the right fit.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
          >
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
