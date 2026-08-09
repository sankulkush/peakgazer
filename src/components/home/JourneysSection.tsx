import Reveal from "@/components/common/Reveal";
import TrekRow from "./TrekRow";
import InlinePhoto from "./InlinePhoto";
import { getJourney } from "@/lib/content";
import { PENDING } from "@/lib/schema";

/**
 * One screen, three treks, and one button to the rest of them.
 *
 * Deliberately not the whole list. Stacking every route down the homepage
 * makes it read as the boundary of what can be arranged, which is the
 * opposite of true — /treks is the browse layer and this is the way in.
 *
 * The three are named rather than taken off the top of the featured order, so
 * reordering the catalogue cannot silently change the shop window.
 *
 * Panchakunda leads because the first card is the one that opens on arrival,
 * and it is the only one of the three with a photograph. A grey "photograph
 * pending" box is survivable in a narrow card and not in the wide one.
 */
const TOP = [
  "panchakunda-north-abc",
  "annapurna-base-camp-short",
  "manaslu-circuit",
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
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#f0c08c]/35 px-6 py-3 text-[0.9rem] font-medium text-[#f0c08c] transition-colors duration-300 hover:border-[#f0c08c] hover:bg-[#f0c08c] hover:text-[#14110b]"
          >
            Explore all treks
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
        <TrekRow journeys={journeys} />
      </div>

      {/* The meal, shown rather than listed. Sits under the row at the width
          of a single narrow card so it reads as a note on the treks above,
          not as a fourth trek. */}
      <div className="mx-auto mt-14 max-w-6xl">
        <Reveal delay={0.06}>
          <InlinePhoto
            src="/images/home/dal-bhat.jpg"
            alt="A steel thali of rice, dal, greens, curried meat and pickle on a scarred wooden teahouse table, with a second plate at the edge of the frame"
            width={1092}
            height={859}
            place={PENDING}
            month={PENDING}
            year={PENDING}
            sizes="(max-width: 640px) 88vw, 20rem"
            className="max-w-[20rem]"
          />
        </Reveal>
      </div>
    </section>
  );
}
