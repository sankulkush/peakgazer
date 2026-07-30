import type { Journey } from "@/lib/schema";

/**
 * Altitude, evacuation and weather — and the no-commission clause.
 *
 * That clause is the highest-value trust content on the site, because the
 * sector's largest documented fraud ran through helicopter evacuations. It is
 * rendered as a commitment being confirmed rather than as a fact, because
 * publishing it before the partner confirms it in writing would be the same
 * unbacked claim the prosecution was built on.
 */
export default function SafetySection({ journey }: { journey: Journey }) {
  const safety = journey.safety;
  if (!safety) return null;

  const confirmed = safety.noCommission === "verified";

  const rows = [
    { label: "At altitude", body: safety.altitudeProtocol },
    { label: "Evacuation", body: safety.evacuationPolicy },
    { label: "Weather", body: safety.weatherPolicy },
  ];

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
          Safety, and who decides
        </h2>
        <p className="mt-5 text-[1rem] leading-relaxed text-[#e6dfd6]/60">
          Turnaround is the guide&apos;s call, not yours and not ours. That is
          the whole point of writing it down before anyone is tired, cold and
          four days from a road.
        </p>

        <div
          className={`mt-8 rounded-sm border p-6 ${
            confirmed
              ? "border-[#e9c9a8]/30 bg-[#e9c9a8]/[0.05]"
              : "border-[#e6dfd6]/15 bg-[#0e1118]"
          }`}
        >
          <p className="font-display text-[1.05rem] leading-snug font-semibold text-[#f7f2ea]">
            We take no commission on evacuation flights.
          </p>
          {!confirmed && (
            <p className="mt-3 text-[0.875rem] leading-relaxed text-[#e6dfd6]/55">
              <span className="rounded-full border border-[#e9c9a8]/30 px-2 py-0.5 text-[0.7rem] text-[#e9c9a8]/85">
                being confirmed
              </span>{" "}
              This is what we commit to and what we are getting in writing from
              our partner. Until that is signed we will not present it as
              settled — a promise about rescue flights is exactly the claim this
              industry has abused.
            </p>
          )}
        </div>
      </div>

      <div className="lg:col-span-7">
        <dl className="space-y-px border-t border-[#e6dfd6]/12">
          {rows.map((row) => (
            <div
              key={row.label}
              className="grid gap-2 border-b border-[#e6dfd6]/12 py-6 sm:grid-cols-4 sm:gap-6"
            >
              <dt className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/40 uppercase">
                {row.label}
              </dt>
              <dd className="text-[0.95rem] leading-relaxed text-[#e6dfd6]/70 sm:col-span-3">
                {row.body}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 text-[0.875rem] leading-relaxed text-[#e6dfd6]/45">
          Travel insurance carrying helicopter evacuation cover is mandatory on
          every journey we run, and we check the policy before you fly.
        </p>
      </div>
    </div>
  );
}
