import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[60] origin-left"
      style={{
        scaleX: scrollYProgress,
        background: "linear-gradient(90deg, hsl(var(--luxury-gold)), hsl(var(--luxury-gold-light)), hsl(var(--luxury-gold)))",
      }}
    />
  );
}
