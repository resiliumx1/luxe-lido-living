import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Sun, Moon, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LuxeLogo } from "@/components/ui/LuxeLogo";
import WishlistDrawer from "./WishlistDrawer";
import BookingModal from "./BookingModal";

const containerVerticals = [
  { label: "Homes", href: "/container-solutions/homes" },
  { label: "Commercial", href: "/container-solutions/commercial" },
  { label: "Hospitality", href: "/container-solutions/hospitality" },
  { label: "Utility", href: "/container-solutions/utility" },
];

const navLinks = [
  { label: "Luxury Homes", href: "/luxury-homes" },
  { label: "Container Solutions", href: "/container-solutions", hasDropdown: true },
  { label: "Prefab Homes", href: "/prefab-homes" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [containerDropdownOpen, setContainerDropdownOpen] = useState(false);
  const [mobileContainerOpen, setMobileContainerOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { count } = useWishlist();
  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const isHome = location.pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileContainerOpen(false);
  }, [location]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setContainerDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const isTransparent = isHome && !scrolled;
  const isDark = theme === "dark";

  // Utility colors based on nav state
  const utilMuted = isTransparent ? "text-off-white/50" : "text-off-white/50";
  const utilActive = "text-gold";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? ""
            : "bg-ocean-deep/95 backdrop-blur-md shadow-lg shadow-black/10"
        }`}
        style={isTransparent ? { background: "linear-gradient(to bottom, rgba(5,12,28,0.50) 0%, transparent 100%)" } : undefined}
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <LuxeLogo size="md" as="link" variant="dark" />

          {/* Nav links — center */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.href} className="relative" ref={dropdownRef}>
                  <button
                    className="nav-link-gold text-nav text-off-white hover:text-gold transition-colors duration-300 pb-0.5 flex items-center gap-1"
                    onClick={() => setContainerDropdownOpen(!containerDropdownOpen)}
                    onMouseEnter={() => setContainerDropdownOpen(true)}
                    aria-expanded={containerDropdownOpen}
                    aria-haspopup="true"
                  >
                    {link.label}
                    <ChevronDown size={12} className={`transition-transform duration-200 ${containerDropdownOpen ? "rotate-180" : ""}`} />
                  </button>

                  {/* Dropdown */}
                  {/* Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-56 backdrop-blur-2xl border border-gold/25 shadow-2xl shadow-black/40 transition-all duration-200 origin-top ${
                      containerDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                    style={{ background: "linear-gradient(180deg, hsl(var(--ocean-deep) / 0.92) 0%, hsl(var(--ocean-deep) / 0.96) 100%)" }}
                    onMouseLeave={() => setContainerDropdownOpen(false)}
                  >
                    <div className="py-2">
                      {containerVerticals.map((v) => (
                        <Link
                          key={v.href}
                          to={v.href}
                          className="block px-5 py-2.5 font-sans text-sm font-medium text-off-white hover:text-gold hover:bg-gold/10 transition-colors duration-200"
                          onClick={() => setContainerDropdownOpen(false)}
                        >
                          {v.label}
                        </Link>
                      ))}
                      <div className="border-t border-gold/25 my-1" />
                      <Link
                        to="/container-solutions"
                        className="flex items-center gap-1.5 px-5 py-2.5 font-sans text-sm text-gold font-semibold hover:bg-gold/10 transition-colors duration-200"
                        onClick={() => setContainerDropdownOpen(false)}
                      >
                        View All Catalog <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="nav-link-gold text-nav text-off-white hover:text-gold transition-colors duration-300 pb-0.5"
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* Right — utilities + CTA + mobile hamburger */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Currency toggle — pill group */}
            <div
              className="hidden md:flex items-center h-8 border border-gold/20 overflow-hidden"
              role="radiogroup"
              aria-label="Currency"
            >
              <button
                role="radio"
                aria-checked={currency === "USD"}
                onClick={() => setCurrency("USD")}
                className={`px-2.5 h-full font-sans text-[11px] font-bold tracking-wide transition-colors duration-200 ${
                  currency === "USD" ? utilActive : utilMuted
                }`}
              >
                USD
              </button>
              <span className="w-px h-4 bg-gold/20" aria-hidden="true" />
              <button
                role="radio"
                aria-checked={currency === "XCD"}
                onClick={() => setCurrency("XCD")}
                className={`px-2.5 h-full font-sans text-[11px] font-bold tracking-wide transition-colors duration-200 ${
                  currency === "XCD" ? utilActive : utilMuted
                }`}
              >
                XCD
              </button>
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Toggle theme — currently ${isDark ? "dark" : "light"} mode`}
              className={`hidden md:flex p-2 transition-colors duration-300 ${utilMuted} hover:text-gold`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>

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
        className={`fixed inset-0 z-40 bg-ocean-deep dark:bg-background flex flex-col items-center justify-center gap-6 transition-all duration-500 overflow-y-auto ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Mobile Preferences row */}
        <div className="flex items-center gap-6 mb-4 pb-4 border-b border-gold/10">
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-off-white/40 uppercase tracking-widest">Currency</span>
            <div className="flex items-center h-8 border border-gold/20" role="radiogroup" aria-label="Currency">
              <button
                role="radio"
                aria-checked={currency === "USD"}
                onClick={() => setCurrency("USD")}
                className={`px-3 h-full font-sans text-xs font-bold ${currency === "USD" ? "text-gold" : "text-off-white/40"}`}
              >
                USD
              </button>
              <span className="w-px h-4 bg-gold/20" aria-hidden="true" />
              <button
                role="radio"
                aria-checked={currency === "XCD"}
                onClick={() => setCurrency("XCD")}
                className={`px-3 h-full font-sans text-xs font-bold ${currency === "XCD" ? "text-gold" : "text-off-white/40"}`}
              >
                XCD
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-off-white/40 uppercase tracking-widest">Theme</span>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Toggle theme — currently ${isDark ? "dark" : "light"} mode`}
              className="text-gold p-1"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <div className="mb-2" onClick={() => setMenuOpen(false)}>
          <LuxeLogo size="lg" as="link" />
        </div>

        {navLinks.map((link) =>
          link.hasDropdown ? (
            <div key={link.href} className="flex flex-col items-center">
              <button
                className="font-serif text-off-white/90 hover:text-gold transition-colors duration-300 text-3xl italic flex items-center gap-2"
                onClick={() => setMobileContainerOpen(!mobileContainerOpen)}
              >
                {link.label}
                <ChevronDown size={18} className={`transition-transform duration-200 ${mobileContainerOpen ? "rotate-180" : ""}`} />
              </button>
              {mobileContainerOpen && (
                <div className="flex flex-col items-center gap-3 mt-3">
                  {containerVerticals.map((v) => (
                    <Link
                      key={v.href}
                      to={v.href}
                      className="font-sans text-off-white/90 font-medium hover:text-gold text-lg transition-colors"
                      onClick={() => setMenuOpen(false)}
                    >
                      {v.label}
                    </Link>
                  ))}
                  <Link
                    to="/container-solutions"
                    className="font-sans text-gold text-sm flex items-center gap-1 mt-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    View All Catalog <ArrowRight size={12} />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.href}
              to={link.href}
              className="font-serif text-off-white/90 hover:text-gold transition-colors duration-300 text-3xl italic"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          )
        )}

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
