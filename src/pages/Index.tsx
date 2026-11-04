import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import PropertyCard from "@/components/PropertyCard";
import PhotoGallery from "@/components/PhotoGallery";
import WhyAntigua from "@/components/WhyAntigua";
import properties from "@/data/properties";
import AgentAuthority from "@/components/AgentAuthority";
import LeadCapture from "@/components/LeadCapture";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import ContainerPreview from "@/components/ContainerPreview";
import BuildYourHome from "@/components/BuildYourHome";
import { trailerRealBuilds, containerFinishedUnits } from "@/data/realBuildPhotos";
import { LOCATIONS } from "@/data/locations";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Hero is now in src/components/HeroSection.tsx

// ---------- Marquee ----------
function Marquee() {
  const text = LOCATIONS.join(" · ") + " · ";

  return (
    <div className="bg-sand-light dark:bg-sand-light py-4 overflow-hidden border-y border-sand dark:border-gold/10">
      <div className="marquee-inner flex">
        {[text, text, text, text].map((t, i) => (
          <span key={i} className="small-caps text-xs text-ocean-mid dark:text-foreground/60 tracking-widest font-sans px-8">{t}</span>
        ))}
      </div>
    </div>
  );
}

// ---------- Core offerings ----------
const coreOffers = [
  {
    num: "01",
    name: "Container Orders",
    to: "/order-container",
    cta: "Order a container",
    tagline: "Real 20ft and 40ft units, ordered and delivered.",
    desc: "New one-trip or used cargo-worthy stock, standard or high-cube, priced from the island and taken to your site or shipped anywhere in the region.",
    points: ["20ft & 40ft, new or cargo-worthy used", "Standard or high-cube (9'6\")", "Delivery quoted to your site"],
  },
  {
    num: "02",
    name: "Trailer Builds",
    to: "/build-trailer",
    cta: "Start your trailer build",
    tagline: "A kitchen on wheels, built to your menu.",
    desc: "Food trailers, coffee bars, dessert trailers and mobile kitchens — laid out around the way you actually work, and fitted with the equipment you run.",
    points: ["Laid out around your menu and brand", "Equipment, power and plumbing specified", "Typically on the road in 4–6 weeks"],
  },
  {
    num: "03",
    name: "Insulated Panel Builds",
    to: "/contact?interest=insulated-panel-builds",
    cta: "Enquire about panel builds",
    tagline: "Cooler, faster and easier on the budget than block.",
    desc: "Foam-core insulated panels supplied and built with our manufacturing partner, engineered for the Caribbean — so less heat gets in and less time is spent on site.",
    points: ["Less heat transfer through the walls", "Shorter time on site than block", "Cost-conscious alternative to concrete"],
  },
  {
    num: "04",
    name: "Managed Construction",
    to: "/contact?interest=managed-construction",
    cta: "Discuss your build",
    tagline: "She runs the build — you don't.",
    desc: "Overseas, or simply not wanting to run a build yourself? The trades are appointed and coordinated, materials priced and ordered, the work sequenced, the site supervised and progress reported back to you.",
    points: ["Trades hired, coordinated and supervised", "Materials priced, ordered and tracked", "Progress reported through to handover"],
  },
];

const supporting = [
  { num: "05", name: "Custom Builds", interest: "custom-builds", span: "lg:col-span-2", desc: "Built from your own drawings, or with the architectural drawings arranged for you — in block, container or insulated panel." },
  { num: "06", name: "Traditional Construction", interest: "traditional-construction", span: "lg:col-span-2", desc: "Conventional block and concrete homes, coordinated around your land, needs and budget." },
  { num: "07", name: "Renovations & Trades", interest: "renovations-trades", span: "lg:col-span-2", desc: "Vetted help with tiling, painting, plumbing, electrical work, roofing, drawings and design." },
  { num: "08", name: "Property Sales & Land", interest: "property-sales-land", span: "lg:col-span-3", desc: "Houses and land with clear details — tell us what you're after and we'll come back with options." },
  { num: "09", name: "Relocation Services", interest: "relocation", span: "md:col-span-2 lg:col-span-3", desc: "Local support for overseas buyers finding land, property and reliable people on the ground." },
];

