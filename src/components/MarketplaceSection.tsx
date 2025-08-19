import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, Download, DollarSign, TrendingUp, Zap } from "lucide-react";

const mockPrompts = [
  {
    id: 1,
    title: "Ultimate Marketing Copy Generator",
    description: "Convert any product into compelling marketing copy that sells",
    price: 29,
    rating: 4.9,
    downloads: 1240,
    category: "Marketing",
    featured: true
  },
  {
    id: 2,
    title: "Code Documentation Master",
    description: "Generate comprehensive documentation for any codebase",
    price: 19,
    rating: 4.8,
    downloads: 890,
    category: "Development",
    featured: false
  },
  {
    id: 3,
    title: "Creative Story Generator",
    description: "Craft engaging stories with complex characters and plots",
    price: 24,
    rating: 4.7,
    downloads: 567,
    category: "Creative",
    featured: true
  },
  {
    id: 4,
    title: "SEO Content Optimizer",
    description: "Create SEO-optimized content that ranks on Google",
    price: 34,
    rating: 4.9,
    downloads: 2100,
    category: "SEO",
    featured: false
  }
];

export const MarketplaceSection = () => {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">Prompt Marketplace</h2>
        <p className="text-xl text-muted-foreground">
          Discover, buy, and sell premium AI prompts from the community
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <DollarSign className="w-8 h-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-success">$125K+</div>
            <div className="text-sm text-muted-foreground">Total Sales</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <Download className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">15,000+</div>
            <div className="text-sm text-muted-foreground">Downloads</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <Star className="w-8 h-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-warning">4.8</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-card border-border/50">
          <CardContent className="p-6 text-center">
            <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">89%</div>
            <div className="text-sm text-muted-foreground">Satisfaction</div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold">Featured Prompts</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {mockPrompts.filter(prompt => prompt.featured).map((prompt) => (
            <Card key={prompt.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-primary/20 transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-primary/20 text-primary">
                        {prompt.category}
                      </Badge>
                      {prompt.featured && (
                        <Badge variant="secondary" className="bg-warning/20 text-warning">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-lg">{prompt.title}</CardTitle>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{prompt.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-warning fill-warning" />
                      <span className="text-sm font-medium">{prompt.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{prompt.downloads}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">${prompt.price}</div>
                  </div>
                </div>
                
                <Button className="w-full" variant="default">
                  Purchase Prompt
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* All Prompts */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold">All Prompts</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockPrompts.map((prompt) => (
            <Card key={prompt.id} className="bg-gradient-card border-border/50 shadow-card hover:shadow-primary/20 transition-smooth">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-primary/20 text-primary text-xs">
                    {prompt.category}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Heart className="w-3 h-3" />
                  </Button>
                </div>
                <CardTitle className="text-base line-clamp-2">{prompt.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{prompt.description}</p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-warning fill-warning" />
                    <span>{prompt.rating}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="w-3 h-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{prompt.downloads}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold text-primary">${prompt.price}</div>
                  <Button size="sm" variant="default">
                    Buy
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};