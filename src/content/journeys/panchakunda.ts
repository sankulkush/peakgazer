import { npr, PENDING, type Journey, type JourneyImage } from "@/lib/schema";

/**
 * Panchakunda & North Annapurna Base Camp — a real route we run, published.
 *
 * The day-by-day, the altitudes and the highest point are supplied and verified
 * by the founder. They are transcribed exactly and must not be altered.
 *
 * Voice is agency, second person: the page is about the trek and what the
 * traveller gets, not a founder's account of walking it. The founder-walked
 * fact still stands and is stated as a fact by the voice badge — it just does
 * not narrate the page.
 *
 * STILL PENDING (rendering as "to be confirmed", never guessed):
 * - Tatopani's altitude, and which Tatopani (Myagdi/Beni side).
 * - Per-day walking hours and distances.
 * - The cost model. No partner rate for this route yet, so no tier table.
 *
 * SPELLING: "Sandi Kharka" is used throughout. The founder is to confirm it
 * against "Sadhi Kharka" — whichever is right, it must be one of them everywhere.
 *
 * PHOTOGRAPHY: the founder's own, October 2025. One source frame is still
 * excluded — an identifiable customer at a suspension bridge whose consent has
 * not been confirmed. The founder's own portrait was also held back and is now
 * published, on the homepage rather than here; its October 2025 caption comes
 * from this note.
 */

const P = "/images/journeys/panchakunda";

const images: JourneyImage[] = [
  { role: "hero", src: `${P}/hero.jpg`, alt: "The turquoise Panchakunda lake below the glaciated north face of Annapurna, with trekkers on the rocky shore at the right for scale", place: "Panchakunda", month: "October", year: 2025, width: 2560, height: 1707 },
  { role: "peak", src: `${P}/annapurna-i.jpg`, alt: "The snow-covered north face of Annapurna I rising behind a dark ridge", place: "Annapurna I, from the North Annapurna approach", month: "October", year: 2025, width: 2560, height: 2183 },
  { role: "lake", src: `${P}/panchakunda-lake-second.jpg`, alt: "A second view across the Panchakunda glacial lakes", place: "Panchakunda", month: "October", year: 2025, width: 2000, height: 1333 },
  { role: "trailhead", src: `${P}/humkhola-trailhead.jpg`, alt: "The roadhead at Humkhola where the walking begins", place: "Humkhola, 2,883m", month: "October", year: 2025, width: 1400, height: 1859 },
  { role: "waterfall", src: `${P}/phutphute-jharna.jpg`, alt: "Phutphute Jharna waterfall beside the trail", place: "Phutphute Jharna", month: "October", year: 2025, width: 1400, height: 2185 },
  { role: "bridge", src: `${P}/suspension-bridge.jpg`, alt: "A suspension bridge over the Miristi Khola", place: "Miristi Khola valley", month: "October", year: 2025, width: 1080, height: 1414 },
  { role: "avalanche", src: `${P}/avalanche.jpg`, alt: "An avalanche running down the flank of Annapurna", place: "Annapurna, from the trail", month: "October", year: 2025, width: 1400, height: 2100 },
  { role: "wildlife", src: `${P}/trail-dog.jpg`, alt: "A dog that followed the group along the trail", place: "Miristi Khola valley", month: "October", year: 2025, width: 1400, height: 2100 },
  { role: "trailValley", src: `${P}/valley-view.jpg`, alt: "The valley opening out beyond the trail", place: "Miristi Khola valley", month: "October", year: 2025, width: 1400, height: 2100 },
  { role: "ridge", src: `${P}/ridge.jpg`, alt: "A hillside on the approach to the lakes", place: "North Annapurna approach", month: "October", year: 2025, width: 1400, height: 2234 },
];

