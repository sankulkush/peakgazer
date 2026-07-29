/**
 * Stands in for photography that does not exist yet.
 *
 * Holds the real aspect ratio so the layout it will eventually sit in is the
 * layout you are looking at now — swapping in a photograph must not move
 * anything. Labelled rather than blank, so a placeholder can never be mistaken
 * for a finished section.
 */
export default function PlaceholderImage({
  label,
  ratio = "4 / 3",
  className = "",
}: {
  label: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Photograph pending: ${label}`}
      style={{ aspectRatio: ratio }}
      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#161922] ${className}`}
    >
      {/* Faint diagonal hatch, so it reads as intentionally empty. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] bg-[repeating-linear-gradient(45deg,transparent,transparent_9px,#e6dfd6_9px,#e6dfd6_10px)]"
      />
      <div className="relative px-6 text-center">
        <p className="font-display text-[0.95rem] font-medium text-[#e6dfd6]/70">
          {label}
        </p>
        <p className="mt-1 text-[0.7rem] tracking-wide text-[#e6dfd6]/35">
          photograph pending
        </p>
      </div>
    </div>
  );
}
