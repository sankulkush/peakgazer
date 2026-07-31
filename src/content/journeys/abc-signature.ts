import { npr, PENDING, type Journey } from "@/lib/schema";
import { ANNAPURNA_FAQS } from "./shared";

/**
 * Sources: the founder's Signature Journey spec, and packages.md for the
 * partner's premium package (₹39,000, 8N/9D, hotels and transfers included)
 * and the ACAP permit rates.
 *
 * WHAT IS PENDING, and why it is not filled in:
 *
 * - Per-day walking hours and elevation gain. The documented hours belong to
 *   the 7-day Pokhara→Pokhara version; this itinerary stages differently
 *   (Ghandruk, Sinuwa, Himalaya, Jhinu are new overnights), so carrying those
 *   numbers across would be a guess wearing a source's clothes.
 * - Sleep altitudes for Ghandruk, Sinuwa, Himalaya and Jhinu. Not in any
 *   document available. Chhomrong, Dovan, MBC, ABC and Pokhara are documented
 *   and appear as real figures.
 * - Night count. The spec asks for confirmation of whether departure is day 10
 *   or 11.
 * - Guide details and the no-commission evacuation clause.
 *
 * Every one renders as "to be confirmed" rather than a number.
 */
export const abcSignature: Journey = {
  slug: "annapurna-base-camp-signature",
  name: "Annapurna Base Camp Signature Journey",
  subtitle:
    "Ten days in Nepal. The Annapurna Sanctuary at the centre, and everything around it planned.",
  region: "Annapurna (ACAP)",
  startCity: "Kathmandu",
  endCity: "Kathmandu",
  days: 10,
  nights: PENDING,
  trekDays: 5,
  maxAltitudeM: 4130,

  voice: "partner",
  difficulty: 3,
  difficultyNote:
    "Moderate to demanding. Five walking days, two of them long, with steep stone-step sections and a fast gain to 4,130m. No technical ground.",

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
      title: "Arrive Kathmandu",
      to: "Kathmandu",
      sleepAltitudeM: PENDING,
      walkingHours: null,
      stay: "Kathmandu hotel",
      terrain:
        "Met at the airport, private transfer to the hotel, welcome drink. Our team assists with your luggage and check-in.",
      honestNote:
        "Nothing is scheduled after the transfer. Recover from the flight, or walk Thamel if you have the energy for it.",
    },
    {
      day: 2,
      title: "Kathmandu → Pokhara",
      from: "Kathmandu",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: null,
      transport: "bus",
      stay: "Pokhara hotel",
      terrain: "The highway west, then an evening free by Phewa Lake.",
      honestNote:
        "A long road day and the least interesting part of the trip. The lakeside in the evening makes up for it.",
    },
    {
      day: 3,
      title: "Pokhara → Ghandruk, the walking starts",
      from: "Pokhara",
      to: "Ghandruk",
      sleepAltitudeM: PENDING,
      walkingHours: PENDING,
      transport: "jeep",
      image: "trailValley",
      honestNote:
        "The drive climbs out of the valley and the mountains appear properly for the first time. A short walking day to settle in.",
    },
    {
      day: 4,
      title: "Ghandruk → Chhomrong",
      from: "Ghandruk",
      to: "Chhomrong",
      sleepAltitudeM: 2170,
      walkingHours: PENDING,
      image: "trailSteps",
      honestNote:
        "The stone steps before Chhomrong surprise first-timers — there are a great many of them and they come at the end of the day. Chhomrong is the last proper village before the sanctuary.",
    },
    {
      day: 5,
      title: "Chhomrong → Sinuwa → Bamboo → Dovan",
      from: "Chhomrong",
      to: "Dovan",
      sleepAltitudeM: 2600,
      walkingHours: PENDING,
      image: "trailForest",
      honestNote:
        "Down to the river, up the far side to Sinuwa, then into bamboo forest. There is a waterfall and a small Hanuman temple on the way to Dovan. The steps punish the knees more than the lungs.",
    },
    {
      day: 6,
      title: "Dovan → Himalaya → Machhapuchhre Base Camp",
      from: "Dovan",
      to: "Machhapuchhre Base Camp",
      sleepAltitudeM: 3700,
      walkingHours: PENDING,
      honestNote:
        "The valley narrows and the walls close in. Altitude starts to tell here and the guide watches for it. Cold once the sun goes off the walls.",
    },
    {
      day: 7,
      title: "MBC → Annapurna Base Camp for sunrise",
      from: "Machhapuchhre Base Camp",
      to: "Annapurna Base Camp",
      sleepAltitudeM: 4130,
      walkingHours: PENDING,
      isHardestDay: true,
      bleed: {
        role: "sunrise",
        line: "First light reaches the wall before it reaches you.",
        sub: "Annapurna Base Camp, 4,130m.",
      },
      honestNote:
        "The hardest day, and the one people remember. You are inside the amphitheatre with the wall of Annapurna around you. It is very cold before the sun arrives.",
    },
    {
      day: 8,
      title: "Descend to Jhinu Danda and the hot spring",
      from: "Annapurna Base Camp",
      to: "Jhinu Danda",
      sleepAltitudeM: PENDING,
      walkingHours: PENDING,
      bleed: {
        role: "jhinu",
        line: "After days on the trail, the river pools at Jhinu.",
        sub: "This is where the trek lets go.",
      },
      honestNote:
        "A long descent on tired knees, and then the river pools at Jhinu. This is where the trek lets go. Twenty minutes down from the lodges, and worth every one of them.",
    },
    {
      day: 9,
      title: "Jhinu Danda → Pokhara",
      from: "Jhinu Danda",
      to: "Pokhara",
      sleepAltitudeM: 822,
      walkingHours: PENDING,
      transport: "jeep",
      stay: "Pokhara hotel",
      honestNote:
        "A short walk out to the road, then the jeep. The evening is free — this is where most people add something.",
    },
    {
      day: 10,
      title: "Pokhara → Kathmandu, and home",
      from: "Pokhara",
      to: "Kathmandu",
      sleepAltitudeM: PENDING,
      walkingHours: null,
      transport: "bus",
      honestNote:
        "Time for shopping in Thamel before the airport. We see you off as well as we welcomed you.",
    },
  ],

  honestParagraph:
    "Ten days in Nepal with the Annapurna Sanctuary at the centre and everything around it planned. You are met at the airport, driven to Pokhara, walked to Base Camp at 4,130m over five days, soaked in the hot spring at Jhinu on the way down, and put back on your flight without a scramble. Five of the ten days are walking and two of those are genuinely hard — the stone steps below Chhomrong and the morning at Base Camp. The rest is a country you came a long way to see, and time to see it in. If you want only the trek and nothing around it, this is more trip than you need.",

  honestNotes: [
    "Day 7 is long and hard: the push to Base Camp and a very cold hour before sunrise.",
    "The stone steps before Chhomrong surprise first-timers. They come at the end of the day, when you are already tired.",
    "Lodges above Chhomrong are basic. Rooms are unheated and the food is repetitive.",
    "No hot shower above Chhomrong without paying, and often not then. Jhinu on day 8 is the first proper wash in days.",
    "In October the trail is busy. You will not have the sanctuary to yourself.",
    "Two of the ten days are spent largely in a vehicle on the Kathmandu–Pokhara road.",
  ],

  notForYou: [
    "You cannot walk 6 hours on consecutive days.",
    "You have uncontrolled heart or lung conditions.",
    "You need a heated room and a hot shower every night.",
    "You want only the trek — the days in Kathmandu and Pokhara are half of what you are paying for.",
    "You want solitude in peak October. This is a popular route.",
  ],

  failureScenarios: [
    {
      trigger: "Altitude symptoms at MBC (3,700m) or on the morning at Base Camp.",
      likelihood:
        "The most common operational issue on this route. The gain from 822m to 4,130m across four walking days is moderately fast.",
      whatWeDo:
        "The guide monitors daily and calls the turnaround. Descent begins immediately; descent is the treatment.",
      whoPays:
        "Your insurance covers evacuation. Costs arising from an early descent are not refundable.",
    },
    {
      trigger: "Lodge overcrowding above Chhomrong in peak October.",
      likelihood: "A known pressure point in the first half of October.",
      whatWeDo:
        "We book ahead. Where beds cannot be held, the guide restages the day to a lodge that can take the group.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner.",
    },
    {
      trigger: "Snow or weather closes the sanctuary approach above Deurali.",
      likelihood: "Occasional in late November and March.",
      whatWeDo:
        "The guide calls it below the avalanche-prone section. We wait a day where the schedule allows, or turn at MBC.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner.",
    },
  ],

  included: [
    "Airport reception and private transfer on arrival",
    "Departure transfer, with assistance at check-in",
    "Hotel nights in Kathmandu and Pokhara — number to be confirmed with our partner",
    "Kathmandu ⇄ Pokhara road transport",
    "All trek transport, including the jeep to and from the trailhead",
    "Licensed guide throughout, and guide insurance",
    "Porter, one per two trekkers, shared load",
    "All permits (ACAP)",
    "Teahouse accommodation on trek, twin sharing",
    "All meals on trek — breakfast, lunch and dinner",
  ],

  excluded: [
    "International flights",
    "Travel insurance with helicopter evacuation cover — mandatory, verified before departure",
    "Nepal visa — not required for Indian nationals",
    "Lunches and dinners in Kathmandu and Pokhara",
    "Personal equipment",
    "Hot showers, wifi, device charging",
    "Bottled or boiled water, drinks and snacks",
    "Tips and donations",
    "Costs arising from early descent, weather delay or route change",
  ],

  addOns: [
    { label: "An extra night in Pokhara or Kathmandu", note: "Priced on confirmation with the hotel.", availability: "on request" },
    { label: "A higher hotel category", note: "Both city stays can be upgraded. Difference quoted before you pay.", availability: "on request" },
    { label: "Sarangkot for sunrise", note: "An early start from Pokhara, back for breakfast.", availability: "on request" },
    { label: "Paragliding over Phewa", note: "Weather-dependent and operator-run. We book it, we do not fly it.", availability: "on request" },
    { label: "Boating on Phewa Lake", note: "An hour on the water on the free evening.", availability: "on request" },
    { label: "A massage in Pokhara", note: "After day 9, which is when people want it.", availability: "on request" },
    { label: "Private vehicle instead of shared", note: "For the Kathmandu–Pokhara legs.", availability: "on request" },
    { label: "Chitwan, added on the end", note: "A road-based extension, quoted separately.", availability: "on request" },
  ],

  safety: {
    altitudeProtocol:
      "Daily health checks from Dovan upward. Written turnaround criteria the guide applies, not the customer. Descent is the treatment and it begins immediately.",
    evacuationPolicy:
      "Helicopter evacuation is arranged through your insurer when descent is not viable. Your policy must carry evacuation cover to 4,500m and we verify it before departure.",
    weatherPolicy:
      "The guide reroutes or waits. Where a day is lost, the schedule absorbs it if it can. What it costs and who bears it is set by the disruption policy, which is not yet agreed with our partner.",
    noCommission: "commitment",
  },

  // Indicative. Partner cost ₹39,000 [VERIFIED] is likely the 2-person rate —
  // the cost curve by group size has not been supplied, so the tiers around it
  // are estimates and flagged as such.
  // ₹49,000 at 8 · ₹53,000 at 4 · ₹58,000 at 2 · ₹72,000 solo.
  price: {
    min: npr(78400),
    max: npr(115200),
    variables: [
      "Group size — the per-person cost falls sharply from solo to eight travellers.",
      "Season — October and April hotel and lodge rates run higher than March.",
      "Hotel category in Kathmandu and Pokhara.",
      "Nationality — Indian nationals pay the SAARC permit rate, a third of the foreign fee.",
      "Final quote depends on season, group size and operations.",
    ],
    groupTiers: [
      { groupSize: "solo", perPerson: npr(115200), status: "indicative" },
      { groupSize: 2, perPerson: npr(92800), status: "indicative" },
      { groupSize: 4, perPerson: npr(84800), status: "indicative" },
      { groupSize: 8, perPerson: npr(78400), status: "indicative" },
    ],
    status: "indicative",
  },

  foreignPrice: { fromUSD: 900, toUSD: 1150, status: "indicative" },

  costBreakdown: [
    { label: "Partner operating cost — full 10 days, hotels and transfers included", amount: npr(62400), status: "verified", note: "₹39,000. The one figure confirmed with our partner." },
    { label: "ACAP permit (SAARC rate)", amount: npr(1000), status: "verified" },
    { label: "Our margin", amount: npr(16000), status: "indicative", note: "What the planning, the replies and the arranging cost us." },
  ],

  guide: { slug: "guide-one" },
  images: [],

  faqs: [
    ...ANNAPURNA_FAQS,
    { question: "Which day is hardest?", answer: "Day 7 — the morning at Base Camp, after four days of walking to reach it." },
    { question: "Why is this more than a ₹28,000 trek-only package?", answer: "Those prices are the walking and nothing else. This includes the airport reception, both city hotel stays, all road transport and the departure. The breakdown on this page shows where every rupee goes." },
    { question: "Can I do only the trek?", answer: "Then this is more trip than you need, and we would rather tell you that than sell it to you." },
  ],

  seo: {
    title:
      "Annapurna Base Camp Signature Journey — 10 Days in Nepal | Indicative Cost for Indians",
    description:
      "Ten days in Nepal with the Annapurna Sanctuary at the centre: airport reception, Pokhara, five walking days to 4,130m, the hot spring at Jhinu, and a smooth departure. Real hours, real altitudes, cost broken down.",
    keywords: [
      "annapurna base camp trek from india",
      "ABC trek cost for indian citizens",
      "annapurna base camp package with hotels",
      "nepal 10 day trip annapurna",
      "annapurna base camp for group booking",
      "nepal trek saarc permit",
    ],
  },

  status: "draft",
  lastVerified: "2026-07-31",
};
