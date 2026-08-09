import Reveal from "@/components/common/Reveal";
import JourneyCard from "./JourneyCard";
import { getJourney } from "@/lib/content";

/**
 * One screen, two treks, and a way through to everything else.
 *
 * Deliberately not the catalogue. Stacking every route down the homepage makes
 * the list read as the limit of what can be arranged, which is the opposite of
 * true — /treks is the browse layer and this is the way into it.
 */
export default function JourneysSection() {
  // Named explicitly rather than taken off the top of the featured order —
  // these two are the shop window and should not move when the order does.
  const top = ["manaslu-circuit", "annapurna-base-camp-short"]
    .map(getJourney)
    .filter((j) => j !== undefined);

  return (
    <section
      id="journeys"
      className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            Where we spend most of our time
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            Run with our partner agency, who have been working these routes
            since 1996. Every price falls as the group grows.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8">
          {top.map((journey, i) => (
            <Reveal key={journey.slug} delay={i * 0.08}>
              <JourneyCard journey={journey} featured />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 border-t border-[#e6dfd6]/8 pt-8">
          <a
            href="/treks"
            className="group inline-flex items-center gap-2 font-display text-[1.05rem] font-medium text-[#f0c08c] transition-colors duration-300 hover:text-[#f8d3a6]"
          >
            View all treks
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
