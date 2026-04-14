import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle, MessageCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import SectionLabel from "./SectionLabel";
import { OptionSelector } from "./ui/OptionSelector";
import { WHATSAPP_NUMBER, ASHANTE_EMAIL, ASHANTE_PHONE, ASHANTE_PHONE_RAW } from "@/lib/contact";
const interestOptions = [
  { value: "luxury", label: "Luxury Homes" },
  { value: "container", label: "Container Homes" },
  { value: "prefab", label: "Prefab Homes" },
  { value: "container-business", label: "Container Businesses" },
  { value: "investment", label: "Investment Consulting" },
  { value: "citizenship", label: "Citizenship by Investment" },
];

export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", interest: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await supabase.from("enquiries").insert({
      name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      message: form.message || "General enquiry",
      property_name: interestOptions.find((o) => o.value === form.interest)?.label || "",
    });
    setSubmitted(true);
    setSubmitting(false);
  };

  const textColor = dark ? "text-off-white" : "text-foreground";
  const subTextColor = dark ? "text-off-white/70" : "text-muted-foreground";
  const labelColor = dark ? "text-off-white/85" : "text-foreground";
  const inputCls = "input-luxe";

  return (
    <section className={`py-24 ${dark ? "bg-ocean-deep" : "bg-off-white dark:bg-background"}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <SectionLabel text="Get in touch" light={dark} />
        <h2 className={`text-h2 mb-16 ${textColor}`}>How can we help?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact details */}
          <div className="space-y-8">
            {[
              { Icon: Phone, label: "Phone", value: ASHANTE_PHONE, href: `tel:${ASHANTE_PHONE_RAW}` },
              { Icon: Mail, label: "Email", value: ASHANTE_EMAIL, href: `mailto:${ASHANTE_EMAIL}` },
              { Icon: MapPin, label: "Office", value: "English Harbour, Antigua & Barbuda", href: null },
              { Icon: Clock, label: "Hours", value: "Mon–Sat · 9am–6pm AST", href: null },
            ].map(({ Icon, label, value, href }, i) => (
              <div key={i}>
                <div className="flex items-start gap-4">
                  <Icon size={16} className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="small-caps text-xs tracking-widest font-sans text-primary mb-1">{label}</p>
                    {href ? (
                      <a href={href} className={`font-serif text-lg ${textColor} hover:text-primary transition-colors`}>{value}</a>
                    ) : (
                      <p className={`font-serif text-lg ${textColor}`}>{value}</p>
                    )}
                  </div>
                </div>
                {i < 3 && <div className={`mt-6 border-b ${dark ? "border-primary/20" : "border-sand dark:border-primary/10"}`} />}
              </div>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Ashante%2C%20I%27m%20interested%20in%20a%20property.`} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white font-sans font-medium small-caps tracking-wider text-sm px-6 py-3 transition-opacity hover:opacity-90">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
            <p className={`font-sans text-sm ${subTextColor} italic`}>Typically responds within 24 hours.</p>
          </div>

          {/* Form or success */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
              <CheckCircle size={56} className="text-primary" />
              <h3 className={`font-serif text-3xl ${textColor}`}>Thank You</h3>
              <p className={`font-sans text-base ${subTextColor} max-w-sm`}>
                Your enquiry has been received. Ashante will be in touch within 24 hours.
              </p>
              <button onClick={() => { setSubmitted(false); setForm({ firstName: "", lastName: "", email: "", interest: "", message: "" }); }}
                className="border border-primary text-primary font-sans small-caps tracking-widest text-sm px-6 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={`text-label block mb-2 ${labelColor}`}>First Name <span className="text-primary">*</span></label>
                  <input type="text" required placeholder="Olivia" className={inputCls}
                    value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                </div>
                <div>
                  <label className={`text-label block mb-2 ${labelColor}`}>Last Name <span className="text-primary">*</span></label>
                  <input type="text" required placeholder="Bennett" className={inputCls}
                    value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                </div>
              </div>
              <div>
                <label className={`text-label block mb-2 ${labelColor}`}>Email <span className="text-primary">*</span></label>
                <input type="email" required placeholder="olivia@email.com" className={inputCls}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={`text-label block mb-2 ${labelColor}`}>I'm interested in</label>
                <OptionSelector name="interest" options={interestOptions} value={form.interest} onChange={(v) => setForm({ ...form, interest: v })} onDark={dark} />
              </div>
              <div>
                <label className={`text-label block mb-2 ${labelColor}`}>Message</label>
                <textarea placeholder="Tell us about your dream property..." rows={4} className={`${inputCls} resize-none`}
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>
              <button type="submit" disabled={submitting}
                className="cta-shimmer w-full bg-primary hover:bg-accent text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm py-4 transition-colors duration-300 disabled:opacity-50">
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
