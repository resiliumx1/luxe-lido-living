import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    interest: "",
    message: "",
  });

  const textColor = dark ? "text-off-white" : "text-foreground";
  const labelColor = dark ? "text-gold" : "text-gold";
  const inputBorder = dark ? "border-gold/30 text-off-white placeholder:text-off-white/30 bg-transparent" : "border-sand text-foreground placeholder:text-muted-foreground bg-transparent";
  const lineColor = dark ? "border-gold/20" : "border-sand";

  return (
    <section className={`py-24 ${dark ? "bg-ocean-deep" : "bg-off-white"}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <SectionLabel text="Get In Touch" light={dark} />
        <h2 className={`font-serif text-4xl md:text-5xl mb-16 ${textColor}`}>Begin Your Journey</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact details */}
          <div className="space-y-8">
            {[
              {
                Icon: Phone,
                label: "Phone",
                value: "+1 (268) 400-0000",
              },
              {
                Icon: Mail,
                label: "Email",
                value: "ashante@alinsayluxe.com",
              },
              {
                Icon: MapPin,
                label: "Office",
                value: "English Harbour, Antigua & Barbuda",
              },
              {
                Icon: Clock,
                label: "Hours",
                value: "Mon–Sat · 9am–6pm AST",
              },
            ].map(({ Icon, label, value }, i) => (
              <div key={i}>
                <div className="flex items-start gap-4">
                  <Icon size={16} className="text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className={`small-caps text-xs tracking-widest font-sans ${labelColor} mb-1`}>{label}</p>
                    <p className={`font-serif text-lg ${textColor}`}>{value}</p>
                  </div>
                </div>
                {i < 3 && <div className={`mt-6 border-b ${lineColor}`} />}
              </div>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`small-caps text-xs font-sans tracking-widest ${labelColor} block mb-2`}>First Name</label>
                <input
                  type="text"
                  placeholder="Olivia"
                  className={`w-full border-b pb-2 outline-none font-sans text-sm transition-colors focus:border-gold ${inputBorder}`}
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                />
              </div>
              <div>
                <label className={`small-caps text-xs font-sans tracking-widest ${labelColor} block mb-2`}>Last Name</label>
                <input
                  type="text"
                  placeholder="Bennett"
                  className={`w-full border-b pb-2 outline-none font-sans text-sm transition-colors focus:border-gold ${inputBorder}`}
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className={`small-caps text-xs font-sans tracking-widest ${labelColor} block mb-2`}>Email</label>
              <input
                type="email"
                placeholder="olivia@email.com"
                className={`w-full border-b pb-2 outline-none font-sans text-sm transition-colors focus:border-gold ${inputBorder}`}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className={`small-caps text-xs font-sans tracking-widest ${labelColor} block mb-2`}>I'm interested in</label>
              <select
                className={`w-full border-b pb-2 outline-none font-sans text-sm transition-colors focus:border-gold ${inputBorder}`}
                value={form.interest}
                onChange={(e) => setForm({ ...form, interest: e.target.value })}
              >
                <option value="">Select an option...</option>
                <option>Luxury Homes</option>
                <option>Container Homes</option>
                <option>Prefab Homes</option>
                <option>Container Businesses</option>
                <option>Investment Consulting</option>
                <option>Citizenship by Investment</option>
              </select>
            </div>

            <div>
              <label className={`small-caps text-xs font-sans tracking-widest ${labelColor} block mb-2`}>Message</label>
              <textarea
                placeholder="Tell us about your dream property..."
                rows={4}
                className={`w-full border-b pb-2 outline-none font-sans text-sm resize-none transition-colors focus:border-gold ${inputBorder}`}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm py-4 transition-colors duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
