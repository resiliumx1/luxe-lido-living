import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Star, Image } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
type PropertyInsert = Database["public"]["Tables"]["properties"]["Insert"];

const emptyForm: PropertyInsert = {
  name: "", area: "", price: "", location: "", type: "luxury",
  beds: 0, baths: 0, sqft: "", description: "", features: [],
  image_urls: [], featured: false, new_listing: false, status: "active",
  google_maps_url: "", virtual_tour_url: "", category_href: "/luxury-homes",
};

const statusColors: Record<string, string> = {
  active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  sold: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  "off-market": "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  "coming-soon": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
};

const typeColors: Record<string, string> = {
  luxury: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
  container: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-400",
  prefab: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
};

export default function PropertiesAdmin() {
  const [properties, setProperties] = useState<PropertyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PropertyInsert>({ ...emptyForm });
  const [featureInput, setFeatureInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchProperties = async () => {
    const { data } = await supabase.from("properties").select("*").order("created_at", { ascending: false });
    setProperties(data || []);
    setLoading(false);
  };

  useEffect(() => { fetchProperties(); }, []);

  const openNew = () => { setEditingId(null); setForm({ ...emptyForm }); setFeatureInput(""); setModalOpen(true); };

  const openEdit = (p: PropertyRow) => {
    setEditingId(p.id);
    setForm({
      name: p.name, area: p.area, price: p.price, location: p.location, type: p.type,
      beds: p.beds, baths: p.baths, sqft: p.sqft, description: p.description,
      features: p.features || [], image_urls: p.image_urls || [],
      featured: p.featured, new_listing: p.new_listing, status: p.status,
      google_maps_url: p.google_maps_url, virtual_tour_url: p.virtual_tour_url,
      category_href: p.category_href,
    });
    setFeatureInput("");
    setModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this property? This cannot be undone.")) return;
    await supabase.from("properties").delete().eq("id", id);
    toast({ title: "Property deleted" });
    fetchProperties();
  };

  const toggleFeatured = async (id: string, current: boolean | null) => {
    await supabase.from("properties").update({ featured: !current }).eq("id", id);
    fetchProperties();
  };

  const handleSave = async () => {
    setSaving(true);
    const data = { ...form, location: form.location || form.area };
    if (editingId) {
      await supabase.from("properties").update(data).eq("id", editingId);
      toast({ title: "Property updated" });
    } else {
      await supabase.from("properties").insert(data);
      toast({ title: "Property created" });
    }
    setSaving(false);
    setModalOpen(false);
    fetchProperties();
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setForm({ ...form, features: [...(form.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (i: number) => {
    setForm({ ...form, features: (form.features || []).filter((_, idx) => idx !== i) });
  };

  const formatPrice = (price: string) => {
    const num = parseInt(price.replace(/[^0-9]/g, ""));
    if (isNaN(num)) return price;
    return "$" + num.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl text-foreground">Properties</h2>
          <p className="font-body text-sm text-muted-foreground mt-1">{properties.length} total listings</p>
        </div>
        <button onClick={openNew} className="gold-shimmer-hover flex items-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white px-5 py-2.5 font-body text-sm font-semibold tracking-wider uppercase transition-all rounded-xl hover:shadow-lg hover:shadow-luxury-gold/20">
          <Plus size={16} /> Add Property
        </button>
      </div>

      <div className="bg-card border border-border overflow-hidden rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground w-10"></th>
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">Property</th>
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground hidden md:table-cell">Location</th>
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground">Price</th>
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground hidden sm:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-body font-medium text-muted-foreground hidden sm:table-cell">Status</th>
              <th className="text-center px-4 py-3 font-body font-medium text-muted-foreground hidden md:table-cell">★</th>
              <th className="text-right px-4 py-3 font-body font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
            ) : properties.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">No properties yet. Click "Add Property" to get started.</td></tr>
            ) : properties.map((p) => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => openEdit(p)}>
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                    {p.image_urls && p.image_urls.length > 0 ? (
                      <img src={p.image_urls[0]} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Image size={16} className="text-muted-foreground" />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 font-body font-medium text-foreground">{p.name}</td>
                <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">{p.area}</td>
                <td className="px-4 py-3 text-luxury-gold font-semibold">{formatPrice(p.price)}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeColors[p.type] || "bg-muted text-muted-foreground"}`}>{p.type}</span>
                </td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[p.status || "active"]}`}>{p.status}</span>
                </td>
                <td className="px-4 py-3 text-center hidden md:table-cell" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => toggleFeatured(p.id, p.featured)} className={`p-1 transition-colors ${p.featured ? "text-luxury-gold" : "text-muted-foreground/30 hover:text-luxury-gold/50"}`} aria-label="Toggle featured">
                    <Star size={16} fill={p.featured ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="px-4 py-3 text-right" onClick={(e) => e.stopPropagation()}>
                  <button onClick={() => openEdit(p)} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors" aria-label="Edit"><Pencil size={14} /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 text-muted-foreground hover:text-destructive ml-1 transition-colors" aria-label="Delete"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 overflow-y-auto">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative bg-card w-full max-w-lg p-6 space-y-4 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-xl text-foreground">{editingId ? "Edit Property" : "New Property"}</h3>
              <button onClick={() => setModalOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X size={20} /></button>
            </div>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              <Field label="Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs font-medium text-muted-foreground mb-1">Area *</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm rounded-lg" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value, location: e.target.value })}>
                    <option value="">Select</option>
                    <option>English Harbour</option><option>Jolly Harbour</option><option>Dickenson Bay</option><option>Galley Bay</option><option>Hodges Bay</option><option>Half Moon Bay</option><option>St. John's</option><option>Darkwood Beach</option><option>Fig Tree Drive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-body text-xs font-medium text-muted-foreground mb-1">Type *</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm rounded-lg" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
                    <option value="luxury">Luxury</option><option value="container">Container</option><option value="prefab">Prefab</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="Price *" value={form.price} onChange={(v) => setForm({ ...form, price: v })} placeholder="$1,200,000" />
                <Field label="Beds" value={String(form.beds ?? 0)} onChange={(v) => setForm({ ...form, beds: +v })} type="number" />
                <Field label="Baths" value={String(form.baths ?? 0)} onChange={(v) => setForm({ ...form, baths: +v })} type="number" />
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-muted-foreground mb-1">Description</label>
                <textarea className="w-full px-3 py-2 bg-background border border-input text-foreground text-sm min-h-[80px] rounded-lg" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
              </div>
              <div>
                <label className="block font-body text-xs font-medium text-muted-foreground mb-1">Features</label>
                <div className="flex gap-2 mb-2">
                  <input className="flex-1 h-9 px-3 bg-background border border-input text-foreground text-sm rounded-lg" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addFeature(); } }} placeholder="Type and press Enter" />
                  <button onClick={addFeature} className="px-3 h-9 bg-luxury-gold/10 text-luxury-gold text-xs font-medium rounded-lg">Add</button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(form.features || []).map((f, i) => (
                    <span key={i} className="flex items-center gap-1 bg-muted text-foreground px-2 py-0.5 text-xs rounded">
                      {f} <button onClick={() => removeFeature(i)} className="text-muted-foreground hover:text-foreground"><X size={12} /></button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-body text-xs font-medium text-muted-foreground mb-1">Status</label>
                  <select className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm rounded-lg" value={form.status || "active"} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                    <option value="active">Active</option><option value="sold">Sold</option><option value="off-market">Off Market</option><option value="coming-soon">Coming Soon</option>
                  </select>
                </div>
                <div className="space-y-2 pt-5">
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-body">
                    <input type="checkbox" checked={!!form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} className="accent-[hsl(var(--luxury-gold))]" /> Featured
                  </label>
                  <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer font-body">
                    <input type="checkbox" checked={!!form.new_listing} onChange={(e) => setForm({ ...form, new_listing: e.target.checked })} className="accent-[hsl(var(--luxury-gold))]" /> New Listing
                  </label>
                </div>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving || !form.name || !form.price} className="gold-shimmer-hover w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-wider uppercase py-3 rounded-xl hover:shadow-lg hover:shadow-luxury-gold/20 disabled:opacity-50 transition-all">
              {saving ? "Saving..." : editingId ? "Save Changes" : "Create Property"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; type?: string }) {
  return (
    <div>
      <label className="block font-body text-xs font-medium text-muted-foreground mb-1">{label}</label>
      <input type={type} className="w-full h-10 px-3 bg-background border border-input text-foreground text-sm rounded-lg" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </div>
  );
}
