import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-ocean-deep border-t border-gold/40 py-16">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-off-white text-xl font-medium tracking-wider mb-3">
              A. Lindsay Luxe Estates
            </h3>
            <p className="font-serif italic text-gold text-sm">Your doorway to Caribbean paradise.</p>
          </div>

          {/* Center */}
          <div className="flex flex-col items-center justify-center gap-4 text-center">
            <p className="text-off-white/50 font-sans text-xs">© 2025 Ashante Lindsay. All rights reserved.</p>
            <div className="flex gap-6">
              {[
                { href: "/luxury-homes", label: "Luxury Homes" },
                { href: "/container-homes", label: "Container Homes" },
                { href: "/about", label: "About" },
              ].map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className="small-caps text-xs text-off-white/50 hover:text-gold transition-colors font-sans tracking-wider"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-end gap-3">
            <p className="small-caps text-xs text-off-white/40 font-sans tracking-wider">Follow Ashante</p>
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-off-white/50 hover:text-gold transition-colors"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="https://wa.me/12684000000"
                className="text-off-white/50 hover:text-gold transition-colors small-caps text-xs font-sans tracking-wider pt-0.5"
                aria-label="WhatsApp"
              >
                WhatsApp
              </a>
              <a
                href="#"
                className="text-off-white/50 hover:text-gold transition-colors small-caps text-xs font-sans tracking-wider pt-0.5"
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
