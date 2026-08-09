import { npr, PENDING, type Journey } from "@/lib/schema";
import { INSURANCE_EXCLUSION } from "./shared";

/**
 * Pikey Peak — a launch route with nothing documented yet.
 *
 * No itinerary, altitudes, duration or cost exists in any source available to
 * this project. Everything is PENDING and the itinerary is empty rather than
 * invented. Not built, not published.
 *
 * NOT walked by anyone here — partner voice, no first person.
 */
export const pikeyPeak: Journey = {
  slug: "pikey-peak",
  name: "Pikey Peak",
  subtitle: "A route we run in the Everest foothills. Detail on request.",
  region: "Solukhumbu (Everest region)",
  startCity: "Kathmandu",
  endCity: "Kathmandu",
  days: PENDING,
  nights: PENDING,
  trekDays: PENDING,
  maxAltitudeM: PENDING,

  voice: "partner",
  difficulty: 2,
  difficultyNote:
    "Provisionally graded moderate. The real profile is being written up with our partner before it is published.",

  bestMonths: ["October", "November", "March", "April"],
  permits: [],
  itinerary: [],

  honestParagraph:
    "A route we run in the Everest foothills, operated by our partner agency. The day-by-day, the altitudes and the cost are being written up now and are not on this page yet. Message us and we will tell you exactly where the planning has got to.",

  honestNotes: [
    "Nothing about the stages, altitudes or cost is confirmed. Everything marked pending here is genuinely pending.",
  ],
  notForYou: ["You need a confirmed itinerary and a firm price today."],
  failureScenarios: [],
  included: [],
  excluded: [INSURANCE_EXCLUSION],

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
    title: "Pikey Peak Trek — Indicative Cost on Request",
    description:
      "Pikey Peak in the Everest foothills, operated by our partner agency. Message us for the plan as it stands.",
    keywords: ["pikey peak trek", "pikey peak nepal", "everest foothills trek"],
  },

  status: "draft",
  lastVerified: "2026-08-03",
};
