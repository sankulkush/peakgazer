import { isPending, type MaybeNumber, type Pending } from "@/lib/schema";

/**
 * One place that decides how an unconfirmed figure reads.
 *
 * Keeping it here means a PENDING value can never quietly render as "0m" or an
 * empty string somewhere — it always says the same honest thing.
 */
export const TBC = "to be confirmed";

export function altitude(value: MaybeNumber): string {
  return isPending(value) ? TBC : `${value.toLocaleString("en-IN")}m`;
}

export function metres(value: MaybeNumber): string {
  return isPending(value) ? TBC : `${value.toLocaleString("en-IN")}m`;
}

export function walking(
  value: [number, number] | null | Pending,
): { text: string; pending: boolean; walks: boolean } {
  if (value === null) return { text: "no walking", pending: false, walks: false };
  if (isPending(value))
    return { text: `walking hours ${TBC}`, pending: true, walks: true };
  return {
    text: `${value[0]}–${value[1]} hours walking`,
    pending: false,
    walks: true,
  };
}

/** The daily-walking range across a journey, or null when nothing is confirmed. */
export function walkingRange(
  days: ([number, number] | null | Pending)[],
): [number, number] | null {
  const known = days.filter(
    (d): d is [number, number] => d !== null && !isPending(d),
  );
  if (known.length === 0) return null;
  return [
    Math.min(...known.map((h) => h[0])),
    Math.max(...known.map((h) => h[1])),
  ];
}
