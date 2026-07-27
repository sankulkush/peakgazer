import HeroSection from "@/components/hero/HeroSection";

export default function Home() {
  return (
    <main className="flex-1">
      <HeroSection />

      {/* Placeholder so the hero has somewhere to scroll into. Replaced in
          Phase D by the four journeys, group pricing and the founder. */}
      <section
        id="journeys"
        className="flex min-h-screen items-center justify-center bg-[#05040c] px-6"
      >
        <p className="font-display text-2xl font-light tracking-wide text-[#e6dfd6]/40">
          The journey continues…
        </p>
      </section>
    </main>
  );
}
