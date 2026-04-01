import { useState } from "react";
import { MessageSquare, Phone, Mail } from "lucide-react";

type InquiryStatus = "new" | "contacted" | "qualified" | "closed";

interface ContainerInquiry {
  id: string;
  name: string;
  status: InquiryStatus;
  package: string;
  unit: string;
  source: string;
  date: string;
  message: string;
  whatsapp: string;
  email: string;
}

const mockInquiries: ContainerInquiry[] = [
  {
    id: "1",
    name: "Michael Patterson",
    status: "new",
    package: "Full-Service",
    unit: "2 Bedroom",
    source: "WhatsApp",
    date: "2026-03-28",
    message: "Hi, I'm interested in the Full-Service 2BR package. I have land in Jolly Harbour. When can we discuss?",
    whatsapp: "+12681234567",
    email: "michael.p@email.com",
  },
  {
    id: "2",
    name: "Denise Williams",
    status: "contacted",
    package: "Self-Service",
    unit: "1 Bedroom",
    source: "Website",
    date: "2026-03-25",
    message: "Looking for a starter container home for my property near English Harbour.",
    whatsapp: "+12689876543",
    email: "denise.w@email.com",
  },
  {
    id: "3",
    name: "Robert Chen",
    status: "qualified",
    package: "Premium",
    unit: "Expanded 2-Container",
    source: "Referral",
    date: "2026-03-20",
    message: "Interested in the premium expanded container home. Budget is flexible. Would like a custom layout.",
    whatsapp: "+8521234567",
    email: "robert.chen@email.com",
  },
  {
    id: "4",
    name: "Keisha Thomas",
    status: "new",
    package: "Business",
    unit: "Cafe Container",
    source: "WhatsApp",
    date: "2026-03-30",
    message: "I want to open a container cafe near Dickenson Bay. What are my options?",
    whatsapp: "+12685551234",
    email: "keisha.t@email.com",
  },
];

const statusColors: Record<InquiryStatus, string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-amber-100 text-amber-800",
  qualified: "bg-green-100 text-green-800",
  closed: "bg-gray-100 text-gray-600",
};

export default function AdminContainers() {
  const [filter, setFilter] = useState<"all" | InquiryStatus>("all");
  const [search, setSearch] = useState("");

  const filtered = mockInquiries.filter((inq) => {
    if (filter !== "all" && inq.status !== filter) return false;
    if (search && !inq.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: mockInquiries.length,
    new: mockInquiries.filter((i) => i.status === "new").length,
    contacted: mockInquiries.filter((i) => i.status === "contacted").length,
    qualified: mockInquiries.filter((i) => i.status === "qualified").length,
  };

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Inquiries", value: stats.total },
          { label: "New Leads", value: stats.new },
          { label: "Contacted", value: stats.contacted },
          { label: "Qualified", value: stats.qualified },
        ].map((s) => (
          <div key={s.label} className="bg-card border border-border p-5 rounded-lg">
            <p className="font-sans text-xs text-muted-foreground tracking-wider uppercase mb-1">{s.label}</p>
            <p className="font-serif text-3xl text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {(["all", "new", "contacted", "qualified", "closed"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`font-sans text-xs tracking-wider uppercase px-4 py-2 rounded-md transition-colors ${
              filter === tab
                ? "bg-primary text-primary-foreground"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto font-sans text-sm px-4 py-2 bg-card border border-border rounded-md text-foreground placeholder:text-muted-foreground w-60"
        />
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {filtered.map((inq) => (
          <div key={inq.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
              <div>
                <h3 className="font-serif text-lg text-foreground">{inq.name}</h3>
                <p className="font-sans text-xs text-muted-foreground">
                  {inq.package} — {inq.unit} · via {inq.source} · {inq.date}
                </p>
              </div>
              <span className={`font-sans text-[10px] font-bold tracking-wider uppercase px-3 py-1 rounded-full ${statusColors[inq.status]}`}>
                {inq.status}
              </span>
            </div>
            <p className="font-sans text-sm text-muted-foreground mb-4 leading-relaxed">{inq.message}</p>
            <div className="flex items-center gap-3">
              <a
                href={`https://wa.me/${inq.whatsapp.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-green-700 bg-green-50 px-3 py-1.5 rounded-md hover:bg-green-100 transition-colors"
              >
                <Phone size={12} /> WhatsApp
              </a>
              <a
                href={`mailto:${inq.email}`}
                className="inline-flex items-center gap-1.5 font-sans text-xs font-medium text-blue-700 bg-blue-50 px-3 py-1.5 rounded-md hover:bg-blue-100 transition-colors"
              >
                <Mail size={12} /> Email
              </a>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <MessageSquare size={40} className="mx-auto text-muted-foreground/30 mb-3" />
            <p className="font-sans text-sm text-muted-foreground">No inquiries match your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
