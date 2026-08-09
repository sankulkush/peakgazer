import Image from "next/image";
import { isPending, type Month, type Pending } from "@/lib/schema";

type InlinePhotoProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** PENDING where the source does not tell us. Never inferred. */
  place: string | Pending;
  month: Month | Pending;
  year: number | Pending;
  sizes: string;
  className?: string;
};

/**
 * A photograph shown as itself, not as ground.
 *
 * The ascent runs behind the page as wallpaper by design; these do the
 * opposite job — the meal you actually get, the people you actually walk with.
 * So they render at their own aspect ratio, uncropped, above the veil, with
 * the caption the anti-template rule asks for.
 *
 * The caption degrades in two independent steps because these frames came off
 * phone exports: several carry a download timestamp rather than a capture
 * date, and a download date presented as a month is a fabricated caption.
 * Saying which half we know is the honest render.
 */
export default function InlinePhoto({
  src,
  alt,
  width,
  height,
  place,
  month,
  year,
  sizes,
  className = "",
}: InlinePhotoProps) {
  const knownPlace = !isPending(place);
  const knownDate = !isPending(month) && !isPending(year);

  const caption = knownPlace
    ? knownDate
      ? `${place}, ${month} ${year}`
      : `${place} — month to follow`
    : knownDate
      ? `${month} ${year} — place to follow`
      : "Place and month to follow";

  return (
    <figure className={className}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        quality={80}
        sizes={sizes}
        className="h-auto w-full rounded-sm"
      />
      <figcaption className="mt-2.5 text-[0.72rem] text-[#e6dfd6]/45">
        {caption}
      </figcaption>
    </figure>
  );
}
