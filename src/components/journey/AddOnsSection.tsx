import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import type { Journey } from "@/lib/schema";

/**
 * The free evening on day 9 is where most of these belong, so they are framed
 * as what other travellers add rather than as a upsell sheet.
 *
 * Nothing here carries a price or a promised slot. Everything is on request
 * until the partner confirms availability — quoting a paragliding flight we
 * have not booked would be the first dishonest number on the site.
 */
export default function AddOnsSection({ journey }: { journey: Journey }) {
  const addOns = journey.addOns;
  if (!addOns || addOns.length === 0) return null;

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
          The evening in Pokhara is free
        </h2>
        <p className="mt-5 text-[1rem] leading-relaxed text-[#e6dfd6]/65">
          Day 9 has nothing scheduled after the jeep gets in. Some travellers
          leave it that way. Others add one of these.
        </p>
        <p className="mt-4 text-[0.9rem] leading-relaxed text-[#e6dfd6]/45">
          All on request. We price them when we have confirmed them, not before
          — and none of them is held for you until it is booked.
        </p>

        <div className="mt-7">
          <WhatsAppButton
            context={{ journeyName: `${journey.name}, with add-ons` }}
            className="inline-flex items-center gap-2 text-[0.9rem] text-[#f0c08c] underline-offset-4 hover:underline"
          >
            Ask what any of these costs →
          </WhatsAppButton>
        </div>
      </div>

      <div className="lg:col-span-8">
        <dl className="grid gap-px overflow-hidden rounded-sm border border-[#e6dfd6]/12 bg-[#e6dfd6]/10 sm:grid-cols-2">
          {addOns.map((addOn) => (
            <div key={addOn.label} className="bg-[#0e1118] p-5">
              <dt className="flex items-start justify-between gap-3 text-[0.975rem] font-medium text-[#f0ece5]">
                {addOn.label}
              </dt>
              <dd className="mt-2 text-[0.875rem] leading-relaxed text-[#e6dfd6]/55">
                {addOn.note}
              </dd>
              <dd className="mt-3 text-[0.7rem] tracking-wide text-[#e9c9a8]/70">
                {addOn.availability}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
