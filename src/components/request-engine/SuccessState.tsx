import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, MessageCircle, ArrowRight } from "lucide-react";
import { WHATSAPP_NUMBER } from "@/lib/contact";

interface SuccessStateProps {
  firstName: string;
  what: string; // "container order" | "trailer build"
  whatsappPrefill: string;
}

const NEXT_STEPS = [
  "Ashante reads your specification personally — usually the same working day.",
  "She replies by WhatsApp or email within one business day with availability and indicative pricing.",
  "You get a written quote and a timeline before anything is booked in or paid.",
];

const rise = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function SuccessState({ firstName, what, whatsappPrefill }: SuccessStateProps) {
  const wa = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappPrefill)}`;
  return (
    <main id="main-content" className="min-h-[80vh] flex items-center justify-center px-6 pt-24 pb-16 bg-background">
      <div className="max-w-xl text-center">
        <motion.div
          className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          <motion.span
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.18, duration: 0.35 }}
          >
            <Check size={28} className="text-gold" />
          </motion.span>
        </motion.div>

        <motion.p {...rise} transition={{ delay: 0.2, duration: 0.4 }} className="text-eyebrow text-primary mb-2">
          Request Received
        </motion.p>
        <motion.h1
          {...rise}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="font-serif text-h2 text-foreground mb-4"
        >
          Ashante will be in touch.
        </motion.h1>
        <motion.p
          {...rise}
          transition={{ delay: 0.36, duration: 0.45 }}
          className="font-sans text-muted-foreground text-body mb-10 leading-relaxed"
        >
          Thank you {firstName} — your {what} request has reached us and nothing has been charged. Here is what
          happens next.
        </motion.p>

        <motion.ol
          className="mx-auto mb-10 max-w-md space-y-3 text-left"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } } }}
        >
          {NEXT_STEPS.map((line, index) => (
            <motion.li
              key={line}
              className="flex items-start gap-3"
              variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                {index + 1}
              </span>
              <span className="font-sans text-sm text-muted-foreground leading-relaxed">{line}</span>
            </motion.li>
          ))}
        </motion.ol>

        <motion.div
          {...rise}
          transition={{ delay: 0.95, duration: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
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
        </motion.div>
      </div>
    </main>
  );
}
