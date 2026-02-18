import containerExteriorImg from "@/assets/container_exterior.jpg";
import containerInteriorImg from "@/assets/container_interior.jpg";
import containerBeachfrontImg from "@/assets/container_beachfront.jpg";
import containerRooftopImg from "@/assets/container_rooftop.jpg";
import containerCourtyardImg from "@/assets/container_courtyard.jpg";
import containerCafeImg from "@/assets/container_cafe.jpg";
import containerRetailImg from "@/assets/container_retail.jpg";
import PageBanner from "@/components/PageBanner";
import PropertyCard from "@/components/PropertyCard";
import SectionLabel from "@/components/SectionLabel";
import Footer from "@/components/Footer";

const residences = [
  { image: containerBeachfrontImg, location: "Jolly Harbour", name: "Beachfront Container Villa", price: "$780,000", beds: 3, baths: 2, href: "/container-homes" },
  { image: containerRooftopImg, location: "English Harbour", name: "Rooftop Retreat", price: "$1,100,000", beds: 4, baths: 3, href: "/container-homes" },
  { image: containerCourtyardImg, location: "Half Moon Bay", name: "Courtyard Oasis", price: "$950,000", beds: 4, baths: 3, href: "/container-homes" },
  { image: containerInteriorImg, location: "St. John's", name: "Open-Plan Ocean Loft", price: "$620,000", beds: 2, baths: 2, href: "/container-homes" },
];

const steps = [
  { num: "01", title: "Dream", desc: "Tell us your vision for the perfect container home or space." },
  { num: "02", title: "Submit the Form", desc: "Fill out our simple enquiry form with your requirements." },
  { num: "03", title: "We Review Your Needs", desc: "Ashante and her team assess the perfect solution for you." },
  { num: "04", title: "We Guide You", desc: "From design to delivery, we handle every step with care." },
];

export default function ContainerHomes() {
  return (
    <div className="bg-off-white">
      <PageBanner
        image={containerExteriorImg}
        title="Container Homes"
        subtitle="Modern. Sustainable. Caribbean."
      />

      {/* Intro */}
      <section className="py-20 bg-off-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-16">
            <SectionLabel text="Container Residences" />
            <p className="font-sans text-ocean-mid text-base leading-relaxed">
              Repurposed shipping containers transformed into stunning Caribbean homes — custom-built, sustainably constructed, and delivered directly to your chosen location across Antigua & Barbuda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residences.map((r, i) => (
              <PropertyCard key={i} {...r} />
            ))}
          </div>
        </div>
      </section>

      {/* Feature banner */}
      <div className="relative h-[50vh] min-h-[360px] flex items-center justify-center overflow-hidden">
        <img src={containerCourtyardImg} alt="Container Living" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ocean-deep/65" />
        <div className="relative text-center px-6">
          <h2 className="font-serif text-4xl md:text-6xl text-off-white mb-6">Container Living Reimagined</h2>
          <a
            href="/contact"
            className="bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-colors duration-300"
          >
            Start Your Journey
          </a>
        </div>
      </div>

      {/* Container Businesses */}
      <section id="container-businesses" className="py-24 bg-sand-light">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionLabel text="Commercial Solutions" />
          <h2 className="font-serif text-4xl md:text-5xl text-ocean-deep mb-4">Container Businesses</h2>
          <p className="font-sans text-ocean-mid text-base leading-relaxed max-w-2xl mb-12">
            From mobile F&amp;B kiosks to boutique retail pop-ups and stylish office units — container businesses offer a fast, affordable, and unforgettable way to launch your venture in Antigua.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <img src={containerCafeImg} alt="Container café" className="w-full h-72 object-cover" />
            <img src={containerRetailImg} alt="Container retail" className="w-full h-72 object-cover" />
          </div>
          <a
            href="/contact"
            className="inline-block border border-ocean-deep text-ocean-deep hover:bg-ocean-deep hover:text-off-white font-sans font-medium small-caps tracking-widest text-sm px-8 py-4 transition-all duration-300"
          >
            Enquire About a Container Business
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 bg-off-white">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <SectionLabel text="The Process" />
          <h2 className="font-serif text-4xl text-ocean-deep mb-14">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s) => (
              <div key={s.num} className="border-t-2 border-gold pt-6">
                <p className="font-serif text-4xl text-ocean-deep/20 font-light mb-2">{s.num}</p>
                <h3 className="font-serif text-xl text-ocean-deep mb-2">{s.title}</h3>
                <p className="font-sans text-sm text-ocean-mid/70 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
