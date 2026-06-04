import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "sonner";
import RequestEngine, {
  FieldLabel,
  PillGroup,
  TextArea,
  TextInput,
  type StepDef,
} from "@/components/request-engine/RequestEngine";
import SuccessState from "@/components/request-engine/SuccessState";
import SectionLabel from "@/components/SectionLabel";

const TRAILER_TYPES = [
  { value: "food", label: "Food Trailer", hint: "Any cuisine" },
  { value: "dessert", label: "Dessert Trailer", hint: "Ice cream, gelato, crêpes" },
  { value: "coffee", label: "Coffee Bar", hint: "Espresso-ready" },
  { value: "mobile_kitchen", label: "Mobile Kitchen", hint: "Fully equipped, business-ready" },
  { value: "cocktail", label: "Cocktail Bar", hint: "Pop-up bar with speed wells" },
];

const SIZES = [
  { value: "standard", label: 'Standard ~5m × 2.1m', hint: "Reference build size" },
  { value: "compact", label: "Compact (smaller footprint)", hint: "Tighter sites, lower haul cost" },
  { value: "extended", label: "Extended (larger interior)", hint: "Bigger menus, more equipment" },
];

const EQUIPMENT = [
  { value: "griddle", label: '36" gas griddle' },
  { value: "stove", label: '24" 4-burner stove' },
  { value: "fryer", label: "Gas fryer" },
  { value: "warmer", label: "Display food warmer" },
  { value: "prep_fridge", label: "Salad prep fridge" },
  { value: "workbench_fridge", label: "Workbench fridge" },
  { value: "freezer", label: "Workbench freezer" },
  { value: "chef_base", label: "Chef base" },
  { value: "hood", label: "Commercial hood ventilation" },
  { value: "ac", label: "Roof-mounted AC" },
];

const CROSS_SELL = [
  { value: "container", label: "Order a Shipping Container" },
  { value: "luxury_home", label: "Luxury Home Purchase" },
  { value: "development", label: "Build / Real Estate Development" },
  { value: "investment", label: "Investment Consulting" },
  { value: "cbi", label: "Citizenship by Investment" },
  { value: "relocation", label: "Relocation" },
];