export const panchakunda: Journey = {
  slug: "panchakunda-north-abc",
  name: "Panchakunda & North Annapurna Base Camp",
  subtitle:
    "Five days to a cluster of glacial lakes at 4,050m, on the quiet side of the massif.",
  region: "Annapurna (ACAP) — Miristi Khola",
  startCity: "Pokhara",
  endCity: "Pokhara",
  days: 5,
  nights: 4,
  trekDays: 3,
  maxAltitudeM: 4190,

  optionalHighPoint: {
    name: "Panchakunda lakes",
    altitudeM: 4050,
    condition:
      "Where you sleep on night three. The base camp above is reached the following morning.",
  },

  voice: "founder",
  difficulty: 4,
  difficultyNote:
    "The crux is day 4: up to 4,190m, then nearly 1,000m of descent to Sandi Kharka.",

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

  itinerary: [
    {
      day: 1,
      title: "Pokhara → Tatopani",
      from: "Pokhara",
      to: "Tatopani",
      sleepAltitudeM: PENDING,
      walkingHours: null,
      transport: "jeep",
      terrain: "A road day. The walking begins tomorrow.",
      honestNote:
        "Nothing but the drive. Tatopani's altitude is still to be confirmed, and so is which Tatopani — there is more than one in Nepal.",
    },
    {
      day: 2,
      title: "Tatopani → Humkhola → Phutphute Jharna → Gupha Phat",
      from: "Tatopani",
      to: "Gupha Phat",
      sleepAltitudeM: 3350,
      walkingHours: PENDING,
      transport: "jeep",
      image: "trailhead",
      terrain:
        "Two hours by jeep to the Humkhola roadhead at 2,883m, where the trek starts. Past the Phutphute Jharna waterfall and on up to Gupha Phat.",
      honestNote:
        "One of the two long days. You gain nearly 500m to sleep at 3,350m, having started the morning in a vehicle.",
    },
    {
      day: 3,
      title: "Gupha Phat → Panchakunda",
      from: "Gupha Phat",
      to: "Panchakunda",
      sleepAltitudeM: 4050,
      walkingHours: PENDING,
      ascentM: 700,
      image: "waterfall",
      bleed: {
        role: "lake",
        line: "The lakes sit at 4,050m, directly under the north face.",
        sub: "You sleep here.",
      },
      honestNote:
        "A 700m gain to sleep at 4,050m. The ascent across these two days is fast and altitude affects people here — the guide sets the pace and watches for it.",
    },
    {
      day: 4,
      title:
        "Panchakunda → North Annapurna Base Camp → descend to Sandi Kharka",
      from: "Panchakunda",
      to: "Sandi Kharka",
      sleepAltitudeM: 3220,
      highPointM: 4190,
      walkingHours: PENDING,
      isHardestDay: true,
      image: "avalanche",
      bleed: {
        role: "peak",
        line: "The north face of Annapurna I, from the base camp at 4,190m.",
        sub: "The high point, and the morning the trek is for.",
      },
      honestNote:
        "The crux, and longer than most companies admit. An early climb to the base camp at 4,190m, then a descent of nearly 1,000m all the way to Sandi Kharka at 3,220m on tired legs. Trekking poles matter. Know this day is coming before you book.",
    },
    {
      day: 5,
      title: "Sandi Kharka → Tatopani → Pokhara",
      from: "Sandi Kharka",
      to: "Pokhara",
      sleepAltitudeM: PENDING,
      walkingHours: PENDING,
      transport: "jeep",
      image: "trailValley",
      honestNote:
        "Down to Tatopani and back on the road to Pokhara. The trek ends here.",
    },
  ],

  honestParagraph:
    "Remote, with a fast ascent and basic facilities: three walking days from the Humkhola roadhead at 2,883m to the lakes at 4,050m, and the base camp at 4,190m on the crux day. The quiet side of Annapurna, reached through the Miristi Khola — few other trekkers, and you're more likely to see blue sheep than another group. Rescue is further away here than on the popular trails.",

  honestNotes: [
    "Day 4 is the crux and it is longer than most companies admit: up to North Annapurna Base Camp at 4,190m, then a full descent to Sandi Kharka at 3,220m — nearly 1,000m down after the high point, on tired legs. Trekking poles matter. Know this day is coming before you book.",
    "Lodges are basic and sparse. This is not a teahouse trek in the Annapurna Base Camp sense.",
    "There is no dedicated acclimatisation day in the standard five-day plan. Ask about an extra night at Gupha Phat or Panchakunda if you want a gentler profile.",
  ],

  notForYou: [
    "You have never spent a night above 3,500m.",
    "You need lodges with hot showers and wifi — they mostly are not here.",
    "You want company on the trail. You likely will not have it.",
    "You are not comfortable being a long way from a road for several days.",
  ],

  failureScenarios: [
    {
      trigger: "Altitude symptoms at Panchakunda (4,050m) or on the day-4 climb.",
      likelihood:
        "A real risk on this profile. Sleeping altitude goes from 2,883m at the roadhead to 4,050m in two days, with no acclimatisation day built in.",
      whatWeDo:
        "The guide monitors daily and calls the turnaround. Descent begins immediately, and on this route the descent to Sandi Kharka is substantial.",
      whoPays:
        "Your insurance covers evacuation. Costs arising from an early descent are not refundable.",
    },
    {
      trigger: "Weather closes the approach above Gupha Phat.",
      likelihood: "Occasional at the edges of both seasons.",
      whatWeDo:
        "The guide turns the group. On a route this quiet and this remote, turning early is the normal call rather than the exceptional one.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner.",
    },
    {
      trigger: "A medical event a long way from the road.",
      likelihood:
        "Uncommon, but the consequence is heavier here than on the popular trails.",
      whatWeDo:
        "Descend with the guide where possible; helicopter evacuation through your insurer where it is not. We verify your policy carries evacuation cover before departure.",
      whoPays:
        "Your insurer. We take no commission on evacuation flights — being confirmed in writing with our partner.",
    },
  ],

  included: [
    "Pokhara ⇄ Tatopani road transport",
    "Jeep to and from the Humkhola roadhead",
    "Licensed guide throughout, and guide insurance",
    "ACAP permit",
    "Lodge accommodation on trek",
    "All meals on trek — breakfast, lunch and dinner",
  ],

  excluded: [
    "Travel to and from Nepal",
    "Travel insurance with helicopter evacuation cover — mandatory on this route, verified before departure",
    "Personal equipment, including trekking poles",
    "Hot showers, wifi and device charging where they exist at all",
    "Bottled or boiled water, drinks and snacks",
    "Tips and donations",
    "Costs arising from early descent, weather delay or route change",
  ],

  safety: {
    altitudeProtocol:
      "Daily checks from Gupha Phat upward. The gain to 4,050m across two days is fast and there is no acclimatisation day in the standard plan — ask for an extra night if you want a gentler profile. Turnaround is the guide's decision, applied against written criteria, and descent is the treatment.",
    evacuationPolicy:
      "Travel insurance carrying helicopter evacuation cover is mandatory on this route and we verify the policy before you fly. Evacuation is arranged through your insurer, and we take no commission on the flight.",
    weatherPolicy:
      "The guide reroutes or turns the group. What a lost day costs and who bears it is set by the disruption policy, which is not yet agreed with our partner.",
    noCommission: "commitment",
  },

  // No partner rate for this route yet. Rather than invent a tier table, the
  // page renders an honest "not costed yet" panel and a way to ask.
  price: {
    min: npr(0),
    max: npr(0),
    variables: [
      "Group size — the per-person cost falls sharply as the group grows.",
      "Whether you add an acclimatisation night at Gupha Phat or Panchakunda.",
      "Season — October and April rates run higher.",
      "Final quote depends on season, group size and operations.",
    ],
    groupTiers: [],
    status: "indicative",
  },

  costBreakdown: [],
  guide: { slug: "guide-one" },
  images,

  faqs: [
    {
      question: "How hard is this compared with Annapurna Base Camp?",
      answer:
        "Harder, and shorter. Three walking days rather than five, but a faster ascent, basic lodges, and a crux day that climbs to 4,190m and descends nearly 1,000m afterwards.",
    },
    {
      question: "Will we see other trekkers?",
      answer:
        "Rarely. Most days you will see nobody, which is the point of the route.",
    },
    {
      question: "Is there an acclimatisation day?",
      answer:
        "Not in the standard five-day plan. Ask for an extra night at Gupha Phat or Panchakunda and we will price it — the profile is noticeably gentler with one.",
    },
    {
      question: "What does it cost?",
      answer:
        "We have not costed this route with our partner yet, and we will not put a number on the page before we have. Message us and we will quote it for your group size and dates.",
    },
    {
      question: "Do Indian nationals need a visa?",
      answer: "No. Indian nationals enter Nepal without a visa.",
    },
    {
      question: "What permits are needed?",
      answer:
        "ACAP only. NPR 1,000 for Indian and SAARC nationals, NPR 3,000 for other foreign nationals.",
    },
  ],

  seo: {
    title:
      "Panchakunda & North Annapurna Base Camp — 5 Days from Pokhara | Indicative Cost",
    description:
      "Five days to the Panchakunda glacial lakes at 4,050m and North Annapurna Base Camp at 4,190m, through the Miristi Khola valley. Remote, hard, and rarely walked.",
    keywords: [
      "panchakunda trek",
      "north annapurna base camp trek",
      "miristi khola trek",
      "quiet annapurna trek from india",
      "panchakunda lake nepal",
    ],
  },

  status: "published",
  lastVerified: "2026-07-31",
};
