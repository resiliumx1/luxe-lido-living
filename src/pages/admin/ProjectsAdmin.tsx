import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FolderKanban, Plus, Trash2, Upload, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import type { Database } from "@/integrations/supabase/types";

type Project = Database["public"]["Tables"]["projects"]["Row"];

export const PROJECT_STATUSES = [
  { key: "assessment", label: "Assessment" },
  { key: "design", label: "Design & quote" },
  { key: "approved", label: "Approved" },
  { key: "in_progress", label: "Under construction" },
  { key: "finishing", label: "Finishing" },
  { key: "handover", label: "Handed over" },
  { key: "on_hold", label: "On hold" },
];
const statusLabel = (s: string) => PROJECT_STATUSES.find((x) => x.key === s)?.label ?? s;
const progressFor = (s: string) => {
  const flow = ["assessment", "design", "approved", "in_progress", "finishing", "handover"];
  const i = flow.indexOf(s);
  return i < 0 ? 0 : Math.round(((i + 1) / flow.length) * 100);
};
const money = (n: number | null | undefined) => (n == null ? "—" : `US$${Number(n).toLocaleString()}`);
const field = "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground";

const ProjectsAdmin = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selected, setSelected] = useState<Project | null>(null);
  const [filter, setFilter] = useState("all");
  const [photoUrls, setPhotoUrls] = useState<Record<string, string>>({});
  const [uploading, setUploading] = useState(false);
  const [params, setParams] = useSearchParams();

  const load = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects(data || []);
    return data || [];
  };

  useEffect(() => {
    (async () => {
      const list = await load();
      const fromEnquiry = params.get("from");
      if (!fromEnquiry) return;
      const existing = list.find((p) => p.enquiry_id === fromEnquiry);
      if (existing) { setSelected(existing); }
      else {
        const { data: enq } = await supabase.from("enquiries").select("*").eq("id", fromEnquiry).maybeSingle();
        if (enq) {
          const q = (enq.qualification || {}) as Record<string, unknown>;
          const need = String(q.need_label || q.need || enq.property_name || "Project");
          const { data: created, error } = await supabase.from("projects").insert({
            enquiry_id: enq.id, title: `${need} — ${enq.name}`, client_name: enq.name, client_email: enq.email,
            client_phone: enq.phone, service_type: need, location: q.parish_or_area ? String(q.parish_or_area) : null,
            notes: enq.message, photo_paths: enq.photo_path ? [`enquiry:${enq.photo_path}`] : [],
          }).select().single();
          if (error) toast({ title: "Could not create project", description: error.message, variant: "destructive" });
          else { toast({ title: "Project created from enquiry" }); await load(); setSelected(created); }
        }
      }
      params.delete("from"); setParams(params, { replace: true });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // signed URLs for selected project's photos
  useEffect(() => {
    if (!selected) return;
    selected.photo_paths.forEach(async (p) => {
      if (photoUrls[p]) return;
      const [bucket, path] = p.startsWith("enquiry:") ? ["enquiry-photos", p.slice(8)] : ["project-photos", p];
      const { data } = await supabase.storage.from(bucket).createSignedUrl(path, 3600);
      if (data?.signedUrl) setPhotoUrls((u) => ({ ...u, [p]: data.signedUrl }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id, selected?.photo_paths.length]);

  const visible = useMemo(() => projects.filter((p) => filter === "all" || p.status === filter), [projects, filter]);

  const createBlank = async () => {
    const { data, error } = await supabase.from("projects").insert({ title: "New project", client_name: "Client name" }).select().single();
    if (error) return toast({ title: "Error", description: error.message, variant: "destructive" });
    await load(); setSelected(data);
  };

  const save = async () => {
    if (!selected) return;
    const { id, created_at, updated_at, ...rest } = selected;
    const { error } = await supabase.from("projects").update(rest).eq("id", id);
    if (error) return toast({ title: "Save failed", description: error.message, variant: "destructive" });
    toast({ title: "Project saved" }); load();
  };

  const remove = async () => {
    if (!selected || !confirm("Delete this project?")) return;
    await supabase.from("projects").delete().eq("id", selected.id);
    setSelected(null); load();
  };

  const upload = async (files: FileList | null) => {
    if (!selected || !files?.length) return;
    setUploading(true);
    const added: string[] = [];
    for (const file of Array.from(files)) {
      const path = `${selected.id}/${Date.now()}-${file.name.replace(/[^a-z0-9.]/gi, "_")}`;
      const { error } = await supabase.storage.from("project-photos").upload(path, file);
      if (!error) added.push(path);
    }
    const photo_paths = [...selected.photo_paths, ...added];
    await supabase.from("projects").update({ photo_paths }).eq("id", selected.id);
    setSelected({ ...selected, photo_paths }); setUploading(false); load();
  };

  const removePhoto = async (p: string) => {
    if (!selected) return;
    if (!p.startsWith("enquiry:")) await supabase.storage.from("project-photos").remove([p]);
    const photo_paths = selected.photo_paths.filter((x) => x !== p);
    await supabase.from("projects").update({ photo_paths }).eq("id", selected.id);
    setSelected({ ...selected, photo_paths }); load();
  };

  const set = <K extends keyof Project>(k: K, v: Project[K]) => selected && setSelected({ ...selected, [k]: v });
  const totalBudget = projects.reduce((s, p) => s + Number(p.budget_usd || 0), 0);
  const active = projects.filter((p) => !["handover", "on_hold"].includes(p.status)).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-foreground">Projects</h2>
          <p className="text-sm text-muted-foreground">{active} active · {projects.length} total · {money(totalBudget)} in budgets</p>
        </div>
        <Button onClick={createBlank}><Plus /> New project</Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {[{ key: "all", label: "All" }, ...PROJECT_STATUSES].map((s) => (
          <button key={s.key} onClick={() => setFilter(s.key)}
            className={`rounded-full border px-3 py-1 text-xs ${filter === s.key ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
        <div className="space-y-3">
          {visible.length === 0 && (
            <div className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              <FolderKanban className="mx-auto mb-2" /> No projects yet. Open an enquiry and choose “Start project”.
            </div>
          )}
          {visible.map((p) => (
            <button key={p.id} onClick={() => setSelected(p)}
              className={`w-full rounded-xl border bg-card p-4 text-left transition-colors ${selected?.id === p.id ? "border-primary" : "border-border hover:border-primary/50"}`}>
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-medium text-foreground">{p.title}</p>
                  <p className="text-xs text-muted-foreground">{p.client_name}{p.location ? ` · ${p.location}` : ""}</p>
                </div>
                <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-foreground">{statusLabel(p.status)}</span>
              </div>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-muted">
                <motion.div className="h-full bg-primary" initial={{ width: 0 }} animate={{ width: `${progressFor(p.status)}%` }} transition={{ duration: 0.6 }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">Budget {money(p.budget_usd)} · Spent {money(p.spent_usd)} · {p.photo_paths.length} photos</p>
            </button>
          ))}
        </div>

        {selected ? (
          <div className="space-y-4 rounded-xl border border-border bg-card p-5">
            <input className={`${field} font-serif text-lg`} value={selected.title} onChange={(e) => set("title", e.target.value)} aria-label="Project title" />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="text-xs text-muted-foreground">Client<input className={field} value={selected.client_name} onChange={(e) => set("client_name", e.target.value)} /></label>
              <label className="text-xs text-muted-foreground">Status
                <select className={field} value={selected.status} onChange={(e) => set("status", e.target.value)}>
                  {PROJECT_STATUSES.map((s) => <option key={s.key} value={s.key}>{s.label}</option>)}
                </select>
              </label>
              <label className="text-xs text-muted-foreground">Email<input className={field} value={selected.client_email || ""} onChange={(e) => set("client_email", e.target.value)} /></label>
              <label className="text-xs text-muted-foreground">Phone<input className={field} value={selected.client_phone || ""} onChange={(e) => set("client_phone", e.target.value)} /></label>
              <label className="text-xs text-muted-foreground">Service<input className={field} value={selected.service_type || ""} onChange={(e) => set("service_type", e.target.value)} /></label>
              <label className="text-xs text-muted-foreground">Location<input className={field} value={selected.location || ""} onChange={(e) => set("location", e.target.value)} /></label>
              <label className="text-xs text-muted-foreground">Budget (US$)<input type="number" className={field} value={selected.budget_usd ?? ""} onChange={(e) => set("budget_usd", e.target.value === "" ? null : Number(e.target.value))} /></label>
              <label className="text-xs text-muted-foreground">Spent so far (US$)<input type="number" className={field} value={selected.spent_usd ?? 0} onChange={(e) => set("spent_usd", Number(e.target.value || 0))} /></label>
              <label className="text-xs text-muted-foreground">Start date<input type="date" className={field} value={selected.start_date || ""} onChange={(e) => set("start_date", e.target.value || null)} /></label>
              <label className="text-xs text-muted-foreground">Target handover<input type="date" className={field} value={selected.target_date || ""} onChange={(e) => set("target_date", e.target.value || null)} /></label>
            </div>
            {selected.budget_usd ? (
              <div>
                <p className="mb-1 text-xs text-muted-foreground">Budget used: {Math.round((Number(selected.spent_usd) / Number(selected.budget_usd)) * 100)}%</p>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full ${Number(selected.spent_usd) > Number(selected.budget_usd) ? "bg-destructive" : "bg-primary"}`} style={{ width: `${Math.min(100, (Number(selected.spent_usd) / Number(selected.budget_usd)) * 100)}%` }} />
                </div>
              </div>
            ) : null}
            <label className="block text-xs text-muted-foreground">Notes & updates<textarea rows={5} className={field} value={selected.notes || ""} onChange={(e) => set("notes", e.target.value)} /></label>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Site photos</p>
                <label className="inline-flex cursor-pointer items-center gap-1 text-xs text-primary hover:underline">
                  <Upload size={12} /> {uploading ? "Uploading…" : "Add photos"}
                  <input type="file" accept="image/*" multiple className="hidden" onChange={(e) => upload(e.target.files)} />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {selected.photo_paths.map((p) => (
                  <div key={p} className="group relative aspect-square overflow-hidden rounded-md bg-muted">
                    {photoUrls[p] && <a href={photoUrls[p]} target="_blank" rel="noreferrer"><img src={photoUrls[p]} alt="Project site photo" className="h-full w-full object-cover" loading="lazy" /></a>}
                    <button onClick={() => removePhoto(p)} aria-label="Remove photo" className="absolute right-1 top-1 rounded-full bg-background/90 p-1 text-foreground opacity-0 group-hover:opacity-100"><X size={12} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between border-t border-border pt-4">
              <Button variant="ghost" onClick={remove}><Trash2 /> Delete</Button>
              <Button onClick={save}><Save /> Save project</Button>
            </div>
          </div>
        ) : (
          <div className="hidden items-center justify-center rounded-xl border border-dashed border-border p-8 text-sm text-muted-foreground lg:flex">Select a project to see its details</div>
        )}
      </div>
    </div>
  );
};

export default ProjectsAdmin;
