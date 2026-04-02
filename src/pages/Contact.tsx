import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Instagram, CheckCircle } from "lucide-react";
import RevealSection from "@/components/RevealSection";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const interestOptions = [
  { value: "buy", label: "Buy Property" },
  { value: "sell", label: "Sell Property" },
  { value: "container", label: "Container Homes" },
  { value: "cbi", label: "Citizenship by Investment" },
  { value: "management", label: "Property Management" },
  { value: "other", label: "Other" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const { error } = await supabase.from("enquiries").insert({
      name: form.name,
      email: form.email,
      phone: form.phone || null,
      message: form.message || `Interest: ${interestOptions.find(o => o.value === form.interest)?.label || "General"}`,
      property_name: interestOptions.find(o => o.value === form.interest)?.label || null,
    });
    if (error) {
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
      toast({ title: "Message sent!", description: "We'll respond within 1 business hour." });
    }
    setSubmitting(false);
  };

  const inputClass = "w-full h-12 px-4 bg-background border border-input text-foreground font-body text-sm placeholder:text-muted-foreground focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 outline-none transition-all rounded-xl";

  return (
    <div className="overflow-hidden">
      {/* Mini Hero */}
      <section className="relative h-[40vh] min-h-[300px] flex items-end pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[hsl(207,100%,8%)] via-[hsl(207,80%,14%)] to-[hsl(210,60%,18%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 md:px-10 w-full">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-eyebrow mb-4">Get In Touch</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.7 }} className="font-display text-white font-bold" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
            Contact Us
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }} className="font-body text-white/60 text-lg mt-3 max-w-lg">
            Ready to find your place in paradise? We'd love to hear from you.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-luxury-gold/30 to-transparent" />
      </section>

      {/* Content */}
      <section className="py-24 bg-background">
        <div className="max-w-[1280px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Left — Form (60%) */}
            <RevealSection direction="left" className="lg:col-span-3">
              <h2 className="font-display text-foreground mb-2">Send a Message</h2>
              <p className="font-body text-muted-foreground mb-10">Tell us about your property goals and we'll get back to you right away.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-6 py-16 border border-border rounded-2xl">
                  <CheckCircle size={56} className="text-luxury-gold" />
                  <h3 className="font-display text-2xl text-foreground">Thank You</h3>
                  <p className="font-body text-muted-foreground max-w-sm">
                    Your message has been received. We typically respond within 1 hour during business hours.
                  </p>
                  <button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", phone: "", interest: "", message: "" }); }}
                    className="border border-luxury-gold/40 text-luxury-gold font-body font-medium text-sm tracking-wider uppercase px-6 py-3 rounded-xl hover:bg-luxury-gold/10 transition-all duration-300">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Name *</label>
                    <input required placeholder="Your full name" className={inputClass} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">Email *</label>
                      <input type="email" required placeholder="your@email.com" className={inputClass} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                    </div>
                    <div>
                      <label className="block font-body text-sm font-medium text-foreground mb-1.5">Phone</label>
                      <input type="tel" placeholder="+1 (268) ..." className={inputClass} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">I'm interested in</label>
                    <select className={inputClass} value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}>
                      <option value="">Select...</option>
                      {interestOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-1.5">Message</label>
                    <textarea rows={5} placeholder="Tell us about your goals..." className={`${inputClass} h-auto py-3 resize-none`} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                  </div>
                  <button type="submit" disabled={submitting}
                    className="gold-shimmer-hover w-full bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-luxury-gold/20 disabled:opacity-50">
                    {submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </RevealSection>

            {/* Right — Info Card (40%) */}
            <RevealSection direction="right" className="lg:col-span-2">
              <div className="bg-[hsl(207,100%,10%)] rounded-2xl p-8 lg:p-10 space-y-7 sticky top-28">
                <div>
                  <h3 className="font-display text-xl text-white mb-1">Get In Touch</h3>
                  <p className="font-body text-white/50 text-sm">We respond within 1 hour during business hours.</p>
                </div>

                <div className="space-y-5">
                  <a href="https://wa.me/12687755221" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors duration-300">
                    <Phone size={18} className="text-luxury-gold/60 shrink-0" />
                    <span className="font-body text-sm">+1 (268) 775-5221</span>
                  </a>
                  <a href="mailto:lindsayashante@gmail.com" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors duration-300">
                    <Mail size={18} className="text-luxury-gold/60 shrink-0" />
                    <span className="font-body text-sm">lindsayashante@gmail.com</span>
                  </a>
                  <a href="https://www.instagram.com/alindsayluxeestates" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-white/70 hover:text-luxury-gold transition-colors duration-300">
                    <Instagram size={18} className="text-luxury-gold/60 shrink-0" />
                    <span className="font-body text-sm">@alindsayluxeestates</span>
                  </a>
                  <div className="flex items-start gap-3 text-white/70">
                    <MapPin size={18} className="text-luxury-gold/60 shrink-0 mt-0.5" />
                    <span className="font-body text-sm">St. John's, Antigua & Barbuda</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70">
                    <Clock size={18} className="text-luxury-gold/60 shrink-0" />
                    <span className="font-body text-sm">Mon – Sat, 8AM – 6PM</span>
                  </div>
                </div>

                <div className="h-px bg-white/10" />

                <a
                  href="https://wa.me/12687755221?text=Hi%20Ashante%2C%20I'd%20like%20to%20chat%20about%20a%20property."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-shimmer-hover w-full flex items-center justify-center gap-2 bg-gradient-to-r from-luxury-gold to-luxury-gold-light text-white font-body font-semibold text-sm tracking-widest uppercase py-3.5 rounded-xl transition-all duration-300"
                >
                  <WhatsAppIcon /> Chat on WhatsApp
                </a>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>
    </div>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.932-1.41A9.953 9.953 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 01-4.104-1.136l-.29-.173-3.03.866.81-2.957-.186-.3A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
    </svg>
  );
}
