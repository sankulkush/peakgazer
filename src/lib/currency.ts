import { RATES } from "@/content/company";
import type { AmountNPR, Currency } from "@/lib/schema";

/**
 * Content is authored in NPR; display defaults to INR because that is the
 * currency our buyer thinks in. Conversion happens here, at render, from the
 * manually maintained constant in company.ts — never from a live rate.
 */

const SYMBOL: Record<Currency, string> = {
  NPR: "रू",
  INR: "₹",
  USD: "$",
};

const LOCALE: Record<Currency, string> = {
  NPR: "ne-NP",
  INR: "en-IN",
  USD: "en-US",
};

export function convertFromNPR(amount: AmountNPR, to: Currency = "INR"): number {
  return amount * RATES[to];
}

/**
 * Rounds to whole units. These are indicative figures quoted in thousands —
 * showing paise would imply a precision the numbers do not have.
 */
export function formatFromNPR(
  amount: AmountNPR,
  to: Currency = "INR",
): string {
  const value = Math.round(convertFromNPR(amount, to));
  return `${SYMBOL[to]}${new Intl.NumberFormat(LOCALE[to]).format(value)}`;
}
