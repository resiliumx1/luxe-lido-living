import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Sun, Moon, Heart, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Container Homes", href: "/container-homes" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { count } = useWishlist();
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isTransparent = isHome && !scrolled;
  const isDark = theme === "dark";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent"
            : "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm"
        }`}
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="shrink-0 group">
            <div className="flex flex-col">
              <span className={`font-logo text-lg tracking-wide ${isTransparent ? "text-luxury-gold" : "text-luxury-gold"}`}>
                A. LINDSAY
              </span>
              <span className={`font-body text-[10px] tracking-[3px] uppercase ${isTransparent ? "text-white/50" : "text-muted-foreground"}`}>
                LUXE ESTATES
              </span>
            </div>
          </Link>

          {/* Center links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href || location.pathname.startsWith(link.href + "/");
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative font-body text-[13px] font-medium tracking-wide transition-colors duration-300 pb-1 ${
                    isActive
                      ? "text-luxury-gold"
                      : isTransparent
                        ? "text-white/80 hover:text-white"
                        : "text-foreground/70 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-0.5 rounded-full bg-luxury-gold" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Theme toggle */}
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              className={`p-2.5 rounded-full transition-colors duration-300 ${
                isTransparent ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <motion.div
                key={isDark ? "sun" : "moon"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </button>

            {/* Wishlist */}
            <Link
              to="/wishlist"
              aria-label={`Saved properties: ${count}`}
              className={`relative p-2.5 rounded-full transition-colors duration-300 ${
                isTransparent ? "text-white/60 hover:text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Heart size={18} fill={count > 0 ? "hsl(var(--luxury-gold))" : "none"} stroke={count > 0 ? "hsl(var(--luxury-gold))" : "currentColor"} strokeWidth={2} />
              {count > 0 && (
                <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-luxury-gold text-white text-[9px] font-bold flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>

            {/* Inquire CTA */}
            <Link
              to="/contact"
              className="hidden md:inline-flex gold-shimmer-hover bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-xs tracking-widest uppercase px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20"
            >
              Inquire
            </Link>

            {/* Admin gear */}
            <Link
              to="/admin"
              className={`p-2.5 rounded-full transition-all duration-300 opacity-0 hover:opacity-100 ${
                isTransparent ? "text-white/30" : "text-muted-foreground/30"
              }`}
              aria-label="Admin"
            >
              <Settings size={16} />
            </Link>

            {/* Mobile hamburger */}
            <button
              className={`lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center ${
                isTransparent ? "text-white" : "text-foreground"
              }`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-deep-ocean flex flex-col items-center justify-center gap-6"
          >
            <Link to="/" className="mb-8" onClick={() => setMenuOpen(false)}>
              <span className="font-logo text-2xl text-luxury-gold">A. LINDSAY</span>
              <span className="block font-body text-[10px] tracking-[3px] text-white/50 uppercase text-center">LUXE ESTATES</span>
            </Link>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link
                  to={link.href}
                  className="font-display text-white/90 hover:text-luxury-gold transition-colors duration-300 text-3xl"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-8"
            >
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="gold-shimmer-hover bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase px-8 py-3 rounded-xl"
              >
                Inquire
              </Link>
            </motion.div>

            {/* Social links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="absolute bottom-12 flex items-center gap-6"
            >
              {["Instagram", "Facebook", "WhatsApp"].map((s) => (
                <span key={s} className="text-white/30 text-xs font-body tracking-wider uppercase">{s}</span>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
