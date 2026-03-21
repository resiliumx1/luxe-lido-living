import { useState } from "react";
import { X, CheckCircle, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { OptionSelector } from "./ui/OptionSelector";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

const methodOptions = [
  { value: "in-person", label: "In-person" },
  { value: "video-call", label: "Video call" },
  { value: "whatsapp-tour", label: "WhatsApp live tour" },
];

export default function BookingModal({ isOpen, onClose, propertyName }: BookingModalProps) {
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", method: "in-person", date: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from("viewings").insert({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      method: form.method,
      preferred_date: form.date,
      message: form.message || null,
      property_name: propertyName || null,
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", whatsapp: "", method: "in-person", date: "", message: "" });
    }, 300);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  const inputClass = "w-full bg-card border-[1.5px] border-sand dark:border-muted px-4 py-3 outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground transition-all focus:border-primary focus:ring-2 focus:ring-ring/20";
  const inputStyle = { borderRadius: "8px" };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/55" onClick={handleClose} />
      <div className="relative bg-card dark:bg-card w-full max-w-[480px] max-h-[90vh] overflow-y-auto p-8" style={{ borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.18)" }}>
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Close">
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-5 py-8">
            <CheckCircle size={56} className="text-primary" />
            <h3 className="font-serif text-2xl text-foreground">Viewing Requested</h3>
            <p className="font-sans text-muted-foreground text-sm max-w-sm">
              Ashante will confirm your viewing within 2 hours.
              {propertyName && <span className="block mt-2 text-primary font-medium">{propertyName}</span>}
            </p>
            <button onClick={handleClose} className="mt-4 border border-primary text-primary font-sans small-caps tracking-widest text-sm px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-eyebrow mb-2">Book a Viewing</p>
              <h3 className="font-serif text-2xl text-foreground">{propertyName || "Schedule a Private Consultation"}</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-label block mb-2 text-foreground">Full Name <span className="text-primary">*</span></label>
                <input type="text" required placeholder="Your full name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-label block mb-2 text-foreground">Email <span className="text-primary">*</span></label>
                <input type="email" required placeholder="you@email.com" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-label block mb-2 text-foreground">WhatsApp Number <span className="text-primary">*</span></label>
                <input type="tel" required placeholder="+1 (268) ..." value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="text-label block mb-2 text-foreground">Viewing Preference</label>
                <OptionSelector name="method" options={methodOptions} value={form.method} onChange={(v) => setForm({ ...form, method: v })} />
              </div>
              <div>
                <label className="text-label block mb-2 text-foreground">Preferred Date</label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                  <input type="date" min={minDate} value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className={`${inputClass} pl-10`} style={inputStyle} />
                </div>
              </div>
              <div>
                <label className="text-label block mb-2 text-foreground">Message</label>
                <textarea rows={3} placeholder="Any specific questions..." value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className={`${inputClass} resize-none`} style={inputStyle} />
              </div>
              <button type="submit" disabled={submitting}
                className="cta-shimmer w-full bg-primary text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm py-4 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
                style={{ borderRadius: "8px", height: "48px" }}>
                {submitting ? <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" /> : "Request Viewing"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
