import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JourneyHero from "@/components/journey/JourneyHero";
import KeyFacts from "@/components/journey/KeyFacts";
import PriceBlock from "@/components/journey/PriceBlock";
import ImageMoment from "@/components/journey/ImageMoment";
import ItineraryList from "@/components/journey/ItineraryList";
import HonestNotes from "@/components/journey/HonestNotes";
import IncludedAndGuide from "@/components/journey/IncludedAndGuide";
import FailureScenarios from "@/components/journey/FailureScenarios";
import JourneyInvitation from "@/components/journey/JourneyInvitation";
import Footer from "@/components/layout/Footer";
import { getAllJourneys, getJourney, getPublishedJourneys } from "@/lib/content";

/**
 * The journey template. Renders every trek from the content layer.
 *
 * Rhythm: a full-bleed image moment, then a compact information block, and
 * repeat. The visitor is never more than one scroll from a fact or a WhatsApp
 * button, and the price appears twice — once early for the person who came to
 * act, once at the decision point for the person who read the whole thing.
 */

export const dynamicParams = false;

/**
 * Draft journeys are prerendered in development so they can be reviewed, and
 * excluded from the production build — CLAUDE.md keeps drafts out of the index,
 * the sitemap and generateStaticParams. With `dynamicParams = false` a draft
 * slug 404s in production rather than leaking an unconfirmed price.
 *
 * Consequence worth knowing: while all four journeys are draft, a production
 * build emits no journey pages at all.
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
    robots: journey.status === "draft" ? { index: false, follow: false } : undefined,
  };
}

const SECTION = "px-6 py-20 sm:px-10 sm:py-24 lg:px-16";
const INNER = "mx-auto max-w-6xl";

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourney(slug);
  if (!journey) notFound();

  const hardest = journey.itinerary.find((d) => d.isHardestDay);

  return (
    <>
      <main className="flex-1">
        {/* 1 — image */}
        <JourneyHero journey={journey} />

        {/* 2 — the honest paragraph, quiet after a loud screen */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-[clamp(1.25rem,2.5vw,1.75rem)] leading-[1.45] font-medium tracking-[-0.015em] text-balance text-[#f0ece5]">
              {journey.honestParagraph}
            </p>
          </div>
        </section>

        {/* 3 — facts and the price, early enough to act on */}
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

        {/* 4 — image */}
        <ImageMoment
          journey={journey}
          role="sunrise"
          label="First light from the high camp"
          line={hardest ? `Day ${hardest.day} starts before dawn.` : undefined}
          sub={hardest ? "It is the hardest day, and it is the one people remember." : undefined}
        />

        {/* 5 — the day-by-day */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              Day by day
            </h2>
            <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
              Every day, with where you sleep, how far you walk and what it is
              actually like. Open one for the detail.
            </p>
            <div className="mt-10">
              <ItineraryList journey={journey} />
            </div>
          </div>
        </section>

        {/* 6 — image, the emotional hinge */}
        <ImageMoment
          journey={journey}
          role="summitMarker"
          label={`Someone at the ${journey.maxAltitudeM.toLocaleString("en-IN")}m marker`}
          line={`${journey.maxAltitudeM.toLocaleString("en-IN")}m.`}
        />

        {/* 7 — honest notes and disqualification */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <HonestNotes journey={journey} />
          </div>
        </section>

        {/* 8 — what is included, and who walks with you */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <IncludedAndGuide journey={journey} />
          </div>
        </section>

        {/* 9 — failure scenarios, then the price again at the decision point */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <FailureScenarios journey={journey} />
            <div className="mt-14 lg:max-w-md">
              <PriceBlock journey={journey} heading="The price again" />
            </div>
          </div>
        </section>

        {/* 10 — the invitation */}
        <JourneyInvitation journey={journey} />
      </main>
      <Footer />
    </>
  );
}
