import { PENDING, type Month, type Pending } from "@/lib/schema";

/**
 * The scroll ascent: forest to night, in nine photographs.
 *
 * Order is the story and must not be reshuffled casually — the page cools as
 * it climbs, and `09-night` is the closer the whole arc lands on.
 *
 * `tint` is the veil colour over each frame. It carries two jobs at once: it
 * holds text contrast, and it is what actually performs the warm-to-cold
 * shift, blended between neighbouring stages as you scroll. Warm browns at the
 * bottom of the valley, blue-grey through the middle, near-black at camp.
 *
 * `focus` is object-position. Seven of the nine are portrait frames being
 * cover-fitted into a landscape viewport, so the subject has to be named or a
 * desktop crop slices the summit or the bridge out of the middle.
 *
 * Months are EXIF capture dates, not guesses. Three frames have none: the
 * village is a PNG export with the metadata stripped, and the two DSLR frames
 * came off a body whose clock was never set (both report January 2000).
 */
export interface AscentStage {
  id: string;
  src: string;
  width: number;
  height: number;
  alt: string;
  place: string;
  month: Month | Pending;
  year: number | Pending;
  /** rgb triplet for the veil; opacity is applied at render. */
  tint: [number, number, number];
  /** Veil strength. Bright snow needs more of it than a dark forest. */
  veil: number;
  focus: string;
}

export const ASCENT: AscentStage[] = [
  {
    id: "forest",
    src: "/images/ascent/01-forest.jpg",
    width: 1500,
    height: 2000,
    alt: "A mule train loaded with kit standing on a rhododendron forest trail thick with fallen leaves, walkers further up the path",
    place: "Rhododendron forest, Annapurna",
    month: "November",
    year: 2023,
    tint: [22, 16, 10],
    // The deepest veil in the warm band. The forest frame is busy and full of
    // bright leaf-litter speculars, and the premise paragraph that sits on it
    // is the dimmest large text on the page — measured, it was the only run
    // anywhere near its AA threshold.
    veil: 0.86,
    focus: "50% 42%",
  },
  {
    id: "path",
    src: "/images/ascent/02-path.jpg",
    width: 1259,
    height: 2200,
    alt: "A gravel path running between a stone lodge wall and trees, with water visible through the leaves on the left",
    place: "Lakeside path, Pokhara valley",
    month: "October",
    year: 2025,
    tint: [20, 18, 12],
    veil: 0.86,
    focus: "55% 50%",
  },
  {
    id: "village",
    src: "/images/ascent/03-village.jpg",
    width: 938,
    height: 935,
    alt: "A painted stupa with prayer wheels at its base and lines of prayer flags running across the frame, a snow peak in cloud beyond the forested valley",
    place: "Chhomrong",
    month: PENDING,
    year: PENDING,
    tint: [20, 20, 20],
    veil: 0.86,
    focus: "50% 45%",
  },
  {
    id: "bridge",
    src: "/images/ascent/04-bridge.jpg",
    width: 1467,
    height: 2200,
    alt: "A walker with a blue pack crossing a plank suspension bridge strung with prayer flags, the river gorge below",
    place: "Suspension bridge, Annapurna",
    month: PENDING,
    year: PENDING,
    tint: [16, 20, 26],
    veil: 0.86,
    focus: "50% 40%",
  },
  {
    id: "climb",
    src: "/images/ascent/05-climb.jpg",
    width: 1467,
    height: 2200,
    alt: "Two walkers reduced to specks on a boulder field, under a glaciated rock face that fills the top of the frame",
    place: "Moraine below the north face, Annapurna",
    month: PENDING,
    year: PENDING,
    tint: [14, 19, 28],
    veil: 0.86,
    focus: "50% 45%",
  },
  {
    id: "snow",
    src: "/images/ascent/06-snow.jpg",
    width: 1500,
    height: 1125,
    alt: "Machapuchare rising over a snowfield tracked with footprints, a line of white peaks along the horizon to the left",
    place: "Mardi Himal, below High Camp",
    month: "November",
    year: 2023,
    tint: [12, 18, 30],
    // Bright snow under a deep blue sky — the brightest frame in the set, and
    // the one that decides how strong the veil has to be everywhere.
    veil: 0.9,
    focus: "50% 55%",
  },
  {
    id: "shelter",
    src: "/images/ascent/07-shelter.jpg",
    width: 1500,
    height: 2000,
    alt: "A dry-stone shelter on a bare ridge of snow and dead grass, a long snow wall of peaks behind it",
    place: "Mardi Himal ridge",
    month: "November",
    year: 2023,
    tint: [12, 17, 28],
    veil: 0.88,
    focus: "50% 58%",
  },
  {
    id: "ridge",
    src: "/images/ascent/08-ridge.jpg",
    width: 1500,
    height: 2000,
    alt: "A rocky stepped trail running along a ridge crest with cloud lying below it on both sides",
    place: "Mardi Himal ridge, above the cloud",
    month: "November",
    year: 2023,
    tint: [10, 14, 24],
    veil: 0.88,
    focus: "50% 60%",
  },
  {
    id: "night",
    src: "/images/ascent/09-night.jpg",
    width: 1500,
    height: 2000,
    alt: "A green tent lit from inside at night, moonlit snow peaks standing above a sea of cloud, stars overhead",
    place: "Camp, Mardi Himal",
    month: "November",
    year: 2023,
    tint: [4, 6, 14],
    veil: 0.88,
    focus: "50% 45%",
  },
];

/**
 * Section id → the stage showing when that section reaches the reading line.
 *
 * These are the stage at the section's TOP; the ascent then interpolates
 * across the section's own height to the next value, so a tall section holds
 * its photographs longer. Tuned against measured section offsets so each
 * section spans the band it was written for — bridge and moraine behind the
 * group pitch, snow behind the operator, night behind the footer.
 *
 * The last entry pins the closer: past the footer's top the stage stops
 * climbing, so the page ends on the night frame and stays there.
 */
export const SECTION_STAGES: Record<string, number> = {
  premise: 0,
  treks: 1,
  group: 2.8,
  writing: 4.2,
  operator: 5.4,
  inquiry: 6.8,
  footer: 8,
};
