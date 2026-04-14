import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Home, Container, MessageSquare,
  Settings, Image, LogOut, ExternalLink, Menu, X, Sun, Moon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Home },
  { label: "Containers", href: "/admin/containers", icon: Container },
  { label: "Photo Manager", href: "/admin/photos", icon: Image },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAdminAuth();
  const { theme, setTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const pageTitle = navItems.find(
    (n) => location.pathname === n.href || (n.href !== "/admin" && location.pathname.startsWith(n.href))
  )?.label || "Dashboard";

  const sidebarContent = (
    <>
      <nav className="flex-1 py-4 space-y-0.5 px-3 overflow-y-auto">
        {navItems.map((item) => {
          const active = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 font-sans text-[13px] transition-colors duration-200 ${
                active
                  ? "text-gold bg-gold/10 border-l-2 border-gold"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border-l-2 border-transparent"
              }`}
              style={{ borderRadius: "0 6px 6px 0" }}
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: View public site */}
      <div className="p-3 border-t border-border">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 font-sans text-[11px] text-muted-foreground hover:text-gold transition-colors duration-200"
        >
          View Public Site <ExternalLink size={11} />
        </a>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 md:px-6 border-b border-border"
        style={{ backgroundColor: "hsl(var(--background))" }}
      >
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <img src="/logo-dark.svg" className="h-7 dark:block hidden" alt="A. Lindsay Luxe Estates" />
          <img src="/logo-light.svg" className="h-7 dark:hidden block" alt="A. Lindsay Luxe Estates" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-muted-foreground">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            aria-label="Sign out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </header>

      {/* Sidebar — desktop: fixed, mobile: overlay */}
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-56 flex flex-col border-r border-border bg-background transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="pt-14 md:pl-56">
        <div className="p-5 md:p-8">
          {/* Page title */}
          <h1 className="font-serif text-xl text-foreground mb-6">{pageTitle}</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
