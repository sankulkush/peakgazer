"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { CLOUDS } from "./hero.data";

/**
 * Slow-drifting high-altitude haze.
 *
 * Owns its own ambient loop so the hero's master timeline only has to fade the
 * layer in. Each band is a single blurred element animated on `xPercent`, which
 * stays on the compositor — no layout or paint per frame.
 */
export default function CloudLayer() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        CLOUDS.forEach((cloud) => {
          const tween = gsap.fromTo(
            `[data-cloud="${cloud.id}"]`,
            { xPercent: cloud.direction > 0 ? -130 : 130 },
            {
              xPercent: cloud.direction > 0 ? 130 : -130,
              duration: cloud.duration,
              ease: "none",
              repeat: -1,
            },
          );
          // Desync the bands so they never march in formation.
          tween.progress(cloud.offset);
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-cloud-layer
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden opacity-0"
    >
      {CLOUDS.map((cloud) => (
        <div
          key={cloud.id}
          data-cloud={cloud.id}
          className="absolute left-1/2 rounded-[50%] bg-white blur-3xl will-change-transform"
          style={{
            top: cloud.top,
            width: cloud.width,
            height: cloud.height,
            opacity: cloud.opacity,
            marginLeft: `calc(${cloud.width} / -2)`,
          }}
        />
      ))}
    </div>
  );
}
