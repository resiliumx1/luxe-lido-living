export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <h1 className="font-display text-4xl text-foreground">{title}</h1>
    </div>
  );
}
