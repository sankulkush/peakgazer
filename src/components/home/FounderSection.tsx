import Image from "next/image";
import Reveal from "@/components/common/Reveal";
import { PARTNER_NAME } from "@/content/company";

/**
 * Who actually runs the trek.
 *
 * This replaced a founder quote claiming personal experience of every route
 * and authorship of every photograph — neither of which is true now that the
 * catalogue is partner-operated. Agency voice, no first person, and no claim
 * to photographs we do not hold.
 *
 * The portrait is one we do hold. Its date is not a guess: panchakunda.ts
 * records the whole Panchakunda set as the founder's own, October 2025, and
 * names this frame as one held back at the time.
 */
export default function FounderSection() {
  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Image
            src="/images/home/founder-panchakunda.jpg"
            alt="Our founder standing on the gravel shore of the turquoise Panchakunda lake, arms folded, with the glacier and the snow face above the lake behind him"
            width={900}
            height={1200}
            quality={82}
            sizes="(max-width: 1024px) 88vw, 22rem"
            className="h-auto w-full max-w-[22rem] rounded-sm"
          />
          {/* Named, because the copy beside it is about the partner agency and
              an unlabelled face there reads as one of their guides. */}
          <p className="mt-3 text-[0.75rem] text-[#e6dfd6]/45">
            Our founder at Panchakunda, October 2025
          </p>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
            Who runs the trek
          </h2>

          <div className="mt-6 max-w-xl space-y-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
            <p>
              Every route here is operated by {PARTNER_NAME}, a
              TAAN-registered agency working out of Thamel since 1996. They put
              the guides and porters on the ground; we plan the trip, quote it,
              and stay with you from the first message to the flight home.
            </p>
            <p>
              We are a young company and say so. Where a number is not confirmed
              yet, this site says that too, rather than filling the gap with
              something that reads well.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
