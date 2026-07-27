import CloudLayer from "./CloudLayer";
import MountainRange from "./MountainRange";
import { RIDGES } from "./hero.data";

/**
 * The full dawn scene: sky wash → sun bloom → drifting haze → ridge stack →
 * vignette. Purely presentational; every element is animated from the hero's
 * timeline via its `data-*` hook, so this stays a server component apart from
 * the cloud layer's own ambient loop.
 */
export default function HeroBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {/* Pre-dawn sky, night at the zenith falling to alpenglow at the horizon */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#04050d_0%,#0a0f2b_22%,#1e1c45_42%,#4a2f57_62%,#8b4a5f_78%,#d1815f_92%,#e8a878_100%)]" />

      {/* Sun bloom sitting just behind the skyline. Centred with margins rather
          than translate utilities so the transform belongs solely to GSAP. */}
      <div
        data-sun
        className="absolute left-1/2 top-[58%] -ml-[30vh] -mt-[30vh] h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,rgba(255,203,140,0.55)_0%,rgba(240,150,105,0.28)_38%,rgba(240,150,105,0)_70%)] opacity-0 blur-2xl"
      />

      <CloudLayer />

      {RIDGES.map((ridge) => (
        <MountainRange key={ridge.id} ridge={ridge} />
      ))}

      {/* Valley haze pooling between the near ridges */}
      <div
        data-valley-haze
        className="absolute inset-x-0 bottom-[18%] h-[26%] bg-[linear-gradient(to_top,rgba(120,110,175,0)_0%,rgba(150,130,185,0.22)_45%,rgba(150,130,185,0)_100%)] blur-xl"
      />

      {/* Cinematic falloff — keeps the type legible against the sky */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(4,5,13,0.55)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#05040c] to-transparent" />
    </div>
  );
}
