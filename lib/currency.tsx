import React, { createContext, useContext, useMemo, useState } from 'react';

export type Currency = 'USD' | 'INR';

/**
 * One currency choice, shared by everything on the page.
 *
 * The pricing table and the ROI calculator sit one above the other. The table
 * had a toggle and the calculator was hard-coded to dollars, so an Indian
 * visitor read "from ₹25,000" and then, two sections down, "$50 an hour" — the
 * two halves of the same page quoting different money. The toggle lives here
 * now and both read it, so there is one switch and never two.
 */
const CurrencyContext = createContext<{
  currency: Currency;
  setCurrency: (c: Currency) => void;
} | null>(null);

/** Indian visitors think in rupees; everyone else in dollars. Guess from the
 *  device, then let them override it. */
export const detectCurrency = (): Currency => {
  if (typeof window === 'undefined') return 'USD';
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    const locale = navigator.language || '';
    if (tz === 'Asia/Kolkata' || tz === 'Asia/Calcutta' || /-IN$/i.test(locale)) return 'INR';
  } catch {
    /* fall through to USD */
  }
  return 'USD';
};

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>(detectCurrency);
  const value = useMemo(() => ({ currency, setCurrency }), [currency]);
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
};

export const useCurrency = () => {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used inside a CurrencyProvider');
  return ctx;
};

/** Indian digit grouping for rupees (₹1,60,000, not ₹160,000), plain for dollars. */
export const formatMoney = (amount: number, currency: Currency) =>
  currency === 'INR'
    ? `₹${amount.toLocaleString('en-IN')}`
    : `$${amount.toLocaleString('en-US')}`;
