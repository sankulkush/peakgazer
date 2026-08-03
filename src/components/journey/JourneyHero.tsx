import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import ImageSlot, { SlotCaption } from "./ImageSlot";
import { altitude, count } from "@/lib/format";
import type { Journey } from "@/lib/schema";

const DIFFICULTY_LABEL: Record<Journey["difficulty"], string> = {
  1: "easy",
  2: "moderate",
  3: "moderate–demanding",
  4: "demanding",
};

/**
 * The full-bleed opening.
 *
 * The scrim is directional and darkens only the strip the text occupies. On
 * this page the subject — the lake — sits across the bottom third of the
 * frame, so text goes left on wide screens and high on narrow ones, and the
 * water is left clean in both. A flat overlay would hide the one thing the
 * trek is for.
 *
 * `object-position` favours the lower half so the lake and the figures on the
 * shore survive the crop; what gets lost is sky.
 */
export default function JourneyHero({ journey }: { journey: Journey }) {
  return (
    <section className="relative h-[82svh] min-h-[540px] w-full overflow-hidden bg-[#0a0c12]">
      <ImageSlot
        journey={journey}
        role="hero"
        label={`${journey.name} — the signature frame`}
        sizes="100vw"
        priority
        fill
        className="object-[60%_58%] sm:object-[50%_60%]"
      />

      {/* Narrow: darken the top band only, over sky and upper rock. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,12,18,0.92)_0%,rgba(10,12,18,0.88)_30%,rgba(10,12,18,0.78)_57%,rgba(10,12,18,0.28)_70%,rgba(10,12,18,0)_80%)] sm:hidden"
      />

      {/* Wide: darken the left column only, leaving the lake and the shore clean. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,12,18,0.90)_0%,rgba(10,12,18,0.86)_25%,rgba(10,12,18,0.78)_44%,rgba(10,12,18,0.30)_56%,rgba(10,12,18,0)_68%)] sm:block"
      />

      <div className="relative z-10 flex h-full flex-col justify-start px-6 pt-10 sm:justify-center sm:px-10 sm:pt-0 lg:px-16">
        <div className="mx-auto w-full max-w-6xl">
          <div className="max-w-xl lg:max-w-[42%]">
            <p className="text-[0.9rem] font-medium text-[#e9c9a8]">
              {journey.region} · {journey.startCity} → {journey.endCity}
            </p>

            <h1
              className="mt-3 font-display text-[clamp(1.9rem,4.2vw,3rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-[#f7f2ea]"
              style={{ textShadow: "0 1px 24px rgba(0,0,0,0.5)" }}
            >
              {journey.name}
            </h1>

            <p
              className="mt-4 text-[1.0625rem] leading-relaxed text-[#e9e3da]"
              style={{ textShadow: "0 1px 20px rgba(0,0,0,0.45)" }}
            >
              {journey.subtitle}
            </p>

            <p className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-[1.05rem] font-medium text-[#f0ece5] sm:text-[1.15rem]">
              <span>{count(journey.days, "days")}</span>
              <span aria-hidden="true" className="text-[#e6dfd6]/30">
                ·
              </span>
              <span>{altitude(journey.maxAltitudeM)}</span>
              <span aria-hidden="true" className="text-[#e6dfd6]/30">
                ·
              </span>
              <span>{DIFFICULTY_LABEL[journey.difficulty]}</span>
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <WhatsAppButton
                context={{ journeyName: journey.name }}
                className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
              >
                Message on WhatsApp
              </WhatsAppButton>

              <a
                href="#facts"
                className="group inline-flex items-center gap-2 text-[0.9rem] text-[#e6dfd6]/85 transition-colors duration-300 hover:text-[#f7f2ea]"
              >
                See the details
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-y-0.5"
                >
                  ↓
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <SlotCaption
        journey={journey}
        role="hero"
        className="absolute bottom-4 left-6 z-10 sm:left-10 lg:left-16"
      />
    </section>
  );
}
