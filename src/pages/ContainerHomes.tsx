import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import containerExteriorImg from "@/assets/container_exterior.jpg";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import containerInteriorImg from "@/assets/container_interior.jpg";
import containerBeachfrontImg from "@/assets/container_beachfront.jpg";
import containerCafeImg from "@/assets/container_cafe.jpg";
import SectionLabel from "@/components/SectionLabel";
import GoldCTA from "@/components/container/GoldCTA";
import GoldCheck from "@/components/container/GoldCheck";
import {
  IconDiamond,
  IconCrown,
  IconPillar,
  IconShield,
  IconLeaf,
  IconCompass,
  IconBlueprint,
  IconShip,
  IconKey,
  IconStorefront,
  IconCup,
  IconTower,
  IconPalm,
} from "@/components/container/ContainerIcons";

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */
function ContainerHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen min-h-[100svh] overflow-hidden flex items-center"
    >
      <motion.div
        className="absolute inset-0 hero-kb-layer"
        style={{
          backgroundImage: `url(${containerExteriorImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          y: bgY,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(5,12,28,0.90) 0%, rgba(5,12,28,0.60) 45%, rgba(5,12,28,0.20) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "35%",
          background:
            "linear-gradient(to top, rgba(5,12,28,0.85) 0%, rgba(5,12,28,0.40) 60%, transparent 100%)",
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[20vw] font-light text-off-white/[0.04] leading-none">AL</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/25" />

      <div className="relative z-10 w-full px-5 sm:px-[clamp(24px,8vw,96px)] pt-24 pb-32">
        <div className="max-w-[600px]">
          <div className="flex items-center gap-3 mb-4 hero-stagger" style={{ animationDelay: "0.2s" }}>
            <span className="block w-8 h-px bg-gold" />
            <span className="font-sans text-xs font-bold tracking-[0.22em] uppercase text-gold">
              A. Lindsay Luxe Estates
            </span>
          </div>
          <h1
           className="text-display font-normal text-off-white mb-3 hero-stagger"
            style={{
              textShadow: "0 2px 20px rgba(0,0,0,0.35)",
              animationDelay: "0.5s",
            }}
          >
            Modern Container
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Living.
            </span>
          </h1>
          <p
            className="font-sans text-off-white/[0.84] max-w-[440px] mb-8 hero-stagger"
            style={{ fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.75, animationDelay: "0.8s" }}
          >
            Fully-built container homes, delivered and installed. Half the time of traditional construction, with none of the project-management overhead.
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 hero-stagger" style={{ animationDelay: "1.0s" }}>
            <GoldCTA variant="solid" onClick={() => document.getElementById("packages")?.scrollIntoView({ behavior: "smooth" })}>
              View Packages
            </GoldCTA>
            <GoldCTA variant="outline" href="https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'm%20interested%20in%20container%20homes">
              WhatsApp Ashante
            </GoldCTA>
          </div>
          <div className="mt-8 hero-stagger flex items-center gap-6" style={{ animationDelay: "1.2s" }}>
            <div>
              <span className="font-serif text-2xl text-gold">$88,000</span>
              <span className="font-sans text-xs text-off-white/50 ml-1.5">XCD starting</span>
            </div>
            <span className="w-px h-6 bg-gold/20" />
            <span className="font-sans text-xs text-off-white/50 tracking-wider uppercase">3 Packages</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 sm:bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-stagger" style={{ animationDelay: "1.4s" }}>
        <span className="font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-gold/70">Scroll</span>
        <span className="block w-px h-6 bg-gold/50 scroll-line" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   WHY CONTAINER HOMES
   ═══════════════════════════════════════════ */
const whyCards = [
  { Icon: IconShield, title: "Built in Weeks", desc: "Factory-manufactured to precision — delivered and installed in a fraction of traditional build time." },
  { Icon: IconDiamond, title: "Cost Efficient", desc: "Premium living at a fraction of the cost. No unexpected overruns or hidden fees." },
  { Icon: IconPillar, title: "Hurricane Resilient", desc: "Engineered from Corten steel — built to withstand Category 5 conditions." },
  { Icon: IconLeaf, title: "Eco-Friendly", desc: "Repurposed shipping containers reduce waste and lower your carbon footprint." },
];

function WhyContainerHomes() {
  return (
    <section className="py-28 bg-secondary">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <SectionLabel text="The Advantage" />
          <h2 className="text-h2 text-foreground">Why Container Homes?</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {whyCards.map(({ Icon, title, desc }) => (
            <div key={title} className="group bg-card rounded-2xl p-8 border border-transparent transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(212,165,74,0.08)] relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-gold transition-all duration-500 group-hover:w-full" />
              <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-secondary mb-5 transition-colors duration-500 group-hover:bg-gold/10">
                <Icon className="w-8 h-8 text-ocean-mid transition-colors duration-500 group-hover:text-gold" />
              </div>
              <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
              <p className="font-sans text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PACKAGES — TABS
   ═══════════════════════════════════════════ */
type PackageKey = "self-service" | "full-service" | "premium";

const packagesData = [
  {
    key: "self-service" as PackageKey,
    name: "Self-Service",
    tagline: "Container delivered, you handle the rest",
    Icon: IconDiamond,
    prices: [
      { unit: "1 Bedroom", price: "$88,000 XCD" },
      { unit: "2 Bedroom", price: "$95,000 XCD" },
    ],
    includes: [
      "Factory-built container home",
      "Kitchen & bathroom fitted",
      "Insulated walls, floors & roof",
      "Windows, doors & finishes",
    ],
    image: containerBeachfrontImg,
  },
  {
    key: "full-service" as PackageKey,
    name: "Full-Service",
    tagline: "We handle everything — you just move in",
    Icon: IconCrown,
    prices: [
      { unit: "1 Bedroom", price: "$170,000 XCD" },
      { unit: "2 Bedroom", price: "$195,000 XCD" },
    ],
    includes: [
      "Everything in Self-Service",
      "Shipping & import",
      "Customs clearance",
      "Delivery truck & crane",
      "Foundation & septic",
      "Full on-site setup",
    ],
    image: containerCourtyardImg,
  },
  {
    key: "premium" as PackageKey,
    name: "Premium",
    tagline: "Expanded luxury — two containers combined",
    Icon: IconPillar,
    prices: [{ unit: "Expanded 2-Container", price: "$360,000 XCD" }],
    includes: [
      "Everything in Full-Service",
      "Two 40ft containers combined",
      "Custom floor plan",
      "Full electrical & plumbing",
    ],
    image: containerInteriorImg,
  },
];

function PackagesSection() {
  const [active, setActive] = useState<PackageKey>("full-service");
  const current = packagesData.find((p) => p.key === active)!;

  return (
    <section id="packages" className="py-28 bg-ocean-deep relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--gold)) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.03,
        }}
      />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14">
          <SectionLabel text="Packages" light />
          <h2 className="text-h2 text-off-white">Container Home Packages</h2>
        </div>
        <div className="flex flex-wrap gap-2 mb-12">
          {packagesData.map((pkg) => (
            <button
              key={pkg.key}
              onClick={() => setActive(pkg.key)}
              className="relative font-sans text-sm font-medium tracking-wider uppercase px-6 py-3 rounded-md transition-colors duration-300"
              style={{
                color: active === pkg.key ? "hsl(var(--primary-foreground))" : "hsl(var(--off-white) / 0.6)",
              }}
            >
              {active === pkg.key && (
                <motion.div
                  layoutId="activePackageTab"
                  className="absolute inset-0 rounded-md"
                  style={{ background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))" }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <pkg.Icon className="w-4 h-4" />
                {pkg.name}
              </span>
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={current.key}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <div className="relative group overflow-hidden rounded-2xl">
              <img
                src={current.image}
                alt={`${current.name} container home`}
                className="w-full h-full min-h-[360px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-ocean-deep/80 backdrop-blur-sm text-gold font-sans text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-md">
                {current.name}
              </div>
            </div>
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col justify-center"
              style={{ background: "linear-gradient(160deg, hsl(220 42% 12%), hsl(220 42% 16%))" }}
            >
              <div className="flex items-center gap-3 mb-2">
                <current.Icon className="w-6 h-6 text-gold" />
                <h3 className="font-serif text-2xl text-off-white">{current.name}</h3>
              </div>
              <p className="font-sans text-sm text-off-white/60 mb-6">{current.tagline}</p>
              <div className="flex flex-wrap gap-4 mb-8">
                {current.prices.map((p) => (
                  <div key={p.unit} className="bg-ocean-deep/60 border border-gold/15 rounded-xl px-5 py-4 transition-shadow duration-300 hover:shadow-[0_0_24px_rgba(212,165,74,0.12)]">
                    <span className="font-sans text-xs text-off-white/50 block mb-1">{p.unit}</span>
                    <span className="font-serif text-xl text-gold">{p.price}</span>
                  </div>
                ))}
              </div>
              <ul className="space-y-3 mb-8">
                {current.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="font-sans text-sm text-off-white/80">{item}</span>
                  </li>
                ))}
              </ul>
              <GoldCTA
                variant="solid"
                href={`https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(current.name)}%20container%20home%20package`}
              >
                Inquire About This Package
              </GoldCTA>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   COMPARISON TABLE
   ═══════════════════════════════════════════ */
const comparisonRows = [
  { feature: "Factory-Built Home", self: true, full: true, premium: true },
  { feature: "Kitchen & Bathroom", self: true, full: true, premium: true },
  { feature: "Insulation & Finishes", self: true, full: true, premium: true },
  { feature: "Shipping & Import", self: false, full: true, premium: true },
  { feature: "Customs Clearance", self: false, full: true, premium: true },
  { feature: "Delivery & Crane", self: false, full: true, premium: true },
  { feature: "Foundation & Septic", self: false, full: true, premium: true },
  { feature: "On-Site Setup", self: false, full: true, premium: true },
  { feature: "Two Containers Combined", self: false, full: false, premium: true },
  { feature: "Custom Floor Plan", self: false, full: false, premium: true },
  { feature: "Full Electrical & Plumbing", self: false, full: false, premium: true },
];

function ComparisonTable() {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-[1080px] mx-auto px-6 md:px-10">
        <div className="mb-10">
          <SectionLabel text="Compare" />
          <h2 className="font-serif text-3xl md:text-4xl text-foreground">Package Comparison</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="font-sans text-xs tracking-wider uppercase text-muted-foreground py-4 pr-4">Feature</th>
                <th className="font-sans text-xs tracking-wider uppercase text-muted-foreground py-4 px-4 text-center">Self-Service</th>
                <th className="font-sans text-xs tracking-wider uppercase text-muted-foreground py-4 px-4 text-center">Full-Service</th>
                <th className="font-sans text-xs tracking-wider uppercase text-muted-foreground py-4 px-4 text-center">Premium</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr key={row.feature} className="border-b border-border/50 transition-colors duration-200 hover:bg-gold/[0.04]">
                  <td className="font-sans text-sm text-foreground py-3.5 pr-4">{row.feature}</td>
                  <td className="py-3.5 px-4 text-center">{row.self ? <GoldCheck /> : <span className="text-muted-foreground/40">—</span>}</td>
                  <td className="py-3.5 px-4 text-center">{row.full ? <GoldCheck /> : <span className="text-muted-foreground/40">—</span>}</td>
                  <td className="py-3.5 px-4 text-center">{row.premium ? <GoldCheck /> : <span className="text-muted-foreground/40">—</span>}</td>
                </tr>
              ))}
              <tr className="border-t-2 border-gold/20">
                <td className="font-sans text-sm font-semibold text-foreground py-4 pr-4">Starting Price</td>
                <td className="py-4 px-4 text-center font-serif text-lg text-gold">$88K</td>
                <td className="py-4 px-4 text-center font-serif text-lg text-gold">$170K</td>
                <td className="py-4 px-4 text-center font-serif text-lg text-gold">$360K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   HOW IT WORKS
   ═══════════════════════════════════════════ */
const processSteps = [
  { Icon: IconCompass, num: "01", title: "Consultation", desc: "Discuss your vision, land, and budget with Ashante" },
  { Icon: IconBlueprint, num: "02", title: "Design & Build", desc: "Factory-built with premium finishes to your spec" },
  { Icon: IconShip, num: "03", title: "Ship & Deliver", desc: "Import, customs clearance, and transport to your site" },
  { Icon: IconKey, num: "04", title: "Install & Setup", desc: "Foundation, utilities, and you move in" },
];

function HowItWorks() {
  return (
    <section className="py-28 bg-secondary">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <SectionLabel text="The Process" />
          <h2 className="font-serif text-4xl md:text-5xl text-foreground">How It Works</h2>
        </div>
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px" style={{ background: "linear-gradient(90deg, hsl(var(--gold) / 0.1), hsl(var(--gold) / 0.4), hsl(var(--gold) / 0.4), hsl(var(--gold) / 0.1))" }} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {processSteps.map(({ Icon, num, title, desc }) => (
              <div key={num} className="group flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,165,74,0.15)]">
                  <Icon className="w-10 h-10 text-ocean-mid transition-colors duration-500 group-hover:text-gold" />
                  <span className="absolute -top-1 -right-1 w-7 h-7 rounded-full bg-gold text-primary-foreground font-sans text-xs font-bold flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <h3 className="font-serif text-xl text-foreground mb-2">{title}</h3>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed max-w-[220px]">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   CONTAINERS FOR BUSINESS
   ═══════════════════════════════════════════ */
const businessCards = [
  { Icon: IconStorefront, title: "Pop-Up Retail", desc: "Tourist area shops & boutiques" },
  { Icon: IconCup, title: "Cafe & Restaurant", desc: "Beachside bars & dining venues" },
  { Icon: IconTower, title: "Office & Workspace", desc: "Private offices with full AC" },
  { Icon: IconPalm, title: "Airbnb & Rentals", desc: "Vacation rental with strong ROI" },
];

function ContainersForBusiness() {
  return (
    <section id="container-businesses" className="py-28 bg-ocean-deep">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <SectionLabel text="Commercial" light />
            <h2 className="font-serif text-4xl md:text-5xl text-off-white mb-6">
              Containers for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Business
              </span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {businessCards.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group p-6 rounded-xl border border-off-white/10 transition-all duration-500 hover:border-gold/30 hover:shadow-[0_0_24px_rgba(212,165,74,0.08)]"
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-off-white/[0.06] mb-4 transition-colors duration-500 group-hover:bg-gold/10">
                    <Icon className="w-7 h-7 text-off-white/50 transition-colors duration-500 group-hover:text-gold" />
                  </div>
                  <h4 className="font-serif text-lg text-off-white mb-1">{title}</h4>
                  <p className="font-sans text-sm text-off-white/50">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — image with floating stats */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={containerCafeImg}
                alt="Container business in Antigua"
                className="w-full h-[420px] object-cover"
                loading="lazy"
              />
            </div>
            {/* Floating stat cards */}
            <motion.div
              className="absolute -bottom-4 -left-4 bg-ocean-deep/90 backdrop-blur-md border border-gold/20 rounded-xl px-5 py-4"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="font-serif text-2xl text-gold block leading-none">40%</span>
              <span className="font-sans text-[10px] text-off-white/50 tracking-wider uppercase">Faster Build</span>
            </motion.div>
            <motion.div
              className="absolute -top-4 -right-4 bg-ocean-deep/90 backdrop-blur-md border border-gold/20 rounded-xl px-5 py-4"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <span className="font-serif text-2xl text-gold block leading-none">8 Wks</span>
              <span className="font-sans text-[10px] text-off-white/50 tracking-wider uppercase">Average Delivery</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FINAL CTA
   ═══════════════════════════════════════════ */
function FinalCTA() {
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(207 100% 14%), hsl(207 100% 21%), hsl(207 80% 28%))",
      }}
    >
      {/* Radial gold glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(212,165,74,0.08) 0%, transparent 60%)",
        }}
      />
      {/* Gold dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, hsl(var(--gold)) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
          opacity: 0.04,
        }}
      />
      {/* Gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gold/25" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gold/25" />

      <div className="relative max-w-[640px] mx-auto px-6 text-center">
        <div className="flex justify-center mb-6">
          <IconCrown className="w-12 h-12 text-gold" />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl text-off-white mb-4">
          Ready to Build Your Container{" "}
          <span
            style={{
              background: "linear-gradient(135deg, hsl(var(--gold)), hsl(var(--gold-soft)))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Home
          </span>
          ?
        </h2>
        <p className="font-sans text-off-white/60 text-base mb-10 max-w-md mx-auto">
          Speak with Ashante today to find the perfect container home package for your vision and budget.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <GoldCTA variant="solid" href="https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'd%20like%20to%20discuss%20container%20homes">
            WhatsApp +1 268 775-5221
          </GoldCTA>
          <GoldCTA variant="glass" href="mailto:ashante@alindsayluxe.com">
            Email Ashante
          </GoldCTA>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6">
          {["Licensed Agent", "100% Client Satisfaction", "Island-Wide Service"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <GoldCheck />
              <span className="font-sans text-xs text-off-white/50 tracking-wider uppercase">{t}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER TAGLINE
   ═══════════════════════════════════════════ */
function ContainerFooterTagline() {
  return (
    <div className="bg-ocean-deep py-6 text-center border-t border-gold/10">
      <p className="font-sans text-sm text-off-white/30 tracking-wider">
        More Affordable. Faster. Smarter Than Traditional Building.
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */
export default function ContainerHomes() {
  return (
    <div className="bg-background">
      <ContainerHero />
      <WhyContainerHomes />
      <PackagesSection />
      <ComparisonTable />
      <HowItWorks />
      <ContainersForBusiness />
      <FinalCTA />
      <ContainerFooterTagline />
    </div>
  );
}
