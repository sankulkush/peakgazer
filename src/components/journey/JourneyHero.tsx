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
 * The opening frame, shown whole.
 *
 * The image renders at its natural ratio rather than being cover-cropped into
 * a viewport-height band. Nothing is cut off the top or bottom, so the peaks
 * and the lake are both fully visible — on this route the lake is the product
 * and it must never be sliced or buried.
 *
 * That leaves the picture short on a narrow screen, so the text sits below it
 * on mobile and overlays it from `sm` up, where there is room. The scrim only
 * exists in the overlaid case, and only darkens the left column.
 */
export default function JourneyHero({ journey }: { journey: Journey }) {
  return (
    <section className="relative w-full bg-[#0a0c12]">
      {/* Natural ratio, full width. No cover-crop, so nothing is cut. */}
      <ImageSlot
        journey={journey}
        role="hero"
        label={`${journey.name} — the signature frame`}
        sizes="100vw"
        priority
      />

      {/* Only in the overlaid case: darken the left column, nothing else. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-[linear-gradient(to_right,rgba(10,12,18,0.90)_0%,rgba(10,12,18,0.86)_25%,rgba(10,12,18,0.78)_44%,rgba(10,12,18,0.30)_56%,rgba(10,12,18,0)_68%)] sm:block"
      />

      <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:absolute sm:inset-0 sm:px-10 sm:py-0 lg:px-16">
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
        className="px-6 pb-4 sm:absolute sm:bottom-4 sm:left-10 sm:z-10 sm:px-0 sm:pb-0 lg:left-16"
      />
    </section>
  );
}
