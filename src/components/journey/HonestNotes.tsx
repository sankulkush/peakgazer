import ImageSlot, { SlotCaption } from "./ImageSlot";
import type { Journey } from "@/lib/schema";

/**
 * Screen 7 — the unflattering truths and the explicit disqualification.
 *
 * This is the differentiator, and it is words rather than pictures. The small
 * teahouse frame beside it is texture, not the point.
 */
export default function HonestNotes({ journey }: { journey: Journey }) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
          What we would tell a friend
        </h2>

        <ul className="mt-7 space-y-4">
          {journey.honestNotes.map((note) => (
            <li
              key={note}
              className="border-l-2 border-[#e6dfd6]/15 pl-5 text-[1rem] leading-relaxed text-[#e6dfd6]/75"
            >
              {note}
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-sm border border-[#e9c9a8]/25 bg-[#e9c9a8]/[0.04] p-6 sm:p-7">
          <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
            This is not for you if
          </h3>
          <ul className="mt-4 space-y-3">
            {journey.notForYou.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-[0.95rem] leading-relaxed text-[#e6dfd6]/75"
              >
                <span aria-hidden="true" className="text-[#e9c9a8]/60">
                  —
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-[0.85rem] leading-relaxed text-[#e6dfd6]/45">
            We would rather you walked away here than three days up the trail.
          </p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <figure>
          <ImageSlot
            journey={journey}
            role="teahouse"
            label="A teahouse room on the route"
            ratio="4 / 5"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="rounded-sm"
          />
          <SlotCaption journey={journey} role="teahouse" className="mt-2" />
        </figure>

        <figure className="mt-6">
          <ImageSlot
            journey={journey}
            role="food"
            label="Dal bhat, most nights"
            ratio="3 / 2"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="rounded-sm"
          />
          <SlotCaption journey={journey} role="food" className="mt-2" />
        </figure>
      </div>
    </div>
  );
}
