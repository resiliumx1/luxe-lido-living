import { ArrowRight, Hammer, Building2, Sparkles, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionLabel from "@/components/SectionLabel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const highlights = [
  { icon: Home, label: "Residential & Commercial", desc: "Private homes, rentals, retail, offices" },
  { icon: Hammer, label: "Concrete & Wood Builds", desc: "Traditional Caribbean construction" },
  { icon: Building2, label: "From ~US$400 / sq ft", desc: "Transparent, attainable pricing" },
  { icon: Sparkles, label: "Move-In Ready", desc: "Delivered fully equipped & furnished" },
];

const tracks = [
  {
    tag: "Self-Service",
    title: "Buyer-Managed Build",
    desc:
      "You hold the reins. We help you secure land, vet architects and contractors, and stay close as an advisor — while you direct the build at your pace and budget.",
    points: ["Independent contractor selection", "Advisory & oversight on request", "Maximum cost control"],
  },
  {
    tag: "Done-For-You",
    title: "Full-Service Delivery",
    desc:
      "Hand it to us. From land sourcing and design through permitting, construction, and furnishing — we manage every stakeholder and hand you the keys to a finished home.",
    points: ["End-to-end project management", "Premade plans or custom design", "Turnkey, fully furnished handover"],
  },
];

export default function BuildYourHome() {
  const sectionRef = useScrollReveal();
  const navigate = useNavigate();

  return (
    <section className="py-28 bg-sand-light dark:bg-sand-light relative overflow-hidden" ref={sectionRef}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="max-w-3xl mb-14 reveal">
          <SectionLabel text="Build Your Home" />
          <h2 className="text-h2 text-ocean-deep dark:text-foreground mb-5">
            Owning a home in Antigua is more attainable than you think.
          </h2>
          <p className="font-sans text-ocean-mid dark:text-foreground/70 text-body leading-relaxed">
            Alongside our curated resale collection, we build ground-up — residential and commercial,
            in concrete and wood. From approximately US$400 per square foot, delivered move-in ready
            and, if you wish, fully furnished.
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-sand mb-14 reveal reveal-delay-2">
          {highlights.map((h) => (
            <div key={h.label} className="bg-sand-light p-6">
              <h.icon size={20} className="text-gold mb-3" />
              <p className="font-serif text-lg text-ocean-deep mb-1">{h.label}</p>
              <p className="font-sans text-sm text-ocean-mid/70 leading-relaxed">{h.desc}</p>
            </div>
          ))}
        </div>

        {/* Two delivery tracks */}
        <div className="mb-10 reveal reveal-delay-3">
          <p className="small-caps text-xs text-gold tracking-[0.25em] font-sans mb-3">Two Ways to Build</p>
          <h3 className="font-serif text-2xl md:text-3xl text-ocean-deep dark:text-foreground">
            Choose your level of involvement.
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14 reveal reveal-delay-4">
          {tracks.map((t) => (
            <div
              key={t.tag}
              className="group bg-off-white dark:bg-card border border-sand dark:border-gold/15 p-8 md:p-10 transition-colors duration-300 hover:border-gold"
            >
              <span className="small-caps text-xs text-gold tracking-[0.25em] font-sans">{t.tag}</span>
              <h4 className="font-serif text-2xl text-ocean-deep dark:text-foreground mt-3 mb-4">
                {t.title}
              </h4>
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed mb-6">
                {t.desc}
              </p>
              <ul className="space-y-2">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 font-sans text-sm text-ocean-mid dark:text-foreground/80">
                    <span className="mt-2 inline-block h-px w-4 bg-gold flex-shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center reveal">
          <button
            onClick={() => navigate("/contact?interest=build")}
            className="cta-shimmer inline-flex items-center gap-2 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 group"
          >
            Start Your Build Conversation
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}
