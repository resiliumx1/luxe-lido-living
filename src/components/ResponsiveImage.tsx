import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResponsiveImageProps {
  basePath: string; // e.g. "containers/estate-home/hero"
  size?: "hero" | "card" | "thumb";
  alt: string;
  className?: string;
  imgClassName?: string;
  loading?: "lazy" | "eager";
}

const sizeSuffixes: Record<string, string> = {
  hero: "",
  card: "-card",
  thumb: "-thumb",
};

export default function ResponsiveImage({
  basePath,
  size = "hero",
  alt,
  className,
  imgClassName,
  loading = "lazy",
}: ResponsiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const suffix = sizeSuffixes[size] ?? "";

  // Images are in public/containers/...
  const webpSrc = `/containers/${basePath}${suffix}.webp`;
  const jpgSrc = `/containers/${basePath}${suffix}.jpg`;

  return (
    <picture className={cn("relative block overflow-hidden", className)}>
      {/* Skeleton blur placeholder */}
      {!loaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
      <source srcSet={webpSrc} type="image/webp" />
      <img
        src={jpgSrc}
        alt={alt}
        loading={loading}
        onLoad={() => setLoaded(true)}
        className={cn(
          "w-full h-full object-cover transition-opacity duration-500",
          loaded ? "opacity-100" : "opacity-0",
          imgClassName
        )}
      />
    </picture>
  );
}
