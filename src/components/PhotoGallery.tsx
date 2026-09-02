import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryPhoto {
  src: string;
  alt: string;
  caption?: string;
}

interface PhotoGalleryProps {
  photos: GalleryPhoto[];
  className?: string;
  itemClassName?: string;
  aspect?: string;
}

/**
 * Real-photo gallery with click-to-zoom lightbox.
 * Uses the existing design language: gold eyebrows, serif captions, ocean-deep overlay.
 */
export default function PhotoGallery({
  photos,
  className,
  itemClassName,
  aspect = "aspect-[4/3]",
}: PhotoGalleryProps) {
  const [active, setActive] = useState<number | null>(null);

  return (
    <>
      <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", className)}>
        {photos.map((photo, i) => (
          <motion.figure
            key={photo.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className={cn("group m-0", itemClassName)}
          >
            <button
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Enlarge photo: ${photo.alt}`}
              className={cn(
                "relative w-full overflow-hidden block bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-gold",
                aspect,
              )}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </button>
            {photo.caption && (
              <figcaption className="font-sans text-xs text-muted-foreground mt-3 leading-relaxed">
                {photo.caption}
              </figcaption>
            )}
          </motion.figure>
        ))}
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[active].alt}
          className="fixed inset-0 z-[100] bg-ocean-deep/95 flex items-center justify-center p-4 sm:p-10"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            aria-label="Close photo"
            onClick={() => setActive(null)}
            className="absolute top-5 right-5 text-off-white/70 hover:text-gold transition-colors"
          >
            <X size={26} />
          </button>
          <figure className="m-0 max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={photos[active].src}
              alt={photos[active].alt}
              className="w-full max-h-[78vh] object-contain"
            />
            {photos[active].caption && (
              <figcaption className="font-sans text-sm text-off-white/70 mt-4 text-center">
                {photos[active].caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
