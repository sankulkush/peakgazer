import Image from "next/image";

/** TODO: supplied by the founder. Caption rule — name the place and the month. */
const HERO_CAPTION = "TODO — place, month year";

/**
 * Full-bleed photograph with a directional scrim.
 *
 * The scrim runs horizontally rather than being a flat overlay: this is a
 * high-key image (white snow, bright turquoise water) and uniform darkening
 * would destroy the right two thirds. Text lives in the shadowed left column;
 * the lake and the peaks stay clean.
 *
 * Two nested wrappers around the image on purpose — the outer is the parallax
 * target (scrubbed), the inner is the entrance target. Separate elements, so
 * neither animation writes to the other's transform.
 */
export default function HeroBackground() {
  return (
    <figure className="pointer-events-none absolute inset-0 m-0 overflow-hidden">
      {/* Over-tall, so a scrubbed vertical shift never exposes an edge. */}
      <div
        data-hero-image
        className="absolute inset-x-0 -inset-y-[7%] will-change-transform"
      >
        <div data-hero-image-inner className="absolute inset-0">
          <Image
            src="/images/hero/annapurna-lake.jpg"
            alt="A glacial lake below snow-covered peaks in the Annapurna region"
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover object-left sm:object-center"
          />
        </div>

        {/*
          A masked second copy of the photograph, counter-drifting so the cloud
          belt separated from the rock, was tried here and removed.

          Overlaying a scaled copy of a photo on itself doubles the sky's own
          gradient, which turned a soft tonal transition into a hard vertical
          seam — verified by an A/B capture, clearly visible at 1440. It read as
          a rendering fault, not as air moving.

          Doing this properly needs the clouds cut from the frame as an alpha
          layer, which is photo editing rather than code. Until that asset
          exists, the single ambient drift is the honest version.
        */}
      </div>

      {/* Below lg the text spans most of the width, so the scrim has to carry
          all the way across. Still directional, but the delta is small — there
          is pure white snow under the text here and it measures 1.6:1 without
          this much cover. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,12,18,0.86)_0%,rgba(10,12,18,0.78)_50%,rgba(10,12,18,0.72)_100%)] lg:hidden"
      />

      {/* lg and up: the text column ends at ~42% of the viewport, so the scrim
          holds to 46% and then falls away fast. Everything past 66% is the
          untouched photograph — snow, sky and lake stay clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,12,18,0.86)_0%,rgba(10,12,18,0.80)_25%,rgba(10,12,18,0.72)_46%,rgba(10,12,18,0.25)_58%,rgba(10,12,18,0)_66%)] lg:block"
      />

      {/* Holds the lower edge so the scroll indicator and caption stay legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,12,18,0)_60%,rgba(10,12,18,0.45)_100%)]"
      />

      {/* Bottom-LEFT deliberately: the persistent WhatsApp bar owns the
          bottom-right corner on every page, and the scroll indicator owns the
          centre. Three corners, no collision. */}
      <figcaption className="absolute bottom-5 left-6 z-10 max-w-[60%] text-[0.68rem] leading-snug text-[#e6dfd6]/55 sm:bottom-8 sm:left-10 lg:left-16">
        {HERO_CAPTION}
      </figcaption>
    </figure>
  );
}
