/**
 * Geometry + palette for the layered Himalayan skyline.
 *
 * All ridges share the same `0 0 1440 500` viewBox and are stretched with
 * `preserveAspectRatio="none"`, so a layer's on-screen presence is controlled
 * purely by `height` — the paths never need to be redrawn to retune depth.
 *
 * Ordered back-to-front. `depth` drives both the entrance stagger offset and
 * the scroll parallax: positive values sink (distant peaks receding), negative
 * values rise (foreground terrain rushing past the viewer).
 */

export type Ridge = {
  id: string;
  /** Height of the layer as a share of the hero, incl. the bleed below. */
  height: string;
  /** Parallax weight. Positive = drifts down, negative = drifts up. */
  depth: number;
  /** Lit snowline colour (top of the gradient). */
  from: string;
  /** Shadowed base colour (bottom of the gradient). */
  to: string;
  path: string;
};

/**
 * Every layer bleeds past the bottom of the hero so parallax can lift a ridge
 * without exposing sky beneath it.
 */
export const RIDGE_BLEED = "-10%";

export const RIDGES: Ridge[] = [
  {
    id: "crest",
    height: "88%",
    depth: 0.1,
    from: "#ded7f1",
    to: "#8f86bd",
    path: "M0,500 L0,320 L86,224 L148,278 L222,160 L290,234 L348,192 L440,56 L514,206 L576,160 L654,252 L720,194 L804,302 L876,238 L968,120 L1052,236 L1122,188 L1208,284 L1282,242 L1356,300 L1440,262 L1440,500 Z",
  },
  {
    id: "second",
    height: "76%",
    depth: 0.2,
    from: "#b2a8da",
    to: "#5f5793",
    path: "M0,500 L0,372 L74,318 L156,366 L228,290 L316,352 L398,300 L482,362 L560,268 L648,340 L726,304 L812,368 L896,296 L980,356 L1064,312 L1152,370 L1236,318 L1320,374 L1400,336 L1440,368 L1440,500 Z",
  },
  {
    id: "third",
    height: "62%",
    depth: 0.32,
    from: "#7a70a8",
    to: "#3c3568",
    path: "M0,500 L0,412 C60,398 110,372 168,382 C214,390 244,414 300,406 C356,398 392,352 452,362 C512,372 540,410 600,404 C664,398 700,364 764,372 C826,380 856,412 918,408 C980,404 1014,368 1078,376 C1140,384 1170,414 1232,410 C1294,406 1330,376 1392,384 C1414,387 1428,396 1440,402 L1440,500 Z",
  },
  {
    id: "fourth",
    height: "50%",
    depth: -0.24,
    from: "#3d3765",
    to: "#1e1b3c",
    path: "M0,500 L0,440 C120,404 232,458 352,432 C472,406 584,456 704,434 C824,412 936,458 1056,436 C1176,414 1300,452 1440,424 L1440,500 Z",
  },
  {
    id: "foreground",
    height: "40%",
    depth: -0.55,
    from: "#171430",
    to: "#07060f",
    path: "M0,500 L0,462 C140,436 268,486 408,466 C548,446 676,490 816,470 C956,450 1092,488 1232,468 C1310,457 1376,448 1440,442 L1440,500 Z",
  },
];

export type Cloud = {
  id: string;
  /** Vertical placement within the hero. */
  top: string;
  width: string;
  height: string;
  opacity: number;
  /** Seconds for one full traverse. Longer = further away. */
  duration: number;
  /** 1 drifts right, -1 drifts left. */
  direction: 1 | -1;
  /** Fraction of the loop already elapsed on mount, so bands never align. */
  offset: number;
};

export const CLOUDS: Cloud[] = [
  { id: "veil-1", top: "18%", width: "70vw", height: "16vh", opacity: 0.16, duration: 150, direction: 1, offset: 0 },
  { id: "veil-2", top: "34%", width: "55vw", height: "12vh", opacity: 0.12, duration: 110, direction: 1, offset: 0.45 },
  { id: "veil-3", top: "48%", width: "85vw", height: "18vh", opacity: 0.1, duration: 190, direction: -1, offset: 0.2 },
  { id: "veil-4", top: "60%", width: "45vw", height: "10vh", opacity: 0.14, duration: 90, direction: 1, offset: 0.7 },
];
