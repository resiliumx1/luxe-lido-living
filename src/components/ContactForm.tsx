import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Clock, Info, Mail, MapPin, MessageCircle, Paperclip, Phone, Upload } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import SectionLabel from "./SectionLabel";
import { OptionSelector } from "./ui/OptionSelector";
import { Button } from "./ui/button";
import { WHATSAPP_NUMBER, ASHANTE_EMAIL, ASHANTE_PHONE, ASHANTE_PHONE_RAW, OFFICE_HOURS, OFFICE_LOCATION } from "@/lib/contact";

const NEEDS = [
  { value: "build-home", label: "Build a home" },
  { value: "managed-construction", label: "Managed construction" },
  { value: "custom-build", label: "Custom build" },
  { value: "renovate-repair", label: "Renovate or repair" },
  { value: "container-modular", label: "Container or modular unit" },
  { value: "food-trailer", label: "Food trailer" },
  { value: "buy-property", label: "Buy a property" },
  { value: "buy-land", label: "Buy land" },
  { value: "relocation-help", label: "Relocation help" },
];

const BUILD_METHODS = [
  { value: "traditional", label: "Traditional" },
  { value: "container", label: "Container" },
  { value: "insulated-panel", label: "Insulated panel" },
];
const TRADES = ["Tiling", "Painting", "Plumbing", "Electrical", "Roofing", "Drawings & design"];
const MANAGED_STAGES = [
  { value: "planning", label: "Still planning" },
  { value: "drawings-ready", label: "Drawings ready" },
  { value: "need-drawings", label: "Need drawings arranged" },
  { value: "in-progress", label: "Build already started" },
];
const DESIGN_STATUS = [
  { value: "own-drawings", label: "I have my own drawings" },
  { value: "arrange-drawings", label: "Please arrange the drawings" },
  { value: "ideas-only", label: "Ideas only so far" },
];
const CONTAINER_SIZES = [{ value: "20ft", label: "20ft" }, { value: "40ft", label: "40ft" }, { value: "unsure", label: "Not sure yet" }];
const TIMELINES = [{ value: "asap", label: "As soon as possible" }, { value: "1-3-months", label: "1–3 months" }, { value: "3-6-months", label: "3–6 months" }, { value: "6-plus-months", label: "6+ months" }, { value: "unsure", label: "Not sure yet" }];
const BUDGETS = [{ value: "under-50k", label: "Under US$50k" }, { value: "50k-150k", label: "US$50k–150k" }, { value: "150k-300k", label: "US$150k–300k" }, { value: "300k-plus", label: "US$300k+" }, { value: "unsure", label: "Not sure yet" }];
const CONTACT_METHODS = [{ value: "whatsapp", label: "WhatsApp" }, { value: "call", label: "Phone call" }, { value: "email", label: "Email" }];

const queryNeedMap: Record<string, { need: string; buildMethod?: string; service?: string }> = {
  "traditional-construction": { need: "build-home", buildMethod: "traditional" },
  "container-builds": { need: "container-modular" },
  "insulated-panel-builds": { need: "build-home", buildMethod: "insulated-panel" },
  "renovations-trades": { need: "renovate-repair" },
  "property-sales-land": { need: "buy-property" },
  relocation: { need: "relocation-help" },
  "managed-construction": { need: "managed-construction", service: "managed-construction" },
  "custom-builds": { need: "custom-build", service: "custom-builds" },
};

const detailsSchema = z.object({
  details: z.string().trim().min(10, "Please add a little more detail (at least 10 characters).").max(3000, "Project details must be under 3,000 characters."),
});
const contactSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(100),
  lastName: z.string().trim().min(1, "Last name is required.").max(100),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(40),
  email: z.string().trim().email("Enter a valid email address.").max(255),
  preferredContact: z.enum(["whatsapp", "email", "call"], { required_error: "Choose how you prefer to be contacted." }),
});

type FormState = {
  need: string; buildMethod: string; trade: string; containerSize: string;
  projectStage: string; designStatus: string;
  timeline: string; budget: string; area: string; details: string;
  firstName: string; lastName: string; phone: string; email: string;
  preferredContact: string; assessmentAcknowledged: boolean; service: string;
};

