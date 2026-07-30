import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JourneyHero from "@/components/journey/JourneyHero";
import KeyFacts from "@/components/journey/KeyFacts";
import PriceBlock from "@/components/journey/PriceBlock";
import JourneyArc from "@/components/journey/JourneyArc";
import HonestNotes from "@/components/journey/HonestNotes";
import IncludedAndGuide from "@/components/journey/IncludedAndGuide";
import CostBreakdown from "@/components/journey/CostBreakdown";
import SafetySection from "@/components/journey/SafetySection";
import AddOnsSection from "@/components/journey/AddOnsSection";
import FailureScenarios from "@/components/journey/FailureScenarios";
import JourneyInvitation from "@/components/journey/JourneyInvitation";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import Footer from "@/components/layout/Footer";
import { getAllJourneys, getJourney, getPublishedJourneys } from "@/lib/content";

/**
 * The journey template. Renders every trek from the content layer.
 *
 * The page is the itinerary, told as a journey: the visitor travels through
 * Nepal by scrolling. Full-bleed moments sit at the emotional beats, compact
 * information blocks between them, and the price appears twice — early for the
 * visitor who came to act, again at the decision point for the one who read it
 * all. No image moment is a dead end.
 */

export const dynamicParams = false;

/**
 * Draft journeys are prerendered in development so they can be reviewed, and
 * excluded from the production build — CLAUDE.md keeps drafts out of the index,
 * the sitemap and generateStaticParams. With `dynamicParams = false` a draft
 * slug 404s in production rather than leaking an unconfirmed price.
 */
export function generateStaticParams() {
  const journeys =
    process.env.NODE_ENV === "development"
      ? getAllJourneys()
      : getPublishedJourneys();
  return journeys.map((journey) => ({ slug: journey.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) return {};

  return {
    title: journey.seo.title,
    description: journey.seo.description,
    keywords: journey.seo.keywords,
    robots:
      journey.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

const SECTION = "px-6 py-16 sm:px-10 sm:py-20 lg:px-16";
const INNER = "mx-auto max-w-6xl";

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  return (
    <>
      <main className="flex-1">
        {/* 1 — arrival into the whole trip */}
        <JourneyHero journey={journey} />

        {/* 2 — the promise, plain, founder voice */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-[clamp(1.2rem,2.4vw,1.65rem)] leading-[1.5] font-medium tracking-[-0.01em] text-balance text-[#f0ece5]">
              {journey.honestParagraph}
            </p>
          </div>
        </section>

        {/* 3 — facts and price, early enough to act on */}
        <section id="facts" className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-7">
              <KeyFacts journey={journey} />
            </div>
            <div className="lg:col-span-5">
              <PriceBlock journey={journey} />
            </div>
          </div>
        </section>

        {/* 4 — the day-by-day, as a journey */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              Day by day
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
              From the airport to the flight home. Where you sleep, how far you
              walk, and what each day is actually like.
            </p>
          </div>
        </section>
        <JourneyArc journey={journey} />

        {/* 5 — what the price includes, and who walks with you */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <IncludedAndGuide journey={journey} />
          </div>
        </section>

        {/* 6 — the unflattering truths */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <HonestNotes journey={journey} />
          </div>
        </section>

        {/* 7 — what the price is made of */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <CostBreakdown journey={journey} />
          </div>
        </section>

        {/* 8 — safety, evacuation, and the no-commission clause */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <SafetySection journey={journey} />
          </div>
        </section>

        {/* 9 — when it does not go to plan */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <FailureScenarios journey={journey} />
          </div>
        </section>

        {/* 10 — the free evening, and what people add to it */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <AddOnsSection journey={journey} />

            <p className="mt-14 max-w-2xl border-t border-[#e6dfd6]/8 pt-8 text-[1rem] leading-relaxed text-[#e6dfd6]/65">
              This is the journey we run most. Want to add nights, a better
              hotel, Chitwan, or plan something different in Nepal?{" "}
              <WhatsAppButton
                context={{ journeyName: "a trip planned around my own dates" }}
                className="text-[#f0c08c] underline-offset-4 hover:underline"
              >
                Message us
              </WhatsAppButton>{" "}
              — we plan the whole trip, not just the trek.
            </p>
          </div>
        </section>

        {/* 11 — the price again, at the decision point */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={`${INNER} lg:max-w-lg`}>
            <PriceBlock journey={journey} heading="The price again" />
          </div>
        </section>

        {/* 12 — the invitation */}
        <JourneyInvitation journey={journey} />
      </main>
      <Footer />
    </>
  );
}
