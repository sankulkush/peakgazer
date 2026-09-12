"use client";

import Reveal from "@/components/common/Reveal";
import TrekCard from "./TrekCard";
import ScrollRow from "./ScrollRow";
import { getPublishedJourneys } from "@/lib/content";

export default function FeaturedTrips() {
  const journeys = getPublishedJourneys();

  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            Featured trips
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            The routes people ask for most, operated by our partner agency.
            Every price falls as the group grows.
          </p>
        </Reveal>

        {journeys.length === 0 ? (
          <Reveal delay={0.06} className="mt-12">
            <div className="rounded-[6px] border border-[#e6dfd6]/12 bg-[#0e1118] p-8 sm:p-10">
              <p className="text-[1.0625rem] leading-relaxed text-[#e6dfd6]/60">
                The featured selection is being confirmed. Check back soon for
                the routes people ask for most, with real prices and availability.
              </p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={0.08} className="mt-12">
            <ScrollRow>
              {journeys.map((journey) => (
                <TrekCard key={journey.slug} journey={journey} open={false} onOpen={() => {}} />
              ))}
            </ScrollRow>
          </Reveal>
        )}
      </div>
    </section>
  );
}
