import PlaceholderImage from "@/components/common/PlaceholderImage";
import Reveal from "@/components/common/Reveal";
import { PARTNER_NAME } from "@/content/company";

/**
 * Who actually runs the trek.
 *
 * This replaced a founder quote claiming personal experience of every route
 * and authorship of every photograph — neither of which is true now that the
 * catalogue is partner-operated. Agency voice, no first person, and no claim
 * to photographs we do not hold.
 */
export default function FounderSection() {
  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <PlaceholderImage
            label="On the trail with our partner's team"
            ratio="4 / 5"
            className="max-w-[22rem] rounded-sm"
          />
          <p className="mt-3 text-[0.75rem] text-[#e6dfd6]/40">
            Photograph pending — place and month to follow
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
