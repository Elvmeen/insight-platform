import TopBar from "@/components/TopBar";
import MainNav from "@/components/MainNav";
import HeroCarousel from "@/components/HeroCarousel";
import WelcomeSection from "@/components/WelcomeSection";
import LatestNews from "@/components/LatestNews";
import EventsSection from "@/components/EventsSection";
import VideoTour from "@/components/VideoTour";
import QuickLinks from "@/components/QuickLinks";
import Testimonials from "@/components/Testimonials";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <MainNav />
      <HeroCarousel />
      <WelcomeSection />
      <LatestNews />

      {/* Bottom grid: Events | Video Tour | Quick Links + Testimonials */}
      <div className="container mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-3">
            <EventsSection />
          </div>
          <div className="lg:col-span-6">
            <VideoTour />
          </div>
          <div className="lg:col-span-3">
            <QuickLinks />
            <Testimonials />
          </div>
        </div>
      </div>

      <SiteFooter />
    </div>
  );
};

export default Index;
