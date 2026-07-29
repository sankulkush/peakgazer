import type { Currency, Rates } from "@/lib/schema";

/** TODO: brand name is unresolved — the repo name is a placeholder. */
export const COMPANY_NAME = "Uthbus Tours";

/**
 * Our fulfilment partner. We are an inquiry-first travel company, not an
 * operator — we do not claim to run the treks ourselves. Their licence and
 * registration back every permit, so their licence number must appear on site.
 */
export const PARTNER_NAME = "Adventure Walk Way Pvt. Ltd.";

/**
 * TODO: real number before anything ships. International format, digits only,
 * no `+` and no spaces — this is interpolated straight into a wa.me link.
 */
export const WHATSAPP_NUMBER = "TODO_WHATSAPP_NUMBER";

/** TODO */
export const INSTAGRAM_HANDLE = "TODO_INSTAGRAM_HANDLE";

/**
 * TODO: partner agency licence number, displayed on the site.
 * Rendered as "Licence no. — pending" until this is a real value.
 */
export const LICENCE_NUMBER: string | null = null;

/** TODO: registered address of the partner agency. */
export const REGISTERED_ADDRESS: string | null = null;

/** A commitment we have to be able to keep in a bad week, not an aspiration. */
export const RESPONSE_TIME = "within 24 hours";

/**
 * Manually maintained. Do NOT fetch live rates — a build-time constant with a
 * visible "rates as of" note is honest, offline-safe and adequate.
 *
 * Content is authored in NPR. Each value converts 1 NPR into that currency.
 */
export const RATES: Rates = { NPR: 1, INR: 0.625, USD: 0.00725 };

/** Shown next to any converted price, so the reader knows how stale it is. */
export const RATES_UPDATED = "2026-07-28";

/** Our buyer thinks in rupees; they should never have to do the arithmetic. */
export const DEFAULT_CURRENCY: Currency = "INR";
