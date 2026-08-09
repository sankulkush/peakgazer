"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ASCENT } from "@/content/ascent";
import { opacityAt, readAnchors, stageAt, veilAt, type Anchor } from "@/lib/ascent";

/**
 * The photographic ground the homepage scrolls over: forest to night, nine
 * frames, cross-dissolving as the sections pass.
 *
 * Everything here is deliberately one trick. Two photographs are visible at
 * any moment and their opacities sum to 1; a veil over them carries both the
 * text contrast and the warm-to-cold shift. No parallax planes, no clouds, no
 * wipes. The moment the technique is legible the photographs stop being
 * photographs and become wallpaper.
 *
 * It writes opacity and transform only, on at most two elements per frame,
 * from one rAF-throttled scroll listener — which is what keeps it honest on a
 * mid-range Android.
 */
export default function AscentLayer() {
  const veil = useRef<HTMLDivElement>(null);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  // Photographs are mounted just ahead of where they are needed, so the next
  // dissolve always has a decoded image and the hero's LCP never competes with
  // nine background fetches.
  const [reach, setReach] = useState(-1);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let anchors: Anchor[] = readAnchors();
    let queued = 0;

    const paint = () => {
      queued = 0;
      const raw = stageAt(anchors, window.scrollY + window.innerHeight * 0.5);
      // Reduced motion is a designed state: the correct photograph for the
      // section, arrived at cleanly, with the temperature grade intact.
      const stage = still.matches ? Math.round(raw) : raw;

      frames.current.forEach((el, i) => {
        if (!el) return;
        const o = opacityAt(i, stage);
        el.style.opacity = o.toString();
        if (o > 0 && !still.matches) {
          // A frame breathes 1.00 to 1.04 across its own life. Slow enough
          // that it reads as the picture settling, not as a zoom.
          const life = Math.max(0, Math.min(1, (stage - (i - 1)) / 2));
          el.style.transform = `scale(${(1 + life * 0.04).toFixed(4)})`;
        }
      });

      if (veil.current) veil.current.style.backgroundColor = veilAt(stage);

      // Nothing is fetched until the visitor actually moves. At rest the hero
      // is the only image on the page and gets the whole connection for its
      // LCP; the first ascent frame is still a full viewport below, so it has
      // ample time to arrive once scrolling starts.
      if (window.scrollY > 8) setReach((r) => Math.max(r, Math.ceil(stage) + 1));
    };

    const onScroll = () => {
      if (queued) return;
      queued = requestAnimationFrame(paint);
    };
    const onResize = () => {
      anchors = readAnchors();
      onScroll();
    };

    paint();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    still.addEventListener("change", onScroll);
    // Section heights settle after fonts and images land.
    const settle = window.setTimeout(onResize, 600);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      still.removeEventListener("change", onScroll);
      window.clearTimeout(settle);
      if (queued) cancelAnimationFrame(queued);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {ASCENT.map((s, i) => (
        <div
          key={s.id}
          ref={(el) => {
            frames.current[i] = el;
          }}
          style={{ opacity: 0, willChange: "opacity, transform" }}
          className="absolute inset-0"
        >
          {/* Deliberately under-resolved and under-compressed for the space it
              fills. Nothing here is ever read at full strength — a 0.73 veil
              sits on top of it — so buying DPR-2 sharpness would cost the
              mobile budget for detail no one can resolve. The forest frame
              alone was 312KB at 100vw and is a third of that here. */}
          {i <= reach && (
            <Image
              src={s.src}
              alt=""
              fill
              quality={48}
              sizes="(max-width: 768px) 55vw, 85vw"
              style={{ objectPosition: s.focus }}
              className="object-cover"
            />
          )}
        </div>
      ))}

      {/* Contrast and temperature in one element. Its colour is blended
          between the two live stages, so the page cools continuously rather
          than stepping at section boundaries. */}
      <div ref={veil} className="absolute inset-0" />
    </div>
  );
}
