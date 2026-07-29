import type { ReactNode } from "react";
import WhatsAppButton from "@/components/inquiry/WhatsAppButton";

/**
 * Masked line reveal: the wrapper clips, the inner span is what the timeline
 * lifts into view. Avoids a text-splitting plugin and keeps the markup
 * semantic — the heading is still one continuous string to a screen reader.
 */
function RevealLine({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.16em]">
      {/* Offset state lives in globals.css — see the note there on why this
          can't be a Tailwind translate utility. */}
      <span data-reveal-line className="block will-change-transform">
        {children}
      </span>
    </span>
  );
}

/**
 * The typographic overlay. Sits above the scene, owns no animation of its own —
 * the hero timeline drives it through `data-*` hooks.
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
          className="mb-5 text-[0.9rem] font-medium text-[#e9c9a8] opacity-0"
        >
          Pokhara · Kathmandu
        </p>

        {/* `text-balance` is the real guard against an orphaned "hard." — the
            em-based max-width only stops the measure running away on wide
            screens. Sizing is tuned so line 1 holds on one line from 1024 up. */}
        <h1
          className="font-display max-w-[20em] text-[clamp(1.75rem,2.35vw,2.05rem)] font-semibold leading-[1.12] tracking-[-0.02em] text-balance text-[#f7f2ea]"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.4)" }}
        >
          <RevealLine>Annapurna, Mardi, Langtang.</RevealLine>
          <RevealLine>We&apos;ll tell you which days are hard.</RevealLine>
        </h1>

        <p
          data-hero-sub
          className="mt-6 text-[1.0625rem] leading-relaxed text-[#e9e3da] opacity-0 sm:text-lg"
          style={{ textShadow: "0 1px 20px rgba(0,0,0,0.4)" }}
        >
          Real walking hours, real altitudes, and the cost broken down line by
          line. Four treks, five to ten days. Highest point 4,130m.
        </p>

        <div
          data-hero-actions
          className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4 opacity-0"
        >
          <WhatsAppButton className="inline-flex items-center rounded-full bg-[#f0c08c] px-7 py-3.5 text-[0.95rem] font-medium text-[#14110b] transition-colors duration-300 hover:bg-[#f8d3a6]">
            Message on WhatsApp
          </WhatsAppButton>

          <a
            href="#journeys"
            className="group inline-flex items-center gap-2 text-[0.875rem] text-[#e6dfd6]/80 transition-colors duration-300 hover:text-[#f7f2ea]"
          >
            See the four treks
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
