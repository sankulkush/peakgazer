import HeroSection from "@/components/hero/HeroSection";
import UpcomingGroupTreks from "@/components/home/UpcomingGroupTreks";
import FeaturedTrips from "@/components/home/FeaturedTrips";
import TheTreks from "@/components/home/TheTreks";
import TheClimbs from "@/components/home/TheClimbs";
import Reviews from "@/components/home/Reviews";
import Blogs from "@/components/home/Blogs";
import FAQ from "@/components/home/FAQ";
import InquirySection from "@/components/home/InquirySection";
import Footer from "@/components/layout/Footer";
import AscentLayer from "@/components/ascent/AscentLayer";

export default function Home() {
  return (
    <>
      <AscentLayer />

      <main className="relative z-10 flex-1">
        <HeroSection />

        <div data-ascent="upcoming">
          <UpcomingGroupTreks />
        </div>

        <div data-ascent="featured">
          <FeaturedTrips />
        </div>

        <div data-ascent="treks">
          <TheTreks />
        </div>

        <div data-ascent="climbs">
          <TheClimbs />
        </div>

        <div data-ascent="reviews">
          <Reviews />
        </div>

        <div data-ascent="blogs">
          <Blogs />
        </div>

        <div data-ascent="faq">
          <FAQ />
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
