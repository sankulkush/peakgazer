import type { Metadata } from "next";
import TrekTable from "@/components/treks/TrekTable";
import Footer from "@/components/layout/Footer";
import { getAllJourneys, getPublishedJourneys } from "@/lib/content";

export const metadata: Metadata = {
  title: "All treks — durations, altitudes and indicative costs | Uthbus Tours",
  description:
    "Every journey we run, with days, walking days, highest point, difficulty and indicative cost per person. Filter by region, length, difficulty and season.",
};

/**
 * The functional browse layer, kept deliberately separate from the editorial
 * journey pages.
 *
 * Drafts appear here — that is the point of the index. Ship what is real, flag
 * what is coming. They are excluded from the sitemap and from
 * generateStaticParams; this page is where "opening soon" is visible.
 */
export default function TreksPage() {
  const journeys = getAllJourneys();
  const open = getPublishedJourneys().length;

  return (
    <>
      <main className="flex-1 px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            All treks
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            {journeys.length} journeys. {open} are open for booking now; the
            rest are being prepared and are marked as such. We publish a route
            when we have our own photographs of it and a day-by-day we have
            checked — not before.
          </p>

          <div className="mt-12">
            <TrekTable journeys={journeys} />
          </div>

          <p className="mt-10 max-w-2xl text-[0.85rem] leading-relaxed text-[#e6dfd6]/40">
            Prices are indicative, quoted per person at eight travellers, and
            converted from Nepali rupees. They are not a quote — the final
            number depends on season, group size and operations. Figures shown
            as &ldquo;to be confirmed&rdquo; are genuinely unconfirmed rather
            than withheld.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
