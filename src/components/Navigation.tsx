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

function ThemeToggle({ light = false }: { light?: boolean }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className={`p-2 transition-colors duration-300 ${
        light
          ? "text-off-white/70 hover:text-gold"
          : "text-off-white/70 hover:text-gold"
      }`}
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
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navBg =
    isHome && !scrolled
      ? "bg-transparent"
      : "bg-ocean-deep/95 backdrop-blur-md border-b border-gold/20";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <span className="text-gold font-serif text-lg leading-none group-hover:text-gold-soft transition-colors duration-300">◆</span>
            <span
              className="font-serif text-base md:text-xl font-medium tracking-wide whitespace-nowrap text-off-white group-hover:text-gold-soft transition-colors duration-300"
              style={{ textShadow: isHome && !scrolled ? "0 1px 12px rgba(0,0,0,0.5)" : "none" }}
            >
              A. Lindsay Luxe Estates
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link-gold font-sans text-off-white hover:text-gold transition-colors duration-300 small-caps text-sm tracking-wider pb-0.5"
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-1">
            <ThemeToggle />
            <button
              className="text-off-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
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
        className={`fixed inset-0 z-40 bg-ocean-deep dark:bg-background flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="flex items-center gap-2 mb-4"
          onClick={() => setMenuOpen(false)}
        >
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
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}
