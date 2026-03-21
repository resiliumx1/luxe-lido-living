import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export default function LeadCapture() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const sectionRef = useScrollReveal();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    const { error: dbError } = await supabase.from("leads").insert({ email, source: "website" });
    if (dbError) {
      if (dbError.code === "23505") {
        setError("You're already on the list!");
      } else {
        setError("Something went wrong — please try again.");
      }
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section className="py-24 bg-ocean-deep" ref={sectionRef}>
      <div className="max-w-[640px] mx-auto px-6 md:px-10 text-center reveal">
        <h2 className="font-serif text-off-white font-medium mb-4" style={{ fontSize: "clamp(28px, 4vw, 40px)" }}>
          Be First to Know
        </h2>
        <p className="font-sans text-off-white/70 mb-10" style={{ fontSize: "17px" }}>
          Receive exclusive listings, market insights and curated buying guides before they go public.
        </p>

        {submitted ? (
          <div className="py-6">
            <p className="font-sans text-primary font-medium text-lg mb-2">You're on the list ✓</p>
            <p className="font-sans text-off-white/60 text-sm">We'll be in touch with exclusive opportunities.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent border-[1.5px] border-off-white/20 text-off-white font-sans px-5 py-3.5 text-sm placeholder:text-off-white/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              style={{ borderRadius: "8px" }}
            />
            <button
              type="submit"
              disabled={submitting}
              className="cta-shimmer bg-primary hover:bg-accent text-primary-foreground font-sans font-medium small-caps tracking-widest text-sm px-6 py-3.5 transition-all duration-300 whitespace-nowrap disabled:opacity-50"
            >
              {submitting ? "Joining..." : "Get Exclusive Access"}
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
