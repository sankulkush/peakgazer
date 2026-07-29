"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

export type TierRow = {
  label: string;
  price: string;
  /** 0–1, relative to the most expensive tier. Drives the bar width. */
  fraction: number;
  saving?: string;
};

/**
 * The per-head drop, as bars.
 *
 * Prices are formatted upstream from the content layer and passed in as
 * strings — this component never converts or invents a number, and the figures
 * are readable before any animation runs. Only the bar widths animate, which is
 * the rule: prices are never gated behind motion.
 */
export default function GroupTierChart({ rows }: { rows: TierRow[] }) {
  const root = useRef<HTMLDListElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-bar]",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <dl ref={root} className="space-y-5">
      {rows.map((row) => (
        <div key={row.label}>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-[0.95rem] text-[#e6dfd6]/70">{row.label}</dt>
            <dd className="font-display text-[1.15rem] font-semibold tracking-[-0.01em] text-[#f7f2ea] tabular-nums sm:text-[1.35rem]">
              {row.price}
              <span className="ml-2 text-[0.7rem] font-normal tracking-wide text-[#e6dfd6]/40">
                pp
              </span>
            </dd>
          </div>

          <div className="mt-2 h-[3px] w-full overflow-hidden rounded-full bg-[#e6dfd6]/10">
            <div
              data-bar
              className="h-full origin-left rounded-full bg-[#f0c08c]"
              style={{ width: `${Math.round(row.fraction * 100)}%` }}
            />
          </div>

          {row.saving && (
            <p className="mt-1.5 text-[0.8rem] text-[#e9c9a8]/70">{row.saving}</p>
          )}
        </div>
      ))}
    </dl>
  );
}
