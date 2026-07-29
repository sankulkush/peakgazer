import Reveal from "@/components/common/Reveal";
import { LICENCE_NUMBER, PARTNER_NAME, RESPONSE_TIME } from "@/content/company";

/**
 * Verifiable facts, laid out editorially. No icon-and-heading rows.
 *
 * Every line here is a number, a name or a document. Where we do not yet hold
 * the document, the line says so rather than being quietly dropped — a pending
 * licence number stated plainly is worth more than a claim we cannot back.
 */
const FACTS = [
  {
    figure: "10",
    label: "Maximum group size",
    detail:
      "One guide per seven walkers is the legal ceiling. We run below it, and we will tell you the actual number on your departure before you pay.",
  },
  {
    figure: RESPONSE_TIME.replace("within ", ""),
    label: "First reply",
    detail:
      "A commitment we can hold in a bad week, not a best case. If we are on a trail and slower, you will be told why.",
  },
  {
    figure: "Line by line",
    label: "What the price is made of",
    detail:
      "Permits, guide, porter, lodges, transport, insurance and our margin — itemised on every trek page. Nobody else in Thamel publishes this.",
  },
  {
    figure: "Zero",
    label: "Commission on evacuation flights",
    detail:
      "The sector's largest documented fraud ran through exactly this. We are confirming our partner's practice in writing before this claim is published.",
    pending: true,
  },
];

export default function WhyUsSection() {
  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            What we will put in writing
          </h2>
        </Reveal>

        <div className="mt-14 space-y-px border-t border-[#e6dfd6]/8">
          {FACTS.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 0.06}
              className="grid gap-3 border-b border-[#e6dfd6]/8 py-8 sm:grid-cols-12 sm:gap-8"
            >
              <p className="font-display text-[1.5rem] font-semibold tracking-[-0.02em] text-[#e9c9a8] sm:col-span-3 sm:text-[1.75rem]">
                {fact.figure}
              </p>
              <h3 className="text-[1.0625rem] font-medium text-[#f7f2ea] sm:col-span-3">
                {fact.label}
              </h3>
              <p className="text-[0.95rem] leading-relaxed text-[#e6dfd6]/60 sm:col-span-6">
                {fact.detail}
                {fact.pending && (
                  <span className="ml-2 rounded-full border border-[#e9c9a8]/30 px-2 py-0.5 text-[0.7rem] text-[#e9c9a8]/80">
                    being confirmed
                  </span>
                )}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 max-w-2xl">
          <p className="text-[0.95rem] leading-relaxed text-[#e6dfd6]/50">
            We are a new company. Ground operations run through{" "}
            <span className="text-[#e6dfd6]/75">{PARTNER_NAME}</span>, a
            registered trekking agency, and their licence backs every permit we
            arrange.{" "}
            <span className="text-[#e9c9a8]/80">
              {LICENCE_NUMBER
                ? `Licence no. ${LICENCE_NUMBER}.`
                : "Licence no. — pending."}
            </span>{" "}
            We would rather say that than imply a history we do not have.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
