/**
 * The content contract. Components consume these types, never a data source,
 * which is what lets a CMS drop in later without a rewrite.
 *
 * Design principle: the honesty rules in CLAUDE.md are enforced by the type
 * system rather than left to discipline. An itinerary day cannot exist without
 * an honest note. An image cannot exist without a place and a month. A
 * failure scenario cannot exist without saying who pays.
 */

// ── Primitives ───────────────────────────────────────────────────────────

/** Attaches to any claim a visitor could check. */
export type VerificationStatus = "verified" | "indicative" | "commitment";

/** Display currencies. Content is always authored in NPR — see AmountNPR. */
export type Currency = "NPR" | "INR" | "USD";

/** Manually maintained in company.ts. Never fetched. */
export type Rates = Record<Currency, number>;

export type Month =
  | "January" | "February" | "March" | "April" | "May" | "June"
  | "July" | "August" | "September" | "October" | "November" | "December";

/**
 * Every money value in content is NPR. Branded so a rate authored in INR or
 * USD cannot be assigned by accident — the transparency page has to be honest
 * in the currency we actually pay in. Converted at render, not at authoring.
 */
export type AmountNPR = number & { readonly __brand: "NPR" };

export const npr = (amount: number): AmountNPR => amount as AmountNPR;

/**
 * A figure we do not hold yet.
 *
 * The type exists so a content file can say "not confirmed" instead of being
 * forced to supply a number. Rendering turns it into "to be confirmed" — never
 * a plausible-looking guess, which is the failure mode this guards against.
 */
export const PENDING = "pending" as const;
export type Pending = typeof PENDING;
export type MaybeNumber = number | Pending;

export const isPending = (value: unknown): value is Pending =>
  value === PENDING;

// ── Money ────────────────────────────────────────────────────────────────

/**
 * Solo carries a real private-trek premium and is a live segment in this
 * market. These are the sizes the packages document actually prices; the
 * partner's per-head operating cost at other sizes is not yet known.
 */
export type GroupSize = "solo" | 2 | 4 | 8;

export interface GroupTier {
  groupSize: GroupSize;
  /** Lower bound — this is the figure the "from ₹X at 8 travellers" card uses. */
  perPerson: AmountNPR;
  /** Upper bound, where the source quotes a range rather than a point. */
  perPersonMax?: AmountNPR;
  status: VerificationStatus;
}

export interface CostLine {
  label: string; // "ACAP permit", "Guide — 5 days"
  amount: AmountNPR;
  status: VerificationStatus;
  note?: string;
}

/** Foreign nationals pay different permit rates and are quoted separately. */
export interface ForeignPrice {
  fromUSD: number;
  toUSD: number;
  status: VerificationStatus;
}

export interface PriceRange {
  min: AmountNPR;
  max: AmountNPR;
  /** What moves the number, in plain language. Never a bare "from". */
  variables: string[];
  /** The per-head drop. Our strongest commercial argument. */
  groupTiers: GroupTier[];
  status: VerificationStatus;
}

// ── Route ────────────────────────────────────────────────────────────────

export interface ItineraryDay {
  day: number;
  title: string; // "Kande → Forest Camp"
  from?: string;
  to: string;
  /** PENDING where the altitude is not in any source document. */
  sleepAltitudeM: MaybeNumber;
  /**
   * Renders altitudes with a leading `~`. Set where the operator's figure and
   * published sources disagree — we use the operator's, but we do not present
   * a contested number as exact.
   */
  approxAltitude?: boolean;
  /** Set only when the day crosses higher than it sleeps. */
  highPointM?: MaybeNumber;
  /** `null` means genuinely no walking; PENDING means we have not confirmed it. */
  walkingHours: [number, number] | null | Pending;
  ascentM?: MaybeNumber;
  descentM?: MaybeNumber;
  terrain?: string;
  /** Required. Say if the day is hard, dull, enclosed or crowded. */
  honestNote: string;
  isHardestDay?: boolean;
  transport?: "jeep" | "flight" | "bus" | "none";
  /** A small frame beside this day. */
  image?: ImageRole;
  /**
   * A full-bleed moment placed after this day. Reserved for the emotional
   * beats — three or four across a journey, not one per day, or it stops being
   * a journey and becomes a slideshow.
   */
  bleed?: { role: ImageRole; line?: string; sub?: string };
  /** Where the traveller sleeps, when it is not a teahouse. */
  stay?: string;
}

/**
 * A fixed-departure group trek someone can join.
 *
 * `filled` and `capacity` are real counts or this section does not ship. A
 * fabricated "two places left" is the fake-scarcity pattern this site exists
 * to be the opposite of, and a customer would act on it.
 */
export interface GroupDeparture {
  /** ISO date of departure. */
  date: string;
  journeySlug: string;
  capacity: number;
  filled: number;
  pricePerPerson: AmountNPR;
  status: VerificationStatus;
}

/** Real upsells. Never a promised slot or price until it is booked. */
export interface AddOn {
  label: string;
  note: string;
  /** Everything is on request until the partner confirms availability. */
  availability: "on request";
}

