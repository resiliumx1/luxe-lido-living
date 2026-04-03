import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import RevealSection from "@/components/RevealSection";
import StaggerChildren from "@/components/StaggerChildren";

function GoldCheck() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 shrink-0 mt-0.5">
      <circle cx="10" cy="10" r="8.5" stroke="hsl(var(--luxury-gold))" strokeWidth="1.2" />
      <path d="M6.5 10.5L9 13L14 7.5" stroke="hsl(var(--luxury-gold))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const cbiSteps = [
  { num: "01", title: "Initial Consultation", desc: "We assess your goals, budget, and timeline for Caribbean citizenship." },
  { num: "02", title: "Property Selection", desc: "Browse CBI-approved properties starting from $300,000 USD." },
  { num: "03", title: "Application Filing", desc: "We connect you with licensed CBI agents to file your application." },
  { num: "04", title: "Citizenship Granted", desc: "Receive your Antigua & Barbuda passport within 6 months." },
];

export default function Services() {
  return (
    <div className="overflow-hidden">
      {/* Mini Hero */}
      <section className="relative h-[45vh] min-h-[340px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,14%)] to-[hsl(210,60%,18%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-eyebrow mb-4">What We Offer</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="font-display text-white font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Our Services
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="font-body text-white/60 text-lg mt-3 max-w-lg">
            From property sales to citizenship — end-to-end real estate services in Antigua & Barbuda.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
      </section>

      {/* 1. Property Sales & Acquisitions */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection direction="left">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(207,80%,15%)] to-[hsl(162,50%,25%)] overflow-hidden" />
            </RevealSection>
            <RevealSection direction="right">
              <p className="text-eyebrow mb-3">01</p>
              <h2 className="font-display text-foreground mb-5">Property Sales & Acquisitions</h2>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Whether you're buying your first Caribbean home or selling a luxury estate, we provide expert guidance at every stage of the transaction.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Market analysis and property valuation",
                  "Negotiation and offer management",
                  "Legal and due diligence coordination",
                  "Seamless closing and handover",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/properties" className="gold-shimmer-hover inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20">
                View Properties →
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 2. CBI — THE BIG SECTION */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,12%)] to-[hsl(210,60%,10%)]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, hsla(38,55%,50%,0.06) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/20 to-transparent" />

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
          <RevealSection direction="scale" className="text-center mb-16">
            <motion.div animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="inline-block mb-6">
              <svg viewBox="0 0 48 48" fill="none" stroke="hsl(38,55%,50%)" strokeWidth="1.5" className="w-14 h-14 mx-auto">
                <path d="M8 36h32V18l-8 6-8-12-8 12-8-6v18z" strokeLinejoin="round" />
                <line x1="8" y1="40" x2="40" y2="40" />
              </svg>
            </motion.div>
            <p className="text-eyebrow mb-3">02</p>
            <h2 className="font-display text-white mb-5">Citizenship by Investment</h2>
            <p className="font-body text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              Antigua & Barbuda's Citizenship by Investment programme allows qualified applicants to gain full citizenship through a minimum real estate investment of $300,000 USD. Your passport grants visa-free or visa-on-arrival access to over 150 countries, including the UK, EU Schengen area, and more. The process typically takes around 6 months, and family members — including spouse, children, and dependent parents — can be included in a single application.
            </p>
          </RevealSection>

          {/* Stat Cards */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-20">
            {[
              { number: "$300K", label: "Minimum Investment" },
              { number: "150+", label: "Visa-Free Countries" },
              { number: "6 Months", label: "Processing Time" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center hover:border-luxury-gold/30 transition-all duration-500">
                <p className="font-display text-3xl font-bold text-luxury-gold mb-2">{s.number}</p>
                <p className="font-body text-sm text-white/60 tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </StaggerChildren>

          {/* 4-Step Timeline */}
          <RevealSection className="mb-16">
            <div className="relative">
              {/* Connecting line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-luxury-gold/20 via-luxury-gold/40 to-luxury-gold/20" />
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {cbiSteps.map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.6 }}
                    className="text-center relative"
                  >
                    <div className="w-20 h-20 rounded-full border-2 border-luxury-gold/30 flex items-center justify-center mx-auto mb-5 bg-white/5 backdrop-blur-sm">
                      <span className="font-display text-xl font-bold text-luxury-gold">{step.num}</span>
                    </div>
                    <h4 className="font-display text-lg text-white font-semibold mb-2">{step.title}</h4>
                    <p className="font-body text-sm text-white/50 leading-relaxed">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </RevealSection>

          <div className="text-center">
            <a
              href="https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'm%20interested%20in%20the%20CBI%20programme."
              target="_blank"
              rel="noopener noreferrer"
              className="gold-shimmer-hover inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20"
            >
              Start Your CBI Journey →
            </a>
            <p className="font-body text-white/40 text-xs mt-4 italic">
              A. Lindsay works with licensed CBI agents to facilitate applications.
            </p>
          </div>
        </div>
      </section>

      {/* 3. Container Homes */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection direction="right" className="order-2 lg:order-1">
              <p className="text-eyebrow mb-3">03</p>
              <h2 className="font-display text-foreground mb-5">Container Homes</h2>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Modern, affordable, and hurricane-resilient. Our container home packages start from $88K XCD and can be built in as little as 8 weeks. Choose from studio, 1-bedroom, or 2-bedroom configurations — perfect for rental investment or personal living.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Turnkey packages from $88K XCD",
                  "8-week average build time",
                  "Hurricane-rated construction",
                  "Perfect for Airbnb investment",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/container-homes" className="gold-shimmer-hover inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20">
                Explore Container Homes →
              </Link>
            </RevealSection>
            <RevealSection direction="left" className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(162,50%,25%)] to-[hsl(207,60%,20%)] overflow-hidden" />
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 4. Property Management */}
      <section className="py-24 bg-muted">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection direction="left">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(38,40%,35%)] to-[hsl(207,60%,20%)] overflow-hidden" />
            </RevealSection>
            <RevealSection direction="right">
              <p className="text-eyebrow mb-3">04</p>
              <h2 className="font-display text-foreground mb-5">Property Management</h2>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Own property in Antigua but live abroad? We handle everything — from tenant screening and rental management to routine maintenance and emergency repairs.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Full rental management and marketing",
                  "Tenant screening and lease management",
                  "Routine maintenance and inspections",
                  "Monthly financial reporting",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/contact" className="inline-flex items-center gap-2 border border-luxury-gold/40 text-luxury-gold font-body font-medium text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl hover:bg-luxury-gold/10 hover:border-luxury-gold transition-all duration-300">
                Get In Touch →
              </Link>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* 5. Development Consulting */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection direction="right" className="order-2 lg:order-1">
              <p className="text-eyebrow mb-3">05</p>
              <h2 className="font-display text-foreground mb-5">Development Consulting</h2>
              <p className="font-body text-muted-foreground mb-8 leading-relaxed">
                Planning a development in Antigua? We provide expert consulting on land acquisition, zoning, construction oversight, and project management — from raw land to finished product.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Land acquisition and site analysis",
                  "Zoning and planning consultation",
                  "Construction project oversight",
                  "Investment feasibility studies",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <GoldCheck />
                    <span className="font-body text-sm text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <a
                href="https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'm%20interested%20in%20development%20consulting."
                target="_blank"
                rel="noopener noreferrer"
                className="gold-shimmer-hover inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20"
              >
                WhatsApp Us →
              </a>
            </RevealSection>
            <RevealSection direction="left" className="order-1 lg:order-2">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-[hsl(38,30%,30%)] to-[hsl(162,40%,25%)] overflow-hidden" />
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}
