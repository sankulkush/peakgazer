import Reveal from "@/components/common/Reveal";
import JourneyCard from "./JourneyCard";
import { getFeaturedJourneys } from "@/lib/content";

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
  // The seven launch treks. The first four are the priority tier — our
  // partner's strongest and least-crowded routes — and the three Annapurna
  // treks follow beneath them.
  const journeys = getFeaturedJourneys();
  const featured = journeys.slice(0, 2);
  const secondary = journeys.slice(2);

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
            Seven routes we run with our partner agency. Manaslu, Pikey Peak,
            Mardi and Langtang are the quiet ones; the Annapurna treks below
            them are the ones most people arrive asking for.
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
          <div className="mt-20 grid gap-10 border-t border-[#e6dfd6]/8 pt-14 sm:grid-cols-2 lg:grid-cols-3">
            {secondary.map((journey, i) => (
              <Reveal key={journey.slug} delay={i * 0.1}>
                <JourneyCard journey={journey} />
              </Reveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