export interface SafetyInfo {
  altitudeProtocol: string;
  evacuationPolicy: string;
  weatherPolicy: string;
  /**
   * We take no commission on evacuation flights. Held as a status rather than
   * a boolean because publishing it before the partner confirms it in writing
   * would be exactly the claim the sector's fraud prosecution was built on.
   */
  noCommission: VerificationStatus;
}

export interface Permit {
  name: string; // "ACAP"
  fullName: string;
  /** Indian nationals pay the SAARC rate. Material for this buyer. */
  costSAARC: AmountNPR;
  costForeign: AmountNPR;
  status: VerificationStatus;
  lastVerified: string; // ISO date
  note?: string;
}

export interface FailureScenario {
  trigger: string;
  likelihood: string;
  whatWeDo: string;
  /** The clause competitors omit. Required. */
  whoPays: string;
}

/** An altitude we can reach but will not promise. */
export interface OptionalHighPoint {
  name: string; // "Mardi Himal Base Camp"
  altitudeM: number;
  /** Why it is not a promise. Required, so it can never render as one. */
  condition: string;
}

// ── Media and people ─────────────────────────────────────────────────────

/**
 * Named slots on a journey page. The template asks for a role; the content file
 * supplies the frame. Adding an image with the right role fills the slot — no
 * component changes.
 *
 * `hero`, `sunrise`, `summitMarker` and `invitation` are the four full-bleed
 * moments. Everything else is a small frame working beside text.
 */
export type ImageRole =
  | "hero"
  | "arrival"
  | "sunrise"
  | "summitMarker"
  | "jhinu"
  | "invitation"
  | "trailSteps"
  | "trailForest"
  | "trailValley"
  | "trailhead"
  | "peak"
  | "lake"
  | "waterfall"
  | "bridge"
  | "avalanche"
  | "wildlife"
  | "ridge"
  | "teahouse"
  | "food"
  | "group"
  | "guide";

export interface JourneyImage {
  role: ImageRole;
  src: string;
  alt: string;
  place: string; // caption rule
  month: Month; // caption rule
  year: number;
  width: number; // explicit dimensions — CLS budget
  height: number;
  credit?: string;
}

export interface GuideRef {
  slug: string;
}

export interface Guide {
  slug: string;
  name: string;
  licenceNumber: string;
  licenceStatus: VerificationStatus;
  yearsGuiding: number;
  /** journey slug → number of times this guide has run it. */
  routeCounts: Record<string, number>;
  languages: string[];
  certifications: string[]; // "Wilderness First Responder, 2024"
  homeVillage: string;
  photo: JourneyImage;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface JourneySeo {
  title: string;
  description: string;
  keywords: string[];
}

export interface Testimonial {
  quote: string;
  name: string;
  /** We are a new company. Labelling this honestly is the whole point. */
  relationship:
    | "paying customer"
    | "companion on a research trek"
    | "friend of the founder";
  journeySlug: string;
  month: Month;
  year: number;
}

// ── The journey ──────────────────────────────────────────────────────────

export type Difficulty = 1 | 2 | 3 | 4;

/**
 * Who is speaking on this page.
 *
 * `founder` permits first person — "I walked this" — and is allowed on exactly
 * the two routes the founder has actually walked. Every other journey is
 * `partner`: real and sellable, described honestly, but never staged as the
 * founder's own trek. A false experience claim is the one lie this brand
 * cannot survive, and experienced trekkers are precisely who would catch it.
 */
export type Voice = "founder" | "partner";

/** Three of four journeys start in Pokhara. Langtang is the exception. */
export type BaseCity = "Pokhara" | "Kathmandu";

export interface Journey {
  slug: string;
  name: string;
  nameDevanagari?: string;
  /** One line under the title in the hero. The honest frame, not a tagline. */
  subtitle: string;
  region: string; // "Annapurna (ACAP)"
  startCity: BaseCity;
  endCity: BaseCity;
  /**
   * All PENDING-able. A rare route can be real and sellable before its stages
   * have been written up — the page says "to be confirmed" rather than
   * inventing a shape for it.
   */
  days: MaybeNumber;
  nights: MaybeNumber;
  trekDays: MaybeNumber;
  maxAltitudeM: MaybeNumber;
  optionalHighPoint?: OptionalHighPoint;
  voice: Voice;
  difficulty: Difficulty;
  /** Why it is that tier, in numbers. Never an adjective. */
  difficultyNote: string;
  bestMonths: Month[];
  permits: Permit[];
  price: PriceRange;
  foreignPrice?: ForeignPrice;
  costBreakdown: CostLine[];
  itinerary: ItineraryDay[];
  addOns?: AddOn[];
  safety?: SafetyInfo;
  /** What this actually is, drawbacks included. Founder's voice. */
  honestParagraph: string;
  honestNotes: string[];
  notForYou: string[];
  failureScenarios: FailureScenario[];
  included: string[];
  excluded: string[];
  guide: GuideRef;
  images: JourneyImage[];
  testimonials?: Testimonial[];
  /** Rendered on the page and as FAQPage structured data. */
  faqs: Faq[];
  seo: JourneySeo;
  /** Draft journeys never reach the index, sitemap or generateStaticParams. */
  status: "draft" | "published";
  lastVerified: string; // ISO date
}
