"use client";

import Reveal from "@/components/common/Reveal";
import TrekCard from "./TrekCard";
import ScrollRow from "./ScrollRow";
import type { Journey } from "@/lib/schema";
import { npr } from "@/lib/schema";

const DUMMY_CLIMBS: Journey[] = [
  {
    slug: "island-peak-dummy",
    name: "Island Peak",
    subtitle: "A popular introductory Himalayan peak",
    region: "Himalayan",
    startCity: "Kathmandu",
    endCity: "Kathmandu",
    days: 12,
    nights: 11,
    trekDays: 8,
    maxAltitudeM: 6189,
    difficulty: 3,
    difficultyNote: "Steep snow above 5700m",
    bestMonths: ["April", "May", "September", "October"],
    permits: [],
    price: {
      min: npr(85000),
      max: npr(85000),
      variables: ["group size"],
      groupTiers: [
        { groupSize: 2, perPerson: npr(95000), status: "indicative" },
        { groupSize: 4, perPerson: npr(90000), status: "indicative" },
        { groupSize: 8, perPerson: npr(85000), status: "indicative" },
      ],
      status: "indicative",
    },
    costBreakdown: [],
    itinerary: [],
    honestParagraph: "Dummy placeholder for Island Peak climb.",
    honestNotes: [],
    notForYou: [],
    failureScenarios: [],
    included: [],
    excluded: [],
    guide: { slug: "dummy-guide" },
    images: [],
    faqs: [],
    seo: { title: "Island Peak", description: "Dummy", keywords: [] },
    status: "draft",
    lastVerified: "2026-01-01",
    voice: "partner",
  },
  {
    slug: "mera-peak-dummy",
    name: "Mera Peak",
    subtitle: "The highest trekking peak in Nepal",
    region: "Himalayan",
    startCity: "Kathmandu",
    endCity: "Kathmandu",
    days: 14,
    nights: 13,
    trekDays: 10,
    maxAltitudeM: 6674,
    difficulty: 3,
    difficultyNote: "Long approach via Glacier",
    bestMonths: ["April", "May", "September", "October"],
    permits: [],
    price: {
      min: npr(95000),
      max: npr(95000),
      variables: ["group size"],
      groupTiers: [
        { groupSize: 2, perPerson: npr(105000), status: "indicative" },
        { groupSize: 4, perPerson: npr(100000), status: "indicative" },
        { groupSize: 8, perPerson: npr(95000), status: "indicative" },
      ],
      status: "indicative",
    },
    costBreakdown: [],
    itinerary: [],
    honestParagraph: "Dummy placeholder for Mera Peak climb.",
    honestNotes: [],
    notForYou: [],
    failureScenarios: [],
    included: [],
    excluded: [],
    guide: { slug: "dummy-guide" },
    images: [],
    faqs: [],
    seo: { title: "Mera Peak", description: "Dummy", keywords: [] },
    status: "draft",
    lastVerified: "2026-01-01",
    voice: "partner",
  },
  {
    slug: "lobuche-east-dummy",
    name: "Lobuche East",
    subtitle: "Steep snow and technical sections",
    region: "Himalayan",
    startCity: "Kathmandu",
    endCity: "Kathmandu",
    days: 16,
    nights: 15,
    trekDays: 12,
    maxAltitudeM: 6101,
    difficulty: 4,
    difficultyNote: "Technical rock and ice",
    bestMonths: ["April", "May", "September", "October"],
    permits: [],
    price: {
      min: npr(120000),
      max: npr(120000),
      variables: ["group size"],
      groupTiers: [
        { groupSize: 2, perPerson: npr(130000), status: "indicative" },
        { groupSize: 4, perPerson: npr(125000), status: "indicative" },
        { groupSize: 8, perPerson: npr(120000), status: "indicative" },
      ],
      status: "indicative",
    },
    costBreakdown: [],
    itinerary: [],
    honestParagraph: "Dummy placeholder for Lobuche East climb.",
    honestNotes: [],
    notForYou: [],
    failureScenarios: [],
    included: [],
    excluded: [],
    guide: { slug: "dummy-guide" },
    images: [],
    faqs: [],
    seo: { title: "Lobuche East", description: "Dummy", keywords: [] },
    status: "draft",
    lastVerified: "2026-01-01",
    voice: "partner",
  },
];

export default function TheClimbs() {
  return (
    <section id="climbs" className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              The climbs
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
              Peak climbing in the Himalaya, run with the same partner agency.
              Details will appear here once the routes are documented.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="mt-12">
          <ScrollRow>
            {DUMMY_CLIMBS.map((climb) => (
              <TrekCard key={climb.slug} journey={climb} open={false} onOpen={() => {}} />
            ))}
          </ScrollRow>
        </Reveal>
      </div>
    </section>
  );
}
