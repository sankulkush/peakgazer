import { npr, PENDING, type Journey } from "@/lib/schema";

/**
 * Tilicho Lake — a rare route we intend to run, with nothing documented yet.
 *
 * It appears in no source available to this project: no itinerary, no
 * altitudes, no walking hours, no cost. It is therefore `draft`, the itinerary
 * is empty, and the page renders "opening soon" rather than a shape invented
 * to fill the space.
 *
 * NOT founder-walked. Nothing on this page may be written in first person.
 */
export const tilicho: Journey = {
  slug: "tilicho-lake",
  name: "Tilicho Lake",
  subtitle:
    "One of the highest lakes in the world, on a route we are still preparing.",
  region: "Annapurna (ACAP)",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: PENDING,
  nights: PENDING,
  trekDays: PENDING,
  maxAltitudeM: PENDING,

  voice: "partner",
  difficulty: 4,
  difficultyNote:
    "Provisionally graded demanding on the strength of the altitude alone. The real profile is being written up with our partner before it is published.",

  bestMonths: ["October", "November", "March", "April"],

  permits: [
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area Project permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "indicative",
      lastVerified: "2026-07-28",
      note: "Permit requirements for this route are being confirmed with our partner.",
    },
  ],

  itinerary: [],

  honestParagraph:
    "One of the highest lakes in the world, on a route that carries a fraction of the traffic of the Annapurna Circuit it branches from. We are preparing this journey with our partner agency and have not walked it ourselves. Until the day-by-day, the altitudes and the cost are confirmed, this page stays open rather than filled — message us and we will tell you exactly where the planning has got to.",

  honestNotes: [
    "We have not walked this route ourselves. It is operated through our partner agency and we say so rather than implying otherwise.",
    "Nothing about the stages, altitudes or cost is confirmed yet. Everything on this page marked pending is genuinely pending.",
  ],

  notForYou: [
    "You need a confirmed itinerary and a firm price today.",
    "This is your first trek at altitude.",
  ],

  failureScenarios: [],
  included: [],
  excluded: [],

  price: {
    min: npr(0),
    max: npr(0),
    variables: ["Final quote depends on season, group size and operations."],
    groupTiers: [],
    status: "indicative",
  },

  costBreakdown: [],
  guide: { slug: "guide-one" },
  images: [],
  faqs: [],

  seo: {
    title: "Tilicho Lake Trek — Opening Soon | Indicative Cost on Request",
    description:
      "Tilicho Lake, one of the highest lakes in the world. We are preparing this journey with our partner agency; message us for the plan as it stands.",
    keywords: ["tilicho lake trek", "tilicho trek cost from india", "high altitude lake nepal"],
  },

  status: "draft",
  lastVerified: "2026-07-31",
};
