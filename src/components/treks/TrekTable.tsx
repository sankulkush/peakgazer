"use client";

import { useMemo, useState } from "react";
import { formatFromNPR } from "@/lib/currency";
import { altitude, count, plain } from "@/lib/format";
import { isPending, type Journey } from "@/lib/schema";

const DIFFICULTY: Record<number, string> = {
  1: "Easy",
  2: "Moderate",
  3: "Moderate–demanding",
  4: "Demanding",
};

const ANY = "Any";

/**
 * The functional browse layer — deliberately not the editorial journey pages.
 *
 * Rows and filters, no full-bleed scenes. Someone arriving here wants to
 * compare eight routes on duration, altitude and difficulty and then leave for
 * the one page that matters to them. Speed over spectacle.
 *
 * Filtering is client-side over eight rows: no fetch, no query params, no
 * router churn. Anything heavier would cost more than it buys at this size.
 */
export default function TrekTable({ journeys }: { journeys: Journey[] }) {
  const [region, setRegion] = useState(ANY);
  const [difficulty, setDifficulty] = useState(ANY);
  const [season, setSeason] = useState(ANY);
  const [maxDays, setMaxDays] = useState(ANY);

  const regions = useMemo(
    () => [ANY, ...new Set(journeys.map((j) => j.region))],
    [journeys],
  );
  const seasons = useMemo(
    () => [ANY, ...new Set(journeys.flatMap((j) => j.bestMonths))],
    [journeys],
  );

  const rows = journeys.filter((j) => {
    if (region !== ANY && j.region !== region) return false;
    if (difficulty !== ANY && DIFFICULTY[j.difficulty] !== difficulty)
      return false;
    if (season !== ANY && !j.bestMonths.includes(season as never)) return false;
    if (maxDays !== ANY) {
      // A journey whose length is unconfirmed cannot be filtered out by
      // length — excluding it would hide a real route on a missing number.
      if (!isPending(j.days) && j.days > Number(maxDays)) return false;
    }
    return true;
  });

  const select =
    "rounded-sm border border-[#e6dfd6]/20 bg-[#0e1118] px-3 py-2 text-[0.9rem] text-[#f0ece5] outline-none focus:border-[#f0c08c]";

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {[
          { label: "Region", value: region, set: setRegion, options: regions },
          {
            label: "Difficulty",
            value: difficulty,
            set: setDifficulty,
            options: [ANY, ...Object.values(DIFFICULTY)],
          },
          { label: "Best month", value: season, set: setSeason, options: seasons },
          {
            label: "Up to",
            value: maxDays,
            set: setMaxDays,
            options: [ANY, "6", "7", "10", "12"],
          },
        ].map((f) => (
          <label key={f.label} className="flex flex-col gap-1.5">
            <span className="text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
              {f.label}
            </span>
            <select
              className={select}
              value={f.value}
              onChange={(e) => f.set(e.target.value)}
            >
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {f.label === "Up to" && o !== ANY ? `${o} days` : o}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <p className="mt-5 text-[0.85rem] text-[#e6dfd6]/45" aria-live="polite">
        {rows.length} of {journeys.length} journeys
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[46rem] border-collapse text-left">
          <caption className="sr-only">All journeys, with status</caption>
          <thead>
            <tr className="border-y border-[#e6dfd6]/15">
              {["Journey", "Days", "Walking", "Highest", "Difficulty", "From"].map(
                (h) => (
                  <th
                    key={h}
                    scope="col"
                    className="py-3 pr-4 text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase"
                  >
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((j) => {
              const eight = j.price.groupTiers.find((t) => t.groupSize === 8);
              const open = j.status === "published";
              return (
                <tr
                  key={j.slug}
                  className="border-b border-[#e6dfd6]/10 align-top"
                >
                  <td className="py-4 pr-4">
                    {open ? (
                      <a
                        href={`/journeys/${j.slug}`}
                        className="text-[1rem] font-medium text-[#f0ece5] underline-offset-4 hover:text-[#f0c08c] hover:underline"
                      >
                        {j.name}
                      </a>
                    ) : (
                      <span className="text-[1rem] font-medium text-[#e6dfd6]/60">
                        {j.name}
                      </span>
                    )}
                    <span className="mt-1.5 block text-[0.8rem] text-[#e6dfd6]/40">
                      {j.region}
                      {j.voice === "founder" && (
                        <span className="ml-2 text-[#e9c9a8]/80">
                          founder-walked
                        </span>
                      )}
                    </span>
                    {!open && (
                      <span className="mt-2 inline-block rounded-full border border-[#e9c9a8]/30 px-2 py-0.5 text-[0.68rem] text-[#e9c9a8]/85">
                        opening soon
                      </span>
                    )}
                  </td>
                  <td className="py-4 pr-4 text-[0.9rem] text-[#e6dfd6]/70 tabular-nums">
                    {count(j.days, "")}
                  </td>
                  <td className="py-4 pr-4 text-[0.9rem] text-[#e6dfd6]/70 tabular-nums">
                    {plain(j.trekDays)}
                  </td>
                  <td className="py-4 pr-4 text-[0.9rem] text-[#e6dfd6]/70 tabular-nums">
                    {altitude(j.maxAltitudeM)}
                  </td>
                  <td className="py-4 pr-4 text-[0.9rem] text-[#e6dfd6]/70">
                    {DIFFICULTY[j.difficulty]}
                  </td>
                  <td className="py-4 text-[0.9rem] tabular-nums">
                    {eight ? (
                      <span className="text-[#f0ece5]">
                        {formatFromNPR(eight.perPerson)}
                        <span className="block text-[0.7rem] text-[#e6dfd6]/35">
                          at 8 · indicative
                        </span>
                      </span>
                    ) : (
                      <span className="text-[#e6dfd6]/35 italic">on request</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
