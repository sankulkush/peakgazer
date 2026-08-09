import type { Faq } from "@/lib/schema";

/**
 * Shared across the three Annapurna journeys. The packages document specifies
 * these once for ABC Short and says the other two inherit them verbatim —
 * duplicating them into each content file would invite drift.
 *
 * Source: packages.md, "What's Included / Excluded" and the ABC Short FAQ set.
 */

/**
 * TODO [VERIFY with partner]: the premium package these are quoted from is the
 * 9-day ABC. Confirm which of these apply to the 7-day short version and to
 * Mardi specifically before any of this is published.
 */
/**
 * Mandatory on every journey and never included. Guide insurance is ours;
 * the traveller's is theirs, and we check it before departure.
 */
export const INSURANCE_EXCLUSION =
  "Your travel insurance, which must carry helicopter evacuation cover — mandatory, your responsibility to arrange, and verified by us before departure";

export const ANNAPURNA_INCLUDED = [
  "Airport pickup and departure transfer",
  "Welcome on arrival",
  "2 nights Kathmandu hotel",
  "2 nights Pokhara hotel",
  "All trek transport — Pokhara ⇄ trailhead by jeep",
  "Licensed guide throughout",
  "Porter, one per two trekkers, shared load",
  "Guide insurance",
  "All permits (ACAP)",
  "All trek meals — breakfast, lunch, dinner",
  "Teahouse accommodation on trek, twin sharing",
];

export const ANNAPURNA_EXCLUDED = [
  "Travel to and from Nepal",
  "Nepal visa — not required for Indian nationals",
  INSURANCE_EXCLUSION,
  "Personal equipment",
  "Hot showers, wifi, device charging",
  "Bottled or boiled water",
  "Tea and coffee beyond meals",
  "Snacks and alcohol",
  "Tips",
  "Donations",
  "Costs arising from early descent, weather delay or route change",
];

/** Applies to every Annapurna journey. Journey-specific FAQs are appended. */
export const ANNAPURNA_FAQS: Faq[] = [
  {
    question: "Do Indian citizens need a visa for Nepal?",
    answer: "No. Indian nationals enter without a visa.",
  },
  {
    question: "Do Indians need a guide?",
    answer:
      "Yes. Since 2023 all foreign trekkers need a licensed guide through a registered agency. Indians included.",
  },
  {
    question: "What does an Indian pay for permits compared with a foreigner?",
    answer:
      "Indians pay the SAARC ACAP rate of NPR 1,000, against NPR 3,000 for other foreign nationals.",
  },
  {
    question: "Is 4,130m dangerous for a first-timer?",
    answer:
      "It carries real altitude risk, but sleeping altitude stays moderate and exposure at height is brief. Most reasonably fit first-timers manage it with proper pacing.",
  },
  {
    question: "How fit do I need to be?",
    answer:
      "Able to walk 6–8 hours on consecutive days. It is not a technical climb.",
  },
  {
    question: "Is there mobile signal?",
    answer:
      "Intermittent. Expect to be largely offline above Chhomrong.",
  },
  {
    question: "Are there hot showers?",
    answer: "Below Chhomrong sometimes, for a fee. Above, rarely.",
  },
  {
    question: "What is the food like?",
    answer:
      "Dal bhat, noodles, eggs, potatoes — filling and repetitive. It gets pricier and simpler with altitude.",
  },
  {
    question: "What if I cannot finish?",
    answer:
      "The guide arranges your descent and you are never left alone. Costs arising from an early descent are not refundable.",
  },
  {
    question: "Do you provide gear?",
    answer:
      "Rental is available for jackets, sleeping bags and poles. TODO — confirm with partner.",
  },
  {
    question: "What is the best month?",
    answer:
      "October and April for clear skies. November is colder and quieter; March is warmer and hazier.",
  },
  {
    question: "Is travel insurance mandatory?",
    answer:
      "Yes, with helicopter evacuation cover, verified before departure. This is not negotiable.",
  },
  {
    question: "Who are the guides?",
    answer:
      "Licensed and insured, named on this site with their route counts. TODO — guide details pending from the partner.",
  },
  {
    question: "What group size do you run?",
    answer: "Two to twelve. Private departures for solo travellers.",
  },
  {
    question: "Does the price drop for a group?",
    answer:
      "Yes, significantly. The per-head cost falls from solo to eight travellers.",
  },
  {
    question: "Are hotels included?",
    answer:
      "Yes — Kathmandu and Pokhara nights. TODO — confirm which apply to the 7-day version.",
  },
  {
    question: "How do we pay?",
    answer:
      "A deposit to confirm, balance before departure. Card via a secure link.",
  },
  {
    question: "What happens if weather closes the trail?",
    answer:
      "The guide reroutes or waits. TODO — our disruption policy, covering who bears which cost, is not yet agreed with the partner.",
  },
  {
    question: "Can we start from Kathmandu instead?",
    answer:
      "The trek is Pokhara-based. We can arrange the Kathmandu–Pokhara leg as an add-on.",
  },
];
