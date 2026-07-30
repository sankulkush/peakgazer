import ImageSlot, { SlotCaption } from "./ImageSlot";
import ImageMoment from "./ImageMoment";
import { altitude, walking } from "@/lib/format";
import type { Journey } from "@/lib/schema";

/**
 * The day-by-day, told as a journey rather than dumped as a table.
 *
 * Each day is a beat: where you go, where you sleep, and what it is actually
 * like. Days carrying a small frame get one beside them; the two or three
 * emotional beats break out full-bleed between the days.
 *
 * Days are open, not collapsed. This page IS the itinerary — hiding it behind
 * a disclosure would hide the product. Where a figure is unconfirmed it says
 * so in place of a number.
 */
export default function JourneyArc({ journey }: { journey: Journey }) {
  return (
    <>
      {journey.itinerary.map((day) => {
        const hours = walking(day.walkingHours);

        return (
          <div key={day.day}>
            <section className="border-b border-[#e6dfd6]/8 px-6 py-8 sm:px-10 sm:py-10 lg:px-16">
              <div className="mx-auto grid max-w-6xl gap-5 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-2">
                  <p className="font-display text-[0.8rem] font-semibold tracking-[0.08em] text-[#e9c9a8] uppercase">
                    Day {day.day}
                  </p>
                </div>

                <div className={day.image ? "lg:col-span-6" : "lg:col-span-8"}>
                  <h3 className="font-display text-[1.25rem] leading-snug font-semibold tracking-[-0.01em] text-[#f7f2ea] sm:text-[1.4rem]">
                    {day.title}
                    {day.isHardestDay && (
                      <span className="ml-3 rounded-full border border-[#e9c9a8]/35 px-2.5 py-0.5 align-middle text-[0.68rem] font-normal text-[#e9c9a8]">
                        hardest day
                      </span>
                    )}
                  </h3>

                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-[#e6dfd6]/50 tabular-nums">
                    <span>Sleep {altitude(day.sleepAltitudeM)}</span>
                    <span aria-hidden="true" className="text-[#e6dfd6]/25">
                      ·
                    </span>
                    <span className={hours.pending ? "italic" : undefined}>
                      {hours.text}
                    </span>
                    {day.stay && (
                      <>
                        <span aria-hidden="true" className="text-[#e6dfd6]/25">
                          ·
                        </span>
                        <span>{day.stay}</span>
                      </>
                    )}
                  </p>

                  {day.terrain && (
                    <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/60">
                      {day.terrain}
                    </p>
                  )}

                  <p className="mt-4 border-l-2 border-[#e9c9a8]/40 pl-4 text-[1rem] leading-relaxed text-[#f0ece5]/85">
                    {day.honestNote}
                  </p>
                </div>

                {day.image && (
                  <figure className="lg:col-span-4">
                    <ImageSlot
                      journey={journey}
                      role={day.image}
                      label={`Day ${day.day} — ${day.to}`}
                      ratio="4 / 3"
                      sizes="(max-width: 1024px) 100vw, 30vw"
                      className="rounded-sm"
                    />
                    <SlotCaption
                      journey={journey}
                      role={day.image}
                      className="mt-2"
                    />
                  </figure>
                )}
              </div>
            </section>

            {day.bleed && (
              <ImageMoment
                journey={journey}
                role={day.bleed.role}
                label={`Day ${day.day} — ${day.to}`}
                line={day.bleed.line}
                sub={day.bleed.sub}
              />
            )}
          </div>
        );
      })}
    </>
  );
}
