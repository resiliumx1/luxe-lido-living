import { Link } from "react-router-dom";

interface LuxeLogoProps {
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  as?: "link" | "div";
  variant?: "dark" | "light";
}

export function LuxeLogo({ size = "md", onClick, as = "div", variant = "dark" }: LuxeLogoProps) {
  const heights = { sm: "h-8", md: "h-10 lg:h-12", lg: "h-14" };
  const src = variant === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

  const content = (
    <img
      src={src}
      alt="A. Lindsay Luxe Estates"
      className={`${heights[size]} w-auto`}
    />
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
