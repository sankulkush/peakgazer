import { npr, PENDING, type Journey } from "@/lib/schema";
import {
  ANNAPURNA_EXCLUDED,
  ANNAPURNA_FAQS,
  ANNAPURNA_INCLUDED,
} from "./shared";

/**
 * Source: packages.md, "JOURNEY 1 — ANNAPURNA BASE CAMP (SHORT)".
 *
 * Days, altitudes, walking hours, honest notes, inclusions, FAQs and SEO are
 * transcribed from that document. Prices are the document's own indicative
 * figures, authored there in INR and stored here in NPR (× 1.6, exact at the
 * 0.625 rate in company.ts).
 *
 * NOT BUILT. Duration is now 5 days per the launch catalogue, but the
 * itinerary below still describes the old 7-day staging and must be replaced
 * with the partner's 5-day version before this page is built. `status: 'draft'`
 * keeps it out of generateStaticParams, so none of it renders today.
 */
export const abcShort: Journey = {
  slug: "annapurna-base-camp-short",
  name: "Annapurna Base Camp — Short",
  subtitle:
    "Five days to the Annapurna Sanctuary and back, from Pokhara.",
  region: "Annapurna (ACAP)",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: 5,
  trekDays: 4,
  maxAltitudeM: 4130,

  nights: PENDING,
  voice: "founder",
  difficulty: 3,
  difficultyNote:
    "Moderate to demanding. Two long days of 7–8 hours, steep stone-step sections, and fast altitude gain. No technical ground.",

  bestMonths: ["October", "November", "March", "April"],

  permits: [
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area Project permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "Children under 10 free. Indian nationals pay the SAARC rate.",
    },
  ],

  itinerary: [
    {
      day: 1,
      title: "Arrive Pokhara",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      terrain: "Briefing, gear check, permits confirmed. Pokhara hotel.",
      honestNote: "A logistics day, not a scenic one. Arrive by evening.",
    },
    {
      day: 2,
      title: "Pokhara → Jhinu/Kimche by jeep, trek to Chhomrong",
      from: "Pokhara",
      to: "Chhomrong",
      sleepAltitudeM: 2170,
      walkingHours: [3, 4],
      transport: "jeep",
      terrain: "Roughly three hours by jeep, then a short walking day.",
      honestNote:
        "An easy start once the jeep drops you. Chhomrong is the last proper village before the sanctuary.",
    },
    {
      day: 3,
      title: "Chhomrong → Bamboo → Dovan",
      from: "Chhomrong",
      to: "Dovan",
      sleepAltitudeM: 2600,
      walkingHours: [5, 6],
      terrain: "Stone steps down to the river, then up the far side.",
      honestNote:
        "Relentless stone steps down to the river then up the far side. This is the first hard day — the steps punish the knees more than the lungs.",
    },
    {
      day: 4,
      title: "Dovan → Deurali → Machhapuchhre Base Camp",
      from: "Dovan",
      to: "Machhapuchhre Base Camp",
      sleepAltitudeM: 3700,
      walkingHours: [5, 6],
      terrain: "The valley narrows and the walls close in.",
      honestNote:
        "The valley narrows and the walls close in. Altitude starts to tell here; the guide watches for it.",
    },
    {
      day: 5,
      title: "MBC → Annapurna Base Camp for sunrise, descend to Bamboo",
      from: "Machhapuchhre Base Camp",
      to: "Bamboo",
      sleepAltitudeM: 2310,
      highPointM: 4130,
      walkingHours: [7, 8],
      terrain: "Up into the amphitheatre for first light, then a long descent.",
      honestNote:
        "The hardest day, and it is worth it. Up to Base Camp for first light inside the amphitheatre, then a long descent. Long, cold at the top, and physically the biggest day of the week.",
      isHardestDay: true,
    },
    {
      day: 6,
      title: "Bamboo → Jhinu Danda hot springs, jeep to Pokhara",
      from: "Bamboo",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: [4, 5],
      transport: "jeep",
      honestNote:
        "A descent to the hot springs at Jhinu, then the jeep back. Knees will be tired.",
    },
    {
      day: 7,
      title: "Pokhara — depart",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      honestNote: "Hotel breakfast. The trip ends after breakfast.",
    },
  ],

  honestParagraph:
    "Five days to the Annapurna Sanctuary at 4,130m and back, with a jeep at both ends to cut the dullest road-walking that longer versions still include. You sleep low, climb to 4,130m for a sunrise, and come down. Two days are hard — the stone steps below Chhomrong, and the morning at Base Camp — and we say so before you book rather than after.",

  honestNotes: [
    "Day 5 is long and hard: a sunrise summit push plus a big descent.",
    "Day 3 is relentless stone steps — harder on the body than the altitude.",
    "Lodges above Chhomrong are basic, rooms unheated, food repetitive.",
    "No hot shower after Chhomrong without paying, and often not then.",
    "In October the trail is busy. You will not have the sanctuary to yourself.",
  ],

  notForYou: [
    "You cannot walk 6 hours on consecutive days.",
    "You have uncontrolled heart or lung conditions.",
    "You need a heated room and a hot shower every night.",
    "You want solitude in peak October — this is a popular route.",
  ],

  failureScenarios: [
    {
      trigger: "Altitude symptoms at MBC (3,700m) or on the day-5 push.",
      likelihood:
        "The most common operational issue on this route. The gain from 822m to 4,130m across four days is moderately fast.",
      whatWeDo:
        "The guide monitors daily and calls the turnaround. Descent begins immediately; descent is the treatment.",
      whoPays:
        "Your insurance covers evacuation. Costs arising from an early descent are not refundable.",
    },
    {
      trigger: "Lodge overcrowding above Chhomrong in peak October.",
      likelihood: "A known pressure point in the first half of October.",
      whatWeDo:
        "We book ahead. Where beds cannot be held, the guide adjusts the day's stage to a lodge that can take the group.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner. Do not publish this line until it has.",
    },
    {
      trigger:
        "Landslide closes the jeep road to the trailhead in shoulder season.",
      likelihood: "Occasional after heavy rain at the edges of the monsoon.",
      whatWeDo:
        "We reroute to the walking approach, which adds time to the first or last day.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner. Do not publish this line until it has.",
    },
  ],

  included: ANNAPURNA_INCLUDED,
  excluded: ANNAPURNA_EXCLUDED,

  // Indicative sell prices from packages.md, converted INR → NPR at 1.6.
  // ₹46–48k solo · ₹40–42k at 2 · ₹36–38k at 4 · ₹32–34k at 8.
  price: {
    min: npr(51200),
    max: npr(76800),
    variables: [
      "Group size — the per-person cost falls sharply from solo to eight walkers.",
      "Season — October and April lodge rates run higher than March.",
      "Nationality — Indian nationals pay the SAARC permit rate, a third of the foreign fee.",
      "Whether you take a private jeep, a private guide or an unshared porter.",
    ],
    groupTiers: [
      { groupSize: "solo", perPerson: npr(73600), perPersonMax: npr(76800), status: "indicative" },
      { groupSize: 2, perPerson: npr(64000), perPersonMax: npr(67200), status: "indicative" },
      { groupSize: 4, perPerson: npr(57600), perPersonMax: npr(60800), status: "indicative" },
      { groupSize: 8, perPerson: npr(51200), perPersonMax: npr(54400), status: "indicative" },
    ],
    status: "indicative",
  },

  // TODO: the partner's per-head operating cost by group size is the number
  // everything financial derives from, and it is not yet known. These lines
  // show the shape of the breakdown, not real rates.
  costBreakdown: [
    { label: "ACAP permit (SAARC rate)", amount: npr(1000), status: "indicative" },
    { label: "Licensed guide — 5 trek days", amount: npr(15000), status: "indicative" },
    { label: "Porter — 5 trek days, one per two trekkers", amount: npr(10000), status: "indicative" },
    { label: "Teahouse beds — 5 nights", amount: npr(7500), status: "indicative" },
    { label: "Kathmandu and Pokhara hotel — 4 nights", amount: npr(12000), status: "indicative" },
    { label: "All trek meals", amount: npr(11000), status: "indicative" },
    { label: "Jeep transfers, Pokhara ⇄ trailhead", amount: npr(6000), status: "indicative" },
    { label: "Guide insurance", amount: npr(1500), status: "indicative" },
    { label: "Contingency — spare day, alternative routing", amount: npr(3000), status: "indicative" },
  ],

  guide: { slug: "guide-one" },
  images: [
    {
      role: "hero",
      src: "/images/journeys/abc-short/hero.jpg",
      alt: "Annapurna South on the left and the fluted spire of Machapuchare on the right, above the forested ridges of the Modi Khola valley, with a scatter of village roofs on the near hillside",
      place: "Above the Modi Khola valley, Annapurna",
      // Month not supplied with the frame. Not guessed from the vegetation.
      month: PENDING,
      year: PENDING,
      width: 1672,
      height: 941,
    },
  ],

  faqs: [
    ...ANNAPURNA_FAQS,
    {
      question: "Which day is hardest?",
      answer:
        "Day 5 — the sunrise push to Base Camp and the long descent after it.",
    },
    {
      question: "Can we do it in fewer days?",
      answer:
        "Not safely. Five trekking days is already compressed; fewer means removing acclimatisation.",
    },
    {
      question: "Can we add Poon Hill?",
      answer:
        "Yes — that is the Ghorepani version, three days longer.",
    },
  ],

  seo: {
    title:
      "Annapurna Base Camp Trek (Short) — 7 Days from Pokhara | Indicative Cost for Indians",
    description:
      "A 7-day Annapurna Base Camp trek from Pokhara for Indian travellers. Real walking hours, real altitudes, SAARC permit rates, and the cost broken down line by line.",
    keywords: [
      "annapurna base camp trek from india",
      "ABC trek cost for indian citizens",
      "ABC short trek 7 days",
      "annapurna base camp package pokhara",
      "ABC trek for group",
      "nepal trek saarc permit",
    ],
  },

  status: "draft",
  lastVerified: "2026-07-31",
};
