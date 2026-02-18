import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero_villa.jpg";
import ashanteImg from "@/assets/ashante_portrait.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import containerExteriorImg from "@/assets/container_exterior.jpg";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import SectionLabel from "@/components/SectionLabel";
import PropertyCard from "@/components/PropertyCard";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// ---------- Hero ----------
function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY * 0.4);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Parallax bg */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: `url(${heroImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${offset}px)`,
          willChange: "transform",
        }}
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/20 via-ocean-deep/30 to-ocean-deep/70" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 md:px-16 lg:px-24">
        <div className="max-w-[900px]">
          {/* Agent name — big editorial */}
          <div className="mb-0 leading-none">
            <h1 className="font-serif text-[clamp(72px,12vw,160px)] text-off-white font-light leading-none tracking-tight">
              Ashante
            </h1>
            <h1
              className="font-serif text-[clamp(72px,12vw,160px)] font-light leading-none tracking-tight italic"
              style={{
                color: "transparent",
                WebkitTextStroke: "1.5px #faf9f7",
              }}
            >
              Lindsay
            </h1>
          </div>

          {/* Gold line */}
          <div className="w-32 h-px bg-gold my-8" />

          {/* Subtitle */}
          <p className="small-caps text-xs text-off-white/80 tracking-[0.25em] font-sans mb-3">
            Licensed Real Estate Agent · Antigua &amp; Barbuda
          </p>

          {/* Tagline */}
          <p className="font-serif italic text-off-white/90 text-xl md:text-2xl mb-10">
            Your doorway to Caribbean paradise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <a
              href="/luxury-homes"
              className="bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300"
            >
              View Listings
            </a>
            <a
              href="/contact"
              className="border border-off-white text-off-white hover:bg-off-white hover:text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="small-caps text-xs text-off-white/50 tracking-widest font-sans">Scroll</span>
        <div className="w-px h-12 bg-off-white/30 scroll-line" />
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
    "w-full bg-transparent outline-none font-sans text-sm text-foreground border-b border-sand pb-2 cursor-pointer";

  return (
    <section className="bg-off-white shadow-xl py-0">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="bg-card shadow-2xl px-8 py-8 -mt-12 relative z-10">
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
              className="bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm py-3 px-6 transition-colors duration-300 whitespace-nowrap"
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
    <div className="bg-sand-light py-4 overflow-hidden border-y border-sand">
      <div className="marquee-inner flex">
        <span className="small-caps text-xs text-ocean-mid tracking-widest font-sans px-8">{text}</span>
        <span className="small-caps text-xs text-ocean-mid tracking-widest font-sans px-8">{text}</span>
        <span className="small-caps text-xs text-ocean-mid tracking-widest font-sans px-8">{text}</span>
        <span className="small-caps text-xs text-ocean-mid tracking-widest font-sans px-8">{text}</span>
      </div>
    </div>
  );
}

// ---------- About Preview ----------
function AboutPreview() {
  return (
    <section className="py-28 bg-off-white">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src={ashanteImg}
                alt="Ashante Lindsay"
                className="w-full max-w-md object-cover aspect-[4/5]"
              />
            </div>
            {/* Gold offset border */}
            <div className="absolute top-6 left-6 w-full max-w-md aspect-[4/5] border border-gold z-0" />
            {/* Badge */}
            <div className="absolute bottom-8 -right-4 md:-right-10 z-20 bg-ocean-deep text-off-white px-6 py-4">
              <p className="font-serif text-2xl font-medium text-gold">10+</p>
              <p className="small-caps text-xs text-off-white/70 tracking-widest font-sans">Years Experience</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <SectionLabel text="Meet Your Agent" />
            <h2 className="font-serif text-4xl md:text-5xl text-ocean-deep mb-6 leading-tight">
              About Ashante
            </h2>
            <p className="font-sans text-ocean-mid text-base leading-relaxed mb-4">
              Born and raised in the Caribbean, Ashante Lindsay brings over a decade of expertise and an intimate understanding of Antigua's most coveted properties. She has built a reputation for white-glove service, discretion, and an unmatched ability to match clients with their perfect island home.
            </p>
            <p className="font-sans text-ocean-mid text-base leading-relaxed mb-8">
              From waterfront estates to innovative container builds, Ashante navigates every corner of Antigua's real estate market with passion and precision — guiding buyers, sellers, and investors with equal dedication.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                "Luxury Villas",
                "Container Homes",
                "Prefab Homes",
                "Investment Properties",
                "Citizenship by Investment",
                "Property Management",
              ].map((tag) => (
                <span
                  key={tag}
                  className="border border-sand text-teal small-caps text-xs font-sans tracking-wider px-3 py-1.5"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href="/about"
              className="inline-flex items-center gap-3 text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm hover:text-gold transition-colors duration-300 group"
            >
              My Full Story
              <span className="gold-line w-8 group-hover:w-14 transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Featured Listings ----------
function FeaturedListings() {
  return (
    <section className="py-28 bg-sand-light">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-12">
          <SectionLabel text="Curated Collection" />
          <h2 className="font-serif text-4xl md:text-5xl text-ocean-deep">Featured Listings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  return (
    <section className="py-28 bg-ocean-deep">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="mb-16">
          <SectionLabel text="What We Offer" light />
          <h2 className="font-serif text-4xl md:text-5xl text-off-white">Services</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gold/10">
          {services.map((s) => (
            <div
              key={s.num}
              className="group bg-ocean-deep p-8 border-t-2 border-transparent hover:border-gold transition-colors duration-300"
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
    <section className="py-28 bg-off-white relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-serif text-[20vw] font-light text-ocean-deep/[0.03] leading-none"
        >
          AL
        </span>
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center relative">
        {/* Quote mark */}
        <p className="font-serif text-8xl text-gold leading-none mb-6 -mt-8">"</p>

        <div
          className={`transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}
        >
          <blockquote className="font-serif italic text-xl md:text-2xl text-ocean-deep leading-relaxed mb-8">
            {t.quote}
          </blockquote>
          <p className="small-caps text-xs text-gold tracking-widest font-sans mb-1">{t.author}</p>
          <p className="font-sans text-sm text-ocean-mid/60">{t.location}</p>
        </div>

        {/* Dot nav */}
        <div className="flex justify-center gap-3 mt-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => switchTo(i)}
              className={`w-1.5 h-1.5 transition-all duration-300 ${
                i === active ? "bg-gold w-6" : "bg-sand"
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
    <div className="bg-off-white">
      <Hero />
      <SearchBar />
      <Marquee />
      <AboutPreview />
      <FeaturedListings />
      <Services />
      <Testimonials />
      <ContactForm dark />
      <Footer />
    </div>
  );
}
