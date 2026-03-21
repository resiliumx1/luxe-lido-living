import { useState } from "react";
import { X, CheckCircle, Calendar } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName?: string;
}

export default function BookingModal({ isOpen, onClose, propertyName }: BookingModalProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    method: "in-person",
    date: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate submission delay
    await new Promise((r) => setTimeout(r, 800));
    setSubmitted(true);
    setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
    // Reset after animation
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", email: "", whatsapp: "", method: "in-person", date: "", message: "" });
    }, 300);
  };

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/55"
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className="relative bg-card dark:bg-card w-full max-w-[480px] max-h-[90vh] overflow-y-auto p-8"
        style={{ borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.18)" }}
      >
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        {submitted ? (
          <div className="flex flex-col items-center text-center gap-5 py-8">
            <CheckCircle size={56} className="text-primary" />
            <h3 className="font-serif text-2xl text-foreground">Viewing Requested</h3>
            <p className="font-sans text-muted-foreground text-sm max-w-sm">
              Ashante will confirm your viewing within 2 hours.
              {propertyName && (
                <span className="block mt-2 text-primary font-medium">{propertyName}</span>
              )}
            </p>
            <button
              onClick={handleClose}
              className="mt-4 border border-primary text-primary font-sans small-caps tracking-widest text-sm px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="small-caps text-xs text-primary tracking-widest font-sans mb-2">
                Book a Viewing
              </p>
              <h3 className="font-serif text-2xl text-foreground">
                {propertyName || "Schedule a Private Consultation"}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  Full Name <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-input pb-2 outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  Email <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-input pb-2 outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  WhatsApp Number <span className="text-primary">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (268) ..."
                  value={form.whatsapp}
                  onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  className="w-full bg-transparent border-b border-input pb-2 outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary"
                />
              </div>

              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  Viewing Preference
                </label>
                <div className="flex flex-wrap gap-3 mt-1">
                  {[
                    { value: "in-person", label: "In-person" },
                    { value: "video-call", label: "Video call" },
                    { value: "whatsapp-tour", label: "WhatsApp live tour" },
                  ].map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-center gap-2 px-4 py-2 border cursor-pointer font-sans text-sm transition-all duration-200 ${
                        form.method === opt.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-input text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="method"
                        value={opt.value}
                        checked={form.method === opt.value}
                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                        className="sr-only"
                      />
                      {opt.label}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  Preferred Date
                </label>
                <div className="relative">
                  <Calendar size={14} className="absolute left-0 top-1/2 -translate-y-1/2 text-primary" />
                  <input
                    type="date"
                    min={minDate}
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full bg-transparent border-b border-input pb-2 pl-6 outline-none font-sans text-sm text-foreground transition-colors focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="small-caps text-xs font-sans tracking-widest text-primary block mb-2">
                  Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Any specific questions about this property..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-input pb-2 outline-none font-sans text-sm text-foreground placeholder:text-muted-foreground resize-none transition-colors focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cta-shimmer w-full bg-primary text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm py-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style={{ borderRadius: "8px", height: "48px" }}
              >
                {submitting ? (
                  <span className="inline-block w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  "Request Viewing"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
