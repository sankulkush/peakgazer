import type { Journey } from "@/lib/schema";
import { abcShort } from "@/content/journeys/abc-short";
import { abcGhorepani } from "@/content/journeys/abc-ghorepani";
import { mardi } from "@/content/journeys/mardi";

/**
 * The only place that knows where journeys come from. Components consume the
 * `Journey` interface through these functions, never the content files, which
 * is what lets a CMS drop in behind this module without touching a component.
 *
 * INCOMPLETE: Langtang Valley is one of the core four but has no source
 * document available — the packages doc records it as "documented in the
 * earlier packages spec" and does not re-specify it. Its itinerary must not be
 * invented, so it is absent rather than stubbed.
 *
 * Order is deliberate: it is the order the homepage renders them in.
 */
const JOURNEYS: Journey[] = [abcShort, mardi, abcGhorepani];

export function getAllJourneys(): Journey[] {
  return JOURNEYS;
}

/**
 * Draft journeys carry unconfirmed prices. They must never reach the public
 * index, the sitemap, or generateStaticParams.
 */
export function getPublishedJourneys(): Journey[] {
  return JOURNEYS.filter((journey) => journey.status === "published");
}

export function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find((journey) => journey.slug === slug);
}
