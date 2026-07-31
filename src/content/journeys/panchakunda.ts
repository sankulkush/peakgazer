import { npr, PENDING, type Journey } from "@/lib/schema";

/**
 * Panchakunda (North ABC) — the rare route, and the only one besides ABC Short
 * the founder has walked himself.
 *
 * NOTHING about this route appears in packages.md. No itinerary, no altitudes,
 * no walking hours, no cost. What exists is the founder's own experience and
 * his photographs.
 *
 * The itinerary is therefore EMPTY rather than filled — the page renders an
 * honest "day-by-day coming, message us for the full plan" instead. This is
 * the route walked mainly by experienced trekkers, which is exactly the
 * audience that would recognise a fabricated stage list on sight.
 */
export const panchakunda: Journey = {
  slug: "panchakunda-north-abc",
  name: "Panchakunda (North ABC)",
  subtitle:
    "North of the Annapurna Base Camp trail, and a fraction of its traffic. I have walked this one.",
  region: "Annapurna (ACAP)",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: PENDING,
  nights: PENDING,
  trekDays: PENDING,
  maxAltitudeM: PENDING,

  voice: "founder",
  difficulty: 3,
  difficultyNote:
    "Graded provisionally against the routes around it. The exact profile is being written up from the founder's own notes rather than copied from anywhere.",

  bestMonths: ["October", "November", "March", "April"],

  permits: [
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area Project permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "Indian nationals pay the SAARC rate.",
    },
  ],

  // Deliberately empty. See the note above — an invented stage list here would
  // be spotted immediately by the people this route attracts.
  itinerary: [],

  honestParagraph:
    "I walked this one myself, and it is the reason this company exists. Panchakunda sits north of the Annapurna Base Camp trail and carries a fraction of its traffic — most days you will see nobody. It is not a first trek and I would not sell it as one. The full day-by-day is being written from my own notes rather than copied from another operator, so it is not on this page yet. Message me and I will talk you through the whole route.",

  honestNotes: [
    "This is a rare route. Lodging and resupply are thinner than on the Annapurna Base Camp trail, and that is the trade for the quiet.",
    "The day-by-day on this page is incomplete. We would rather show you a gap than fill it with somebody else's itinerary.",
    "Best walked by people who have already done a multi-day trek at altitude.",
  ],

  notForYou: [
    "This is your first trek at altitude.",
    "You need a fixed, published day-by-day before you commit — ours is still being written.",
    "You want teahouses and resupply at the density of the main Annapurna trail.",
  ],

  failureScenarios: [
    {
      trigger: "Weather closes the high sections.",
      likelihood:
        "To be confirmed against the founder's own record of the route.",
      whatWeDo:
        "The guide reroutes or turns the group. On a route this quiet, turning early is the normal call rather than the exceptional one.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner.",
    },
  ],

  included: [],
  excluded: [],

  // No cost model exists for this route yet. Rather than invent a range, the
  // price carries a single indicative figure the page renders as unconfirmed.
  price: {
    min: npr(0),
    max: npr(0),
    variables: [
      "Group size — the per-person cost falls sharply as the group grows.",
      "Final quote depends on season, group size and operations.",
    ],
    groupTiers: [],
    status: "indicative",
  },

  costBreakdown: [],
  guide: { slug: "guide-one" },
  images: [],

  faqs: [
    {
      question: "Why is there no day-by-day on this page?",
      answer:
        "Because we have not written ours yet, and we will not paste somebody else's. Message us and we will take you through the route stage by stage.",
    },
    {
      question: "Has anyone at this company actually walked it?",
      answer:
        "Yes. The founder has, and the photographs on this page are his. That is true of this route and Annapurna Base Camp — Short, and we do not claim it anywhere else.",
    },
  ],

  seo: {
    title:
      "Panchakunda (North ABC) Trek — A Quiet Annapurna Route | Indicative Cost",
    description:
      "Panchakunda, north of the Annapurna Base Camp trail: a rare route walked by our founder, with a fraction of the traffic. Detail and cost on request.",
    keywords: [
      "panchakunda trek",
      "north annapurna base camp",
      "quiet annapurna trek",
      "rare trek nepal from india",
    ],
  },

  status: "published",
  lastVerified: "2026-07-31",
};
