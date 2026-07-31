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
 * Screen 1 — the full-bleed moment.
 *
 * Three numbers and one action. The scrim runs left-heavy for the same reason
 * as the homepage hero: this will carry a high-key photograph and a flat
 * overlay would kill it.
 */
export default function JourneyHero({ journey }: { journey: Journey }) {
  return (
    <section className="relative flex h-[86svh] min-h-[560px] w-full flex-col justify-end overflow-hidden bg-[#0a0c12]">
      <ImageSlot
        journey={journey}
        role="hero"
        label={`${journey.name} — the signature frame`}
        sizes="100vw"
        priority
        fill
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,18,0.92)_0%,rgba(10,12,18,0.72)_32%,rgba(10,12,18,0.25)_62%,rgba(10,12,18,0.45)_100%)]"
      />

      <div className="relative z-10 px-6 pb-14 sm:px-10 sm:pb-16 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.9rem] font-medium text-[#e9c9a8]">
            {journey.region} · {journey.startCity} → {journey.endCity}
          </p>

          <h1 className="mt-3 max-w-[16em] font-display text-[clamp(1.9rem,4.4vw,3.25rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance text-[#f7f2ea]">
            {journey.name}
          </h1>

          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-[#e9e3da]">
            {journey.subtitle}
          </p>

          {/* Three numbers, nothing else. */}
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
              className="group inline-flex items-center gap-2 text-[0.9rem] text-[#e6dfd6]/80 transition-colors duration-300 hover:text-[#f7f2ea]"
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

      <SlotCaption
        journey={journey}
        role="hero"
        className="absolute bottom-5 left-6 z-10 sm:left-10 lg:left-16"
      />
    </section>
  );
}
