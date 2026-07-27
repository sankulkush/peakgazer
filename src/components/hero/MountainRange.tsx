import type { Ridge } from "./hero.data";
import { RIDGE_BLEED } from "./hero.data";

type MountainRangeProps = {
  ridge: Ridge;
};

/**
 * A single silhouette in the skyline.
 *
 * Two nested elements on purpose: the wrapper is the parallax target
 * (scrubbed by ScrollTrigger) while the inner `<svg>` is the entrance target
 * (the load timeline). Keeping them separate means neither animation has to
 * know about the other's transforms.
 */
export default function MountainRange({ ridge }: MountainRangeProps) {
  const gradientId = `ridge-gradient-${ridge.id}`;

  return (
    <div
      data-ridge-layer
      data-depth={ridge.depth}
      className="absolute inset-x-0 will-change-transform"
      style={{ height: ridge.height, bottom: RIDGE_BLEED }}
    >
      <svg
        data-ridge
        viewBox="0 0 1440 500"
        preserveAspectRatio="none"
        className="h-full w-full opacity-0"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={ridge.from} />
            <stop offset="100%" stopColor={ridge.to} />
          </linearGradient>
        </defs>
        <path d={ridge.path} fill={`url(#${gradientId})`} />
      </svg>
    </div>
  );
}
