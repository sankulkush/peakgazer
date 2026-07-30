import InquiryForm from "@/components/inquiry/InquiryForm";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import ImageSlot from "./ImageSlot";
import { getAllJourneys } from "@/lib/content";
import { RESPONSE_TIME, WHATSAPP_DISPLAY } from "@/content/company";
import type { Journey } from "@/lib/schema";

/**
 * Screen 10 — the end of the journey is the start of the conversation.
 *
 * The image sits behind at low opacity as a backdrop rather than a moment: the
 * form has to stay the most legible thing on the screen.
 */
export default function JourneyInvitation({ journey }: { journey: Journey }) {
  const journeys = getAllJourneys().map((j) => ({
    slug: j.slug,
    name: j.name,
  }));

  return (
    <section id="plan" className="relative overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 opacity-20">
        <ImageSlot
          journey={journey}
          role="invitation"
          label="The hot springs at the end"
          sizes="100vw"
          fill
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(10,12,18,0.94),rgba(10,12,18,0.88))]"
      />

      <div className="relative z-10 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
        <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <h2 className="font-display text-[clamp(1.6rem,3.2vw,2.35rem)] leading-[1.15] font-semibold tracking-[-0.02em] text-balance text-[#f7f2ea]">
              Walk {journey.name} with us
            </h2>

            <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
              Tell us roughly when and how many of you. Six questions, no
              account, and a person answers — {RESPONSE_TIME}.
            </p>

            <div className="mt-8 border-t border-[#e6dfd6]/10 pt-8">
              <p className="text-[0.95rem] text-[#e6dfd6]/60">
                Most people would rather message. It reaches the same person.
              </p>
              <div className="mt-4">
                <WhatsAppButton
                  context={{ journeyName: journey.name }}
                  className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
                >
                  Message on WhatsApp
                </WhatsAppButton>
              </div>
              <p className="mt-3 text-[0.85rem] text-[#e6dfd6]/40">
                {WHATSAPP_DISPLAY}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm journeys={journeys} defaultJourney={journey.slug} />
          </div>
        </div>
      </div>
    </section>
  );
}
