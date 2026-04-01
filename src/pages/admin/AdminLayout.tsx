import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Home, Image, MessageSquare, Calendar, Users, Settings, LogOut, ExternalLink, Container } from "lucide-react";
import { LuxeLogo } from "@/components/ui/LuxeLogo";
import { supabase } from "@/integrations/supabase/client";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Properties", href: "/admin/properties", icon: Home },
  { label: "Photo Manager", href: "/admin/photos", icon: Image },
  { label: "Inquiries", href: "/admin/inquiries", icon: MessageSquare, badge: "inquiries" },
  { label: "Viewings", href: "/admin/viewings", icon: Calendar, badge: "viewings" },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ inquiries: 0, viewings: 0 });
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchCounts = async () => {
      const [enq, view] = await Promise.all([
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "unread"),
        supabase.from("viewings").select("id", { count: "exact", head: true }).eq("status", "pending"),
      ]);
      setCounts({ inquiries: enq.count || 0, viewings: view.count || 0 });
    };
    fetchCounts();

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) setUserEmail(data.user.email || "");
    });
  }, [location]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const pageTitle = navItems.find(
    (n) => location.pathname === n.href || (n.href !== "/admin" && location.pathname.startsWith(n.href))
  )?.label || "Dashboard";

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-60 bg-ocean-deep shrink-0 fixed inset-y-0 left-0 z-30">
        <div className="p-5 border-b border-white/10">
          <LuxeLogo size="sm" />
        </div>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {navItems.map((item) => {
            const active = location.pathname === item.href || (item.href !== "/admin" && location.pathname.startsWith(item.href));
            const badgeCount = item.badge === "inquiries" ? counts.inquiries : item.badge === "viewings" ? counts.viewings : 0;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 font-sans text-sm transition-colors ${
                  active
                    ? "text-primary border-l-2 border-primary bg-primary/10"
                    : "text-off-white/60 hover:text-off-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
                style={{ borderRadius: "0 6px 6px 0" }}
              >
                <item.icon size={18} />
                {item.label}
                {badgeCount > 0 && (
                  <span className="ml-auto bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                    {badgeCount}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 w-full px-3 py-2.5 text-off-white/60 hover:text-off-white font-sans text-sm transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className="flex-1 md:ml-60">
        {/* Top bar */}
        <header className="sticky top-0 z-20 h-[60px] bg-card border-b border-border flex items-center justify-between px-6">
          <h1 className="font-serif text-xl text-foreground">{pageTitle}</h1>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground font-sans transition-colors"
            >
              View Live Site <ExternalLink size={14} />
            </a>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary/20 text-primary font-sans font-bold text-xs flex items-center justify-center" style={{ borderRadius: "50%" }}>
                {userEmail.charAt(0).toUpperCase()}
              </div>
              <span className="hidden sm:block text-xs text-muted-foreground font-sans truncate max-w-[160px]">{userEmail}</span>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
