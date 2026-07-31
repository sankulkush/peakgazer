import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { RESPONSE_TIME } from "@/content/company";
import type { Journey } from "@/lib/schema";

/**
 * What a draft journey shows instead of a half-built page.
 *
 * A journey publishes only when it has both real photography and real
 * itinerary and cost detail. Until then this is the whole page — an honest
 * account of what is missing and a way to ask, rather than stock imagery and
 * an invented stage list padding out the gap.
 */
export default function OpeningSoon({ journey }: { journey: Journey }) {
  const noItinerary = journey.itinerary.length === 0;

  return (
    <div className="rounded-sm border border-[#e9c9a8]/25 bg-[#e9c9a8]/[0.04] p-7 sm:p-9">
      <p className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e9c9a8] uppercase">
        Opening soon
      </p>

      <h2 className="mt-3 font-display text-[clamp(1.35rem,2.6vw,1.9rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
        We are not selling this one yet
      </h2>

      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/70">
        {noItinerary
          ? "We publish a journey when we have our own photographs of it and a day-by-day we have checked ourselves. This route has neither yet, so there is nothing on this page pretending to be either."
          : "The route below is real and the detail comes from our partner. What we do not yet have is our own photography, so it stays unpublished until we do."}{" "}
        Message us and we will tell you exactly where the planning has got to,
        and what it is likely to cost.
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
        <WhatsAppButton
          context={{ journeyName: journey.name }}
          className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
        >
          Ask about {journey.name}
        </WhatsAppButton>
        <span className="text-[0.875rem] text-[#e6dfd6]/50">
          We reply {RESPONSE_TIME}.
        </span>
      </div>
    </div>
  );
}
