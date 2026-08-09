import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { getPublishedJourneys } from "@/lib/content";
import {
  COMPANY_NAME,
  INSTAGRAM_HANDLE,
  LICENCE_NUMBER,
  PARTNER_NAME,
  WHATSAPP_DISPLAY,
} from "@/content/company";

const PRACTICAL = [
  { href: "/practical/permits", label: "Permits and rules" },
  { href: "/practical/when-to-go", label: "When to go" },
  { href: "/practical/fitness", label: "How fit you need to be" },
  { href: "/about/safety", label: "Safety and evacuation" },
  { href: "/about/how-we-price", label: "How we price" },
];

const linkClass =
  "text-[0.9rem] text-[#e6dfd6]/55 transition-colors duration-300 hover:text-[#f0c08c]";

export default function Footer() {
  // Only published journeys are linked: a draft slug 404s in production.
  const journeys = getPublishedJourneys();
  const instagramPending = INSTAGRAM_HANDLE.startsWith("TODO");

  return (
    <footer className="px-6 pt-20 pb-28 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/*
          Custom trips. One sentence and a link, deliberately here and not on a
          trek card — the four-trek focus is the whole point of the page above.
          These routes are not products we sell; this is an inbound catch for
          people who ask.
        */}
        <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
          Coming to Nepal? Tell us what you have in mind and we will plan it
          around you.{" "}
          <WhatsAppButton
            context={{ journeyName: "a trip planned around my own dates" }}
            className="text-[#f0c08c] underline-offset-4 hover:underline"
          >
            Message us
          </WhatsAppButton>
          .
        </p>

        <div className="mt-16 grid gap-12 border-t border-[#e6dfd6]/8 pt-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
              {COMPANY_NAME}
            </p>
            <p className="mt-4 max-w-sm text-[0.9rem] leading-relaxed text-[#e6dfd6]/50">
              Ground operations by {PARTNER_NAME}, a registered trekking agency.{" "}
              {LICENCE_NUMBER
                ? `Licence no. ${LICENCE_NUMBER}.`
                : "Licence no. — pending."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <WhatsAppButton className={linkClass}>
                WhatsApp · {WHATSAPP_DISPLAY}
              </WhatsAppButton>
              {instagramPending ? (
                <span className="text-[0.9rem] text-[#e6dfd6]/30">
                  Instagram — pending
                </span>
              ) : (
                <a
                  href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  Instagram
                </a>
              )}
            </div>
          </div>

          <nav aria-label="Treks" className="lg:col-span-3">
            <h2 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/35 uppercase">
              Treks
            </h2>
            <ul className="mt-4 space-y-2.5">
              {journeys.map((journey) => (
                <li key={journey.slug}>
                  <a href={`/journeys/${journey.slug}`} className={linkClass}>
                    {journey.name}
                  </a>
                </li>
              ))}
              <li>
                <a href="/treks" className={linkClass}>
                  Browse all treks →
                </a>
              </li>
            </ul>
          </nav>

          <nav aria-label="Practical" className="lg:col-span-4">
            <h2 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/35 uppercase">
              Before you book
            </h2>
            <ul className="mt-4 space-y-2.5">
              {PRACTICAL.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={linkClass}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="mt-14 border-t border-[#e6dfd6]/8 pt-8 text-[0.8rem] text-[#e6dfd6]/35">
          © {new Date().getFullYear()} {COMPANY_NAME}. Prices shown are
          indicative and not a quote.
        </p>
      </div>
    </footer>
  );
}
