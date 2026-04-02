import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import StaggerChildren from "@/components/StaggerChildren";
import { useWishlist } from "@/contexts/WishlistContext";

const featuredProperties = [
  { slug: "villa-paradiso", title: "Villa Paradiso", location: "Jolly Harbour", price: 1200000, beds: 4, baths: 3, sqft: 3200, gradient: "from-amber-900/80 to-teal-900/60" },
  { slug: "oceans-edge", title: "Ocean's Edge", location: "English Harbour", price: 895000, beds: 3, baths: 2, sqft: 2100, gradient: "from-sky-900/80 to-emerald-900/60" },
  { slug: "sunset-ridge-estate", title: "Sunset Ridge Estate", location: "Darkwood Beach", price: 2400000, beds: 5, baths: 5, sqft: 5500, gradient: "from-orange-900/80 to-purple-900/60" },
  { slug: "harbour-view-penthouse", title: "Harbour View Penthouse", location: "St. John's", price: 485000, beds: 2, baths: 2, sqft: 1400, gradient: "from-indigo-900/80 to-cyan-900/60" },
];

const testimonials = [
  { quote: "Ashante made our dream of owning Caribbean property a reality. His knowledge of the Antigua market is unmatched.", name: "Sarah & David Thompson", flag: "🇬🇧", detail: "Villa in Jolly Harbour" },
  { quote: "Professional, transparent, and genuinely caring. The CBI process was seamless.", name: "Marcus Chen", flag: "🇸🇬", detail: "Penthouse in St. John's" },
  { quote: "From our first WhatsApp message to getting our keys — everything was perfect.", name: "Jean-Pierre Moreau", flag: "🇫🇷", detail: "Beachfront Land" },
  { quote: "The container home option was exactly what we needed. Affordable luxury, delivered fast.", name: "Rebecca Williams", flag: "🇺🇸", detail: "Container Home" },
];

const valueProps = [
  { title: "Island Expertise", desc: "Born and raised in Antigua. Deep local knowledge you won't find elsewhere.", icon: "compass" as const },
  { title: "CBI Approved", desc: "Licensed for Antigua's Citizenship by Investment program. Properties from $300,000 USD.", icon: "crown" as const },
  { title: "End-to-End Service", desc: "From property search to closing. We handle everything.", icon: "pillar" as const },
  { title: "Container Innovation", desc: "Modern container homes — affordable, fast, hurricane-resilient.", icon: "diamond" as const },
];

