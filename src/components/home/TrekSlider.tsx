"use client";

import { useEffect, useRef, useState } from "react";
import ImageSlot from "@/components/journey/ImageSlot";
import { formatFromNPR } from "@/lib/currency";
import { altitude, count } from "@/lib/format";
import type { Journey } from "@/lib/schema";

const DIFFICULTY: Record<number, string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate–demanding",
  4: "Demanding",
};

/**
 * A sideways rail: the card at the reading edge opens up, the others sit
 * narrow beside it, and the last panel is the way into the full catalogue.
 *
 * Which card is open is measured from geometry on a rAF-throttled scroll, so
 * at most one read happens per frame. Only the four rail children animate, and
 * the transition is width — cheap enough at this count, and skipped entirely
 * under reduced motion, where every card stays equal.
 */
export default function TrekSlider({ journeys }: { journeys: Journey[] }) {
  const rail = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const root = rail.current;
    if (!root) return;
    const cards = Array.from(
      root.querySelectorAll<HTMLElement>("[data-rail-card]"),
    );

    /*
      The open card is whichever sits nearest the rail's reading edge.

      Measured across every card on each tick rather than inferred from
      IntersectionObserver entries — an observer callback only carries the
      elements whose ratio crossed a threshold, so comparing within it picks a
      winner from an arbitrary subset and the selection sticks.

      Reads are throttled to one per frame, and because the open card's own
      left edge stays pinned to the reading edge, the choice is stable rather
      than oscillating as it widens.
    */
    let frame = 0;
    const measure = () => {
      frame = 0;
      const edge = root.getBoundingClientRect().left;
      let best = 0;
      let bestDistance = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.getBoundingClientRect().left - edge);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    root.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      root.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rail}
      className="-mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {journeys.map((journey, i) => {
        const open = i === active;
        const eight = journey.price.groupTiers.find((t) => t.groupSize === 8);

        return (
          <article
            key={journey.slug}
            data-rail-card
            className={`group w-[78vw] shrink-0 snap-start transition-[width] duration-500 ease-out motion-reduce:transition-none sm:w-[20rem] ${
              open ? "lg:w-[34rem]" : "lg:w-[17rem]"
            }`}
          >
            <a href={`/journeys/${journey.slug}`} className="block">
              <div
                className={`relative overflow-hidden rounded-sm aspect-[4/5] transition-[aspect-ratio] duration-500 ease-out motion-reduce:transition-none ${
                  open ? "lg:aspect-[4/3]" : "lg:aspect-[3/4]"
                }`}
              >
                <ImageSlot
                  journey={journey}
                  role="hero"
                  label={journey.name}
                  sizes="(max-width: 640px) 78vw, (max-width: 1024px) 20rem, 34rem"
                  fill
                />
              </div>

              <h3
                className={`mt-4 font-display font-semibold tracking-[-0.01em] text-[#f7f2ea] transition-colors group-hover:text-[#f0c08c] ${
                  open ? "text-[1.35rem]" : "text-[1.05rem]"
                }`}
              >
                {journey.name}
              </h3>

              <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[#e6dfd6]/65 tabular-nums">
                <span>{count(journey.days, "days")}</span>
                <span>{altitude(journey.maxAltitudeM)}</span>
                <span>{DIFFICULTY[journey.difficulty]}</span>
              </p>

              {eight && (
                <p className="mt-3 text-[0.9rem] text-[#e9c9a8]">
                  from {formatFromNPR(eight.perPerson)} per person at 8
                  travellers
                  <span className="ml-2 text-[0.7rem] text-[#e6dfd6]/40">
                    indicative
                  </span>
                </p>
              )}
            </a>
          </article>
        );
      })}

      {/* The last panel: the rest of the catalogue, not a trek. */}
      <article
        data-rail-card
        className="flex w-[78vw] shrink-0 snap-start sm:w-[20rem] lg:w-[22rem]"
      >
        <a
          href="/treks"
          className="group flex w-full flex-col justify-between rounded-sm border border-[#e6dfd6]/15 bg-[#0e1118] p-7 transition-colors duration-300 hover:border-[#f0c08c]/40"
        >
          <div>
            <p className="text-[0.7rem] font-medium tracking-[0.1em] text-[#e9c9a8]/80 uppercase">
              And the rest
            </p>
            <h3 className="mt-4 font-display text-[1.5rem] leading-snug font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              Every trek we run, in one place
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/60">
              Search by name, region or difficulty. And if what you want is not
              listed, it can almost certainly still be arranged.
            </p>
          </div>

          <span className="mt-10 inline-flex items-center gap-2 text-[0.95rem] font-medium text-[#f0c08c]">
            Browse all treks
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>
      </article>
    </div>
  );
}
