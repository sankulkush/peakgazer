import Reveal from "@/components/common/Reveal";
import TrekRow from "./TrekRow";
import { getPublishedJourneys } from "@/lib/content";

export default function TheTreks() {
  const journeys = getPublishedJourneys();

  return (
    <section id="the-treks" className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
              The treks
            </h2>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/65">
              Operated by our partner agency. Every price falls as the group grows.
            </p>
          </div>

          <a
            href="/treks"
            className="group inline-flex shrink-0 items-center gap-2.5 rounded-full border border-[#f0c08c]/35 px-6 py-3 text-[0.9rem] font-medium text-[#f0c08c] transition-colors duration-300 hover:border-[#f0c08c] hover:bg-[#f0c08c] hover:text-[#14110b]"
          >
            Explore all treks
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>

      <div className="mx-auto mt-12 max-w-6xl">
        <TrekRow journeys={journeys} />
      </div>
    </section>
  );
}
