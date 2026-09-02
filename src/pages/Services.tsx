import heroImg from "@/assets/hero_villa.jpg";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Link } from "react-router-dom";

const services = [
  {
    num: "01",
    name: "Managed Construction",
    interest: "managed-construction",
    desc: "Ashante runs the project on your behalf — hiring and coordinating contractors and trades, sourcing and pricing materials, scheduling the work, supervising the site and keeping you updated.",
    details: "Clients who are overseas, or who simply do not want to run a build themselves, hand the whole project over. Ashante appoints and coordinates the trades, prices and orders materials, sequences the work, supervises site progress and reports back to you. This is available whether or not she supplied the original design, and it applies to traditional block, container and insulated panel builds alike.",
  },
  {
    num: "02",
    name: "Custom Builds",
    interest: "custom-builds",
    desc: "A home built to your own design rather than a standard model — layout, finishes and specification are your call.",
    details: "Bring your own drawings, or Ashante will arrange the architectural drawings and design for you. The finished design is then built in traditional block, container or insulated panel construction, whichever suits your plot, timeline and budget.",
  },
  {
    num: "03",
    name: "Traditional Construction",
    interest: "traditional-construction",
    desc: "Conventional block and concrete homes built for everyday life in Antigua & Barbuda.",
    details: "From a first home or family extension to a complete new residence, we coordinate drawings, materials, skilled trades and construction around your site, budget and priorities. You receive clear guidance from early planning through handover.",
  },
  {
    num: "04",
    name: "Container Builds",
    interest: "container-builds",
    desc: "Shipping containers converted into practical homes, offices, shops and commercial units.",
    details: "We help you select the right container, define the layout and coordinate the conversion for your intended use. Each project can include insulation, windows, doors, utilities, finishes and equipment suited to the Caribbean climate.",
  },
  {
    num: "05",
    name: "Insulated Panel Builds",
    interest: "insulated-panel-builds",
    desc: "Our recommended building method for better thermal performance, faster erection and lower cost than concrete block.",
    details: "Through our manufacturing partner, we supply and build with foam-core insulated panels engineered for efficient construction in the Caribbean. The system reduces heat transfer, shortens time on site and gives homeowners a cost-conscious alternative without compromising a strong, comfortable finish.",
  },
  {
    num: "06",
    name: "Renovations & Trades",
    interest: "renovations-trades",
    desc: "Reliable help for tiling, painting, plumbing, electrical work, roofing, drawings and design.",
    details: "Ashante brings together vetted tradesmen and manages the work, whether you are refreshing one room, repainting a property, replacing a roof or carrying out a larger renovation. Architectural drawings and design support can be included where needed.",
  },
  {
    num: "07",
    name: "Property Sales & Land",
    interest: "property-sales-land",
    desc: "Houses and land for sale, with the details buyers need to explore their options online.",
    details: "Browse homes and plots on the site before making an enquiry. Ashante can arrange viewings, answer questions about the property or area, and help buyers understand the practical next steps toward purchasing and building.",
  },
  {
    num: "08",
    name: "Relocation Services",
    interest: "relocation",
    desc: "On-the-ground support for overseas buyers looking for land, a home or a place to build.",
    details: "We help you understand locations, view suitable land and property, connect with trusted local professionals and plan the practical steps of moving to Antigua & Barbuda. You have a local point of contact before, during and after your purchase.",
  },
];

const workStyles = [
  {
    title: "Done For You",
    desc: "You appoint Ashante to carry the project. She holds the schedule, the trades and the material orders, and reports progress to you until handover.",
  },
  {
    title: "Buyer Managed",
    desc: "You keep control of the build and the decisions on site, while Ashante supplies the trades, materials and pricing you ask for.",
  },
];

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Services"
        subtitle="Construction, renovation, land and property support"
      />

      <main id="main-content">
        {/* Services Grid */}
        <section className="py-28 bg-off-white dark:bg-background" ref={sectionRef}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-16 reveal">
              <SectionLabel text="What We Offer" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                Whether you are building a home, improving the one you have, buying land or relocating,
                Ashante brings the right people and practical local support together to move the work forward.
              </p>
            </div>

            <div className="space-y-0 reveal reveal-delay-2">
              {services.map((s, i) => (
                <div
                  key={s.num}
                  className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 py-12 ${
                    i < services.length - 1 ? "border-b border-sand dark:border-gold/10" : ""
                  }`}
                >
                  {/* Number */}
                  <div className="md:col-span-1">
                    <p className="font-serif text-5xl text-ocean-deep/10 dark:text-off-white/10 font-light group-hover:text-gold/20 transition-colors duration-300">
                      {s.num}
                    </p>
                  </div>

                  {/* Title + short desc */}
                  <div className="md:col-span-4">
                    <h2 className="font-serif text-2xl text-ocean-deep dark:text-foreground mb-2">{s.name}</h2>
                    <p className="font-sans text-sm text-ocean-mid/70 dark:text-foreground/50 leading-relaxed">{s.desc}</p>
                  </div>

                  {/* Long description */}
                  <div className="md:col-span-7">
                    <p className="font-sans text-base text-ocean-mid dark:text-foreground/70 leading-relaxed">{s.details}</p>
                    <Link
                      to={`/contact?interest=${s.interest}`}
                      className="inline-flex items-center gap-2 mt-5 font-sans text-sm text-gold hover:text-gold-soft transition-colors"
                    >
                      Enquire about this service <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-sand-light dark:bg-sand-light">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <SectionLabel text="Two Ways to Work" />
            <h2 className="text-h2 text-ocean-deep dark:text-foreground mb-4">How the work is contracted.</h2>
            <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed max-w-2xl mb-10">
              Separate from the service itself, this is the commercial arrangement — who holds responsibility for running the build day to day.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {workStyles.map((style) => (
                <div key={style.title} className="bg-off-white dark:bg-card border border-sand dark:border-gold/15 p-8 md:p-10">
                  <h3 className="font-serif text-2xl text-ocean-deep dark:text-foreground mb-4">{style.title}</h3>
                  <p className="font-sans text-ocean-mid dark:text-foreground/70 leading-relaxed">{style.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-ocean-deep py-16 border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">
              Planning a build, renovation or property purchase? Let's discuss what you need.
            </p>
            <a
              href="/contact"
              className="cta-shimmer flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 flex items-center gap-2 group"
            >
              Get in touch <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <ContactForm />
      </main>
    </div>
  );
}
