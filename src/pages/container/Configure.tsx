import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import ResponsiveImage from "@/components/ResponsiveImage";
import { getProductById, ContainerAddOn } from "@/data/containerProducts";
import { useCurrency } from "@/contexts/CurrencyContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";


const parishes = ["Saint John", "Saint Peter", "Saint George", "Saint Philip", "Saint Mary", "Saint Paul", "Barbuda", "Other Caribbean"];
const timelines = ["0-3 months", "3-6 months", "6-12 months", "Just exploring"];
const useCaseOptions = ["Primary residence", "Rental investment", "Commercial operation", "Resort amenity", "Staff quarters", "Other"];
const siteOptions = [
  { value: "own-land", label: "I own land in Antigua" },
  { value: "need-site", label: "Need help sourcing a site" },
  { value: "existing-property", label: "Installing on existing commercial property" },
];

export default function Configure() {
  const { vertical, productId } = useParams<{ vertical: string; productId: string }>();
  const navigate = useNavigate();
  const product = getProductById(productId || "");
  const { formatPrice, convert, currency } = useCurrency();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [useCase, setUseCase] = useState("");
  const [siteSituation, setSiteSituation] = useState("");
  const [form, setForm] = useState({ name: "", email: "", whatsapp: "", parish: "", timeline: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!product) {
    return <div className="min-h-screen flex items-center justify-center pt-20"><p>Product not found.</p></div>;
  }

  const selectedAddOnObjects = product.addOns.filter((a) => selectedAddons.includes(a.id));
  const addOnTotal = selectedAddOnObjects.reduce((sum, a) => sum + a.priceUSD, 0);
  const totalUSD = product.startingPriceUSD + addOnTotal;

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) => prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]);
  };

  const canProceed = () => {
    if (step === 3) return !!useCase;
    if (step === 4) return !!siteSituation;
    if (step === 5) return form.name && form.email && form.whatsapp && form.parish && form.timeline;
    return true;
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        product_id: product.id,
        product_name: product.name,
        selected_addons: selectedAddOnObjects.map((a) => ({ id: a.id, name: a.name, priceUSD: a.priceUSD })),
        total_price_usd: totalUSD,
        use_case: useCase,
        site_situation: siteSituation,
        contact_name: form.name,
        contact_email: form.email,
        contact_whatsapp: form.whatsapp,
        parish: form.parish,
        timeline: form.timeline,
      };

      const { error } = await supabase.from("container_leads").insert(payload as any);
      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Configuration submitted!", description: "We'll be in touch shortly." });

      // Redirect to WhatsApp after 4 seconds
      setTimeout(() => {
        const msg = encodeURIComponent(`Hi Ashante, I just configured ${product.name} on alindsayluxe.com — can we discuss next steps?`);
        window.open(`https://wa.me/12687755221?text=${msg}`, "_blank");
      }, 4000);
    } catch (err) {
      toast({ title: "Something went wrong", description: "Please try again or contact us directly.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main id="main-content" className="min-h-screen bg-background flex items-center justify-center px-6 pt-20">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check size={32} className="text-primary" />
          </div>
          <h1 className="font-serif text-h3 text-foreground mb-4">Configuration Submitted</h1>
          <p className="font-sans text-muted-foreground text-body mb-8">
            Thank you, {form.name}! We'll review your {product.name} configuration and reach out within 24 hours.
            You'll be redirected to WhatsApp momentarily.
          </p>
        </motion.div>
      </main>
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background pt-20">
      <div className="max-w-[960px] mx-auto px-6 py-12">
        {/* Progress */}
        <div className="flex items-center gap-2 mb-12">
          {[1, 2, 3, 4, 5].map((s) => (
            <div key={s} className="flex-1 flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${
                s <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
              }`}>
                {s < step ? <Check size={14} /> : s}
              </div>
              {s < 5 && <div className={`flex-1 h-0.5 ${s < step ? "bg-primary" : "bg-secondary"}`} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* Step 1: Confirm */}
            {step === 1 && (
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2 aspect-[4/3] overflow-hidden">
                  <ResponsiveImage basePath={`${product.imageBase}/hero`} size="card" alt={product.name} />
                </div>
                <div className="md:w-1/2">
                  <p className="text-eyebrow text-primary mb-2">{product.category}</p>
                  <h1 className="font-serif text-h3 text-foreground mb-2">{product.name}</h1>
                  <p className="font-sans text-muted-foreground text-body mb-4">{product.tagline}</p>
                  <div className="space-y-2 font-sans text-sm text-muted-foreground">
                    <p>{product.sqft} sq ft · {product.dimensions}</p>
                    <p>{product.capacity}</p>
                    <p>{product.leadTimeWeeks} weeks lead time</p>
                  </div>
                  <p className="font-serif text-h3 text-foreground mt-6">From {formatPrice(product.startingPriceUSD)}</p>
                </div>
              </div>
            )}

            {/* Step 2: Add-ons */}
            {step === 2 && (
              <div>
                <h2 className="font-serif text-h3 text-foreground mb-2">Select Add-Ons</h2>
                <p className="font-sans text-muted-foreground text-sm mb-8">Customise your {product.name} with optional upgrades.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.addOns.map((addon) => {
                    const selected = selectedAddons.includes(addon.id);
                    return (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddon(addon.id)}
                        className={`text-left p-5 border transition-all duration-200 ${
                          selected ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-sans font-semibold text-foreground text-sm">{addon.name}</h3>
                            <p className="font-sans text-muted-foreground text-xs mt-1">{addon.description}</p>
                          </div>
                          <div className="flex items-center gap-2 ml-3">
                            <span className="font-sans text-primary font-medium text-sm">{formatPrice(addon.priceUSD)}</span>
                            <div className={`w-5 h-5 border-2 flex items-center justify-center transition-colors ${
                              selected ? "border-primary bg-primary" : "border-border"
                            }`}>
                              {selected && <Check size={12} className="text-primary-foreground" />}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Use Case */}
            {step === 3 && (
              <div>
                <h2 className="font-serif text-h3 text-foreground mb-2">Intended Use</h2>
                <p className="font-sans text-muted-foreground text-sm mb-8">How will you use your {product.name}?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {useCaseOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setUseCase(opt)}
                      className={`text-left p-4 border font-sans text-sm transition-all ${
                        useCase === opt ? "border-primary bg-primary/5 text-foreground font-semibold" : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Site */}
            {step === 4 && (
              <div>
                <h2 className="font-serif text-h3 text-foreground mb-2">Your Site</h2>
                <p className="font-sans text-muted-foreground text-sm mb-8">Tell us about your installation location.</p>
                <div className="space-y-3">
                  {siteOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setSiteSituation(opt.value)}
                      className={`w-full text-left p-5 border font-sans text-sm transition-all ${
                        siteSituation === opt.value ? "border-primary bg-primary/5 text-foreground font-semibold" : "border-border bg-card text-muted-foreground hover:border-primary/30"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 5: Contact */}
            {step === 5 && (
              <div>
                <h2 className="font-serif text-h3 text-foreground mb-2">Your Details</h2>
                <p className="font-sans text-muted-foreground text-sm mb-8">We'll use this to send your configuration summary and schedule a call.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-sans text-xs text-muted-foreground mb-1 block">Full Name *</label>
                    <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-muted-foreground mb-1 block">Email *</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-muted-foreground mb-1 block">WhatsApp (with country code) *</label>
                    <input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} placeholder="+1 268 ..." className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground" />
                  </div>
                  <div>
                    <label className="font-sans text-xs text-muted-foreground mb-1 block">Parish *</label>
                    <select value={form.parish} onChange={(e) => setForm({ ...form, parish: e.target.value })} className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground">
                      <option value="">Select parish…</option>
                      {parishes.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-sans text-xs text-muted-foreground mb-1 block">Timeline *</label>
                    <select value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className="w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground">
                      <option value="">When are you looking to start?</option>
                      {timelines.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Sticky footer with nav + total */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-border">
          <div className="flex items-center gap-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-1 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft size={14} /> Back
              </button>
            )}
          </div>

          <div className="text-center">
            <p className="font-sans text-xs text-muted-foreground">Estimated Total</p>
            <p className="font-serif text-h4 text-foreground">{formatPrice(totalUSD)}</p>
            {selectedAddOnObjects.length > 0 && (
              <p className="font-sans text-xs text-muted-foreground mt-0.5">
                Base {formatPrice(product.startingPriceUSD)} + {selectedAddOnObjects.length} add-on{selectedAddOnObjects.length > 1 ? "s" : ""}
              </p>
            )}
          </div>

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex items-center gap-1 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-3 transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue <ArrowRight size={14} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || submitting}
              className="flex items-center gap-1 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-3 transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting…" : "Submit Configuration"} <ArrowRight size={14} />
            </button>
          )}
        </div>
      </div>

    </main>
  );
}
