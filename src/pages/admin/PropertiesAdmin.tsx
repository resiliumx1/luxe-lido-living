import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface PropertyRow {
  id: string;
  name: string;
  area: string;
  price: string;
  status: string;
  type: string;
  beds: number;
  baths: number;
  sqft: string | null;
  description: string;
  features: string[];
  image_urls: string[];
  featured: boolean;
  new_listing: boolean;
  google_maps_url: string | null;
  virtual_tour_url: string | null;
  category_href: string;
}

const emptyProperty: Omit<PropertyRow, "id"> = {
  name: "", area: "", price: "", status: "active", type: "luxury",
  beds: 0, baths: 0, sqft: "", description: "", features: [],
  image_urls: [], featured: false, new_listing: false,
  google_maps_url: "", virtual_tour_url: "", category_href: "/luxury-homes",
};

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PropertyRow | null>(null);
  const [form, setForm] = useState<Omit<PropertyRow, "id">>(emptyProperty);
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    setProperties((data as PropertyRow[]) || []);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm(emptyProperty);
    setModalOpen(true);
  };

  const openEdit = (p: PropertyRow) => {
    setEditing(p);
    setForm({ ...p });
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    await supabase.from("properties").delete().eq("id", id);
    toast({ title: "Property deleted" });
    fetchProperties();
  };

  const handleSave = async () => {
    setSaving(true);
    if (editing) {
      await supabase.from("properties").update(form).eq("id", editing.id);
      toast({ title: "Property updated" });
    } else {
      await supabase.from("properties").insert(form);
      toast({ title: "Property created" });
    }
    setSaving(false);
    setModalOpen(false);
    fetchProperties();
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...form.features, featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => {
    setForm({ ...form, features: form.features.filter((_, idx) => idx !== i) });
  };

  const statusColors: Record<string, string> = {
    active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    sold: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    "off-market": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
    "coming-soon": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-foreground">Properties</h2>
        <button onClick={openNew} className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 font-sans text-sm font-medium transition-colors hover:opacity-90" style={{ borderRadius: "8px" }}>
          <Plus size={16} /> Add New Property
        </button>
      </div>

      <div className="bg-card border border-border overflow-hidden" style={{ borderRadius: "12px" }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground hidden md:table-cell">Area</th>
              <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 font-sans font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="text-right px-4 py-3 font-sans font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : properties.length === 0 ? (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No properties yet. Click "Add New Property" to get started.</td></tr>
            ) : properties.map((p) => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/30 cursor-pointer" onClick={() => openEdit(p)}>
                <td className="px-4 py-3 font-sans font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.area}</td>
                <td className="px-4 py-3 text-primary font-medium">{p.price}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[p.status] || statusColors.active}`}>
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openEdit(p)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive transition-colors ml-1" aria-label="Delete"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} />
          <div className="relative bg-card w-full max-w-lg p-6 space-y-4" style={{ borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.18)" }}>
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl text-foreground">{editing ? "Edit Property" : "New Property"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground"><X size={20} /></button>
            </div>

            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <label className="text-label block mb-1">Name *</label>
                <input className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label block mb-1">Area *</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })}>
                    <option value="">Select</option>
                    <option>English Harbour</option><option>Jolly Harbour</option><option>Dickenson Bay</option><option>Galley Bay</option><option>Hodges Bay</option><option>Half Moon Bay</option><option>St. John's</option>
                  </select>
                </div>
                <div>
                  <label className="text-label block mb-1">Type *</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="luxury">Luxury</option><option value="container">Container</option><option value="prefab">Prefab</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-label block mb-1">Price *</label>
                  <input className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="$1,200,000" />
                </div>
                <div>
                  <label className="text-label block mb-1">Beds</label>
                  <input type="number" className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.beds} onChange={(e) => setForm({ ...form, beds: +e.target.value })} />
                </div>
                <div>
                  <label className="text-label block mb-1">Baths</label>
                  <input type="number" className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.baths} onChange={(e) => setForm({ ...form, baths: +e.target.value })} />
                </div>
              </div>
              <div>
                <label className="text-label block mb-1">Sq Ft</label>
                <input className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.sqft || ""} onChange={(e) => setForm({ ...form, sqft: e.target.value })} />
              </div>
              <div>
                <label className="text-label block mb-1">Description *</label>
                <textarea className="w-full px-3 py-2 bg-background border border-input text-foreground text-sm min-h-[80px]" style={{ borderRadius: "6px" }} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="text-label block mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input className="flex-1 h-9 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} placeholder="Add feature and press Enter" />
                  <button onClick={addFeature} className="px-3 h-9 bg-primary/10 text-primary text-xs font-medium" style={{ borderRadius: "6px" }}>Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.features.map((f, i) => (
                    <span key={i} className="flex items-center gap-1 bg-muted text-foreground px-2 py-0.5 text-xs" style={{ borderRadius: "4px" }}>
                      {f} <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-foreground"><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-label block mb-1">Status</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm" style={{ borderRadius: "6px" }} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="active">Active</option><option value="sold">Sold</option><option value="off-market">Off Market</option><option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
                <div className="space-y-2 pt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[hsl(var(--primary))]" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                    <input type="checkbox" checked={form.new_listing} onChange={(e) => setForm({ ...form, new_listing: e.target.checked })} className="accent-[hsl(var(--primary))]" /> New Listing
                  </label>
                </div>
              </div>
            </div>

            <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="w-full bg-primary text-primary-foreground font-sans font-medium text-sm py-3 transition-all hover:opacity-90 disabled:opacity-50" style={{ borderRadius: "8px" }}>
              {saving ? "Saving..." : editing ? "Save Changes" : "Create Property"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
