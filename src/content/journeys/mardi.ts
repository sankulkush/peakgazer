import { npr, type Journey } from "@/lib/schema";
import {
  ANNAPURNA_EXCLUDED,
  ANNAPURNA_FAQS,
  ANNAPURNA_INCLUDED,
} from "./shared";

/**
 * Sources: the founder's Mardi spec, and packages.md "JOURNEY 3 — MARDI HIMAL".
 * The two agree on days, altitudes and walking hours.
 *
 * The failure scenarios come from the founder's spec — it is the only source
 * with a complete `whoPays` for this route.
 *
 * Altitudes carry a live caveat: packages.md records that published figures
 * disagree (High Camp 3,550–3,600m, Upper Viewpoint 4,200–4,250m) and must be
 * confirmed with the partner before an elevation graphic is drawn.
 *
 * Stays `status: 'draft'` until the cost model carries real rates.
 */
export const mardi: Journey = {
  slug: "mardi-himal",
  name: "Mardi Himal",
  subtitle:
    "Six days on a high ridge below Machhapuchhre. Quieter than Base Camp, and shorter.",
  region: "Annapurna (ACAP)",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: 6,
  nights: 5,
  trekDays: 4,
  maxAltitudeM: 4200,

  optionalHighPoint: {
    name: "Mardi Himal Base Camp",
    altitudeM: 4500,
    condition:
      "Possible in good conditions, but it is the guide's decision on the morning — not a promise.",
  },

  voice: "partner",
  difficulty: 2,
  difficultyNote:
    "Four consecutive days of 4–7 hours. Steep forest ascent on day 2. One exposed ridge section. No technical ground.",

  bestMonths: ["October", "November", "March", "April"],

  permits: [
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area Project permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "indicative",
      lastVerified: "2026-07-28",
      note: "ACAP only. No TIMS enforcement currently reported on this route — VERIFY before publishing.",
    },
  ],

  itinerary: [
    {
      day: 1,
      title: "Arrive Pokhara",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      terrain: "Briefing, gear check, permits confirmed. No walking.",
      honestNote: "A logistics day, not a scenic one. Arrive by evening.",
    },
    {
      day: 2,
      title: "Pokhara → Kande by road, trek to Forest Camp",
      from: "Pokhara",
      to: "Forest Camp",
      sleepAltitudeM: 2550,
      walkingHours: [5, 6],
      ascentM: 1700,
      terrain:
        "Continuous rhododendron and oak forest, steep and enclosed. Roughly one hour by road to the trailhead at Kande.",
      honestNote:
        "The hardest day of the trek and it comes second. Almost no views — you are inside forest the entire way. Most people underestimate this day.",
      isHardestDay: true,
    },
    {
      day: 3,
      title: "Forest Camp → Low Camp → High Camp",
      from: "Forest Camp",
      to: "High Camp",
      sleepAltitudeM: 3580,
      walkingHours: [5, 6],
      terrain: "Forest gives way to ridge. Views open at Low Camp.",
      honestNote:
        "The tree line breaks about an hour above Low Camp and the whole Annapurna wall appears at once. This is the moment people remember.",
    },
    {
      day: 4,
      title: "High Camp → Upper Viewpoint → descend to Low Camp",
      from: "High Camp",
      to: "Low Camp",
      sleepAltitudeM: 2970,
      highPointM: 4200,
      walkingHours: [6, 7],
      terrain:
        "Exposed ridge, narrow in places, loose underfoot near the top.",
      honestNote:
        "Cold and windy before sunrise. The ridge has drops on both sides and is not for anyone uneasy with exposure. Base Camp at 4,500m is possible in good conditions but is a guide decision on the morning, not a promise.",
    },
    {
      day: 5,
      title: "Low Camp → Siding village → jeep to Pokhara",
      from: "Low Camp",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: [4, 5],
      transport: "jeep",
      honestNote:
        "A long descent on knees already tired. Trekking poles matter here.",
    },
    {
      day: 6,
      title: "Pokhara — depart",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      honestNote: "Departure day. Nothing scheduled.",
    },
  ],

  // TODO: rewrite in the founder's first person. This is the supplied draft.
  honestParagraph:
    "Four days, of which one is genuinely hard and it is the second. Mardi is newer than the Annapurna Base Camp trail and carries a fraction of the traffic — on the ridge above Low Camp you will often be alone. The lodges are smaller and simpler than on ABC, some are seasonal, and beds at High Camp are limited enough that arriving late in October is a real risk. It is the closest thing to a quiet Annapurna trek that still fits in a week.",

  honestNotes: [
    "The hardest day is day 2, not day 4 — a steep 1,700m forest ascent with almost no views.",
    "Lodges are smaller and simpler than on the Annapurna Base Camp trail, and some are seasonal.",
    "Beds at High Camp are limited. Arriving in the third or fourth week of October is a real risk.",
    "The ridge above High Camp is exposed, narrow in places, and loose underfoot near the top.",
  ],

  notForYou: [
    "You are uneasy with exposed ridges and drops on both sides.",
    "You cannot walk 5–6 hours on four consecutive days.",
    "You need a private room every night — High Camp cannot always provide one.",
    "You want guaranteed Base Camp — day 4 above the Upper Viewpoint is weather-dependent.",
  ],

  failureScenarios: [
    {
      trigger: "High Camp full during peak October.",
      likelihood: "Real risk in the third and fourth weeks of October.",
      whatWeDo:
        "We book ahead and hold beds. If that fails, we split the group across High and Low Camp and adjust day 4's start time.",
      whoPays: "We do. No additional charge to you.",
    },
    {
      trigger: "Snow or high wind closes the ridge above High Camp.",
      likelihood: "Occasional in March and late November.",
      whatWeDo:
        "The guide calls it at High Camp. We descend and offer the Low Camp viewpoint instead.",
      whoPays:
        "No refund for the missed viewpoint — the permit and the days were used — but we do not charge for the changed routing.",
    },
    {
      trigger: "Altitude symptoms at High Camp (3,580m).",
      likelihood: "Uncommon but present. The gain from Pokhara is fast.",
      whatWeDo:
        "Descend immediately with the guide. Descent is the treatment.",
      whoPays:
        "Your insurance covers evacuation. We take no commission on any evacuation flight, ever.",
    },
  ],

  included: ANNAPURNA_INCLUDED,
  excluded: ANNAPURNA_EXCLUDED,

  // Indicative sell prices from packages.md, converted INR → NPR at 1.6.
  // ₹40–43k solo · ₹35–38k at 2 · ₹31–33k at 4 · ₹28–30k at 8.
  //
  // Weaker anchoring than the ABC routes: packages.md records that no
  // competitor Mardi price was captured in the Thamel research and one must be
  // collected before these are finalised.
  price: {
    min: npr(44800),
    max: npr(68800),
    variables: [
      "Group size — the per-person cost falls sharply from solo to eight walkers.",
      "Whether you add the Mardi Himal Base Camp morning on day 4.",
      "Season — October and April lodge rates run higher than March.",
      "Nationality — Indian nationals pay the SAARC permit rate.",
    ],
    groupTiers: [
      { groupSize: "solo", perPerson: npr(64000), perPersonMax: npr(68800), status: "indicative" },
      { groupSize: 2, perPerson: npr(56000), perPersonMax: npr(60800), status: "indicative" },
      { groupSize: 4, perPerson: npr(49600), perPersonMax: npr(52800), status: "indicative" },
      { groupSize: 8, perPerson: npr(44800), perPersonMax: npr(48000), status: "indicative" },
    ],
    status: "indicative",
  },

  costBreakdown: [
    { label: "ACAP permit (SAARC rate)", amount: npr(1000), status: "indicative" },
    { label: "Licensed guide — 4 trek days", amount: npr(12000), status: "indicative" },
    { label: "Porter — 4 trek days, shared", amount: npr(7000), status: "indicative" },
    { label: "Teahouse beds — 3 nights", amount: npr(4500), status: "indicative" },
    { label: "Meals on the trail", amount: npr(9000), status: "indicative" },
    { label: "Road transfer, Pokhara ↔ trailhead", amount: npr(3500), status: "indicative" },
    { label: "Contingency — spare day, alternative routing", amount: npr(2500), status: "indicative" },
  ],

  guide: { slug: "guide-one" },

  // TODO: original photography, each captioned with place and month.
  images: [],

  faqs: [
    ...ANNAPURNA_FAQS,
    {
      question: "Which day is hardest?",
      answer:
        "Day 2 — the steep forest climb. It comes second, it is almost viewless, and most people underestimate it.",
    },
    {
      question: "How is Mardi different from Annapurna Base Camp?",
      answer:
        "Shorter, much quieter, and it follows a high ridge rather than a valley into an amphitheatre. Fewer people, simpler lodges.",
    },
    {
      question: "Which is harder, Mardi or ABC Short?",
      answer:
        "Mardi's single hardest day, the forest climb, is brutal. ABC has more sustained long days. Mardi is shorter overall.",
    },
    {
      question: "Is the ridge dangerous?",
      answer:
        "It is exposed with drops on both sides, but not technical. If heights unsettle you, tell us — this may not be your trek.",
    },
    {
      question: "Will I definitely reach the viewpoint?",
      answer:
        "The Upper Viewpoint usually yes. Base Camp at 4,500m depends on weather and is the guide's call on the morning.",
    },
    {
      question: "Are lodges a problem in October?",
      answer:
        "High Camp beds are limited. We book ahead, but late arrivals in peak October are a real risk, which is why departures are planned early.",
    },
  ],

  seo: {
    title:
      "Mardi Himal Trek — 6 Days from Pokhara | Quiet Annapurna Alternative, Indicative Cost",
    description:
      "A 6-day Mardi Himal ridge trek from Pokhara — quieter than Annapurna Base Camp. Real hours, real altitudes, SAARC permit rates, cost broken down line by line.",
    keywords: [
      "mardi himal trek from india",
      "mardi himal cost",
      "mardi himal 6 day package",
      "quiet annapurna trek",
      "mardi himal vs abc",
      "mardi himal saarc permit",
    ],
  },

  status: "draft",
  lastVerified: "2026-07-28",
};
