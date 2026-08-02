import GuideCarousel from "./GuideCarousel";
import { GUIDES } from "@/content/guides";
import type { Journey } from "@/lib/schema";

/**
 * What the price buys, then who walks with you.
 *
 * Two rows rather than two columns. The lists are short and sized to their
 * content; putting the guide panel beside them left a large dead space under
 * the shorter column, which reads as broken rather than spacious.
 */
export default function IncludedAndGuide({ journey }: { journey: Journey }) {
  return (
    <div>
      <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
        What the price includes
      </h2>

      <div className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2">
        <div>
          <h3 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/40 uppercase">
            Included
          </h3>
          <ul className="mt-3 space-y-2">
            {journey.included.map((item) => (
              <li
                key={item}
                className="text-[0.925rem] leading-relaxed text-[#e6dfd6]/75"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/40 uppercase">
            Not included
          </h3>
          <ul className="mt-3 space-y-2">
            {journey.excluded.map((item) => (
              <li
                key={item}
                className="text-[0.925rem] leading-relaxed text-[#e6dfd6]/50"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-14 border-t border-[#e6dfd6]/10 pt-10">
        <h2 className="font-display text-[clamp(1.35rem,2.6vw,1.85rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
          Who walks with you
        </h2>
        <div className="mt-8">
          <GuideCarousel guides={GUIDES} journeySlug={journey.slug} />
        </div>
      </div>
    </div>
  );
}
