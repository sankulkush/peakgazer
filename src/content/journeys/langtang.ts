import { npr, PENDING, type Journey } from "@/lib/schema";

/**
 * Langtang Valley — the shape is known, the stages are not.
 *
 * CLAUDE.md carries days, walking days and max altitude, and packages.md the
 * park permit — those are real and appear here. The day-by-day exists in no
 * source: packages.md records it as "documented in the earlier packages spec"
 * and does not repeat it. So the itinerary stays empty and the page says
 * "opening soon" rather than inventing stages.
 *
 * NOT founder-walked. Nothing on this page may be written in first person.
 */
export const langtang: Journey = {
  slug: "langtang-valley",
  name: "Langtang Valley",
  subtitle:
    "Seven days from Kathmandu into a valley rebuilt by the people who live in it.",
  region: "Langtang",
  startCity: "Kathmandu",
  endCity: "Kathmandu",
  days: 7,
  nights: PENDING,
  trekDays: 5,
  maxAltitudeM: 3870,

  voice: "partner",
  difficulty: 2,
  difficultyNote:
    "Provisionally graded moderate. Five walking days to 3,870m, with Tserko Ri at 4,984m as an optional morning. The per-day profile is being written up with our partner.",

  bestMonths: ["October", "November", "March", "April"],

  optionalHighPoint: {
    name: "Tserko Ri",
    altitudeM: 4984,
    condition:
      "An optional morning from Kyanjin Gompa, weather and acclimatisation permitting. Never a promise.",
  },

  permits: [
    {
      name: "Langtang National Park",
      fullName: "Langtang National Park entry permit",
      costSAARC: npr(1500),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "Langtang only. Indian nationals pay the SAARC rate.",
    },
  ],

  itinerary: [],

  honestParagraph:
    "The only one of our routes that starts and ends in Kathmandu, and the valley that was hardest hit by the 2015 earthquake and rebuilt by the people who live in it. Seven days, five of them walking, to 3,870m at Kyanjin Gompa. We run this through our partner agency and have not walked it ourselves. The day-by-day and the cost are being written up now — message us for the plan as it stands.",

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
    title: "Langtang Valley Trek — 7 Days from Kathmandu | Opening Soon",
    description:
      "Langtang Valley, seven days from Kathmandu to 3,870m. We are preparing this journey with our partner agency; message us for the plan as it stands.",
    keywords: ["tilicho lake trek", "tilicho trek cost from india", "high altitude lake nepal"],
  },

  status: "draft",
  lastVerified: "2026-07-31",
};
