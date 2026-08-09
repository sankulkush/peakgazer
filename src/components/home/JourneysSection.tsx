import Reveal from "@/components/common/Reveal";
import TrekSlider from "./TrekSlider";
import { getJourney } from "@/lib/content";

/**
 * One screen, three treks on a rail, and the catalogue at the end of it.
 *
 * Deliberately not the whole list. Stacking every route down the homepage
 * makes it read as the boundary of what can be arranged, which is the
 * opposite of true — /treks is the browse layer and this is the way in.
 *
 * The three are named rather than taken off the top of the featured order, so
 * reordering the catalogue cannot silently change the shop window.
 */
const TOP = [
  "manaslu-circuit",
  "annapurna-base-camp-short",
  "panchakunda-north-abc",
];

export default function JourneysSection() {
  const journeys = TOP.map(getJourney).filter((j) => j !== undefined);

  return (
    <section
      id="journeys"
      className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              <a
                href="/treks"
                className="transition-colors duration-300 hover:text-[#f0c08c]"
              >
                The treks
              </a>
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
              Run with our partner agency, who have been working these routes
              since 1996. Every price falls as the group grows.
            </p>
          </div>

          <a
            href="/treks"
            className="group inline-flex shrink-0 items-center gap-2 text-[0.95rem] font-medium text-[#f0c08c] transition-colors duration-300 hover:text-[#f8d3a6]"
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

      <div className="mx-auto mt-12 max-w-6xl">
        <TrekSlider journeys={journeys} />
      </div>
    </section>
  );
}