function IconCompass() { return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10"><circle cx="24" cy="24" r="20" /><polygon points="24,8 28,24 24,40 20,24" strokeLinejoin="round" /><line x1="24" y1="4" x2="24" y2="8" /><line x1="24" y1="40" x2="24" y2="44" /><line x1="4" y1="24" x2="8" y2="24" /><line x1="40" y1="24" x2="44" y2="24" /></svg>; }
function IconCrown() { return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10"><path d="M8 36h32V18l-8 6-8-12-8 12-8-6v18z" strokeLinejoin="round" /><line x1="8" y1="40" x2="40" y2="40" /></svg>; }
function IconPillar() { return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10"><rect x="16" y="12" width="16" height="28" rx="1" /><rect x="12" y="8" width="24" height="4" rx="1" /><rect x="12" y="40" width="24" height="4" rx="1" /><line x1="20" y1="12" x2="20" y2="40" /><line x1="24" y1="12" x2="24" y2="40" /><line x1="28" y1="12" x2="28" y2="40" /></svg>; }
function IconDiamond() { return <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10"><polygon points="24,4 44,20 24,44 4,20" strokeLinejoin="round" /><polyline points="4,20 24,28 44,20" /><line x1="24" y1="4" x2="24" y2="28" /></svg>; }
function GoldDiamond() { return <svg viewBox="0 0 12 12" className="w-3 h-3 inline-block"><polygon points="6,0 12,6 6,12 0,6" fill="hsl(38,55%,50%)" /></svg>; }

const iconMap: Record<string, React.FC> = { compass: IconCompass, crown: IconCrown, pillar: IconPillar, diamond: IconDiamond };

function BedIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4"><rect x="2" y="10" width="16" height="5" rx="1"/><path d="M4 10V6a2 2 0 012-2h8a2 2 0 012 2v4"/><line x1="2" y1="15" x2="2" y2="17"/><line x1="18" y1="15" x2="18" y2="17"/></svg>; }
function BathIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4"><path d="M3 10h14v4a3 3 0 01-3 3H6a3 3 0 01-3-3v-4z"/><path d="M5 10V5a2 2 0 012-2h1"/><line x1="5" y1="17" x2="4" y2="19"/><line x1="15" y1="17" x2="16" y2="19"/></svg>; }
function AreaIcon() { return <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" className="w-4 h-4"><rect x="3" y="3" width="14" height="14" rx="1"/><path d="M3 10h14"/><path d="M10 3v14"/></svg>; }

export default function Index() {
  return (
    <div className="overflow-hidden">
      <HeroSection />
      <FeaturedSection />
      <WhySection />
      <CBISection />
      <ContainerSection />
      <TestimonialsSection />
      <FinalCTA />
    </div>
  );
}

function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={ref} className="relative h-screen overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 -top-20 -bottom-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,12%)] to-[hsl(210,60%,18%)]" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-center max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8, ease }} className="text-eyebrow mb-6">─── A. LINDSAY LUXE ESTATES ───</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8, ease }} className="font-display font-black text-white mb-6" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", lineHeight: 1.05 }}>
            Luxury Living in<br /><span className="text-gradient-gold">Antigua & Barbuda</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }} className="font-body text-white/70 text-lg max-w-lg mb-10 leading-relaxed">
            Exclusive properties, modern container homes, and citizenship-by-investment opportunities in the heart of the Caribbean.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75, duration: 0.8, ease }} className="flex flex-wrap gap-4">
            <Link to="/properties" className="gold-shimmer-hover bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20">Explore Properties</Link>
            <Link to="/services" className="border border-white/30 text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:border-luxury-gold hover:text-luxury-gold hover:shadow-lg hover:shadow-luxury-gold/10">Citizenship by Investment</Link>
          </motion.div>
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8, ease }} className="absolute bottom-0 left-0 right-0 z-20 translate-y-1/2">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-4 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <select className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none"><option value="">Location</option><option>Jolly Harbour</option><option>English Harbour</option><option>St. John's</option></select>
              <select className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none"><option value="">Property Type</option><option>Villa</option><option>Apartment</option><option>Estate</option><option>Land</option></select>
              <select className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 text-white font-body text-sm focus:outline-none"><option value="">Price Range</option><option>$0 – $500K</option><option>$500K – $1M</option><option>$1M – $2M</option><option>$2M+</option></select>
              <Link to="/properties" className="gold-shimmer-hover bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase rounded-xl flex items-center justify-center py-3 transition-all duration-300">Search</Link>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="font-body text-[10px] tracking-[4px] text-white/40 uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}><ChevronDown size={16} className="text-luxury-gold/60" /></motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent z-10" />
    </section>
  );
}

