import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { formatFromNPR } from "@/lib/currency";
import { RATES_UPDATED } from "@/content/company";
import type { Journey } from "@/lib/schema";

const TIER_LABEL: Record<string, string> = {
  solo: "On your own",
  "2": "Two of you",
  "4": "Four",
  "8": "Eight",
};

/**
 * The full range, the tier table and a way to act — never a bare "from".
 *
 * Rendered twice on the page by design: once early for the visitor who came to
 * find the price and act, once at the decision point for the visitor who read
 * the whole thing. Nobody should have to hunt for it.
 */
export default function PriceBlock({
  journey,
  heading = "What it costs",
}: {
  journey: Journey;
  heading?: string;
}) {
  const tiers = journey.price.groupTiers;

  return (
    <div className="rounded-sm border border-[#e6dfd6]/12 bg-[#0e1118] p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 className="font-display text-[1.35rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
          {heading}
        </h2>
        <span className="rounded-full border border-[#e9c9a8]/30 px-2.5 py-0.5 text-[0.7rem] text-[#e9c9a8]/85">
          Indicative
        </span>
      </div>

      <p className="mt-4 font-display text-[clamp(1.5rem,3vw,2rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] tabular-nums">
        {formatFromNPR(journey.price.min)} – {formatFromNPR(journey.price.max)}
        <span className="ml-2 text-[0.85rem] font-normal text-[#e6dfd6]/50">
          per person
        </span>
      </p>

      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">
          Price per person by group size for {journey.name}
        </caption>
        <thead>
          <tr className="border-b border-[#e6dfd6]/12">
            <th className="pb-2 text-[0.75rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
              Group
            </th>
            <th className="pb-2 text-right text-[0.75rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
              Each
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier) => (
            <tr
              key={String(tier.groupSize)}
              className="border-b border-[#e6dfd6]/8 last:border-0"
            >
              <td className="py-2.5 text-[0.95rem] text-[#e6dfd6]/75">
                {TIER_LABEL[String(tier.groupSize)] ?? tier.groupSize}
              </td>
              <td className="py-2.5 text-right font-display text-[1.05rem] font-semibold text-[#f7f2ea] tabular-nums">
                {formatFromNPR(tier.perPerson)}
                {tier.perPersonMax && (
                  <span className="text-[#e6dfd6]/45">
                    {" – "}
                    {formatFromNPR(tier.perPersonMax)}
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-5 space-y-1.5">
        {journey.price.variables.map((variable) => (
          <li
            key={variable}
            className="text-[0.875rem] leading-relaxed text-[#e6dfd6]/55"
          >
            {variable}
          </li>
        ))}
      </ul>

      <div className="mt-7">
        <WhatsAppButton
          context={{ journeyName: journey.name, groupSize: 8 }}
          className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
        >
          Ask for your group&apos;s price
        </WhatsAppButton>
      </div>

      <p className="mt-5 border-t border-[#e6dfd6]/8 pt-4 text-[0.78rem] leading-relaxed text-[#e6dfd6]/40">
        Not a quote. These are indicative and not yet confirmed against our
        partner&apos;s operating cost. Shown in rupees, converted from Nepali
        rupees at rates as of {RATES_UPDATED}.
      </p>
    </div>
  );
}
