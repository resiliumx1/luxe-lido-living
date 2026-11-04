import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Sun/moon switch. Follows the system setting until the visitor picks one (remembered by next-themes). */
export default function ThemeSwitch({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`relative inline-flex items-center h-8 w-[60px] rounded-full border border-gold/50 bg-ink/40 backdrop-blur-sm transition-colors hover:border-gold ${className}`}
    >
      <Sun size={13} className={`absolute left-2 transition-opacity ${isDark ? "opacity-60 text-white" : "opacity-0"}`} aria-hidden="true" />
      <Moon size={13} className={`absolute right-2 transition-opacity ${isDark ? "opacity-0" : "opacity-60 text-white"}`} aria-hidden="true" />
      <span
        className={`absolute top-[3px] left-[3px] flex items-center justify-center w-6 h-6 rounded-full bg-gold text-ink shadow transition-transform duration-300 ${
          isDark ? "translate-x-[28px]" : "translate-x-0"
        }`}
        aria-hidden="true"
      >
        {isDark ? <Moon size={13} /> : <Sun size={13} />}
      </span>
    </button>
  );
}
