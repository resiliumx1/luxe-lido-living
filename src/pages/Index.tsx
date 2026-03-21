import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero_villa.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import containerExteriorImg from "@/assets/container_exterior.jpg";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import SectionLabel from "@/components/SectionLabel";
import PropertyCard from "@/components/PropertyCard";
import WhyAntigua from "@/components/WhyAntigua";
import AgentAuthority from "@/components/AgentAuthority";
import NeighborhoodGuide from "@/components/NeighborhoodGuide";
import LeadCapture from "@/components/LeadCapture";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// ---------- Hero ----------
function Hero() {
  const [offset, setOffset] = useState(0);
  const rafRef = useRef<number>();

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setOffset(window.scrollY * 0.35);
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Parallax bg */}
      <div
        className="absolute inset-0 w-full h-[130%] -top-[15%]"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offset}px)`,
          willChange: "transform",
        }}
      />
      {/* Warm cinematic overlay */}
      <div className="absolute inset-0" style={{ background: "rgba(10, 22, 40, 0.52)" }} />
      {/* Bottom gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/40 via-transparent to-transparent" />

      {/* Content — centered */}
      <div className="relative z-10 text-center px-6 max-w-[960px] mx-auto">
        {/* Gold line above headline */}
        <div className="w-16 h-px bg-gold mx-auto mb-8" />

        {/* Main headline */}
        <h1
          className="font-serif text-off-white font-light leading-[1.05] mb-6"
          style={{ fontSize: "clamp(40px, 7vw, 72px)", letterSpacing: "0.02em" }}
        >
          Your Caribbean Life
          <br />
          Starts Here
        </h1>

        {/* Sub-headline */}
        <p className="font-sans text-off-white/80 text-base md:text-lg mb-4 tracking-wide">
          Discover Antigua's Most Extraordinary Homes
        </p>

        {/* Agent attribution */}
        <p className="small-caps text-xs text-gold tracking-[0.25em] font-sans mb-10">
          Ashante Lindsay · Licensed Agent · Antigua &amp; Barbuda
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/luxury-homes"
            className="cta-shimmer relative bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-10 py-4 transition-all duration-300 hover:scale-[1.02] inline-flex items-center justify-center gap-2 group"
          >
            Explore Properties
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a
            href="/contact"
            className="cta-fill-sweep border border-off-white/70 text-off-white font-sans font-medium small-caps tracking-widest text-sm px-10 py-4 transition-all duration-300 hover:border-gold hover:text-gold inline-flex items-center justify-center"
          >
            Book a Consultation
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="small-caps text-[10px] text-off-white/40 tracking-widest font-sans">Scroll</span>
        <svg
          className="w-5 h-5 text-off-white/40 animate-bounce"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}

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
    else if (propType === "Container Businesses") navigate("/container-homes#container-businesses");
    else navigate("/luxury-homes");
  };

  const selectClass =
    "w-full bg-transparent outline-none font-sans text-sm text-foreground border-b border-sand dark:border-gold/20 pb-2 cursor-pointer";

  return (
    <section className="bg-off-white dark:bg-background shadow-xl py-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="bg-card dark:bg-card shadow-2xl px-6 md:px-8 py-8 -mt-12 relative z-10 border border-transparent dark:border-gold/10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 items-end">
            <div>
              <label className="small-caps text-xs text-gold tracking-widest font-sans block mb-2">Property Type</label>
              <select className={selectClass} value={propType} onChange={(e) => setPropType(e.target.value)}>
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
              <select className={selectClass} value={location} onChange={(e) => setLocation(e.target.value)}>
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
              <select className={selectClass} value={beds} onChange={(e) => setBeds(e.target.value)}>
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
              <select className={selectClass} value={price} onChange={(e) => setPrice(e.target.value)}>
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
    "Luxury Villas · Container Homes · Prefab Homes · Beachfront Estates · Investment Properties · Antigua & Barbuda · English Harbour · Jolly Harbour · Citizenship by Investment · ";

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

  return (
    <section className="py-28 bg-sand-light dark:bg-sand-light" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12 reveal">
          <SectionLabel text="Curated Collection" />
          <h2 className="font-serif text-4xl md:text-5xl text-ocean-deep dark:text-foreground">Featured Listings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 reveal reveal-delay-2">
          {/* Large card */}
          <div className="md:row-span-2">
            <PropertyCard
              image={villaTerraceImg}
              location="English Harbour"
              name="Sunset Ridge Estate"
              price="$3,200,000"
              beds={5}
              baths={4}
              href="/luxury-homes"
              large
            />
          </div>
          {/* Two smaller */}
          <PropertyCard
            image={containerExteriorImg}
            location="Jolly Harbour"
            name="The Cove Container Residence"
            price="$680,000"
            beds={3}
            baths={2}
            href="/container-homes"
          />
          <PropertyCard
            image={containerCourtyardImg}
            location="Half Moon Bay"
            name="Courtyard Oasis"
            price="$1,100,000"
            beds={4}
            baths={3}
            href="/container-homes"
          />
        </div>
      </div>
    </section>
  );
}

// ---------- Services ----------
const services = [
  { num: "01", name: "Property Acquisition", desc: "Expert guidance for buyers navigating Antigua's competitive luxury real estate market with confidence." },
  { num: "02", name: "Luxury Home Sales", desc: "Bespoke marketing strategies to present your property to the world's most discerning buyers." },
  { num: "03", name: "Investment Consulting", desc: "Data-driven insights and local market expertise to maximise your Caribbean property investment returns." },
  { num: "04", name: "Relocation Services", desc: "Full-service support for international clients making Antigua their permanent or seasonal home." },
  { num: "05", name: "Citizenship by Investment", desc: "Structured guidance through Antigua's CBI programme, unlocking Caribbean citizenship through real estate." },
  { num: "06", name: "Property Management", desc: "End-to-end management of your investment property, from rental income to ongoing maintenance." },
];

function Services() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-ocean-deep dark:bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-16 reveal">
          <SectionLabel text="What We Offer" light />
          <h2 className="font-serif text-4xl md:text-5xl text-off-white">Services</h2>
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
    quote: "Ashante didn't just find us a villa — she found us a life. The process was seamless, the service extraordinary, and English Harbour is now our forever home.",
    author: "James & Caroline R.",
    location: "English Harbour",
  },
  {
    quote: "As an international investor, I needed someone who truly understood Antigua's market. Ashante delivered beyond every expectation with precision and grace.",
    author: "Marcus T.",
    location: "London, UK",
  },
  {
    quote: "Our container home is everything we dreamed of. Ashante guided us from concept to keys — I cannot recommend her highly enough.",
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
export default function Index() {
  return (
    <div className="bg-off-white dark:bg-background">
      <Hero />
      <SearchBar />
      <Marquee />
      <FeaturedListings />
      <WhyAntigua />
      <AgentAuthority />
      <Services />
      <Testimonials />
      <ContactForm dark />
      <Footer />
    </div>
  );
}
