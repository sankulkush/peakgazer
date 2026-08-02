import ImageSlot, { SlotCaption } from "./ImageSlot";
import { hasWideImage } from "@/lib/images";
import type { ImageRole, Journey } from "@/lib/schema";

/**
 * A breath between information blocks.
 *
 * Two layouts, chosen by the photograph rather than by the page. A genuinely
 * wide frame goes full-bleed. Anything upright or near-square renders whole
 * beside its line — cropping a phone photo into a 2.7:1 band is what removes
 * the summit from the mountain.
 */
export default function ImageMoment({
  journey,
  role,
  label,
  line,
  sub,
  height = "h-[52svh] min-h-[320px]",
}: {
  journey: Journey;
  role: ImageRole;
  label: string;
  line?: string;
  sub?: string;
  height?: string;
}) {
  const wide = hasWideImage(journey, role);

  // Upright or near-square: show it whole, with the line alongside.
  if (!wide) {
    return (
      <section className="border-b border-[#e6dfd6]/8 bg-[#0c0e15] px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-12 lg:gap-14">
          <figure className="lg:col-span-5">
            <ImageSlot
              journey={journey}
              role={role}
              label={label}
              ratio="4 / 5"
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="rounded-sm"
            />
            <SlotCaption journey={journey} role={role} className="mt-2" />
          </figure>

          {(line || sub) && (
            <div className="lg:col-span-7">
              {line && (
                <p className="font-display text-[clamp(1.35rem,2.8vw,2rem)] leading-[1.25] font-medium tracking-[-0.015em] text-balance text-[#f7f2ea]">
                  {line}
                </p>
              )}
              {sub && (
                <p className="mt-3 text-[1rem] text-[#e6dfd6]/60">{sub}</p>
              )}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <section
      className={`relative flex w-full items-end overflow-hidden bg-[#0a0c12] ${height}`}
    >
      <ImageSlot
        journey={journey}
        role={role}
        label={label}
        sizes="100vw"
        fill
      />

      {(line || sub) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,12,18,0.85)_0%,rgba(10,12,18,0.35)_38%,transparent_70%)]"
        />
      )}

      <div className="relative z-10 w-full px-6 pb-12 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          {line && (
            <p
              className="max-w-[18em] font-display text-[clamp(1.25rem,2.6vw,1.9rem)] leading-[1.25] font-medium tracking-[-0.015em] text-balance text-[#f7f2ea]"
              style={{ textShadow: "0 1px 20px rgba(0,0,0,0.45)" }}
            >
              {line}
            </p>
          )}
          {sub && <p className="mt-2 text-[0.95rem] text-[#e6dfd6]/70">{sub}</p>}
          <SlotCaption journey={journey} role={role} className="mt-4" />
        </div>
      </div>
    </section>
  );
}
