import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Bed, Bath, Maximize, Car, Waves, Check, ChevronRight, ArrowLeft, Share2 } from "lucide-react";
import { getPropertyById, getSimilarProperties } from "@/data/properties";
import { HeartButton } from "@/components/ui/HeartButton";
import { useWishlist } from "@/contexts/WishlistContext";
import PropertyCard from "@/components/PropertyCard";
import BookingModal from "@/components/BookingModal";
import Footer from "@/components/Footer";
import { toast } from "@/hooks/use-toast";

import ashanteImg from "@/assets/ashante_portrait.jpg";

export default function PropertyDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImg, setActiveImg] = useState(0);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { isLiked } = useWishlist();

  const property = id ? getPropertyById(id) : undefined;

  if (!property) {
    return (
      <main id="main-content" className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl text-foreground mb-4">Property Not Found</h1>
          <p className="font-sans text-muted-foreground mb-8">This listing may have been removed or the link is incorrect.</p>
          <Link to="/luxury-homes" className="bg-primary text-primary-foreground font-sans small-caps tracking-widest text-sm px-8 py-4 transition-colors hover:opacity-90">
            Browse Properties
          </Link>
        </div>
      </main>
    );
  }

  const similar = getSimilarProperties(property.id, 3);
  const liked = isLiked(property.id);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({ title: "Link copied!", description: "Property link copied to clipboard." });
  };

  const whatsappMsg = encodeURIComponent(`Hi Ashante, I'm interested in ${property.name} (${property.price}) in ${property.location}.`);

  const specs = [
    { icon: Bed, value: property.beds, label: "Bedrooms" },
    { icon: Bath, value: property.baths, label: "Bathrooms" },
    ...(property.sqft ? [{ icon: Maximize, value: property.sqft, label: "Area" }] : []),
    ...(property.parking ? [{ icon: Car, value: property.parking, label: "Parking" }] : []),
    ...(property.pool ? [{ icon: Waves, value: "Yes", label: "Pool" }] : []),
  ];

  return (
    <>
      <main id="main-content" className="bg-background pt-24 pb-20">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm font-sans text-muted-foreground mb-8">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link to={property.categoryHref} className="hover:text-primary transition-colors capitalize">
              {property.type === "luxury" ? "Luxury Homes" : property.type === "container" ? "Container Homes" : "Prefab Homes"}
            </Link>
            <ChevronRight size={14} />
            <span className="text-foreground">{property.name}</span>
          </nav>

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-sans text-sm mb-6 transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={16} /> Back
          </button>

          {/* Gallery */}
          <section aria-label="Property gallery" className="mb-10">
            <div className="overflow-hidden mb-3" style={{ borderRadius: "12px" }}>
              <img
                src={property.images[activeImg]}
                alt={`${property.beds}-bedroom ${property.type} home in ${property.area}, Antigua — view ${activeImg + 1}`}
                className="w-full object-cover transition-opacity duration-300"
                style={{ height: "480px" }}
              />
            </div>
            {property.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {property.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`flex-shrink-0 overflow-hidden transition-all duration-200 ${
                      i === activeImg ? "ring-2 ring-primary" : "opacity-60 hover:opacity-100"
                    }`}
                    style={{ borderRadius: "8px", width: "120px", height: "80px" }}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </section>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left — 60% */}
            <div className="lg:col-span-3">
              {/* Title + heart */}
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="small-caps text-xs text-primary tracking-widest font-sans mb-1">{property.location}</p>
                  <h1 className="font-serif text-3xl md:text-4xl text-foreground">{property.name}</h1>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <HeartButton propertyId={property.id} size="md" />
                  <span className="font-sans text-sm" style={{ color: liked ? "hsl(var(--gold))" : "hsl(var(--muted-foreground))" }}>
                    {liked ? "Saved" : "Save"}
                  </span>
                </div>
              </div>

              {/* Badge */}
              {property.badge && (
                <span className="inline-block bg-primary/10 text-primary font-sans text-xs font-medium px-3 py-1 mb-6" style={{ borderRadius: "6px" }}>
                  {property.badge}
                </span>
              )}

              {/* Specs row */}
              <div className="flex flex-wrap gap-3 my-8">
                {specs.map((s) => (
                  <div
                    key={s.label}
                    className="flex items-center gap-2 bg-secondary text-foreground px-4 py-2 font-sans text-sm"
                    style={{ borderRadius: "8px" }}
                  >
                    <s.icon size={16} className="text-primary" />
                    <span className="font-medium">{s.value}</span>
                    <span className="text-muted-foreground text-xs">{s.label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <section aria-label="Property description" className="mb-10">
                <h2 className="font-serif text-2xl text-foreground mb-4">About This Property</h2>
                <p className="font-sans text-muted-foreground leading-relaxed">{property.description}</p>
              </section>

              {/* Features */}
              <section aria-label="Property features" className="mb-10">
                <h2 className="font-serif text-2xl text-foreground mb-4">Features</h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {property.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 font-sans text-sm text-muted-foreground">
                      <Check size={16} className="text-primary flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Neighbourhood */}
              <section aria-label="Neighbourhood" className="mb-10 p-6 bg-secondary" style={{ borderRadius: "12px" }}>
                <h2 className="font-serif text-xl text-foreground mb-2">{property.area}, Antigua</h2>
                <p className="font-sans text-sm text-muted-foreground leading-relaxed">
                  {property.area} is one of Antigua's most sought-after addresses, offering a unique blend of Caribbean charm, world-class amenities, and natural beauty. Properties in this area consistently attract international buyers and investors.
                </p>
              </section>
            </div>

            {/* Right — sticky inquiry card */}
            <div className="lg:col-span-2">
              <div className="lg:sticky lg:top-28 bg-card border border-border p-8 space-y-6" style={{ borderRadius: "16px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
                {/* Price */}
                <p className="font-serif text-3xl text-primary font-medium">{property.price}</p>
                <div className="w-full h-px bg-border" />

                {/* CTAs */}
                <button
                  onClick={() => setBookingOpen(true)}
                  className="cta-shimmer w-full bg-primary text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm py-4 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Book a Viewing
                </button>

                <a
                  href={`https://wa.me/12684000000?text=${whatsappMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 border border-[#25D366] text-[#25D366] font-sans font-medium small-caps tracking-widest text-sm py-4 transition-all duration-300 hover:bg-[#25D366] hover:text-white"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.41A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.104-1.136l-.29-.173-3.03.866.81-2.957-.186-.3A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                  </svg>
                  WhatsApp Ashante
                </a>

                <button
                  onClick={handleShare}
                  className="w-full inline-flex items-center justify-center gap-2 border border-border text-muted-foreground font-sans text-sm py-3 transition-all duration-300 hover:text-foreground hover:border-foreground"
                  aria-label="Share property link"
                >
                  <Share2 size={14} /> Share Property
                </button>

                <div className="w-full h-px bg-border" />

                {/* Agent mini card */}
                <div className="flex items-center gap-4">
                  <img
                    src={ashanteImg}
                    alt="Ashante Lindsay, Luxury Property Specialist, Antigua"
                    className="w-14 h-14 object-cover flex-shrink-0"
                    style={{ borderRadius: "50%" }}
                    loading="lazy"
                  />
                  <div>
                    <p className="font-serif text-foreground font-medium">Ashante Lindsay</p>
                    <p className="font-sans text-xs text-muted-foreground">Luxury Property Specialist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Similar Properties */}
          {similar.length > 0 && (
            <section aria-label="Similar properties" className="mt-20">
              <h2 className="font-serif text-3xl text-foreground mb-8">Similar Properties</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {similar.map((p) => (
                  <PropertyCard
                    key={p.id}
                    id={p.id}
                    image={p.images[0]}
                    location={p.location}
                    name={p.name}
                    price={p.price}
                    beds={p.beds}
                    baths={p.baths}
                    sqft={p.sqft}
                    href={`/properties/${p.id}`}
                    badge={p.badge}
                  />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      <Footer />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} propertyName={property.name} />
    </>
  );
}
