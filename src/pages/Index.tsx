import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { SmartSearchBar } from "@/components/SmartSearchBar";
import { ProductGrid } from "@/components/ProductGrid";
import { AIChatAssistant } from "@/components/AIChatAssistant";
import { CommunitySection } from "@/components/CommunitySection";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, TrendingUp, Gift, Zap, Star, ShoppingBag } from "lucide-react";

// Mock product data - in real app this would come from your database
const mockProducts = [
  {
    id: "1",
    asin: "B08N5WRWNW",
    title: "Echo Dot (4th Gen) Smart Speaker with Alexa",
    description: "Our most popular smart speaker with improved sound",
    price: 39.99,
    originalPrice: 49.99,
    discountPercentage: 20,
    imageUrl: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400",
    category: "Smart Home",
    brand: "Amazon",
    rating: 4.6,
    reviewCount: 89542,
    features: ["Voice Control", "Smart Home Hub", "Music Streaming"],
    affiliateUrl: "https://amazon.com/dp/B08N5WRWNW",
    availability: true
  },
  {
    id: "2",
    asin: "B09JQMJHXY",
    title: "Apple AirPods Pro (2nd Generation)",
    description: "Wireless earbuds with active noise cancellation",
    price: 199.99,
    originalPrice: 249.99,
    discountPercentage: 20,
    imageUrl: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    reviewCount: 45231,
    features: ["Active Noise Cancellation", "Spatial Audio", "Wireless Charging"],
    affiliateUrl: "https://amazon.com/dp/B09JQMJHXY",
    availability: true
  },
  {
    id: "3",
    asin: "B08G9J44ZN",
    title: "ASUS ROG Strix G15 Gaming Laptop",
    description: "15.6\" Gaming Laptop with RTX 3060",
    price: 899.99,
    originalPrice: 1299.99,
    discountPercentage: 31,
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400",
    category: "Computers",
    brand: "ASUS",
    rating: 4.4,
    reviewCount: 2847,
    features: ["RTX 3060 Graphics", "144Hz Display", "RGB Keyboard"],
    affiliateUrl: "https://amazon.com/dp/B08G9J44ZN",
    availability: true
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(mockProducts);
  const [isSearching, setIsSearching] = useState(false);
  const { user } = useAuth();

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
    setActiveSection('search');
    
    // Simulate API call delay
    setTimeout(() => {
      // In real app, this would call your search API
      const filtered = mockProducts.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
      setIsSearching(false);
    }, 1000);
  };

  const handleProductClick = (product: any) => {
    console.log('Product clicked:', product);
    // Handle product detail view
  };

  const renderHeroSection = () => (
    <div className="relative overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-primary/5" />
      
      <div className="relative container mx-auto px-4 pt-32 pb-20">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Hero Title */}
          <div className="space-y-4">
            <Badge className="bg-primary/10 text-primary border-primary/20 mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered Shopping Assistant
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
              Find Perfect Products with AI
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover amazing products, get personalized recommendations, and find the best deals with our intelligent shopping assistant.
            </p>
          </div>

          {/* Search Bar */}
          <SmartSearchBar 
            onSearch={handleSearch}
            className="mt-8"
          />

          {/* Quick Categories */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Gaming", "Electronics", "Home & Garden", "Fashion", "Books", "Sports"].map((category) => (
              <Button
                key={category}
                variant="outline"
                className="hover:bg-primary hover:text-primary-foreground"
                onClick={() => handleSearch(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">AI-Powered Search</h3>
                <p className="text-sm text-muted-foreground">
                  Natural language search that understands what you're really looking for.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  Get product suggestions tailored to your preferences and behavior.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-background/50 backdrop-blur-sm border-primary/10 hover:border-primary/30 transition-colors">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Best Deals & Coupons</h3>
                <p className="text-sm text-muted-foreground">
                  Never miss a deal with our smart price tracking and coupon finder.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return renderHeroSection();
      case 'search':
        return (
          <div className="pt-24 pb-12 px-4">
            <div className="container mx-auto">
              <ProductGrid
                products={searchResults}
                loading={isSearching}
                searchQuery={searchQuery}
                onProductClick={handleProductClick}
              />
            </div>
          </div>
        );
      case 'trending':
        return (
          <div className="pt-24 pb-12 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                  <TrendingUp className="h-8 w-8 text-primary" />
                  Trending Products
                </h2>
                <p className="text-muted-foreground">Most popular products right now</p>
              </div>
              <ProductGrid
                products={mockProducts}
                onProductClick={handleProductClick}
              />
            </div>
          </div>
        );
      case 'deals':
        return (
          <div className="pt-24 pb-12 px-4">
            <div className="container mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4 flex items-center justify-center gap-2">
                  <Gift className="h-8 w-8 text-primary" />
                  Best Deals
                </h2>
                <p className="text-muted-foreground">Limited time offers and discounts</p>
              </div>
              <ProductGrid
                products={mockProducts.filter(p => p.discountPercentage && p.discountPercentage > 15)}
                onProductClick={handleProductClick}
              />
            </div>
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
        return renderHeroSection();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      {renderSection()}
      <AIChatAssistant onProductSearch={handleSearch} />
    </div>
  );
};

export default Index;
