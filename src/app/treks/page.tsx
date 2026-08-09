import type { Metadata } from "next";
import TrekBrowser from "@/components/treks/TrekBrowser";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import Footer from "@/components/layout/Footer";
import { getAllJourneys } from "@/lib/content";

export const metadata: Metadata = {
  title: "All treks — durations, altitudes and indicative costs | Uthbus Tours",
  description:
    "Every trek we feature, with days, highest point, difficulty and indicative cost per person. Search by name, region or difficulty.",
};

/**
 * The browse layer, deliberately separate from the editorial journey pages.
 *
 * Plain and fast: search, filter, scan, leave. Someone arriving here wants to
 * compare routes and then go to the one that matters to them, so this page
 * spends nothing on atmosphere.
 *
 * It lists every trek in the content layer and scales to more without edits.
 */
export default function TreksPage() {
  const journeys = getAllJourneys();

  return (
    <>
      <main className="flex-1 px-6 py-20 sm:px-10 sm:py-24 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-display text-[clamp(1.9rem,3.6vw,2.75rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            All treks
          </h1>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            The routes we feature, run with our partner agency. If what you want
            is not here, it can almost certainly still be arranged — tell us
            what you have in mind.
          </p>

          <div className="mt-12">
            <TrekBrowser journeys={journeys} />
          </div>

          <div className="mt-20 border-t border-[#e6dfd6]/8 pt-10">
            <p className="max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/65">
              Looking for something that is not on this page?{" "}
              <WhatsAppButton
                context={{ journeyName: "a trip planned around my own dates" }}
                className="text-[#f0c08c] underline-offset-4 hover:underline"
              >
                Message us
              </WhatsAppButton>{" "}
              and we will plan it around you.
            </p>

            <p className="mt-8 max-w-2xl text-[0.85rem] leading-relaxed text-[#e6dfd6]/40">
              Prices are indicative, quoted per person at eight travellers, and
              converted from Nepali rupees. They are not a quote — the final
              number depends on season, group size and operations. Figures shown
              as &ldquo;to be confirmed&rdquo; are genuinely unconfirmed rather
              than withheld.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
