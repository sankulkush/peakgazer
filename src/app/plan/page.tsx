import type { Metadata } from "next";
import InquiryForm from "@/components/inquiry/InquiryForm";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { getAllJourneys } from "@/lib/content";
import { RESPONSE_TIME } from "@/content/company";

export const metadata: Metadata = {
  title: "Plan a trek | Uthbus Tours",
  description:
    "Tell us roughly when, how many of you, and what you're unsure about. We reply within 24 hours.",
};

/**
 * We invite planning, not booking — hence /plan rather than /contact. There is
 * no checkout anywhere on this site; every path ends in a conversation.
 *
 * Draft journeys are listed here on purpose: the form is how someone asks about
 * a trek whose price is not yet published.
 */
export default function PlanPage() {
  const journeys = getAllJourneys().map((j) => ({
    slug: j.slug,
    name: j.name,
  }));

  return (
    <main className="flex-1 px-6 py-20 sm:px-10 sm:py-24">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-[clamp(1.9rem,4vw,2.5rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
          Plan a trek
        </h1>

        <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/80">
          Tell us roughly when, how many of you, and what you are unsure about.
          These six questions exist so the reply is useful — not to qualify you.
          We answer {RESPONSE_TIME}.
        </p>

        <div className="mt-6">
          <WhatsAppButton className="text-[0.95rem] text-[#f0c08c] underline-offset-4 hover:underline">
            Or message on WhatsApp instead →
          </WhatsAppButton>
        </div>

        <div className="mt-10">
          <InquiryForm journeys={journeys} />
        </div>
      </div>
    </main>
  );
}
