import { ASCENT, SECTION_STAGES } from "@/content/ascent";

export type Anchor = { y: number; stage: number };

/**
 * Where each section sits in the document, paired with how far through the
 * ascent it is. Measured rather than assumed, because section heights change
 * with copy, viewport and font loading.
 */
export function readAnchors(): Anchor[] {
  const anchors: Anchor[] = [];
  for (const [id, stage] of Object.entries(SECTION_STAGES)) {
    const el = document.querySelector<HTMLElement>(`[data-ascent="${id}"]`);
    if (!el) continue;
    const box = el.getBoundingClientRect();
    anchors.push({ y: box.top + window.scrollY, stage });
  }
  return anchors.sort((a, b) => a.y - b.y);
}

/**
 * Scroll position to a fractional stage — 3.4 means "a bit past the bridge,
 * on the way to the climb".
 *
 * Piecewise-linear between anchors so the dissolve is paced by the page's own
 * rhythm: a tall section holds its photograph longer, which is the right
 * behaviour. A fixed scroll distance per stage would drift out of step with
 * the content the moment any section grew.
 */
export function stageAt(anchors: Anchor[], y: number): number {
  if (anchors.length === 0) return 0;
  if (y <= anchors[0].y) return anchors[0].stage;

  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (y <= b.y) {
      const span = b.y - a.y;
      const t = span > 0 ? (y - a.y) / span : 0;
      return a.stage + (b.stage - a.stage) * t;
    }
  }
  return anchors[anchors.length - 1].stage;
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** The veil colour at a fractional stage, blended between its neighbours. */
export function veilAt(stage: number): string {
  const max = ASCENT.length - 1;
  const i = Math.max(0, Math.min(max, Math.floor(stage)));
  const j = Math.min(max, i + 1);
  const t = Math.max(0, Math.min(1, stage - i));
  const a = ASCENT[i];
  const b = ASCENT[j];
  const rgb = a.tint.map((v, k) => Math.round(lerp(v, b.tint[k], t)));
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${lerp(a.veil, b.veil, t).toFixed(3)})`;
}

/** How much of the gap between two stages is dwell rather than dissolve. */
const DWELL = 0.45;

const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * Opacity for one photograph at a fractional stage.
 *
 * Frames stack, so the dissolve is one-directional: the outgoing photograph
 * stays fully opaque and the incoming one fades in over the top of it. The
 * first version cross-faded both towards 0.5 and the midpoint read as a double
 * exposure — two pictures at equal weight, which looks like a bug rather than
 * a transition. Fading in over a solid frame never does that.
 *
 * The first 45% of each gap is dwell, so a photograph is allowed to just be a
 * photograph before the next one starts arriving, and the dissolve itself is
 * smoothstepped so it has no hard start or stop.
 *
 * A frame more than a full stage behind is completely covered by the one above
 * it and drops to zero — nine opaque layers would be nine full-screen surfaces
 * for the compositor to blend on every frame, which is the mobile budget gone.
 */
export function opacityAt(index: number, stage: number): number {
  const d = stage - index;
  if (d >= 1 || d <= -1) return 0;
  if (d >= 0) return 1;
  const t = (1 + d - DWELL) / (1 - DWELL);
  return t <= 0 ? 0 : smooth(t);
}
