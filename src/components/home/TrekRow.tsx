"use client";

import { useState } from "react";
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
 * Three treks, one of them open.
 *
 * The open card is wide and flush to the top; the other two are narrow and
 * dropped down, which is what gives the row its rhythm. Hovering a narrow card
 * opens it and closes whichever was open. The first is open on arrival and the
 * row returns to it on mouse-out, so the section is never caught flat.
 *
 * Width comes from `flex-grow` against a zero basis, so the three always share
 * the row rather than overflowing it, and one aspect ratio serves all three —
 * the open card is taller because it is wider, not because it is told to be.
 *
 * `onFocus` mirrors the hover so the row opens under keyboard tabbing too, and
 * below `lg` — where there is no hover to speak of — the flex row becomes a
 * plain grid of equal cards and none of this applies.
 */
export default function TrekRow({ journeys }: { journeys: Journey[] }) {
  const [active, setActive] = useState(0);

  return (
    <div
      onMouseLeave={() => setActive(0)}
      className="grid gap-10 sm:grid-cols-2 lg:flex lg:items-start lg:gap-6"
    >
      {journeys.map((journey, i) => {
        const open = i === active;
        const eight = journey.price.groupTiers.find((t) => t.groupSize === 8);

        return (
          <article
            key={journey.slug}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            style={{ flexGrow: open ? 2.2 : 1, flexBasis: 0 }}
            className={`group min-w-0 transition-all duration-500 ease-out motion-reduce:transition-none ${
              open ? "lg:mt-0" : "lg:mt-16"
            }`}
          >
            <a href={`/journeys/${journey.slug}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <ImageSlot
                  journey={journey}
                  role="hero"
                  label={journey.name}
                  sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 50vw"
                  fill
                />
              </div>

              <h3
                className={`mt-5 font-display font-semibold tracking-[-0.015em] text-[#f7f2ea] transition-colors duration-300 group-hover:text-[#f0c08c] ${
                  open ? "text-[1.5rem]" : "text-[1.1rem]"
                }`}
              >
                {journey.name}
              </h3>

              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[#e6dfd6]/65 tabular-nums">
                <span>{count(journey.days, "days")}</span>
                <span>{altitude(journey.maxAltitudeM)}</span>
                <span>{DIFFICULTY[journey.difficulty]}</span>
              </p>

              {/* Two of the three have no negotiated tiers yet. Rendering
                  nothing there reads as a missing line rather than a known
                  gap, and the alternative — a guessed figure — is the one
                  thing this site cannot do. So the gap is named. */}
              {eight ? (
                <p className="mt-3 text-[0.9rem] text-[#e9c9a8]">
                  from {formatFromNPR(eight.perPerson)} per person at 8
                  travellers
                  <span className="ml-2 text-[0.7rem] text-[#e6dfd6]/40">
                    indicative
                  </span>
                </p>
              ) : (
                <p className="mt-3 text-[0.9rem] text-[#e6dfd6]/45">
                  Price {TBC} — message us and we will quote it
                </p>
              )}

              <span className="mt-4 inline-flex items-center gap-2 text-[0.875rem] text-[#e6dfd6]/70 transition-colors duration-300 group-hover:text-[#f0c08c]">
                See the days, the altitudes and the costs
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </a>
          </article>
        );
      })}
    </div>
  );
}
