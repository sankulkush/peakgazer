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

// ── Money ────────────────────────────────────────────────────────────────

export type GroupSize = 2 | 4 | 6 | 8 | 10 | 12;

export interface GroupTier {
  groupSize: GroupSize;
  perPerson: AmountNPR;
  status: VerificationStatus;
}

export interface CostLine {
  label: string; // "ACAP permit", "Guide — 5 days"
  amount: AmountNPR;
  status: VerificationStatus;
  note?: string;
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
  sleepAltitudeM: number;
  /** Set only when the day crosses higher than it sleeps. */
  highPointM?: number;
  /** null on arrival and departure days. */
  walkingHours: [number, number] | null;
  ascentM?: number;
  descentM?: number;
  terrain?: string;
  /** Required. Say if the day is hard, dull, enclosed or crowded. */
  honestNote: string;
  isHardestDay?: boolean;
  transport?: "jeep" | "flight" | "bus" | "none";
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

export interface JourneyImage {
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

/** Three of four journeys start in Pokhara. Langtang is the exception. */
export type BaseCity = "Pokhara" | "Kathmandu";

export interface Journey {
  slug: string;
  name: string;
  nameDevanagari?: string;
  region: string; // "Annapurna (ACAP)"
  startCity: BaseCity;
  endCity: BaseCity;
  days: number;
  trekDays: number;
  maxAltitudeM: number;
  optionalHighPoint?: OptionalHighPoint;
  difficulty: Difficulty;
  /** Why it is that tier, in numbers. Never an adjective. */
  difficultyNote: string;
  bestMonths: Month[];
  permits: Permit[];
  price: PriceRange;
  costBreakdown: CostLine[];
  itinerary: ItineraryDay[];
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
  /** Draft journeys never reach the index, sitemap or generateStaticParams. */
  status: "draft" | "published";
  lastVerified: string; // ISO date
}
