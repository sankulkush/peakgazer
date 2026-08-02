import ImageSlot, { SlotCaption } from "./ImageSlot";
import type { ImageRole, Journey } from "@/lib/schema";

/**
 * Frames from the route that do not belong to a single day.
 *
 * Only renders images the journey actually holds — it never asks for a slot
 * and gets a placeholder back, because a grid of placeholders is worse than no
 * grid. Every frame keeps its place-and-month caption.
 */
const CANDIDATES: ImageRole[] = [
  "bridge",
  "wildlife",
  "ridge",
  "lake",
  "waterfall",
  "avalanche",
  "trailhead",
];

export default function JourneyGallery({
  journey,
  exclude = [],
}: {
  journey: Journey;
  exclude?: ImageRole[];
}) {
  const roles = CANDIDATES.filter(
    (role) =>
      !exclude.includes(role) && journey.images.some((i) => i.role === role),
  );

  if (roles.length < 2) return null;

  return (
    <div>
      <h2 className="font-display text-[clamp(1.5rem,3vw,2.15rem)] font-semibold tracking-[-0.02em] text-[#f7f2ea]">
        Along the way
      </h2>
      <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-[#e6dfd6]/60">
        Our own photographs from the route. Every one names where it was taken
        and when.
      </p>

      {/* Rows of uprights. Each frame renders at its own ratio. */}
      <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-3">
        {roles.map((role) => (
          <figure key={role}>
            <ImageSlot
              journey={journey}
              role={role}
              label={role}
              ratio="4 / 5"
              sizes="(max-width: 640px) 46vw, (max-width: 1024px) 46vw, 30vw"
              className="rounded-sm"
            />
            <SlotCaption journey={journey} role={role} className="mt-2" />
          </figure>
        ))}
      </div>
    </div>
  );
}
