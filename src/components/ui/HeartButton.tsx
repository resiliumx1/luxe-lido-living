import { Heart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";

interface HeartButtonProps {
  propertyId: string;
  size?: "sm" | "md" | "lg";
}

export function HeartButton({ propertyId, size = "md" }: HeartButtonProps) {
  const { isLiked, toggleWishlist } = useWishlist();
  const liked = isLiked(propertyId);

  const sizes = { sm: 14, md: 18, lg: 22 };
  const btnSizes = { sm: 28, md: 36, lg: 44 };
  const iconSize = sizes[size];
  const btnSize = btnSizes[size];

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        toggleWishlist(propertyId);
      }}
      aria-label={liked ? "Remove from saved properties" : "Save this property"}
      className="transition-all duration-200 flex items-center justify-center border-none cursor-pointer"
      style={{
        width: btnSize,
        height: btnSize,
        borderRadius: "50%",
        background: liked
          ? "hsl(var(--gold))"
          : "rgba(10, 22, 40, 0.55)",
        backdropFilter: "blur(4px)",
        transform: liked ? "scale(1.08)" : "scale(1)",
      }}
    >
      <Heart
        size={iconSize}
        fill={liked ? "hsl(var(--ocean-deep))" : "none"}
        stroke={liked ? "hsl(var(--ocean-deep))" : "#FFFFFF"}
        strokeWidth={2}
      />
    </button>
  );
}
