import type { Journey } from "@/lib/schema";

/**
 * Screen 9 — what happens when it goes wrong, and who pays.
 *
 * The `whoPays` line is the one competitors omit, so it gets its own row rather
 * than being folded into prose. Where the policy is genuinely undecided the
 * content says TODO, and that renders here as a visible gap rather than being
 * hidden — a blank we can see is safer than one we cannot.
 */
export default function FailureScenarios({ journey }: { journey: Journey }) {
  return (
    <div>
      <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
        When it does not go to plan
      </h2>
      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
        Weather closes trails, altitude turns people around, and people get ill.
        Here is what we do in each case, and who carries the cost.
      </p>

      <div className="mt-10 space-y-px border-t border-[#e6dfd6]/12">
        {journey.failureScenarios.map((scenario) => {
          const undecided = scenario.whoPays.startsWith("TODO");

          return (
            <div
              key={scenario.trigger}
              className="grid gap-4 border-b border-[#e6dfd6]/12 py-7 lg:grid-cols-12 lg:gap-8"
            >
              <h3 className="text-[1.05rem] leading-snug font-medium text-[#f0ece5] lg:col-span-4">
                {scenario.trigger}
              </h3>

              <div className="lg:col-span-8">
                <dl className="space-y-3 text-[0.925rem] leading-relaxed">
                  <div>
                    <dt className="text-[0.72rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
                      How often
                    </dt>
                    <dd className="mt-1 text-[#e6dfd6]/70">
                      {scenario.likelihood}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium tracking-[0.08em] text-[#e6dfd6]/40 uppercase">
                      What we do
                    </dt>
                    <dd className="mt-1 text-[#e6dfd6]/70">
                      {scenario.whatWeDo}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[0.72rem] font-medium tracking-[0.08em] text-[#e9c9a8]/70 uppercase">
                      Who pays
                    </dt>
                    <dd
                      className={`mt-1 ${undecided ? "text-[#e6dfd6]/40 italic" : "text-[#f0ece5]"}`}
                    >
                      {undecided
                        ? "Not yet agreed with our partner. We will not publish a policy we have not confirmed."
                        : scenario.whoPays}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
