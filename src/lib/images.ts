import type { ImageRole, Journey, JourneyImage } from "@/lib/schema";

/**
 * Orientation rules for the whole site.
 *
 * Most of our photography is shot on a phone, held upright. Forcing a portrait
 * frame into a wide slot with object-fit: cover is what removes people's heads
 * and mountain summits — so the slot adapts to the photograph, never the other
 * way round.
 *
 * The threshold is 1.4 rather than 1.0 deliberately: a near-square frame
 * (annapurna-i.jpg is 2560×2183, 1.17) still loses its subject in a 2.7:1
 * full-bleed band. Only genuinely wide frames earn a wide slot.
 */
const WIDE_RATIO = 1.4;

export type Shape = "wide" | "upright";

export function imageShape(image: JourneyImage): Shape {
  if (!image.width || !image.height) return "upright";
  return image.width / image.height >= WIDE_RATIO ? "wide" : "upright";
}

export function findImage(
  journey: Journey,
  role: ImageRole,
): JourneyImage | undefined {
  return journey.images.find((i) => i.role === role);
}

/** True only when a real, genuinely wide photograph exists for this role. */
export function hasWideImage(journey: Journey, role: ImageRole): boolean {
  const image = findImage(journey, role);
  return image ? imageShape(image) === "wide" : false;
}

/** The photograph's own ratio, so it can render uncropped. */
export function naturalRatio(image: JourneyImage): string {
  return `${image.width} / ${image.height}`;
}
