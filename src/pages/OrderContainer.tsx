import { useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCurrency } from "@/contexts/CurrencyContext";
import { toast } from "sonner";
import RequestEngine, {
  FieldLabel,
  PillGroup,
  SelectInput,
  TextArea,
  TextInput,
  type StepDef,
} from "@/components/request-engine/RequestEngine";
import SuccessState from "@/components/request-engine/SuccessState";
import SectionLabel from "@/components/SectionLabel";

const CONTAINER_PRICES_XCD = { "20ft": 16500, "40ft": 19500 };

const USES = [
  { value: "storage", label: "Storage" },
  { value: "business", label: "Business / Commercial" },
  { value: "home", label: "Home Conversion" },
  { value: "hospitality", label: "Hospitality" },
  { value: "project", label: "Project / Site Use" },
];

const CROSS_SELL = [
  { value: "trailer", label: "Custom Food Trailer" },
  { value: "traditional_construction", label: "Traditional Construction" },
  { value: "insulated_panels", label: "Insulated Panel Build" },
  { value: "renovation", label: "Renovations & Trades" },
  { value: "property_land", label: "Property Sales & Land" },
  { value: "relocation", label: "Relocation Services" },
];

export default function OrderContainer() {
  const { currency, formatPriceFromXCD } = useCurrency();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<null | { firstName: string }>(null);

  // Step 1 — choice
  const [size, setSize] = useState<"20ft" | "40ft" | null>(null);
  const [condition, setCondition] = useState<"new" | "used" | null>(null);
  const [highCube, setHighCube] = useState(false);

  // Step 2 — qty + use
  const [quantity, setQuantity] = useState(1);
  const [uses, setUses] = useState<string[]>([]);

  // Step 3 — delivery
  const [deliveryNeeded, setDeliveryNeeded] = useState<"yes" | "no" | null>(null);
  const [deliveryScope, setDeliveryScope] = useState<"local" | "international" | null>(null);
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [deliveryCountry, setDeliveryCountry] = useState("");

  // Step 4 — cross-sell
  const [alsoInterested, setAlsoInterested] = useState<string[]>([]);

  // Step 5 — details
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [preferred, setPreferred] = useState<"whatsapp" | "email" | "call" | null>(null);
  const [notes, setNotes] = useState("");

  const unitPriceXCD = size ? CONTAINER_PRICES_XCD[size] : 0;
  const totalXCD = unitPriceXCD * quantity;
  const totalUSD = totalXCD / 2.7;
  const totalLabel = useMemo(() => (size ? formatPriceFromXCD(totalXCD) : undefined), [size, totalXCD, currency, formatPriceFromXCD]);

  const steps: StepDef[] = [
    {
      label: "Container",
      validate: () => (!size ? "Choose a container size" : !condition ? "Choose condition" : true),
      render: () => (
        <div>
          <SectionLabel text="Step 1" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">Choose Your Container</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8">
            Prices in {currency} — change in the header.
          </p>
          <FieldLabel required>Size</FieldLabel>
          <div className="mb-8">
            <PillGroup
              value={size}
              onChange={(v) => setSize(v as "20ft" | "40ft")}
              options={[
                { value: "20ft", label: "20ft Shipping Container", hint: `From ${formatPriceFromXCD(CONTAINER_PRICES_XCD["20ft"])}` },
                { value: "40ft", label: "40ft Shipping Container", hint: `From ${formatPriceFromXCD(CONTAINER_PRICES_XCD["40ft"])}` },
              ]}
            />
          </div>
          <FieldLabel required>Condition</FieldLabel>
          <div className="mb-8">
            <PillGroup
              value={condition}
              onChange={(v) => setCondition(v as "new" | "used")}
              options={[
                { value: "new", label: "New (one-trip)", hint: "Single voyage, near-pristine cosmetic condition" },
                { value: "used", label: "Used — cargo-worthy", hint: "Wind & watertight, inspected for service" },
              ]}
            />
          </div>
          <FieldLabel>High-cube (9'6")</FieldLabel>
          <button
            type="button"
            onClick={() => setHighCube(!highCube)}
            className={`w-full text-left p-5 border transition-all ${
              highCube ? "border-gold bg-gold/5" : "border-border bg-card hover:border-gold/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-sans font-semibold text-sm text-foreground">High-cube upgrade</p>
                <p className="font-sans text-xs text-muted-foreground mt-1">
                  Extra foot of interior height — better for conversions and tall equipment
                </p>
              </div>
              <div className={`w-10 h-6 rounded-full p-0.5 transition-colors ${highCube ? "bg-gold" : "bg-secondary"}`}>
                <div className={`w-5 h-5 rounded-full bg-background transition-transform ${highCube ? "translate-x-4" : ""}`} />
              </div>
            </div>
          </button>
        </div>
      ),
    },
    {
      label: "Quantity & Use",
      validate: () => (quantity < 1 ? "At least one unit" : uses.length === 0 ? "Select at least one intended use" : true),
      render: () => (
        <div>
          <SectionLabel text="Step 2" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-6">Quantity &amp; Intended Use</h2>

          <FieldLabel required>Number of units</FieldLabel>
          <div className="flex items-center gap-4 mb-8">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-10 h-10 border border-border bg-card hover:border-gold transition-colors font-sans text-lg"
            >−</button>
            <span className="font-serif text-h3 text-foreground w-12 text-center">{quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-10 h-10 border border-border bg-card hover:border-gold transition-colors font-sans text-lg"
            >+</button>
          </div>

          <FieldLabel required>Intended use (select all that apply)</FieldLabel>
          <PillGroup multi value={uses} onChange={(v) => setUses(v as string[])} options={USES as any} />
        </div>
      ),
    },
    {
      label: "Delivery",
      validate: () => {
        if (!deliveryNeeded) return "Tell us about delivery";
        if (deliveryNeeded === "yes" && !deliveryScope) return "Where should we deliver?";
        if (deliveryNeeded === "yes" && deliveryScope === "local" && !deliveryLocation.trim())
          return "Add a delivery location";
        if (deliveryNeeded === "yes" && deliveryScope === "international" && !deliveryCountry.trim())
          return "Add a destination country";
        return true;
      },
      render: () => (
        <div>
          <SectionLabel text="Step 3" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">Delivery</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8 italic">
            Note: delivery is arranged separately and is not included in the starting price.
          </p>

          <FieldLabel required>Do you need us to arrange delivery?</FieldLabel>
          <div className="mb-8">
            <PillGroup
              value={deliveryNeeded}
              onChange={(v) => setDeliveryNeeded(v as "yes" | "no")}
              options={[
                { value: "yes", label: "Yes — please quote delivery" },
                { value: "no", label: "No — I'll arrange pickup myself" },
              ]}
            />
          </div>

          {deliveryNeeded === "yes" && (
            <>
              <FieldLabel required>Delivery scope</FieldLabel>
              <div className="mb-8">
                <PillGroup
                  value={deliveryScope}
                  onChange={(v) => setDeliveryScope(v as "local" | "international")}
                  options={[
                    { value: "local", label: "Antigua & Barbuda" },
                    { value: "international", label: "International / ship anywhere" },
                  ]}
                />
              </div>

              {deliveryScope === "local" && (
                <>
                  <FieldLabel required>Delivery location</FieldLabel>
                  <TextInput
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="Parish, town, or site address"
                    maxLength={200}
                  />
                </>
              )}

              {deliveryScope === "international" && (
                <>
                  <FieldLabel required>Destination country</FieldLabel>
                  <TextInput
                    value={deliveryCountry}
                    onChange={(e) => setDeliveryCountry(e.target.value)}
                    placeholder="e.g. St. Lucia, Barbados, Trinidad"
                    maxLength={100}
                  />
                </>
              )}
            </>
          )}
        </div>
      ),
    },
    {
      label: "Also Exploring",
      render: () => (
        <div>
          <SectionLabel text="Step 4" />
          <h2 className="font-serif text-h3 text-foreground mt-3 mb-2">Anything else you're exploring?</h2>
          <p className="font-sans text-muted-foreground text-sm mb-8">
            Optional — helps Ashante prepare for your call.
          </p>
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
              <FieldLabel>Anything else (optional)</FieldLabel>
              <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} placeholder="Timeline, site notes, special requirements…" />
            </div>
          </div>

          <div className="bg-secondary border border-border p-5 mb-2">
            <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-3">Terms</p>
            <ul className="space-y-2 font-sans text-xs text-muted-foreground leading-relaxed">
              <li>◆ Prices shown are starting prices — final cost varies by condition, market &amp; availability.</li>
              <li>◆ Delivery is not included; arranged separately based on your site.</li>
              <li>◆ 50% deposit secures your unit; balance due before clearance &amp; release.</li>
              <li>◆ Every container is inspected before release — cargo-worthy, wind &amp; watertight.</li>
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
        size,
        condition,
        high_cube: highCube,
        quantity,
        intended_use: uses,
        delivery_needed: deliveryNeeded,
        delivery_scope: deliveryScope,
        delivery_location: deliveryLocation || null,
        delivery_country: deliveryCountry || null,
        unit_starting_price_xcd: unitPriceXCD,
        total_starting_price_xcd: totalXCD,
      };

      const { data, error } = await supabase.functions.invoke("submit-service-request", {
        body: {
          request_type: "container_order",
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || undefined,
          country: country.trim() || undefined,
          preferred_contact: preferred,
          payload,
          estimated_total: Math.round(totalUSD),
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
        what="container order"
        whatsappPrefill={`Hi Ashante, I just submitted a container order on alindsayluxe.com — ${quantity}× ${size} (${condition}${highCube ? ", high-cube" : ""}).`}
      />
    );
  }

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <div className="bg-ocean-deep px-6 pt-28 pb-10">
        <div className="max-w-[960px] mx-auto">
          <SectionLabel text="Container Solutions" light />
          <h1 className="font-serif text-h2 md:text-display text-off-white mt-3">Order a Container</h1>
          <p className="font-sans text-off-white/60 text-body mt-2 max-w-2xl">
            Five quick steps. We'll confirm availability and send a tailored quote within 24 hours.
          </p>
        </div>
      </div>
      <RequestEngine
        steps={steps}
        step={step}
        setStep={setStep}
        totalLabel={totalLabel}
        busy={busy}
        onSubmit={onSubmit}
        submitLabel="Submit Order"
      />
    </main>
  );
}
