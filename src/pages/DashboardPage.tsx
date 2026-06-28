import { Sidebar } from '../components/layout/Sidebar2';
import { Topbar } from '../components/layout/Topbar2';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { FloatingParticles } from '../components/ui/FloatingParticles';
import { DashboardHero } from '../components/dashboard/DashboardHero';
import { AIRecommendationsSection } from '../components/dashboard/AIRecommendationsSection';
import { TrendingSchemesSection } from '../components/dashboard/TrendingSchemesSection';
import { DeadlineAlertsSection } from '../components/dashboard/DeadlineAlertsSection';
import { RecentlyViewedSection } from '../components/dashboard/RecentlyViewedSection';

export function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      {/* Animated Background */}
      <AnimatedBackground />
      <FloatingParticles count={40} />

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[280px]">
        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="relative z-10 px-8 py-24">
          {/* Hero Stats */}
          <DashboardHero />

          {/* AI Recommendations */}
          <AIRecommendationsSection />

          {/* Trending Schemes */}
          <TrendingSchemesSection />

          {/* Deadline Alerts */}
          <DeadlineAlertsSection />

          {/* Recently Viewed */}
          <RecentlyViewedSection />
        </main>
      </div>
    </div>
  );
}
