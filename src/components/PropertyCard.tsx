import { Link } from "react-router-dom";
import { Bed, Bath, Maximize } from "lucide-react";

interface PropertyCardProps {
  image: string;
  location: string;
  name: string;
  price: string;
  beds: number;
  baths: number;
  sqft?: string;
  href: string;
  large?: boolean;
  badge?: "New Listing" | "Featured" | "Under Offer";
}

const badgeColors: Record<string, string> = {
  "New Listing": "bg-gold text-ocean-deep",
  "Featured": "bg-ocean-deep text-off-white",
  "Under Offer": "bg-amber-500 text-white",
};

export default function PropertyCard({
  image,
  location,
  name,
  price,
  beds,
  baths,
  sqft,
  href,
  large = false,
  badge,
}: PropertyCardProps) {
  return (
    <Link
      to={href}
      className={`group block overflow-hidden bg-card dark:bg-card ${large ? "row-span-2" : ""}`}
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}
    >
      {/* Image container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: large ? "4/5" : "16/9" }}>
        <img
          src={image}
          alt={name}
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

        {/* Badge */}
        {badge && (
          <span
            className={`absolute top-4 right-4 ${badgeColors[badge] || "bg-gold text-ocean-deep"} font-sans text-xs font-medium px-3 py-1.5 z-10`}
            style={{ borderRadius: "6px" }}
          >
            {badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="p-6">
        {/* Location */}
        <p className="small-caps text-xs text-gold tracking-widest font-sans mb-1">{location}</p>

        {/* Price */}
        <p className="font-serif text-ocean-deep dark:text-foreground font-medium mb-1" style={{ fontSize: "22px" }}>
          {price}
        </p>

        {/* Name */}
        <h3 className="font-sans text-foreground dark:text-foreground/90 font-medium mb-3" style={{ fontSize: "16px" }}>
          {name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-4 text-muted-foreground" style={{ fontSize: "13px" }}>
          <span className="flex items-center gap-1.5 font-sans">
            <Bed size={14} className="text-gold" /> {beds} Beds
          </span>
          <span className="flex items-center gap-1.5 font-sans">
            <Bath size={14} className="text-gold" /> {baths} Baths
          </span>
          {sqft && (
            <span className="flex items-center gap-1.5 font-sans">
              <Maximize size={14} className="text-gold" /> {sqft}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
