import { npr, PENDING, type Journey } from "@/lib/schema";

/**
 * Manaslu Circuit — the partner's own operated route.
 *
 * The itinerary below is packages.md's record of the actual route Adventure
 * Walk Way runs, marked [VERIFIED partner data] there and reproduced without
 * modification. Altitudes come with it; walking hours do not, except where the
 * document states them.
 *
 * NOT founder-walked. Restricted-area expedition, a different buyer from the
 * five-to-ten-day treks, and it ships `draft` until photography exists.
 */
export const manaslu: Journey = {
  slug: "manaslu-circuit",
  name: "Manaslu Circuit",
  subtitle:
    "Twelve days around the eighth-highest mountain, over a 5,110m pass.",
  region: "Manaslu (restricted area)",
  startCity: "Kathmandu",
  endCity: "Kathmandu",
  days: 12,
  nights: PENDING,
  trekDays: 10,
  maxAltitudeM: 5110,

  voice: "partner",
  difficulty: 4,
  difficultyNote:
    "Demanding. A 5,110m pass, an 8–9 hour crossing day, twelve consecutive days and remote terrain. Not a first Himalayan trek.",

  bestMonths: ["September", "October", "November", "March", "April", "May"],

  permits: [
    {
      name: "Manaslu RAP",
      fullName: "Manaslu restricted-area permit",
      costSAARC: npr(13800),
      costForeign: npr(13800),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "USD 100 per week September–November, USD 75 December–August, then daily. The same rate for all nationalities — the SAARC discount does not apply here. Issued only through a registered agency.",
    },
    {
      name: "Manaslu MCAP",
      fullName: "Manaslu Conservation Area permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
    },
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area permit",
      costSAARC: npr(1000),
      costForeign: npr(3000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "The circuit crosses into the Annapurna area after the Larke Pass.",
    },
    {
      name: "Chumnubri",
      fullName: "Chumnubri rural municipality fee",
      costSAARC: npr(1000),
      costForeign: npr(1000),
      status: "verified",
      lastVerified: "2026-07-28",
      note: "Paid on the trail near Jagat.",
    },
  ],

  itinerary: [
    { day: 1, title: "Kathmandu → Machha Khola", from: "Kathmandu", to: "Machha Khola", sleepAltitudeM: PENDING, walkingHours: null, transport: "bus", terrain: "Seven to eight hours by bus.", honestNote: "A long road day at the start, on a road that is rough for much of it." },
    { day: 2, title: "Machha Khola → Jagat", from: "Machha Khola", to: "Jagat", sleepAltitudeM: 1410, walkingHours: [6, 7], honestNote: "The Budhi Gandaki gorge, following the river upstream. The municipality fee is paid here." },
    { day: 3, title: "Jagat → Dyang", from: "Jagat", to: "Dyang", sleepAltitudeM: 1800, walkingHours: [5, 6], honestNote: "Still low, still in the gorge. The altitude comes later." },
    { day: 4, title: "Dyang → Namrung", from: "Dyang", to: "Namrung", sleepAltitudeM: 2650, walkingHours: [5, 6], honestNote: "The valley opens and the architecture starts changing to Tibetan-influenced." },
    { day: 5, title: "Namrung → Lo Village", from: "Namrung", to: "Lo Village", sleepAltitudeM: 3180, walkingHours: [5, 5], honestNote: "Manaslu itself comes into view. Above 3,000m now, and it is felt." },
    { day: 6, title: "Lo Village → Samagaun", from: "Lo Village", to: "Samagaun", sleepAltitudeM: 3260, walkingHours: [4, 5], honestNote: "A short day on purpose. Samagaun is where the acclimatisation happens." },
    { day: 7, title: "Acclimatisation day at Samagaun", to: "Samagaun", sleepAltitudeM: 3260, walkingHours: PENDING, honestNote: "Birendra Lake, or simply resting. This day is not optional — it is what makes the pass survivable." },
    { day: 8, title: "Samagaun → Samdo", from: "Samagaun", to: "Samdo", sleepAltitudeM: 3500, walkingHours: PENDING, honestNote: "A short, steady climb. The last real village before the pass." },
    { day: 9, title: "Samdo → Dharamsala", from: "Samdo", to: "Dharamsala", sleepAltitudeM: 4430, walkingHours: PENDING, honestNote: "Dharamsala is a staging post, not a village. Basic, cold, and a poor night's sleep at 4,430m." },
    { day: 10, title: "Cross the Larke Pass to Bimthang", from: "Dharamsala", to: "Bimthang", sleepAltitudeM: PENDING, highPointM: 5110, walkingHours: [8, 9], isHardestDay: true, bleed: { role: "sunrise", line: "Larke Pass, 5,110m.", sub: "Eight to nine hours, and the crux of the circuit." }, honestNote: "The hardest day by a wide margin. An early start, a long climb to 5,110m, and a long descent after it. Cold and exposed at the top." },
    { day: 11, title: "Bimthang → Dharapani", from: "Bimthang", to: "Dharapani", sleepAltitudeM: PENDING, walkingHours: [6, 6], honestNote: "Down through forest and out of the high country. The knees know about it." },
    { day: 12, title: "Dharapani → Besisahar → Kathmandu", from: "Dharapani", to: "Kathmandu", sleepAltitudeM: PENDING, walkingHours: null, transport: "jeep", honestNote: "Shared jeep to Besisahar, then on to Kathmandu or Pokhara. A long travel day to finish." },
  ],

  honestParagraph:
    "Twelve days circling Manaslu, the eighth-highest mountain in the world, and crossing the Larke Pass at 5,110m. This is our partner's own operated route and the itinerary here is theirs, unmodified. It is a restricted-area expedition rather than a trek — a different commitment from our Annapurna routes, for people who have already spent nights above 4,000m. We have not walked it ourselves and we will not pretend otherwise.",

  honestNotes: [
    "This is not a first Himalayan trek. You should have slept above 4,000m before.",
    "Day 10 over the Larke Pass is eight to nine hours, cold and exposed, and there is no shortening it.",
    "Dharamsala at 4,430m is a staging post rather than a village. Expect basic shelter and a poor night's sleep.",
    "Rescue is genuinely remote here. Evacuation insurance matters more on this route than any other we run.",
    "Restricted-area permits alone add roughly USD 215 per person in autumn, before anything else.",
  ],

  notForYou: [
    "This is your first trek at altitude.",
    "You have not spent nights above 4,000m.",
    "You cannot commit to twelve consecutive walking days.",
    "You want the option to bail out easily — on much of this route, there is not one.",
  ],

  failureScenarios: [
    {
      trigger: "Early snow closes the Larke Pass.",
      likelihood: "A real risk at the edges of both seasons.",
      whatWeDo: "The guide calls it at Dharamsala. There is no way around the pass, so the group turns and retraces the valley.",
      whoPays: "TODO — the disruption policy has not yet been agreed with the partner.",
    },
    {
      trigger: "Altitude symptoms above Samagaun.",
      likelihood: "Present on every high pass route. The acclimatisation day at Samagaun exists to reduce it.",
      whatWeDo: "Descend immediately with the guide. Descent is the treatment.",
      whoPays: "Your insurance covers evacuation. Costs arising from an early descent are not refundable.",
    },
  ],

  included: [
    "Bus transport, shared local jeep and Pokhara transport",
    "All meals on trek — breakfast, lunch and dinner",
    "Trek accommodation",
    "All permits — RAP, MCAP, ACAP and the municipality fee",
    "Licensed guide throughout, and guide insurance",
  ],

  excluded: [
    "Tea, coffee, mineral water, soft drinks and alcohol",
    "Snacks, fruit and desserts",
    "Hot showers and wifi",
    "Donations",
    "International flights and travel insurance",
  ],

  price: {
    min: npr(128000),
    max: npr(176000),
    variables: [
      "Group size — the per-person cost falls as the group grows.",
      "Season — restricted-area permit fees are higher September to November.",
      "Final quote depends on season, group size and operations.",
    ],
    groupTiers: [
      { groupSize: 2, perPerson: npr(144000), perPersonMax: npr(176000), status: "indicative" },
      { groupSize: 4, perPerson: npr(128000), perPersonMax: npr(152000), status: "indicative" },
    ],
    status: "indicative",
  },

  foreignPrice: { fromUSD: 1300, toUSD: 1700, status: "indicative" },
  costBreakdown: [],
  guide: { slug: "guide-one" },
  images: [],

  faqs: [
    { question: "Can I walk Manaslu solo?", answer: "Since March 2026, yes — with a licensed guide through a registered agency. The old two-person minimum was removed." },
    { question: "Do I need a TIMS card?", answer: "No. The restricted-area permit replaces it." },
    { question: "Do Indian nationals pay less?", answer: "For MCAP and ACAP, yes — the SAARC rate. The restricted-area permit is the same for every nationality." },
    { question: "What is the hardest day?", answer: "Day 10, crossing the Larke Pass at 5,110m. Eight to nine hours." },
  ],

  seo: {
    title: "Manaslu Circuit Trek — 12 Days over the Larke Pass | Opening Soon",
    description:
      "The 12-day Manaslu Circuit over the 5,110m Larke Pass. Restricted-area permits, the partner's real itinerary, real altitudes. A serious expedition.",
    keywords: ["manaslu circuit trek", "manaslu larke pass", "manaslu restricted permit cost", "manaslu solo trek"],
  },

  status: "draft",
  lastVerified: "2026-07-31",
};
