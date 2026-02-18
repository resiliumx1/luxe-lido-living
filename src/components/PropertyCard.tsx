import { Link } from "react-router-dom";
import { Bed, Bath, MapPin } from "lucide-react";

interface PropertyCardProps {
  image: string;
  location: string;
  name: string;
  price: string;
  beds: number;
  baths: number;
  href: string;
  large?: boolean;
}

export default function PropertyCard({
  image,
  location,
  name,
  price,
  beds,
  baths,
  href,
  large = false,
}: PropertyCardProps) {
  return (
    <Link
      to={href}
      className={`group relative overflow-hidden block ${large ? "row-span-2" : ""}`}
    >
      <div className={`relative overflow-hidden ${large ? "h-full min-h-[500px]" : "h-64 md:h-72"}`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="card-overlay absolute inset-0" />

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-off-white">
          <div className="flex items-center gap-1.5 text-gold mb-1.5">
            <MapPin size={12} />
            <span className="small-caps text-xs tracking-widest font-sans">{location}</span>
          </div>
          <h3 className="font-serif text-xl md:text-2xl font-medium mb-2 leading-tight">{name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-serif text-gold text-lg font-medium">{price}</span>
            <div className="flex items-center gap-3 text-xs font-sans text-off-white/80">
              <span className="flex items-center gap-1">
                <Bed size={12} /> {beds}
              </span>
              <span className="flex items-center gap-1">
                <Bath size={12} /> {baths}
              </span>
            </div>
          </div>
          {/* Hover CTA */}
          <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="gold-line w-8" />
            <span className="small-caps text-xs text-gold tracking-widest font-sans">View Property</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
