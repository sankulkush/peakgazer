import Reveal from "@/components/common/Reveal";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { getOpenDepartures } from "@/content/departures";
import { getJourney } from "@/lib/content";
import { formatFromNPR } from "@/lib/currency";

/**
 * Joining a group, rather than bringing one.
 *
 * The board lists confirmed fixed departures with real remaining places. It is
 * empty today and says so — inventing dates and fill counts would be fake
 * scarcity, and someone would plan a trip around it.
 */
export default function GroupSection() {
  const departures = getOpenDepartures();

  const dateLabel = (iso: string) =>
    new Date(iso).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="border-b border-[#e6dfd6]/8 px-6 py-24 sm:px-10 sm:py-28 lg:px-16">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea] text-balance">
            Looking for a group?
          </h2>

          <p className="mt-5 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
            We run group treks often. Send us your dates on WhatsApp and we will
            fit you into one — walking with people you have not met yet is a
            different trip from walking alone, and most people finish it with
            names in their phone.
          </p>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/50">
            It also brings the per-head cost down. A guide, a porter and a jeep
            cost the same whether two of you walk or eight.
          </p>

          <div className="mt-8">
            <WhatsAppButton
              context={{ journeyName: "joining a group departure" }}
              className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
            >
              Send us your dates
            </WhatsAppButton>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="lg:col-span-7">
          <h3 className="text-[0.75rem] font-medium tracking-[0.1em] text-[#e6dfd6]/40 uppercase">
            Fixed departures
          </h3>

          {departures.length === 0 ? (
            <div className="mt-5 rounded-sm border border-[#e6dfd6]/12 bg-[#0e1118] p-7">
              <p className="text-[1rem] leading-relaxed text-[#e6dfd6]/70">
                Nothing on the board yet. We are scheduling the first fixed
                departures now, and each one will be listed here with its date,
                the trek, how many places are taken and how many are left, and
                the price per person.
              </p>
              <p className="mt-4 text-[0.95rem] leading-relaxed text-[#e6dfd6]/50">
                Until they are up, message us with roughly when you want to walk
                and we will tell you who else is going and when.
              </p>
            </div>
          ) : (
            <ul className="mt-5 space-y-px border-t border-[#e6dfd6]/12">
              {departures.map((d) => {
                const journey = getJourney(d.journeySlug);
                const left = d.capacity - d.filled;
                return (
                  <li
                    key={`${d.date}-${d.journeySlug}`}
                    className="grid gap-2 border-b border-[#e6dfd6]/12 py-5 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                  >
                    <span className="font-display text-[0.95rem] font-semibold text-[#e9c9a8] sm:col-span-2">
                      {dateLabel(d.date)}
                    </span>
                    <span className="text-[1rem] text-[#f0ece5] sm:col-span-4">
                      {journey?.name ?? d.journeySlug}
                    </span>
                    <span className="text-[0.9rem] text-[#e6dfd6]/60 tabular-nums sm:col-span-3">
                      {d.filled} of {d.capacity} taken
                      <span className="text-[#e6dfd6]/40">
                        {" "}
                        · {left} left
                      </span>
                    </span>
                    <span className="font-display text-[1rem] font-semibold text-[#f7f2ea] tabular-nums sm:col-span-3 sm:text-right">
                      {formatFromNPR(d.pricePerPerson)}
                      <span className="ml-1 text-[0.7rem] font-normal text-[#e6dfd6]/40">
                        pp
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
