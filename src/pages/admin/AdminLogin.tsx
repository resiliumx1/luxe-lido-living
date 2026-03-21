import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuxeLogo } from "@/components/ui/LuxeLogo";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) {
      setError(err.message);
      setLoading(false);
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-ocean-deep flex items-center justify-center p-4">
      <div className="bg-card dark:bg-card w-full max-w-[400px] p-10" style={{ borderRadius: "16px", boxShadow: "0 16px 48px rgba(0,0,0,0.18)" }}>
        <div className="flex justify-center mb-8">
          <LuxeLogo size="lg" />
        </div>
        <h1 className="font-serif text-2xl text-foreground text-center mb-1">Admin Access</h1>
        <p className="text-caption text-center text-muted-foreground mb-7">A. Lindsay Luxe Estates</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-label block mb-1.5 text-foreground">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 bg-background border border-input text-foreground font-sans text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-colors"
              style={{ borderRadius: "8px" }}
              placeholder="ashante@alindsayluxe.com"
            />
          </div>
          <div>
            <label className="text-label block mb-1.5 text-foreground">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 px-4 pr-12 bg-background border border-input text-foreground font-sans text-sm placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20 outline-none transition-colors"
                style={{ borderRadius: "8px" }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPw ? "Hide password" : "Show password"}
              >
                {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground font-sans font-semibold text-sm tracking-wide py-3.5 transition-all hover:opacity-90 disabled:opacity-50"
            style={{ borderRadius: "8px", height: "52px" }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
