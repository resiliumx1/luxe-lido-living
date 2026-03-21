import heroImg from "@/assets/hero_villa.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";
import { getPropertiesByType } from "@/data/properties";

const listings = getPropertiesByType("luxury");

export default function LuxuryHomes() {
  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Luxury Homes"
        subtitle="Antigua's Finest Residences"
      />

      <main id="main-content">
        <section aria-label="Luxury property listings" className="py-20 bg-off-white dark:bg-background">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10">
            <div className="max-w-2xl mb-16">
              <SectionLabel text="Exclusive Residences" />
              <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
                From oceanfront villas to private hilltop estates, discover Antigua's most exclusive residential properties. Each home is presented with white-glove service and unmatched local expertise.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {listings.map((l) => (
                <PropertyCard
                  key={l.id}
                  id={l.id}
                  image={l.images[0]}
                  location={l.location}
                  name={l.name}
                  price={l.price}
                  beds={l.beds}
                  baths={l.baths}
                  sqft={l.sqft}
                  href={`/properties/${l.id}`}
                  badge={l.badge}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <div className="bg-ocean-deep py-16 border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="font-serif italic text-off-white text-xl md:text-2xl">
              Looking for something specific? Let Ashante find it for you.
            </p>
            <a
              href="/contact"
              className="cta-shimmer flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300 flex items-center gap-2 group"
            >
              Enquire <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
