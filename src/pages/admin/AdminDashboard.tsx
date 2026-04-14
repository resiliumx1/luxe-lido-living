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
    const fetchData = async () => {
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
        { label: "Active Properties", value: props.count || 0, sub: "total listings", icon: Home },
        { label: "New Inquiries", value: enqs.count || 0, sub: "last 7 days", icon: MessageSquare },
        { label: "Pending Viewings", value: views.count || 0, sub: "awaiting response", icon: Calendar },
        { label: "Email Leads", value: leads.count || 0, sub: "this month", icon: Users },
      ]);
      setRecentInquiries(recentEnq.data || []);
      setUpcomingViewings(upViews.data || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const timeAgo = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/[0.03] border border-white/[0.06] p-5 animate-pulse" style={{ borderRadius: "10px" }}>
            <div className="h-3 w-20 bg-white/10 rounded mb-4" />
            <div className="h-8 w-12 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/[0.03] border border-white/[0.06] p-5" style={{ borderRadius: "10px" }}>
            <div className="flex items-center gap-2 mb-3">
              <s.icon size={16} className="text-gold" />
              <span className="font-sans text-[11px] font-medium uppercase tracking-wider text-white/40">{s.label}</span>
            </div>
            <p className="font-serif text-3xl text-white">{s.value}</p>
            <p className="font-sans text-[11px] text-white/30 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/[0.03] border border-white/[0.06] p-6" style={{ borderRadius: "10px" }}>
          <h2 className="font-serif text-base text-white mb-4">Recent Inquiries</h2>
          {recentInquiries.length === 0 ? (
            <p className="font-sans text-sm text-white/30">No inquiries yet.</p>
          ) : (
            <div className="space-y-2">
              {recentInquiries.map((inq) => (
                <div key={inq.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="font-sans text-sm text-white/80">{inq.name}</p>
                    <p className="font-sans text-[11px] text-white/30">{inq.property_name || "General"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {inq.status === "unread" && <span className="w-1.5 h-1.5 bg-gold rounded-full" />}
                    <span className="font-sans text-[11px] text-white/25">{timeAgo(inq.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] p-6" style={{ borderRadius: "10px" }}>
          <h2 className="font-serif text-base text-white mb-4">Upcoming Viewings</h2>
          {upcomingViewings.length === 0 ? (
            <p className="font-sans text-sm text-white/30">No pending viewings.</p>
          ) : (
            <div className="space-y-2">
              {upcomingViewings.map((v) => (
                <div key={v.id} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                  <div>
                    <p className="font-sans text-sm text-white/80">{v.name}</p>
                    <p className="font-sans text-[11px] text-white/30">{v.property_name || "General"}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-sans text-[11px] text-gold">{new Date(v.preferred_date).toLocaleDateString()}</p>
                    <p className="font-sans text-[11px] text-white/25 capitalize">{v.method?.replace("-", " ")}</p>
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
