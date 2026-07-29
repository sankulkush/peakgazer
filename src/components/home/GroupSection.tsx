import Reveal from "@/components/common/Reveal";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import GroupTierChart, { type TierRow } from "./GroupTierChart";
import { getAllJourneys } from "@/lib/content";
import { formatFromNPR } from "@/lib/currency";
import { npr } from "@/lib/schema";
import { RATES_UPDATED } from "@/content/company";

const TIER_LABEL: Record<string, string> = {
  solo: "On your own",
  "2": "Two of you",
  "4": "Four",
  "8": "Eight",
};

/**
 * The group organiser is the most important single user on this site: one
 * person books for eight. The per-head drop is the strongest commercial
 * argument we have, so it gets a section rather than a footnote.
 *
 * Figures come from the first journey's real tiers. Nothing is hard-coded.
 */
export default function GroupSection() {
  const journey = getAllJourneys()[0];
  if (!journey) return null;

  const tiers = journey.price.groupTiers;
  const dearest = Math.max(...tiers.map((t) => t.perPerson));
  const cheapest = Math.min(...tiers.map((t) => t.perPerson));

  const rows: TierRow[] = tiers.map((tier) => {
    const saved = dearest - tier.perPerson;
    return {
      label: TIER_LABEL[String(tier.groupSize)] ?? String(tier.groupSize),
      price: formatFromNPR(tier.perPerson),
      fraction: tier.perPerson / dearest,
      saving: saved > 0 ? `${formatFromNPR(npr(saved))} less each` : undefined,
    };
  });

  const totalDrop = formatFromNPR(npr(dearest - cheapest));

  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
            Planning for a group?
          </h2>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
            A guide, a porter and a jeep cost the same whether two of you walk or
            eight. Split across more people, the per-head price falls — {totalDrop}{" "}
            between walking alone and walking as eight, on {journey.name}.
          </p>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/50">
            Most of our groups are organised by one person. Tell us the number and
            we will quote it properly.
          </p>

          <div className="mt-8">
            <WhatsAppButton
              context={{ journeyName: journey.name, groupSize: 8 }}
              className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
            >
              Get a group price on WhatsApp
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7 lg:pt-2">
          <GroupTierChart rows={rows} />

          <p className="mt-8 border-t border-[#e6dfd6]/8 pt-4 text-[0.8rem] leading-relaxed text-[#e6dfd6]/40">
            Indicative, and not yet confirmed against our partner&apos;s
            operating cost. Shown in rupees, converted from Nepali rupees at
            rates as of {RATES_UPDATED}.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
