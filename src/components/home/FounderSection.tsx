import PlaceholderImage from "@/components/common/PlaceholderImage";
import Reveal from "@/components/common/Reveal";

/**
 * The founder, first person.
 *
 * An image section in the alternation, sitting against the plain fact list
 * above it. Kept to four sentences — the register is competent companionship,
 * not a founder's manifesto.
 */
export default function FounderSection() {
  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <PlaceholderImage
            label="The founder, on the trail"
            ratio="4 / 5"
            className="rounded-sm"
          />
          <p className="mt-3 text-[0.75rem] text-[#e6dfd6]/40">
            Portrait pending — place and month to follow
          </p>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <blockquote className="font-display text-[clamp(1.35rem,2.6vw,1.9rem)] leading-[1.4] font-medium tracking-[-0.015em] text-[#f7f2ea] text-balance">
            &ldquo;I have walked all four of these routes myself, and I took the
            photographs on this site.&rdquo;
          </blockquote>

          <div className="mt-8 max-w-xl space-y-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
            <p>
              I grew up here and I have spent long enough on these trails to know
              which lodges are cold, which mornings are worth the alarm, and
              which day is going to hurt. That is the part most companies leave
              out, so it is the part I lead with.
            </p>
            <p>
              I am building this slowly and in the open. Where I do not yet have
              a number confirmed, the site says so rather than filling the gap.
            </p>
          </div>

          <p className="mt-8 text-[0.85rem] tracking-wide text-[#e6dfd6]/40">
            Founder — name and photograph to follow
          </p>
        </Reveal>
      </div>
    </section>
  );
}