function EnquiryButton({
  to,
  label = "Start your enquiry",
  variant = "solid",
}: {
  to: string;
  label?: string;
  variant?: "solid" | "outline";
}) {
  return (
    <Link
      to={to}
      className={
        variant === "solid"
          ? "cta-shimmer inline-flex w-fit items-center gap-2 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold small-caps tracking-[0.14em] text-sm px-7 py-3 transition-all duration-300"
          : "inline-flex w-fit items-center gap-2 border border-gold/60 px-6 py-3 font-sans small-caps tracking-[0.14em] text-[13px] text-gold-soft hover:bg-gold hover:text-ocean-deep transition-colors duration-300"
      }
    >
      {label} <span aria-hidden>→</span>
    </Link>
  );
}

function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-ocean-deep dark:bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal max-w-2xl">
          <SectionLabel text="What We Offer" light />
          <h2 className="text-h2 text-off-white">Four ways to get it built</h2>
          <p className="font-sans text-off-white/60 text-base leading-relaxed mt-4">
            Start with the work you need. Each one opens the right form with your project type already
            chosen, so you only answer what is relevant to you.
          </p>
        </div>

        {/* Core offerings — the four the site leads with */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
          {coreOffers.map((s, i) => (
            <div
              key={s.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 4)} group relative flex flex-col border border-gold/30 bg-gold/[0.07] p-8 md:p-10 transition-all duration-300 hover:border-gold/60 hover:bg-gold/[0.11]`}
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full" aria-hidden />
              <p className="font-serif text-5xl text-off-white/10 font-light leading-none mb-5 group-hover:text-gold/25 transition-colors duration-300">
                {s.num}
              </p>
              <h3 className="font-serif text-2xl md:text-3xl text-off-white mb-2">{s.name}</h3>
              <p className="font-sans text-sm text-gold/85 mb-4">{s.tagline}</p>
              <p className="font-sans text-sm text-off-white/60 leading-relaxed">{s.desc}</p>
              <ul className="mt-6 space-y-2">
                {s.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 font-sans text-sm text-off-white/70">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <EnquiryButton to={s.to} label={s.cta} />
              </div>
            </div>
          ))}
        </div>

        {/* Supporting services */}
        <div className="mt-16 md:mt-20 reveal">
          <SectionLabel text="Also Handled" light />
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-px bg-gold/10">
          {supporting.map((s, i) => (
            <div
              key={s.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 5)} group flex flex-col bg-ocean-deep dark:bg-ocean-deep p-7 border-t-2 border-transparent hover:border-gold transition-colors duration-300 ${s.span}`}
            >
              <p className="font-serif text-4xl text-off-white/10 font-light mb-3 group-hover:text-gold/20 transition-colors duration-300">
                {s.num}
              </p>
              <h3 className="font-serif text-lg text-off-white mb-2">{s.name}</h3>
              <p className="font-sans text-off-white/50 text-sm leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-5">
                <EnquiryButton to={`/contact?interest=${s.interest}`} variant="outline" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Proof: real delivered work ----------
function DeliveredWork() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-off-white dark:bg-background" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal max-w-2xl">
          <SectionLabel text="Work Delivered" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground">Delivered in Antigua. Not mock-ups.</h2>
          <p className="font-sans text-ocean-mid/70 dark:text-foreground/60 text-base leading-relaxed mt-4">
            These are photographs of finished work, not renders — including the RumBurger food trailer
            built and delivered to a customer here in Antigua, and modular container units completed and
            shipped across the region.
          </p>
        </div>

        <div className="reveal reveal-delay-2">
          <PhotoGallery photos={[...trailerRealBuilds, ...containerFinishedUnits]} />
        </div>

        <div className="flex flex-wrap gap-6 mt-10 reveal reveal-delay-3">
          <Link
            to="/trailers"
            className="font-sans text-sm text-gold hover:text-gold-soft transition-colors inline-flex items-center gap-2"
          >
            See trailers &amp; mobile kitchens <span>→</span>
          </Link>
          <Link
            to="/container-solutions"
            className="font-sans text-sm text-gold hover:text-gold-soft transition-colors inline-flex items-center gap-2"
          >
            See container solutions <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- How it works ----------
const steps = [
  {
    num: "01",
    title: "Tell us what you need",
    desc: "A few questions in the enquiry form — what you're building or fixing, roughly where, your timeline and budget range.",
  },
  {
    num: "02",
    title: "We talk it through",
    desc: "Ashante follows up by WhatsApp, call or email to confirm the scope, the method that suits your plot and what it realistically involves.",
  },
  {
    num: "03",
    title: "Assessment & quote",
    desc: "For construction and renovation work, a site visit, measurements and drawings follow the US$250 assessment fee. You then get a written quote.",
  },
  {
    num: "04",
    title: "Build & handover",
    desc: "Materials, trades and scheduling are arranged, work is supervised on site, and you get progress updates through to handover.",
  },
];

function HowItWorks() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-16 md:py-24 bg-sand-light dark:bg-sand-light" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14 reveal max-w-2xl">
          <SectionLabel text="How It Works" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground">What happens after you enquire</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((s, i) => (
            <div key={s.num} className={`reveal reveal-delay-${Math.min(i + 1, 6)}`}>
              <p className="font-serif text-4xl text-gold/40 font-light mb-4">{s.num}</p>
              <h3 className="font-serif text-lg text-ocean-deep dark:text-foreground mb-3">{s.title}</h3>
              <p className="font-sans text-sm text-ocean-mid/70 dark:text-foreground/60 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 reveal reveal-delay-3">
          <Link
            to="/contact"
            className="cta-shimmer inline-flex bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm py-3 px-8 transition-all duration-300"
          >
            Start Your Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}

// ---------- Properties (demoted, short row) ----------
function PropertiesRow() {
  const sectionRef = useScrollReveal();
  const featured = properties.filter((p) => p.type === "luxury").slice(0, 3);

  return (
    <section className="py-16 md:py-20 bg-off-white dark:bg-background" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 reveal">
          <div>
            <SectionLabel text="Also On The Books" />
            <h2 className="text-h2 text-ocean-deep dark:text-foreground">Houses &amp; land for sale</h2>
          </div>
          <Link
            to="/properties"
            className="font-sans text-sm text-gold hover:text-gold-soft transition-colors inline-flex items-center gap-2"
          >
            See available properties <span>→</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 reveal reveal-delay-2">
          {featured.map((p) => (
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
              href={p.categoryHref}
              badge={p.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Index ----------
function FactsStrip() {
  const facts = [
    "Working across Antigua & Barbuda",
    "Units built to order",
    "Vetted local trades, coordinated on site",
  ];
  return (
    <div className="bg-ocean-deep border-t border-gold/25">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-0 py-6 sm:py-0 sm:h-[72px]">
          {facts.map((fact, i, arr) => (
            <div
              key={fact}
              className={`flex-1 max-w-none sm:max-w-[300px] flex items-center justify-center px-4 text-center ${
                i < arr.length - 1 ? "sm:border-r border-gold/15" : ""
              }`}
            >
              <span className="font-sans text-xs sm:text-sm text-white/70 tracking-wide">{fact}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function Index() {
  return (
    <div className="bg-off-white dark:bg-background">
      <HeroSection />
      <FactsStrip />
      <Services />
      <DeliveredWork />
      <HowItWorks />
      <BuildYourHome />
      <ContainerPreview />
      <AgentAuthority />

      <WhyAntigua />
      <Marquee />
      <PropertiesRow />
      <ContactForm dark />
      <LeadCapture />
    </div>
  );
}
