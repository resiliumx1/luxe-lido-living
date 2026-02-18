import heroImg from "@/assets/hero_villa.jpg";
import villaTerraceImg from "@/assets/villa_terrace.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const listings = [
  {
    image: villaTerraceImg,
    location: "English Harbour",
    name: "Sunset Ridge Estate",
    price: "$3,200,000",
    beds: 5,
    baths: 4,
    href: "/luxury-homes",
  },
  {
    image: heroImg,
    location: "Half Moon Bay",
    name: "Hillcrest Infinity Villa",
    price: "$4,800,000",
    beds: 6,
    baths: 5,
    href: "/luxury-homes",
  },
  {
    image: villaTerraceImg,
    location: "Jolly Harbour",
    name: "Azure Cove Residence",
    price: "$2,500,000",
    beds: 4,
    baths: 3,
    href: "/luxury-homes",
  },
  {
    image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
    location: "St. John's",
    name: "Pelican Point Villa",
    price: "$5,500,000",
    beds: 7,
    baths: 6,
    href: "/luxury-homes",
  },
  {
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
    location: "Jolly Harbour",
    name: "Harbour Heights Manor",
    price: "$2,800,000",
    beds: 4,
    baths: 4,
    href: "/luxury-homes",
  },
  {
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&q=80",
    location: "Half Moon Bay",
    name: "The Cliffside Retreat",
    price: "$6,200,000",
    beds: 5,
    baths: 5,
    href: "/luxury-homes",
  },
];

export default function LuxuryHomes() {
  return (
    <div className="bg-off-white dark:bg-background">
      <PageBanner
        image={heroImg}
        title="Luxury Homes"
        subtitle="Antigua's Finest Residences"
      />

      <section className="py-20 bg-off-white dark:bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <SectionLabel text="Exclusive Residences" />
            <p className="font-sans text-ocean-mid dark:text-foreground/70 text-base leading-relaxed">
              From oceanfront villas to private hilltop estates, discover Antigua's most exclusive residential properties. Each home is presented with white-glove service and unmatched local expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map((l, i) => (
              <PropertyCard key={i} {...l} />
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

      <Footer />
    </div>
  );
}
