import { useEffect, useState } from "react";
import { MessageSquare, Calendar, Users, Mail, ExternalLink, ChevronDown, ChevronUp, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];
type Viewing = Database["public"]["Tables"]["viewings"]["Row"];
type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Tab = "enquiries" | "viewings" | "leads";

export default function InquiriesAdmin() {
  const [tab, setTab] = useState<Tab>("enquiries");
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [viewings, setViewings] = useState<Viewing[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    const [enq, view, lead] = await Promise.all([
      supabase.from("enquiries").select("*").order("created_at", { ascending: false }),
      supabase.from("viewings").select("*").order("created_at", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
    ]);
    setEnquiries(enq.data || []);
    setViewings(view.data || []);
    setLeads(lead.data || []);
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  useEffect(() => {
    const channel = supabase
      .channel("admin-inquiries")
      .on("postgres_changes" as any, { event: "INSERT", schema: "public", table: "enquiries" }, (payload: any) => {
        setEnquiries((prev) => [payload.new as Enquiry, ...prev]);
        toast({ title: `New enquiry from ${payload.new.name}` });
      })
      .on("postgres_changes" as any, { event: "INSERT", schema: "public", table: "viewings" }, (payload: any) => {
        setViewings((prev) => [payload.new as Viewing, ...prev]);
        toast({ title: `New viewing from ${payload.new.name}` });
      })
      .on("postgres_changes" as any, { event: "INSERT", schema: "public", table: "leads" }, (payload: any) => {
        setLeads((prev) => [payload.new as Lead, ...prev]);
        toast({ title: "New email lead" });
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const updateEnquiryStatus = async (id: string, status: string) => {
    await supabase.from("enquiries").update({ status }).eq("id", id);
    fetchAll();
    toast({ title: "Status updated" });
  };

  const updateViewingStatus = async (id: string, status: string) => {
    await supabase.from("viewings").update({ status }).eq("id", id);
    fetchAll();
    toast({ title: "Status updated" });
  };

  const updateLeadStatus = async (id: string, status: string) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    fetchAll();
    toast({ title: "Status updated" });
  };

  const exportLeadsCsv = () => {
    const csv = ["Email,Source,Date,Status", ...leads.map((l) =>
      `${l.email},${l.source},${new Date(l.created_at || "").toLocaleDateString()},${l.status}`
    )].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "leads.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: "enquiries" as Tab, label: "Enquiries", count: enquiries.filter((e) => e.status === "unread").length, icon: MessageSquare },
    { key: "viewings" as Tab, label: "Viewings", count: viewings.filter((v) => v.status === "pending").length, icon: Calendar },
    { key: "leads" as Tab, label: "Leads", count: leads.length, icon: Users },
  ];

  const statusBadge = (status: string | null) => {
    const s = status || "new";
    const colors: Record<string, string> = {
      unread: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      read: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      replied: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      pending: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
      confirmed: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      completed: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      new: "bg-primary/10 text-primary",
      contacted: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    };
    return <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${colors[s] || colors.new}`}>{s}</span>;
  };

  if (loading) return <div className="text-muted-foreground">Loading inquiries...</div>;

  return (
    <div className="space-y-6">
      <div className="flex gap-2 border-b border-border pb-0">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 px-4 py-2.5 font-sans text-sm border-b-2 -mb-px transition-colors ${
              tab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>
            <t.icon size={16} /> {t.label}
            {t.count > 0 && <span className="bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded-full font-bold">{t.count}</span>}
          </button>
        ))}
      </div>

      {tab === "enquiries" && (
        <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: "12px" }}>
          {enquiries.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground text-sm">No enquiries yet.</p>
          ) : enquiries.map((enq) => (
            <div key={enq.id} className="border-b border-border last:border-0">
              <button onClick={() => setExpandedId(expandedId === enq.id ? null : enq.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left">
                <div className="flex items-center gap-3">
                  {enq.status === "unread" && <span className="w-2 h-2 bg-primary rounded-full shrink-0" />}
                  <div>
                    <p className="font-sans text-sm font-medium text-foreground">{enq.name}</p>
                    <p className="font-sans text-xs text-muted-foreground">{enq.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(enq.status)}
                  <span className="text-xs text-muted-foreground">{new Date(enq.created_at || "").toLocaleDateString()}</span>
                  {expandedId === enq.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>
              {expandedId === enq.id && (
                <div className="px-4 pb-4 space-y-3 bg-muted/10">
                  {enq.property_name && <p className="text-sm"><strong>Property:</strong> {enq.property_name}</p>}
                  <p className="text-sm text-foreground">{enq.message}</p>
                  <div className="flex flex-wrap gap-2">
                    <a href={`mailto:${enq.email}`} className="flex items-center gap-1 text-xs text-primary hover:underline"><Mail size={12} /> Reply via Email</a>
                    {enq.status !== "replied" && (
                      <button onClick={() => updateEnquiryStatus(enq.id, "replied")} className="text-xs text-primary hover:underline">Mark Replied</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "viewings" && (
        <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: "12px" }}>
          {viewings.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground text-sm">No viewing requests yet.</p>
          ) : viewings.map((v) => (
            <div key={v.id} className="border-b border-border last:border-0">
              <button onClick={() => setExpandedId(expandedId === v.id ? null : v.id)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors text-left">
                <div>
                  <p className="font-sans text-sm font-medium text-foreground">{v.name}</p>
                  <p className="font-sans text-xs text-muted-foreground">{v.property_name || "General"} · {v.method?.replace("-", " ")}</p>
                </div>
                <div className="flex items-center gap-3">
                  {statusBadge(v.status)}
                  <span className="text-xs text-primary font-medium">{new Date(v.preferred_date).toLocaleDateString()}</span>
                  {expandedId === v.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </div>
              </button>
              {expandedId === v.id && (
                <div className="px-4 pb-4 space-y-3 bg-muted/10">
                  <p className="text-sm"><strong>Email:</strong> {v.email} · <strong>WhatsApp:</strong> {v.whatsapp}</p>
                  {v.message && <p className="text-sm">{v.message}</p>}
                  <div className="flex flex-wrap gap-2">
                    <select value={v.status || "pending"} onChange={(e) => updateViewingStatus(v.id, e.target.value)}
                      className="text-xs bg-background border border-input px-2 py-1 text-foreground" style={{ borderRadius: "4px" }}>
                      <option value="pending">Pending</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option>
                    </select>
                    <a href={`https://wa.me/${v.whatsapp?.replace(/\D/g, "")}?text=Hi ${v.name}, your viewing is confirmed!`}
                      target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                      <ExternalLink size={12} className="inline mr-1" />Confirm via WhatsApp
                    </a>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {tab === "leads" && (
        <div>
          <div className="flex justify-end mb-3">
            <button onClick={exportLeadsCsv} className="flex items-center gap-1.5 text-sm text-primary hover:underline font-sans">
              <Download size={14} /> Export CSV
            </button>
          </div>
          <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: "12px" }}>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">Email</th>
                  <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground hidden sm:table-cell">Source</th>
                  <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">Date</th>
                  <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.length === 0 ? (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-muted-foreground">No leads yet.</td></tr>
                ) : leads.map((l) => (
                  <tr key={l.id} className="border-b border-border">
                    <td className="px-4 py-3 text-foreground">{l.email}</td>
                    <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">{l.source}</td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(l.created_at || "").toLocaleDateString()}</td>
                    <td className="px-4 py-3">
                      <select value={l.status || "new"} onChange={(e) => updateLeadStatus(l.id, e.target.value)}
                        className="text-xs bg-background border border-input px-2 py-1 text-foreground" style={{ borderRadius: "4px" }}>
                        <option value="new">New</option><option value="contacted">Contacted</option><option value="converted">Converted</option><option value="unsubscribed">Unsubscribed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
