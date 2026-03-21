import containerExteriorImg from "@/assets/container_exterior.jpg";
import containerCafeImg from "@/assets/container_cafe.jpg";
import containerRetailImg from "@/assets/container_retail.jpg";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { getPropertiesByType } from "@/data/properties";

const residences = getPropertiesByType("container");

const steps = [
  { num: "01", title: "Dream", desc: "Tell us your vision for the perfect container home or space." },
  { num: "02", title: "Submit the Form", desc: "Fill out our simple enquiry form with your requirements." },
  { num: "03", title: "We Review Your Needs", desc: "Ashante and her team assess the perfect solution for you." },
  { num: "04", title: "We Guide You", desc: "From design to delivery, we handle every step with care." },
];

export default function ContainerHomes() {
  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={containerExteriorImg}
        title="Container Homes"
        subtitle="Modern. Sustainable. Caribbean."
      />

      <main id="main-content">
        {/* Intro */}
        <section aria-label="Container home listings" className="py-20 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-16">
              <SectionLabel text="Container Residences" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                Repurposed shipping containers transformed into stunning Caribbean homes — custom-built, sustainably constructed, and delivered directly to your chosen location across Antigua &amp; Barbuda.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {residences.map((r) => (
                <PropertyCard
                  key={r.id}
                  id={r.id}
                  image={r.images[0]}
                  location={r.location}
                  name={r.name}
                  price={r.price}
                  beds={r.beds}
                  baths={r.baths}
                  sqft={r.sqft}
                  href={`/properties/${r.id}`}
                  badge={r.badge}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Feature banner */}
        <div className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
          <img src={containerCourtyardImg} alt="Luxury container home with courtyard pool in Antigua" className="absolute inset-0 w-full h-full object-cover" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-ocean-deep/65" />
          <div className="relative text-center px-6">
            <h2 className="font-serif text-4xl md:text-6xl text-off-white mb-6">Container Living Reimagined</h2>
            <a
              href="/contact"
              className="cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 inline-flex items-center gap-2 group"
            >
              Start Your Journey <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Container Businesses */}
        <section id="container-businesses" aria-label="Container business solutions" className="py-24 bg-sand-light dark:bg-sand-light">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <SectionLabel text="Commercial Solutions" />
            <h2 className="font-serif text-4xl md:text-5xl text-ocean-deep dark:text-foreground mb-4">Container Businesses</h2>
            <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed max-w-2xl mb-12">
              From mobile F&amp;B kiosks to boutique retail pop-ups and stylish office units — container businesses offer a fast, affordable, and unforgettable way to launch your venture in Antigua.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <img src={containerCafeImg} alt="Container café and bar in Antigua" className="w-full h-72 object-cover" loading="lazy" decoding="async" />
              <img src={containerRetailImg} alt="Container boutique retail shop in Antigua" className="w-full h-72 object-cover" loading="lazy" decoding="async" />
            </div>
            <a
              href="/contact"
              className="cta-fill-sweep inline-block border border-ocean-deep dark:border-gold text-ocean-deep dark:text-gold hover:bg-ocean-deep dark:hover:bg-gold hover:text-off-white dark:hover:text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-all duration-300"
            >
              Enquire About a Container Business
            </a>
          </div>
        </section>

        {/* How it works */}
        <section aria-label="How container homes work" className="py-24 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <SectionLabel text="The Process" />
            <h2 className="font-serif text-4xl text-ocean-deep dark:text-foreground mb-14">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s) => (
                <div key={s.num} className="border-t-2 border-gold pt-6">
                  <p className="font-serif text-4xl text-ocean-deep/20 dark:text-foreground/10 font-light mb-2">{s.num}</p>
                  <h3 className="font-serif text-xl text-ocean-deep dark:text-foreground mb-2">{s.title}</h3>
                  <p className="font-sans text-sm text-ocean-mid/70 dark:text-foreground/50 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
