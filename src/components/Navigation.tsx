import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const navLinks = [
  { label: "Luxury Homes", href: "/luxury-homes" },
  { label: "Container Homes", href: "/container-homes" },
  { label: "Prefab Homes", href: "/prefab-homes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="p-2 text-off-white/70 hover:text-gold transition-colors duration-300"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-ocean-deep/95 backdrop-blur-md shadow-lg shadow-black/10"
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo — left */}
          <Link to="/" className="flex items-center gap-2 group shrink-0">
            <span className="text-gold font-serif text-lg leading-none group-hover:text-gold-soft transition-colors duration-300">◆</span>
            <span
              className="font-serif text-base md:text-xl font-medium tracking-wide whitespace-nowrap text-off-white group-hover:text-gold-soft transition-colors duration-300"
              style={{ textShadow: isTransparent ? "0 1px 12px rgba(0,0,0,0.5)" : "none" }}
            >
              A. Lindsay Luxe Estates
            </span>
          </Link>

          {/* Nav links — center */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link-gold font-sans text-off-white hover:text-gold transition-colors duration-300 small-caps text-sm tracking-wider pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right — CTA + theme + mobile hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="hidden md:inline-flex cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-xs px-5 py-2.5 transition-all duration-300 items-center gap-1.5"
            >
              Book a Viewing
            </Link>
            <ThemeToggle />
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
        <Link to="/" className="flex items-center gap-2 mb-4" onClick={() => setMenuOpen(false)}>
          <span className="text-gold font-serif text-xl">◆</span>
          <span className="font-serif text-off-white text-2xl font-medium tracking-wider">
            A. Lindsay Luxe Estates
          </span>
        </Link>
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
        <Link
          to="/contact"
          className="mt-4 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-8 py-3 transition-all duration-300"
          onClick={() => setMenuOpen(false)}
        >
          Book a Viewing
        </Link>
      </div>
    </>
  );
}
