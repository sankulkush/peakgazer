# PROJECT CONTEXT

You are the senior frontend engineer on a real Nepal trekking company's website.
This is a live business, not a portfolio piece. It will take real bookings from real people.

## What this business is

A Nepali-owned trekking company selling four treks to **Indian travellers**.
The founder is Nepali, has personally walked every route offered, and is the photographer.
Ground operations run through a registered partner agency whose licence is displayed on the site.

## Who buys

Indian travellers, 20–45. University groups, office colleague groups, families, couples.
Booking lead time: 2–6 weeks. Discovery: Instagram reels and WhatsApp forwards from friends.
Price sensitivity: moderate. Group size: 2–12, usually organised by one person.

**The group organiser is the most important single user.** One person books for eight.
Design for them.

They are NOT luxury buyers. Do not use luxury-brand register.
The correct tone is competent companionship, not aspirational distance.

## The single KPI

A visitor starts a WhatsApp conversation or submits an inquiry.
There is no checkout, no payments, no accounts. Every path leads to a human conversation.

## The catalogue — SEVEN LAUNCH TREKS

Featured on the homepage, in this order. The first four are the priority tier — our partner's
strongest, least-crowded, highest-value routes. The three Annapurna treks are the secondary tier.

1. **Manaslu Circuit** · 12 days Kathmandu→Kathmandu · Larke Pass ~5,106m · restricted area
2. **Pikey Peak**
3. **Mardi Himal** · 6 days Pokhara→Pokhara · max ~4,200m
4. **Langtang Valley** · 7 days Kathmandu→Kathmandu · max 3,870m
5. **Annapurna Base Camp — Short** · 5 days
6. **Annapurna Base Camp via Ghorepani & Poon Hill** · 8 days
7. **North Annapurna Base Camp with Panchakunda** · 5 days · max 4,190m

Also in the content layer but not featured: the ABC Signature Journey and Tilicho Lake.

## The partnership

Adventure Walk Way Pvt. Ltd., operating since 1996, TAAN-registered, based in Thamel. They operate
every trek; we own the brand, the marketing and the customer relationship. We keep what we charge
above their price, plus a profit share. We are an inquiry-first travel brand, not an operator, and
the site must never imply otherwise.

Verified and publishable:
- **Porters:** two porters per guide. Maximum load 20kg in the Annapurna region, 25kg in Everest.
- **Evacuation:** the operator takes **no commission** on rescue flights. A helicopter is chartered
  at the client's cost and the client is taken to hospital. Guide safety is prioritised.
- **Guides are insured.** Customer travel insurance is **not** included in any package — every
  "not included" list must say that insurance with helicopter evacuation cover is mandatory, is the
  customer's responsibility, and is verified before departure.

## Treks vs Tours — a deliberate product separation

This site sells **treks** only. Multi-day walking, ACAP or national park permits, licensed
trekking guide, teahouse accommodation.

A separate **Tours** section will be built later for road-based journeys: Muktinath, Chitwan,
Lumbini, Pokhara sightseeing, Manakamana. Different product, different buyer, different
operations. **Do not build it now and do not mix tour content into the trek journeys.**

Muktinath in particular is out of scope for this build. It was previously in the journey list
and has been deliberately moved to the future Tours section.

## Currency

Three display currencies: **INR (default) · NPR · USD**

- **Base currency in content files is NPR.** Cost lines are natively NPR — permits, guide day
  rates, lodge rates — and the transparency page must be honest in the currency we actually pay in.
- **Display defaults to INR** because that is the currency our buyer thinks in. An Indian
  traveller should never have to do mental arithmetic to know whether they can afford a trek.
- Switcher lives in the navbar, visible on every page and every viewport. Selection persists
  across pages via localStorage.
- Conversion rates are a single constant in `src/content/company.ts`, manually maintained.
  **Do not fetch live rates.** A build-time constant with a visible "rates as of [date]" note
  is honest, offline-safe, and adequate.

## Price display rules

**Prices are always visible.** Never "contact us for pricing".

- **On cards and listings:** `from ₹X per person at 8 travellers` — the "from" is only
  acceptable because the variable that produces it is named in the same sentence.
