import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChefHat,
  IceCream2,
  Coffee,
  UtensilsCrossed,
  Wine,
  Ruler,
  Flame,
  Droplets,
  Zap,
  ShieldCheck,
  Wind,
} from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import PhotoGallery from "@/components/PhotoGallery";
import { trailerRealBuilds } from "@/data/realBuildPhotos";

const trailerTypes = [
  {
    icon: ChefHat,
    label: "Food Trailers",
    pitch: "Any cuisine — built to your menu, your brand, your workflow.",
  },
  {
    icon: IceCream2,
    label: "Dessert Trailers",
    pitch: "Ice cream, gelato, crêpes, shaved ice — display-forward layouts.",
  },
  {
    icon: Coffee,
    label: "Coffee Bars",
    pitch: "Espresso-ready with the power, plumbing and counter run baristas need.",
  },
  {
    icon: UtensilsCrossed,
    label: "Mobile Kitchens",
    pitch: "Fully equipped, business-ready — turnkey from delivery day.",
  },
  {
    icon: Wine,
    label: "Cocktail Bars",
    pitch: "Pop-up bars with speed wells, ice wells, and proper service flow.",
  },
];

const processSteps = [
  { label: "Consultation", desc: "Requirements, menu, brand & site review" },
  { label: "Design", desc: "Floor plan and 3D renders for your approval" },
  { label: "Production", desc: "Frame, build-out, equipment install" },
  { label: "Quality Check", desc: "Systems testing & full inspection" },
  { label: "Shipping", desc: "Crated and delivered across the Caribbean" },
];

const dimensions = [
  { label: "Footprint", value: "~5m × 2.1m (16.4 × 6.89 ft)" },
  { label: "Height", value: "2.21m / 7.25 ft" },
  { label: "Interior height", value: "6.89 ft" },
  { label: "Service window", value: "1.5m × 0.9m" },
];

const equipmentOptions = [
  '36" gas griddle',
  '24" 4-burner stove',
  "Gas fryer",
  "Display food warmer",
  "Salad prep fridge",
  "Workbench fridge",
  "Workbench freezer",
  "Chef base",
  "Commercial hood ventilation",
  "Roof-mounted AC",
];

const standardSystems = [
  {
    icon: Droplets,
    title: "Complete Water System",
    desc: "Sinks, fresh & waste tanks, water heater, and pressure pump",
  },
  {
    icon: Zap,
    title: "Full UL Electrical",
    desc: "Code-compliant wiring, panel and outlets throughout",
  },
  {
    icon: Flame,
    title: "Fire-Suppression Prep",
    desc: "Pre-fitted for hood suppression to local standards",
  },
  {
    icon: Wind,
    title: "Heat & Sound Insulation",
    desc: "Engineered for Caribbean climate and long service days",
  },
  {
    icon: ShieldCheck,
    title: "Durable Construction",
    desc: "Built for road, sea and salt-air exposure",
  },
];

