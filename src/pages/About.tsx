import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import RevealSection from "@/components/RevealSection";
import StaggerChildren from "@/components/StaggerChildren";

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { target: 15, suffix: "+", label: "Years Experience" },
  { target: 50, suffix: "+", label: "Properties Sold" },
  { target: 365, suffix: "", label: "Beaches" },
  { target: 30, suffix: "M+", prefix: "$", label: "Sales Volume" },
];

const values = [
  {
    title: "Integrity",
    desc: "We believe in transparency, honesty, and doing right by every client. Your trust is our foundation.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <path d="M24 4L6 14v10c0 11 8 20 18 22 10-2 18-11 18-22V14L24 4z" strokeLinejoin="round" />
        <path d="M16 24l5 5 11-11" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    desc: "From container homes to modern marketing — we embrace new ideas that deliver better outcomes.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="24" cy="20" r="10" />
        <path d="M18 30v6a2 2 0 002 2h8a2 2 0 002-2v-6" />
        <line x1="24" y1="42" x2="24" y2="38" />
        <path d="M20 42h8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Community",
    desc: "We're deeply rooted in Antigua. Every transaction strengthens our island and the people who call it home.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
        <circle cx="24" cy="14" r="6" />
        <circle cx="10" cy="20" r="5" />
        <circle cx="38" cy="20" r="5" />
        <path d="M16 32c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        <path d="M4 36c0-3.3 2.7-6 6-6h2" />
        <path d="M44 36c0-3.3-2.7-6-6-6h-2" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[380px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,14%)] to-[hsl(210,60%,18%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-eyebrow mb-4">Our Story</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="font-display text-white font-bold mb-3" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            About A. Lindsay Luxe Estates
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="font-body text-white/60 text-lg max-w-lg">
            Antigua-born expertise. World-class service.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
      </section>

      {/* Founder Section */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <RevealSection direction="left">
              <div className="relative">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-[hsl(38,30%,40%)] to-[hsl(207,60%,20%)] overflow-hidden" />
                <div className="absolute top-6 left-6 w-full h-full border border-luxury-gold/20 rounded-2xl -z-10" />
              </div>
            </RevealSection>
            <RevealSection direction="right">
              <p className="text-eyebrow mb-3">The Founder</p>
              <h2 className="font-display text-foreground mb-6">Ashante Lindsay</h2>
              <div className="space-y-4 font-body text-muted-foreground leading-relaxed">
                <p>
                  Born and raised on the emerald shores of Antigua, Ashante Lindsay has spent over 15 years immersed in Caribbean real estate. What began as a passion for connecting people with their dream homes has grown into one of the island's most respected luxury property agencies.
                </p>
                <p>
                  Ashante's deep knowledge of the Antiguan market — from English Harbour's waterfront villas to the emerging container home movement — gives her clients an advantage that outsiders simply can't replicate. She understands the nuances of local regulations, the Citizenship by Investment programme, and the unique lifestyle that draws international buyers to these shores.
                </p>
                <p>
                  A pioneer in container home development across the Caribbean, Ashante recognised early that modern construction methods could deliver affordable luxury without compromising quality or resilience. Today, her container home packages are among the most sought-after on the island.
                </p>
                <p className="italic text-luxury-gold">
                  "I don't just sell properties — I help people find their place in the Caribbean. That's what drives me every day."
                </p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 text-center">
          <RevealSection>
            <p className="text-eyebrow mb-3">What We Stand For</p>
            <h2 className="font-display text-foreground mb-12">Our Values</h2>
          </RevealSection>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="bg-card border border-border rounded-2xl p-8 text-center hover:border-luxury-gold/30 hover:-translate-y-1 transition-all duration-500 luxury-border-glow">
                <div className="text-muted-foreground mb-5 flex justify-center">{v.icon}</div>
                <h3 className="font-display text-xl text-foreground mb-3">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Stats */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,12%)] to-[hsl(210,60%,10%)]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/20 to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s, i) => (
              <RevealSection key={s.label} delay={i * 0.1}>
                <div>
                  <p className="font-display text-5xl font-bold text-luxury-gold mb-2">
                    <AnimatedCounter target={s.target} suffix={s.suffix} prefix={s.prefix || ""} />
                  </p>
                  <p className="font-body text-sm text-white/60 tracking-wider uppercase">{s.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-[800px] mx-auto px-6 md:px-10 text-center">
          <RevealSection direction="scale">
            <div className="h-px w-16 bg-luxury-gold mx-auto mb-10" />
            <h2 className="font-display text-foreground mb-5">Work With Us</h2>
            <p className="font-body text-muted-foreground mb-10 leading-relaxed">
              Whether you're buying, selling, investing, or building — we're ready to help you make your Caribbean vision a reality.
            </p>
            <Link to="/contact" className="gold-shimmer-hover inline-flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20">
              Get In Touch →
            </Link>
            <div className="h-px w-16 bg-luxury-gold mx-auto mt-10" />
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
