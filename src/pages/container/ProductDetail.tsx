import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Maximize2, Users, MessageCircle } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getProductById, getProductsByVertical, ContainerProduct } from "@/data/containerProducts";
import { useCurrency } from "@/contexts/CurrencyContext";
import SectionLabel from "@/components/SectionLabel";

function RelatedCard({ product }: { product: ContainerProduct }) {
  const { formatPrice } = useCurrency();
  return (
    <Link
      to={`/container-solutions/${product.vertical}/${product.id}`}
      className="group block bg-card border border-border overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ResponsiveImage basePath={`${product.imageBase}/hero`} size="card" alt={product.name} className="absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
      </div>
      <div className="p-5">
        <p className="text-eyebrow text-primary mb-1">{product.category}</p>
        <h3 className="font-serif text-lg text-foreground">{product.name}</h3>
        <p className="font-sans text-sm text-muted-foreground mt-1">From {formatPrice(product.startingPriceUSD)}</p>
      </div>
    </Link>
  );
}

export default function ProductDetail() {
  const { vertical, productId } = useParams<{ vertical: string; productId: string }>();
  const product = getProductById(productId || "");
  const { formatPrice } = useCurrency();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="font-sans text-muted-foreground">Product not found.</p>
      </div>
    );
  }

  const gallerySlides = Array.from({ length: product.galleryCount }, (_, i) => ({
    src: `/containers/${product.imageBase}/gallery-${i + 1}.jpg`,
  }));

  const related = getProductsByVertical(product.vertical)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(`Hi Ashante, I'm interested in ${product.name} on alindsayluxe.com — can we discuss?`);

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <ResponsiveImage basePath={`${product.imageBase}/hero`} size="hero" alt={product.name} className="absolute inset-0" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 via-transparent to-transparent" />
      </section>

      {/* Title bar */}
      <section className="bg-background border-b border-border py-8 px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-eyebrow text-primary mb-2">{product.category}</p>
          <h1 className="font-serif text-h2 md:text-display text-foreground">{product.name}</h1>
          <p className="font-serif italic text-muted-foreground text-h4 mt-1">{product.tagline}</p>
        </div>
      </section>

      {/* Gallery Thumbnails */}
      {product.galleryCount > 0 && (
        <section className="bg-background py-8 px-6">
          <div className="max-w-[1280px] mx-auto">
            <div className="flex gap-3 overflow-x-auto pb-2">
              {Array.from({ length: product.galleryCount }, (_, i) => (
                <button
                  key={i}
                  onClick={() => { setLightboxIndex(i); setLightboxOpen(true); }}
                  className="shrink-0 w-28 h-20 overflow-hidden border border-border hover:border-primary transition-colors"
                >
                  <ResponsiveImage basePath={`${product.imageBase}/gallery-${i + 1}`} size="card" alt={`${product.name} gallery ${i + 1}`} />
                </button>
              ))}
            </div>
          </div>
          <Lightbox open={lightboxOpen} close={() => setLightboxOpen(false)} index={lightboxIndex} slides={gallerySlides} />
        </section>
      )}

      {/* Two-column content */}
      <section className="bg-background py-16 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-12">
          {/* Left */}
          <div className="lg:w-2/3">
            {/* Description */}
            <div className="prose prose-lg max-w-none mb-12">
              {product.description.split("\n\n").map((p, i) => (
                <p key={i} className="font-sans text-body text-muted-foreground leading-relaxed mb-4">{p}</p>
              ))}
            </div>

            {/* What's Included */}
            <div className="mb-12">
              <h2 className="font-serif text-h3 text-foreground mb-6">What's Included</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.whatsIncluded.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 font-sans text-sm text-muted-foreground">
                    <span className="text-gold mt-1">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Materials Palette */}
            <div className="mb-12">
              <h2 className="font-serif text-h3 text-foreground mb-6">Materials Palette</h2>
              <div className="flex flex-wrap gap-2">
                {product.materialsPalette.map((mat) => (
                  <span key={mat} className="px-3 py-1.5 bg-secondary text-foreground font-sans text-xs font-medium tracking-wide">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Use Cases */}
            <div className="mb-12">
              <h2 className="font-serif text-h3 text-foreground mb-6">Use Cases</h2>
              <div className="grid gap-4">
                {product.useCases.map((uc, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 bg-secondary border border-border">
                    <span className="text-gold font-sans font-bold text-sm mt-0.5">{i + 1}.</span>
                    <p className="font-sans text-sm text-foreground">{uc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="bg-card border border-border p-6">
                <h3 className="font-sans font-semibold text-foreground text-sm mb-6 tracking-wide uppercase">Specifications</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Maximize2 size={16} className="text-primary" />
                    <div>
                      <p className="font-sans text-xs text-muted-foreground">Size</p>
                      <p className="font-sans text-sm text-foreground font-medium">{product.sqft} sq ft · {product.dimensions}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-primary" />
                    <div>
                      <p className="font-sans text-xs text-muted-foreground">Capacity</p>
                      <p className="font-sans text-sm text-foreground font-medium">{product.capacity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={16} className="text-primary" />
                    <div>
                      <p className="font-sans text-xs text-muted-foreground">Lead Time</p>
                      <p className="font-sans text-sm text-foreground font-medium">{product.leadTimeWeeks} weeks</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border mt-6 pt-6">
                  <p className="font-sans text-xs text-muted-foreground mb-1">Starting From</p>
                  <p className="font-serif text-h3 text-foreground">{formatPrice(product.startingPriceUSD)}</p>
                </div>
              </div>

              {/* CTAs */}
              <Link
                to={`/container-solutions/${product.vertical}/${product.id}/configure`}
                className="block w-full text-center cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-6 py-4 transition-all duration-300 uppercase"
              >
                Configure This Unit
              </Link>
              <Link
                to="/contact"
                className="block w-full text-center border border-gold/30 text-primary hover:border-gold/60 font-sans font-medium tracking-widest text-sm px-6 py-4 transition-all duration-300 uppercase"
              >
                Request Spec Sheet
              </Link>
              <a
                href={`https://wa.me/12687755221?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans font-medium text-sm px-6 py-4 transition-all duration-300"
              >
                <MessageCircle size={16} /> WhatsApp Ashante
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons preview */}
      {product.addOns.length > 0 && (
        <section className="bg-secondary py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <SectionLabel text="Available Add-Ons" />
            <h2 className="font-serif text-h3 text-foreground mt-3 mb-8">Customise Your Build</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {product.addOns.map((addon) => (
                <div key={addon.id} className="bg-card border border-border p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-sans font-semibold text-foreground text-sm">{addon.name}</h3>
                    <span className="font-sans text-primary font-medium text-sm whitespace-nowrap ml-3">{formatPrice(addon.priceUSD)}</span>
                  </div>
                  <p className="font-sans text-muted-foreground text-xs leading-relaxed">{addon.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="bg-background py-16 px-6">
          <div className="max-w-[1280px] mx-auto">
            <SectionLabel text="Related Products" />
            <h2 className="font-serif text-h3 text-foreground mt-3 mb-8">More in {product.category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <RelatedCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

    </main>
  );
}
