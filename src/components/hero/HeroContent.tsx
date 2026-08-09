import type { ReactNode } from "react";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";

/**
 * Entrance timing. The reveal itself lives in globals.css — these are only the
 * offsets that stagger it. Nothing here exceeds 1.2s: animation never delays
 * content, and the CTAs must be usable almost immediately.
 */
const DELAY = {
  eyebrow: "0.05s",
  line1: "0.15s",
  line2: "0.29s",
  sub: "0.50s",
  actions: "0.62s",
} as const;

/**
 * Masked line reveal: the wrapper clips, the inner span rises into view. Avoids
 * a text-splitting plugin and keeps the markup semantic — the heading is still
 * one continuous string to a screen reader.
 */
function RevealLine({
  children,
  delay,
}: {
  children: ReactNode;
  delay: string;
}) {
  return (
    <span className="block overflow-hidden pb-[0.16em]">
      <span
        data-reveal-line
        className="block will-change-transform"
        style={{ animationDelay: delay }}
      >
        {children}
      </span>
    </span>
  );
}

/**
 * The typographic overlay. Renders visible; the entrance is a CSS animation, so
 * a script failure can only cost the animation, never the words.
 */
export default function HeroContent() {
  return (
    <div className="relative z-10 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-16">
      {/* Text stays in the left column, where the directional scrim is dense.
          38% rather than 45%: at 45% the column reaches 49% of the viewport,
          where the scrim has thinned over white snow and the headline measures
          1.6:1. Measured, not estimated — see the note in HeroBackground. */}
      <div className="max-w-xl lg:max-w-[38%]">
        <p
          data-hero-eyebrow
          className="mb-5 text-[0.9rem] font-medium text-[#e9c9a8]"
          style={{ animationDelay: DELAY.eyebrow }}
        >
          Nepal, planned properly
        </p>

        {/* `text-balance` is the real guard against an orphaned "hard." — the
            em-based max-width only stops the measure running away on wide
            screens. Sizing is tuned so line 1 holds on one line from 1024 up. */}
        <h1
          className="font-display max-w-[20em] text-[clamp(1.75rem,2.35vw,2.05rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-[#f7f2ea]"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.4)" }}
        >
          <RevealLine delay={DELAY.line1}>Come for the mountains.</RevealLine>
          <RevealLine delay={DELAY.line2}>
            We&apos;ll handle the rest.
          </RevealLine>
        </h1>

        <p
          data-hero-sub
          className="mt-6 text-[1.0625rem] leading-relaxed text-[#e9e3da] sm:text-lg"
          style={{
            textShadow: "0 1px 20px rgba(0,0,0,0.4)",
            animationDelay: DELAY.sub,
          }}
        >
          Real walking hours, real altitudes, and every cost shown line by
          line — so you know what you are walking into before you book.
        </p>

        <div
          data-hero-actions
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4"
          style={{ animationDelay: DELAY.actions }}
        >
          <WhatsAppButton className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]">
            Message on WhatsApp
          </WhatsAppButton>

          <a
            href="#journeys"
            className="group inline-flex items-center gap-2 text-[0.875rem] text-[#e6dfd6]/80 transition-colors duration-300 hover:text-[#f7f2ea]"
          >
            See the treks
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
