import HeroSection from "@/components/hero/HeroSection";
import AscentLayer from "@/components/ascent/AscentLayer";
import PremiseSection from "@/components/home/PremiseSection";
import JourneysSection from "@/components/home/JourneysSection";
import GroupSection from "@/components/home/GroupSection";
import WhyUsSection from "@/components/home/WhyUsSection";
import FounderSection from "@/components/home/FounderSection";
import InquirySection from "@/components/home/InquirySection";
import Footer from "@/components/layout/Footer";

/**
 * Sections alternate between image and information, which is the design thesis:
 * photograph, plain type, treks, the price argument, a bare fact list, the
 * founder, the form. Everything below the hero is a Server Component except the
 * three that need interaction — Reveal, the tier chart and the inquiry form.
 *
 * The `data-ascent` wrappers are the only structural addition. AscentLayer
 * measures them to know how far up the mountain each section sits; the sections
 * themselves are untouched and do not know the layer exists. Deliberately a
 * wrapper rather than a prop or a class on each section — the ascent is a
 * property of the page's order, not of any component in it.
 *
 * The hero is excluded. It owns its own photograph and scrim, and the ascent
 * starts below it.
 */
export default function Home() {
  return (
    <>
      <AscentLayer />

      <main className="relative z-10 flex-1">
        <HeroSection />
        <div data-ascent="premise">
          <PremiseSection />
        </div>
        <div data-ascent="treks">
          <JourneysSection />
        </div>
        <div data-ascent="group">
          <GroupSection />
        </div>
        <div data-ascent="writing">
          <WhyUsSection />
        </div>
        <div data-ascent="operator">
          <FounderSection />
        </div>
        <div data-ascent="inquiry">
          <InquirySection />
        </div>
      </main>

      <div data-ascent="footer" className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
