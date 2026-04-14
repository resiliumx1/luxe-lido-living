import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import PropertyCard from "@/components/PropertyCard";
import WhyAntigua from "@/components/WhyAntigua";
import properties from "@/data/properties";
import AgentAuthority from "@/components/AgentAuthority";
import NeighborhoodGuide from "@/components/NeighborhoodGuide";
import LeadCapture from "@/components/LeadCapture";
import ContactForm from "@/components/ContactForm";
import HeroSection from "@/components/HeroSection";
import ContainerPreview from "@/components/ContainerPreview";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// Hero is now in src/components/HeroSection.tsx

// ---------- Search Bar ----------
function SearchBar() {
  const [propType, setPropType] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const handleFind = () => {
    if (propType === "Luxury Homes") navigate("/luxury-homes");
    else if (propType === "Container Homes") navigate("/container-homes");
    else if (propType === "Prefab Homes") navigate("/prefab-homes");
    else if (propType === "Container Businesses") navigate("/container-solutions/commercial");
    else if (propType === "Land") navigate("/contact?interest=land");
    else navigate("/luxury-homes");
  };

  return (
    <section className="bg-off-white dark:bg-background shadow-xl py-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="bg-card dark:bg-card shadow-2xl px-6 md:px-8 py-8 -mt-12 relative z-10 border border-transparent dark:border-gold/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div>
              <label className="small-caps text-xs text-gold tracking-widest font-sans block mb-2">Property Type</label>
              <select className="input-luxe" value={propType} onChange={(e) => setPropType(e.target.value)}>
                <option value="">All Types</option>
                <option>Luxury Homes</option>
                <option>Container Homes</option>
                <option>Prefab Homes</option>
                <option>Container Businesses</option>
                <option>Land</option>
              </select>
            </div>
            <div>
              <label className="small-caps text-xs text-gold tracking-widest font-sans block mb-2">Location</label>
              <select className="input-luxe" value={location} onChange={(e) => setLocation(e.target.value)}>
                <option value="">All Locations</option>
                <option>Jolly Harbour</option>
                <option>English Harbour</option>
                <option>Half Moon Bay</option>
                <option>St. John's</option>
                <option>Island-Wide</option>
              </select>
            </div>
            <div>
              <label className="small-caps text-xs text-gold tracking-widest font-sans block mb-2">Bedrooms</label>
              <select className="input-luxe" value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option value="">Any</option>
                <option>1+</option>
                <option>2+</option>
                <option>3+</option>
                <option>4+</option>
                <option>5+</option>
              </select>
            </div>
            <div>
              <label className="small-caps text-xs text-gold tracking-widest font-sans block mb-2">Price Range</label>
              <select className="input-luxe" value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="">Any</option>
                <option>Under $200K</option>
                <option>$200K–$500K</option>
                <option>$500K–$1M</option>
                <option>$1M–$3M</option>
                <option>$3M+</option>
              </select>
            </div>
            <button
              onClick={handleFind}
              className="cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm py-3 px-6 transition-all duration-300 whitespace-nowrap"
            >
              Find My Property
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Marquee ----------
function Marquee() {
  const text =
    "Jolly Harbour · English Harbour · Falmouth · Half Moon Bay · Nonsuch Bay · Long Bay · Willoughby Bay · Barbuda · ";

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

// AboutPreview removed — replaced by AgentAuthority component
// ---------- Featured Listings ----------
function FeaturedListings() {
  const sectionRef = useScrollReveal();
  const featured = properties.filter((p) => p.type === "luxury").slice(0, 4);

  return (
    <section className="py-28 bg-sand-light dark:bg-sand-light" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal">
          <SectionLabel text="Curated Collection" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground">Currently Represented</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal reveal-delay-2">
          {featured.map((p, i) => (
            <div key={p.id} className={i === 0 ? "md:row-span-2" : ""}>
              <PropertyCard
                id={p.id}
                image={p.images[0]}
                location={p.location}
                name={p.name}
                priceUSD={p.priceUSD}
                beds={p.beds}
                baths={p.baths}
                sqft={p.sqft}
                href={p.categoryHref}
                large={i === 0}
                badge={p.badge}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Services ----------
const services = [
  { num: "01", name: "Property Acquisition", desc: "Representing buyers from first showing through closing, across luxury, container, and prefab inventory." },
  { num: "02", name: "Luxury Home Sales", desc: "Marketing seven-figure Antiguan properties to qualified international buyers — discreetly and on a timeline that suits you." },
  { num: "03", name: "Investment Consulting", desc: "Yield analysis and market intelligence for investors evaluating Antiguan residential and short-term rental opportunities." },
  { num: "04", name: "Relocation Services", desc: "Guiding international buyers through residency logistics — banking, schools, healthcare, import of household goods." },
  { num: "05", name: "Citizenship by Investment", desc: "End-to-end support for Antigua's CBI programme through qualifying real estate. Licensed broker, pre-vetted developments." },
  { num: "06", name: "Property Management", desc: "Full-service management for absentee owners — maintenance, rentals, staff oversight, quarterly reporting." },
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Testimonials ----------
const testimonials = [
  {
    quote: "We'd been watching Antigua for six years. Ashante closed our villa in eleven weeks. Nothing about the process was complicated.",
    author: "James & Caroline R.",
    location: "English Harbour",
  },
  {
    quote: "I needed someone who understood both the legal side and the market side. She's one of the only brokers in the region who knows both cold.",
    author: "Marcus T.",
    location: "London",
  },
  {
    quote: "The container home cost less than we'd budgeted for a down payment elsewhere. We moved in two months after signing.",
    author: "Sofia & David M.",
    location: "Jolly Harbour",
  },
];

function Testimonials() {
  const [active, setActive] = useState(0);
  const [fading, setFading] = useState(false);
  const sectionRef = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActive((prev) => (prev + 1) % testimonials.length);
        setFading(false);
      }, 400);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const switchTo = (i: number) => {
    setFading(true);
    setTimeout(() => {
      setActive(i);
      setFading(false);
    }, 300);
  };

  const t = testimonials[active];

  return (
    <section className="py-28 bg-off-white dark:bg-background relative overflow-hidden" ref={sectionRef}>
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="font-serif text-[20vw] font-light text-ocean-deep/[0.03] dark:text-off-white/[0.04] leading-none">
          AL
        </span>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center relative reveal">
        {/* Quote mark */}
        <p className="font-serif text-8xl text-gold leading-none mb-6 -mt-8">"</p>

        <div className={`transition-opacity duration-300 ${fading ? "opacity-0" : "opacity-100"}`}>
          <blockquote className="font-serif italic text-xl md:text-2xl text-ocean-deep dark:text-foreground leading-relaxed mb-8">
            {t.quote}
          </blockquote>
          <p className="small-caps text-xs text-gold tracking-widest font-sans mb-1">{t.author}</p>
          <p className="font-sans text-sm text-ocean-mid/60 dark:text-foreground/50">{t.location}</p>
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className={`h-1.5 transition-all duration-300 ${
                i === active ? "bg-gold w-6" : "bg-sand dark:bg-sand w-1.5"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ---------- Index ----------
function StatsStrip() {
  const stats = [
    { num: "50+", label: "Homes Placed" },
    { num: "15+", label: "Years on Island" },
    { num: "$80M+", label: "In Transactions" },
    { num: "94%", label: "Client Retention" },
  ];
  return (
    <div className="bg-ocean-deep border-t border-gold/25">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="hidden sm:flex items-center justify-center h-[72px]">
          {stats.map((stat, i, arr) => (
            <div
              key={stat.label}
              className={`flex-1 max-w-[180px] flex flex-col items-center justify-center px-4 ${
                i < arr.length - 1 ? "border-r border-gold/15" : ""
              }`}
            >
              <span className="text-stat-number" style={{ fontSize: "clamp(20px, 2.5vw, 26px)", textShadow: "0 0 20px rgba(240,192,96,0.3)" }}>
                {stat.num}
              </span>
              <span className="text-stat-label text-white/50">
                {stat.label}
              </span>
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
      <StatsStrip />
      <SearchBar />
      <Marquee />
      <FeaturedListings />
      <WhyAntigua />
      <ContainerPreview />
      <NeighborhoodGuide />
      <AgentAuthority />
      <Services />
      <Testimonials />
      <ContactForm dark />
      <LeadCapture />
    </div>
  );
}
