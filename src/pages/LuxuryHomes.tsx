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
];

export default function LuxuryHomes() {
  return (
    <div className="bg-off-white">
      <PageBanner
        image={heroImg}
        title="Luxury Homes"
        subtitle="Antigua's Finest Residences"
      />

      <section className="py-20 bg-off-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <SectionLabel text="Exclusive Residences" />
            <p className="font-sans text-ocean-mid text-base leading-relaxed">
              From oceanfront villas to private hilltop estates, discover Antigua's most exclusive residential properties. Each home is presented with white-glove service and unmatched local expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            className="flex-shrink-0 bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300"
          >
            Enquire
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
