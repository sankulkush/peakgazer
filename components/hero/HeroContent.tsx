import type { ReactNode } from "react";

/**
 * Masked line reveal: the wrapper clips, the inner span is what the timeline
 * lifts into view. Avoids a text-splitting plugin and keeps the markup
 * semantic — the heading is still one continuous string to a screen reader.
 */
function RevealLine({ children }: { children: ReactNode }) {
  return (
    <span className="block overflow-hidden pb-[0.12em]">
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
      <div className="max-w-4xl">
        <p
          data-hero-eyebrow
          className="mb-6 text-[0.7rem] font-medium uppercase tracking-[0.42em] text-[#e9c9a8]/80 opacity-0 sm:text-xs"
        >
          Nepal · 27°N 86°E
        </p>

        <h1 className="font-display text-[clamp(2.75rem,9vw,7.5rem)] font-light leading-[0.94] tracking-[-0.02em] text-[#f7f2ea]">
          <RevealLine>Walk where</RevealLine>
          <RevealLine>
            <em className="not-italic text-[#f0c08c]">the sky</em> begins
          </RevealLine>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-md text-base leading-relaxed text-[#e6dfd6]/70 opacity-0 sm:text-lg"
        >
          Eight of the world&apos;s fourteen highest peaks. A thousand temples
          between them. One journey that quietly rearranges you.
        </p>

        <div
          data-hero-actions
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 opacity-0"
        >
          <a
            href="#journeys"
            className="group relative inline-flex items-center gap-3 rounded-full border border-[#f0c08c]/40 px-7 py-3.5 text-sm tracking-[0.14em] text-[#f7f2ea] uppercase transition-colors duration-500 hover:border-[#f0c08c] hover:bg-[#f0c08c]/10"
          >
            Begin the ascent
            <span
              aria-hidden="true"
              className="transition-transform duration-500 group-hover:translate-x-1"
            >
              →
            </span>
          </a>

          <a
            href="#film"
            className="text-sm tracking-[0.14em] text-[#e6dfd6]/60 uppercase underline-offset-8 transition-colors duration-500 hover:text-[#f7f2ea] hover:underline"
          >
            Watch the film
          </a>
        </div>
      </div>
    </div>
  );
}
