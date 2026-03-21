import { X, Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

// Static property data for display in drawer
const allProperties: Record<string, { name: string; price: string; image: string }> = {
  "sunset-ridge": { name: "Sunset Ridge Estate", price: "$3,200,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=60" },
  "cove-container": { name: "The Cove Container Residence", price: "$680,000", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  "courtyard-oasis": { name: "Courtyard Oasis", price: "$1,100,000", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=60" },
  "hillcrest-infinity": { name: "Hillcrest Infinity Villa", price: "$4,800,000", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200&q=60" },
  "azure-cove": { name: "Azure Cove Residence", price: "$2,500,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=200&q=60" },
  "pelican-point": { name: "Pelican Point Villa", price: "$5,500,000", image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=200&q=60" },
  "harbour-heights": { name: "Harbour Heights Manor", price: "$2,800,000", image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=200&q=60" },
  "cliffside-retreat": { name: "The Cliffside Retreat", price: "$6,200,000", image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=200&q=60" },
  "beachfront-container": { name: "Beachfront Container Villa", price: "$780,000", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  "rooftop-retreat": { name: "Rooftop Retreat", price: "$1,100,000", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&q=60" },
  "ocean-loft": { name: "Open-Plan Ocean Loft", price: "$620,000", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&q=60" },
  "jungle-loft": { name: "The Jungle Loft", price: "$520,000", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=60" },
  "sunset-container": { name: "Sunset Container Suite", price: "$890,000", image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&q=60" },
  "palm-grove": { name: "Palm Grove Prefab Villa", price: "$420,000", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&q=60" },
  "caribbean-sunrise": { name: "Caribbean Sunrise Cottage", price: "$295,000", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&q=60" },
  "harbour-view-prefab": { name: "Harbour View Prefab", price: "$510,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=200&q=60" },
  "coral-bay": { name: "Coral Bay Prefab", price: "$380,000", image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=200&q=60" },
  "tradewind-villa": { name: "Tradewind Villa", price: "$640,000", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200&q=60" },
  "skyview-prefab": { name: "Skyview Prefab", price: "$725,000", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=200&q=60" },
};

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistDrawer({ isOpen, onClose }: WishlistDrawerProps) {
  const { wishlist, toggleWishlist, count } = useWishlist();

  const savedProperties = wishlist
    .map((id) => ({ id, ...allProperties[id] }))
    .filter((p) => p.name);

  const enquireAll = () => {
    const names = savedProperties.map((p) => `${p.name} (${p.price})`).join(", ");
    const msg = encodeURIComponent(
      `Hi Ashante, I'm interested in the following properties: ${names}`
    );
    window.open(`https://wa.me/12684000000?text=${msg}`, "_blank");
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/45 transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[61] w-full max-w-[380px] bg-card dark:bg-card shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="font-serif text-xl text-foreground">
            Saved Properties ({count})
          </h3>
          <button
            onClick={onClose}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: "calc(100vh - 180px)" }}>
          {savedProperties.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
              <Heart size={40} className="text-muted-foreground/30" />
              <p className="font-sans text-muted-foreground text-sm">
                No saved properties yet.
                <br />
                Heart a listing to save it here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {savedProperties.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-4 p-3 bg-secondary/50 dark:bg-secondary/30"
                  style={{ borderRadius: "8px" }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-16 object-cover flex-shrink-0"
                    style={{ borderRadius: "6px" }}
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-sans text-sm text-foreground font-medium truncate">
                      {p.name}
                    </p>
                    <p className="font-serif text-gold text-sm">{p.price}</p>
                  </div>
                  <button
                    onClick={() => toggleWishlist(p.id)}
                    className="p-2 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                    aria-label="Remove"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer CTAs */}
        {count > 0 && (
          <div className="p-6 border-t border-border space-y-3">
            <button
              onClick={enquireAll}
              className="w-full bg-primary text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm py-3 transition-colors hover:opacity-90"
            >
              Enquire About All
            </button>
          </div>
        )}
      </div>
    </>
  );
}
