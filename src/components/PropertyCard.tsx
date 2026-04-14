import { Link } from "react-router-dom";
import { Bed, Bath, Maximize } from "lucide-react";
import { HeartButton } from "@/components/ui/HeartButton";
import { useCurrency } from "@/contexts/CurrencyContext";

interface PropertyCardProps {
  image: string;
  location: string;
  name: string;
  priceUSD: number;
  beds: number;
  baths: number;
  sqft?: string;
  href: string;
  large?: boolean;
  badge?: "New Listing" | "Featured" | "Under Offer";
  id?: string;
}

const badgeColors: Record<string, string> = {
  "New Listing": "bg-primary text-primary-foreground",
  "Featured": "bg-ocean-deep text-off-white",
  "Under Offer": "bg-amber-500 text-white",
};

function nameToId(name: string) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function PropertyCard({
  image,
  location,
  name,
  priceUSD,
  beds,
  baths,
  sqft,
  href,
  large = false,
  badge,
  id,
}: PropertyCardProps) {
  const propertyId = id || nameToId(name);
  const { formatPrice } = useCurrency();
  const detailHref = `/properties/${propertyId}`;
  const displayPrice = formatPrice(priceUSD);

  return (
    <Link
      to={detailHref}
      className={`group block overflow-hidden bg-card dark:bg-card ${large ? "row-span-2" : ""}`}
      style={{ borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
      aria-label={`View ${name} — ${beds} bedroom ${location} property, ${displayPrice}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ aspectRatio: large ? "4/5" : "16/9" }}>
        <img
          src={image}
          alt={`${beds}-bedroom property in ${location}, Antigua`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/60 transition-all duration-500 flex items-center justify-center">
          <span className="text-gold font-sans font-medium text-sm tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center gap-2">
            View Property <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </span>
        </div>

        {/* Heart */}
        <div className="absolute top-3 right-3 z-[2]">
          <HeartButton propertyId={propertyId} size="sm" />
        </div>

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-4 left-4 ${badgeColors[badge] || "bg-primary text-primary-foreground"} font-sans text-xs font-medium px-3 py-1.5 z-10`}
            style={{ borderRadius: "6px" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        <p className="small-caps text-xs text-primary tracking-widest font-sans mb-1">{location}</p>
        <p className="font-serif text-foreground font-medium mb-1" style={{ fontSize: "22px" }}>{displayPrice}</p>
        <h3 className="font-sans text-foreground/90 font-medium mb-3" style={{ fontSize: "16px" }}>{name}</h3>
        <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: "13px" }}>
          <span className="flex items-center gap-1.5 font-sans"><Bed size={14} className="text-primary" /> {beds} Beds</span>
          <span className="flex items-center gap-1.5 font-sans"><Bath size={14} className="text-primary" /> {baths} Baths</span>
          {sqft && <span className="flex items-center gap-1.5 font-sans"><Maximize size={14} className="text-primary" /> {sqft}</span>}
        </div>
      </div>
    </Link>
  );
}
