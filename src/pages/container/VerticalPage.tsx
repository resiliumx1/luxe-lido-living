import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { verticalMeta, getProductsByVertical, ContainerVertical, ContainerProduct } from "@/data/containerProducts";
import { useCurrency } from "@/contexts/CurrencyContext";
import SectionLabel from "@/components/SectionLabel";

function ProductCard({ product }: { product: ContainerProduct }) {
  const { formatPrice } = useCurrency();
  return (
    <Link
      to={`/container-solutions/${product.vertical}/${product.id}`}
      className="group block bg-card border border-border overflow-hidden transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <ResponsiveImage
          basePath={`${product.imageBase}/hero`}
          size="card"
          alt={product.name}
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <p className="text-eyebrow text-primary mb-1">{product.category}</p>
        <h3 className="font-serif text-h4 text-foreground mb-1">{product.name}</h3>
        <p className="font-sans text-muted-foreground text-sm mb-4">{product.tagline}</p>
        <div className="flex items-center justify-between text-sm font-sans">
          <span className="text-foreground font-semibold">From {formatPrice(product.startingPriceUSD)}</span>
          <span className="text-muted-foreground">{product.sqft} sq ft · {product.leadTimeWeeks} weeks</span>
        </div>
        <span className="inline-flex items-center gap-1 text-primary font-sans text-sm mt-4 group-hover:gap-2 transition-all">
          View Details <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function VerticalPage() {
  const { vertical } = useParams<{ vertical: string }>();
  const v = vertical as ContainerVertical;
  const meta = verticalMeta[v];
  const products = getProductsByVertical(v);

  if (!meta) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-sans text-muted-foreground">Category not found.</p>
      </div>
    );
  }

  return (
    <main id="main-content">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <ResponsiveImage
          basePath={meta.heroImage}
          size="hero"
          alt={meta.label}
          className="absolute inset-0"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/40 to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 px-6 text-center">
          <SectionLabel text="Container Solutions" />
          <h1 className="font-serif text-h2 md:text-display text-off-white mt-4">{meta.label}</h1>
          <p className="font-sans text-off-white/60 text-body mt-3 max-w-xl">{meta.tagline}</p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-secondary py-16 px-6 text-center">
        <h2 className="font-serif text-h3 text-foreground mb-4">Don't see what you need?</h2>
        <p className="font-sans text-muted-foreground text-body mb-8 max-w-lg mx-auto">
          We configure custom solutions for unique requirements. Tell us what you're building 
          and we'll design something that fits.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-4 transition-all duration-300 uppercase"
        >
          Get in Touch <ArrowRight size={16} />
        </Link>
      </section>
    </main>
  );
}
