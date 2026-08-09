import PlaceholderImage from "@/components/common/PlaceholderImage";
import { formatFromNPR } from "@/lib/currency";
import { altitude, count, plain } from "@/lib/format";
import type { Journey } from "@/lib/schema";

const DIFFICULTY_LABEL: Record<Journey["difficulty"], string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate to demanding",
  4: "Demanding",
};

/**
 * One trek. Two weights — `featured` carries the section, `secondary` supports
 * it. Never a grid of equals.
 *
 * The price is read from the content layer and converted at render; it is never
 * hard-coded. The "from" is only permissible because the variable that produces
 * it is named in the same sentence.
 */
export default function JourneyCard({
  journey,
  featured = false,
}: {
  journey: Journey;
  featured?: boolean;
}) {
  const eight = journey.price.groupTiers.find((t) => t.groupSize === 8);
  const honest = journey.honestNotes[0];

  return (
    <article className="group">
      <a href={`/journeys/${journey.slug}`} className="block">
        <div className="relative overflow-hidden rounded-sm">
          <div className="transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <PlaceholderImage
              label={journey.name}
              ratio={featured ? "16 / 10" : "3 / 2"}
            />
          </div>

        </div>

        <div className={featured ? "mt-6" : "mt-4"}>
          <h3
            className={`font-display font-semibold tracking-[-0.02em] text-[#f7f2ea] ${
              featured
                ? "text-[clamp(1.35rem,2.4vw,1.85rem)]"
                : "text-[1.15rem]"
            }`}
          >
            {journey.name}
          </h3>

          {/* Numbers, not adjectives. */}
          <dl
            className={`mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.85rem] text-[#e6dfd6]/65 ${
              featured ? "sm:text-[0.9rem]" : ""
            }`}
          >
            <div className="flex gap-1.5">
              <dt className="sr-only">Duration</dt>
              <dd>
                {count(journey.days, "days")}
                <span className="text-[#e6dfd6]/40">
                  {" "}
                  · {plain(journey.trekDays)} walking
                </span>
              </dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Maximum altitude</dt>
              <dd>{altitude(journey.maxAltitudeM)}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="sr-only">Difficulty</dt>
              <dd>{DIFFICULTY_LABEL[journey.difficulty]}</dd>
            </div>
          </dl>

          {featured && honest && (
            <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-[#e6dfd6]/55 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
              {honest}
            </p>
          )}

          {eight && (
            <p className="mt-4 text-[0.95rem] text-[#e9c9a8]">
              from {formatFromNPR(eight.perPerson)} per person at 8 travellers
              <span className="ml-2 text-[0.75rem] tracking-wide text-[#e6dfd6]/40">
                indicative
              </span>
            </p>
          )}

          <span className="mt-4 inline-flex items-center gap-2 text-[0.875rem] text-[#e6dfd6]/70 transition-colors duration-300 group-hover:text-[#f0c08c]">
            See the days, the altitudes and the costs
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </a>
    </article>
  );
}