export default function Trailers() {
  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative min-h-[80vh] flex items-end overflow-hidden bg-ocean-deep">
        {/* Layered gradient backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, hsl(var(--gold) / 0.18) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, hsl(var(--gold) / 0.10) 0%, transparent 60%), linear-gradient(180deg, hsl(var(--ocean-deep)) 0%, hsl(var(--ocean-deep)) 60%, #0a1422 100%)",
          }}
        />
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-serif text-[20vw] font-light text-off-white/[0.04] leading-none">AL</span>
        </div>

        <div className="relative z-10 w-full px-6 pb-20 pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <SectionLabel text="Custom Trailers & Mobile Kitchens" light />
            <h1 className="font-serif text-display text-off-white mt-4">
              Built Internationally. Delivered Regionally.
            </h1>
            <p className="font-serif italic text-gold text-h4 mt-3">
              Custom food trailers and mobile kitchens — shipped throughout the Caribbean
            </p>
            <p className="font-sans text-off-white/70 text-body mt-6 max-w-2xl mx-auto">
              From concept to keys in 4–6 weeks. Designed to your menu, engineered for the road, and
              business-ready the day they arrive.
            </p>
            <Link
              to="/build-trailer"
              className="inline-flex items-center gap-2 mt-10 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
            >
              Start Your Trailer Build <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Types */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="What We Build" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-3">Five Formats. Endless Configurations.</h2>
          <p className="font-sans text-muted-foreground text-body max-w-2xl mb-12">
            Every trailer is purpose-built — no off-the-shelf templates. Pick your format, and we'll design
            the layout around how you actually work.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {trailerTypes.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-card border border-border p-8 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                  <t.icon size={22} className="text-gold" />
                </div>
                <h3 className="font-serif text-h4 text-foreground mb-2">{t.label}</h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">{t.pitch}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Real builds */}
      <section className="bg-secondary py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="Real Builds" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-3">Built, Shipped, Trading.</h2>
          <p className="font-sans text-muted-foreground text-body max-w-2xl mb-12">
            These are photographs of our actual work — not renders. The RumBurger trailer below was built to
            the customer's brand and menu, then shipped and delivered to Antigua. Tap any photo to enlarge.
          </p>
          <PhotoGallery photos={trailerRealBuilds} />
        </div>
      </section>


      {/* Process */}
      <section className="bg-ocean-deep py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="Build Process" light />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-4 mb-16">
            <h2 className="font-serif text-h2 text-off-white max-w-2xl">From Brief to Delivery</h2>
            <p className="font-serif italic text-gold text-h4">Typical build: 4–6 weeks</p>
          </div>

          <div className="flex flex-col lg:flex-row items-start gap-4">
            {processSteps.map((step, i) => (
              <div key={step.label} className="flex-1 relative w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-gold text-ocean-deep font-sans font-bold text-sm flex items-center justify-center">
                    {i + 1}
                  </span>
                  <h3 className="font-sans font-semibold text-off-white text-sm">{step.label}</h3>
                </div>
                <p className="font-sans text-off-white/55 text-sm leading-relaxed">{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <ArrowRight
                    size={16}
                    className="hidden lg:block absolute -right-3 top-2.5 text-gold"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included — spec block */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-[1280px] mx-auto">
          <SectionLabel text="What's Included" />
          <h2 className="font-serif text-h2 text-foreground mt-4 mb-3">Example Build Specification</h2>
          <p className="font-sans text-muted-foreground text-body max-w-2xl mb-12">
            Based on a recent build — every trailer is configured to your menu and operation.
          </p>

          {/* Dimensions */}
          <div className="bg-secondary border border-border p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Ruler size={18} className="text-gold" />
              <h3 className="font-sans font-semibold text-foreground text-sm tracking-wide uppercase">
                Dimensions
              </h3>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {dimensions.map((d) => (
                <div key={d.label}>
                  <p className="font-sans text-xs text-muted-foreground">{d.label}</p>
                  <p className="font-sans text-sm text-foreground font-medium mt-1">{d.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Equipment + Systems two-col */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Equipment */}
            <div className="bg-card border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <Flame size={18} className="text-gold" />
                <h3 className="font-sans font-semibold text-foreground text-sm tracking-wide uppercase">
                  Equipment Options
                </h3>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {equipmentOptions.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 font-sans text-sm text-muted-foreground"
                  >
                    <span className="text-gold mt-1 leading-none">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Standard Systems */}
            <div className="bg-card border border-border p-8">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={18} className="text-gold" />
                <h3 className="font-sans font-semibold text-foreground text-sm tracking-wide uppercase">
                  Standard Systems
                </h3>
              </div>
              <ul className="space-y-5">
                {standardSystems.map((s) => (
                  <li key={s.title} className="flex items-start gap-3">
                    <s.icon size={18} className="text-gold shrink-0 mt-0.5" />
                    <div>
                      <p className="font-sans text-sm text-foreground font-medium">{s.title}</p>
                      <p className="font-sans text-xs text-muted-foreground mt-0.5 leading-relaxed">
                        {s.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ocean-deep py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-serif text-h2 text-off-white mb-6">Ready To Build?</h2>
          <p className="font-sans text-off-white/60 text-body mb-10">
            Tell us your menu, your brand, and where you're operating — we'll come back with a layout, a
            timeline, and a quote.
          </p>
          <Link
            to="/build-trailer"
            className="inline-flex items-center gap-2 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
          >
            Start Your Trailer Build <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
