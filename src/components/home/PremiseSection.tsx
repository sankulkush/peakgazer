import Reveal from "@/components/common/Reveal";

/**
 * The premise, stated plainly. Text only, on the dark ground.
 *
 * An information section in the alternation CLAUDE.md describes: no image, no
 * decoration, nothing but type. It earns its weight by sitting between the
 * photograph above and the treks below.
 */
export default function PremiseSection() {
  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-32 lg:px-16">
      <Reveal className="mx-auto max-w-3xl">
        <p className="font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.35] font-medium tracking-[-0.015em] text-[#f7f2ea] text-balance">
          The treks we feature are where we spend most of our time. They are not
          the whole of what we do.
        </p>
        <p className="mt-6 font-display text-[clamp(1.5rem,3.2vw,2.35rem)] leading-[1.35] font-medium tracking-[-0.015em] text-[#e6dfd6]/60 text-balance">
          If you are coming to Nepal, tell us what you have in mind and we will
          plan it around you — wherever you want it to go. Organised properly,
          every cost shown, and nothing promised we cannot deliver.
        </p>
      </Reveal>
    </section>
  );
}
