import ImageSlot, { SlotCaption } from "./ImageSlot";
import type { ImageRole, Journey } from "@/lib/schema";

/**
 * Screen 5 — the day-by-day.
 *
 * Collapsed by default. A dense itinerary open by default is a wall; collapsed,
 * the summary row still carries route, altitude and hours, so it stays
 * skimmable for everyone and expandable for the person who reads every line.
 *
 * Native `<details>`, not a JS accordion: it costs no JavaScript, it is
 * keyboard and screen-reader correct without any work, and it survives a failed
 * hydration. Content is never behind a script on this site.
 */

/** Small frames placed beside the days they belong to. */
const TRAIL_IMAGES: { after: number; role: ImageRole; label: string }[] = [
  { after: 3, role: "trailSteps", label: "The stone steps" },
  { after: 4, role: "trailForest", label: "Forest below the tree line" },
  { after: 5, role: "trailValley", label: "The valley narrowing" },
];

export default function ItineraryList({ journey }: { journey: Journey }) {
  return (
    <div>
      <ol className="border-t border-[#e6dfd6]/12">
        {journey.itinerary.map((day) => {
          const trail = TRAIL_IMAGES.find((t) => t.after === day.day);

          return (
            <li key={day.day} className="border-b border-[#e6dfd6]/12">
              <details className="group">
                <summary className="grid cursor-pointer list-none grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-5 transition-colors hover:bg-[#e6dfd6]/[0.03] sm:gap-x-6">
                  <span className="font-display text-[0.8rem] font-semibold text-[#e9c9a8] tabular-nums">
                    {String(day.day).padStart(2, "0")}
                  </span>

                  <span>
                    <span className="block text-[1rem] font-medium text-[#f0ece5]">
                      {day.title}
                      {day.isHardestDay && (
                        <span className="ml-2 rounded-full border border-[#e9c9a8]/35 px-2 py-0.5 align-middle text-[0.68rem] font-normal text-[#e9c9a8]">
                          hardest day
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-[0.85rem] text-[#e6dfd6]/50 tabular-nums">
                      Sleep {day.sleepAltitudeM.toLocaleString("en-IN")}m
                      {day.highPointM && (
                        <> · high point {day.highPointM.toLocaleString("en-IN")}m</>
                      )}
                      {day.walkingHours ? (
                        <>
                          {" "}
                          · {day.walkingHours[0]}–{day.walkingHours[1]} hours
                          walking
                        </>
                      ) : (
                        <> · no walking</>
                      )}
                      {day.ascentM && <> · {day.ascentM}m up</>}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className="text-[#e6dfd6]/40 transition-transform duration-300 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>

                <div className="grid gap-6 pb-7 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div className="max-w-2xl sm:pl-[calc(0.8rem+1.5rem)]">
                    {day.terrain && (
                      <p className="text-[0.9rem] leading-relaxed text-[#e6dfd6]/55">
                        {day.terrain}
                      </p>
                    )}
                    <p className="mt-3 border-l-2 border-[#e9c9a8]/40 pl-4 text-[0.95rem] leading-relaxed text-[#f0ece5]/85">
                      {day.honestNote}
                    </p>
                  </div>

                  {trail && (
                    <figure className="sm:w-56">
                      <ImageSlot
                        journey={journey}
                        role={trail.role}
                        label={trail.label}
                        ratio="4 / 3"
                        sizes="(max-width: 640px) 100vw, 224px"
                        className="rounded-sm"
                      />
                      <SlotCaption
                        journey={journey}
                        role={trail.role}
                        className="mt-2"
                      />
                    </figure>
                  )}
                </div>
              </details>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
