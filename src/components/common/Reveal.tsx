"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds. Used to stagger siblings without a shared timeline. */
  delay?: number;
  as?: ElementType;
};

/**
 * The single scroll reveal used everywhere below the hero.
 *
 * Deliberately cheap: one fade-and-rise, `once: true`, transform and opacity
 * only. It never re-fires on scroll-back, and under reduced motion the content
 * simply renders in place — the branch that does nothing is the designed state,
 * not a fallback.
 *
 * Children render visible in the markup; GSAP sets the hidden `from` state on
 * mount. A script that fails to run therefore costs the animation, never the
 * content — the same rule the hero follows.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 92%",
              once: true,
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
