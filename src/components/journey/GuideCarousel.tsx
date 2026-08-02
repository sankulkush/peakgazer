"use client";

import { useState } from "react";
import PlaceholderImage from "@/components/common/PlaceholderImage";
import type { Guide } from "@/lib/schema";

/**
 * The guide roster, shared by every journey page.
 *
 * Customers recommend people rather than companies, so the person is named
 * here with a licence number and how many times they have run *this* route.
 * Paging through the roster is the same component and the same pool on every
 * page — a journey only changes which route the count refers to.
 *
 * Photographs are genuinely on their way, so the slot is an upright
 * placeholder rather than removed: guide portraits are shot vertically and the
 * frame should already be the shape they will arrive in.
 */
export default function GuideCarousel({
  guides,
  journeySlug,
}: {
  guides: Guide[];
  journeySlug: string;
}) {
  const [index, setIndex] = useState(0);
  if (guides.length === 0) return null;

  const guide = guides[index];
  const many = guides.length > 1;
  const pending = guide.name.startsWith("TODO");
  const runs = guide.routeCounts[journeySlug];

  const arrow =
    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#e6dfd6]/25 text-[#e6dfd6]/70 transition-colors hover:border-[#f0c08c] hover:text-[#f0c08c] disabled:opacity-30 disabled:hover:border-[#e6dfd6]/25 disabled:hover:text-[#e6dfd6]/70";

  return (
    <div>
      <div className="flex items-center gap-4 sm:gap-6">
        {many && (
          <button
            type="button"
            aria-label="Previous guide"
            className={arrow}
            onClick={() => setIndex((i) => (i - 1 + guides.length) % guides.length)}
          >
            <span aria-hidden="true">←</span>
          </button>
        )}

        <div className="grid flex-1 gap-6 sm:grid-cols-12 sm:items-center sm:gap-8">
          <figure className="sm:col-span-4 lg:col-span-3">
            <PlaceholderImage
              label={pending ? "Guide portrait" : guide.name}
              ratio="4 / 5"
              className="rounded-sm"
            />
            <figcaption className="mt-2 text-[0.72rem] text-[#e6dfd6]/35">
              Photograph coming
            </figcaption>
          </figure>

          <div className="sm:col-span-8 lg:col-span-9">
            <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
              {pending ? "Guide — to be named" : guide.name}
            </h3>

            <dl className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-3">
              {[
                {
                  label: "Licence",
                  value: pending ? "being collected" : guide.licenceNumber,
                },
                {
                  label: "This route",
                  value:
                    runs === undefined
                      ? "being collected"
                      : `${runs} times`,
                },
                {
                  label: "Guiding",
                  value: guide.yearsGuiding
                    ? `${guide.yearsGuiding} years`
                    : "being collected",
                },
              ].map((row) => (
                <div key={row.label}>
                  <dt className="text-[0.7rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
                    {row.label}
                  </dt>
                  <dd
                    className={`mt-1 text-[0.95rem] ${
                      row.value === "being collected"
                        ? "text-[#e6dfd6]/40 italic"
                        : "text-[#f0ece5]"
                    }`}
                  >
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-5 text-[0.875rem] leading-relaxed text-[#e6dfd6]/50">
              Every guide is named here with their licence number and how many
              times they have run this route. Those details are being collected
              and will appear before anything is sold. A licence is a legal
              minimum, not a quality claim.
            </p>
          </div>
        </div>

        {many && (
          <button
            type="button"
            aria-label="Next guide"
            className={arrow}
            onClick={() => setIndex((i) => (i + 1) % guides.length)}
          >
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>

      {many && (
        <p className="mt-4 text-[0.8rem] text-[#e6dfd6]/40" aria-live="polite">
          Guide {index + 1} of {guides.length}
        </p>
      )}
    </div>
  );
}
