"use client";

import { useMemo, useState } from "react";
import PlaceholderImage from "@/components/common/PlaceholderImage";
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
 * The browse layer: search, filter, scan, leave for the one route that matters.
 *
 * Filtering is client-side over a handful of rows — no fetch, no query params,
 * no router churn. Anything heavier costs more than it buys at this size, and
 * this page's whole job is to be fast.
 *
 * Built journeys link to their page; unbuilt ones link to a slug that 404s by
 * design. The card says nothing either way — that is deliberate, and the
 * status is tracked in the content layer rather than announced to the reader.
 */
export default function TrekBrowser({ journeys }: { journeys: Journey[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState(ANY);
  const [difficulty, setDifficulty] = useState(ANY);

  const regions = useMemo(
    () => [ANY, ...new Set(journeys.map((j) => j.region))],
    [journeys],
  );

  const rows = journeys.filter((j) => {
    const q = query.trim().toLowerCase();
    if (
      q &&
      !j.name.toLowerCase().includes(q) &&
      !j.region.toLowerCase().includes(q) &&
      !j.subtitle.toLowerCase().includes(q)
    ) {
      return false;
    }
    if (region !== ANY && j.region !== region) return false;
    if (difficulty !== ANY && DIFFICULTY[j.difficulty] !== difficulty)
      return false;
    return true;
  });

  const field =
    "rounded-sm border border-[#e6dfd6]/20 bg-[#0e1118] px-3.5 py-2.5 text-[0.95rem] text-[#f0ece5] outline-none transition-colors focus:border-[#f0c08c]";

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1">
          <span className="mb-1.5 block text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
            Search
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Manaslu, Annapurna, Langtang…"
            className={`${field} w-full`}
          />
        </label>

        <label>
          <span className="mb-1.5 block text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
            Region
          </span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className={field}
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="mb-1.5 block text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
            Difficulty
          </span>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className={field}
          >
            {[ANY, ...Object.values(DIFFICULTY)].map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-5 text-[0.85rem] text-[#e6dfd6]/45" aria-live="polite">
        {rows.length} of {journeys.length} treks
      </p>

      {rows.length === 0 ? (
        <p className="mt-10 text-[1rem] text-[#e6dfd6]/60">
          Nothing matches that. We can arrange routes beyond the ones listed
          here — message us and tell us what you are looking for.
        </p>
      ) : (
        <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {rows.map((j) => {
            const eight = j.price.groupTiers.find((t) => t.groupSize === 8);
            return (
              <article key={j.slug} className="group">
                <a href={`/journeys/${j.slug}`} className="block">
                  {/* Portrait-aware placeholder. A real photograph drops in at
                      its own ratio with no code change. */}
                  <div className="overflow-hidden rounded-sm">
                    <div className="transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                      <PlaceholderImage label={j.name} ratio="4 / 5" />
                    </div>
                  </div>

                  <h2 className="mt-4 font-display text-[1.15rem] leading-snug font-semibold tracking-[-0.01em] text-[#f7f2ea] transition-colors group-hover:text-[#f0c08c]">
                    {j.name}
                  </h2>

                  <p className="mt-1 text-[0.8rem] text-[#e6dfd6]/40">
                    {j.region}
                  </p>

                  <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[#e6dfd6]/65 tabular-nums">
                    <div>
                      <dt className="sr-only">Duration</dt>
                      <dd>
                        {count(j.days, "days")}
                        {!isPending(j.trekDays) && (
                          <span className="text-[#e6dfd6]/40">
                            {" "}
                            · {plain(j.trekDays)} walking
                          </span>
                        )}
                      </dd>
                    </div>
                    <div>
                      <dt className="sr-only">Highest point</dt>
                      <dd>{altitude(j.maxAltitudeM)}</dd>
                    </div>
                    <div>
                      <dt className="sr-only">Difficulty</dt>
                      <dd>{DIFFICULTY[j.difficulty]}</dd>
                    </div>
                  </dl>

                  {eight && (
                    <p className="mt-3 text-[0.9rem] text-[#e9c9a8]">
                      from {formatFromNPR(eight.perPerson)} per person at 8
                      travellers
                      <span className="ml-2 text-[0.72rem] text-[#e6dfd6]/40">
                        indicative
                      </span>
                    </p>
                  )}
                </a>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
