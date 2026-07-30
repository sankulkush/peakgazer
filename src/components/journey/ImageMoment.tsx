import ImageSlot, { SlotCaption } from "./ImageSlot";
import type { ImageRole, Journey } from "@/lib/schema";

/**
 * A full-bleed breath between information blocks. Used three times: the
 * sunrise, the marker, and the invitation backdrop.
 *
 * Deliberately shorter than the viewport. An image moment that fills the screen
 * with no visible way forward is a dead end, and every one of these is followed
 * immediately by substance.
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
  /** One line, or nothing. Never a paragraph. */
  line?: string;
  sub?: string;
  height?: string;
}) {
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
          {sub && (
            <p className="mt-2 text-[0.95rem] text-[#e6dfd6]/70">{sub}</p>
          )}
          <SlotCaption journey={journey} role={role} className="mt-4" />
        </div>
      </div>
    </section>
  );
}
