import { WHATSAPP_NUMBER } from "@/content/company";

/**
 * WhatsApp deep links.
 *
 * WhatsApp is the primary conversion action on every page, so the message is
 * pre-filled: the visitor should never face an empty box and have to compose an
 * opening line. The prefill also tells us which page they came from, which is
 * the difference between a useful first reply and a generic one.
 *
 * Where the group size is not known, the message leaves a blank for the sender
 * to fill rather than omitting it — group size is the single most useful thing
 * to know before quoting, because the per-head price turns on it.
 */

export type WhatsAppContext = {
  /** Omit for a general enquiry not tied to one trek. */
  journeyName?: string;
  /** Known only where the visitor has already told us, e.g. the group section. */
  groupSize?: number;
};

/** True once a real number replaces the placeholder in company.ts. */
export function hasWhatsAppNumber(): boolean {
  return /^\d{8,15}$/.test(WHATSAPP_NUMBER);
}

export function whatsAppMessage({
  journeyName,
  groupSize,
}: WhatsAppContext = {}): string {
  const people = groupSize ? `${groupSize} people` : "____ people";

  if (journeyName) {
    return `Hi, I'm interested in ${journeyName} for ${people}. Could you send available dates and the cost per person?`;
  }
  return `Hi, I'd like to plan a trek for ${people}. Could you help me work out which one suits us?`;
}

/**
 * Returns `null` when no real number is configured, so callers can render the
 * action as visibly pending rather than linking somewhere broken. Never
 * fabricate a number — a dead WhatsApp link is worse than an honest one.
 */
export function whatsAppHref(context: WhatsAppContext = {}): string | null {
  if (!hasWhatsAppNumber()) return null;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsAppMessage(context))}`;
}
