import { npr, type Journey } from "@/lib/schema";
import {
  ANNAPURNA_EXCLUDED,
  ANNAPURNA_FAQS,
  ANNAPURNA_INCLUDED,
} from "./shared";

/**
 * Source: packages.md, "JOURNEY 2 — ANNAPURNA BASE CAMP + GHOREPANI POON HILL".
 *
 * The document leaves a 9-day-vs-10-day decision open: a competitor sells this
 * as 9 days, but 10 is the honest length — 9 compresses either Poon Hill or the
 * sanctuary approach. CLAUDE.md settles it at 10 days / 8 trekking days.
 *
 * Prices are the document's indicative INR figures, stored in NPR (× 1.6).
 */
export const abcGhorepani: Journey = {
  slug: "annapurna-base-camp-ghorepani",
  name: "Annapurna Base Camp via Ghorepani & Poon Hill",
  subtitle:
    "Ten days, eight of them walking. Poon Hill at dawn, then into the sanctuary.",
  region: "Annapurna (ACAP)",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: 10,
  nights: 9,
  trekDays: 8,
  maxAltitudeM: 4130,

  optionalHighPoint: {
    name: "Poon Hill",
    altitudeM: 3210,
    condition:
      "Reached at dawn on day 4 as part of the standard route. Weather decides whether the panorama appears.",
  },

  voice: "partner",
  difficulty: 3,
  difficultyNote:
    "Moderate to demanding. The same peak difficulty as the short version, spread over more days — but eight consecutive walking days instead of five.",

  bestMonths: ["October", "November", "March", "April"],

  permits: [
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area Project permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "Covers both the Ghorepani loop and the sanctuary. Children under 10 free.",
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
      title: "Drive to Nayapul, trek to Ulleri",
      from: "Pokhara",
      to: "Ulleri",
      sleepAltitudeM: 2050,
      walkingHours: [4, 5],
      transport: "jeep",
      honestNote:
        "A stiff climb of stone steps to Ulleri to finish — a tough afternoon.",
    },
    {
      day: 3,
      title: "Ulleri → Ghorepani",
      from: "Ulleri",
      to: "Ghorepani",
      sleepAltitudeM: 2870,
      walkingHours: [5, 6],
      terrain: "Rhododendron forest.",
      honestNote: "Through rhododendron forest; gentler than day 2.",
    },
    {
      day: 4,
      title: "Poon Hill sunrise, descend and trek to Tadapani",
      from: "Ghorepani",
      to: "Tadapani",
      sleepAltitudeM: 2630,
      highPointM: 3210,
      walkingHours: [6, 7],
      honestNote:
        "A pre-dawn climb for the panorama, then a long day on to Tadapani. In October there will be several hundred people on the hilltop with you.",
    },
    {
      day: 5,
      title: "Tadapani → Chhomrong",
      from: "Tadapani",
      to: "Chhomrong",
      sleepAltitudeM: 2170,
      walkingHours: [5, 6],
      honestNote:
        "Down into the Kimrong valley and up the other side to Chhomrong.",
    },
    {
      day: 6,
      title: "Chhomrong → Dovan",
      from: "Chhomrong",
      to: "Dovan",
      sleepAltitudeM: 2600,
      walkingHours: [5, 6],
      honestNote:
        "The stone-step day, and into the sanctuary approach. Harder on the knees than the lungs.",
    },
    {
      day: 7,
      title: "Dovan → Machhapuchhre Base Camp",
      from: "Dovan",
      to: "Machhapuchhre Base Camp",
      sleepAltitudeM: 3700,
      walkingHours: [5, 6],
      honestNote:
        "The valley narrows and altitude begins to tell. The guide watches for it.",
    },
    {
      day: 8,
      title: "MBC → Annapurna Base Camp, descend to Bamboo",
      from: "Machhapuchhre Base Camp",
      to: "Bamboo",
      sleepAltitudeM: 2310,
      highPointM: 4130,
      walkingHours: [7, 8],
      honestNote:
        "The hardest day. Sunrise at Base Camp, then a long descent. The same big day as the short version's day 5.",
      isHardestDay: true,
    },
    {
      day: 9,
      title: "Bamboo → Jhinu Danda, jeep to Pokhara",
      from: "Bamboo",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: [4, 5],
      transport: "jeep",
      honestNote: "Hot springs at Jhinu, then the jeep back.",
    },
    {
      day: 10,
      title: "Pokhara — depart",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      honestNote: "The trip ends after breakfast.",
    },
  ],

  honestParagraph:
    "The fuller Annapurna route. Poon Hill at 3,210m gives the classic panoramic sunrise, then the trail works through Tadapani and Chhomrong into the sanctuary to Base Camp at 4,130m. More rhododendron forest, more villages, more variety of terrain than the short version — and three more days on your feet. The extra days also acclimatise you better.",

  honestNotes: [
    "Poon Hill at sunrise is crowded in October — several hundred people on a small hilltop. We say so in advance because people who are surprised by it leave disappointed.",
    "Three more trekking days than the short version. This is a real step up in commitment, not a small extension.",
    "Day 8 to Base Camp is the same hard day as the short version's day 5.",
    "Lodges above Chhomrong are basic, rooms unheated, food repetitive.",
    "It costs roughly 50–60% more than the short version, not 20% — three more guide days, porter days, lodge nights and meals.",
  ],

  notForYou: [
    "You cannot walk 6 hours on consecutive days.",
    "You do not have the time or the fitness for eight consecutive walking days.",
    "You have uncontrolled heart or lung conditions.",
    "You need a heated room and a hot shower every night.",
    "You want a quiet sunrise — Poon Hill in October is not that.",
  ],

  failureScenarios: [
    {
      trigger: "Altitude symptoms at MBC (3,700m) or on the day-8 push.",
      likelihood:
        "Less common than on the short version — the extra days acclimatise you better — but present.",
      whatWeDo:
        "The guide monitors daily and calls the turnaround. Descent begins immediately; descent is the treatment.",
      whoPays:
        "Your insurance covers evacuation. Costs arising from an early descent are not refundable.",
    },
    {
      trigger: "Ghorepani lodge pressure in peak October.",
      likelihood:
        "Acute. Poon Hill is one of the busiest points in the Annapurna region in the first half of October.",
      whatWeDo:
        "We book Ghorepani early. Where beds cannot be held, the guide stages the group at Banthanti and starts the Poon Hill climb earlier.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner. Do not publish this line until it has.",
    },
    {
      trigger: "Cloud closes the Poon Hill panorama at dawn.",
      likelihood:
        "Common enough to plan for, particularly in March when the air is hazier.",
      whatWeDo:
        "Nothing can be done about weather. The climb still happens; the view may not.",
      whoPays:
        "No refund — the day, the permit and the guide were used. We would rather say this plainly than let you expect a guarantee.",
    },
  ],

  included: ANNAPURNA_INCLUDED,
  excluded: ANNAPURNA_EXCLUDED,

  // Indicative sell prices from packages.md, converted INR → NPR at 1.6.
  // ₹58–62k solo · ₹52–55k at 2 · ₹46–49k at 4 · ₹42–44k at 8.
  price: {
    min: npr(67200),
    max: npr(99200),
    variables: [
      "Group size — the per-person cost falls sharply from solo to eight walkers.",
      "Season — October and April lodge rates run higher than March.",
      "Nationality — Indian nationals pay the SAARC permit rate.",
      "Whether you take a private jeep, a private guide or an unshared porter.",
    ],
    groupTiers: [
      { groupSize: "solo", perPerson: npr(92800), perPersonMax: npr(99200), status: "indicative" },
      { groupSize: 2, perPerson: npr(83200), perPersonMax: npr(88000), status: "indicative" },
      { groupSize: 4, perPerson: npr(73600), perPersonMax: npr(78400), status: "indicative" },
      { groupSize: 8, perPerson: npr(67200), perPersonMax: npr(70400), status: "indicative" },
    ],
    status: "indicative",
  },

  // TODO: shape only. The partner's per-head operating cost is not yet known.
  costBreakdown: [
    { label: "ACAP permit (SAARC rate)", amount: npr(1000), status: "indicative" },
    { label: "Licensed guide — 8 trek days", amount: npr(24000), status: "indicative" },
    { label: "Porter — 8 trek days, one per two trekkers", amount: npr(16000), status: "indicative" },
    { label: "Teahouse beds — 8 nights", amount: npr(12000), status: "indicative" },
    { label: "Kathmandu and Pokhara hotel — 4 nights", amount: npr(12000), status: "indicative" },
    { label: "All trek meals", amount: npr(17600), status: "indicative" },
    { label: "Jeep transfers, Pokhara ⇄ trailheads", amount: npr(6000), status: "indicative" },
    { label: "Guide insurance", amount: npr(1500), status: "indicative" },
    { label: "Contingency — spare day, alternative routing", amount: npr(3500), status: "indicative" },
  ],

  guide: { slug: "guide-one" },
  images: [],

  faqs: [
    ...ANNAPURNA_FAQS,
    {
      question: "Which day is hardest?",
      answer:
        "Day 8 — the sunrise push to Base Camp and the long descent after it.",
    },
    {
      question: "How is this different from the short version?",
      answer:
        "It adds the Ghorepani–Poon Hill loop: three extra days, a famous sunrise, and more forest and villages.",
    },
    {
      question: "Is Poon Hill worth the extra days?",
      answer:
        "For the sunrise panorama and the gentler build-up, yes. But it is crowded in peak season, and we would rather you knew that first.",
    },
    {
      question: "Which should I pick, short or Ghorepani?",
      answer:
        "Short if time is tight and you want Base Camp efficiently. Ghorepani if you want the fuller trek and better acclimatisation.",
    },
  ],

  seo: {
    title:
      "Annapurna Base Camp + Poon Hill Trek — 10 Days from Pokhara | Indicative Cost",
    description:
      "The full Annapurna Base Camp trek with the Ghorepani–Poon Hill sunrise, 10 days from Pokhara. Real hours, real altitudes, SAARC rates, cost broken down.",
    keywords: [
      "annapurna base camp poon hill trek",
      "ABC ghorepani package",
      "poon hill trek from india",
      "annapurna 10 day trek cost",
      "ghorepani poon hill saarc",
    ],
  },

  status: "published",
  lastVerified: "2026-07-31",
};
