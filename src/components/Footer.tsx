import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, Mail, MapPin, Clock } from "lucide-react";

const quickLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Container Homes", href: "/container-homes" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const services = [
  "Property Sales",
  "Citizenship by Investment",
  "Container Homes",
  "Property Management",
];

export default function Footer() {
  return (
    <footer className="relative bg-[hsl(207,100%,14%)]" aria-label="Site footer">
      {/* Top gold line */}
      <div className="h-px bg-gradient-to-r from-transparent via-[hsl(38,55%,50%)]/30 to-transparent" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-logo text-lg text-[hsl(38,55%,50%)]">A. LINDSAY</span>
              <span className="block font-body text-[10px] tracking-[3px] text-white/40 uppercase">LUXE ESTATES</span>
            </Link>
            <p className="font-body text-sm text-white/60 mb-6 leading-relaxed">
              Your gateway to Caribbean luxury.
            </p>
            <div className="flex items-center gap-3">
              {[
                { icon: <Instagram size={16} />, label: "Instagram", href: "https://www.instagram.com/alindsayluxeestates" },
                { icon: <Facebook size={16} />, label: "Facebook", href: "https://www.facebook.com/alindsayluxeestates" },
                { icon: <WhatsAppIcon />, label: "WhatsApp", href: "https://wa.me/12687755221" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/50 hover:text-[hsl(38,55%,50%)] hover:border-[hsl(38,55%,50%)]/50 transition-all duration-300"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-[hsl(38,55%,50%)] mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="font-body text-sm text-white/60 hover:text-[hsl(38,55%,50%)] hover:translate-x-1 inline-block transition-all duration-300"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-[hsl(38,55%,50%)] mb-5">Services</h4>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s}>
                  <span className="font-body text-sm text-white/60">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body text-xs font-semibold tracking-[0.16em] uppercase text-[hsl(38,55%,50%)] mb-5">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="tel:+12687755221" className="flex items-center gap-2.5 font-body text-sm text-white/60 hover:text-[hsl(38,55%,50%)] transition-colors duration-300">
                  <Phone size={14} className="text-[hsl(38,55%,50%)]/50 shrink-0" />
                  +1 (268) 775-5221
                </a>
              </li>
              <li>
                <a href="mailto:lindsayashante@gmail.com" className="flex items-center gap-2.5 font-body text-sm text-white/60 hover:text-[hsl(38,55%,50%)] transition-colors duration-300">
                  <Mail size={14} className="text-[hsl(38,55%,50%)]/50 shrink-0" />
                  lindsayashante@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2.5 font-body text-sm text-white/60">
                <MapPin size={14} className="text-[hsl(38,55%,50%)]/50 shrink-0 mt-0.5" />
                St. John's, Antigua & Barbuda
              </li>
              <li className="flex items-center gap-2.5 font-body text-sm text-white/60">
                <Clock size={14} className="text-[hsl(38,55%,50%)]/50 shrink-0" />
                Mon–Sat 8AM–6PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-white/40 text-xs">
            © 2026 A. Lindsay Luxe Estates. Licensed Real Estate Agent, Antigua & Barbuda.
          </p>
          <Link to="/admin/login" className="font-body text-white/20 hover:text-white/40 text-xs transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.41A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.104-1.136l-.29-.173-3.03.866.81-2.957-.186-.3A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}
