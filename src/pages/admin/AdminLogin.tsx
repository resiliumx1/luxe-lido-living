import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ArrowLeft, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated, loading } = useAdminAuth();

  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in as an admin — nothing to do here.
  if (!loading && isAuthenticated) {
    navigate("/admin", { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotice(null);

    if (!email.trim() || !password) {
      setError("Enter your email address and password.");
      return;
    }
    if (mode === "signup" && password.length < 8) {
      setError("Choose a password of at least 8 characters.");
      return;
    }

    setSubmitting(true);
    if (mode === "signin") {
      const { error: signInError } = await signIn(email.trim(), password);
      setSubmitting(false);
      if (signInError) {
        setError(signInError);
        return;
      }
      navigate("/admin", { replace: true });
    } else {
      const { error: signUpError, needsConfirmation } = await signUp(email.trim(), password);
      setSubmitting(false);
      if (signUpError) {
        setError(signUpError);
        return;
      }
      if (needsConfirmation) {
        setNotice("Check your email to confirm the account, then sign in.");
        setMode("signin");
      } else {
        navigate("/admin", { replace: true });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "hsl(210 40% 4%)" }}>
      <div className="w-full max-w-[400px]">
        <div
          className="bg-[hsl(210_40%_8%)] border border-white/[0.06] p-10"
          style={{ borderRadius: "12px" }}
        >
          <div className="flex justify-center mb-8">
            <img src="/logo-dark.svg" className="h-12" alt="A. Lindsay Luxe Estates" />
          </div>

          <h1 className="font-serif text-2xl text-white text-center mb-1">Admin Access</h1>
          <p className="font-sans text-sm text-white/40 text-center mb-8">Authorized personnel only</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="admin-email" className="block font-sans text-xs tracking-wide text-white/50 mb-2">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-gold/60 transition-colors duration-300 font-sans"
                style={{ borderRadius: "8px", height: "48px" }}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="admin-password" className="block font-sans text-xs tracking-wide text-white/50 mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.08] px-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-gold/60 transition-colors duration-300 font-sans"
                style={{ borderRadius: "8px", height: "48px" }}
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p role="alert" className="font-sans text-xs text-red-400">
                {error}
              </p>
            )}
            {notice && (
              <p role="status" className="font-sans text-xs text-gold">
                {notice}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold text-sm tracking-wide transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ borderRadius: "8px", height: "48px" }}
            >
              {submitting && <Loader2 size={16} className="animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Admin Account"}
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setMode(mode === "signin" ? "signup" : "signin");
              setError(null);
              setNotice(null);
            }}
            className="w-full font-sans text-[12px] text-white/40 hover:text-gold transition-colors duration-300 mt-4"
          >
            {mode === "signin" ? "First time? Create the admin account" : "Already have an account? Sign in"}
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-1.5 mt-6 font-sans text-sm text-white/40 hover:text-gold transition-colors duration-300"
          >
            <ArrowLeft size={14} />
            Back to Site
          </Link>
        </div>
      </div>
    </div>
  );
}
