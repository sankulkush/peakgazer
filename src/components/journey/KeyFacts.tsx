import { altitude, count, plain, TBC, walkingRange } from "@/lib/format";
import { isPending, type Journey } from "@/lib/schema";

const DIFFICULTY_LABEL: Record<Journey["difficulty"], string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate to demanding",
  4: "Demanding",
};

/**
 * The scannable bar. Real numbers, and an honest blank where a number is not
 * confirmed — a figure marked "to be confirmed" is worth more than a plausible
 * one nobody has checked.
 */
export default function KeyFacts({ journey }: { journey: Journey }) {
  const range = walkingRange(journey.itinerary.map((d) => d.walkingHours));

  const facts: { label: string; value: string; pending?: boolean }[] = [
    {
      label: "Duration",
      value: count(journey.days, "days"),
      pending: isPending(journey.days),
    },
    {
      label: "Nights away",
      value: isPending(journey.nights) ? TBC : `${journey.nights}`,
      pending: isPending(journey.nights),
    },
    {
      label: "Walking days",
      value: plain(journey.trekDays),
      pending: isPending(journey.trekDays),
    },
    {
      label: "Highest point",
      value: altitude(journey.maxAltitudeM),
      pending: isPending(journey.maxAltitudeM),
    },
    { label: "Difficulty", value: DIFFICULTY_LABEL[journey.difficulty] },
    {
      label: "Daily walking",
      value: range ? `${range[0]}–${range[1]} hours` : TBC,
      pending: !range,
    },
    {
      label: "Starts and ends",
      value:
        journey.startCity === journey.endCity
          ? journey.startCity
          : `${journey.startCity} → ${journey.endCity}`,
    },
    { label: "Best months", value: journey.bestMonths.join(", ") },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[#e6dfd6]/12 bg-[#e6dfd6]/10 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-[#0e1118] px-4 py-5">
            <dt className="text-[0.72rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
              {fact.label}
            </dt>
            <dd
              className={`mt-1.5 text-[0.95rem] leading-snug font-medium ${
                fact.pending ? "text-[#e6dfd6]/40 italic" : "text-[#f0ece5]"
              }`}
            >
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {journey.optionalHighPoint && (
        <p className="mt-4 border-l-2 border-[#e9c9a8]/40 pl-4 text-[0.9rem] leading-relaxed text-[#e6dfd6]/60">
          <span className="text-[#f0ece5]">
            {journey.optionalHighPoint.name} —{" "}
            {altitude(journey.optionalHighPoint.altitudeM)}.
          </span>{" "}
          {journey.optionalHighPoint.condition}
        </p>
      )}

      <p className="mt-4 text-[0.85rem] leading-relaxed text-[#e6dfd6]/50">
        {journey.difficultyNote}
      </p>

    </div>
  );
}
