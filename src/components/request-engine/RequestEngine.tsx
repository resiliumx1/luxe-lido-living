import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

export interface StepDef {
  label: string;
  render: () => ReactNode;
  /** Return true / null when valid, or a string error to block progression. */
  validate?: () => string | null | true;
}

interface RequestEngineProps {
  steps: StepDef[];
  step: number;
  setStep: (n: number) => void;
  /** Optional running total + currency to show in the sticky footer. */
  totalLabel?: string;
  /** Disable Continue button (e.g. while submitting). */
  busy?: boolean;
  /** Called when user clicks the final Submit. */
  onSubmit: () => void;
  /** Final-step CTA text. */
  submitLabel?: string;
}

/**
 * Shared multi-step request engine.
 * - Progress indicator
 * - Inline validation banner per step
 * - Mobile-friendly nav
 * - Sticky footer with optional running total
 */
export default function RequestEngine({
  steps,
  step,
  setStep,
  totalLabel,
  busy,
  onSubmit,
  submitLabel = "Submit Request",
}: RequestEngineProps) {
  const current = steps[step];
  const last = step === steps.length - 1;
  const validationMsg =
    typeof current.validate === "function"
      ? (() => {
          const v = current.validate!();
          return typeof v === "string" ? v : null;
        })()
      : null;

  const next = () => {
    if (validationMsg) return;
    if (last) onSubmit();
    else setStep(step + 1);
  };

  return (
    <div className="max-w-[960px] mx-auto px-6 py-12 pt-28">
      {/* Progress bar */}
      <div className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          {steps.map((s, i) => (
            <div key={i} className="flex-1 flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-sm font-bold transition-colors ${
                  i <= step ? "bg-gold text-ocean-deep" : "bg-secondary text-muted-foreground"
                }`}
              >
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 ${i < step ? "bg-gold" : "bg-secondary"}`} />
              )}
            </div>
          ))}
        </div>
        <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
          Step {step + 1} of {steps.length} · <span className="text-foreground">{current.label}</span>
        </p>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {current.render()}
        </motion.div>
      </AnimatePresence>

      {/* Sticky footer */}
      <div className="sticky bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border mt-12 pt-6 pb-6 -mx-6 px-6">
        {validationMsg && (
          <p className="font-sans text-sm text-destructive mb-3" role="alert">
            {validationMsg}
          </p>
        )}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            {step > 0 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                disabled={busy}
                className="flex items-center gap-1 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
          </div>

          {totalLabel && (
            <div className="text-center order-first sm:order-none">
              <p className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                Estimated Starting Total
              </p>
              <p className="font-serif text-h4 text-foreground">{totalLabel}</p>
            </div>
          )}

          <button
            type="button"
            onClick={next}
            disabled={busy || !!validationMsg}
            className="flex items-center gap-1 cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold tracking-widest text-sm px-8 py-3 transition-all duration-300 uppercase disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {busy ? "Submitting…" : last ? submitLabel : "Continue"} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Small shared form atoms ─────────── */

export function FieldLabel({ children, required }: { children: ReactNode; required?: boolean }) {
  return (
    <label className="font-sans text-xs uppercase tracking-widest text-muted-foreground mb-2 block">
      {children}
      {required && <span className="text-gold ml-1">*</span>}
    </label>
  );
}

export function PillGroup<T extends string>({
  options,
  value,
  onChange,
  multi = false,
}: {
  options: { value: T; label: string; hint?: string }[];
  value: T | T[] | null;
  onChange: (v: T | T[]) => void;
  multi?: boolean;
}) {
  const isSelected = (v: T) =>
    multi ? Array.isArray(value) && value.includes(v) : value === v;
  const toggle = (v: T) => {
    if (multi) {
      const arr = Array.isArray(value) ? [...value] : [];
      const idx = arr.indexOf(v);
      if (idx >= 0) arr.splice(idx, 1);
      else arr.push(v);
      onChange(arr);
    } else {
      onChange(v);
    }
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {options.map((o) => {
        const selected = isSelected(o.value);
        return (
          <button
            type="button"
            key={o.value}
            onClick={() => toggle(o.value)}
            className={`text-left p-5 border transition-all duration-200 ${
              selected
                ? "border-gold bg-gold/5 text-foreground"
                : "border-border bg-card text-muted-foreground hover:border-gold/40"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <p className="font-sans font-semibold text-sm">{o.label}</p>
                {o.hint && (
                  <p className="font-sans text-xs text-muted-foreground mt-1 leading-relaxed">
                    {o.hint}
                  </p>
                )}
              </div>
              <div
                className={`w-5 h-5 ${multi ? "" : "rounded-full"} border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  selected ? "border-gold bg-gold" : "border-border"
                }`}
              >
                {selected && <Check size={12} className="text-ocean-deep" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${props.className ?? ""}`}
    />
  );
}

export function TextArea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-gold transition-colors min-h-[100px] ${props.className ?? ""}`}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={`w-full border border-border bg-card px-4 py-3 font-sans text-sm text-foreground focus:outline-none focus:border-gold transition-colors ${props.className ?? ""}`}
    />
  );
}
