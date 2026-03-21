import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface OptionSelectorProps {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  name: string;
  className?: string;
}

export function OptionSelector({ options, value, onChange, name, className }: OptionSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {options.map((opt) => {
        const selected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={cn(
              "relative cursor-pointer select-none px-4 py-2.5 font-sans text-sm transition-all duration-200 border-[1.5px]",
              selected
                ? "bg-primary border-primary text-primary-foreground font-semibold"
                : "bg-card border-sand dark:border-muted text-foreground hover:border-primary/50 hover:bg-primary/5"
            )}
            style={{ borderRadius: "8px" }}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={selected}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            {opt.label}
          </label>
        );
      })}
    </div>
  );
}
