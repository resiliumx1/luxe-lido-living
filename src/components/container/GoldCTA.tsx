import React from "react";

interface GoldCTAProps {
  variant?: "solid" | "outline" | "glass";
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function GoldCTA({
  variant = "solid",
  children,
  onClick,
  href,
  className = "",
}: GoldCTAProps) {
  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 font-sans text-sm font-semibold tracking-[0.06em] uppercase px-7 py-3.5 cursor-pointer transition-all duration-300 rounded-md";

  const variants: Record<string, string> = {
    solid:
      "bg-primary text-primary-foreground border-none hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-[0_8px_40px_rgba(212,165,74,0.4)] gold-cta-shimmer",
    outline:
      "bg-transparent text-gold border border-gold/25 hover:border-gold/60 hover:-translate-y-0.5 hover:shadow-[inset_0_0_20px_rgba(212,165,74,0.08)]",
    glass:
      "bg-off-white/[0.06] backdrop-blur-md text-off-white border border-off-white/10 hover:bg-off-white/[0.12] hover:border-gold/30 hover:-translate-y-0.5 hover:shadow-[0_4px_24px_rgba(212,165,74,0.15)]",
  };

  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} onClick={onClick}>
      {children}
    </button>
  );
}
