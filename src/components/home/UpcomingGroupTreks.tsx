import Reveal from "@/components/common/Reveal";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";
import { getOpenDepartures } from "@/content/departures";
import { getJourney } from "@/lib/content";
import { formatFromNPR } from "@/lib/currency";
import { count } from "@/lib/format";

const dateLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

export default function UpcomingGroupTreks() {
  const departures = getOpenDepartures();

  return (
    <section
      id="upcoming-treks"
      className="border-b border-[#e6dfd6]/8 px-6 py-14 sm:px-10 sm:py-20 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.6rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
            Upcoming Group Treks
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
            Join a confirmed departure and walk with people who booked the same
            dates. Most people finish it with names in their phone.
          </p>
        </Reveal>

        <Reveal delay={0.06} className="mt-16">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {departures.map((d) => {
              const journey = getJourney(d.journeySlug);
              const left = d.capacity - d.filled;
              const isFull = left <= 0;
              return (
                <div
                  key={`${d.date}-${d.journeySlug}`}
                  className="group flex flex-col rounded-[6px] border border-[#e6dfd6]/12 bg-[#0e1118] p-6 transition-colors duration-300 hover:border-[#f0c08c]/30"
                >
                  <div className="flex-1">
                    <time className="font-display text-[0.8rem] font-semibold text-[#e9c9a8] uppercase">
                      {dateLabel(d.date)}
                    </time>
                    <h3 className="mt-2 font-display text-[1.25rem] font-semibold tracking-[-0.01em] text-[#f7f2ea]">
                      {journey?.name ?? d.journeySlug}
                    </h3>
                    <p className="mt-3 text-[0.9rem] text-[#e6dfd6]/55">
                      {journey?.subtitle ?? ""}
                    </p>
                    <dl className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.85rem] text-[#e6dfd6]/60 tabular-nums">
                      <div>
                        <dt className="sr-only">Duration</dt>
                        <dd>{count(journey?.days ?? "pending", "days")}</dd>
                      </div>
                      <div>
                        <dt className="sr-only">Highest point</dt>
                        <dd>
                          {journey?.maxAltitudeM
                            ? `${journey.maxAltitudeM.toLocaleString("en-IN")}m`
                            : "tbc"}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#e6dfd6]/8 pt-4">
                    <span
                      className={`text-[0.9rem] font-medium ${
                        isFull
                          ? "text-[#e9c9a8]"
                          : "font-display text-[1.15rem] font-semibold text-[#f7f2ea] tabular-nums"
                      }`}
                    >
                      {isFull
                        ? "Full"
                        : `${formatFromNPR(d.pricePerPerson)} pp`}
                    </span>
                    {isFull ? (
                      <span className="text-[0.8rem] text-[#e6dfd6]/40">
                        Waitlist available
                      </span>
                    ) : (
                      <span className="text-[0.8rem] text-[#e6dfd6]/45">
                        {d.filled} of {d.capacity} booked · {left} left
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {departures.length === 0 && (
          <Reveal delay={0.06} className="mt-12">
            <div className="rounded-[6px] border border-[#e6dfd6]/12 bg-[#0e1118] p-8 sm:p-10">
              <p className="max-w-xl text-[1.0625rem] leading-relaxed text-[#e6dfd6]/70">
                Nothing on the board yet. We are scheduling the first fixed
                departures now, and each one will appear here with its date,
                the trek, how many places are taken, and the price per person.
              </p>
              <p className="mt-4 max-w-xl text-[0.95rem] leading-relaxed text-[#e6dfd6]/50">
                Until then, message us with roughly when you want to walk and
                we will tell you who else is going and when.
              </p>

              <div className="mt-8">
                <WhatsAppButton
                  context={{ journeyName: "joining a group departure" }}
                  className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]"
                >
                  Send us your dates
                </WhatsAppButton>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
