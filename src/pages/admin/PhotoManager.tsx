import { useState, useEffect, useRef } from "react";
import { Upload, Check, X, Image as ImageIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface UploadSlot {
  key: string;
  label: string;
  storagePath: string;
}

const heroSlots: UploadSlot[] = [
  { key: "hero_image", label: "Hero Background", storagePath: "hero/hero-bg" },
];

const agentSlots: UploadSlot[] = [
  { key: "agent_photo", label: "Agent Portrait", storagePath: "agent/ashante-portrait" },
];

const lifestyleSlots: UploadSlot[] = [
  { key: "lifestyle_image_1", label: "Lifestyle Image 1", storagePath: "lifestyle/lifestyle-1" },
  { key: "lifestyle_image_2", label: "Lifestyle Image 2", storagePath: "lifestyle/lifestyle-2" },
  { key: "lifestyle_image_3", label: "Lifestyle Image 3", storagePath: "lifestyle/lifestyle-3" },
];

const neighborhoodSlots: UploadSlot[] = [
  { key: "neighborhood_english-harbour_image", label: "English Harbour", storagePath: "neighborhoods/english-harbour" },
  { key: "neighborhood_jolly-harbour_image", label: "Jolly Harbour", storagePath: "neighborhoods/jolly-harbour" },
  { key: "neighborhood_dickenson-bay_image", label: "Dickenson Bay", storagePath: "neighborhoods/dickenson-bay" },
  { key: "neighborhood_galley-bay_image", label: "Galley Bay", storagePath: "neighborhoods/galley-bay" },
  { key: "neighborhood_hodges-bay_image", label: "Hodges Bay", storagePath: "neighborhoods/hodges-bay" },
];

const bannerSlots: UploadSlot[] = [
  { key: "about_banner", label: "About Page Banner", storagePath: "banners/about" },
  { key: "contact_banner", label: "Contact Page Banner", storagePath: "banners/contact" },
];

function ImageUploadZone({ slot, currentUrl, onSuccess }: { slot: UploadSlot; currentUrl: string; onSuccess: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB allowed.", variant: "destructive" });
      return;
    }

    const ext = file.name.split(".").pop() || "jpg";
    const path = `${slot.storagePath}.${ext}`;

    setUploading(true);
    setProgress(30);

    const { error: uploadError } = await supabase.storage
      .from("site-images")
      .upload(path, file, { upsert: true, contentType: file.type });

    if (uploadError) {
      toast({ title: "Upload failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    setProgress(70);
    const { data: urlData } = supabase.storage.from("site-images").getPublicUrl(path);
    const publicUrl = urlData.publicUrl + `?t=${Date.now()}`;

    await supabase.from("site_settings").upsert({ key: slot.key, value: publicUrl });

    setProgress(100);
    onSuccess(publicUrl);
    toast({ title: "Image updated", description: `${slot.label} has been updated.` });
    setTimeout(() => { setUploading(false); setProgress(0); }, 500);
  };

  return (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-0">
      <div className="w-32 h-20 bg-muted flex items-center justify-center overflow-hidden shrink-0" style={{ borderRadius: "8px" }}>
        {currentUrl ? (
          <img src={currentUrl} alt={slot.label} className="w-full h-full object-cover" />
        ) : (
          <ImageIcon size={24} className="text-muted-foreground" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-sans text-sm font-medium text-foreground">{slot.label}</p>
        {currentUrl && <p className="text-xs text-muted-foreground truncate mt-0.5">{currentUrl}</p>}
        {uploading && (
          <div className="w-full h-1.5 bg-muted mt-2" style={{ borderRadius: "4px" }}>
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${progress}%`, borderRadius: "4px" }} />
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0]); }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="shrink-0 flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 font-sans text-xs font-medium hover:bg-primary/20 transition-colors disabled:opacity-50"
        style={{ borderRadius: "6px" }}
      >
        <Upload size={14} /> Upload
      </button>
    </div>
  );
}

export default function PhotoManager() {
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      if (data) {
        const map: Record<string, string> = {};
        data.forEach((r: { key: string; value: string }) => { if (r.value) map[r.key] = r.value; });
        setSettings(map);
      }
    };
    fetch();
  }, []);

  const handleSuccess = (key: string, url: string) => {
    setSettings((prev) => ({ ...prev, [key]: url }));
  };

  const sections = [
    { title: "Hero Background", slots: heroSlots },
    { title: "Agent Photo", slots: agentSlots },
    { title: "Lifestyle Images (Why Antigua)", slots: lifestyleSlots },
    { title: "Neighborhood Cards", slots: neighborhoodSlots },
    { title: "Page Banners", slots: bannerSlots },
  ];

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="font-serif text-2xl text-foreground mb-1">Photo Manager</h2>
        <p className="text-sm text-muted-foreground">Update images across every section of the site.</p>
      </div>

      {sections.map((section) => (
        <div key={section.title} className="bg-card border border-border p-6" style={{ borderRadius: "12px" }}>
          <h3 className="font-serif text-lg text-foreground mb-4">{section.title}</h3>
          {section.slots.map((slot) => (
            <ImageUploadZone
              key={slot.key}
              slot={slot}
              currentUrl={settings[slot.key] || ""}
              onSuccess={(url) => handleSuccess(slot.key, url)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
