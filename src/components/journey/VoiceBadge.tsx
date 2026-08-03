import type { Journey } from "@/lib/schema";

/**
 * Says plainly when a route is operated rather than walked by us.
 *
 * Deliberately one-sided. There is no counterpart badge for routes we do know
 * first-hand — this is not a founder-led brand and the page should not lean on
 * whose feet were on the trail. What matters is that we never let a reader
 * assume first-hand knowledge where there is none, and the experienced trekkers
 * a rare route attracts are exactly who would notice.
 */
export default function VoiceBadge({ journey }: { journey: Journey }) {
  if (journey.voice !== "partner") return null;

  return (
    <p className="inline-flex items-start gap-2.5 rounded-sm border border-[#e6dfd6]/15 bg-[#0e1118] px-4 py-3 text-[0.875rem] leading-relaxed text-[#e6dfd6]/65">
      <span aria-hidden="true" className="text-[#e6dfd6]/40">
        ○
      </span>
      <span>
        A route we run through our partner agency.{" "}
        <span className="text-[#e6dfd6]/80">
          Nobody here has walked it personally
        </span>
        , and we would rather say so than imply otherwise. The detail below
        comes from our partner and from published sources.
      </span>
    </p>
  );
}
