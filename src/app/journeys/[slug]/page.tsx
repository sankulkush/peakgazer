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
import VoiceBadge from "@/components/journey/VoiceBadge";
import JourneyGallery from "@/components/journey/JourneyGallery";
import OpeningSoon from "@/components/journey/OpeningSoon";
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

  const hasItinerary = journey.itinerary.length > 0;
  const hasPrice = journey.price.groupTiers.length > 0;
  const hasIncluded = journey.included.length > 0;
  const hasFailures = journey.failureScenarios.length > 0;
  // Roles already shown beside a day or as a full-bleed moment; the gallery
  // takes what is left rather than repeating them.
  const usedRoles = journey.itinerary.flatMap((d) =>
    [d.image, d.bleed?.role].filter((r) => r !== undefined),
  );

  return (
    <>
      <main className="flex-1">
        {/* 1 — arrival into the whole trip */}
        <JourneyHero journey={journey} />

        {/* 2 — the promise, in whichever voice this route is entitled to */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className="mx-auto max-w-3xl">
            {journey.status === "draft" && (
              <div className="mb-10">
                <OpeningSoon journey={journey} />
              </div>
            )}

            <p className="font-display text-[clamp(1.2rem,2.4vw,1.65rem)] leading-[1.5] font-medium tracking-[-0.01em] text-balance text-[#f0ece5]">
              {journey.honestParagraph}
            </p>

            <div className="mt-8">
              <VoiceBadge journey={journey} />
            </div>
          </div>
        </section>

        {/* 3 — facts and price, early enough to act on */}
        <section id="facts" className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={`${INNER} grid gap-12 lg:grid-cols-12 lg:gap-16`}>
            <div className="lg:col-span-7">
              <KeyFacts journey={journey} />
            </div>
            <div className="lg:col-span-5">
              {hasPrice ? (
                <PriceBlock journey={journey} />
              ) : (
                <div className="rounded-sm border border-[#e6dfd6]/12 bg-[#0e1118] p-6">
                  <h2 className="font-display text-[1.35rem] font-semibold text-[#f7f2ea]">
                    What it costs
                  </h2>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/60">
                    We have not costed this route yet, and we will not put a
                    number on this page before we have. Message us and we will
                    quote it properly for your group size and dates.
                  </p>
                  <div className="mt-6">
                    <WhatsAppButton
                      context={{ journeyName: journey.name }}
                      className="inline-flex items-center rounded-full bg-[#f0c08c] px-6 py-3 text-[0.9rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
                    >
                      Ask what it costs
                    </WhatsAppButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4 — the day-by-day, as a journey */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              Day by day
            </h2>
            {hasItinerary ? (
              <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
                Where you sleep, how far you walk, and what each day is actually
                like.
              </p>
            ) : (
              <div className="mt-6 max-w-2xl border-l-2 border-[#e9c9a8]/40 pl-5">
                <p className="text-[1rem] leading-relaxed text-[#e6dfd6]/70">
                  The detailed day-by-day for this route is still being written
                  from our own notes. We will not paste another operator&apos;s
                  itinerary in the meantime — on a route walked mostly by
                  experienced trekkers, that would be spotted immediately.
                </p>
                <div className="mt-5">
                  <WhatsAppButton
                    context={{ journeyName: journey.name }}
                    className="inline-flex items-center rounded-full border border-[#f0c08c]/40 px-6 py-3 text-[0.9rem] text-[#f0c08c] transition-colors duration-300 hover:bg-[#f0c08c]/10"
                  >
                    Message us for the full plan
                  </WhatsAppButton>
                </div>
              </div>
            )}
          </div>
        </section>
        {hasItinerary && <JourneyArc journey={journey} />}

        {/* 5 — what the price includes, and who walks with you */}
        {hasIncluded && (
          <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
            <div className={INNER}>
              <IncludedAndGuide journey={journey} />
            </div>
          </section>
        )}

        {/* 5b — frames that belong to the route rather than one day */}
        <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
          <div className={INNER}>
            <JourneyGallery
              journey={journey}
              exclude={usedRoles}
            />
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
        {hasFailures && (
          <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
            <div className={INNER}>
              <FailureScenarios journey={journey} />
            </div>
          </section>
        )}

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
        {hasPrice && (
          <section className={`${SECTION} border-b border-[#e6dfd6]/8`}>
            <div className={`${INNER} lg:max-w-lg`}>
              <PriceBlock journey={journey} heading="The price again" />
            </div>
          </section>
        )}

        {/* 12 — the invitation */}
        <JourneyInvitation journey={journey} />
      </main>
      <Footer />
    </>
  );
}
