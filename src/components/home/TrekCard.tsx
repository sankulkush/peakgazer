import ImageSlot from "@/components/journey/ImageSlot";
import { formatFromNPR } from "@/lib/currency";
import { TBC, altitude, count } from "@/lib/format";
import type { Journey } from "@/lib/schema";

const DIFFICULTY: Record<number, string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate–demanding",
  4: "Demanding",
};

/**
 * One card in the trek row.
 *
 * Two states, and the widths are fixed rather than shared: the row is meant to
 * overflow, so a closed card keeps its size when its neighbour opens instead of
 * collapsing to make room. A closed card is roughly two-thirds of an open one —
 * clearly secondary, still large enough to read the altitude and the price off.
 *
 * Closed cards drop down the page a little, which is what gives the row its
 * rhythm, and 220ms is the whole transition: long enough to read as a move,
 * short enough that running the mouse along the row does not feel syrupy.
 */
export default function TrekCard({
  journey,
  open,
  onOpen,
}: {
  journey: Journey;
  open: boolean;
  onOpen: () => void;
}) {
  const eight = journey.price.groupTiers.find((t) => t.groupSize === 8);

  return (
    <article
      onMouseEnter={onOpen}
      onFocus={onOpen}
      className={`group shrink-0 transition-all duration-200 ease-out motion-reduce:transition-none w-[78vw] sm:w-[22rem] ${
        open ? "lg:mt-0 lg:w-[34rem]" : "lg:mt-16 lg:w-[23rem]"
      }`}
    >
      <a href={`/journeys/${journey.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
          <ImageSlot
            journey={journey}
            role="hero"
            label={journey.name}
            sizes="(max-width: 640px) 78vw, (max-width: 1024px) 22rem, 34rem"
            fill
          />
        </div>

        <h3
          className={`mt-5 font-display font-semibold tracking-[-0.015em] text-[#f7f2ea] transition-colors duration-200 group-hover:text-[#f0c08c] ${
            open ? "text-[1.5rem]" : "text-[1.2rem]"
          }`}
        >
          {journey.name}
        </h3>

        <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[#e6dfd6]/65 tabular-nums">
          <span>{count(journey.days, "days")}</span>
          <span>{altitude(journey.maxAltitudeM)}</span>
          <span>{DIFFICULTY[journey.difficulty]}</span>
        </p>

        {/* Two of the three have no negotiated tiers yet. Rendering nothing
            there reads as a missing line rather than a known gap, and the
            alternative — a guessed figure — is the one thing this site cannot
            do. So the gap is named. */}
        {eight ? (
          <p className="mt-3 text-[0.9rem] text-[#e9c9a8]">
            from {formatFromNPR(eight.perPerson)} per person at 8 travellers
            <span className="ml-2 text-[0.7rem] text-[#e6dfd6]/40">
              indicative
            </span>
          </p>
        ) : (
          <p className="mt-3 text-[0.9rem] text-[#e6dfd6]/45">
            Price {TBC} — message us and we will quote it
          </p>
        )}

        <span className="mt-4 inline-flex items-center gap-2 text-[0.875rem] text-[#e6dfd6]/70 transition-colors duration-200 group-hover:text-[#f0c08c]">
          See the days, the altitudes and the costs
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-1"
          >
            →
          </span>
        </span>
      </a>
    </article>
  );
}
