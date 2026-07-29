"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Vertical rail with a light travelling down it.
 *
 * Owns the perpetual pulse; the hero timeline handles its entrance fade and
 * the scroll-linked dismissal, so the two concerns never share a target.
 */
export default function ScrollIndicator() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // One timeline rather than two tweens, so the fade in and fade out
        // never compete for the same `opacity` on a given frame.
        gsap
          .timeline({ repeat: -1, repeatDelay: 1.4 })
          .fromTo(
            "[data-scroll-spark]",
            { yPercent: -110, opacity: 0 },
            { yPercent: 40, opacity: 1, duration: 1.5, ease: "sine.out" },
          )
          .to("[data-scroll-spark]", {
            yPercent: 260,
            opacity: 0,
            duration: 2.1,
            ease: "sine.in",
          });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-scroll-indicator
      className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-80 sm:bottom-10"
      style={{ animationDelay: "0.8s" }}
    >
      <span className="text-[0.62rem] uppercase tracking-[0.38em] text-[#e6dfd6]/50">
        Scroll
      </span>

      <span className="relative block h-16 w-px overflow-hidden bg-gradient-to-b from-[#e6dfd6]/10 via-[#e6dfd6]/25 to-transparent">
        <span
          data-scroll-spark
          className="absolute inset-x-0 top-0 block h-6 bg-gradient-to-b from-transparent via-[#f0c08c] to-transparent will-change-transform"
        />
      </span>
    </div>
  );
}
