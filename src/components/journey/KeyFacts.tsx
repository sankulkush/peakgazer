import type { Journey } from "@/lib/schema";

const DIFFICULTY_LABEL: Record<Journey["difficulty"], string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate to demanding",
  4: "Demanding",
};

/**
 * Screen 3, upper half — the scannable bar.
 *
 * A real table of real numbers. This is the surface the visitor who is
 * comparing operators lands on, so it holds facts and nothing else.
 */
export default function KeyFacts({ journey }: { journey: Journey }) {
  const walking = journey.itinerary
    .map((d) => d.walkingHours)
    .filter((h): h is [number, number] => h !== null);
  const minHours = Math.min(...walking.map((h) => h[0]));
  const maxHours = Math.max(...walking.map((h) => h[1]));

  const facts: { label: string; value: string }[] = [
    { label: "Duration", value: `${journey.days} days` },
    { label: "Walking days", value: `${journey.trekDays}` },
    {
      label: "Highest point",
      value: `${journey.maxAltitudeM.toLocaleString("en-IN")}m`,
    },
    { label: "Difficulty", value: DIFFICULTY_LABEL[journey.difficulty] },
    { label: "Daily walking", value: `${minHours}–${maxHours} hours` },
    { label: "Starts and ends", value: journey.startCity },
    { label: "Best months", value: journey.bestMonths.join(", ") },
    { label: "Group size", value: "2–12, private for solo" },
  ];

  return (
    <div>
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-[#e6dfd6]/12 bg-[#e6dfd6]/10 sm:grid-cols-4">
        {facts.map((fact) => (
          <div key={fact.label} className="bg-[#0e1118] px-4 py-5">
            <dt className="text-[0.72rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
              {fact.label}
            </dt>
            <dd className="mt-1.5 text-[0.95rem] leading-snug font-medium text-[#f0ece5]">
              {fact.value}
            </dd>
          </div>
        ))}
      </dl>

      {journey.optionalHighPoint && (
        <p className="mt-4 border-l-2 border-[#e9c9a8]/40 pl-4 text-[0.9rem] leading-relaxed text-[#e6dfd6]/60">
          <span className="text-[#f0ece5]">
            {journey.optionalHighPoint.name} —{" "}
            {journey.optionalHighPoint.altitudeM.toLocaleString("en-IN")}m.
          </span>{" "}
          {journey.optionalHighPoint.condition}
        </p>
      )}

      <p className="mt-4 text-[0.85rem] leading-relaxed text-[#e6dfd6]/50">
        {journey.difficultyNote}
      </p>

      <dl className="mt-6 space-y-2">
        {journey.permits.map((permit) => (
          <div
            key={permit.name}
            className="flex flex-wrap items-baseline gap-x-3 text-[0.875rem]"
          >
            <dt className="text-[#e6dfd6]/50">{permit.fullName}</dt>
            <dd className="text-[#f0ece5] tabular-nums">
              NPR {permit.costSAARC.toLocaleString("en-IN")} for Indian and
              SAARC nationals
              <span className="text-[#e6dfd6]/40">
                {" "}
                · NPR {permit.costForeign.toLocaleString("en-IN")} otherwise
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
