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

/**
 * Format a price for display.
 *
 * @param {number}  amountInINR   Source price in INR.
 * @param {string}  currencyCode  'INR', 'USD', 'GBP', etc.
 * @param {number}  [usdAmount]   Optional hardcoded USD amount.
 *                                When provided (and currencyCode === 'USD'),
 *                                this is used directly instead of converting.
 * @returns {string} Formatted price string with currency symbol.
 */
export function formatMoney(amountInINR, currencyCode, usdAmount) {
  const currency = CURRENCIES[currencyCode] ?? CURRENCIES.INR;
  let rounded;

  if (currencyCode === 'USD' && usdAmount != null) {
    // Use hardcoded USD amount – floor to nearest integer (already floored in data)
    rounded = Math.floor(usdAmount);
  } else {
    const converted = convertFromINR(amountInINR, currencyCode);
    rounded = currencyCode === 'INR' ? Math.round(converted) : Math.round(converted * 100) / 100;
  }

  return `${currency.symbol}${rounded.toLocaleString(currency.locale, {
    maximumFractionDigits: currencyCode === 'INR' ? 0 : 0,
    minimumFractionDigits: 0,
  })}`;
}

/**
 * Checkout-time pricing rule (requirement):
 * - Learners billed in India pay in INR, inclusive of 18% GST shown as a separate line.
 * - Learners billed outside India pay in USD, no GST (Indian GST does not apply abroad).
 *
 * @param {number}  priceInINR   Course price in INR.
 * @param {object}  opts
 * @param {boolean} opts.isIndia Whether the learner is in India.
 * @param {number}  [opts.priceUSD] Optional hardcoded USD price. When provided
 *                                   for non-India checkout, used directly.
 * @param {string}  [opts.currencyCode] Selected currency code (e.g. from switcher).
 *                                      When set to 'USD', GST is not applied regardless of isIndia.
 * @returns {object} Breakdown with formatted labels.
 */
export function getCheckoutBreakdown(priceInINR, { isIndia, priceUSD, currencyCode: selectedCurrency }) {
  // If the user manually switched to USD (or any non-INR currency), skip GST
  const applyGST = isIndia && (!selectedCurrency || selectedCurrency === 'INR');

  if (applyGST) {
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

  // Show USD (no GST) when outside India OR user manually switched currency to USD
  const usdAmount = priceUSD ?? Math.floor(convertFromINR(priceInINR, 'USD'));
  return {
    currencyCode: 'USD',
    subtotalLabel: formatMoney(priceInINR, 'USD', usdAmount),
    taxLabel: null,
    taxRateLabel: null,
    totalLabel: formatMoney(priceInINR, 'USD', usdAmount),
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
