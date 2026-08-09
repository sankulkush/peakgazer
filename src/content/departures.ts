import type { GroupDeparture } from "@/lib/schema";

/**
 * Fixed group departures, shown on the homepage.
 *
 * EMPTY ON PURPOSE. None have been scheduled and confirmed yet, so the
 * homepage renders an honest "nothing scheduled — tell us your dates" state
 * rather than example rows. Invented dates with invented fill counts would be
 * fake scarcity, and a traveller would book against them.
 *
 * To publish one, add an entry — no component changes:
 *
 *   {
 *     date: "2026-11-20",
 *     journeySlug: "manaslu-circuit",
 *     capacity: 16,
 *     filled: 9,
 *     pricePerPerson: npr(128000),
 *     status: "verified",
 *   }
 */
export const DEPARTURES: GroupDeparture[] = [];

/** Only confirmed departures are ever shown. */
export function getOpenDepartures(): GroupDeparture[] {
  return DEPARTURES.filter(
    (d) => d.status === "verified" && d.filled < d.capacity,
  ).sort((a, b) => a.date.localeCompare(b.date));
}
