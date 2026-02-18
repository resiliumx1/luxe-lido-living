import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

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
      : "bg-ocean-deep/92 backdrop-blur-md border-b border-gold/20";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${navBg}`}>
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-off-white text-lg font-medium tracking-wider whitespace-nowrap"
          >
            A. Lindsay Luxe Estates
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="nav-link-gold font-sans text-off-white/90 hover:text-gold transition-colors duration-300 small-caps text-sm tracking-widest pb-0.5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-off-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 bg-ocean-deep flex flex-col items-center justify-center gap-10 transition-all duration-500 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <Link
          to="/"
          className="font-serif text-off-white text-2xl font-medium tracking-wider mb-6"
        >
          A. Lindsay Luxe Estates
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
