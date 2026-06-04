import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

interface SuccessStateProps {
  firstName: string;
  what: string; // "container order" | "trailer build"
  whatsappPrefill: string;
}

export default function SuccessState({ firstName, what, whatsappPrefill }: SuccessStateProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappPrefill)}`;
  return (
    <main id="main-content" className="min-h-[80vh] flex items-center justify-center px-6 pt-24 pb-16 bg-background">
      <div className="max-w-xl text-center">
        <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
          <Check size={28} className="text-gold" />
        </div>
        <p className="text-eyebrow text-primary mb-2">Request Received</p>
        <h1 className="font-serif text-h2 text-foreground mb-4">Ashante will be in touch.</h1>
        <p className="font-sans text-muted-foreground text-body mb-10 leading-relaxed">
          Thank you {firstName} — your {what} request has reached us. Ashante will review the details
          personally and reply within one business day. Check your inbox for a confirmation.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-sans font-semibold tracking-widest text-sm px-7 py-4 transition-all duration-300 uppercase"
          >
            <MessageCircle size={16} /> Follow Up on WhatsApp
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-1 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to home <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </main>
  );
}