- **On journey pages:** the full range, the group tier table (solo/2/4/8), and the itemised
  cost breakdown. Never a bare "from" without the tier table adjacent to it.
  Solo is a real tier and carries a private-trek premium — do not hide it.
- The per-person price drops sharply with group size. This is our strongest commercial
  argument — make it prominent, not a footnote.

## Non-negotiable product rules

**WhatsApp is the primary conversion action**, present and reachable on every page and every
viewport. Not buried on a contact page. This market messages before it emails.

**Trust components are first-class.** Partner agency licence number, named guides with licence
numbers and route counts, an honest "we are a new company" notice, real testimonials labelled
as what they are. These are product surfaces, not decoration.

**Honesty is the differentiator.** Every journey page carries unflattering notes about the route,
explicit "this is not for you if…" disqualification, and named failure scenarios (weather,
altitude, early descent). Competitors hide these. We lead with them.

**Every claim is a number, a name, or a document — never an adjective.**
"Small groups" is marketing. "Maximum 10, one guide per 7" is information.

## Language rules

BANNED. These appear on every competitor site and instantly read as generic:

breathtaking · hidden gem · nestled · majestic · pristine · trip of a lifetime · unforgettable ·
iconic · stunning · magical · once-in-a-lifetime · Land of the Himalayas · Roof of the World ·
adventure awaits · embark on a journey · immerse yourself · warm hospitality · Namaste and welcome

Also banned: rhetorical-question openers, "Whether you're a seasoned trekker or a first-timer",
exclamation marks, and any sentence that would work equally well for Peru.

Write in first person where the founder speaks. Use real place names, real altitudes, real
walking hours. Say plainly when a day is hard or a section is dull.

## Technical stack

Next.js 16 App Router · TypeScript strict · Tailwind CSS v4 (CSS-first, no config file) ·
GSAP + ScrollTrigger + Lenis

No CMS, no database, no auth, no payments, no admin dashboard.
Content lives as typed data in `src/content/`.

## Architecture rules

- Components consume the `Journey` TypeScript interface, never a data source directly.
  This is what allows a CMS to drop in later without a rewrite.
- Server Components by default. `"use client"` only where interaction demands it.
- Small files. Composition over configuration. No file over ~150 lines.
- Never rewrite an existing component unless asked.
- Explain architectural decisions before making structural changes.
- Journeys carry `status: 'draft' | 'published'`. Draft journeys must not appear in the index,
  the sitemap, or `generateStaticParams`. Prices are not published until confirmed from real
  negotiated rates.

## Animation rules

GSAP is already used in the hero and stays there. Do not extend heavy animation across the rest
of the site. Everything below the hero uses CSS transitions and short GSAP reveals only.

Hard limits:
- Animation never delays content.
- Reveals fire once per session, not again on scroll-back.
- Prices, dates, safety information and WhatsApp links are never gated behind animation.
- `prefers-reduced-motion` is a designed state, not a fallback.
- 60fps on a mid-range Android is the test, not a laptop.

## Performance budget — a trust requirement, not an engineering preference

The audience is on Indian mobile networks. A slow site from an unknown Nepali company confirms
the suspicion the visitor already arrived with.

- LCP under 2.5s on 4G
- CLS under 0.1
- No hero video
- `next/image` everywhere, AVIF/WebP, correct sizes, explicit width and height
- Self-hosted fonts via `next/font`, no external requests
- When visual ambition and the performance budget conflict, the budget wins.

## Anti-template rules — this must not look AI-generated

- No three-equal-cards-in-a-row grids. Vary rhythm and weight deliberately.
- Asymmetry over symmetry. One dominant element per section, not three balanced ones.
- Real data tables with real numbers — altitude, walking hours, cost lines. Tables are a
  feature here, not a fallback.
- Every photograph carries a caption naming the place and the month it was taken.
- Include the awkward specifics: which day is hardest, where the lodges are basic, where the
  trail is crowded at sunrise. Specificity is the thing a generator cannot fake.
- No generic icon-plus-heading "features" rows.
- **Alternate image sections and information sections.** Information sections are visually
  plain — clean type, real tables, no decoration. That contrast is the design thesis.