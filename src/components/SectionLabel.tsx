interface SectionLabelProps {
  text: string;
  light?: boolean;
}

export default function SectionLabel({ text, light = false }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <span className="gold-line w-10 flex-shrink-0" />
      <span
        className={`small-caps text-xs tracking-widest font-sans ${
          light ? "text-gold" : "text-gold"
        }`}
      >
        {text}
      </span>
    </div>
  );
}
