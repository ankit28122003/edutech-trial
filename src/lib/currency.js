/**
 * Currency handling for course pricing.
 *
 * Source of truth for a course price is always INR (matches how prices are entered
 * in the admin panel / stored in MongoDB). Everything else is derived for display.
 *
 * NOTE on FX rates: these are static fallback rates for the frontend-only phase.
 * Once the backend is connected, replace `FX_RATES` with a live rate fetched from
 * `services/currencyService.js` (e.g. cached daily from an FX API) — no other file
 * needs to change because every component reads prices through `useCurrency()`.
 */

export const GST_RATE = 0.18; // 18% GST, applied only for India / INR checkout

export const CURRENCIES = {
  INR: { code: 'INR', symbol: '₹', locale: 'en-IN', rateFromINR: 1 },
  USD: { code: 'USD', symbol: '$', locale: 'en-US', rateFromINR: 1 / 83.5 },
  GBP: { code: 'GBP', symbol: '£', locale: 'en-GB', rateFromINR: 1 / 105.2 },
};

export function convertFromINR(amountInINR, currencyCode) {
  const currency = CURRENCIES[currencyCode] ?? CURRENCIES.INR;
  return amountInINR * currency.rateFromINR;
}

export function formatMoney(amountInINR, currencyCode) {
  const currency = CURRENCIES[currencyCode] ?? CURRENCIES.INR;
  const converted = convertFromINR(amountInINR, currencyCode);
  const rounded = currencyCode === 'INR' ? Math.round(converted) : Math.round(converted * 100) / 100;
  return `${currency.symbol}${rounded.toLocaleString(currency.locale, {
    maximumFractionDigits: currencyCode === 'INR' ? 0 : 2,
    minimumFractionDigits: 0,
  })}`;
}

/**
 * Checkout-time pricing rule (requirement):
 * - Learners billed in India pay in INR, inclusive of 18% GST shown as a separate line.
 * - Learners billed outside India pay in USD, no GST (Indian GST does not apply abroad).
 */
export function getCheckoutBreakdown(priceInINR, { isIndia }) {
  if (isIndia) {
    const gstAmount = Math.round(priceInINR * GST_RATE);
    return {
      currencyCode: 'INR',
      subtotalLabel: formatMoney(priceInINR, 'INR'),
      taxLabel: formatMoney(gstAmount, 'INR'),
      taxRateLabel: '18% GST',
      totalLabel: formatMoney(priceInINR + gstAmount, 'INR'),
      totalMinor: Math.round((priceInINR + gstAmount) * 100), // paise, for Razorpay
    };
  }

  const usdAmount = convertFromINR(priceInINR, 'USD');
  return {
    currencyCode: 'USD',
    subtotalLabel: formatMoney(priceInINR, 'USD'),
    taxLabel: null,
    taxRateLabel: null,
    totalLabel: formatMoney(priceInINR, 'USD'),
    totalMinor: Math.round(usdAmount * 100), // cents, for Razorpay international
  };
}

/**
 * Best-effort, frontend-only region guess (used only to pick a sensible default
 * currency on first load). The real, reliable check happens server-side at
 * checkout time via IP geolocation before creating the Razorpay order.
 */
export function guessIsIndiaFromTimezone() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    return tz === 'Asia/Calcutta' || tz === 'Asia/Kolkata';
  } catch {
    return true; // default to India if detection fails (primary market)
  }
}
