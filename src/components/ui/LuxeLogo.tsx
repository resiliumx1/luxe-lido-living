import { Link } from "react-router-dom";
import { useTheme } from "next-themes";

interface LuxeLogoProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  as?: "link" | "div";
}

export function LuxeLogo({ size = "md", onClick, as = "div" }: LuxeLogoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const fontSizes = { sm: "13px", md: "16px", lg: "22px" };
  const subSizes = { sm: "8px", md: "9px", lg: "11px" };
  const divWidths = { sm: "28px", md: "36px", lg: "48px" };

  const glow = isDark
    ? "drop-shadow(0 0 8px rgba(212,184,122,0.9)) drop-shadow(0 0 22px rgba(212,184,122,0.55)) drop-shadow(0 0 50px rgba(212,184,122,0.25))"
    : "drop-shadow(0 0 8px rgba(201,169,110,0.4)) drop-shadow(0 0 20px rgba(201,169,110,0.2))";

  const content = (
    <div
      className="flex flex-col items-start"
      style={{ filter: glow, transition: "filter 0.3s ease" }}
    >
      <span
        className="font-serif text-gold font-medium tracking-wide whitespace-nowrap"
        style={{ fontSize: fontSizes[size], lineHeight: 1.2 }}
      >
        A. Lindsay Luxe Estates
      </span>
      <span
        className="block bg-gold mx-0 my-1.5"
        style={{ width: divWidths[size], height: "1px" }}
      />
      <span
        className="font-sans text-off-white/60 tracking-[0.14em] uppercase"
        style={{ fontSize: subSizes[size], lineHeight: 1 }}
      >
        Luxury Real Estate · Antigua
      </span>
    </div>
  );

  if (as === "link") {
    return (
      <Link to="/" className="group shrink-0" onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <div className="shrink-0" onClick={onClick} role={onClick ? "button" : undefined} style={{ cursor: onClick ? "pointer" : undefined }}>
      {content}
    </div>
  );
}
