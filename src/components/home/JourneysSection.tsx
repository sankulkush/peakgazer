import Reveal from "@/components/common/Reveal";
import JourneyCard from "./JourneyCard";
import { getAllJourneys, getPublishedJourneys } from "@/lib/content";

/**
 * The centrepiece.
 *
 * Two featured treks carry the section and two sit secondary beneath them —
 * asymmetric by construction, never four equal cards. Featured slots are taken
 * in content order, which `lib/content.ts` sets deliberately.
 *
 * Draft journeys render here on purpose: this is the review surface, and the
 * chip on each card shows status at a glance. `getPublishedJourneys()` is what
 * gates the public index and sitemap.
 */
export default function JourneysSection() {
  // The homepage shows what is actually open. Everything else lives on /treks
  // with an "opening soon" state — the homepage is not the catalogue.
  const journeys = getPublishedJourneys();
  const featured = journeys.slice(0, 2);
  const secondary = journeys.slice(2);
  const comingSoon = getAllJourneys().length - journeys.length;

  return (
    <section
      id="journeys"
      className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            The treks
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            Open for booking now. Panchakunda is the rare one, and one of the
            two our founder has walked himself. Every price below falls as the
            group grows.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-5 lg:gap-10">
          {featured.map((journey, i) => (
            <Reveal
              key={journey.slug}
              delay={i * 0.1}
              className={
                i === 0
                  ? "lg:col-span-3"
                  : "lg:col-span-2 lg:mt-24"
              }
            >
              <JourneyCard journey={journey} featured />
            </Reveal>
          ))}
        </div>

        {secondary.length > 0 && (
          <div className="mt-20 grid gap-10 border-t border-[#e6dfd6]/8 pt-14 sm:grid-cols-2 lg:max-w-3xl">
            {secondary.map((journey, i) => (
              <Reveal key={journey.slug} delay={i * 0.1}>
                <JourneyCard journey={journey} />
              </Reveal>
            ))}
          </div>
        )}

        {comingSoon > 0 && (
          <Reveal className="mt-16 border-t border-[#e6dfd6]/8 pt-10">
            <p className="max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
              {comingSoon} more journeys are being prepared — Mardi Himal,
              Langtang, Tilicho Lake, the Manaslu Circuit and the ten-day
              Signature Journey. We publish a route when we have our own
              photographs and a day-by-day we have checked.{" "}
              <a
                href="/treks"
                className="text-[#f0c08c] underline-offset-4 hover:underline"
              >
                See all {getAllJourneys().length} with durations and altitudes →
              </a>
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
