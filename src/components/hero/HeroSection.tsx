"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import ScrollIndicator from "./ScrollIndicator";

/** Matches the resting opacity set by the CSS entrance in globals.css. */
const INDICATOR_OPACITY = 0.8;

/**
 * Orchestrator for the landing hero.
 *
 * GSAP owns only what CSS cannot do: the ambient drift on the photograph and
 * the scroll-linked behaviour. The text entrance is a CSS animation — see the
 * note in globals.css. That split is deliberate: nothing a script does, or
 * fails to do, can hide the headline.
 */
export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Ambient drift. One tween, one element, transform only — the
        // photograph is the LCP element and never waits on animation. Sits
        // under the scrubbed parallax, which targets the outer wrapper.
        gsap.to("[data-hero-image-inner]", {
          scale: 1.06,
          duration: 30,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Sky layer counter-drifts against the base so the cloud belt separates
        // slightly from the rock. Opposite phase, slightly different period, and
        // a smaller amplitude — enough to read as air moving, not as a glitch.
        gsap.set("[data-hero-sky]", { opacity: 1, scale: 1.06 });
        gsap.to("[data-hero-sky]", {
          scale: 1.0,
          duration: 38,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });

        // Slow parallax on the photograph as the hero is scrolled away.
        gsap.to("[data-hero-image]", {
          yPercent: 6,
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
        // (see below for the scrubbed dismissal)
        //
        // Explicit `fromTo` with `immediateRender: false`: a plain `to` would
        // capture whatever opacity the CSS entrance happened to be showing at
        // creation time and the scrub would then pin it there.
        gsap.fromTo(
          "[data-scroll-indicator]",
          { opacity: INDICATOR_OPACITY },
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

      /*
        Pointer parallax. Gated on a fine pointer that can hover, so it never
        runs on touch — where a stray pointermove would jolt the image mid-scroll.

        `quickTo` writes to an existing tween instead of creating one per event,
        which is what keeps this off the main thread's hot path. The listener is
        registered inside the matchMedia context so GSAP removes it on revert.
      */
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const MAX = 8;
          const opts = { duration: 0.9, ease: "power2.out" } as const;
          const xTo = gsap.quickTo("[data-hero-image-inner]", "x", opts);
          const yTo = gsap.quickTo("[data-hero-image-inner]", "y", opts);

          const onMove = (event: PointerEvent) => {
            // -0.5..0.5 from centre, inverted so the image leans away from the
            // cursor. Composes with the ambient scale tween on the same element.
            xTo(-(event.clientX / window.innerWidth - 0.5) * 2 * MAX);
            yTo(-(event.clientY / window.innerHeight - 0.5) * 2 * MAX);
          };

          window.addEventListener("pointermove", onMove, { passive: true });
          return () => window.removeEventListener("pointermove", onMove);
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      aria-label="Treks in Annapurna and Langtang"
      className="relative h-[100svh] w-full overflow-hidden bg-[#0a0c12]"
    >
      <HeroBackground />

      <div data-hero-content className="relative h-full w-full">
        <HeroContent />
      </div>

      <ScrollIndicator />
    </section>
  );
}
