import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleContinue = () => {
    login();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "hsl(210 40% 4%)" }}>
      <div className="w-full max-w-[400px]">
        <div
          className="bg-[hsl(210_40%_8%)] border border-white/[0.06] p-10"
          style={{ borderRadius: "12px" }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src="/logo-dark.svg" className="h-12" alt="A. Lindsay Luxe Estates" />
          </div>

          {/* Headline */}
          <h1 className="font-serif text-2xl text-white text-center mb-1">Admin Access</h1>
          <p className="font-sans text-sm text-white/40 text-center mb-8">Authorized personnel only</p>

          {/* Continue button */}
          <button
            onClick={handleContinue}
            className="w-full bg-gold hover:bg-gold-soft text-ocean-deep font-sans font-semibold text-sm tracking-wide transition-all duration-300"
            style={{ borderRadius: "8px", height: "48px" }}
          >
            Continue to Dashboard
          </button>

          {/* Dev note */}
          <p className="font-sans text-[11px] text-white/25 text-center mt-4">
            Development mode — auth pending
          </p>

          {/* Back to site */}
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
