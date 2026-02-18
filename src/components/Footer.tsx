import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/60 py-20">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/footer_bg.mp4"
        aria-hidden="true"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/88 to-ocean-deep/96" />

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-gold font-serif text-base">◆</span>
              <h3 className="font-serif text-white text-xl font-medium tracking-wider drop-shadow-sm">
                A. Lindsay Luxe Estates
              </h3>
            </div>
            <p className="font-serif italic text-gold text-sm">Your doorway to Caribbean paradise.</p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-white/60 font-sans text-xs">© 2025 Ashante Lindsay. All rights reserved.</p>
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { href: "/luxury-homes", label: "Luxury Homes" },
                { href: "/container-homes", label: "Container Homes" },
                { href: "/prefab-homes", label: "Prefab Homes" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="small-caps text-xs text-white/70 hover:text-gold transition-colors font-sans tracking-wider"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end gap-3">
            <p className="small-caps text-xs text-white/50 font-sans tracking-wider">Follow Ashante</p>
            <div className="flex flex-wrap gap-4">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-white/70 hover:text-gold transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="https://wa.me/12684000000"
                className="text-white/70 hover:text-gold transition-colors small-caps text-xs font-sans tracking-wider pt-0.5"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="text-white/70 hover:text-gold transition-colors small-caps text-xs font-sans tracking-wider pt-0.5"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
