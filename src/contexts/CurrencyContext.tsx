import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "USD" | "XCD" | "CAD";

// Conversion rates expressed as units per 1 USD.
// XCD is pegged at 2.70. CAD is an indicative rate — refresh if it drifts.
export const XCD_RATE = 2.70;
export const CAD_RATE = 1.38;

const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  XCD: XCD_RATE,
  CAD: CAD_RATE,
};

// Symbols use distinct prefixes so it's unambiguous which currency is shown.
const SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  XCD: "EC$",
  CAD: "CA$",
};

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  formatPriceFromXCD: (xcdAmount: number) => string;
  convert: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("luxe-currency") as CurrencyCode | null;
      if (stored && stored in RATES) return stored;
    }
    return "USD";
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem("luxe-currency", c);
  };

  const convert = (usdAmount: number) =>
    currency === "USD" ? usdAmount : Math.round(usdAmount * RATES[currency]);

  const formatPrice = (usdAmount: number) => {
    const value = convert(usdAmount);
    const formatted = value.toLocaleString("en-US");
    return `${SYMBOLS[currency]}${formatted}`;
  };

  // For prices quoted natively in XCD (container shells, etc.).
  // Converts XCD → USD first, then applies the active display currency.
  const formatPriceFromXCD = (xcdAmount: number) => {
    const usd = xcdAmount / XCD_RATE;
    return formatPrice(usd);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatPriceFromXCD, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
