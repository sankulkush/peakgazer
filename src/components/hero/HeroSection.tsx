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
 *   1. the master entrance timeline,
 *   2. the scrubbed parallax as the hero is scrolled away.
 *
 * The scroll indicator's ambient loop belongs to its own component.
 */
/** The indicator sits below the CTAs in the hierarchy, so it never reaches full. */
const INDICATOR_OPACITY = 0.8;

/** Reveals play once per session, not on every return to the homepage. */
const INTRO_KEY = "hero-intro-played";

export default function HeroSection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // These start hidden in the markup so there is no flash of un-animated
      // content before hydration. Every branch below is responsible for
      // putting them back on screen.
      const revealed = [
        "[data-hero-eyebrow]",
        "[data-hero-sub]",
        "[data-hero-actions]",
      ];

      // `y: 0` is not redundant. The CSS offset is authored in px and reaches
      // GSAP through the computed matrix as `y`; clearing `yPercent` alone
      // would leave it in place. Same reason it is repeated on the reveal
      // lines below — see the note in globals.css.
      const settle = () => {
        gsap.set(revealed, { opacity: 1, y: 0 });
        gsap.set("[data-scroll-indicator]", {
          opacity: INDICATOR_OPACITY,
          y: 0,
        });
        gsap.set("[data-reveal-line]", { y: 0, yPercent: 0 });
      };

      mm.add("(prefers-reduced-motion: reduce)", settle);

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const alreadyPlayed = sessionStorage.getItem(INTRO_KEY) === "1";

        if (alreadyPlayed) {
          settle();
        } else {
          sessionStorage.setItem(INTRO_KEY, "1");

          gsap
            .timeline({ defaults: { ease: "power3.out", duration: 1.0 } })
            .to("[data-hero-eyebrow]", { opacity: 1, y: 0 }, 0.2)
            .fromTo(
              "[data-reveal-line]",
              { y: 0, yPercent: 110 },
              { y: 0, yPercent: 0, duration: 1.1, stagger: 0.14 },
              0.3,
            )
            .to("[data-hero-sub]", { opacity: 1, y: 0 }, 0.78)
            .to("[data-hero-actions]", { opacity: 1, y: 0 }, 0.92)
            .to(
              "[data-scroll-indicator]",
              { opacity: INDICATOR_OPACITY, y: 0 },
              1.1,
            );
        }

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
        // Opacity only — `y` still belongs to the entrance tween.
        //
        // Explicit `fromTo` with `immediateRender: false`: a plain `to` would
        // capture the element's opacity at creation time, which is still 0 from
        // its initial-state class, and the scrub would then pin it invisible.
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
