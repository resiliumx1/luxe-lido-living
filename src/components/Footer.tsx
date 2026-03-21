import { Link } from "react-router-dom";
import { Instagram, Facebook, Linkedin, Phone, Mail } from "lucide-react";
import { LuxeLogo } from "@/components/ui/LuxeLogo";

const quickLinks = [
  { label: "Luxury Homes", href: "/luxury-homes" },
  { label: "Container Homes", href: "/container-homes" },
  { label: "Prefab Homes", href: "/prefab-homes" },
  { label: "About Ashante", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/40" aria-label="Site footer">
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
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/90 to-ocean-deep/96" />

      <div className="relative z-10">
        {/* Top row */}
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 pt-20 pb-12">
          {/* Logo centered with tagline */}
          <div className="flex flex-col items-center mb-16">
            <LuxeLogo size="lg" />
            <p className="font-sans text-off-white/50 text-sm mt-4 text-center max-w-md">
              Connecting discerning buyers with Antigua's finest properties since 2010
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
            {/* Tagline */}
            <p className="font-serif italic text-gold text-sm hidden md:block">
              Luxury Real Estate in Antigua &amp; Barbuda
            </p>

            {/* Social */}
            <div className="flex items-center gap-5">
              {[
                { Icon: Instagram, label: "Instagram", href: "#" },
                { Icon: Facebook, label: "Facebook", href: "#" },
                { Icon: Linkedin, label: "LinkedIn", href: "#" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-gold/60 hover:text-gold transition-colors duration-300"
                  aria-label={label}
                >
                  <Icon size={18} />
                </a>
              ))}
              <a
                href="https://wa.me/12684000000"
                className="text-gold/60 hover:text-gold transition-colors duration-300"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.41A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.104-1.136l-.29-.173-3.03.866.81-2.957-.186-.3A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Middle row — 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Quick Links */}
            <div>
              <h4 className="text-eyebrow mb-5">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h4 className="text-eyebrow mb-5">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="tel:+12684000000" className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300">
                    <Phone size={14} className="text-gold/50" /> +1 (268) 400-0000
                  </a>
                </li>
                <li>
                  <a href="mailto:ashante@alindsayluxe.com" className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300">
                    <Mail size={14} className="text-gold/50" /> ashante@alindsayluxe.com
                  </a>
                </li>
                <li>
                  <a href="https://wa.me/12684000000" className="flex items-center gap-2 font-sans text-sm text-white/60 hover:text-gold transition-colors duration-300">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" className="text-gold/50">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.41A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.104-1.136l-.29-.173-3.03.866.81-2.957-.186-.3A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
                    </svg>
                    WhatsApp Direct
                  </a>
                </li>
              </ul>
            </div>

            {/* Office Hours */}
            <div>
              <h4 className="text-eyebrow mb-5">Office Hours</h4>
              <ul className="space-y-3 font-sans text-sm text-white/60">
                <li>Monday – Friday: 9:00am – 6:00pm</li>
                <li>Saturday: 10:00am – 4:00pm</li>
                <li>Sunday: By Appointment</li>
                <li className="text-white/40 text-xs mt-2">English Harbour, Antigua</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-gold/20">
          <div className="max-w-[1280px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
            <p className="font-sans text-white/40 text-xs">
              © 2025 A. Lindsay Luxe Estates. All rights reserved.
            </p>
            <p className="font-sans text-white/40 text-xs">
              Licensed Real Estate Agent, Antigua &amp; Barbuda
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
