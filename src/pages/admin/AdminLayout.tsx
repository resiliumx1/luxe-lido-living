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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    logout();
    navigate("/");
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
                  : "text-white/50 hover:text-white/80 hover:bg-white/[0.03] border-l-2 border-transparent"
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
      <div className="p-3 border-t border-white/[0.06]">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 font-sans text-[11px] text-white/30 hover:text-gold transition-colors duration-200"
        >
          View Public Site <ExternalLink size={11} />
        </a>
      </div>
    </>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(210 40% 5%)" }}>
      {/* Fixed top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 md:px-6 border-b border-white/[0.06]"
        style={{ backgroundColor: "hsl(210 40% 6%)" }}
      >
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white/60 hover:text-white p-1"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <img src="/logo-dark.svg" className="h-7" alt="A. Lindsay Luxe Estates" />
          <span className="font-sans text-[11px] font-semibold tracking-[0.15em] uppercase text-white/40">
            Admin
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Back to Site — always visible */}
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 border border-gold/40 text-gold font-sans text-xs font-medium tracking-wide hover:bg-gold hover:text-[hsl(210_40%_5%)] transition-all duration-200"
            style={{ borderRadius: "6px" }}
          >
            <ArrowLeft size={13} />
            <span className="hidden sm:inline">Back to Site</span>
          </a>

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="p-2 text-white/40 hover:text-white transition-colors duration-200"
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
        className={`fixed top-14 bottom-0 left-0 z-40 w-56 flex flex-col border-r border-white/[0.06] transition-transform duration-300 md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: "hsl(210 40% 5%)" }}
      >
        {sidebarContent}
      </aside>

      {/* Main content */}
      <main className="pt-14 md:pl-56">
        <div className="p-5 md:p-8">
          {/* Page title */}
          <h1 className="font-serif text-xl text-white mb-6">{pageTitle}</h1>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
