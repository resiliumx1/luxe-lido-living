import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown, ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";
import { useCurrency } from "@/contexts/CurrencyContext";
import { LuxeLogo } from "@/components/ui/LuxeLogo";
import BookingModal from "./BookingModal";


type CtaAction = { label: string; type: "modal" } | { label: string; type: "route"; to: string };

function getCtaForPath(pathname: string): CtaAction {
  if (pathname.startsWith("/container-solutions") || pathname.startsWith("/order-container")) {
    return { label: "Order a Container", type: "route", to: "/order-container" };
  }
  if (pathname.startsWith("/trailers") || pathname.startsWith("/build-trailer")) {
    return { label: "Start Your Trailer Build", type: "route", to: "/build-trailer" };
  }
  if (pathname.startsWith("/prefab-homes") || pathname.startsWith("/build-your-home")) {
    return { label: "Start Your Build", type: "route", to: "/contact" };
  }
  if (
    pathname.startsWith("/services") ||
    pathname.startsWith("/about") ||
    pathname.startsWith("/contact")
  ) {
    return { label: "Discuss Your Project", type: "route", to: "/contact" };
  }
  if (pathname.startsWith("/luxury-homes") || pathname.startsWith("/properties")) {
    return { label: "Book a Viewing", type: "modal" };
  }
  return { label: "Discuss Your Project", type: "route", to: "/contact" };
}

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Container Solutions", href: "/container-solutions" },
  { label: "Insulated Panel Builds", href: "/prefab-homes" },
  { label: "Trailers", href: "/trailers" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [containerDropdownOpen, setContainerDropdownOpen] = useState(false);
  const [mobileContainerOpen, setMobileContainerOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const { currency, setCurrency } = useCurrency();
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const cta = getCtaForPath(location.pathname);

  const handleCta = () => {
    if (cta.type === "modal") setBookingOpen(true);
    else navigate(cta.to);
  };

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

          {/* Right — utilities + CTA + mobile hamburger */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Currency toggle — pill group */}
            <div
              className="hidden md:flex items-center h-8 border border-gold/20 overflow-hidden"
              role="radiogroup"
              aria-label="Currency"
            >
              {(["USD", "XCD", "CAD"] as const).map((c, idx) => (
                <div key={c} className="flex items-center h-full">
                  {idx > 0 && <span className="w-px h-4 bg-gold/20" aria-hidden="true" />}
                  <button
                    role="radio"
                    aria-checked={currency === c}
                    onClick={() => setCurrency(c)}
                    className={`px-2.5 h-full font-sans text-[11px] font-bold tracking-wide transition-colors duration-200 ${
                      currency === c ? utilActive : utilMuted
                    }`}
                  >
                    {c}
                  </button>
                </div>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={`Toggle theme — currently ${isDark ? "dark" : "light"} mode`}
              className={`hidden md:flex p-2 transition-colors duration-300 ${utilMuted} hover:text-gold`}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>



            {/* Context-aware primary CTA */}
            <button
              onClick={handleCta}
              className="hidden md:inline-flex cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-xs px-5 py-2.5 transition-all duration-300 items-center gap-1.5"
            >
              {cta.label}
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
              {(["USD", "XCD", "CAD"] as const).map((c, idx) => (
                <div key={c} className="flex items-center h-full">
                  {idx > 0 && <span className="w-px h-4 bg-gold/20" aria-hidden="true" />}
                  <button
                    role="radio"
                    aria-checked={currency === c}
                    onClick={() => setCurrency(c)}
                    className={`px-3 h-full font-sans text-xs font-bold ${currency === c ? "text-gold" : "text-off-white/40"}`}
                  >
                    {c}
                  </button>
                </div>
              ))}
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
          onClick={() => { setMenuOpen(false); handleCta(); }}
          className="mt-4 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-3 transition-all duration-300"
        >
          {cta.label}
        </button>
      </div>

      
      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} />
    </>
  );
}
