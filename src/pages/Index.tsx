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

// ---------- Services ----------
const services = [
  { num: "01", name: "Managed Construction", interest: "managed-construction", desc: "Ashante runs your build for you — contractors and trades, materials, scheduling, site supervision and progress updates, on any build method." },
  { num: "02", name: "Custom Builds", interest: "custom-builds", desc: "Built to your own design, not a standard model — your drawings or ours, in block, container or insulated panel." },
  { num: "03", name: "Traditional Construction", interest: "traditional-construction", desc: "Conventional block and concrete homes, coordinated around your land, needs and budget." },
  { num: "04", name: "Container Builds", interest: "container-builds", desc: "Shipping containers converted into homes, offices, shops and useful commercial spaces." },
  { num: "05", name: "Insulated Panel Builds", interest: "insulated-panel-builds", desc: "Our recommended method for better thermal performance, faster erection and lower cost than concrete block." },
  { num: "06", name: "Renovations & Trades", interest: "renovations-trades", desc: "Vetted help with tiling, painting, plumbing, electrical work, roofing, drawings and design." },
  { num: "07", name: "Property Sales & Land", interest: "property-sales-land", desc: "Houses and land with clear details — tell us what you're after and we'll come back with options." },
  { num: "08", name: "Relocation Services", interest: "relocation", desc: "Local support for overseas buyers finding land, property and reliable people on the ground." },
];

function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-ocean-deep dark:bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-16 reveal">
          <SectionLabel text="What We Offer" light />
          <h2 className="text-h2 text-off-white">Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {services.map((s, i) => (
            <div
              key={s.num}
              className={`reveal reveal-delay-${Math.min(i + 1, 6)} group bg-ocean-deep dark:bg-ocean-deep p-8 border-t-2 border-transparent hover:border-gold transition-colors duration-300`}
            >
              <p className="font-serif text-5xl text-off-white/10 font-light mb-4 group-hover:text-gold/20 transition-colors duration-300">
                {s.num}
              </p>
              <h3 className="font-serif text-xl text-off-white mb-3">{s.name}</h3>
              <p className="font-sans text-off-white/50 text-sm leading-relaxed">{s.desc}</p>
              <Link
                to={`/contact?interest=${s.interest}`}
                className="inline-flex items-center gap-2 mt-5 font-sans text-xs text-gold hover:text-gold-soft transition-colors"
              >
                Enquire <span>→</span>
              </Link>
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
    <section className="py-28 bg-off-white dark:bg-background" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal max-w-2xl">
          <SectionLabel text="Work Delivered" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground">Real units, real customers</h2>
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
    <section className="py-28 bg-sand-light dark:bg-sand-light" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-14 reveal max-w-2xl">
          <SectionLabel text="How It Works" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground">From enquiry to handover</h2>
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
    <section className="py-24 bg-off-white dark:bg-background" ref={sectionRef}>
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
