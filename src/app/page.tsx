import HeroSection from "@/components/hero/HeroSection";
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
 */
export default function Home() {
  return (
    <>
      <main className="flex-1">
        <HeroSection />
        <PremiseSection />
        <JourneysSection />
        <GroupSection />
        <WhyUsSection />
        <FounderSection />
        <InquirySection />
      </main>
      <Footer />
    </>
  );
}