const initialForm: FormState = {
  need: "", buildMethod: "", trade: "", containerSize: "", projectStage: "", designStatus: "", timeline: "", budget: "", area: "", details: "",
  firstName: "", lastName: "", phone: "", email: "", preferredContact: "", assessmentAcknowledged: false, service: "",
};

const DRAFT_KEY = "luxe-enquiry-draft";

export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState<FormState>(() => {
    if (typeof window === "undefined") return initialForm;
    try {
      const saved = window.sessionStorage.getItem(DRAFT_KEY);
      if (saved) return { ...initialForm, ...(JSON.parse(saved) as Partial<FormState>) };
    } catch { /* ignore malformed draft */ }
    return initialForm;
  });
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const interest = searchParams.get("interest");
    const preset = interest ? queryNeedMap[interest] : undefined;
    if (preset) {
      setForm((current) => ({
        ...current,
        need: preset.need,
        buildMethod: preset.buildMethod ?? current.buildMethod,
        service: preset.service ?? current.service,
      }));
    }
  }, [searchParams]);

  useEffect(() => {
    if (submitted) return;
    try {
      window.sessionStorage.setItem(DRAFT_KEY, JSON.stringify(form));
    } catch { /* storage unavailable */ }
  }, [form, submitted]);


  const requiresAssessment = ["build-home", "managed-construction", "custom-build", "renovate-repair"].includes(form.need);
  const needsBuildMethod = ["build-home", "managed-construction", "custom-build"].includes(form.need);
  const selectedNeed = NEEDS.find((option) => option.value === form.need)?.label || "General enquiry";
  const textColor = dark ? "text-off-white" : "text-foreground";
  const subTextColor = dark ? "text-off-white/70" : "text-muted-foreground";
  const labelColor = dark ? "text-off-white/85" : "text-foreground";
  const borderColor = dark ? "border-primary/25" : "border-border";
  const inputCls = "input-luxe";

  const qualification = useMemo(() => ({
    need: form.need,
    need_label: selectedNeed,
    ...(form.service && { service_path: form.service }),
    ...(form.buildMethod && { build_method: form.buildMethod }),
    ...(form.trade && { trade: form.trade }),
    ...(form.containerSize && { container_size: form.containerSize }),
    ...(form.projectStage && { project_stage: form.projectStage }),
    ...(form.designStatus && { design_status: form.designStatus }),
    timeline: form.timeline,
    budget_range: form.budget,
    parish_or_area: form.area.trim(),
    assessment_fee_required: requiresAssessment,
    assessment_fee_acknowledged: requiresAssessment ? form.assessmentAcknowledged : false,
  }), [form, requiresAssessment, selectedNeed]);

  const validateStep = () => {
    if (step === 0) {
      if (!form.need) return "Choose what you need help with.";
      if (needsBuildMethod && !form.buildMethod) return "Choose a build method.";
      if (form.need === "managed-construction" && !form.projectStage) return "Tell us what stage the project is at.";
      if (form.need === "custom-build" && !form.designStatus) return "Tell us about your design or drawings.";
      if (form.need === "renovate-repair" && !form.trade) return "Choose the main trade needed.";
      if (form.need === "container-modular" && !form.containerSize) return "Choose a container size.";
      if (!form.area.trim()) return "Add a parish or area.";
    }
    if (step === 1) {
      const result = detailsSchema.safeParse({ details: form.details });
      if (!result.success) return result.error.issues[0]?.message || "Add project details.";
      if (photo && !["image/jpeg", "image/png", "image/webp"].includes(photo.type)) return "Upload a JPG, PNG or WebP image.";
      if (photo && photo.size > 5 * 1024 * 1024) return "The photo must be 5MB or smaller.";
    }
    if (step === 2) {
      const result = contactSchema.safeParse(form);
      if (!result.success) return result.error.issues[0]?.message || "Check your contact details.";
      if (requiresAssessment && !form.assessmentAcknowledged) return "Please acknowledge the assessment fee policy.";
    }
    return "";
  };

  const goNext = () => {
    const message = validateStep();
    setError(message);
    if (!message) setStep((current) => Math.min(current + 1, 2));
  };

  const handlePhoto = (file?: File) => {
    setError("");
    if (!file) return setPhoto(null);
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) return setError("Upload a JPG, PNG or WebP image.");
    if (file.size > 5 * 1024 * 1024) return setError("The photo must be 5MB or smaller.");
    setPhoto(file);
  };

  const handleSubmit = async () => {
    const message = validateStep();
    setError(message);
    if (message) return;
    setSubmitting(true);
    let photoPath: string | null = null;

    if (photo) {
      const extension = photo.name.split(".").pop()?.toLowerCase() || "jpg";
      photoPath = `submissions/${crypto.randomUUID()}.${extension}`;
      const upload = await supabase.storage.from("enquiry-photos").upload(photoPath, photo, { contentType: photo.type });
      if (upload.error) {
        setError("We couldn't upload your photo. Please try again or remove it to continue.");
        setSubmitting(false);
        return;
      }
    }

    const result = await supabase.from("enquiries").insert({
      name: `${form.firstName.trim()} ${form.lastName.trim()}`,
      email: form.email.trim(),
      phone: form.phone.trim(),
      preferred_contact: form.preferredContact,
      message: form.details.trim(),
      property_name: selectedNeed,
      qualification,
      photo_path: photoPath,
    });

    if (result.error) {
      setError("We couldn't send your enquiry. Please try again.");
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  const renderStepOne = () => (
    <div className="space-y-6">
      <div>
        <label className={`text-label block mb-3 ${labelColor}`}>What do you need? <span className="text-primary">*</span></label>
        <OptionSelector name="need" options={NEEDS} value={form.need} onChange={(need) => setForm({ ...form, need, buildMethod: "", trade: "", containerSize: "", projectStage: "", designStatus: "", assessmentAcknowledged: false })} onDark={dark} />
      </div>
      {needsBuildMethod && <div><label className={`text-label block mb-3 ${labelColor}`}>Build method <span className="text-primary">*</span></label><OptionSelector name="buildMethod" options={BUILD_METHODS} value={form.buildMethod} onChange={(buildMethod) => setForm({ ...form, buildMethod })} onDark={dark} /></div>}
      {form.need === "managed-construction" && <div><label className={`text-label block mb-3 ${labelColor}`}>Where is the project now? <span className="text-primary">*</span></label><OptionSelector name="projectStage" options={MANAGED_STAGES} value={form.projectStage} onChange={(projectStage) => setForm({ ...form, projectStage })} onDark={dark} /></div>}
      {form.need === "custom-build" && <div><label className={`text-label block mb-3 ${labelColor}`}>Your design <span className="text-primary">*</span></label><OptionSelector name="designStatus" options={DESIGN_STATUS} value={form.designStatus} onChange={(designStatus) => setForm({ ...form, designStatus })} onDark={dark} /></div>}
      {form.need === "renovate-repair" && <div><label className={`text-label block mb-3 ${labelColor}`}>Which trade do you need? <span className="text-primary">*</span></label><OptionSelector name="trade" options={TRADES.map((trade) => ({ value: trade.toLowerCase().replace(/ /g, "-"), label: trade }))} value={form.trade} onChange={(trade) => setForm({ ...form, trade })} onDark={dark} /></div>}
      {form.need === "container-modular" && <div><label className={`text-label block mb-3 ${labelColor}`}>Container size <span className="text-primary">*</span></label><OptionSelector name="containerSize" options={CONTAINER_SIZES} value={form.containerSize} onChange={(containerSize) => setForm({ ...form, containerSize })} onDark={dark} /></div>}
      {form.need && <>
        <div><label className={`text-label block mb-3 ${labelColor}`}>Rough timeline <span className={subTextColor}>(optional)</span></label><OptionSelector name="timeline" options={TIMELINES} value={form.timeline} onChange={(timeline) => setForm({ ...form, timeline })} onDark={dark} /></div>
        <div><label className={`text-label block mb-3 ${labelColor}`}>Budget range <span className={subTextColor}>(optional)</span></label><OptionSelector name="budget" options={BUDGETS} value={form.budget} onChange={(budget) => setForm({ ...form, budget })} onDark={dark} /></div>
        <div><label className={`text-label block mb-2 ${labelColor}`}>Parish or area <span className="text-primary">*</span></label><input className={inputCls} value={form.area} maxLength={150} placeholder="e.g. St. John’s, Saint Mary" onChange={(event) => setForm({ ...form, area: event.target.value })} /></div>
      </>}
    </div>
  );

  const renderStepTwo = () => (
    <div className="space-y-6">
      {requiresAssessment && (
        <div className={`flex items-start gap-3 border p-4 ${dark ? "border-primary/40 bg-primary/10" : "border-primary/40 bg-primary/5"}`} style={{ borderRadius: "8px" }}>
          <Info size={18} className="text-primary mt-0.5 flex-shrink-0" />
          <p className={`font-sans text-sm leading-relaxed ${textColor}`}>
            Good to know: construction and renovation quotes carry a US$250 assessment fee, payable before any site visit, measurement or drawings. Nothing to pay now — you'll confirm you understand at the last step.
          </p>
        </div>
      )}
      <div><label className={`text-label block mb-2 ${labelColor}`}>Project details <span className="text-primary">*</span></label><textarea className={`${inputCls} resize-none`} rows={7} maxLength={3000} placeholder="Tell us what you want to build, improve or find…" value={form.details} onChange={(event) => setForm({ ...form, details: event.target.value })} /></div>
      <div>
        <label className={`text-label block mb-2 ${labelColor}`}>Photo <span className={subTextColor}>(optional)</span></label>
        <label className={`flex min-h-24 cursor-pointer items-center justify-center gap-3 border border-dashed px-4 py-5 transition-colors hover:border-primary ${borderColor} ${subTextColor}`} style={{ borderRadius: "8px" }}>
          {photo ? <><Paperclip size={18} className="text-primary" /><span className="font-sans text-sm break-all">{photo.name}</span></> : <><Upload size={18} className="text-primary" /><span className="font-sans text-sm">Add a JPG, PNG or WebP image (max 5MB)</span></>}
          <input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => handlePhoto(event.target.files?.[0])} />
        </label>
      </div>
    </div>
  );

  const renderStepThree = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div><label className={`text-label block mb-2 ${labelColor}`}>First name <span className="text-primary">*</span></label><input className={inputCls} maxLength={100} value={form.firstName} onChange={(event) => setForm({ ...form, firstName: event.target.value })} /></div>
        <div><label className={`text-label block mb-2 ${labelColor}`}>Last name <span className="text-primary">*</span></label><input className={inputCls} maxLength={100} value={form.lastName} onChange={(event) => setForm({ ...form, lastName: event.target.value })} /></div>
      </div>
      <div><label className={`text-label block mb-2 ${labelColor}`}>Phone <span className="text-primary">*</span></label><input type="tel" className={inputCls} maxLength={40} value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} /></div>
      <div><label className={`text-label block mb-2 ${labelColor}`}>Email <span className="text-primary">*</span></label><input type="email" className={inputCls} maxLength={255} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></div>
      <div><label className={`text-label block mb-3 ${labelColor}`}>Preferred contact <span className="text-primary">*</span></label><OptionSelector name="preferredContact" options={CONTACT_METHODS} value={form.preferredContact} onChange={(preferredContact) => setForm({ ...form, preferredContact })} onDark={dark} /></div>
      {requiresAssessment && (
        <div className="border-2 border-primary bg-primary/10 p-5" style={{ borderRadius: "8px" }}>
          <p className={`font-serif text-xl font-semibold ${textColor}`}>Assessment fee policy</p>
          <p className={`mt-2 font-sans text-sm leading-relaxed ${textColor}`}>A formal quote requires a US$250 assessment fee, payable before any site visit, measurement or drawings. Quoting work begins only after this fee is paid.</p>
          <label className={`mt-4 flex cursor-pointer items-start gap-3 font-sans text-sm font-medium ${textColor}`}>
            <input type="checkbox" className="mt-1 h-4 w-4 accent-primary" checked={form.assessmentAcknowledged} onChange={(event) => setForm({ ...form, assessmentAcknowledged: event.target.checked })} />
            <span>I understand and acknowledge the US$250 assessment fee policy.</span>
          </label>
        </div>
      )}
    </div>
  );

  return (
    <section className={`py-24 ${dark ? "bg-ocean-deep" : "bg-off-white dark:bg-background"}`}>
      <div className="max-w-[1280px] mx-auto px-6 md:px-10">
        <SectionLabel text="Get in touch" light={dark} />
        <h2 className={`text-h2 mb-16 ${textColor}`}>How can we help?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            {[{ Icon: Phone, label: "Phone", value: ASHANTE_PHONE, href: `tel:${ASHANTE_PHONE_RAW}` }, { Icon: Mail, label: "Email", value: ASHANTE_EMAIL, href: `mailto:${ASHANTE_EMAIL}` }, { Icon: MapPin, label: "Office", value: OFFICE_LOCATION, href: null }, { Icon: Clock, label: "Hours", value: OFFICE_HOURS, href: null }].map(({ Icon, label, value, href }, index) => (
              <div key={label}><div className="flex items-start gap-4"><Icon size={16} className="text-primary mt-0.5 flex-shrink-0" /><div><p className="small-caps text-xs tracking-widest font-sans text-primary mb-1">{label}</p>{href ? <a href={href} className={`font-serif text-lg ${textColor} hover:text-primary transition-colors`}>{value}</a> : <p className={`font-serif text-lg ${textColor}`}>{value}</p>}</div></div>{index < 3 && <div className={`mt-6 border-b ${dark ? "border-primary/20" : "border-sand dark:border-primary/10"}`} />}</div>
            ))}
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Ashante%2C%20I%27d%20like%20to%20discuss%20a%20project%20or%20property.`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] text-white font-sans font-medium small-caps tracking-wider text-sm px-6 py-3 transition-opacity hover:opacity-90"><MessageCircle size={16} /> Chat on WhatsApp</a>
            <p className={`font-sans text-sm ${subTextColor} italic`}>Typically responds within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center gap-6 py-12"><CheckCircle size={56} className="text-primary" /><h3 className={`font-serif text-3xl ${textColor}`}>Thank You</h3><p className={`font-sans text-base ${subTextColor} max-w-sm`}>Your enquiry has been received. Ashante will be in touch within 24 hours.</p><Button variant="outline" onClick={() => { setSubmitted(false); setForm(initialForm); setPhoto(null); setStep(0); }}>Send another enquiry</Button></div>
          ) : (
            <div>
              <div className="mb-8" aria-label={`Step ${step + 1} of 3`}>
                <div className="flex items-center gap-2 mb-3">{["Your needs", "Project details", "Your details"].map((label, index) => <div key={label} className="flex flex-1 items-center gap-2"><span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-sans text-sm font-bold ${index <= step ? "bg-primary text-primary-foreground" : dark ? "bg-off-white/10 text-off-white/60" : "bg-muted text-muted-foreground"}`}>{index < step ? <Check size={14} /> : index + 1}</span>{index < 2 && <span className={`h-px flex-1 ${index < step ? "bg-primary" : borderColor}`} />}</div>)}</div>
                <p className={`font-sans text-xs uppercase tracking-widest ${subTextColor}`}>Step {step + 1} of 3 · <span className={textColor}>{["What do you need?", "Project details", "Your details"][step]}</span></p>
              </div>
              {step === 0 ? renderStepOne() : step === 1 ? renderStepTwo() : renderStepThree()}
              {error && <p role="alert" className="mt-5 font-sans text-sm text-destructive">{error}</p>}
              <div className={`mt-8 flex items-center justify-between border-t pt-6 ${borderColor}`}>
                {step > 0 ? <Button type="button" variant="ghost" onClick={() => { setError(""); setStep(step - 1); }} disabled={submitting}><ArrowLeft /> Back</Button> : <span />}
                <Button type="button" className="cta-shimmer uppercase tracking-widest" onClick={step === 2 ? handleSubmit : goNext} disabled={submitting}>{submitting ? "Sending…" : step === 2 ? "Send enquiry" : "Continue"}{!submitting && <ArrowRight />}</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}