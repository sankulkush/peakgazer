import ImageSlot, { SlotCaption } from "./ImageSlot";
import { getGuide } from "@/content/guides";
import type { Journey } from "@/lib/schema";

/**
 * Screen 8 — what the price buys, and who walks with you.
 *
 * The guide is the product; the company is packaging. Customers recommend
 * people, so the person is named here rather than hidden. Where we do not yet
 * hold the licence number, the panel says so instead of quietly omitting it.
 */
export default function IncludedAndGuide({ journey }: { journey: Journey }) {
  const guide = getGuide(journey.guide.slug);
  const pending = !guide || guide.name.startsWith("TODO");

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
          What the price includes
        </h2>

        <div className="mt-7 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/40 uppercase">
              Included
            </h3>
            <ul className="mt-3 space-y-2">
              {journey.included.map((item) => (
                <li
                  key={item}
                  className="text-[0.9rem] leading-relaxed text-[#e6dfd6]/75"
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
                  className="text-[0.9rem] leading-relaxed text-[#e6dfd6]/50"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5">
        <figure>
          <ImageSlot
            journey={journey}
            role="guide"
            label="Your guide"
            ratio="4 / 5"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="rounded-sm"
          />
          <SlotCaption journey={journey} role="guide" className="mt-2" />
        </figure>

        <div className="mt-6 rounded-sm border border-[#e6dfd6]/12 bg-[#0e1118] p-6">
          <h3 className="font-display text-[1.05rem] font-semibold text-[#f7f2ea]">
            {pending ? "Your guide — to be named" : guide.name}
          </h3>

          {pending ? (
            <p className="mt-3 text-[0.9rem] leading-relaxed text-[#e6dfd6]/55">
              Licensed and insured, arranged through our partner agency. We name
              every guide on this site with their licence number and how many
              times they have run this route — those details are being collected
              and will appear here before anything is sold.
            </p>
          ) : (
            <dl className="mt-3 space-y-1.5 text-[0.9rem] text-[#e6dfd6]/70">
              <div className="flex gap-2">
                <dt className="text-[#e6dfd6]/45">Licence</dt>
                <dd>{guide.licenceNumber}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#e6dfd6]/45">This route</dt>
                <dd>{guide.routeCounts[journey.slug] ?? 0} times</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-[#e6dfd6]/45">Guiding since</dt>
                <dd>{guide.yearsGuiding} years</dd>
              </div>
            </dl>
          )}

          <p className="mt-4 border-t border-[#e6dfd6]/10 pt-4 text-[0.85rem] leading-relaxed text-[#e6dfd6]/45">
            A licence is a legal minimum, not a quality claim. We do not market
            it as a feature.
          </p>
        </div>
      </div>
    </div>
  );
}
