import type { Journey } from "@/lib/schema";
import { manaslu } from "@/content/journeys/manaslu";
import { pikeyPeak } from "@/content/journeys/pikey-peak";
import { mardi } from "@/content/journeys/mardi";
import { langtang } from "@/content/journeys/langtang";
import { abcShort } from "@/content/journeys/abc-short";
import { abcGhorepani } from "@/content/journeys/abc-ghorepani";
import { panchakunda } from "@/content/journeys/panchakunda";
import { abcSignature } from "@/content/journeys/abc-signature";
import { tilicho } from "@/content/journeys/tilicho";

/**
 * The only place that knows where journeys come from. Components consume the
 * `Journey` interface through these functions, never the content files, which
 * is what lets a CMS drop in behind this module without touching a component.
 */

/**
 * The seven launch treks, in homepage order. The first four are the priority
 * tier — our partner's strongest and least-crowded routes; the three Annapurna
 * treks follow as the secondary tier.
 *
 * Only Manaslu and Panchakunda are built. The other five are `draft`, so they
 * are excluded from generateStaticParams and their links 404 by design — that
 * is how the founder tracks what is built.
 */
const FEATURED: Journey[] = [
  manaslu,
  pikeyPeak,
  mardi,
  langtang,
  abcShort,
  abcGhorepani,
  panchakunda,
];

/** In the content layer but not on the homepage. */
const OTHER: Journey[] = [abcSignature, tilicho];

const JOURNEYS: Journey[] = [...FEATURED, ...OTHER];

export function getFeaturedJourneys(): Journey[] {
  return FEATURED;
}

export function getAllJourneys(): Journey[] {
  return JOURNEYS;
}

/**
 * Built and sellable. This is what generateStaticParams and the sitemap use —
 * a draft slug is never prerendered and therefore 404s.
 */
export function getPublishedJourneys(): Journey[] {
  return JOURNEYS.filter((journey) => journey.status === "published");
}

export function getJourney(slug: string): Journey | undefined {
  return JOURNEYS.find((journey) => journey.slug === slug);
}
