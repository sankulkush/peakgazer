import Image from "next/image";
import PlaceholderImage from "@/components/common/PlaceholderImage";
import type { ImageRole, Journey } from "@/lib/schema";

type ImageSlotProps = {
  journey: Journey;
  role: ImageRole;
  /** Shown on the placeholder, and used to describe what belongs here. */
  label: string;
  /** Ignored when `fill` is set — the parent decides the box instead. */
  ratio?: string;
  sizes: string;
  priority?: boolean;
  fill?: boolean;
  className?: string;
};

/**
 * A named slot on the page.
 *
 * The template asks for a role and the content file answers. Until it does, the
 * slot renders a labelled placeholder at the exact ratio the photograph will
 * occupy, so dropping the frame in cannot shift the layout around it.
 *
 * Filling a slot is a content edit, not a code edit: add an entry to the
 * journey's `images` with this role. It has to be a content entry rather than a
 * bare file drop because every photograph carries a place and a month, and only
 * the content file knows those.
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
  const image = journey.images.find((i) => i.role === role);

  if (!image) {
    return fill ? (
      <div className={`absolute inset-0 ${className}`}>
        <PlaceholderImage label={label} ratio="auto" className="h-full" />
      </div>
    ) : (
      <PlaceholderImage label={label} ratio={ratio} className={className} />
    );
  }

  if (fill) {
    return (
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        quality={82}
        sizes={sizes}
        className={`object-cover ${className}`}
      />
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      quality={82}
      sizes={sizes}
      className={`w-full ${className}`}
      style={{ aspectRatio: ratio, objectFit: "cover" }}
    />
  );
}

/** Place and month, per the caption rule. Renders nothing until both exist. */
export function SlotCaption({
  journey,
  role,
  className = "",
}: {
  journey: Journey;
  role: ImageRole;
  className?: string;
}) {
  const image = journey.images.find((i) => i.role === role);
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
