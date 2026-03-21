import { useEffect, useState } from "react";
import { Home, MessageSquare, Calendar, Users } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface StatCard {
  label: string;
  value: number;
  sub: string;
  icon: typeof Home;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatCard[]>([]);
  const [recentInquiries, setRecentInquiries] = useState<any[]>([]);
  const [upcomingViewings, setUpcomingViewings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const now = new Date();
      const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

      const [props, enqs, views, leads, recentEnq, upViews] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact", head: true }),
        supabase.from("enquiries").select("id", { count: "exact", head: true }).eq("status", "unread").gte("created_at", sevenDaysAgo),
        supabase.from("viewings").select("id", { count: "exact", head: true }).eq("status", "pending"),
        supabase.from("leads").select("id", { count: "exact", head: true }).gte("created_at", thirtyDaysAgo),
        supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(5),
        supabase.from("viewings").select("*").eq("status", "pending").order("preferred_date", { ascending: true }).limit(5),
      ]);

      setStats([
        { label: "Total Properties", value: props.count || 0, sub: "active listings", icon: Home },
        { label: "New Inquiries", value: enqs.count || 0, sub: "last 7 days", icon: MessageSquare },
        { label: "Viewing Requests", value: views.count || 0, sub: "pending", icon: Calendar },
        { label: "Email Leads", value: leads.count || 0, sub: "this month", icon: Users },
      ]);
      setRecentInquiries(recentEnq.data || []);
      setUpcomingViewings(upViews.data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-card border border-border p-5 animate-pulse" style={{ borderRadius: "12px" }}>
              <div className="h-4 w-24 bg-muted rounded mb-4" />
              <div className="h-10 w-16 bg-muted rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-card border border-border p-5" style={{ borderRadius: "12px" }}>
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={18} className="text-primary" />
              <span className="text-label text-muted-foreground">{s.label}</span>
            </div>
            <p className="font-serif text-4xl text-primary">{s.value}</p>
            <p className="text-caption text-muted-foreground mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-card border border-border p-6" style={{ borderRadius: "12px" }}>
          <h2 className="font-serif text-lg text-foreground mb-4">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="text-sm text-muted-foreground">No inquiries yet.</p>
          ) : (
            <div className="space-y-3">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-sans text-sm text-foreground font-medium">{inq.name}</p>
                    <p className="font-sans text-xs text-muted-foreground">{inq.property_name || "General enquiry"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {inq.status === "unread" && <span className="w-2 h-2 bg-primary rounded-full" />}
                    <span className="text-xs text-muted-foreground">{timeAgo(inq.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Viewings */}
        <div className="bg-card border border-border p-6" style={{ borderRadius: "12px" }}>
          <h2 className="font-serif text-lg text-foreground mb-4">Upcoming Viewings</h2>
          {upcomingViewings.length === 0 ? (
            <p className="text-sm text-muted-foreground">No pending viewings.</p>
          ) : (
            <div className="space-y-3">
              {upcomingViewings.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-sans text-sm text-foreground font-medium">{v.name}</p>
                    <p className="font-sans text-xs text-muted-foreground">{v.property_name || "General"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-primary font-medium">{new Date(v.preferred_date).toLocaleDateString()}</p>
                    <p className="text-xs text-muted-foreground capitalize">{v.method?.replace("-", " ")}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
