"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import TrekCard from "./TrekCard";
import type { Journey } from "@/lib/schema";

/**
 * The treks, on a row that runs off the edge.
 *
 * The row is deliberately wider than it can show: the open card, one at
 * two-thirds of it, and a third cut in half at the right margin. That half card
 * is the affordance — it says there is more without needing a label — and the
 * arrow sitting over it scrolls the row on. The last panel in the row is the
 * way into the full catalogue, so scrolling to the end always arrives
 * somewhere.
 *
 * Hovering a card opens it and closes whichever was open. The first is open on
 * arrival and the row returns to it on mouse-out, so the section is never
 * caught flat. `onFocus` mirrors hover so keyboard tabbing opens the row too.
 *
 * Below `lg` there is no hover and no room, so every card takes the same width
 * and the row is swiped rather than expanded.
 */
export default function TrekRow({ journeys }: { journeys: Journey[] }) {
  const [active, setActive] = useState(0);
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ left: false, right: true });

  const readEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setEdges({
      left: el.scrollLeft > 8,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 8,
    });
  }, []);

  useEffect(() => {
    readEdges();
    window.addEventListener("resize", readEdges);
    return () => window.removeEventListener("resize", readEdges);
  }, [readEdges]);

  // One nudge moves the row by a closed card, so the half-cut card lands whole
  // rather than the row jumping an arbitrary distance.
  const nudge = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const step = Math.min(el.clientWidth * 0.6, 392);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div
        ref={scroller}
        onScroll={readEdges}
        onMouseLeave={() => setActive(0)}
        /* Bleeds to the screen edge below lg. Inside the content column the
           next card only peeked by 5% at 390px, which reads as a rendering
           slip rather than an invitation; cut at the true edge it peeks by a
           fifth and the row obviously continues. */
        className="-mx-6 flex items-start gap-6 overflow-x-auto scroll-smooth px-6 pb-2 sm:-mx-10 sm:px-10 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {journeys.map((journey, i) => (
          <TrekCard
            key={journey.slug}
            journey={journey}
            open={i === active}
            onOpen={() => setActive(i)}
          />
        ))}

        {/* The end of the row is not a trek. */}
        <a
          href="/treks"
          className="group mt-16 flex w-[78vw] shrink-0 flex-col justify-between rounded-sm border border-[#e6dfd6]/15 bg-[#0b0e16]/70 p-7 transition-colors duration-300 hover:border-[#f0c08c]/45 sm:w-[22rem] lg:w-[20rem]"
        >
          <div>
            <h3 className="font-display text-[1.35rem] leading-snug font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              Explore all treks
            </h3>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/65">
              Every route we run, searchable by region and difficulty. If what
              you want is not listed, it can almost certainly still be arranged.
            </p>
          </div>
          <span className="mt-10 inline-flex items-center gap-2 text-[0.95rem] font-medium text-[#f0c08c]">
            Browse the catalogue
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </a>
      </div>

      {/* Sits over the half-cut card, on the vertical centre of the closed
          cards' images rather than of the whole row — the open card is taller
          and centring on it would drop the arrow onto the caption text. */}
      {edges.left && (
        <Arrow dir={-1} onClick={() => nudge(-1)} label="Previous treks" />
      )}
      {edges.right && (
        <Arrow dir={1} onClick={() => nudge(1)} label="More treks" />
      )}
    </div>
  );
}

function Arrow({
  dir,
  onClick,
  label,
}: {
  dir: 1 | -1;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`absolute top-[13rem] z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#e6dfd6]/20 bg-[#0b0e16]/85 text-[1.1rem] text-[#f0c08c] shadow-lg backdrop-blur-sm transition-colors duration-200 hover:border-[#f0c08c]/60 hover:bg-[#131826]/90 sm:flex ${
        dir === 1 ? "right-3" : "left-3"
      }`}
    >
      <span aria-hidden="true">{dir === 1 ? "→" : "←"}</span>
    </button>
  );
}
