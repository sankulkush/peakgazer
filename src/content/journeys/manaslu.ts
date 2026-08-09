import { npr, PENDING, type Journey } from "@/lib/schema";
import { INSURANCE_EXCLUSION } from "./shared";

/**
 * Manaslu Circuit — operated by our partner, Adventure Walk Way.
 *
 * NOT walked by anyone here. Agency voice throughout, and the voice badge says
 * so plainly.
 *
 * ALTITUDES ARE THE PARTNER'S FIGURES and are rendered approximate. He operates
 * the route, so his numbers are primary — but four of them diverge from
 * published sources by 200–370m and we will not present a contested figure as
 * exact.
 *
 * TODO — confirm these four with the partner before final publish:
 *   Jagat     partner ~1,340m  (his sheet said 141m, an obvious typo)
 *   Dyang     partner ~1,800m  · published ~2,130m
 *   Samagaun  partner ~3,260m  · published ~3,530m
 *   Samdo     partner ~3,500m  · published ~3,875m
 * Larke Pass is ~5,106m here; the partner said 5,110m, published 5,106–5,160m.
 *
 * IMAGES: none yet. Every slot is a labelled placeholder naming the frame we
 * need and the shape it must be, so a real photograph drops in uncropped.
 */
export const manaslu: Journey = {
  slug: "manaslu-circuit",
  name: "Manaslu Circuit Trek",
  subtitle:
    "Twelve days around the eighth-highest mountain, over the Larke Pass at ~5,106m.",
  region: "Manaslu (restricted area) — Gorkha",
  startCity: "Kathmandu",
  endCity: "Kathmandu",
  days: 12,
  nights: 11,
  trekDays: 10,
  maxAltitudeM: 5106,

  voice: "partner",
  difficulty: 4,
  difficultyNote:
    "A restricted-area high-pass expedition. The crux is day 10: a pre-dawn start, the Larke Pass at ~5,106m, and eight to nine hours to Bimthang.",

  bestMonths: ["September", "October", "November", "March", "April", "May"],

  permits: [
    {
      name: "Manaslu RAP",
      fullName: "Manaslu restricted-area permit",
      costSAARC: npr(0),
      costForeign: npr(0),
      status: "verified",
      lastVerified: "2026-08-03",
      note: "Issued only through a registered agency. Since March 2026 solo travellers are allowed with a licensed guide; the old two-person minimum is gone.",
    },
    {
      name: "MCAP",
      fullName: "Manaslu Conservation Area permit",
      costSAARC: npr(0),
      costForeign: npr(0),
      status: "verified",
      lastVerified: "2026-08-03",
    },
    {
      name: "ACAP",
      fullName: "Annapurna Conservation Area permit",
      costSAARC: npr(0),
      costForeign: npr(0),
      status: "verified",
      lastVerified: "2026-08-03",
      note: "The circuit crosses into the Annapurna area after the Larke Pass.",
    },
    {
      name: "Chumnubri",
      fullName: "Chumnubri rural municipality fee",
      costSAARC: npr(0),
      costForeign: npr(0),
      status: "verified",
      lastVerified: "2026-08-03",
    },
  ],

  itinerary: [
    { day: 1, title: "Kathmandu → Machha Khola", from: "Kathmandu", to: "Machha Khola", sleepAltitudeM: 930, approxAltitude: true, walkingHours: null, transport: "bus", terrain: "Seven to eight hours by bus. Lodge on arrival.", honestNote: "A long road day to start, and rough for much of it. Nothing is asked of your legs today.", image: "trailValley" },
    { day: 2, title: "Machha Khola → Jagat", from: "Machha Khola", to: "Jagat", sleepAltitudeM: 1340, approxAltitude: true, walkingHours: [6, 7], honestNote: "Following the Budhi Gandaki upstream through the gorge. Low, warm and long.", image: "bridge" },
    { day: 3, title: "Jagat → Dyang", from: "Jagat", to: "Dyang", sleepAltitudeM: 1800, approxAltitude: true, walkingHours: [5, 6], honestNote: "Still in the gorge and still low. The altitude comes later; today is distance.", },
    { day: 4, title: "Dyang → Namrung", from: "Dyang", to: "Namrung", sleepAltitudeM: 2650, approxAltitude: true, walkingHours: [5, 6], honestNote: "The valley opens and the villages start turning Tibetan-Buddhist. Altitude symptoms most often begin around here — the guide starts watching pace." },
    { day: 5, title: "Namrung → Lho Village", from: "Namrung", to: "Lho Village", sleepAltitudeM: 3180, approxAltitude: true, walkingHours: [5, 5], honestNote: "Manaslu comes into view. Above 3,000m now, and most people feel it.", image: "teahouse" },
    { day: 6, title: "Lho Village → Samagaun", from: "Lho Village", to: "Samagaun", sleepAltitudeM: 3260, approxAltitude: true, walkingHours: [4, 5], honestNote: "A short day on purpose. Samagaun is where the acclimatisation happens and the schedule is built around it." },
    { day: 7, title: "Rest and acclimatisation at Samagaun", to: "Samagaun", sleepAltitudeM: 3260, approxAltitude: true, walkingHours: null, honestNote: "No trekking. Birendra Lake, the village, or simply resting. This day is not padding — it is what makes the pass survivable.", bleed: { role: "lake", line: "A rest day at Samagaun, and Birendra Lake below the glacier.", sub: "Nothing is scheduled. That is the point." } },
    { day: 8, title: "Samagaun → Samdo", from: "Samagaun", to: "Samdo", sleepAltitudeM: 3500, approxAltitude: true, walkingHours: PENDING, honestNote: "A short, steady climb to the last real village before the pass." },
    { day: 9, title: "Samdo → Dharamsala (Larke Phedi)", from: "Samdo", to: "Dharamsala", sleepAltitudeM: 4430, approxAltitude: true, walkingHours: PENDING, honestNote: "Dharamsala is a staging post rather than a village. Basic shelter, cold, and a poor night's sleep at ~4,430m before the longest day of the trek." },
    { day: 10, title: "Dharamsala → Larke Pass → Bimthang", from: "Dharamsala", to: "Bimthang", sleepAltitudeM: 3620, approxAltitude: true, highPointM: 5106, walkingHours: [8, 9], isHardestDay: true, image: "ridge", bleed: { role: "peak", line: "The Larke Pass, ~5,106m.", sub: "A pre-dawn start, eight to nine hours, and the crux of the circuit." }, honestNote: "The hardest day by a wide margin. You start before dawn, climb to the pass, and descend a long way to Bimthang. Cold and exposed at the top, and there is no shortening it." },
    { day: 11, title: "Bimthang → Dharapani", from: "Bimthang", to: "Dharapani", sleepAltitudeM: PENDING, walkingHours: [6, 6], honestNote: "Down through forest and out of the high country. Six hours, mostly descending, on legs that crossed a pass yesterday.", image: "trailForest" },
    { day: 12, title: "Dharapani → Besisahar → Kathmandu or Pokhara", from: "Dharapani", to: "Kathmandu", sleepAltitudeM: PENDING, walkingHours: null, transport: "jeep", honestNote: "Shared local jeep to Besisahar, then on by road. Where you finish depends on your onward plans — we arrange either." },
  ],

  honestParagraph:
    "Twelve days circling Manaslu, the eighth-highest mountain in the world, and crossing the Larke Pass at ~5,106m. A route we run, operated by our trusted partner, who has been working this country since 1996. It is a restricted-area expedition rather than a trek: remote, far fewer trekkers than Annapurna or Everest, Tibetan-Buddhist villages through the middle of it, and one very long day at the top. It is not a first Himalayan trek and we will not sell it as one.",

  honestNotes: [
    "Day 10 over the Larke Pass is eight to nine hours from a pre-dawn start, cold and exposed at the top. There is no shortening it and no way around it.",
    "Altitude symptoms most commonly begin around Namrung, on day 4. The rest day at Samagaun exists for that reason and is not optional.",
    "Dharamsala at ~4,430m is a staging post, not a village. Basic shelter and a poor night's sleep, immediately before the hardest day.",
    "Lodges in the lower gorge are basic and improve higher up — the opposite of what most people expect.",
    "This is a restricted area. It is remote, you are far from a road for days, and rescue is correspondingly harder.",
  ],

  notForYou: [
    "You have not spent nights above ~4,000m.",
    "You are uneasy with a ~5,106m pass and an eight-to-nine-hour crossing day.",
    "You need hot showers and wifi throughout.",
    "You are not comfortable being remote and far from a road for several days.",
  ],

  failureScenarios: [
    {
      trigger: "Snow closes the Larke Pass.",
      likelihood: "A real risk at the edges of both seasons.",
      whatWeDo:
        "The guide calls it at Dharamsala. There is no way around the pass, so the group turns and retraces the valley.",
      whoPays:
        "TODO — the disruption policy has not yet been agreed with the partner.",
    },
    {
      trigger: "Altitude symptoms above Namrung.",
      likelihood:
        "Common enough that the schedule is built around it. This is where it usually starts.",
      whatWeDo:
        "The guide monitors daily and sets the pace. Descent begins immediately if symptoms progress — descent is the treatment.",
      whoPays:
        "Your insurance covers evacuation. A helicopter is chartered at your cost and takes you to hospital. Neither we nor our partner take any commission on that flight.",
    },
  ],

  included: [
    "All transport by bus and shared local jeep",
    "Breakfast, lunch and dinner throughout the trek",
    "Accommodation during the trek",
    "All permits — restricted-area, MCAP, ACAP and the municipality fee",
    "Licensed guide throughout",
    "Guide insurance",
    "Two porters per guide, carrying a maximum of 25kg",
  ],

  excluded: [
    INSURANCE_EXCLUSION,
    "All drinks — tea, coffee, mineral water, cola, beer and spirits",
    "Apple pie, custard, chocolate bars and fruit",
    "A second item at any meal — one per meal is included, extras are yours",
    "The Pokhara to Kathmandu bus, if you finish in Pokhara",
    "Donations to monasteries and to people on the trail, entirely at your discretion",
    "Hot showers and wifi",
    "International flights, personal expenses and tips",
  ],

  safety: {
    altitudeProtocol:
      "Symptoms most often begin around Namrung. The guide monitors daily from there and the rest day at Samagaun is built in for acclimatisation, not for sightseeing. Turnaround is the guide's decision and descent is the treatment.",
    evacuationPolicy:
      "A helicopter is chartered at your cost and takes you to hospital. Neither we nor our partner take any commission on that flight. Your policy must carry helicopter evacuation cover and we verify it before departure.",
    weatherPolicy:
      "The guide reroutes or waits. On the pass there is no alternative line, so a closure means turning back down the valley.",
    noCommission: "verified",
  },

  price: {
    min: npr(0),
    max: npr(0),
    variables: [
      "Group size — the per-person cost falls as the group grows.",
      "Season — restricted-area permit fees are higher from September to November.",
      "Whether you finish in Pokhara or Kathmandu.",
      "Final quote depends on season, group size and operations.",
    ],
    groupTiers: [],
    status: "indicative",
  },

  costBreakdown: [],
  guide: { slug: "guide-one" },
  images: [
    {
      role: "hero",
      src: "/images/journeys/manaslu/hero.jpg",
      alt: "A trekker in a dark jacket walking away across a wide snow-covered glacier, one pole in hand, towards a long wall of snow peaks",
      place: "Manaslu region",
      // Neither the exact point on the route nor the month came with the
      // frame. "Manaslu region" is as specific as the source supports.
      month: PENDING,
      year: PENDING,
      width: 1478,
      height: 1064,
    },
  ],

  faqs: [
    { question: "Can I walk this solo?", answer: "Since March 2026, yes — with a licensed guide through a registered agency. The old two-person minimum is gone." },
    { question: "What is the hardest day?", answer: "Day 10, crossing the Larke Pass at ~5,106m. Eight to nine hours from a pre-dawn start." },
    { question: "Why are the altitudes shown as approximate?", answer: "Our partner operates the route and we use his figures, but several differ from published sources by 200–370m. We would rather mark them approximate than present a contested number as exact." },
    { question: "Is travel insurance included?", answer: "No. Insurance with helicopter evacuation cover is mandatory, it is your responsibility to arrange, and we verify it before departure. Guide insurance is ours." },
    { question: "Do I need prior high-altitude experience?", answer: "Yes. You should have spent nights above 4,000m before. This is not a first Himalayan trek." },
  ],

  seo: {
    title:
      "Manaslu Circuit Trek — 12 Days over the Larke Pass | Indicative Cost",
    description:
      "The 12-day Manaslu Circuit through restricted-area Gorkha and over the Larke Pass at ~5,106m. Real itinerary, honest notes, indicative cost.",
    keywords: [
      "manaslu circuit trek",
      "manaslu larke pass",
      "manaslu trek from india",
      "manaslu circuit 12 days",
      "restricted area trek nepal",
    ],
  },

  status: "published",
  lastVerified: "2026-08-03",
};
