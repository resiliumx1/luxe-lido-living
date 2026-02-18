interface PageBannerProps {
  image: string;
  title: string;
  subtitle: string;
}

export default function PageBanner({ image, title, subtitle }: PageBannerProps) {
  return (
    <div className="relative h-[60vh] min-h-[420px] flex items-end pb-20">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/30 to-transparent" />
      <div className="relative max-w-[1280px] mx-auto px-6 md:px-10 w-full">
        <div className="flex items-center gap-4 mb-4">
          <span className="gold-line w-10" />
          <span className="small-caps text-xs text-gold tracking-widest font-sans">A. Lindsay Luxe Estates</span>
        </div>
        <h1 className="font-serif text-4xl md:text-7xl text-off-white font-medium leading-none mb-4">{title}</h1>
        <p className="font-serif italic text-off-white/70 text-lg md:text-xl">{subtitle}</p>
      </div>
    </div>
  );
}
