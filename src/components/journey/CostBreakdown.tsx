import { formatFromNPR } from "@/lib/currency";
import type { Journey } from "@/lib/schema";

/**
 * Where the money goes, including our margin.
 *
 * This is the answer to "why are you more than the ₹28,000 trek-only
 * packages", and it only works because it is itemised rather than asserted.
 * Nobody in the Thamel set publishes this, which is the entire point of
 * publishing it.
 */
export default function CostBreakdown({ journey }: { journey: Journey }) {
  if (journey.costBreakdown.length === 0) return null;

  return (
    <div>
      <h3 className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
        Where the money goes
      </h3>
      <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-[#e6dfd6]/60">
        Trek-only packages in Thamel start around ₹28,000. That price is the
        walking and nothing else — no airport reception, no city hotels, no road
        transport. This is what ours is made of.
      </p>

      <table className="mt-6 w-full border-collapse text-left">
        <caption className="sr-only">
          Itemised cost breakdown for {journey.name}
        </caption>
        <tbody>
          {journey.costBreakdown.map((line) => (
            <tr
              key={line.label}
              className="border-b border-[#e6dfd6]/10 last:border-0"
            >
              <td className="py-3 pr-4 align-top">
                <span className="text-[0.925rem] text-[#e6dfd6]/75">
                  {line.label}
                </span>
                {line.note && (
                  <span className="mt-1 block text-[0.8rem] text-[#e6dfd6]/40">
                    {line.note}
                  </span>
                )}
              </td>
              <td className="py-3 text-right align-top whitespace-nowrap">
                <span className="font-display text-[1rem] font-semibold text-[#f0ece5] tabular-nums">
                  {formatFromNPR(line.amount)}
                </span>
                <span
                  className={`mt-1 block text-[0.68rem] ${
                    line.status === "verified"
                      ? "text-[#e9c9a8]/80"
                      : "text-[#e6dfd6]/35"
                  }`}
                >
                  {line.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-5 text-[0.8rem] leading-relaxed text-[#e6dfd6]/40">
        Only the partner&apos;s operating cost is confirmed. The rest is
        indicative until his cost curve by group size arrives, and the total on
        this page will move when it does.
      </p>
    </div>
  );
}
