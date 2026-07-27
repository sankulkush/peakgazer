"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

/**
 * Orchestrator for the landing hero.
 *
 * Holds exactly two responsibilities:
 *   1. the master entrance timeline (scene assembles back-to-front, then type),
 *   2. the scrubbed depth parallax as the hero is scrolled away.
 *
 * Ambient loops (cloud drift, scroll spark) belong to their own components.
 * Entrance targets the `<svg>` inside each ridge; parallax targets the ridge
 * wrapper — separate elements, so the two never overwrite each other.
 */
export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Everything the timeline reveals starts hidden in the markup so there is
      // no flash of un-animated content before hydration. Both branches below
      // are responsible for putting it back on screen.
      const revealed = [
        "[data-ridge]",
        "[data-cloud-layer]",
        "[data-sun]",
        "[data-hero-eyebrow]",
        "[data-hero-sub]",
        "[data-hero-actions]",
        "[data-scroll-indicator]",
      ];

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(revealed, { opacity: 1, y: 0, scale: 1 });
        gsap.set("[data-reveal-line]", { yPercent: 0 });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 1.4 },
        });

        tl.fromTo(
          "[data-sun]",
          { opacity: 0, scale: 0.75 },
          { opacity: 1, scale: 1, duration: 2.6, ease: "power2.out" },
        )
          // Skyline assembles from the furthest ridge inward.
          .fromTo(
            "[data-ridge]",
            { opacity: 0, yPercent: 16 },
            {
              opacity: 1,
              yPercent: 0,
              duration: 1.8,
              stagger: 0.14,
              ease: "power3.out",
            },
            0.1,
          )
          .to("[data-cloud-layer]", { opacity: 1, duration: 3 }, 0.4)
          .to("[data-hero-eyebrow]", { opacity: 1, y: 0 }, 0.9)
          .fromTo(
            "[data-reveal-line]",
            { yPercent: 110 },
            { yPercent: 0, duration: 1.5, stagger: 0.12, ease: "power4.out" },
            1.0,
          )
          .to("[data-hero-sub]", { opacity: 1, y: 0 }, 1.5)
          .to("[data-hero-actions]", { opacity: 1, y: 0 }, 1.7)
          .to("[data-scroll-indicator]", { opacity: 1, y: 0 }, 2.0);

        // Depth parallax: distant ridges sink, foreground terrain rushes up.
        gsap.to("[data-ridge-layer]", {
          yPercent: (_i, el: HTMLElement) => Number(el.dataset.depth) * 24,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });

        gsap.to("[data-hero-content]", {
          y: -90,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "60% top",
            scrub: true,
          },
        });

        // The indicator has done its job the moment the user starts scrolling.
        // Opacity only — `y` still belongs to the entrance tween.
        //
        // Explicit `fromTo` with `immediateRender: false`: a plain `to` would
        // capture the element's opacity at creation time, which is still 0 from
        // its initial-state class, and the scrub would then pin it invisible.
        gsap.fromTo(
          "[data-scroll-indicator]",
          { opacity: 1 },
          {
            opacity: 0,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "15% top",
              scrub: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Nepal — an invitation"
      className="relative h-[100svh] w-full overflow-hidden bg-[#04050d]"
    >
      <HeroBackground />

      <div data-hero-content className="relative h-full w-full">
        <HeroContent />
      </div>

      <ScrollIndicator />
    </section>
  );
}
