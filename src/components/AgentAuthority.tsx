import { Link } from "react-router-dom";
import ashanteImg from "@/assets/ashante_portrait.jpg";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const facts = [
  { title: "Antigua & Barbuda", sub: "Working island-wide" },
  { title: "Built to order", sub: "Every unit made to spec" },
  { title: "Vetted local trades", sub: "Coordinated and supervised" },
];


export default function AgentAuthority() {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-28 bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photo — left */}
          <div className="reveal">
            <div className="relative">
              <img
                src={ashanteImg}
                alt="Ashante Lindsay — construction and property advisor"
                className="w-full object-cover aspect-[4/5]"
                style={{ borderRadius: "12px" }}
                loading="lazy"
                decoding="async"
              />
              {/* Gold accent border */}
              <div
                className="absolute -bottom-4 -right-4 w-full h-full border border-gold/30 -z-10"
                style={{ borderRadius: "12px" }}
              />
            </div>
          </div>

          {/* Text — right */}
          <div className="reveal reveal-delay-2">
            {/* Eyebrow */}
            <p className="small-caps text-xs text-gold tracking-[0.25em] font-sans mb-4">
              Local Construction &amp; Property Guidance
            </p>

            {/* Name */}
            <h2 className="font-serif text-off-white font-medium mb-2" style={{ fontSize: "clamp(32px, 4vw, 40px)" }}>
              Ashante Lindsay
            </h2>

            {/* Title */}
            <p className="font-sans text-gold font-medium mb-8" style={{ fontSize: "17px" }}>
              Construction Coordinator &amp; Licensed Real Estate Agent
            </p>

            {/* Bio */}
            <div className="space-y-4 mb-10">
              <p className="font-sans text-off-white/80 leading-relaxed" style={{ fontSize: "17px" }}>
                Born and raised in the Caribbean, Ashante understands how homes are built, improved and bought in Antigua — and which local professionals can help get the work done properly.
              </p>
              <p className="font-sans text-off-white/80 leading-relaxed" style={{ fontSize: "17px" }}>
                From a first block-and-concrete home to an insulated panel build, container conversion, renovation or land purchase, she guides local families and overseas buyers with the same care.
              </p>
              <p className="font-sans text-off-white/80 leading-relaxed" style={{ fontSize: "17px" }}>
                You can ask her to manage the full project, or manage it yourself with access to vetted trades, materials and practical on-island support.
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 mb-10 py-8 border-t border-b border-gold/20">
              {stats.map((s) => (
                <div key={s.num} className="text-center">
                  <p className="font-serif text-gold font-medium" style={{ fontSize: "36px", lineHeight: 1 }}>
                    {s.num}
                  </p>
                  <p className="font-sans text-off-white/60 text-xs mt-2 tracking-wide">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border border-gold text-gold font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-all duration-300 hover:bg-gold hover:text-ocean-deep group"
            >
              Discuss Your Project
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
