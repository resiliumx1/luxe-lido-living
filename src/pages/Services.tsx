import heroImg from "@/assets/hero_villa.jpg";
import PageBanner from "@/components/PageBanner";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const services = [
  {
    num: "01",
    name: "Property Acquisition",
    desc: "Expert guidance for buyers navigating Antigua's competitive luxury real estate market with confidence.",
    details: "Whether you're seeking a beachfront villa, a hillside estate, or a smart investment property, we provide end-to-end acquisition support. From market analysis and property shortlisting to negotiation and closing, Ashante ensures every step is handled with precision and discretion.",
  },
  {
    num: "02",
    name: "Luxury Home Sales",
    desc: "Bespoke marketing strategies to present your property to the world's most discerning buyers.",
    details: "We craft tailored marketing campaigns featuring professional photography, drone videography, virtual tours, and targeted digital advertising. Your property is presented to qualified international buyers through our global network and premium listing platforms.",
  },
  {
    num: "03",
    name: "Investment Consulting",
    desc: "Data-driven insights and local market expertise to maximise your Caribbean property investment returns.",
    details: "Our consulting services cover rental yield analysis, capital appreciation forecasts, tax planning considerations, and portfolio diversification strategies specific to the Antigua & Barbuda market. We help you make informed decisions backed by real data.",
  },
  {
    num: "04",
    name: "Relocation Services",
    desc: "Full-service support for international clients making Antigua their permanent or seasonal home.",
    details: "Moving to the Caribbean is a life-changing decision. We assist with everything beyond the property itself — school placements, healthcare orientation, banking introductions, utilities setup, and connecting you with the local expatriate community.",
  },
  {
    num: "05",
    name: "Citizenship by Investment",
    desc: "Structured guidance through Antigua's CBI programme, unlocking Caribbean citizenship through real estate.",
    details: "Antigua & Barbuda's Citizenship by Investment Programme offers one of the most attractive pathways to Caribbean citizenship. We guide you through eligible property selection, application preparation, government liaison, and post-approval support for a seamless experience.",
  },
  {
    num: "06",
    name: "Property Management",
    desc: "End-to-end management of your investment property, from rental income to ongoing maintenance.",
    details: "For owners who want hands-off income, our property management service covers guest booking management, housekeeping coordination, maintenance scheduling, financial reporting, and emergency response — ensuring your asset is protected and profitable year-round.",
  },
];

export default function Services() {
  const sectionRef = useScrollReveal();

  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Services"
        subtitle="How We Serve You"
      />

      <main id="main-content">
        {/* Services Grid */}
        <section className="py-28 bg-off-white dark:bg-background" ref={sectionRef}>
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-16 reveal">
              <SectionLabel text="What We Offer" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                From your first enquiry to long after you've settled in, A. Lindsay Luxe Estates provides
                comprehensive real estate services tailored to the unique needs of the Antigua & Barbuda market.
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
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-ocean-deep py-16 border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">
              Ready to get started? Let's discuss your needs.
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