function FeaturedSection() {
  const { toggleWishlist, isLiked } = useWishlist();
  return (
    <section className="py-32 pt-40 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <RevealSection><p className="text-eyebrow mb-3">Featured Listings</p><h2 className="font-display text-foreground mb-12">Handpicked Caribbean Properties</h2></RevealSection>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" staggerDelay={0.12}>
          {featuredProperties.map((p) => (
            <Link key={p.slug} to={`/properties/${p.slug}`} className="group block">
              <div className="relative overflow-hidden rounded-2xl luxury-border-glow border border-border transition-all duration-500 hover:-translate-y-1">
                <div className={`aspect-[4/3] bg-gradient-to-br ${p.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-md border border-white/20 rounded-full px-3 py-1"><span className="font-body text-[11px] text-white/90">{p.location}</span></div>
                  <button onClick={(e) => { e.preventDefault(); toggleWishlist(p.slug); }} className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                    <svg viewBox="0 0 20 20" fill={isLiked(p.slug) ? "hsl(38,55%,50%)" : "none"} stroke={isLiked(p.slug) ? "hsl(38,55%,50%)" : "white"} strokeWidth="1.5" className="w-4 h-4"><path d="M10 17.5s-7-4.5-7-9a3.5 3.5 0 017 0 3.5 3.5 0 017 0c0 4.5-7 9-7 9z" /></svg>
                  </button>
                  {p.price >= 300000 && <div className="absolute bottom-14 left-3 bg-luxury-gold/90 rounded-full px-2.5 py-0.5"><span className="font-body text-[9px] font-bold text-white tracking-wider uppercase">CBI Eligible</span></div>}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="font-display text-lg text-white font-semibold">{p.title}</h3>
                    <p className="font-body text-[13px] text-white/60 mb-1">{p.location}</p>
                    <p className="font-display text-xl text-luxury-gold font-bold">${p.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-2 text-white/50">
                      <span className="flex items-center gap-1 font-body text-xs"><BedIcon /> {p.beds}</span>
                      <span className="flex items-center gap-1 font-body text-xs"><BathIcon /> {p.baths}</span>
                      <span className="flex items-center gap-1 font-body text-xs"><AreaIcon /> {p.sqft.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-luxury-gold group-hover:w-full transition-all duration-500 rounded-full" />
              </div>
            </Link>
          ))}
        </StaggerChildren>
        <RevealSection delay={0.3} className="mt-10 text-center">
          <Link to="/properties" className="inline-flex items-center gap-2 font-body text-sm text-luxury-gold hover:underline underline-offset-4 transition-all duration-300 font-medium">View All Properties →</Link>
        </RevealSection>
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealSection direction="left">
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[hsl(207,80%,15%)] to-[hsl(207,60%,25%)]" />
              <div className="absolute -bottom-6 -right-4 md:right-4 bg-card border-2 border-luxury-gold/30 rounded-2xl px-6 py-5 shadow-xl">
                <p className="font-display text-3xl font-bold text-luxury-gold">15+</p>
                <p className="font-body text-xs text-muted-foreground tracking-wider uppercase">Years Caribbean<br/>Experience</p>
              </div>
            </div>
          </RevealSection>
          <RevealSection direction="right">
            <p className="text-eyebrow mb-3">Why Choose Us</p>
            <h2 className="font-display text-foreground mb-5">Your Trusted Partner in Caribbean Real Estate</h2>
            <p className="font-body text-muted-foreground mb-10 leading-relaxed">With over 15 years of experience in Antigua's luxury property market, A. Lindsay Luxe Estates offers unmatched expertise, personalized service, and deep connections throughout the island.</p>
            <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {valueProps.map((vp) => { const Icon = iconMap[vp.icon]; return (
                <div key={vp.title} className="group relative p-5 rounded-xl border border-border hover:border-luxury-gold/30 transition-all duration-500 hover:-translate-y-0.5">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-0 bg-luxury-gold group-hover:h-1/2 transition-all duration-500 rounded-full" />
                  <div className="text-muted-foreground group-hover:text-luxury-gold transition-colors duration-500 mb-3"><Icon /></div>
                  <h4 className="font-display text-base font-semibold text-foreground mb-1.5">{vp.title}</h4>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">{vp.desc}</p>
                </div>
              ); })}
            </StaggerChildren>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function CBISection() {
  const stats = [{ number: "$300K", label: "Minimum Investment" }, { number: "150+", label: "Visa-Free Countries" }, { number: "6 Months", label: "Processing Time" }];
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,12%)] to-[hsl(210,60%,10%)]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsla(38,55%,50%,0.06) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 text-center">
        <RevealSection direction="scale">
          <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="inline-block mb-6">
            <svg viewBox="0 0 48 48" fill="none" stroke="hsl(38,55%,50%)" strokeWidth="1.5" className="w-14 h-14 mx-auto"><path d="M8 36h32V18l-8 6-8-12-8 12-8-6v18z" strokeLinejoin="round" /><line x1="8" y1="40" x2="40" y2="40" /></svg>
          </motion.div>
          <h2 className="font-display text-white mb-4">Citizenship by Investment</h2>
          <p className="font-body text-white/70 text-lg max-w-xl mx-auto mb-12 leading-relaxed">Own property in Antigua & Barbuda. Gain citizenship and visa-free access to 150+ countries.</p>
        </RevealSection>
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
          {stats.map((s) => <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:border-luxury-gold/30 transition-all duration-500"><p className="font-display text-3xl font-bold text-luxury-gold mb-2">{s.number}</p><p className="font-body text-sm text-white/60 tracking-wider uppercase">{s.label}</p></div>)}
        </StaggerChildren>
        <RevealSection delay={0.3}>
          <Link to="/services" className="inline-flex items-center gap-2 border border-luxury-gold/40 text-luxury-gold font-body font-medium text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-300">Learn About CBI →</Link>
        </RevealSection>
      </div>
    </section>
  );
}

function ContainerSection() {
  const stats = [{ val: "$88K", label: "Starting Price (XCD)" }, { val: "3", label: "Packages Available" }, { val: "8 Wks", label: "Build Time" }];
  return (
    <section className="py-24 bg-muted">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <RevealSection direction="left">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(162,40%,20%)] to-[hsl(162,30%,30%)]" />
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-lg"><p className="font-display text-lg font-bold text-luxury-gold">40%</p><p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Lower Cost</p></div>
              <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-lg"><p className="font-display text-lg font-bold text-luxury-gold">8 Wks</p><p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">Build Time</p></div>
            </div>
          </RevealSection>
          <RevealSection direction="right">
            <p className="text-eyebrow mb-3">Container Homes</p>
            <h2 className="font-display text-foreground mb-5">Modern Living, Delivered.</h2>
            <p className="font-body text-muted-foreground mb-8 leading-relaxed">Purpose-built container homes designed for the Caribbean climate. Three turnkey packages starting from $88,000 XCD — hurricane-resilient, eco-friendly, and ready in just 8 weeks.</p>
            <div className="flex flex-wrap gap-6 mb-10">{stats.map((s) => <div key={s.label}><p className="font-display text-2xl font-bold text-luxury-gold">{s.val}</p><p className="font-body text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p></div>)}</div>
            <Link to="/container-homes" className="gold-shimmer-hover inline-flex bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-luxury-gold/20 transition-all duration-300">Explore Container Homes →</Link>
          </RevealSection>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const t = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 6000); return () => clearInterval(t); }, []);
  const t = testimonials[current];
  return (
    <section className="py-24 bg-background">
      <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
        <RevealSection>
          <h2 className="font-display text-foreground mb-16">What Our Clients Say</h2>
          <div className="relative min-h-[240px]">
            <motion.div key={current} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="font-display text-6xl text-luxury-gold/20 leading-none block mb-4">"</span>
              <p className="font-display italic text-xl text-foreground leading-relaxed mb-8">{t.quote}</p>
              <div className="flex items-center justify-center gap-1.5 mb-4">{[...Array(5)].map((_, i) => <GoldDiamond key={i} />)}</div>
              <p className="font-body font-semibold text-foreground">{t.name} {t.flag}</p>
              <p className="font-body text-sm text-muted-foreground">{t.detail}</p>
            </motion.div>
          </div>
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, i) => <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-all duration-300 ${i === current ? "bg-luxury-gold w-6" : "bg-muted-foreground/30"}`} aria-label={`Testimonial ${i + 1}`} />)}
          </div>
        </RevealSection>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,12%)] to-[hsl(210,60%,10%)]" />
      <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsla(38,55%,50%,0.08) 0%, transparent 60%)" }} />
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />
      <div className="relative z-10 max-w-[800px] mx-auto px-6 text-center">
        <RevealSection direction="scale">
          <svg viewBox="0 0 48 48" fill="none" stroke="hsl(38,55%,50%)" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-6"><path d="M8 36h32V18l-8 6-8-12-8 12-8-6v18z" strokeLinejoin="round" /><line x1="8" y1="40" x2="40" y2="40" /></svg>
          <h2 className="font-display text-white mb-4">Begin Your Caribbean Journey</h2>
          <p className="font-body text-white/70 text-lg mb-10 leading-relaxed">Whether you're investing, relocating, or building your dream home — we're here to guide every step.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <a href="https://wa.me/12687755221" target="_blank" rel="noopener noreferrer" className="gold-shimmer-hover bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl hover:shadow-lg hover:shadow-luxury-gold/20 transition-all duration-300">WhatsApp Us</a>
            <a href="mailto:lindsayashante@gmail.com" className="bg-white/10 backdrop-blur-sm border border-white/20 text-white font-body font-medium text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-white/15 hover:border-white/30 transition-all duration-300">Email Us</a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">{["Licensed Agent", "CBI Approved", "15+ Years"].map((b) => <span key={b} className="font-body text-xs text-white/40 tracking-wider uppercase">{b}</span>)}</div>
        </RevealSection>
      </div>
    </section>
  );
}
