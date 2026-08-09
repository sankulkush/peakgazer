import Image from "next/image";
import PlaceholderImage from "@/components/common/PlaceholderImage";
import { findImage, imageShape, naturalRatio } from "@/lib/images";
import type { ImageRole, Journey } from "@/lib/schema";

type ImageSlotProps = {
  journey: Journey;
  role: ImageRole;
  label: string;
  /** Ratio for the PLACEHOLDER only. A real photograph uses its own. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  /** Full-bleed cover. Only ever honoured for a genuinely wide photograph. */
  fill?: boolean;
  className?: string;
};

/**
 * A named slot on the page.
 *
 * A real photograph always renders at its own aspect ratio and is never
 * cropped — the container takes the picture's shape. `fill` is the single
 * exception, and `ImageMoment` only asks for it when the frame is wide enough
 * to survive it.
 *
 * Filling a slot is a content edit: add an entry to the journey's `images`
 * with this role. It has to be a content entry rather than a bare file drop
 * because every photograph carries a place and a month.
 */
export default function ImageSlot({
  journey,
  role,
  label,
  ratio = "3 / 2",
  sizes,
  priority = false,
  fill = false,
  className = "",
}: ImageSlotProps) {
  const image = findImage(journey, role);

  if (!image) {
    return fill ? (
      <div className={`absolute inset-0 ${className}`}>
        <PlaceholderImage label={label} ratio="auto" className="h-full" />
      </div>
    ) : (
      <PlaceholderImage label={label} ratio={ratio} className={className} />
    );
  }

  /*
    Cover-fill in a fixed box.

    A wide frame is centred. An upright one is anchored to the top instead:
    a card slot has a shape the layout depends on, so it cannot take the
    picture's ratio the way a banner can, and top-anchoring keeps faces and
    summits rather than slicing them out of the middle.
  */
  if (fill) {
    const position =
      imageShape(image) === "wide" ? "object-center" : "object-top";
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={82}
        sizes={sizes}
        className={`object-cover ${position} ${className}`}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      priority={priority}
      quality={82}
      sizes={sizes}
      className={`h-auto w-full ${className}`}
      style={{ aspectRatio: naturalRatio(image) }}
    />
  );
}

/** Place and month, per the caption rule. */
export function SlotCaption({
  journey,
  role,
  className = "",
}: {
  journey: Journey;
  role: ImageRole;
  className?: string;
}) {
  const image = findImage(journey, role);
  if (!image) {
    return (
      <p className={`text-[0.72rem] text-[#e6dfd6]/35 ${className}`}>
        Photograph pending — place and month to follow
      </p>
    );
  }
  return (
    <p className={`text-[0.72rem] text-[#e6dfd6]/45 ${className}`}>
      {image.place}, {image.month} {image.year}
    </p>
  );
}
