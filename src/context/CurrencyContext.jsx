import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { CURRENCIES, formatMoney, getCheckoutBreakdown, guessIsIndiaFromTimezone } from '../lib/currency';

const CurrencyContext = createContext(null);
const STORAGE_KEY = 'edutech_currency';

export function CurrencyProvider({ children }) {
  const [isIndia] = useState(guessIsIndiaFromTimezone);
  const [currencyCode, setCurrencyCode] = useState(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (saved && CURRENCIES[saved]) return saved;
    return guessIsIndiaFromTimezone() ? 'INR' : 'USD';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currencyCode);
  }, [currencyCode]);

  const value = useMemo(
    () => ({
      currencyCode,
      setCurrencyCode,
      isIndia,
      currency: CURRENCIES[currencyCode],
      format: (amountInINR) => formatMoney(amountInINR, currencyCode),
      getCheckoutBreakdown: (priceInINR) => getCheckoutBreakdown(priceInINR, { isIndia }),
    }),
    [currencyCode, isIndia]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within a CurrencyProvider');
  return ctx;
}
