import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, animate } from "framer-motion";

const PHONE_DISPLAY = "+1 (268) 775-5221";
const PHONE_TEL = "+12687755221";
const INTRO_KEY = "luxe-intro-seen";
const EASE = [0.76, 0, 0.24, 1] as const;

type HeroMode = "video-desktop" | "video-tablet" | "poster";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getHeroMode(): HeroMode {
  if (prefersReducedMotion()) return "poster";
  const conn = (navigator as any).connection;
  if (conn?.effectiveType === "slow-2g" || conn?.effectiveType === "2g") return "poster";
  const width = window.innerWidth;
  if (width < 768) return "poster";
  if (width < 1024) return "video-tablet";
  return "video-desktop";
}

function shouldShowIntro() {
  if (typeof window === "undefined") return false;
  if (prefersReducedMotion()) return false;
  try {
    return sessionStorage.getItem(INTRO_KEY) !== "1";
  } catch {
    return false;
  }
}

/* ── Intro loader: logo mark draws in, gold line grows, counter 0–100, panel slides up. ≤1.8s ── */
function IntroLoader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.15,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => setLeaving(true),
    });
    return () => controls.stop();
  }, []);

  const block = (x: number, y: number, w: number, delay: number) => (
    <motion.rect
      x={x}
      y={y}
      width={w}
      height={14}
      rx={1}
      stroke="hsl(var(--gold))"
      strokeWidth={1}
      initial={{ pathLength: 0, fillOpacity: 0 }}
      animate={{ pathLength: 1, fillOpacity: 1 }}
      transition={{
        pathLength: { duration: 0.5, delay, ease: "easeInOut" },
        fillOpacity: { duration: 0.3, delay: delay + 0.4 },
      }}
      fill="hsl(var(--gold))"
    />
  );

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-espresso flex items-center justify-center"
      initial={{ y: 0 }}
      animate={leaving ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      onAnimationComplete={() => leaving && onDone()}
      aria-hidden="true"
    >
      <div className="flex flex-col items-center">
        <svg viewBox="-10 -2 100 54" className="w-24 md:w-28" fill="none">
          {block(22, 0, 36, 0)}
          {block(12, 18, 56, 0.12)}
          {block(0, 36, 80, 0.24)}
        </svg>
        <motion.span
          className="block h-px bg-gold mt-6 origin-left"
          style={{ width: 160 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: count / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
        />
      </div>
      <span
        className="absolute bottom-8 right-8 md:bottom-10 md:right-12 font-display font-light text-gold leading-none"
        style={{ fontSize: "clamp(40px, 6vw, 88px)", fontVariantNumeric: "lining-nums tabular-nums" }}
      >
        {count}
      </span>
    </motion.div>
  );
}

/* Masked line reveal */
function MaskLine({ children, delay, play }: { children: React.ReactNode; delay: number; play: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.04em]">
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={play ? { y: "0%" } : { y: "105%" }}
        transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function HeroSection() {
  const [mode, setMode] = useState<HeroMode>(() =>
    typeof window !== "undefined" ? getHeroMode() : "poster"
  );
  const [showIntro, setShowIntro] = useState<boolean>(shouldShowIntro);
  const [play, setPlay] = useState<boolean>(() => !shouldShowIntro());

  useEffect(() => {
    const update = () => setMode(getHeroMode());
    const mqs = [
      window.matchMedia("(prefers-reduced-motion: reduce)"),
      window.matchMedia("(max-width: 767px)"),
      window.matchMedia("(max-width: 1023px)"),
    ];
    mqs.forEach((m) => m.addEventListener("change", update));
    return () => mqs.forEach((m) => m.removeEventListener("change", update));
  }, []);

  useEffect(() => {
    if (!showIntro) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  const finishIntro = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
    setPlay(true);
  };

  const fade = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: play ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 },
    transition: { duration: 0.7, delay, ease: "easeOut" as const },
  });

  return (
    <>
      <AnimatePresence>{showIntro && <IntroLoader onDone={finishIntro} />}</AnimatePresence>

      <section className="on-dark relative h-[100svh] min-h-[600px] overflow-hidden text-white">
        {mode === "poster" ? (
          <img
            src="/hero/hero-poster.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            fetchPriority="high"
          />
        ) : (
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/hero/hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero/hero-loop.webm" type="video/webm" />
            {mode === "video-tablet" ? (
              <source src="/hero/hero-loop-mobile.mp4" type="video/mp4" />
            ) : (
              <source src="/hero/hero-loop.mp4" type="video/mp4" />
            )}
          </video>
        )}

        {/* Warm overlay + darker right half + bottom vignette for corner text */}
        <div className="absolute inset-0" style={{ background: "rgba(36,31,27,0.40)" }} />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, rgba(36,31,27,0) 35%, rgba(36,31,27,0.45) 60%, rgba(36,31,27,0.70) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{ background: "linear-gradient(to top, rgba(36,31,27,0.65), transparent)" }}
        />

        <div className="relative z-10 h-full px-6 md:px-12 pt-28 md:pt-32 pb-8 md:pb-12 flex flex-col">
          {/* Top-left */}
          <motion.div {...fade(1.0)}>
            <Link
              to="/contact"
              className="inline-block font-sans text-[12px] font-medium uppercase tracking-[0.14em] leading-[1.6] text-white hover:text-gold transition-colors"
            >
              Contact us
              <br />
              to discuss your
              <br />
              upcoming build
            </Link>
          </motion.div>

          {/* Headline + phone */}
          <div className="flex-1 flex flex-col justify-center items-start md:items-end text-left md:text-right">
            <h1
              className="hero-headline font-display font-light uppercase text-white"
              style={{ lineHeight: 0.9, letterSpacing: "-0.02em" }}
            >
              <MaskLine delay={0.1} play={play}>Your home,</MaskLine>
              <MaskLine delay={0.22} play={play}>Built right</MaskLine>
            </h1>

            <motion.a
              href={`tel:${PHONE_TEL}`}
              {...fade(0.6)}
              className="group relative mt-6 md:mt-8 font-display font-light text-white leading-none"
              style={{ fontSize: "clamp(30px, 3.6vw, 52px)", fontVariantNumeric: "lining-nums tabular-nums" }}
            >
              {PHONE_DISPLAY}
              <span className="absolute left-0 right-0 -bottom-2 h-px bg-white/80 origin-right scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </motion.a>
          </div>

          {/* Bottom row */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.p {...fade(1.0)} className="max-w-[360px] font-sans text-[15px] leading-[1.6] text-white">
              Block, container or insulated panel — priced honestly and built by vetted local trades, whether
              you're on island or overseas.
            </motion.p>
            <motion.div {...fade(1.1)}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-gold text-espresso font-sans text-sm font-semibold tracking-[0.04em] transition-colors hover:bg-gold-soft"
                style={{ padding: "18px 30px" }}
              >
                Get a build estimate <span aria-hidden="true">↗</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
