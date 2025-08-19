import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PromptOptimizer } from "@/components/PromptOptimizer";
import { MarketplaceSection } from "@/components/MarketplaceSection";
import { AnalyticsSection } from "@/components/AnalyticsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (!user) {
      setActiveSection('auth');
    } else {
      setActiveSection('optimizer');
    }
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
      case 'community':
        return (
          <div className="pt-24 pb-12 px-4">
            <CommunitySection />
          </div>
        );
      case 'auth':
        return <AuthForm onSuccess={() => setActiveSection('home')} />;
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
