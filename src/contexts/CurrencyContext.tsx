import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CurrencyCode = "USD" | "XCD";

export const XCD_RATE = 2.70;

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (usdAmount: number) => string;
  convert: (usdAmount: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("luxe-currency") as CurrencyCode) || "USD";
    }
    return "USD";
  });

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    localStorage.setItem("luxe-currency", c);
  };

  const convert = (usdAmount: number) =>
    currency === "USD" ? usdAmount : Math.round(usdAmount * XCD_RATE);

  const formatPrice = (usdAmount: number) => {
    const value = convert(usdAmount);
    const formatted = value.toLocaleString("en-US");
    return currency === "USD" ? `$${formatted}` : `EC$${formatted}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error("useCurrency must be used within CurrencyProvider");
  return ctx;
}
