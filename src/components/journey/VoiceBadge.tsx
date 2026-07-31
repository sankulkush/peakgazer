import type { Journey } from "@/lib/schema";

/**
 * Says plainly whose experience this page rests on.
 *
 * A false "I walked this" is the one lie this brand cannot survive, and the
 * experienced trekkers a rare route attracts are exactly who would catch it.
 * So the claim is made explicitly where it is true, and its absence is made
 * explicit where it is not — rather than leaving the reader to assume.
 */
export default function VoiceBadge({ journey }: { journey: Journey }) {
  const founder = journey.voice === "founder";

  return (
    <p
      className={`inline-flex items-start gap-2.5 rounded-sm border px-4 py-3 text-[0.875rem] leading-relaxed ${
        founder
          ? "border-[#e9c9a8]/30 bg-[#e9c9a8]/[0.06] text-[#f0ece5]"
          : "border-[#e6dfd6]/15 bg-[#0e1118] text-[#e6dfd6]/65"
      }`}
    >
      {founder ? (
        <>
          <span aria-hidden="true" className="text-[#e9c9a8]">
            ●
          </span>
          <span>
            <span className="font-medium text-[#f7f2ea]">
              Our founder has walked this route.
            </span>{" "}
            The photographs are his and the notes come from his own days on it.
          </span>
        </>
      ) : (
        <>
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
        </>
      )}
    </p>
  );
}
