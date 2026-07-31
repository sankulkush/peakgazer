import type { Journey } from "@/lib/schema";
import { panchakunda } from "@/content/journeys/panchakunda";
import { abcShort } from "@/content/journeys/abc-short";
import { abcGhorepani } from "@/content/journeys/abc-ghorepani";
import { abcSignature } from "@/content/journeys/abc-signature";
import { mardi } from "@/content/journeys/mardi";
import { langtang } from "@/content/journeys/langtang";
import { tilicho } from "@/content/journeys/tilicho";
import { manaslu } from "@/content/journeys/manaslu";

/**
 * The only place that knows where journeys come from. Components consume the
 * `Journey` interface through these functions, never the content files, which
 * is what lets a CMS drop in behind this module without touching a component.
 *
 * Order is deliberate — it is the order the index renders them in. Panchakunda
 * leads: it is the rare route and one of only two the founder has walked.
 */
const JOURNEYS: Journey[] = [
  panchakunda,
  abcShort,
  abcGhorepani,
  abcSignature,
  mardi,
  langtang,
  tilicho,
  manaslu,
];

export function getAllJourneys(): Journey[] {
  return JOURNEYS;
}

/**
 * A journey is published only when it has both real photography and real
 * itinerary and cost detail. Drafts stay out of the sitemap and
 * generateStaticParams — but they DO appear in the /treks index carrying an
 * "opening soon" state, which is what `getAllJourneys` is for.
 */
export function getPublishedJourneys(): Journey[] {
  return JOURNEYS.filter((journey) => journey.status === "published");
}

export function getDraftJourneys(): Journey[] {
  return JOURNEYS.filter((journey) => journey.status === "draft");
}

export function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find((journey) => journey.slug === slug);
}
