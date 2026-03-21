import { useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const sectionRef = useScrollReveal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // For now, just show success (no Supabase yet)
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[640px] mx-auto px-6 md:px-10 text-center reveal">
        <h2
          className="font-serif text-off-white font-medium mb-4"
          style={{ fontSize: "clamp(28px, 4vw, 40px)" }}
        >
          Be First to Know
        </h2>
        <p className="font-sans text-off-white/70 mb-10" style={{ fontSize: "17px" }}>
          Receive exclusive listings, market insights and curated buying guides before they go public.
        </p>

        {submitted ? (
          <div className="py-6">
            <p className="font-sans text-gold font-medium text-lg mb-2">You're on the list ✓</p>
            <p className="font-sans text-off-white/60 text-sm">We'll be in touch with exclusive opportunities.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border border-off-white/20 text-off-white font-sans px-5 py-3.5 text-sm placeholder:text-off-white/40 focus:outline-none focus:border-gold transition-colors duration-300"
              style={{ borderRadius: "0" }}
            />
            <button
              type="submit"
              className="cta-shimmer bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-medium small-caps tracking-widest text-sm px-6 py-3.5 transition-all duration-300 whitespace-nowrap"
            >
              Get Exclusive Access
            </button>
          </form>
        )}

        {error && <p className="font-sans text-red-400 text-sm mb-3">{error}</p>}

        {!submitted && (
          <p className="font-sans text-off-white/40 text-xs">
            No spam. Unsubscribe anytime. Your details are private.
          </p>
        )}
      </div>
    </section>
  );
}
