import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PromptOptimizer } from "@/components/PromptOptimizer";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { AnalyticsSection } from "@/components/AnalyticsSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const handleGetStarted = () => {
    setActiveSection('optimizer');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <HeroSection onGetStarted={handleGetStarted} />;
      case 'optimizer':
        return (
          <div className="pt-24 pb-12 px-4">
            <PromptOptimizer />
          </div>
        );
      case 'marketplace':
        return (
          <div className="pt-24 pb-12 px-4">
            <MarketplaceSection />
          </div>
        );
      case 'analytics':
        return (
          <div className="pt-24 pb-12 px-4">
            <AnalyticsSection />
          </div>
        );
      default:
        return <HeroSection onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      {renderSection()}
    </div>
  );
};

export default Index;
