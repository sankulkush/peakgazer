import InquiryForm from "@/components/inquiry/InquiryForm";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import Reveal from "@/components/common/Reveal";
import InlinePhoto from "./InlinePhoto";
import { getAllJourneys } from "@/lib/content";
import { PENDING } from "@/lib/schema";
import { RESPONSE_TIME, WHATSAPP_DISPLAY } from "@/content/company";

/**
 * The single KPI. Both paths to a human conversation, side by side — the form
 * for people who want to write it all down, WhatsApp for the majority of this
 * market, who would rather message.
 */
export default function InquirySection() {
  const journeys = getAllJourneys().map((j) => ({
    slug: j.slug,
    name: j.name,
  }));

  return (
    <section
      id="plan"
      className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
            Tell us roughly what you have in mind
          </h2>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
            Six questions, no account. They exist so the reply is useful — not to
            qualify you. We answer {RESPONSE_TIME}.
          </p>

          <div className="mt-8 border-t border-[#e6dfd6]/8 pt-8">
            <p className="text-[0.95rem] text-[#e6dfd6]/60">
              Most people would rather message. That is fine — it reaches the
              same person.
            </p>
            <div className="mt-4">
              <WhatsAppButton className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]">
                Message on WhatsApp
              </WhatsAppButton>
            </div>
            <p className="mt-3 text-[0.85rem] text-[#e6dfd6]/40">
              {WHATSAPP_DISPLAY}
            </p>
          </div>

          {/* The people, at the end of the page where the ask is. Six faces
              rather than a testimonial card: this is the part of the pitch a
              competitor cannot fabricate. */}
          <InlinePhoto
            src="/images/home/group-selfie.jpg"
            alt="Six walkers crowded into a selfie at dawn in down jackets and hats, all of them laughing, flat grey light behind them"
            width={900}
            height={1600}
            place={PENDING}
            month={PENDING}
            year={PENDING}
            sizes="(max-width: 1024px) 60vw, 15rem"
            className="mt-10 max-w-[15rem]"
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <InquiryForm journeys={journeys} />
        </Reveal>
      </div>
    </section>
  );
}
