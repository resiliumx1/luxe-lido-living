import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart } from "lucide-react";
import { useTheme } from "next-themes";
import { useWishlist } from "@/contexts/WishlistContext";
import { LuxeLogo } from "@/components/ui/LuxeLogo";
import WishlistDrawer from "./WishlistDrawer";
import BookingModal from "./BookingModal";

const navLinks = [
  { label: "Luxury Homes", href: "/luxury-homes" },
  { label: "Container Homes", href: "/container-homes" },
  { label: "Prefab Homes", href: "/prefab-homes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { count } = useWishlist();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isTransparent = isHome && !scrolled;
  const isDark = theme === "dark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-ocean-deep/95 backdrop-blur-md shadow-lg shadow-black/10"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <LuxeLogo size="md" as="link" variant={isTransparent ? "dark" : "dark"} />

          {/* Nav links — center */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link-gold text-nav text-off-white hover:text-gold transition-colors duration-300 pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — icons + CTA + mobile hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Wishlist */}
            <button
              onClick={() => setWishlistOpen(true)}
              aria-label={`Saved properties: ${count}`}
              className="relative p-2 text-gold hover:text-gold-soft transition-colors duration-300"
            >
              <Heart size={18} fill={count > 0 ? "currentColor" : "none"} strokeWidth={2} />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-gold text-ocean-deep text-[9px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </button>

            {/* Theme toggle removed — dark nav always */}

            {/* Book a Viewing */}
            <button
              onClick={() => setBookingOpen(true)}
              className="hidden md:inline-flex cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-xs px-5 py-2.5 transition-all duration-300 items-center gap-1.5"
            >
              Book a Viewing
            </button>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-off-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ocean-deep dark:bg-background flex flex-col items-center justify-center gap-8 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="mb-4" onClick={() => setMenuOpen(false)}>
          <LuxeLogo size="lg" as="link" />
        </div>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className="font-serif text-off-white/90 hover:text-gold transition-colors duration-300 text-3xl italic"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={() => { setMenuOpen(false); setBookingOpen(true); }}
          className="mt-4 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-3 transition-all duration-300"
        >
          Book a Viewing
        </button>
      </div>

      <WishlistDrawer isOpen={wishlistOpen} onClose={() => setWishlistOpen(false)} />
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
