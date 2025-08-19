import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Zap, Target, TrendingUp } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

interface HeroSectionProps {
  onGetStarted: () => void;
}

export const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,119,198,0.3),transparent)] animate-pulse" />
      
      {/* Hero Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="AI Prompt Platform" 
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center space-y-8">
        <div className="space-y-4">
          <Badge variant="secondary" className="bg-white/10 border-white/20 text-white backdrop-blur-sm">
            🚀 Welcome to the Future of AI Prompting
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white">
            <span className="bg-gradient-to-r from-white via-primary-glow to-accent bg-clip-text text-transparent">
              Prathom.AI
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into high-performance AI prompts. 
            <span className="text-primary-glow font-semibold"> Optimize, Share, Earn </span>
            from the world's most advanced prompt platform.
          </p>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <MessageCircle className="w-8 h-8 text-primary-glow mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">AI-Powered Optimization</h3>
            <p className="text-white/80 text-sm">Generate multiple high-quality prompts optimized for any AI model</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <Target className="w-8 h-8 text-accent mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Marketplace Ready</h3>
            <p className="text-white/80 text-sm">Buy, sell, and share premium prompts in our thriving community</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <TrendingUp className="w-8 h-8 text-success mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Analytics Dashboard</h3>
            <p className="text-white/80 text-sm">Track performance metrics and optimize your prompt success rate</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={onGetStarted}
            variant="hero" 
            size="lg" 
            className="text-lg px-8 py-6"
          >
            <Zap className="w-5 h-5 mr-2" />
            Start Optimizing Prompts
          </Button>
          
          <Button 
            variant="glass" 
            size="lg" 
            className="text-lg px-8 py-6"
          >
            Explore Marketplace
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-center">
          <div className="text-white">
            <div className="text-2xl font-bold text-primary-glow">10,000+</div>
            <div className="text-sm text-white/80">Prompts Generated</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold text-accent">5,000+</div>
            <div className="text-sm text-white/80">Happy Users</div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-sm text-white/80">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};