export default function BuildTrailer() {
  const { currency } = useCurrency();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { firstName: string }>(null);

  const [trailerType, setTrailerType] = useState<string | null>(null);
  const [sizePref, setSizePref] = useState<string | null>(null);
  const [equipment, setEquipment] = useState<string[]>([]);
  const [shipScope, setShipScope] = useState<"antigua" | "regional" | null>(null);
  const [shipLocation, setShipLocation] = useState("");
  const [alsoInterested, setAlsoInterested] = useState<string[]>([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [preferred, setPreferred] = useState<"whatsapp" | "email" | "call" | null>(null);
  const [notes, setNotes] = useState("");

  const steps: StepDef[] = [
    {
      label: "Type",
      validate: () => (!trailerType ? "Pick a trailer type" : true),
      render: () => (
        <div>
          <SectionLabel text="Step 1" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">What are you building?</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8">
            Every trailer is purpose-built around your menu — pick the closest format.
          </p>
          <PillGroup value={trailerType} onChange={(v) => setTrailerType(v as string)} options={TRAILER_TYPES as any} />
        </div>
      ),
    },
    {
      label: "Configure",
      validate: () => (!sizePref ? "Choose a size preference" : true),
      render: () => (
        <div>
          <SectionLabel text="Step 2" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">Size &amp; Equipment</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8">
            Water, full UL electrical, fire-suppression prep, heat &amp; sound insulation are standard on every build.
          </p>

          <FieldLabel required>Size preference</FieldLabel>
          <div className="mb-8">
            <PillGroup value={sizePref} onChange={(v) => setSizePref(v as string)} options={SIZES as any} />
          </div>

          <FieldLabel>Equipment (select what you need)</FieldLabel>
          <PillGroup multi value={equipment} onChange={(v) => setEquipment(v as string[])} options={EQUIPMENT as any} />
        </div>
      ),
    },
    {
      label: "Shipping",
      validate: () => {
        if (!shipScope) return "Where should we ship?";
        if (!shipLocation.trim()) return shipScope === "antigua" ? "Add a delivery location" : "Add a destination country";
        return true;
      },
      render: () => (
        <div>
          <SectionLabel text="Step 3" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-8">Ship-To Location</h2>

          <FieldLabel required>Region</FieldLabel>
          <div className="mb-8">
            <PillGroup
              value={shipScope}
              onChange={(v) => setShipScope(v as "antigua" | "regional")}
              options={[
                { value: "antigua", label: "Antigua & Barbuda" },
                { value: "regional", label: "Elsewhere in the Caribbean" },
              ]}
            />
          </div>

          <FieldLabel required>{shipScope === "antigua" ? "Delivery location" : "Destination country / port"}</FieldLabel>
          <TextInput
            value={shipLocation}
            onChange={(e) => setShipLocation(e.target.value)}
            placeholder={shipScope === "antigua" ? "Parish, town, or site address" : "e.g. St. Lucia, Barbados, Trinidad"}
            maxLength={200}
          />
        </div>
      ),
    },
    {
      label: "Also Exploring",
      render: () => (
        <div>
          <SectionLabel text="Step 4" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">Anything else you're exploring?</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8">Optional — helps Ashante prepare for your call.</p>
          <PillGroup multi value={alsoInterested} onChange={(v) => setAlsoInterested(v as string[])} options={CROSS_SELL as any} />
        </div>
      ),
    },
    {
      label: "Your Details",
      validate: () => {
        if (!firstName.trim()) return "First name required";
        if (!lastName.trim()) return "Last name required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Valid email required";
        if (!preferred) return "Choose how Ashante should reach you";
        return true;
      },
      render: () => (
        <div>
          <SectionLabel text="Step 5" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-6">Your Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <FieldLabel required>First name</FieldLabel>
              <TextInput value={firstName} onChange={(e) => setFirstName(e.target.value)} maxLength={100} />
            </div>
            <div>
              <FieldLabel required>Last name</FieldLabel>
              <TextInput value={lastName} onChange={(e) => setLastName(e.target.value)} maxLength={100} />
            </div>
            <div>
              <FieldLabel required>Email</FieldLabel>
              <TextInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} maxLength={255} />
            </div>
            <div>
              <FieldLabel>Phone / WhatsApp</FieldLabel>
              <TextInput value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 268 ..." maxLength={50} />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Country</FieldLabel>
              <TextInput value={country} onChange={(e) => setCountry(e.target.value)} maxLength={100} />
            </div>
            <div className="md:col-span-2">
              <FieldLabel required>Preferred contact</FieldLabel>
              <PillGroup
                value={preferred}
                onChange={(v) => setPreferred(v as any)}
                options={[
                  { value: "whatsapp", label: "WhatsApp" },
                  { value: "email", label: "Email" },
                  { value: "call", label: "Phone call" },
                ]}
              />
            </div>
            <div className="md:col-span-2">
              <FieldLabel>Menu, brand, anything else</FieldLabel>
              <TextArea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                maxLength={1000}
                placeholder="Tell us about your menu, brand, target opening date…"
              />
            </div>
          </div>

          <div className="bg-secondary border border-border p-5">
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">What happens next</p>
            <ul className="space-y-2 font-sans text-xs text-muted-foreground leading-relaxed">
              <li>◆ Typical build: 4–6 weeks from approved design.</li>
              <li>◆ You'll get a floor plan and 3D renders to approve before production starts.</li>
              <li>◆ Crated and shipped to your delivery point — fully tested, business-ready.</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  const onSubmit = async () => {
    setBusy(true);
    try {
      const payload = {
        trailer_type: trailerType,
        size_preference: sizePref,
        equipment,
        standard_systems: ["water", "ul_electrical", "fire_suppression_prep", "heat_sound_insulation"],
        ship_scope: shipScope,
        ship_location: shipLocation,
      };
      const { data, error } = await supabase.functions.invoke("submit-service-request", {
        body: {
          request_type: "trailer_build",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
          preferred_contact: preferred,
          payload,
          currency,
          also_interested: alsoInterested,
          notes: notes.trim() || undefined,
        },
      });
      if (error || !data?.id) throw error || new Error("submit failed");
      setDone({ firstName });
    } catch (e: any) {
      console.error(e);
      toast.error("Something went wrong submitting your request. Please try again or WhatsApp us directly.");
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <SuccessState
        firstName={done.firstName}
        what="trailer build"
        whatsappPrefill={`Hi Ashante, I just submitted a trailer build request on alindsayluxe.com — ${trailerType}.`}
      />
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="bg-ocean-deep px-6 pt-28 pb-10">
        <div className="max-w-[960px] mx-auto">
          <SectionLabel text="Custom Trailers & Mobile Kitchens" light />
          <h1 className="font-serif text-h2 md:text-display text-off-white mt-3">Start Your Trailer Build</h1>
          <p className="font-sans text-off-white/60 text-body mt-2 max-w-2xl">
            Five quick steps. We'll come back with a layout, a timeline, and a quote.
          </p>
        </div>
      </div>
      <RequestEngine
        steps={steps}
        step={step}
        setStep={setStep}
        busy={busy}
        onSubmit={onSubmit}
        submitLabel="Submit Request"
      />
    </main>
  );
}
