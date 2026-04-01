import React from "react";

const iconProps = {
  viewBox: "0 0 48 48",
  fill: "none",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "w-8 h-8",
  xmlns: "http://www.w3.org/2000/svg",
};

export function IconDiamond({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M24 4L40 18L24 44L8 18L24 4Z" />
      <path d="M8 18H40" />
      <path d="M24 4L18 18L24 44" opacity={0.5} />
      <path d="M24 4L30 18L24 44" opacity={0.5} />
    </svg>
  );
}

export function IconCrown({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M8 36H40V40H8V36Z" />
      <path d="M8 36L12 16L24 24L36 16L40 36" />
      <circle cx="12" cy="14" r="2" />
      <circle cx="24" cy="12" r="2" />
      <circle cx="36" cy="14" r="2" />
    </svg>
  );
}

export function IconPillar({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M14 10H34" />
      <path d="M16 10V38" />
      <path d="M32 38V10" />
      <path d="M12 38H36" />
      <path d="M14 8H34L36 10H12L14 8Z" />
      <path d="M12 38L10 40H38L36 38" />
      <path d="M20 14V34" opacity={0.4} />
      <path d="M24 14V34" opacity={0.4} />
      <path d="M28 14V34" opacity={0.4} />
    </svg>
  );
}

export function IconShield({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M24 4L40 12V24C40 34 32 40 24 44C16 40 8 34 8 24V12L24 4Z" />
      <path d="M16 24L22 30L32 18" />
    </svg>
  );
}

export function IconLeaf({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M12 38C12 38 14 18 34 10C34 10 36 30 16 38" />
      <path d="M12 38C12 38 20 28 34 10" />
      <path d="M16 36C16 36 18 22 32 16" opacity={0.5} />
    </svg>
  );
}

export function IconCompass({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <circle cx="24" cy="24" r="18" />
      <path d="M24 8V12" />
      <path d="M24 36V40" />
      <path d="M8 24H12" />
      <path d="M36 24H40" />
      <path d="M18 18L22 24L24 22L30 30L26 24L24 26L18 18Z" fill="currentColor" opacity={0.3} />
    </svg>
  );
}

export function IconBlueprint({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <rect x="8" y="6" width="32" height="36" rx="1" />
      <path d="M14 12H34" opacity={0.4} />
      <path d="M14 18H34" opacity={0.4} />
      <path d="M14 24H34" opacity={0.4} />
      <path d="M14 30H26" opacity={0.4} />
      <rect x="16" y="20" width="10" height="8" opacity={0.6} />
    </svg>
  );
}

export function IconShip({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M6 32C10 28 14 30 18 28C22 30 26 28 30 30C34 28 38 30 42 28" />
      <path d="M6 36C10 32 14 34 18 32C22 34 26 32 30 34C34 32 38 34 42 32" opacity={0.5} />
      <path d="M14 26H34V18H14V26Z" />
      <path d="M10 26L14 18" />
      <path d="M38 26L34 18" />
      <path d="M22 18V12H26V18" />
    </svg>
  );
}

export function IconKey({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <circle cx="16" cy="18" r="8" />
      <circle cx="16" cy="18" r="4" opacity={0.4} />
      <path d="M22 22L40 40" />
      <path d="M34 34L38 30" />
      <path d="M30 38L34 34" />
    </svg>
  );
}

export function IconStorefront({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M8 18H40V40H8V18Z" />
      <path d="M6 12L8 18H40L42 12H6Z" />
      <path d="M6 12C6 12 10 8 24 8C38 8 42 12 42 12" />
      <path d="M20 28H28V40H20V28Z" />
    </svg>
  );
}

export function IconCup({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M10 16H34V34C34 37 31 40 28 40H16C13 40 10 37 10 34V16Z" />
      <path d="M34 20H38C40 20 42 22 42 24C42 26 40 28 38 28H34" />
      <path d="M18 8C18 8 18 12 20 12C22 12 22 8 22 8" opacity={0.5} />
      <path d="M24 6C24 6 24 12 26 12C28 12 28 6 28 6" opacity={0.5} />
    </svg>
  );
}

export function IconTower({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <rect x="12" y="8" width="24" height="34" />
      <path d="M16 14H20V18H16V14Z" opacity={0.5} />
      <path d="M28 14H24V18H28V14Z" opacity={0.5} />
      <path d="M16 22H20V26H16V22Z" opacity={0.5} />
      <path d="M28 22H24V26H28V22Z" opacity={0.5} />
      <path d="M16 30H20V34H16V30Z" opacity={0.5} />
      <path d="M28 30H24V34H28V30Z" opacity={0.5} />
      <path d="M20 36H28V42H20V36Z" />
    </svg>
  );
}

export function IconPalm({ className }: { className?: string }) {
  return (
    <svg {...iconProps} className={className || iconProps.className} stroke="currentColor">
      <path d="M24 20V42" />
      <path d="M24 20C24 20 16 14 10 16" />
      <path d="M24 20C24 20 18 10 12 8" />
      <path d="M24 20C24 20 24 8 24 6" />
      <path d="M24 20C24 20 30 10 36 8" />
      <path d="M24 20C24 20 32 14 38 16" />
    </svg>
  );
}
